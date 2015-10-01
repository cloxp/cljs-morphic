(ns cljs-morphic.event
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [cljs.core.async :as async :refer [>! <! put! chan timeout onto-chan]]))

(def signals (chan))

(defn get-cursor-pos [e]
  {:x (.-pageX e) :y (.-pageY e)})

(defn get-client-pos [e]
  {:x (.-clientX e) :y (.-clientY e)})

(defn extract-mouse-down-handler [props]
  (fn [e]
    (.preventDefault e)
    (let [morph-id (props :id)
          right? (.-altKey e)
          args {:pos (get-cursor-pos e)
                :client-pos (get-client-pos e)}]
      (go
       (if right?
        (>! signals {:type :mouse-down-right :target-props props :args args})
        (>! signals {:type :mouse-down-left :target-props props :args args}))))))

(defn extract-mouse-up-handler [props]
  (fn [e]
    (.preventDefault e)
    (let [pos (get-cursor-pos e)
          right? (.-altKey e)
          args {:pos (get-cursor-pos e)
                :client-pos (get-client-pos e)}]
      (go
       (if right?
        (>! signals {:type :mouse-up-right :target-props props :args args})
        (>! signals {:type :mouse-up-left :target-props props :args args}))))))

(defn extract-double-click-handler [props]
  (fn [e]
    (.preventDefault e)
    (let [pos (get-cursor-pos e)]
       (go
         (>! signals {:type :mouse-double-click :target-props props :args {:pos pos}})))))

(defn extract-click-handler [props]
  (fn [e]
    (.preventDefault e)
    (let [right-click? (.-altKey e)
          args {:pos (get-cursor-pos e)
                :client-pos (get-client-pos e)}]
      (go
       (if right-click?
         (>! signals {:type :click-right :target-props props :args args})
         (>! signals {:type :click-left :target-props props :args args}))))))

(defn extract-mouse-enter-handler [props]
  (fn [e]
    (.preventDefault e)
    (go
     (>! signals {:type :mouse-enter :target-props props :args {}}))))

(defn extract-mouse-leave-handler [props]
  (fn [e]
    (.preventDefault e)
    (go
     (>! signals {:type :mouse-leave :target-props props :args {}}))))

(defn extract-drag-enter-handler [props]
  (fn [e]
    (.preventDefault e)
    (go
       (>! signals {:type :mouse-enter-dragging :target-props props :args {}}))))

(defn extract-drag-leave-handler [props]
  (fn [e]
    (.preventDefault e)
    (go
       (>! signals {:type :mouse-leave-dragging :target-props props :args {}}))))

(defn extract-mouse-move-handler [props]
  (fn [e]
    (.preventDefault e)
    (let [pos (get-cursor-pos e)
          client-pos (get-client-pos e)]
      (go
       (>! signals {:type :mouse-move :target-props props 
                    :args {:pos pos
                           :client-pos client-pos}})))))

(defn extract-mouse-scroll-handler [morph]
  ; mouseScroll
  )

(defn extract-blur-handler [morph]
  ; mouseBlurr
  )