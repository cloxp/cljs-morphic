(ns cljs-morphic.morph
  (:require-macros [cljs.analyzer.macros :refer [no-warn]]
                   [cljs.core.async.macros :refer [go go-loop]]
                   [fresnel.lenses :refer [deflens deffetch]]
                   [cljs-morphic.macros :refer [morph-fn rectangle ellipse image text polygon]])
  (:require [cljs-morphic.evaluator :refer [morph-eval morph-eval-str]]
            [cljs-morphic.event :as event :refer [signals]]
            [cljs-morphic.helper 
             :refer [applicative add-points bottom-right apply-to-morph contains-rect?
                     bounds some-morph eucl-distance morph? expanded-expression?
                     add-changes diff-submorphs morph-list? tree-zipper]]
        
            [cljs.core.async :as async :refer [>! <! put! chan timeout onto-chan]]
            [cljs.pprint :refer [write pprint]]
            [cljs.reader :refer [read-string]]
            [cljs.analyzer :as ana]
            [cljs.core.match :refer-macros [match]]
            [clojure.string :refer [replace-first]]
            [clojure.data :refer [diff]]
            [clojure.walk :refer [prewalk postwalk walk]]
            [clojure.zip :as z]
            [cljs.analyzer]

            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [fresnel.lenses :refer [fetch putback create-lens create-lens dissoc-trigger IFetch IPutback]])
  (:import [goog.net XhrIo]
           [goog.events EventType]))

(enable-console-print!)

; WORLD FUNCTIONS
; global channel that all events that happen are dispatched through

(def redefinitions (chan))

(declare world-state current-namespace)

(declare without)

(declare rerender redefine on-drag)

(declare add-morph add-morph-before without set-prop)

(def LOOP_MAPPING true)

(defmulti changes->form (fn [expr changes opts] 
                          (if LOOP_MAPPING 
                            (first expr)
                            :default)))

