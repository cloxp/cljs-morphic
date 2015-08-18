(ns cljs-morphic.playground
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [cljs-morphic.morph :refer [rectangle ellipse image
                                        rerender redefine move-morph morph-under-me
                                        without get-description $morph
                                        world-state set-prop add-morphs-to
                                        evolve redefinitions compile-props default-meta
                                        read-morph description properties text]]
            [fipp.edn :refer [pprint]]
            [fresnel.lenses :refer [fetch putback]]
            [cljs-morphic.morph.editor :refer [ace-editor set-editor-value]]
            [cljs-morphic.morph.window :refer [window]]
            [cljs-morphic.morph.halo :refer [halo]]
            [cljs-morphic.event :refer [signals]]
            [cljs-morphic.helper :refer [eucl-distance add-points morph?] :refer-macros [morph-fn]]
            [cljs-morphic.test :as t]
            [cljs.core.async :as async :refer [<! chan close!]]
            [cljs.reader :refer [read-string]]
            [cljs.core.match :refer-macros [match]]
            [rksm.cloxp-com.net :as net]
            [cemerick.cljs.test :refer-macros [deftest testing is run-tests]]))

; EVENT HANDLING

(run-tests 'cljs-morphic.test)

(defn either [transition-a transition-b]
  "Ensures that only one of the given transitions is active at the same time!"
  (fn [world-state signal-value]
    (let [res-a (transition-a world-state signal-value)
          res-b (transition-b world-state signal-value)]
      (if (not= res-a :zero)
        ; a has taken action an therefore has precedence over b
        res-a
        (if (not= res-b :zero)
          res-b
          [world-state (either transition-a transition-b)])))))

; THE HAND!

(defn hand [world-state signal-value]
  (match [signal-value]
         [{:type :mouse-move  
           :args {:pos pos}}] [(-> world-state
                                 (set-prop "handMorph" :position pos)) 
                               hand]
         :else :zero))

; GRABBING

(declare grabbing dragging)

(declare attempt-drag-from dragging-in-progress)

(defn grabbing-in-progress [focus-id world-state
                            {evt-type :type
                             {id :id grab-cb :on-grab} :target-props  
                             {current-pos :pos} :args}]
  (match [evt-type id]
         [:mouse-move focus-id] [(if grab-cb
                                   (grab-cb world-state id current-pos)
                                   world-state) (partial grabbing-in-progress focus-id)]
         [:mouse-up-left _] [(-> world-state 
                               (move-morph focus-id (morph-under-me world-state focus-id))
                               (redefine ($morph focus-id) (fn [self props submorphs]
                                                             (self (dissoc props :drop-shadow) submorphs)))) 
                                                           (either grabbing dragging)]
         :else :zero))

(defn attempt-grab-from [pos focus-id world-state 
                         {evt-type :type
                          {id :id} :target-props  
                          {new-pos :pos} :args}]
  (match [evt-type id]
         [:mouse-move focus-id] 
           (if (< 10 (eucl-distance pos new-pos))
             [(-> world-state
                (move-morph focus-id "handMorph")
                (redefine ($morph focus-id) (fn [self props submorphs]
                                     (self (assoc props :drop-shadow true) submorphs)))) 
              (partial grabbing-in-progress focus-id)]
             [world-state (partial attempt-grab-from pos focus-id)])
         [:mouse-up-left _] [world-state (either grabbing dragging)]
         :else :zero))

(defn grabbing [world-state {evt-type :type
                             {id :id grabbable? :grabbable?} :target-props  
                             {pos :pos} :args}]
  (match [evt-type grabbable?]
         [:mouse-down-left true] [world-state (partial attempt-grab-from pos id)]
         :else :zero))

; DRAGGING

(declare attempt-grab-from grabbing-in-progress)

(defn drag [self props submorphs from {pos-x :x pos-y :y}]
  (let [{dx :x dy :y} (add-points from 
                                    {:x (- pos-x) :y (- pos-y)})
          new-pos (add-points (props :position) {:x (- dx) :y (- dy)})]
      (self (assoc props :position new-pos) submorphs)))

(defn dragging-in-progress [pos focus-id drag-cb world-state
                            {evt-type :type 
                         {id :id} :target-props 
                         {new-pos :pos} :args}]
  (match [evt-type id]
         [:mouse-move _] 
         [(cond-> world-state
            true (redefine ($morph focus-id) (fn [self props submorphs]
                                 (drag self props submorphs pos new-pos)))
            drag-cb (drag-cb focus-id (add-points pos {:x (- (:x new-pos)) :y (- (:y new-pos))}))) 
          (partial dragging-in-progress new-pos focus-id drag-cb)]
         [:mouse-up-left _]
         (do
           (prn "May now be grabbed or dragged!")
           [world-state (either grabbing dragging)])
         :else :zero))

(defn attempt-drag-from [pos focus-id world-state
                         {evt-type :type 
                         {id :id} :target-props 
                         {new-pos :pos} :args}]
  (match [evt-type id]
         [:mouse-move focus-id] 
           (if (< 10 (eucl-distance pos new-pos))
             [world-state (partial dragging-in-progress pos focus-id 
                                   (fetch world-state [($morph focus-id) properties :on-drag]))]
             [world-state (partial attempt-drag-from pos focus-id)])
         [:mouse-up-left _] 
             [world-state (either grabbing dragging)]
         :else :zero))

(defn dragging [world-state {evt-type :type 
                             {id :id draggable? :draggable? } :target-props 
                             {pos :pos} :args}]
  (match [evt-type draggable?]
         [:mouse-down-left true] [world-state (partial attempt-drag-from pos id)]
         :else :zero))

; INSPECTING

(declare inspecting inspection-active add-observer observe)

(defn inspection-protected
  [focused-morph world-state 
   {evt-type :type}]
  (match [evt-type]
         [:mouse-up-left] [world-state (partial inspection-active focused-morph)]
         :else :zero))

(defn part-of-halo? [world-state id]
  (let [halo (fetch world-state ($morph "halo"))]
    (not (nil? ($morph halo id)))))

(defn focus-editor-on [world-state editor-id target-morph]
  (let [world-state (-> world-state
                      (set-prop editor-id :target target-morph)
                      (observe editor-id
                               target-morph
                               (fn [world editor inspected-morph _]
                                 (-> world
                                   (redefine ($morph editor) (fn [e p s]
                                                               (set-editor-value 
                                                                (e p s) (fetch world [($morph inspected-morph) description]))))))
                               (fn [world editor inspected-morph]
                                 (-> world
                                   (redefine ($morph editor) (fn [e p s]
                                                               (set-editor-value 
                                                                (e p s) "Target Removed!")))))))]
    (redefine world-state ($morph editor-id) 
              (fn [e p s]
                (set-editor-value 
                 (e p s) (fetch world-state [($morph target-morph) description]))))))

(defn inspection-active 
  [focused-morph-id world-state 
   {evt-type :type 
    {id :id inspectable? :inspectable? target :target} :target-props
    args :args}]
  (match [evt-type inspectable? id]
         [:mouse-down-right _ "halo"] [(-> world-state (without "halo")) inspecting]
         [(:or :click-right :mouse-down-right) true _] [world-state (partial inspection-active focused-morph-id)]
         [(:or :mouse-down-left) _ "infoButton"]
         [(let [editor-id (str "editor-on-" focused-morph-id)
                editor (window (ace-editor "" {:x 50 :y 50} {:x 400 :y 400} editor-id))]
            (-> world-state
              (add-morphs-to "world" editor)
              (focus-editor-on editor-id focused-morph-id))) 
          (partial inspection-protected focused-morph-id)]
         [:io _ _] [(do
                      (pprint (args :value))
                      world-state) 
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
         [:mouse-down-right true] [(-> world-state
                                     (halo id)) (partial inspection-active id)]
         [:io _] [(do
                    (redefine world-state ($morph target) (fn [_ _ _]
                                               (read-string (args :value)))))
                  (partial inspecting)]
         :else :zero))

; OBSERVING

(defn observe [world-state observer observee observee-redefined observee-removed]
  (-> world-state
    (redefine ($morph observer) (fn [observer p s]
                         (observer 
                          (assoc p :observee-redefined observee-redefined
                                   :observee-removed observee-removed)
                          s)))
    (redefine ($morph observee) (fn [observee p s]
                         (observee 
                          (assoc p :observers (set (conj (p :observers) observer)))
                          s)))))

(defn observing [world-state {evt-type :type 
                              {observee :id observers :observers} :target-props
                              changes :args}]
  "Upon redefinition of a morph a redefinition signal is scheduled,
  which will be dispatched to all morphs that have :observing id of
  redefined morph. i.e. morph inspectors have to update definition"
  (match [evt-type]
         [:redefined] [(reduce (fn [world observer]
                                 (let [[_ {redefined-cb :observee-redefined} _] (fetch world ($morph observer))]
                                     (if redefined-cb
                                       (redefined-cb world observer observee changes)
                                       world))) world-state observers) observing] 
         [:removed] [(reduce (fn [world observer]
                               (let [[_ {removed-cb :observee-redemoved} _] (fetch world ($morph observer))]
                                   (if removed-cb
                                     (removed-cb world observer observee)
                                     world))) world-state observers) observing]
         :else :zero))

(def lively
  "A lively set of transitions. Enables, morphs to be grabbable, draggable, observable 
   and inspectable. This provides live and direct interaction with morphic objects."
  [(either grabbing dragging)
   inspecting
   observing
   hand])

(def default-world-state
  [(rectangle {:id "world" 
                  :extent {:x 1000 :y 1000} 
                  :position {:x 500 :y 0} 
                  :fill "darkgrey"})
   (rectangle {:id "handMorph" :fill "red" :extent {:x 2 :y 2}})
   (ace-editor "Welcome to cljs-morphic!" {:x 0 :y 0} {:x 500 :y 1000} "world-editor")])

(defn tree [stem-pos]
  (rectangle
  {:fill "brown",
   :inspectable? true,
   :grabbable? true,
   :id "stub",
   :extent {:y 62, :x 18},
   :position stem-pos}
  (ellipse
   {:fill "green",
    :inspectable? true,
    :grabbable? true,
    :id "cone",
    :extent {:y 100, :x 100},
    :position {:y -80, :x -40}})))

(defn cenery [name position]
  (rectangle
   {:fill "blue",
    :inspectable? true,
    :grabbable? true,
    :id name,
    :extent {:y 179, :x 274},
    :position position}
   (tree {:y 95, :x 64})
   (rectangle
    {:fill "green",
     :inspectable? true,
     :grabbable? true,
     :id (str name "meadow"),
     :extent {:y 36, :x 274},
     :position {:y 143, :x 0}})
   (ellipse
    {:fill "yellow",
     :inspectable? true,
     :draggable? true,
     :id (str name "sun"),
     :extent {:y 34, :x 37},
     :position {:y 25, :x 205}})
   (image
    {:inspectable? true,
     :draggable? true,
     :id (str name "clouds"),
     :extent {:y 101, :x 128},
     :url "http://pngimg.com/upload/cloud_PNG16.png",
     :position {:x 120, :y 9}})))

(def PI js/Math.PI)

(defn get-current-time
  "current time as a map"
  []
  (let [d (js/Date.)]
    {:hours (.getHours d)
     :minutes (.getMinutes d)
     :seconds (.getSeconds d)}))

(defn angle-for-hour [hour]
  (* (+ -0.25 (/ hour 12)) PI 2))

(defn create-second-pointer [radius]
  (rectangle 
   {:id "SecondPointer"
    :position {:x 0 :y -1.5}
    :fill "red"
    :stroke-width 2
    :extent {:x (* 0.85 radius) :y 3}}))

(defn create-minute-pointer [radius]
  (rectangle {:id "MinutePointer"
              :position {:x 0 :y -2}
              :stroke-width 2
              :extent {:x (* .7 radius) :y 4}}))

(defn create-hour-pointer [radius]
  (rectangle 
   {:id "HourPointer"
    :position {:x 0 :y -2.5}
    :fill "darkblue"
    :stroke-width 2
    :extent {:x (* .5 radius) :y 5}}))

(defn create-hour-label [label pos]
  (text
   {:id (str label "h")
    :position pos
    :text-string label
    :font-family "Arial"
    :allow-input false
    :font-size 9
    :extent {:x 17 :y 17}}))

(defn point-from-polar [radius angle]
  {:x (* radius (.cos js/Math angle)) :y (* radius (.sin js/Math angle))})

(defn create-labels [radius]
  (mapv #(create-hour-label % (point-from-polar (* radius .8) (angle-for-hour %))) (range 1 13)))

(defn create-clock [bounds pos]
  (let [radius (/ (bounds :x) 2)]
    (ellipse {:id "Clock"
              :position pos
              :grabbable? true
              :inspectable? true
              :fps 1
              :step '(fn [world id]
                       (let [{:keys [hours minutes seconds]} (get-current-time)
                             minutes (+ minutes (/ seconds 60))
                             hours (+ hours (/ minutes 60))]
                         (-> world 
                           (set-prop "HourPointer" :rotation (angle-for-hour hours))
                           (set-prop "MinutePointer" :rotation (* (+ -0.25 (/ minutes 60)) 2 PI))
                           (set-prop "SecondPointer" :rotation (* (+ -0.25 (/ seconds 60)) 2 PI)))))
              :extent bounds
              :border-width 4
              :border-color "darkgrey"
              :fill "-webkit-gradient(radial, 50% 50%, 0, 50% 50%, 250, from(rgb(255, 255, 255)), to(rgb(224, 224, 224)))"
              :drop-shadoe true}
             (list 'create-labels radius) 
             (list 'create-hour-pointer radius) 
             (list 'create-minute-pointer radius) 
             (list 'create-second-pointer radius))))

(def custom-morphs
  [(-> (rectangle 
        {:position {:x 300 :y 300}
         :extent {:x 200 :y 200}
         :grabbable? true
         :fill "red"
         :inspectable? true
         :id "test3"}
        (-> (ellipse 
             {:position {:x 50 :y 50}
              :extent {:x 100 :y 100}
              :grabbable? true
              :inspectable? true
              :fill "green"
              :id "eli"}))))
   (image {:url "http://www.daniellaondesign.com/uploads/7/3/9/7/7397659/464698_orig.jpg"
           :extent {:x 300 :y 500}
           :grabbable? true
           :inspectable? true
           :id "kyoto"})
   '(let [{:keys [hours minutes seconds]} (get-current-time)
                             minutes (+ minutes (/ seconds 60))
                             hours (+ hours (/ minutes 60))]
      (-> (create-clock {:x 300 :y 300} {:x 300 :y 300}) 
                           (set-prop "HourPointer" :rotation (angle-for-hour hours))
                           (set-prop "MinutePointer" :rotation (* (+ -0.25 (/ minutes 60)) 2 PI))
                           (set-prop "SecondPointer" :rotation (* (+ -0.25 (/ seconds 60)) 2 PI))))
   (-> (rectangle {:position {:x 50 :y 50} 
                   :id "test" 
                   :draggable? true
                   :extent {:x 100 :y 100} 
                   :fill "blue"
                   :inspectable? true}))
   (-> (rectangle {:position {:x 30 :y 30} 
                   :id "test2" 
                   :grabbable? true
                   :extent {:x 50 :y 50} :fill "yellow"}))])

(def my-world (-> default-world-state
                (add-morphs-to "world" custom-morphs)
                ; (focus-editor-on "world-editor" "world")
                ))

(def view (evolve my-world lively (async/merge [signals redefinitions])))

(go-loop [] (rerender (<! view)) (recur))
