(ns cljs-morphic.morph.halo
  (:require-macros [cljs-morphic.macros :refer [rectangle image ellipse morph-fn ]])
  (:require [cljs-morphic.morph :refer [find-morph
                                        set-prop position-in-world $morph redefine properties]]
            [cljs-morphic.helper :refer [add-points]]
            [fresnel.lenses :refer [fetch]]))

(declare resize-button inspect-button close-button)

(defn halo [world-state id]
  "Render a halo element for morph with id"
  (let [[_ {ext :extent pos :position} _] (fetch world-state ($morph id))]    
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

(defn align-buttons [world-state]
  (redefine world-state ($morph "halo")
            (fn [halo props buttons]
              (-> (halo props buttons)
                (set-prop "infoButton" :position (add-points {:x ((props :extent) :x) :y 0} {:x 5 :y -15}))))))

(morph-fn resize-button [halo props submorphs target-id]
          (halo props 
                submorphs
                (ellipse {:fill "rgba(255,255,255,0.4)"
                          :extent {:x 25 :y 25}
                          :id "resizeButton"
                          :position (add-points (props :extent) {:x 0 :y 0})
                          :draggable? true
                          :target-id target-id
                          :on-drag (fn [world id {dx :x dy :y}]
                                     (-> world
                                       (redefine ($morph (fetch world [($morph id) properties :target-id])) 
                                                   (fn [self props submorphs]
                                                     (self (assoc props :extent (add-points (:extent props) {:x (- dx) :y (- dy)})) submorphs)))
                                        (redefine ($morph "halo") 
                                                  (fn [halo props buttons]
                                                    (let [new-extent (add-points (:extent props) {:x (- dx) :y (- dy)})]
                                                      (-> (halo (assoc props :extent new-extent) buttons)
                                                        (set-prop "infoButton" :position (add-points {:x (:x new-extent) :y 0} {:x 5 :y -15}))))))
                                       ))}
                         (image {:id "resizeImage"
                                 :position {:x -5 :y -5} 
                                 :url "http://lively-web.org/core/media/halos/resize.svg" 
                                 :extent {:x 15 :y 15}}))))

(morph-fn close-button [halo props submorphs]
          (halo props 
                submorphs
                (ellipse {:fill "rgba(255,255,255,0.4)"
                          :extent {:x 25 :y 25}
                          :id "closeButton"
                          :position {:x -25 :y -25}}
                         (image {:id "closeImage"
                                 :position {:x -5 :y -5} 
                                 :url "http://lively-web.org/core/media/halos/close.svg" 
                                 :extent {:x 15 :y 15}}))))

(morph-fn inspect-button [halo props submorphs]
          (halo props 
                submorphs
                (ellipse {:fill "rgba(255,255,255,0.4)"
                          :extent {:x 25 :y 25}
                          :id "infoButton"
                          :position (add-points {:x ((props :extent) :x) :y 0} {:x 5 :y -15})}
                         (image {:id "infoImage"
                                 :position {:x -5 :y -5} 
                                 :url "http://lively-web.org/core/media/halos/info.svg" 
                                 :extent {:x 15 :y 15}}))))