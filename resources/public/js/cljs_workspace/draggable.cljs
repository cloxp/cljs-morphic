(ns cljs-workspace.draggable
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [goog.events :as events]
            [goog.events.EventType :as EventType]
            [cljs.core.async :as async :refer [>! <! put! chan]]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [goog.style :as gstyle]
            
            ; [clojure.browser.repl :as repl]
            )
  (:import [goog.events EventType]))

(def clicked-morph
  (atom nil))

(def prev-cursor-pos
  (atom [0 0]))

;; draggin functions 

(declare shape)
(declare render-submorphs)

(defn listen [el type]
  (let [out (chan)]
    (events/listen el type #(put! out %))
    out))

(defn element-offset [el]
  (let [offset (gstyle/getPageOffset el)]
    [(.-x offset) (.-y offset)]))

(defn location [e]
  [(.-clientX e) (.-clientY e)])

(defn drag [e app offset]
  (let [old-pos (get-in @app [:morph :Position])
        [prev-cursor-x, prev-cursor-y] @prev-cursor-pos
        [delta-x, delta-y] [(- (.-clientX e) prev-cursor-x) (- (.-clientY e) prev-cursor-y)]
        [new-pos-x, new-pos-y] [(+ (old-pos :x) delta-x) (+ (old-pos :y) delta-y)]]
    (when (and (= (@app :id) @clicked-morph) (get-in @app [:morph :isDraggable]))
      (swap! prev-cursor-pos #(identity [(.-clientX e) (.-clientY e)]))
      (om/update! app [:morph :Position] {:x new-pos-x :y new-pos-y} :update))))

(defn stop-dragging [e app]
  (swap! clicked-morph #(identity nil))
  (doto js/window
      (events/unlisten EventType.MOUSEUP stop-dragging)
      (events/unlisten EventType.MOUSEMOVE #(drag % app nil)))) ;; let the event propagate further down ??

(defn start-dragging [e app owner]
  (swap! prev-cursor-pos #(identity [(.-clientX e) (.-clientY e)]))
  (when (not @clicked-morph) (swap! clicked-morph #(@app :id)))
    ;; start listening for mouse movements in the window in case the mouse cursor
    ;; escapes temporarily from the dragged morph
    (let [[offset-x, offset-y] (element-offset (om/get-node owner))]
      (doto js/window
        (events/listen EventType.MOUSEUP stop-dragging)
        (events/listen EventType.MOUSEMOVE #(drag % app [offset-x offset-y]))))) ;; let the event propagate further down
