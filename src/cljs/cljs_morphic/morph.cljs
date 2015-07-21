(ns cljs-morphic.morph
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [goog.events :as events]
            [goog.events.EventType :as EventType]
            [cljs.core.async :as async :refer [>! <! put! chan timeout onto-chan]]
            [cljs.contrib.pprint :refer [pprint]]
            [clojure.walk :refer [walk]]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [goog.style :as gstyle]
            [goog.dom :as gdom]
            [cljs.reader :refer [read-string]]
            [cljs-morphic.event :as event :refer [signals]]
            [cljs-morphic.helper :refer [applicative add-points bottom-right apply-to-morph contains-rect?
                                         bounds some-morph eucl-distance morph? expanded-expression?]
             :refer-macros [morph-fn]]
            [cljs.core.match :refer-macros [match]]
            [clojure.zip :as zip :refer [zipper node down right up children root replace path rights end?]]
            [clojure.string :refer [replace-first]]
            [clojure.data :refer [diff]]
            [rksm.cloxp-com.messenger :as m]
            [rksm.cloxp-com.cloxp-client :as cloxp])
  (:import [goog.events EventType]))

(enable-console-print!)

; WORLD FUNCTIONS
; global channel that all events that happen are dispatched through

(def redefinitions (chan))

(declare world-state)

(declare rectangle ellipse image text polygon ace-editor without)

(declare rerender redefine on-drag read-morph)

(defn merge-changes [cha chb]
  {:removed (concat (:removed cha) (:removed chb))
   :added (concat (:added cha) (:added chb))
   :set-props (merge (:set-props cha) (:set-props chb))})

(defn diff-morph [old-morph new-morph]
  "Returns a dictionary containing all the changes between ma and mb.
   This includes all changes in the props and also all changes within 
   the submorphs."
  ; determine changes in submorphs
  (let [submorph-changes (merge-changes (-> old-morph meta :changes) (-> new-morph meta :changes))
        [_ old-props _] old-morph
        [_ new-props _] new-morph
        [removed-props changed-props _] (diff old-props new-props)]
    (if changed-props
      (assoc-in submorph-changes  [:set-props (:id new-props)] changed-props)
      changed-props)))

(defn diff-submorphs [old-submorphs new-submorphs]
  (let [old-ids (map (fn [expr]
                       (if (expanded-expression? expr)
                         (-> expr meta :abstraction-id)
                         (-> expr second :id))) old-submorphs)
        new-ids (map (fn [expr]
                       (if (expanded-expression? expr)
                         (-> expr meta :abstraction-id)
                         (-> expr second :id))) new-submorphs)
        [removed-morphs added-morphs _] (diff old-ids new-ids)
        changed-props (:set-props (reduce merge-changes (map diff-morph old-submorphs new-submorphs)))]
    {:removed removed-morphs
     :added added-morphs
     :set-props changed-props}))

(defn ast-type [x]
  (cond
    (and (list? x) (morph? x)) :morph
    (expanded-expression? x) :expr
    (vector? x) :vector))