; unpack the previously added changes (BUG: what if expression originally comes with a '-> ?)

(defmethod changes->form '-> 
  ([[_ expr _] changes opts]
   (changes->form expr changes opts)))

(defn modify-prototype [prototype-expr unbound-changes]
  (let [[self props & submorphs] prototype-expr]
    (apply list self 
      (merge props unbound-changes)
      submorphs)))

(defmethod changes->form 'map
  ([map-expr {struct-changes :structure
              id->prop-changes :properties} {expr-morphs :expanded-expression}] 
   (let [[_ map-fn & rest-expr] map-expr
         ; determine the unbound direct changes, and where in the 
         ; mapped function we can find the prototype
         code-loc->unbound-prop-changes
         (reduce (fn [d m]
                   (let [{:keys [bound-props code-idx changes]} (-> m meta)
                         changes (apply dissoc (-> changes :properties) bound-props)]
                     (update d code-idx merge changes))) {} expr-morphs)
         ; filter for the remaining bound changes in order to 
         ; add them to the outside of the loop expression
         id->prop-changes
         (reduce (fn [id->prop-changes m]
                   (let [prop-changes (get id->prop-changes (-> m second :id))
                         bound-prop-changes (select-keys prop-changes (-> m meta :bound-props))]
                     (if (empty? bound-prop-changes)
                       (dissoc id->prop-changes (-> m second :id))
                       (assoc id->prop-changes (-> m second :id) bound-prop-changes)))) 
                 id->prop-changes expr-morphs)
         ; traverse the description of the mapped function, 
         ; and alter the description for the unbound direct changes
         root (tree-zipper map-fn)
         all (take-while (complement z/end?) (iterate z/next root))
         last-with-counting-ctx {:i (count all), :zpd (last all)}
         visit-and-prev (fn [{:keys [i zpd]}] 
                          {:i (dec i),
                           :zpd (z/prev (if (contains? code-loc->unbound-prop-changes (dec i))              
                                          (z/edit zpd (fn [prototype-expr] 
                                                        (modify-prototype prototype-expr 
                                                                          (get code-loc->unbound-prop-changes (dec i)))))
                                          zpd))})
         it (iterate visit-and-prev last-with-counting-ctx)
         tfmed (take-while (comp not nil? :zpd) it)
         map-fn (-> tfmed last :zpd z/node)
         map-expr (apply list 'map map-fn rest-expr)]
     (if (or (not-empty struct-changes) (-> id->prop-changes empty? not))
       (list '-> map-expr
             (apply concat struct-changes
               (for [[morph prop-changes] id->prop-changes]
                 (apply concat (for [[prop value] prop-changes]
                                 (list 'set-prop morph prop value))))))
       map-expr))))

(defmethod changes->form 'for
  ([for-expr {struct-changes :structurep
              id->prop-changes :properties} {loc :idx
                                             bound-props :bound-props}]
   (apply list '-> for-expr
     (concat struct-changes
             (for [[morph prop-changes] id->prop-changes]
               (apply concat (for [[prop value] prop-changes]
                               (list 'set-prop morph prop value))))))))

; LENSES

(declare submorphs properties changes)

(defn ast-type [x]
  (cond
    (expanded-expression? x) :expr
    (morph? x) :morph
    (vector? x) :vector
    :else (throw (str "Encountered non morphic structure in hierarchy " x))))

(deflens it [x y] ; maybe 'self' is a better name than 'it'
  :fetch x
  :putback (cond
             (vector? y) (apply vector (remove nil? y))
             :else y))

(defn redefinition-notify [expr]
  (go (>! redefinitions {:type :redefined 
                         :target-props (fetch expr properties)
                         :args {:observers (-> expr meta :observers)}})))

(defn redefine
  ([expression redefinition]
   (redefine expression it redefinition))
  ([world-state lens redefinition]
   (let [expr (fetch world-state lens)]
     (let [new-morph (apply-to-morph redefinition expr)
           new-morph (cond 
                       (expanded-expression? new-morph)
                       (do
                         (redefinition-notify expr)
                         (vary-meta new-morph 
                                    assoc 
                                    :description (changes->form
                                                   (-> new-morph meta :description)
                                                   (fetch new-morph changes)
                                                   {:expanded-expression new-morph})))

                       (morph-list? new-morph)
                       (do 
                         (redefinition-notify expr)
                         new-morph)
                       
                       (morph? new-morph)
                       (do
                         (redefinition-notify expr)
                         (vary-meta new-morph update 
                                    :description 
                                    (fn [[self props & submorphs]]
                                      (apply list
                                        self
                                        (second new-morph)
                                        submorphs)))) 
                       
                       (nil? new-morph) (do
                                          (go (>! redefinitions {:type :redefined 
                                                                 :target-props (fetch expr properties)
                                                                 :args {:observers (-> expr meta :observers)}}))
                                          nil)
                       :default (throw (str "Redefinition can only return new morphs. Received: " new-morph)))]
       (putback world-state lens new-morph))))) 

(defn update-changes [expr new-changes]
  "Updates the expressions change meta-data without applying the changes"
  (vary-meta expr assoc :changes new-changes))

; default expression change preserving

(defmethod changes->form :default 
  ([expr {struct-changes :structure
          id->prop-changes :properties} _]
   (apply list '-> expr
     (concat struct-changes
             (for [[morph prop-changes] id->prop-changes]
               (apply concat (for [[prop value] prop-changes]
                               (list 'set-prop morph prop value))))))))

(defmulti apply-changes 
  "Applies the changes to the expression and also updates the change meta-data accordingly"
  (fn [expr changes] (ast-type expr)))

(defmethod apply-changes :morph [morph changes]
  (morph-eval (changes->form (-> morph meta :description) changes)))

(defmethod apply-changes :expr [expr changes]
  (let [new-description (changes->form (-> expr meta :description) changes {:expanded-expression expr})
        new-expansion (morph-eval new-description)]
    (vary-meta new-expansion merge
      {:expanded-expression? true
       :description new-description})))

; SUBMORPH LENS

(defmulti putback-submorphs (fn [expr new-submorphs] (ast-type expr)))

(defmethod putback-submorphs :morph [morph new-submorphs]
  (redefine morph (fn [self props submorphs]
                    (go (>! redefinitions {:type :redefined :target-props props}))
                    (let [new-submorphs (remove nil? new-submorphs)]
                      (vary-meta (self props new-submorphs)
                                 update :description (fn [[self props _]]
                                                       (apply list self props (map #(-> % meta :description) new-submorphs))))))))


(defmethod putback-submorphs :expr [expr new-submorphs]
  (redefine expr (fn [self props submorphs]
                    (go (>! redefinitions {:type :redefined :target-props props}))
                   (let [new-expansion (if (morph-list? expr)
                                         ; transport meta to the new list of morphs
                                         (with-meta (remove nil? new-submorphs) (meta expr))
                                         ; meta is already preserved
                                         (self props (remove nil? new-submorphs)))]
                     (vary-meta new-expansion assoc :description 
                                (changes->form 
                                  (-> expr meta :description) 
                                  (fetch expr changes) 
                                  {:expanded-expression new-expansion}))
                     ))))

; this will never happen, since (fetch [ vector ] [submorphs idx] == [idx])
(defmethod putback-submorphs :vector [morphs new-submorphs]
  (apply vector (remove nil? new-submorphs)))

(defmethod putback-submorphs :default [expr compiled-expression]
  (throw (str "Encountered non morphic structure in hierarchy: " compiled-expression)))

(deflens submorphs [expr new-submorphs]
 :fetch 
  (cond
    (morph? expr)
    (let [[self props & submorphs] expr] 
      (apply vector submorphs))
    
    (morph-list? expr) 
    (apply vector expr)
    :default
    (do
      (js* "debugger;")
      (throw (str "Cant get submorphs of: " expr "META " (meta expr)))))
  :putback (putback-submorphs expr new-submorphs))

; PROPERTIES LENS

(deflens properties [morph new-properties]
  :fetch (cond
           (morph? morph) (second morph)
           (morph-list? morph) (into {} (map (fn [key]
                                        [key (map (comp key second) morph)]) 
                                      (->> (map second morph) (apply merge) keys)))
           :default
           (throw (str "Can not access properties of " morph)))
  :putback (cond
             (morph? morph)
             (redefine morph (fn [self old-properties submorphs]
                               (self new-properties submorphs)))
             (morph-list? morph)
             (map (fn [m new-ps]
                    (redefine m (fn [self old-properties submorphs]
                                  (self new-ps submorphs)))) new-properties morph)
             :default
             (throw (str "Can not set properties of " morph))))

; DESCRIPTION LENS

(deflens description [expr new-description]
  :fetch 
  (with-out-str 
    (-> expr meta :description pprint))  
  :putback
  (let [new-expr (if (string? new-description) (morph-eval-str (str "'" new-description)) new-description)] 
    (if (morph? new-expr)
      (vary-meta (morph-eval new-expr) #(merge (meta expr) %))
      (vary-meta (morph-eval new-expr) merge {:expanded-expression? true
                                              :description new-expr
                                              :changes {}})))) 

; CHANGES LENS

(defn enum [xs]
  (map vector (range) xs))

(deflens changes [expr new-changes]
  :fetch (reduce add-changes 
                 {:recompile? (or (-> expr meta :changes :recompile?) false)
                  :structure (or (-> expr meta :changes :structure) []) 
                  :properties (let [prop-changes (-> expr meta :changes :properties)]
                                (if (empty? prop-changes)
                                  {}
                                  {(-> expr second :id) prop-changes}))} 
                 (map (fn [[idx submorph]] 
                                (update (fetch submorph changes) 
                                        :properties 
                                        (fn [prop-changes]
                                          (if (or (empty? prop-changes) 
                                                  (-> submorph second :id))
                                            prop-changes
                                            {[submorphs idx] (get prop-changes nil)})))
                                (fetch submorph changes)) 
                              (enum (fetch expr submorphs))))
  :putback (let [old-changes (-> expr meta :changes)]
             (if (= old-changes new-changes)
               expr
               (apply-changes expr new-changes))))

(defmulti morph-lens (fn [expr id lens]
                       (ast-type expr)))

(defmethod morph-lens :vector 
  ([morphs id lens]
   (some (fn [[idx m]]
           (morph-lens m id (conj lens idx))) (enum morphs))))

(defmethod morph-lens :expr 
  ([expression id lens]
   (if (= (fetch expression [properties :id]) id)
       lens
     (when-let [morphs (fetch expression submorphs)]
         (morph-lens morphs id (conj lens submorphs))))))

(defmethod morph-lens :morph 
  ([morph id lens]
   (if (= (fetch morph [properties :id]) id)
       lens
     (when-let [morphs (fetch morph submorphs)]
         (morph-lens morphs id (conj lens submorphs))))))

(defmethod morph-lens
  :default
  ([morphs id lens]
   (if (every? #(or (morph? %) (expanded-expression? %)) (remove nil? morphs))
       (some (fn [[idx m]]
           (morph-lens m id (conj lens idx))) (enum morphs))
     (throw (str "Encountered non morphic structure in hierarchy: " morphs)))))

(def $morph-cache (atom {}))

(defn cached-morph-lens [world-state id]
  (or
   (let [cached-ref (get $morph-cache id)]
     cached-ref) 
   (do
     (let [morph-ref (morph-lens world-state id [it])]
       (swap! $morph-cache assoc id morph-ref)
       morph-ref))))

(defn $morph 
  ([id]
   (create-lens
    (fn [_ world-state]
      (fetch world-state (cached-morph-lens world-state id)))
    (fn [_ world-state new-morph]
      (putback world-state (cached-morph-lens world-state id) new-morph))))
  ([world-state id]
   (morph-lens world-state id [it])))

; WORLD OPERATIONS

(defn owner [world-state id]
  (let [lens-path ($morph world-state id)]
    (match (take-last 2 lens-path)
           [submorphs (true :<< number?)] (fetch world-state (drop-last 2 lens-path))
           :default nil)))

(defn position-in-world 
  ([world-state id]
   (position-in-world world-state ($morph world-state id) {:x 0 :y 0}))
  ([parent lens-path pos]
   (if (empty? lens-path)
     pos
     (let [next-morph (fetch parent (first lens-path))]
       (if (morph? next-morph)
         (position-in-world next-morph (rest lens-path) (add-points pos (fetch next-morph [properties :position])))
         (position-in-world next-morph (rest lens-path) pos))))))

(defn global-bounds [world-state morph-id]
  (let [[_ {extent :extent} _] (fetch world-state ($morph morph-id))]
    [(position-in-world world-state morph-id) extent]))

(defn contains-morph? [world-state morph other]
  (let [bounds-a (global-bounds world-state morph)
        bounds-b (global-bounds world-state other)
        contains (contains-rect? bounds-a bounds-b)]
    contains))

(defn move-morph [world-state id new-parent-id]
  "return a world, where morph (id) has been moved to the morph
   with the new-parent-id. Additionally the relative position of
   the newly added morph is being adopted, so that it does not
   change position. This is a semantic expectation from a morphic move."
  (if (not= id new-parent-id)
    (let [moved-morph (fetch world-state ($morph id))
          {gpx :x gpy :y} (position-in-world world-state new-parent-id)
          global-pos (position-in-world world-state id)
          relative-pos (add-points global-pos {:x (- gpx) :y (- gpy)})]
      (-> world-state
        (without id)
        (add-morph new-parent-id moved-morph)
        (set-prop id :position relative-pos)))
    world-state))

(defn morph-under-me 
  ([world-state id]
   "Returns the id of the morph below morph of id"
   ; We traverse the morph hierarchy just like a scenegraph
   (morph-under-me world-state "world" id))
  ([world-state container-id id]
   (let [[_ _ & submorphs] (fetch world-state ($morph container-id))
         sub-container-id (some-morph (reverse submorphs) ; first match is the topmost morph
                              (fn [_ props _]
                                (when (and
                                       ; wo dont want to return ourselves or
                                       ; or one of our submorphs
                                     (not (= (props :id) id))
                                     (contains-morph? world-state (props :id) id))
                                  (morph-under-me world-state (props :id) id))))]
     (or sub-container-id container-id))))

; MORPH FUNCTIONS

(defn set-prop [world id prop-name prop-value]
  "Set the property prop-name of morph with id in world to prop-value"
  (putback world [($morph id) properties prop-name] prop-value))

(defn => 
  ([world id prop-name]
   (cond
     (fetch world id) (fetch world [id properties prop-name])
     :default (fetch world [($morph id) properties prop-name])))
  ([world id prop-name new-value]
   (if (and (bi-lens? id) (fetch world id))
     (let [v (fetch world [id properties prop-name])] 
         (cond 
         (fn? new-value) (putback world [id properties prop-name] (new-value v))
                   :default (putback world [id properties prop-name] new-value)))
     (let [v (fetch world [($morph id) properties prop-name])]
       (cond 
         (fn? new-value) (set-prop world id prop-name (new-value v))
         :default (set-prop world id prop-name new-value))))))

(defn add-morphs-to [world id morphs]
  "Add collection of morphs to the morph with id in world"
  (-> world (redefine ($morph id) (fn [self props submorphs]
                           (self props 
                                 morphs
                                 submorphs)))))

(defn add-morph [world id morph]
  "Add single morph to the morph with id"
  (-> world (redefine ($morph id) (fn [self props submorphs]
                           (self props
                                 submorphs
                                 morph)))))

(defn add-morph-before [world id before-id morph]
  "Just as add-morph, but adds morph in front of the morph with before-id"
  (-> world (redefine ($morph id) (fn [self props submorphs]
                                    (let [[before after] (split-with (fn [[_ {:id id} & _]]
                                                                     (not= id before-id)) 
                                                                     submorphs)]
                                      (self props
                                            before
                                            morph
                                            after))))))

(defn without [world id]
  "Return a world without the morph with the given id."
  (redefine world ($morph id) (fn [self props submorphs])))

(defn unsubscribe [world-state observer]
  (let
    [observees (-> (fetch world-state ($morph observer)) meta :observees)
     world-state (reduce (fn [w observee]
                           (putback w ($morph observee) 
                                    (vary-meta (fetch w ($morph observee)) 
                                               update :observers disj observer)))
                         world-state observees)]
    world-state))

(defn observe [world-state observer observee observee-redefined observee-removed]
  (-> world-state
    (putback ($morph observer) (-> (fetch world-state ($morph observer)) 
                                 (vary-meta update :observees #(-> % (conj observee) set))
                                 (vary-meta assoc 
                                            :observee-redefined observee-redefined
                                            :observee-removed observee-removed)))
    (putback ($morph observee) (-> (fetch world-state ($morph observee))
                                 (vary-meta update :observers #(-> % (conj observer) set))))))

; RENDERING
; props to css conversion

(def html5TransformProperty "WebkitTransform")
(def html5TransformOriginProperty "WebkitTransformOrigin")

(defn get-fill-css [value]
  {"background" value})

(defn get-position-css [value]
   {"position" "absolute" 
    "left" (:x value)
    "top" (:y value)})

(defn get-extent-css [value]
  {"height" (:y value)
   "width" (:x value)})

(defn get-border-width-css [value]
  {"borderWidth" value
   "borderStyle" "solid"})

(defn get-opacity-css [value]
  {"opacity" value})

(defn get-border-color-css [value]
  {"borderColor" value
   "borderStyle" "solid"})

(defn get-border-radius-css [value]
  {"borderRadius" (str value "px")})

(defn get-border-style-css [value]
  {"borderStyle" value})

(defn get-drop-shadow-css [value]
  (when value {"boxShadow" "0 18px 40px 10px rgba(0, 0, 0, 0.36)" 
               "WebkitTransition" "box-shadow 0.5s"}))

(defn get-plain-css [value]
  value)

(defn get-transform-css [{rotation :rotation, scale :scale, pivot :pivot-point, 
                          :or {rotation 0, scale 1, pivot {:x 0, :y 0}}}]
  {html5TransformProperty (str "rotate(" (mod (/ (* rotation 180) js/Math.PI) 360) "deg) scale(" scale "," scale ")")
   html5TransformOriginProperty (str (:x pivot) "px " (:y pivot) "px")})

(defn get-visibility-css [value]
  {"visibility" (if value "visible" "hidden")})

(defn dict->js [dict]
  (apply js-obj (apply concat (seq dict))))

(defn extract-morph-shape-css [props]
  (apply merge 
      (map (fn [[prop value]]               
               (case prop 
                 (:scale :rotation :pivot-point) (get-transform-css props)
                 :visible (get-visibility-css value)
                 :extent (get-extent-css value)
                 :border-width (get-border-width-css value)
                 :border-color (get-border-color-css value)
                 :fill (get-fill-css value)
                 :opacity (get-opacity-css value)
                 :border-radius (get-border-radius-css value)
                 :border-style (get-border-style-css value)
                 :drop-shadow (get-drop-shadow-css value)
                 :css (get-plain-css value)
                 ;; more to come... 
                 nil)) props)))

; TEXT

(defn get-font-family-css [family-name]
  {"fontFamily" family-name})

(defn get-font-size-css [size]
  {"fontSize" (str size "pt")})

(defn get-max-text-height-css [height]
  {"maxHeight" (str height "px")})

(defn get-max-text-width-css [width])

(defn get-min-text-height-css [height])

(defn get-min-text-width-css [height])

(defn get-text-color-css [color]
  {"color" color})

(defn get-prevent-selection-css [value]
  (when (false? value) {"WebkitUserSelect" "none"}))

(defn extract-text-css [props]
     (apply merge 
       (map (fn [[prop value]]               
          (case prop 
               :font-family (get-font-family-css value)
               :font-size (get-font-size-css value)
               :max-text-height (get-max-text-height-css value)
               :max-text-width (get-max-text-width-css value)
               :min-text-height (get-min-text-height-css value)
               :min-text-width (get-min-text-width-css value)
               :text-color (get-text-color-css value)
               :allow-input (get-prevent-selection-css value)
               nil)) props)))

(defn extract-morph-css [props]
  (dict->js
    (apply merge 
      (map (fn [[prop value]]               
               (case prop 
                 :position (get-position-css value)
                 ;; more to come... 
                 nil)) props))))

; this is just boilerplate code to transform the react events
; into FRP signals that can be used in a functional manner

(defn extract-html-attributes [props]
  #js {:style (extract-morph-css props)
       :onClick (event/extract-click-handler props)
       :onDoubleClick (event/extract-double-click-handler props)
       :onMouseEnter (event/extract-mouse-enter-handler props)
       :onMouseLeave (event/extract-mouse-leave-handler props)
       :onDragEnter (event/extract-drag-enter-handler props)
       :onDragLeave (event/extract-drag-leave-handler props)
       :onMouseMove (event/extract-mouse-move-handler props)
       :onScroll (event/extract-mouse-scroll-handler props)
       :onMouseDown (event/extract-mouse-down-handler props)
       :onMouseUp (event/extract-mouse-up-handler props)})

(defn even-out [morphs]
  (reduce (fn [morphs morph]
            (if (vector? morph)
              (concat morphs morph)
              (concat morphs [morph]))) [] morphs))

(defn default-meta [morph]
  (let [[self props & submorphs] morph
        compile-required-props (->> props
                                 (filter #(when 
                                            (seq? (val %)) 
                                            (-> % val first (= 'fn))))
                                 keys)]
    {:cached-code (atom nil) ; holds the stringified ast pretty printed to prevent unnessecary re-pprints
     :compiled-props {} ; dictionary of all props that need to be compiled and the compiled values
     :changes {:recompile? (not (empty? compile-required-props))}
     :requires-compile compile-required-props}))

(defn ensure-meta [morph]
  (let [morph (if (meta morph)
                morph
                (with-meta morph (default-meta morph)))]
    morph))

(defn generate-expr-token [expr]
  (str (.now js/Date)))

(defn scheduled-for-compile? [expr]
  (and (meta expr) (-> expr meta :abstraction-id)))

; (defn rectangle [props & submorphs]
;   (ensure-meta (apply list 'rectangle props (even-out submorphs))))

; (defn ellipse [props & submorphs]
;   (ensure-meta (apply list 'ellipse props (even-out submorphs))))

; (defn image [props & submorphs]
;   (ensure-meta (apply list 'image props (even-out submorphs))))

; (defn text [props & submorphs]
;   (ensure-meta (apply list 'text props (even-out submorphs))))

; (defn polygon [props & submorphs]
;   (ensure-meta (apply list 'polygon props (even-out submorphs))))

; (defn io [props  & submorphs]
;   "io-morphs are used to communicate with external javascript
;   applications so that they can be incorporated into the
;   render chain. 
  
;   In order to do this, the user defines an additional
;   function that gets passed the properties and returns a 
;   part of the dom defined in terms of oms html tag interface.
  
;   Additionally the user needs to define an init method,
;   that defines, how the application is initialized from the
;   rendered dom structure. The init method gets supplied with
;   the props AND the dom node that was rendered from the the html
;   node. In here, the user may perform all operations and wireing
;   that is nessecary to get the application starting. 
;   "
;   (ensure-meta (apply list 'io props (even-out submorphs))))

; we should check the shema to weat out bugs

(declare render-rectangle 
         render-ellipse 
         render-polygon 
         render-text 
         render-image
         render-io-morph)

(defn render-placeholder [morph]
  nil) ; render nothing. Its fine.

(defmulti render 
  "render function, that traverses a morph tree and derives
  a tree of om-components"
  (fn [expr ns]
    (cond 
      (morph? expr) :morph
      (morph-list? expr) :vector
      :default (throw (str "Can not render " expr)))))

(defmethod render :vector [morphs]
  (apply dom/div nil (map render morphs)))

(defmethod render :morph [morph]
  (let [[self props & args] morph
            props (merge props (-> morph meta :compiled-props))]
    (match [self props args]
           ['cljs-morphic.helper/rectangle* {:id id} submorphs] (om/build render-rectangle [props submorphs] {:react-key id})
           ['cljs-morphic.helper/ellipse* {:id id} submorphs] (om/build render-ellipse [props submorphs] {:react-key id})
           ['cljs-morphic.helper/text* {:id id} submorphs] (om/build render-text [props submorphs] {:react-key id})
           ['cljs-morphic.helper/image* {:id id} submorphs] (om/build render-image [props submorphs] {:react-key id})
           ['cljs-morphic.helper/polygon* {:id id} submorphs] (om/build render-polygon [props submorphs] {:react-key id})
           ['cljs-morphic.helper/io* {:id id} submorphs] (om/build render-io-morph [props submorphs] {:react-key id})
           :else (prn "Can not render: " morph))))

(defn render-rectangle [[props submorphs]]
  (reify
    om/IRender
    (render [self]
            ; morph
            (dom/div (extract-html-attributes props) 
              ; shape 
              (apply dom/div #js {:style (dict->js (extract-morph-shape-css props))}
                (map render submorphs))))))

(defn render-ellipse [[props submorphs]]
  ; morph
  (reify
    om/IRender
    (render [self]
            (dom/div (extract-html-attributes props)
              (let [offset (props :extent)
                    x-offset (str (/ (:y offset) 2) "px !important")
                    y-offset (str (/ (:x offset) 2) "px !important")
                    style (extract-morph-shape-css props)]
                ; shape
                (dom/div 
                  #js {:style (dict->js (assoc style "borderRadius" 
                                               (str (-> props :extent :x) "px /" (-> props :extent :y) "px"))) } 
                  (apply dom/div #js {:className "originNode"
                                      :style #js {:position "absolute",
                                                  :top y-offset,
                                                  :left x-offset,
                                                  :marginTop "-2px",
                                                  :marginLeft "-2px"}}
                    (map render submorphs))))))))

(defn create-text-node [text-props]
  (dom/span #js {:className "visible Selection"
                 :contentEditable (or (not (contains? text-props :allow-input)) 
                                      (:allow-input text-props))
                 :style (clj->js (extract-text-css text-props))
                 :ref "myInput"} (:text-string text-props)))

(defn render-text [[props _]] ; text morphs do not render submorphs
  (reify 
    om/IRender
    (render [self]
            ; morph
            (dom/div (extract-html-attributes props)
              ;shape  
              (dom/div (clj->js {:style (assoc (extract-morph-shape-css props) "cursor" "default")
                                 :className "Morph Text"})
                (create-text-node props))))))

(defn render-image [[props submorphs]]
  (reify
    om/IRender
    (render [self]
            ; morph
            (apply dom/div (extract-html-attributes props)
              ;shape
              (dom/img (clj->js {:style (extract-morph-shape-css props)
                                 ; :draggable false
                                 :src (props :url)}))
              (map render submorphs)))))

(defn io-morph-loop [props owner]
  (reset! (om/get-state owner :io-running?) true)
  (go-loop []
    (let [v (<! (props :output))]
      (>! signals {:type :io 
                   :target-props props 
                   :args {:value v}})
      (when @(om/get-state owner :io-running?) (recur)))))

(defn render-io-morph [[props submorphs] owner]
  (reify
        om/IInitState
        (init-state [self] {:io-running? (atom false)})
        om/IDidMount
        (did-mount [self]
                   ((props :init) props (.getDOMNode owner))
                   (io-morph-loop props owner))
        om/IWillUnmount
        (will-unmount [self]
                      (reset! (om/get-state owner :io-running?) false))
        om/IWillUpdate
        (will-update [self [next-props _ _ _] _]
                     (reset! (om/get-state owner :io-running?) false)
                     (io-morph-loop next-props owner))
        om/IRender
        (render [self]
                ; morph
                (dom/div (extract-html-attributes props)
                  (dom/div (clj->js {:style (extract-morph-shape-css props)})
                    ((props :html) props))))))

(defn render-root [morph _]
  (reify
    om/IRender
    (render [self]
      (apply dom/div #js {:id "rootNode" :style #js {"position" "absolute"}} 
        (map render morph)))))

(def default-world-state
  [(rectangle {:id "world" 
              :extent {:x 1500 :y 1000} 
              :position {:x 0 :y 0} 
              :fill "darkgrey"}
              (text
               {:font-size 70,
                :text-color "gray",
                :draggable? true,
                :id "load-label",
                :position {:y 338, :x 587},
                :text-string "Loading...", 
                :font-family "Chrono Medium Italic"}))
  (rectangle {:id "handMorph" :fill "red" :extent {:x 2 :y 2}})])

(def world-state 
  ; holds the ast that is responsible for rendering the world
  (atom default-world-state))

(def om-world-state (om/root-cursor world-state))

(defn rerender [new-world-state]
  (om/update! om-world-state new-world-state))

(defn evolve [init-world init-transitions signals]
  "This function evolves an init-world by reacting to signals via init-transitions.
   init-transitions is a set of behaviors defining how to react to the current signals value and return a
   new world with new transitions."
  (let [new-worlds (chan)]
    (go
         (loop [world init-world
                transitions init-transitions
                current-signal {:type nil ; the type of signal, i.e. mouse-move, redefine, step...
                                :target-props nil ; in case the signal happens in the context of a morph, we pass its props
                                :args nil ; additional information provided by the current signal (pos, time since last step...)
                                }]
           (let [[new-world new-transitions] (reduce (fn [[w ts] t]
                                                       (try
                                                         (let [transformed (t w current-signal)]
                                                           (if (= transformed :zero) 
                                                             [w (conj ts t)] ; the transform did not apply
                                                             (let [[new-w new-t] transformed] 
                                                               [new-w (conj ts new-t)])))
                                                         (catch js/Error e [w (conj ts t)]))) ; new world, new transform
                                                     [world []] transitions)]
             ; place the new world into the output channel
             (>! new-worlds new-world)
             ; repeat by fetching a new single and operate based on new signals
             (recur new-world new-transitions (<! signals)))))
    ; return the new-worlds channel such that the caller can consume the new worlds
    new-worlds))

(om/root
  render-root
  world-state
  {:target (. js/document (getElementById "app"))
  :tx-listen (fn [tx-data world-state])})