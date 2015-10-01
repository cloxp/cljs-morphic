(ns cljs-morphic.morph.editor
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [cljs-morphic.macros :refer [morph-fn io ellipse rectangle text]])
  (:require [cljs-morphic.morph :refer [$morph add-morph without set-prop redefine properties submorphs =>]]
            [fresnel.lenses :refer [fetch]]
            [cljs-morphic.helper :refer [add-points]]
            [cljs.core.async :as async :refer [>! <! put! chan timeout onto-chan]]
            [cljs.pprint :refer [pprint]]
            [om.dom :as dom :include-macros true]))

; EDITOR

(defn set-value! [ace-instance value]
  (let [cursor (.getCursorPositionScreen ace-instance)]
    (.setValue ace-instance value cursor)
    (.resize ace-instance true)))

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
       :layout (fn [world new-props]
                 (redefine world ($morph name) 
                           (fn [editor props submorphs]
                             (.resize (.edit js/ace name) true)
                             (editor (merge props new-props) submorphs))))
       :mouse-move (fn [world self cursor-pos client-pos]
                     (if-let [token (get-numeric-token-at (.edit js/ace name) client-pos)]
                       (=> world self :css-class "Morph scrubbing")
                       (=> world self :css-class "Morph")))
       :mouse-down-left (fn [world self cursor-pos client-pos]
                          (if (= (=> world self :css-class) "Morph scrubbing")
                            (let [token (get-numeric-token-at (.edit js/ace name) client-pos)]
                              (set-token-selection! (.edit js/ace name) token)
                              (redefine world ($morph "world") 
                                        (fn [w props submorphs]
                                          (w props submorphs (scrubber-pane (.edit js/ace name) 
                                                                            client-pos 
                                                                            (:extent props)
                                                                            (fetch world [self properties :output])
                                                                            (:value token))))))
                            world))
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
      (loop-mapping-button name {:x 49, :y -27})))