(defn apply-changes-to [expr changes]
  (list '-> expr
        '(set-prop :id :prop :value)
        '(without :id)
        '(add-morphs-to :id :morphs)))

(defmulti makenode ast-type)

(defmulti get-children ast-type)

(defmethod get-children :morph [morph]
  (let [[self props & submorphs] morph]
                    submorphs))

(defmethod get-children :expr [expr]
  (:expanded-expression (meta expr)))

(defmethod get-children :vector [morph-col]
  morph-col)

(defmethod makenode :morph [morph new-submorphs]
  (let [[self props & old-submorphs] morph
        old-changes (-> morph meta :changes)
        _ (prn old-changes)
        new-changes (when-not (empty? old-submorphs)
                      (merge-changes old-changes (diff-submorphs old-submorphs new-submorphs)))]
    (with-meta 
      (apply list self props (filter not-empty new-submorphs))
      (assoc (meta morph) :changes new-changes))))

(defmethod makenode :expr [expr new-expansion]
  (let [expansion (:expanded-expression (meta expr))]
    (if (morph? expansion)
      (let [changes (diff-morph expansion new-expansion)]
        (with-meta expr 
          (assoc (meta (apply-changes-to expr changes)) 
                 :expanded-expression new-expansion
                 :changes changes)))
      (let [new-morph-col (apply vector (filter not-empty new-expansion))
            changes (map diff-morph expansion new-morph-col)]
        (with-meta expr 
          (assoc (meta (apply-changes-to expr changes)) 
                 :expanded-expression new-morph-col
                 :changes changes))))))

(defmethod makenode :vector [morph-col new-morph-col]
  (apply vector (filter not-empty new-morph-col)))

(defn world-zipper [world]
  (zipper ast-type 
          get-children
          makenode
          world))

(defn find-morph-loc
  [ast id]
  (let [expr (node ast)
        node-id (if (morph? expr)
                  (-> expr second :id)
                  (-> expr meta :abstraction-id))]
    (if (= node-id id)
      ast
      (when-not (end? ast)
        (find-morph-loc (zip/next ast) id)))))

(defn find-morph [root-ast id]
  (let [ast (world-zipper root-ast)
        loc (find-morph-loc ast id)]
    (when loc 
      (let [m (node loc)
            [self props & submorphs] m]
        (with-meta (list (applicative m) props submorphs) (meta m))))))

(defn owner [root-ast id]
   (when-let [loc (find-morph-loc root-ast id)]
     (up loc)))

(defn position-in-world 
  ([world-state id]
   (position-in-world (find-morph-loc (world-zipper world-state) id)))
  ([ast-loc]
  "return the global position of the morph with id"
  (if ast-loc 
    (let [[_ {pos :position} _] (node ast-loc)] 
      (add-points (position-in-world (up ast-loc)) pos))
    {:x 0 :y 0})))

(defn global-bounds [world-state morph-id]
  (let [[_ {extent :extent} _] (find-morph world-state morph-id)]
    [(position-in-world world-state morph-id) extent]))

(defn contains-morph? [world-state morph other]
  (let [bounds-a (global-bounds world-state morph)
        bounds-b (global-bounds world-state other)
        contains (contains-rect? bounds-a bounds-b)]
    (when contains (prn bounds-a " contains " bounds-b))
    contains))

(defn move-morph [world-state id new-parent-id]
  "return a world, where morph (id) has been moved to the morph
   with the new-parent-id. Additionally the relative position of
   the newly added morph is being adopted, so that it does not
   change position. This is a semantic expectation from a morphic move."
  (prn "moving " id " to ->" new-parent-id)
  (if (not= id new-parent-id)
    (let [[self props submorphs] (find-morph world-state id)
          {gpx :x gpy :y} (position-in-world world-state new-parent-id)
          global-pos (position-in-world world-state id)
          relative-pos (add-points global-pos {:x (- gpx) :y (- gpy)})] 
      (prn "relative-pos " relative-pos)
      (prn "global-pos " global-pos)
      (-> world-state
        (without id)
        (redefine new-parent-id (fn [new-owner now-props now-submorphs]
                                  (new-owner now-props
                                             now-submorphs 
                                             ; we also need to adapt the position
                                             ; which is now relative to the new owner
                                             (self (assoc props :position relative-pos) submorphs))))))
    world-state))

(defn morph-under-me 
  ([world-state id]
   "Returns the id of the morph below morph of id"
   ; We traverse the morph hierarchy just like a scenegraph
   (morph-under-me world-state "world" id))
  ([world-state container-id id]
   (let [[_ _ submorphs] (find-morph world-state container-id)
         sub-container-id (some-morph (reverse submorphs) ; first match is the topmost morph
                              (fn [_ props _]
                                (when (and
                                       ; wo dont want to return ourselves or
                                       ; or one of our submorphs
                                     (not (= (props :id) id))
                                     (contains-morph? world-state (props :id) id))
                                  (morph-under-me world-state (props :id) id))))]
     (or sub-container-id container-id))))

(defn handle-morph-redefine [loc new-morph]
  (let [new-ast (read-morph (zip/replace loc new-morph))
        new-morph (node new-ast)
        [_ new-props _] new-morph
        redef-args {:id (:id new-props)
                    :new-props new-props
                    :restructured? (not= @(:hash (meta new-morph)) (hash new-morph))}]
    (reset! (:hash (meta new-morph)) (hash new-morph))
    (go 
     (onto-chan redefinitions 
                (map (fn [[_ props _]] 
                       {:type :redefined :target-props props :args redef-args}) (path loc)) false)
     (>! redefinitions {:type :redefined :target-props new-props :args redef-args}))
    new-ast))

(defn handle-morph-remove [loc old-morph]
  (let [[_ old-props _] old-morph
        redef-args {:id (:id old-props) 
                    :restructured? true}]
    (go 
     (onto-chan redefinitions 
                (map (fn [[_ props _]] 
                       {:type :redefined :target-props props :args redef-args}) (path loc)) false))
    (go (>! redefinitions {:type :removed :target-props old-props}))
    (zip/remove loc)))

(defn redefine 
  ([world-state redefinition]
   ; if no explicit ref is given, we will apply the transformation to all morphs in the current level
   (let [ast (world-zipper world-state)]
     (map (fn [m] (apply-to-morph redefinition m)) ast (children ast))))
  ([world-state id redefinition]
   (let [ast (world-zipper world-state)
         ast-loc (find-morph-loc ast id)]
     (if ast-loc
       (let [old-morph (node ast-loc)
             redefined-structure (apply-to-morph redefinition old-morph)
             new-ast (if redefined-structure
                       (handle-morph-redefine ast-loc redefined-structure)
                       (handle-morph-remove ast-loc old-morph))]
         (root new-ast))
       world-state))))

; MORPH FUNCTIONS

(defn set-prop [world id prop-name prop-value]
  "Set the property prop-name of morph with id in world to prop-value"
  (-> world (redefine id (fn [self props submorphs]
                           (self (assoc props prop-name prop-value) 
                                 submorphs)))))

(defn add-morphs-to [world id morphs]
  "Add collection of morphs to the morph with id in world"
  (-> world (redefine id (fn [self props submorphs]
                           (self props 
                                 morphs
                                 submorphs)))))

(defn without [world id]
  "Return a world without the morph with the given id."
  (-> world (redefine id (fn [self props submorphs]))))

(defn get-description 
  ([world-state id]
   "In this case we just return a plain old new description. This is kind of expensive though."
   (let [morph (find-morph world-state id)
         [self props submorphs] morph]
     (reset! (get (meta morph) :cached-code) (-> (self props submorphs)
                                                 pprint
                                                 with-out-str))))
  ([world-state id change]
   "If we supply a change {:id :prop :value} with our request, we return a description
    based on the previously cached one and just replace the changed information
    with regexp magic."
   (let [morph (find-morph world-state id)
         [self props submorphs] morph
         cached-code (:cached-code (meta morph))
         morph-re (str "\\{[^\\(]*\\:id\\s\\\"" (:id change) "\\\"[^\\(]*\\}(\n?)")
         new-props (:new-props change)]
     (if (or (:restructured? change) (nil? @cached-code))
       (do
         ; we have not cached or the morph got moved, so the change is not helpful at all
         (reset! cached-code (-> (self props submorphs)
                                 pprint
                                 with-out-str)))
       (do
         ; we have cached the value previously, so we can now just apply a regexp substitute
         ; or just return the cached value
         (if (nil? new-props)
           @cached-code
           (swap! cached-code #(replace-first % (re-pattern morph-re)
                                              (-> new-props 
                                                pprint
                                                with-out-str)))))))))

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

(defn get-transform-css [{rotation :Rotation, scale :Scale, pivot :PivotPoint, 
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

; COMPILATION

(def current-namespace (atom "cljs-morphic.morph"))

(def cljs-compile-handler
  '(do
     (require '[rksm.cloxp-cljs.ns.internals]
              '[cljs.repl :as repl]
              '[rksm.cloxp-com.cljs-repl :as cljs-repl]
              '[clojure.tools.reader :refer [read-string]]
              '[rksm.cloxp-com.messenger :as m]
              '[rksm.cloxp-com.server :as s])
     (fn [con msg]
       
       ; the clopx cljs passive repl env
       (defrecord CloxpCljsPassiveReplEnv [server client-id]
         repl/IJavaScriptEnv
         (-setup [this opts] {:status :success :value nil})
         (-evaluate [this filename line js] {:status :success :value js})
         (-tear-down [_]))
       
       (let [client-id (-> msg :data :cloxp-client)
             {:keys [server] :as connection} (s/find-connection client-id)
             compiled-js (cljs.env/with-compiler-env (:compiler-env (rksm.cloxp-cljs.ns.internals/ensure-default-cljs-env))
                           (cljs-repl/eval-cljs
                            (read-string (get-in msg [:data :exp]))
                            (->CloxpCljsPassiveReplEnv server client-id)
                            {:ns-sym (symbol (-> msg :data :required-namespace))}))]
         (m/send con (m/prep-answer-msg con msg compiled-js false))))))

(defn start-cljs-compile-service [con]
  (go
   (let [register-msg {:action "register"
                       :data {:id (:id con)
                              :cloxp-client? true
                              :services (-> con :services deref keys)
                              :document-url (. js/document -URL)}}
         add-service-msg {:action "add-service"
                          :data {:name "cljs-compile-service" :handler (str cljs-compile-handler)}}
         client-id (:id con)
         register-answer (<! (m/send con register-msg))
         add-service-answer (<! (m/send con add-service-msg))]
     (prn "Registering CLJS compilation for client: " client-id)
     (if (= "OK" (-> add-service-answer :message :data))
       (prn "Added CLJS compilation service!")
       (prn (str "CLJS compilation failed to initialize! Response: " add-service-answer))))))

(defn compile-cljs [con exp]
  (go
   (let [eval-cljs-msg {:action "cljs-compile-service"
                        :data {:exp (str exp) 
                               :cloxp-client (:id con) 
                               :required-namespace @current-namespace}}
         compile-cljs-result (<! (m/send con eval-cljs-msg))
         code (-> compile-cljs-result :message :data)
         res (js/eval code)]
     res)))

(defn compile-morph [morph-id morph-description]
  (go (>! signals {:type :compile-morph-request :target-props {:id morph-id} :args {:form morph-description}})))

(defn compile-props [morph]
  (let [[self props & submorphs] morph
        meta-data (meta morph)]
    (go (>! signals {:type :compile-props-request 
                     :target-props {:id (:id props)} 
                     :args {:form (select-keys props @(meta-data :requires-compile))}}))))

(defn compile-expr [expression expr-ref]
  (go (>! signals {:type :compile-expression-request
                   :target-props {:ref expr-ref}
                   :args {:form expression}})))

(defn hot-swapping [world-state {evt-type :type 
                                 {morph-id :id
                                  expr-ref :ref} :target-props 
                                 {compiled-cljs :compiled-cljs
                                  expression :form} :args}]
  (match [evt-type compiled-cljs]
         [(:or :compile-morph-request
               :compile-props-request
               :compile-expression-request) nil] 
         (do
           (when expression 
             (cloxp/with-con 
               (fn [con]
                 (go (let [compiled-cljs (<! (compile-cljs con expression))]
                       (>! signals {:type evt-type 
                                    :target-props {:id morph-id :ref expr-ref} 
                                    :args {:compiled-cljs compiled-cljs
                                           :form expression}}))))))
           :zero)
         ; If the compiled-cljs is NOT nil, the request has been served
         ; and we can plug the compiled cljs into the world
         [:compile-morph-request cljs] [(redefine world-state morph-id 
                                                  (fn [_ _ _]
                                                    compiled-cljs)) hot-swapping]
         [:compile-props-request cljs] [(redefine world-state morph-id 
                                                  (fn [self props submorphs]
                                                    (let [m (self props submorphs)
                                                          meta-data (meta m)]
                                                      (swap! (meta-data :compiled-props) 
                                                             merge cljs)
                                                      m))) hot-swapping]
         [:compile-expression-request cljs] [(let [ast (world-zipper world-state)
                                                   ast-loc (find-morph-loc ast expr-ref)
                                                   new-ast (root (zip/replace ast-loc 
                                                                  (with-meta expression
                                                                    {:abstraction-id expr-ref
                                                                     :expanded-expression cljs})))]
                                               (go 
                                                (onto-chan redefinitions 
                                                           (map (fn [[_ props _]] 
                                                                  {:type :redefined :target-props props :args {:restructured? true}}) (path ast-loc)) false))
                                               new-ast) hot-swapping]
         :else :zero))

(defn default-meta [morph]
  (let [[self props & submorphs] morph]
    {:cached-code (atom nil) ; holds the stringified ast pretty printed to prevent unnessecary re-pprints
     :compiled-props (atom {}) ; dictionary of all props that need to be compiled and the compiled values
     :hash (atom (hash morph)) ; hash used to determine wether the strucutre of the morph hierarchy has changed
     ; TODO: Find a better way to determine if we have functions in our props
     :requires-compile (->> props
                         (filter #(when 
                                    (seq? (val %)) 
                                    (-> % val first (= 'fn))))
                         keys 
                         atom)}))

(defn not-yet-compiled? [morph]
  (let [meta-data (meta morph)]
    (and meta-data 
         (-> meta-data :requires-compile deref not-empty) 
         (not= 
          @(:requires-compile meta-data) 
          (keys @(:compiled-props meta-data))))))

(defn ensure-meta [morph]
  (let [morph (if (meta morph)
                morph
                (with-meta morph (default-meta morph)))]
    (when (not-yet-compiled? morph)
        (compile-props morph))
    morph))

(defn generate-expr-token [expr]
  (str (.now js/Date)))

(defn scheduled-for-compile? [expr]
  (and (meta expr) (-> expr meta :abstraction-id)))

(defn read-morph [ast-loc]
  (let [expr (node ast-loc)]
    (if (vector? expr)
      (zip/prev (read-morph (zip/next ast-loc)))
      (if (morph? expr)
        (let [ast-loc (if (end? (zip/next ast-loc)) 
                        ast-loc
                        (zip/prev (read-morph (zip/next ast-loc))))
              morph (ensure-meta (node ast-loc))]
          (zip/replace ast-loc morph))
        (if (expanded-expression? expr)
          (if (end? (zip/next ast-loc)) 
                        ast-loc
                        (zip/prev (read-morph (zip/next ast-loc))))
          (let [ast-loc (if (zip/right ast-loc) 
                          (zip/left (read-morph (zip/right ast-loc)))
                          ast-loc)
                expr-token (generate-expr-token expr)]
            (if (scheduled-for-compile? expr)
              ast-loc
              (do
                (compile-expr expr expr-token)
                (zip/replace ast-loc (with-meta (list '-> expr) {:abstraction-id expr-token}))))))))))

(defn rectangle [props & submorphs]
  (ensure-meta (apply list 'rectangle props (even-out submorphs))))

(defn ellipse [props & submorphs]
  (ensure-meta (apply list 'ellipse props (even-out submorphs))))

(defn image [props & submorphs]
  (ensure-meta (apply list 'image props (even-out submorphs))))

(defn text [props & submorphs]
  (ensure-meta (apply list 'text props (even-out submorphs))))

(defn polygon [props & submorphs]
  (ensure-meta (apply list 'polygon props (even-out submorphs))))

(defn io [props  & submorphs]
  "io-morphs are used to communicate with external javascript
   applications so that they can be incorporated into the
   render chain. 
  
  In order to do this, the user defines an additional
   function that gets passed the properties and returns a 
   part of the dom defined in terms of oms html tag interface.
  
   Additionally the user needs to define an init method,
   that defines, how the application is initialized from the
   rendered dom structure. The init method gets supplied with
  the props AND the dom node that was rendered from the the html
  node. In here, the user may perform all operations and wireing
  that is nessecary to get the application starting. 
   "
  (ensure-meta (apply list 'io props (even-out submorphs))))

(defn button [props & submorphs]
  (rectangle {:extent (:extent props)}
   (text {:draggable false :string (:label props)}
         submorphs)))

; we should check the shema to weat out bugs

(declare render-rectangle 
         render-ellipse 
         render-polygon 
         render-text 
         render-image
         render-io-morph)

(defn render-placeholder [morph]
  nil) ; render nothing. Its fine.

(defn render [expr]
  (if-not (morph? expr)
    (when (expanded-expression? expr)
      (let [morph (:expanded-expression (meta expr))] 
        (if (morph? morph)
          (render morph)
          (apply dom/div nil (map render morph)))))
    (if (not-yet-compiled? expr)
      ; we encountered an expression that is not yet ready for rendering
      (render-placeholder expr)
      ; we have to branch into the expressions meta-data to continue rendering
      (let [[self props & args] expr
            props (merge props @(:compiled-props (meta expr)))] 
          (match [self props args]
               ['rectangle {:id id} submorphs] (om/build render-rectangle [props submorphs] {:react-key id})
               ['ellipse {:id id} submorphs] (om/build render-ellipse [props submorphs] {:react-key id})
               ['text {:id id} submorphs] (om/build render-text [props submorphs] {:react-key id})
               ['image {:id id} submorphs] (om/build render-image [props submorphs] {:react-key id})
               ['polygon {:id id} submorphs] (om/build render-polygon [props submorphs] {:react-key id})
               ['io {:id id} submorphs] (om/build render-io-morph [props submorphs] {:react-key id})
               :else (prn "Can not render: " expr))))))

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

(defn render-image [[props submorphs]]
  (reify
    om/IRender
    (render [self]
            ; morph
            (apply dom/div (extract-html-attributes props)
              ;shape
              (dom/img (clj->js {:style (extract-morph-shape-css props)
                                 :draggable false
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
                  :extent {:x 1000 :y 1000} 
                  :position {:x 0 :y 0} 
                  :fill "darkgrey"}
                  )
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
    (cloxp/with-con
      (fn [con]
        (go
         (<! (start-cljs-compile-service con))
         (loop [world init-world
                transitions init-transitions
                current-signal {:type nil ; the type of signal, i.e. mouse-move, redefine, step...
                                :target-props nil ; in case the signal happens in the context of a morph, we pass its props
                                :args nil ; additional information provided by the current signal (pos, time since last step...)
                                }]
           (let [[new-world new-transitions] (reduce (fn [[w ts] t]
                                                       (let [transformed (t w current-signal)]
                                                         (if (= transformed :zero) 
                                                           [w (conj ts t)] ; the transform did not apply
                                                           (let [[new-w new-t] transformed] 
                                                             [new-w (conj ts new-t)])))) ; new world, new transform
                                                     [world []] transitions)]
             ; place the new world into the output channel
             (>! new-worlds new-world)
             ; repeat by fetching a new single and operate based on new signals
             (recur new-world new-transitions (<! signals)))))))
    ; return the new-worlds channel such that the caller can consume the new worlds
    new-worlds))

(om/root
 render-root
 world-state
 {:target (. js/document (getElementById "app"))
  :tx-listen (fn [tx-data world-state])})