(ns cljs-morphic.morph.window
  (:require [cljs-morphic.morph :refer [rectangle image ellipse find-morph
                                        set-prop position-in-world redefine]]
            [cljs-morphic.helper :refer-macros [morph-fn] :refer [add-points]]))

(declare window)

(morph-fn layout-morph [self props submorphs]
     ((props :layout) self props submorphs))

(defn layout [submorphs]
  "traverse the morph hierarchy and enforce the defined layout properties"
  submorphs)

(morph-fn window-resizer [window props submorphs]
          (window props submorphs
                  (-> (rectangle {:fill "red" 
                                  :id "resizer"
                                  :draggable? true
                                  :position (add-points (props :extent) {:x -25 :y -25})
                                  :extent {:x 25 :y 25} 
                                  :css {"cursor" "nwse-resize"}
                                  :on-drag (fn [world id]
                                             (let [[_ {pos :position} _] (find-morph world id)]
                                               (redefine world (props :id) 
                                                         (fn [window props submorphs]
                                                           (window (assoc props :extent (add-points pos {:x 25 :y 25}))
                                                                   (layout submorphs))))))}))))

(morph-fn window [self props submorphs]
          (let [window-ext (add-points {:x 0 :y 30} (props :extent))
                window-pos (add-points {:x 0 :y -30} (props :position))
                window-id  (str "window-on-" (props :id))]
            (-> (rectangle {:id window-id
                          :position window-pos
                          :extent window-ext
                          :border-color "grey"
                          :fill "linear-gradient(to bottom, #f0f0f0, #e9e9e9)"
                          :border-radius 10
                          :border-width 1
                          :drop-shadow true
                          :draggable? true}
                         (self (assoc props :position {:x 0 :y 30} :draggable? false) submorphs))
              ; window-resizer
              )))