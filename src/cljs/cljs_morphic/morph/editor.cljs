(ns cljs-morphic.morph.editor
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [cljs-morphic.macros :refer [morph-fn io ellipse rectangle text]])
  (:require [cljs-morphic.morph :refer [$morph add-morph add-morphs-to without set-prop position-in-world 
                                        redefine properties submorphs => idx->range&ref observe
                                        *silent* source-map description optimization
                                        folding-info collapse-morph expand-abstraction]]
            [fresnel.lenses :refer [fetch putback]]
            [cljs-morphic.helper :refer [add-points]]
            [cljs-morphic.morph.window :refer [window]]
            [cljs-morphic.morph.halo :refer [halo]]
            [cljs.core.async :as async :refer [>! <! put! chan timeout onto-chan]]
            [cljs.pprint :refer [pprint]]
            [cljs.core.match :refer-macros [match]]
            [om.dom :as dom :include-macros true]))

; EDITOR

(defn set-value! [ace-instance value]
  (let [session (.. ace-instance -session)
        pos (.. session -selection toJSON)
        scroll (.. session getScrollTop)]
    (.. session (setValue value))
    (.. ace-instance (resize true))
    (.. session -selection (fromJSON pos))
    (.. session (setScrollTop scroll))))

(morph-fn set-editor-value [ace-editor props submorphs value]
          (go (>! (props :input) value))
          (ace-editor props submorphs))

(defn change-handler [ace-instance state]
  (swap! state assoc :edited-value (.getValue ace-instance)))

(defn save-handler [ace-instance output]
  (go (>! output (.getValue ace-instance))))

(defn token-at [ace-instance pos]
  (.. ace-instance
      -session
      (getTokenAt (.-row pos) (.-column pos))))

(defn get-token-bounds [ace-instance token]
  (let [{page-x :pageX page-y :pageY} (js->clj 
                                        (.. ace-instance -renderer (textToScreenCoordinates (:row token) (:start token))) 
                                        :keywordize-keys true)]
    {:position {:x page-x :y page-y}
     :extent {:y 12 :x (* 7 (count (:value token)))}}))

(defn set-token-selection! [ace-instance token]
  (let [sel (.. ace-instance getSelection)
        r (.. sel getRange)]
    (.. r (setStart (:row token) (:start token)))
    (.. r (setEnd (:row token) (+ (count (:value token)) (:start token))))
    (.. sel (setSelectionRange r))))

(defn set-token-value! [ace-instance token value]
  (let [session (.. ace-instance getSession)
        r (.. ace-instance getSelectionRange)]
    (.. session (remove r))
    (.. session (insert (.. r -start) (str value)))))

