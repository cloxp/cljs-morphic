(ns cljs-morphic.morph.editor
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [cljs-morphic.morph :refer [io]]
            [cljs-morphic.helper :refer-macros [morph-fn]]
            [cljs.core.async :as async :refer [>! <! put! chan timeout onto-chan]]
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
           :init-value value
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
                       (recur))))})))