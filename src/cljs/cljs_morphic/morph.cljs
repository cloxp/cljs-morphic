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
            [clojure.string :refer [replace-first split-lines]]
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

(def ^:dynamic *silent* false)

(def redefinitions (chan))

(declare world-state current-namespace)

(declare without)

(declare rerender redefine on-drag)

(declare add-morph add-morph-before without set-prop)

(defn bi-lens? [x]
  (and (satisfies? IFetch x) (satisfies? IPutback x)))

; unpack the previously added changes (BUG: what if expression originally comes with a '-> ?)

(defmulti changes->form* (fn [expr changes opts] 
                          (if (:loop-mapping opts) 
                            (first expr)
                            :default)))

(defn changes->form 
  ([expr changes opts]
   (let [expr (if (= '-> (first expr))
                (or (-> expr meta :init-description)
                    (second expr)) 
                expr)]
     (changes->form* expr changes opts))))

(defn modify-prototype [prototype-expr unbound-changes]
  (let [[self props & submorphs] prototype-expr]
    (apply list self 
      (merge props unbound-changes)
      submorphs)))

(defmethod changes->form* 'map
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
                                 (list '=> morph prop value))))))
       map-expr))))

(defmethod changes->form* 'for
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
    (or (vector? x) (morph-list? x)) :vector
    :else (throw (str "Encountered non morphic structure in hierarchy " x))))

(deflens it [x y] ; maybe 'self' is a better name than 'it'
  :fetch x
  :putback (cond
             (vector? y) (apply vector (remove nil? y))
             :else y))

(defn redefinition-notify [expr]
  (when-not *silent* 
    (go (>! redefinitions {:type :redefined 
                           :target-props (fetch expr properties)
                           :args {:observers (-> expr meta :observers)}}))))

(defn trigger-property-reactions [morph] morph)

