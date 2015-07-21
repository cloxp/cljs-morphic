(ns cljs-morphic.morph.editor
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [cljs-morphic.morph :refer [io]]
            [cljs-morphic.helper :refer-macros [morph-fn]]
            [cljs.core.async :as async :refer [>! <! put! chan timeout onto-chan]]
            [om.core :as om :include-macros true]
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

(defn ace-editor [value pos ext name]
  (-> (io {:input (chan) ; this channel is to pipe information to the js-script (optional to prevent rerendering)
           :output (chan) ; this channel is collected by morphic to generate :io signals (mandatory)
           :state (atom {:edited-value value})
           :extent ext
           :position pos
           :id name
           :draggable? true
           :inspectable? true
           :html (fn [props]
                    (dom/div  (clj->js {:id (props :id) 
                                        :style  {:height (-> props :extent :y) :width (-> props :extent :x)} 
                                        :className "ace"})))
           :init (fn [props dom-node]
                   (let [local-state (props :state)
                         ace-instance (.edit js/ace (props :id))
                         clojure-mode (-> js/ace
                                        (.require "ace/mode/clojure")
                                        .-Mode)]
                     (.. ace-instance
                         getSession
                         (on "change" #(change-handler ace-instance local-state)))
                     (.. ace-instance
                         -commands
                         (addCommand  (clj->js {:name "save"
                                                :bindKey {:win "Ctrl-S" :mac "Ctrl-S" :sender "editor|cli"}
                                                :exec #(save-handler ace-instance (props :output))})))
                     (set! (.-$blockScrolling ace-instance) js/Infinity)
                     (.setMode (.getSession ace-instance) (clojure-mode.))
                     (.setTheme ace-instance "ace/theme/github")
                     (set-value! ace-instance (@local-state :edited-value))
                     (go-loop []
                       (let [new-value (<! (props :input))]
                         (set-value! ace-instance new-value)
                         (swap! local-state assoc :edited-value new-value))
                       (recur))))})))