(defn get-numeric-token-at [ace-instance global-pos]
  (let [ace-pos1 (.. ace-instance -renderer (pixelToScreenCoordinates (:x global-pos) (:y global-pos)))
        ace-pos2 #js {:column (dec (.-column ace-pos1)) :row (.-row ace-pos1)}
        ace-pos3 #js {:column (inc (.-column ace-pos1)) :row (.-row ace-pos1)}
        tokens [(merge (some-> ace-instance (token-at ace-pos1) (js->clj :keywordize-keys true)) 
                       (js->clj ace-pos1 :keywordize-keys true)) 
                (merge (some-> ace-instance (token-at ace-pos2) (js->clj :keywordize-keys true))
                       (js->clj ace-pos2 :keywordize-keys true)) 
                (merge (some-> ace-instance (token-at ace-pos3) (js->clj :keywordize-keys true))
                       (js->clj ace-pos3 :keywordize-keys true))]]
    (some #(when (= (get % :type) "constant.numeric") %) tokens)))

(defn scrubber-pane [ace-instance token-pos extent output scrub-value]
  (rectangle {:id "scrubber-pane" :fill "blue" :opacity 0 :extent extent
              :mouse-up-left (fn [world self]
                               (-> world (without "scrubber-pane")))
              :mouse-move (fn [world self cursor-pos client-pos]
                            (let [token (get-numeric-token-at ace-instance token-pos)]
                              (set-token-selection! ace-instance token)
                              (set-token-value! ace-instance token (+ (int scrub-value) (*
                                                                                         (let [dy (- (:y token-pos) (:y cursor-pos))]
                                                                                           (cond
                                                                                             (> -100 dy) .1
                                                                                             (> dy 100) 10
                                                                                             :default 1)) 
                                                                                         (- (:x cursor-pos) (:x token-pos)))))
                              (save-handler ace-instance output)
                              world))}))

(defn loop-mapping-button [editor-id position]
  (rectangle {:id (str "map-button-of-" editor-id)
                :inspectable? true
                :border-color "grey"
                :border-width 3
                :position position
                :extent {:x 100 :y 20}
                :border-radius 5
                :mouse-click (fn [world self]
                               (let [world (=> world editor-id :mapping-active not)
                                     active (=> world editor-id :mapping-active)
                                     color (if active "lightgreen" "grey")] 
                                 (-> world
                                   (=> self :border-color color)
                                   (=> [self submorphs 0] :text-color color))))}
               (text {:id "map-button-label"
                      :position {:x 5 :y 5}
                      :text-color "grey"
                      :font-size 10
                      :font-family "Chrono Medium Italic"
                      :text-string "Loop Mapping"})))

(defn morph-mapping-button [editor-id position]
  (rectangle {:id (str "morph-button-of-" editor-id)
                :inspectable? true
                :border-color "grey"
                :border-width 3
                :position position
                :extent {:x 100 :y 20}
                :border-radius 5
                :mouse-click (fn [world self]
                               (let [world (=> world editor-id :correspondence-mapping not)
                                     active (=> world editor-id :correspondence-mapping)
                                     color (if active "orange" "grey")]
                                 (-> world
                                   (=> self :border-color color)
                                   (=> [self submorphs 0] :text-color color))))}
               (text {:id "morph-button-label"
                      :position {:x 5 :y 5}
                      :text-color "grey"
                      :font-size 10
                      :font-family "Chrono Medium Italic"
                      :text-string "Morph Mapping"})))

(defn highlight-node [world ace-instance interval morph-ref]
  (if ($morph world "highlighter")
    (do
      (.. ace-instance getSession (removeMarker (=> world "highlighter" :marker)))
      (-> world 
        (=> "highlighter" :position (position-in-world world morph-ref))
        (=> "highlighter" :extent (add-points (=> world morph-ref :extent) {:x -3 :y -3}))
        (=> "highlighter" :marker (.. ace-instance 
                                      getSession 
                                      (addMarker interval 
                                                 "ace-code-highlight" "text"))))) 
    (let [m (.. ace-instance 
                getSession 
                (addMarker interval 
                           "ace-code-highlight" "text"))] 
      (-> world 
        (add-morph "world" (rectangle
                            {:fill "purple",
                             :border-width 3,
                             :opacity 0.3,
                             :id "highlighter",
                             :rotation (or (=> world morph-ref :rotation) 0)
                             :extent (add-points (=> world morph-ref :extent) {:x -3 :y -3}),
                             :border-color "red",
                             :marker m
                             :position (position-in-world world morph-ref)}))))))

(defn clear-highlighting [world ace-instance]
  (if ($morph world "highlighter")
    (do
      (.. ace-instance getSession (removeMarker (=> world "highlighter" :marker)))
      (-> world (without "highlighter")))
    world))

(defn get-morph-node-at [source-map ace-instance client-pos]
  (let [ace-pos (.. ace-instance -renderer (pixelToScreenCoordinates (:x client-pos) (:y client-pos)))
        idx (.. ace-instance (posToIdx ace-pos))
        {:keys [range ref]} (idx->range&ref idx source-map)]
    (when range 
      (let [[start end] range
            idx->pos #(.. ace-instance getSession -doc (indexToPosition %))
            start-pos (idx->pos start)
            end-pos (idx->pos end)
            r ( .. ace-instance getSelectionRange)]
        (.. r (setStart start-pos))
        (.. r (setEnd end-pos))
        {:range r :ref ref}))))

(defn handle-correspondence-mapping [world editor ace-instance client-pos]
  (if-let [node (get-morph-node-at 
              (=> world editor :source-map) 
              ace-instance client-pos)]
    (let [{:keys [range ref]} node
          target-ref [(=> world editor :target-ref) ref]
          folding (folding-info (=> world editor :source-map) ref)]
      (cond-> world
        (= :expandable folding) 
        (=> editor :css-class "Morph zoom-in")
        (= :collapsable folding) 
        (=> editor :css-class "Morph zoom-out")
        true (highlight-node ace-instance range target-ref)))
    world))

(defn zoom-in-node [world editor ace-instance cursor-pos]
  (let [{:keys [range ref]} (get-morph-node-at 
                             (=> world editor :source-map) 
                             ace-instance cursor-pos)
        world (-> world
                (=> editor :source-map #(expand-abstraction world % ref (=> world editor :target-ref)))
                (=> editor :css-class "Morph zoom-out"))
        desc (with-out-str (pprint (=> world editor :source-map)))]
    (set-value! ace-instance desc)
    world))

(defn zoom-out-node [world editor ace-instance cursor-pos]
  (let [{:keys [range ref]} (get-morph-node-at 
                             (=> world editor :source-map)
                             ace-instance cursor-pos)
        world (-> world
                (=> editor :source-map #(collapse-morph world % ref (=> world editor :target-ref)))
                (=> editor :css-class "Morph zoom-in"))
        desc (with-out-str (pprint (=> world editor :source-map)))]
    (set-value! ace-instance desc)
    world))

(defn ace-editor [value pos ext name]
  (io {:input (chan) ; this channel is to pipe information to the js-script (optional to prevent rerendering)
       :output (chan) ; this channel is collected by morphic to generate :io signals (mandatory)
       :init-value value
       :extent ext
       :position pos
       :id name
       :css {"-webkit-clip-path" "inset(-10px 0px 0px 3px round 10px 10px)"}
       :draggable? true
       :inspectable? true
       :on-input (fn [world self input]
                   (set-value! (.edit js/ace name) (:value input))
                   (=> world self :source-map (:source-map input)))
       :layout (fn [world new-props]
                 (redefine world ($morph name) 
                           (fn [editor props submorphs]
                             (.resize (.edit js/ace name) true)
                             (editor (merge props new-props) submorphs))))
       :mouse-move (fn [world self cursor-pos client-pos]
                     (let [ace-instance (.edit js/ace name)
                           token (get-numeric-token-at ace-instance client-pos)]
                       (cond->
                         (-> world
                           (=> self :css-class "Morph")
                           (clear-highlighting ace-instance))
                         (=> world self :correspondence-mapping) (handle-correspondence-mapping 
                                                                  self ace-instance client-pos)
                         token (=> self :css-class "Morph scrubbing"))))
       :mouse-leave (fn [world self]
                      (-> world 
                        (clear-highlighting (.edit js/ace name))
                        (=> self :css-class "Morph")))
       :mouse-down-left (fn [world self cursor-pos client-pos]
                          (case (=> world self :css-class)
                            "Morph scrubbing"
                            (let [token (get-numeric-token-at (.edit js/ace name) client-pos)
                                  output (=> world self :output)]
                              (set-token-selection! (.edit js/ace name) token)
                              (redefine world ($morph "world") 
                                        (fn [w props submorphs]
                                          (w props submorphs (scrubber-pane (.edit js/ace name) 
                                                                            client-pos 
                                                                            (:extent props)
                                                                            output
                                                                            (:value token))))))
                            "Morph zoom-in" (zoom-in-node world self (.edit js/ace name) client-pos)
                            "Morph zoom-out" (zoom-out-node world self (.edit js/ace name) client-pos)
                            "Morph" world))
       :mouse-up-left (fn [world self]
                   (-> world (without "scrubber")))
       :html (fn [props]
               (dom/div  (clj->js {:id (props :id) 
                                   :style  {:height (-> props :extent :y) :width (-> props :extent :x)} 
                                   :className "ace"})))
       :init (fn [props dom-node]
               (let [ace-instance (.edit js/ace (props :id))
                     clojure-mode (-> js/ace
                                    (.require "ace/mode/clojure")
                                    .-Mode)]
                 (.. ace-instance
                     getSession
                     (setMode (clojure-mode.)))
                 (.. ace-instance 
                     (setTheme "ace/theme/github"))
                 (.. ace-instance
                     -commands
                     (addCommand (-> js/ace 
                                   (.require "ace/commands/occur_commands")
                                   .-occurStartCommand)))
                 (.. ace-instance
                     -commands
                     (addCommands (.. js/ace -ext -lang -astCommands)))
                 (.. ace-instance
                     -commands
                     (addCommand  (clj->js {:name "save"
                                            :bindKey {:win "Ctrl-S" :mac "Ctrl-S" :sender "editor|cli"}
                                            :exec #(save-handler ace-instance (props :output))})))
                 
                 (set-value! ace-instance (:init-value props))
                 (go-loop []
                   (let [new-value (<! (props :input))]
                     (set-value! ace-instance new-value))
                   (recur))))}
      (loop-mapping-button name {:x 49, :y -27})
      (morph-mapping-button name {:x 170, :y -27})))

(defn focus-editor-on [world-state editor-id inspected-morph]
  (let [expr (fetch world-state [($morph inspected-morph) (source-map)])
        world-state (-> world-state
                      (=> editor-id :target inspected-morph)
                      (=> editor-id :target-ref ($morph inspected-morph))
                      (=> editor-id :source-map expr)
                      (observe editor-id
                               inspected-morph
                               (fn [world editor inspected-morph _]
                                 (let [ace-instance (.edit js/ace editor-id)
                                       sm (fetch world [($morph inspected-morph) 
                                                          (if (=> world editor :mapping-active)
                                                            optimization 
                                                            (source-map (=> world editor-id :source-map)))])
                                       desc (with-out-str (pprint sm))
                                       world (-> world
                                               (=> editor :source-map sm)
                                               (=> editor :target-ref ($morph inspected-morph)))]
                                   (set-value! ace-instance desc)
                                   (if (=> world editor :mapping-active)
                                     (binding [*silent* true]
                                       (putback world [($morph inspected-morph) description] desc)) 
                                     world)))
                               (fn [world editor inspected-morph]
                                 (-> world
                                   (redefine ($morph editor) (fn [e p s]
                                                               (set-editor-value 
                                                                (e p s) "Target Removed!")))))))]
    (redefine world-state ($morph editor-id) 
              (fn [e p s]
                (let [] 
                  (-> (e p s)
                    (set-editor-value (with-out-str (pprint expr)))))))))

; INSPECTING

(declare inspecting inspection-active)

(defn inspection-protected
  [focused-morph world-state 
   {evt-type :type}]
  (match [evt-type]
         [:mouse-up-left] [world-state (partial inspection-active focused-morph)]
         :else :zero))

(defn part-of-halo? [world-state id]
  (let [halo (fetch world-state ($morph "halo"))]
    (not (nil? ($morph halo id)))))

(defn inspection-active 
  [focused-morph-id world-state 
   {evt-type :type 
    {id :id inspectable? :inspectable? target :target} :target-props
    args :args}]
  (match [evt-type inspectable? id]
         [:mouse-down-right _ "halo"] [(-> world-state (without "halo")) inspecting]
         [(:or :click-right :mouse-down-right) _ _] [world-state (partial inspection-active focused-morph-id)]
         [(:or :mouse-down-left) _ "infoButton"]
         [(let [editor-id (str "editor-on-" focused-morph-id)
                editor (window (ace-editor "" {:x 50 :y 50} {:x 400 :y 400} editor-id))]
            (-> world-state
              (add-morphs-to "world" editor)
              (focus-editor-on editor-id focused-morph-id))) 
          (partial inspection-protected focused-morph-id)]
         [:io _ _] [world-state 
                    (partial inspection-protected focused-morph-id)]
         ; redefine the morph the editor is editing by compiling the new description and hot swapping it
         [:mouse-down-left _ "closeButton"] [(-> world-state 
                                               (without focused-morph-id)
                                               (without "halo")) inspecting]
         [(:or :click-left :mouse-down-left) _ _] ; mouse down left will cancel the inspection any time anywhere
         (if (part-of-halo? world-state id) 
           :zero 
           [(-> world-state (without "halo")) inspecting])
         :else :zero))

(defn inspecting [world-state {evt-type :type 
                               {id :id inspectable? :inspectable? target :target} :target-props
                               args :args}]
  (match [evt-type inspectable?]
         [:mouse-down-right _] [(halo world-state id) (partial inspection-active id)]
         [:io _] [(putback world-state [($morph target) description] (args :value))
                  (partial inspecting)]
         :else :zero))