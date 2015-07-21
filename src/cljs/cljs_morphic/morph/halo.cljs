(ns cljs-morphic.morph.halo
  (:require [cljs-morphic.morph :refer [rectangle image ellipse find-morph
                                        set-prop position-in-world]]
            [cljs-morphic.helper :refer-macros [morph-fn] :refer [add-points]]))

(declare resize-button inspect-button close-button)

(defn halo [world-state id]
  "Render a halo element for morph with id"
  (let [[_ {ext :extent pos :position} _] (find-morph world-state id)]    
    (conj world-state
          (-> (rectangle {:id "halo" :border-color "red" :border-width 1
                          :layout (fn [self props submorphs]
                                    (self props
                                          (-> submorphs
                                            (set-prop "infoButton" :position 
                                                      (add-points {:x ((props :extent) :x) :y 0} {:x 5 :y -15})))))
                          :extent ext
                          :position (position-in-world world-state id)})
            (resize-button id)
            (close-button)
            (inspect-button)))))

(morph-fn resize-button [halo props submorphs target-id]
          (halo props 
                submorphs
                (ellipse {:fill "rgba(255,255,255,0.4)"
                          :extent {:x 25 :y 25}
                          :id "resizeButton"
                          :position (add-points (props :extent) {:x 0 :y 0})
                          :draggable? true 
                          :on-drag (fn [world id]
                                     (let [global-pos (position-in-world world id)
                                           target-pos (position-in-world world target-id)
                                           new-extent (add-points global-pos {:x (- (- 5) (target-pos :x)) 
                                                                              :y (- (- 5) (target-pos :y))})]
                                       (-> world
                                         (set-prop target-id :extent new-extent)
                                         (set-prop "halo" :extent new-extent))))}
                         (image {:id "resizeImage"
                                 :position {:x -5 :y -5} 
                                 :url "http://lively-web.org/core/media/halos/resize.svg" 
                                 :extent {:x 15 :y 15}}))))

(morph-fn close-button [halo props submorphs]
          (halo props 
                submorphs
                (-> (image {:position {:x -15 :y -15} 
                            :url "http://lively-web.org/core/media/halos/close.svg" 
                            :extent {:x 15 :y 15}
                            :id "closeButton"}))))

(morph-fn inspect-button [halo props submorphs]
          (halo props 
                submorphs
                (-> (image {:position (add-points {:x ((props :extent) :x) :y 0} {:x 5 :y -15}) 
                            :url "http://lively-web.org/core/media/halos/info.svg" 
                            :extent {:x 15 :y 15}
                            :id "infoButton"}))))