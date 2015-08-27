(ns cljs-morphic.morph.window
  (:require [cljs-morphic.morph :refer [rectangle image ellipse text
                                        set-prop position-in-world redefine $morph]]
            [fresnel.lenses :refer [fetch]]
            [cljs-morphic.helper :refer-macros [morph-fn] :refer [add-points]]))

(declare window)

(morph-fn layout-morph [self props submorphs]
     ((props :layout) self props submorphs))

(def control-height 14)

(defn close-box [target-id]
  (ellipse
   {:id (str "close-on-" target-id)
    :position {:x 10 :y 10}
    :fill "#ff6052"
    :mouse-enter '(fn [world self-ref] 
                    (redefine world self-ref 
                                (fn [self props submorphs]
                                  (self props (set-prop submorphs "close-label" :visible true)))))
    :mouse-leave '(fn [world self-ref] 
                    (redefine world self-ref 
                                (fn [self props submorphs]
                                  (self props (set-prop submorphs "close-label" :visible false)))))
    :mouse-click '(fn [world self-ref]
                    (let [target (fetch world [self-ref properties :target-id])]
                      (without world target)))
    :extent {:x control-height :y control-height}
    :target-id target-id} 
   (text {:position {:x -2 :y -6}
          :id "close-label"
          :text-string "×"
          :font-size 10
          :allow-input false
          :visible false})))

(defn min-box [target-id]
  (ellipse 
   {:id (str "min-box-on-" target-id)
    :position {:x 30 :y 10}
    :extent {:x control-height :y control-height}
    :fill "#ffbe06"
    :mouse-enter '(fn [world self-ref] 
                    (redefine world self-ref 
                                (fn [self props submorphs]
                                  (self props (set-prop submorphs "min-label" :visible true)))))
    :mouse-leave '(fn [world self-ref] 
                    (redefine world self-ref 
                                (fn [self props submorphs]
                                  (self props (set-prop submorphs "min-label" :visible false)))))
    :mouse-click '(fn [world self-ref]
                    (let [target (fetch world [self-ref :properties :target-id])
                          width (fetch world [($morph target) :properties :extent :x])]
                  (set-prop world target {:x width :y 30})))
    :target-id target-id}
   (text {:position {:x -2 :y -6}
          :id "min-label"
          :text-string "−"
          :font-size 10
          :allow-input false
          :visible false})))

(morph-fn window-controls [window props submorphs]
          (window props submorphs
                  (close-box (:id props))
                  (min-box (:id props))))

(morph-fn window-resizer [window props submorphs]
          (window props submorphs
                  (-> (image {:url "http://localhost:8084/resize.png" 
                              :id (str "resizer-on-" (props :id))
                              :window-id (:id props)
                              :target-id (:target-id props)
                              :opacity 0.3
                              :draggable? true
                              :position (add-points (props :extent) {:x -25 :y -25})
                              :extent {:x 25 :y 25} 
                              :css {"cursor" "nwse-resize"}
                              :on-drag '(fn [world id]
                                         (let [[_ {pos :position win :window-id target :target-id} _] (fetch world ($morph id))
                                               new-extent (add-points pos {:x 25 :y 25})]
                                           (-> world
                                             (set-prop win :extent new-extent)
                                             (set-prop target :extent (add-points {:x 0 :y -30} new-extent)))))}))))

(morph-fn window [self props submorphs]
          (let [window-ext (add-points {:x 0 :y 30} (props :extent))
                window-pos (add-points {:x 0 :y -30} (props :position))
                window-id  (str "window-on-" (props :id))]
            (-> (rectangle {:id window-id
                            :inspectable? true
                          :position window-pos
                          :extent window-ext
                          :border-color "grey"
                          :fill "linear-gradient(to bottom, #f0f0f0, #e9e9e9)"
                          :border-radius 10
                          :border-width 1
                          :drop-shadow true
                          :draggable? true
                          :target-id (:id props)}
                         (self (assoc props :position {:x 0 :y 30} :draggable? false) submorphs))
              window-controls
              window-resizer)))