(defn redefine
  ([expression redefinition]
   (redefine expression it redefinition))
  ([world-state lens redefinition]
   (let [expr (fetch world-state lens)]
     (let [new-morph (apply-to-morph redefinition expr)
           new-morph (cond 
                       (or (expanded-expression? new-morph)
                           (morph-list? new-morph)
                           (morph? new-morph))
                       (do
                         (redefinition-notify expr)
                         (trigger-property-reactions new-morph))
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

(defmethod changes->form* :default 
  ([expr {struct-changes :structure
          id->prop-changes :properties} _]
   (if (or (not-empty struct-changes) (-> id->prop-changes empty? not))
     (apply list '-> expr
       (apply concat struct-changes
         (for [[morph prop-changes] id->prop-changes]
           (concat (for [[prop value] prop-changes]
                     (list '=> morph prop value))))))
     expr)))

(defmulti apply-changes 
  "Applies the changes to the expression and also updates the change meta-data accordingly"
  (fn [expr changes] (ast-type expr)))

(defmethod apply-changes :morph [morph changes]
  (morph-eval (changes->form (-> morph meta :description) changes {})))

(defmethod apply-changes :expr [expr changes]
  (let [new-description (changes->form (-> expr meta :sexp) changes {:expanded-expression expr})
        new-expansion (morph-eval new-description)]
    (vary-meta new-expansion merge
      {:expanded-expression? true
       :init-description (expr meta :init-description)
       :sexp new-description})))

; SUBMORPH LENS

(defmulti putback-submorphs (fn [expr new-submorphs] (ast-type expr)))

(defmethod putback-submorphs :morph [morph new-submorphs]
  (redefine morph (fn [self props submorphs]
                    (go (>! redefinitions {:type :redefined :target-props props}))
                    (let [new-submorphs (remove nil? new-submorphs)]
                      (self props new-submorphs)))))


(defmethod putback-submorphs :expr [expr new-submorphs]
  (redefine expr (fn [self props submorphs]
                    (go (>! redefinitions {:type :redefined :target-props props}))
                   (let [new-expansion (if (morph-list? expr)
                                         ; transport meta to the new list of morphs
                                         (with-meta (remove nil? new-submorphs) (meta expr))
                                         ; meta is already preserved
                                         (self props (remove nil? new-submorphs)))]
                     new-expansion))))

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

(defn merge-meta-data [old-expr new-expr]
  (putback (vary-meta new-expr #(merge (meta old-expr) %)) submorphs 
           (map merge-meta-data
                (concat (fetch old-expr submorphs) (iterate identity {})) 
                (fetch new-expr submorphs))))

(defn get-total-expr-len 
  [source-map]
  (let [offset (-> source-map meta :offset)
        children (when 
                   (or (morph? source-map) (morph-list? source-map)) 
                   (fetch source-map submorphs))]
    (if children
      (apply + 1 offset (map get-total-expr-len children))
      offset)))

(defn idx->range&ref 
  ([idx source-map]
   (idx->range&ref idx source-map [it] 0))
  ([idx source-map ref start]
   (let [offset (+ start (-> source-map meta :offset))
         children (when (or (morph? source-map) (morph-list? source-map))  
                    (fetch source-map submorphs))]
     (when (< start idx)
      (or (loop [i 0
                 s children
                 o offset]
            (if (empty? s)
              (when (< idx o) 
                {:range [start o]
                 :ref (apply vector ref)})
              (or (idx->range&ref idx (first s) (concat ref [submorphs i]) o)
                  (recur (inc i) (rest s) (+ o (get-total-expr-len (first s))))))))))))

(defn pprinted-expr-len [expr indent] 
  (->> 
    (with-out-str (pprint expr))
    split-lines
    (reduce (fn [len l2]
              (let [c (count l2)]
                (if (> c 0) 
                  (+ 1 len indent c)
                  len))) 0)))

(declare description*)

(defn description-for-morph* [m-expr indent prev-desc] 
  (let [md (-> m-expr meta :description) 
        self (first md)
        props (second m-expr)
        l    (- (pprinted-expr-len (list self props) indent) 3)
        prev-submorphs (if (morph? prev-desc) 
                         (concat (fetch prev-desc submorphs) (repeat nil))
                        (repeat nil))]
    (with-meta (apply list self props (map #(description* %1 (inc indent) %2) 
                                           (fetch m-expr submorphs)
                                           prev-submorphs)) 
      {:offset l
       :hide-abstraction? (-> prev-desc meta :hide-abstraction?)
       :abstraction? (expanded-expression? m-expr)})))

(defn description-for-morph-list* [m-expr indent prev-desc] 
  (let [prev-submorphs (if (morph-list? prev-desc) 
                         (concat (fetch prev-desc submorphs) (repeat nil))
                        (repeat nil))]
    (with-meta (mapv #(description* %1 (inc indent) %2) 
                     (fetch m-expr submorphs)
                     prev-submorphs) 
      {:offset 1
       :morph-list? true
       :hide-abstraction? (-> prev-desc meta :hide-abstraction?)
       :abstraction? (expanded-expression? m-expr)})))

(defn description* 
  ([expr indent]
   (description* expr indent nil))
  ([expr indent prev-desc]
  (cond
    (expanded-expression? expr)
    (cond
      (and (morph? expr) (-> prev-desc meta :hide-abstraction?)) 
      (description-for-morph* expr indent prev-desc)
      (and (morph-list? expr) (-> prev-desc meta :hide-abstraction?))
      (description-for-morph-list* expr indent prev-desc)
      :default
      (let [desc (changes->form 
                   (-> expr meta :sexp) 
                   (fetch expr changes)
                   {:expanded-expression expr})
            l (pprinted-expr-len desc indent)]
        (with-meta desc {:offset l
                         :morph-list? (morph-list? expr)
                         :hide-abstraction? false
                         :abstraction? true})))
    (morph? expr)
        (description-for-morph* expr indent prev-desc))))

(defn source-map 
  ([] 
   (create-lens
    (fn [_ expr] (description* expr 0))
       identity))
  ([prev-sm] 
   (create-lens
     (fn [_ expr] (description* expr 0 prev-sm))
        identity)))

(defn folding-info [source-map ref]
  (let [expr (fetch source-map ref)
        sm-info (meta expr)]
    (when (:abstraction? sm-info)
      (if (:hide-abstraction? sm-info)
        :collapsable
        :expandable))))

(defn structure-info [source-map ref]
  (let [expr (fetch source-map ref)
        sm-info (meta expr)]
    (if (:morph-list? sm-info)
        :morph-list
        :morph)))

(defn expand-abstraction [world sm sm-ref target]
  (let [m (vary-meta (fetch sm sm-ref) assoc :hide-abstraction? true)
        sm (putback sm sm-ref m)]
    (fetch world [target (source-map sm)])))

(defn collapse-morph [world sm sm-ref target]
  (let [m (vary-meta (fetch sm sm-ref) assoc :hide-abstraction? false)
        sm (putback sm sm-ref m)]
    (fetch world [target (source-map sm)])))

(deflens description [expr new-description]
  :fetch 
  (let [desc (description* expr 0)]
    (with-out-str (pprint desc)))  
  :putback
  (let [new-expr (if (string? new-description) 
                   (morph-eval (read-string (str "'" new-description))) 
                   new-description)] 
    (if (morph? new-expr)
      (merge-meta-data expr (morph-eval new-expr))
      (vary-meta (morph-eval new-expr) merge {:expanded-expression? true
                                              :sexp new-expr
                                              :init-description new-expr
                                              :changes {}}))))

(defn optimization* [expr]
  "Works only on expanded expressions: This needs to traverse the whole morph hierarchy... TODO:"
  (cond
    (expanded-expression? expr)
    (cond
      (-> expr meta :break-abstraction?) 
      (changes->form
                 (-> expr meta :description)
                 (fetch expr changes)
                 {})
      :default
      (changes->form
                 (-> expr meta :sexp)
                 (fetch expr changes)
                 {:expanded-expression expr
                  :loop-mapping true}))
    (morph? expr)
    (let [d (-> expr meta :description)
          self (first d)
          props (second d)]
      (apply list self props (map optimization* (fetch expr submorphs))))))

(deflens optimization [expr _]
  :fetch
  (optimization* expr)
  :putback
  expr)

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
     (when-let [m (and cached-ref (fetch world-state cached-ref))] 
       (when (= id (fetch m [properties :id])) cached-ref))) 
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
  (let [lens-path (if (fetch world-state id)
                    id 
                    ($morph world-state id))]
    (match (take-last 2 lens-path)
           [submorphs (true :<< number?)] (fetch world-state (drop-last 2 lens-path))
           :default nil)))

(defn ellipse? [morph]
  (= 'cljs-morphic.helper/ellipse* (first morph)))

(defn position-in-world 
  ([world-state ref]
   (if-let [m (fetch world-state ref)]
     ; this step is nessecary, because we need to flatten the lens, in order to count the steps
     (position-in-world world-state ($morph world-state (fetch m [properties :id])) {:x 0 :y 0})
     (position-in-world world-state ($morph world-state ref) {:x 0 :y 0})))
  ([parent lens-path pos]
   (if (empty? lens-path)
     pos
     (let [next-morph (fetch parent (first lens-path))
           ellipse-ext (when (ellipse? parent) (fetch parent [properties :extent]))]
       (add-points (if ellipse-ext
                     (let [{:keys [x y]} ellipse-ext]
                       {:x (* 0.5 x) :y (* 0.5 y)})
                     {:x 0 :y 0})
                   (cond
                     (morph? next-morph)
                     (position-in-world next-morph (rest lens-path) (add-points pos (fetch next-morph [properties :position])))
                     :default
                     (position-in-world next-morph (rest lens-path) pos)))))))

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
          relative-pos (add-points global-pos {:x (- gpx) :y (- gpy)})
          relative-pos (if (ellipse? (fetch world-state ($morph new-parent-id)))
                         (let [{:keys [x y]} (=> world-state new-parent-id :extent)]
                           (add-points relative-pos {:x (/ (- x) 2) :y (/ (- y) 2)}))
                         relative-pos)]
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

(defn call=> [world id fn-name & args]
  (apply (-> 
           (cond
             (fetch world id) (fetch world id)
             :default (fetch world ($morph id))) meta :compiled-props fn-name) world args))

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
  (if ($morph world id)
    (redefine world ($morph id) (fn [self props submorphs]))
    world))

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

(defn extract-morph-class [props]
  (or (:css-class props) "Morph"))

(defn extract-html-attributes [props]
  #js {:style (extract-morph-css props)
       :className (extract-morph-class props)
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

(defn flatten-morphs [morphs]
  "Transform a nested collection of morphs into
   a flattened one. Note, that this will eradicate
   expanded expressions, so it should only be used
   when preparing a morph for rendering."
  (reduce (fn [morphs morph]
            (if (morph? morph)
              (concat morphs [morph])
              (concat morphs (flatten-morphs morph)))) 
          [] morphs))

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
  (fn [expr]
    (cond 
      (morph-list? expr) :vector
      (morph? expr) :morph
      :default (throw (str "Can not render " expr)))))

(defmethod render :vector [morphs]
  (apply dom/div nil (map render morphs)))

(defmethod render :morph [morph]
  (let [[self props & args] morph
            props (merge props (-> morph meta :compiled-props))]
    ; (render-morph self props submorphs)
    (match [self props args]
           ['cljs-morphic.helper/rectangle* {:id id} submorphs] 
           (om/build render-rectangle [props submorphs] {:react-key id})
           ['cljs-morphic.helper/ellipse* {:id id} submorphs] 
           (om/build render-ellipse [props submorphs] {:react-key id})
           ['cljs-morphic.helper/text* {:id id} submorphs] 
           (om/build render-text [props submorphs] {:react-key id})
           ['cljs-morphic.helper/image* {:id id} submorphs] 
           (om/build render-image [props submorphs] {:react-key id})
           ['cljs-morphic.helper/polygon* {:id id} submorphs] 
           (om/build render-polygon [props submorphs] {:react-key id})
           ['cljs-morphic.helper/io* {:id id} submorphs] 
           (om/build render-io-morph [props submorphs] {:react-key id})
           :else (prn "Can not render: " morph))))

(defmulti render-morph (fn [self props submorphs] self))

(defmethod render-morph 'cljs-morphic.helper/rectangle* [self props submorphs]
  )

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
                    x-offset (str (/ (:y offset) 2) "px")
                    y-offset (str (/ (:x offset) 2) "px")
                    style (extract-morph-shape-css props)]
                ; shape
                (dom/div 
                  #js {:style (dict->js (assoc style "borderRadius" 
                                               (str (-> props :extent :x) "px /" (-> props :extent :y) "px"))) }
                  (dom/div (clj->js {:style {:position "absolute",
                                             :top y-offset,
                                             :left x-offset,
                                             :marginTop "-2px",
                                             :marginLeft "-2px"}})
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
                (apply dom/div (extract-html-attributes props)
                  (dom/div (clj->js {:style (extract-morph-shape-css props)})
                    ((props :html) props))
                  (map render submorphs)))))

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
                                                         (catch js/Error e (do
                                                                             (prn e)
                                                                             [w (conj ts t)])))) ; new world, new transform
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