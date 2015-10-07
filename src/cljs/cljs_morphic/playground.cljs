(ns cljs-morphic.playground
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [cljs-morphic.macros :refer [morph-fn ellipse rectangle image io polygon text defmorph]])
  (:require [cljs-morphic.evaluator :refer [macro-info morph-eval morph-eval-str init-compiler]]
            [cljs-morphic.morph :refer [rerender redefine move-morph morph-under-me changes
                                        without $morph it submorphs ast-type
                                        world-state set-prop add-morphs-to
                                        evolve redefinitions default-meta
                                        description optimization properties observe add-morph => *silent*
                                        source-map]]
            [fresnel.lenses :refer [fetch putback]]
            [cljs-morphic.morph.editor :refer [ace-editor set-editor-value 
                                               loop-mapping-button
                                               morph-mapping-button focus-editor-on inspecting]]
            [cljs-morphic.morph.window :refer [window]]
            [cljs-morphic.morph.halo :refer [halo]]
            [cljs-morphic.event :refer [signals]]
            [cljs-morphic.helper 
             :refer [eucl-distance add-points morph? find-bound-props]]
            [cljs-morphic.test :as t :refer [japanese-kitchen]]
		      	[cljs.pprint :refer [pprint]]
            [cljs.core.async :as async :refer [>! <! chan close!]]
            [cljs.reader :refer [read-string]]
            [cljs.core.match :refer-macros [match]]
            [cljs.test :refer-macros [deftest testing is run-tests]]
            [rksm.cloxp-com.cloxp-client :as cloxp]))

; EVENT HANDLING

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
           :target-props props 
           :args {:pos pos
                  :client-pos client-pos}}] [(let [world-state (-> world-state
                                                   (set-prop "handMorph" :position 
                                                             (add-points pos {:x 8 :y 8})))
                                     mouse-move-cb (:mouse-move props)]
                                 (if mouse-move-cb
                                   (mouse-move-cb world-state ($morph (:id props))
                                                  pos client-pos)
                                   world-state))
                               hand]
         [{:type :mouse-enter
           :target-props props
           :args {}}] (do
                        [(if-let [mouse-enter-cb (:mouse-enter props)]
                           (mouse-enter-cb world-state ($morph (:id props)))
                           world-state) hand])
         [{:type :mouse-leave
           :target-props props
           :args {}}] [(if-let [mouse-leave-cb (:mouse-leave props)]
                         (mouse-leave-cb world-state ($morph (:id props)))
                         world-state) hand]
         [{:type :mouse-down-left
           :target-props props
           :args {:pos pos
                  :client-pos client-pos}}] [(if-let [mouse-down-left-cb (:mouse-down-left props)]
                         (mouse-down-left-cb world-state ($morph (:id props)) pos client-pos)
                         world-state) hand]
         [{:type :mouse-up-left
           :target-props props
           :args {}}] [(if-let [mouse-up-left-cb (:mouse-up-left props)]
                         (mouse-up-left-cb world-state ($morph (:id props)))
                         world-state) hand]
         [{:type :click-right
           :target-props props
           :args {}}] [(if-let [mouse-click-right-cb (or (:click-right props) (:mouse-click props))]
                         (mouse-click-right-cb world-state ($morph (:id props)))
                         world-state) hand]
         [{:type :click-left
           :target-props props
           :args {}}] [(if-let [mouse-click-left-cb (or (:click-left props) (:mouse-click props))]
                         (mouse-click-left-cb world-state ($morph (:id props)))
                         world-state) hand]
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
                               (=> focus-id :drop-shadow false)) 
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
                                   (-> (fetch world-state [($morph focus-id)]) meta :compiled-props :on-drag))]
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

; OBSERVING

(defn observing [world-state {evt-type :type 
                              {observee :id} :target-props
                              {observers :observers} :args}]
  "Upon redefinition of a morph a redefinition signal is scheduled,
  which will be dispatched to all morphs that have :observing id of
  redefined morph. i.e. morph inspectors have to update definition"
  (match [evt-type]
         [:redefined] [(reduce (fn [world observer]
                                 (let [m (fetch world ($morph observer))
                                       {redefined-cb :observee-redefined} (meta m)]
                                     (if redefined-cb
                                       (redefined-cb world observer observee (fetch m changes))
                                       world))) 
                               world-state
                               observers) observing] 
         [:removed] [(reduce (fn [world observer]
                               (let [{removed-cb :observee-removed} (-> world (fetch ($morph observer)) meta)]
                                   (if removed-cb
                                     (removed-cb world observer observee)
                                     world))) 
                             world-state
                             observers) observing]
         :else :zero))

(defmulti step (fn [lens world-state]
                 (prn lens "and" world-state)
                 (ast-type (fetch world-state lens))))

(defmethod step :vector [morphs-ref world-state]
  (reduce (fn [world-state idx]
            (step (conj morphs-ref idx) world-state)) 
          world-state 
          (range (count (fetch world-state morphs-ref)))))

(defmethod step :expr [expr-ref world-state]
  (step (conj expr-ref submorphs) world-state))

(defmethod step :morph [morph-ref world-state]
  (let [morph (fetch world-state morph-ref)
        world-state (if-let [step-fn (-> morph meta :compiled-props :step)]
                      (if (fn? step-fn) 
                        (do
                          (prn step-fn)
                          (step-fn world-state morph-ref))
                        (do 
                          (prn "Errornous step function: " step-fn)
                          world-state))
                      world-state)
        [_ _ & submorphs] morph]
    (if submorphs 
      (step (conj morph-ref cljs-morphic.morph/submorphs) world-state)
      world-state)))

; (js/setInterval
;   #(go (>! signals {:type :step}))
;   1000)

(defn stepping [world-state {evt-type :type}]
  (match [evt-type]
         [:step] [(step [it] world-state) stepping]
         :else :zero))

(def lively
  "A lively set of transitions. Enables, morphs to be grabbable, draggable, observable 
   and inspectable. This provides live and direct interaction with morphic objects."
  [(either grabbing dragging)
   stepping
   inspecting
   observing
   hand])

(def default-world-state
  [(rectangle {:id "world" 
                  :extent {:x 1500 :y 1000} 
                  :position {:x 0 :y 0} 
                  :fill "darkgrey"})
   (rectangle {:id "handMorph" :fill "red" :extent {:x 2 :y 2}})])

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

(defn second-pointer [radius seconds]
  (rectangle 
   {:id "SecondPointer"
    :position {:x 0 :y -1.5}
    :fill "red"
    :rotation (* (+ -0.25 (/ seconds 60)) 2 PI)
    :stroke-width 2
    :extent {:x (* 0.85 radius) :y 3}}))

(defn minute-pointer [radius minutes]
  (rectangle {:id "MinutePointer"
              :position {:x 0 :y -2}
              :fill "darkblue"
              :rotation (* (+ -0.25 (/ minutes 60)) 2 PI)
              :stroke-width 2
              :extent {:x (* .7 radius) :y 4}}))

(defn hour-pointer [radius hours]
  (rectangle 
   {:id "HourPointer"
    :position {:x 0 :y -2.5}
    :rotation (angle-for-hour hours)
    :fill "darkblue"
    :stroke-width 2
    :extent {:x (* .5 radius) :y 5}}))

(defn hour-label [label pos size]
  (text
   {:id (str label "h")
    :position pos
    :text-string label
    :font-family "Arial"
    :allow-input false
    :font-size size
    :extent {:x 17 :y 17}}))

(defn point-from-polar [radius angle]
  {:x (* radius (.cos js/Math angle)) :y (* radius (.sin js/Math angle))})

(defn create-labels [radius]
  (mapv #(hour-label % (point-from-polar (* radius .8) (angle-for-hour %)) (/ radius 15)) (range 1 13)))

(defmorph create-clock [name bounds pos time]
  (let [radius (/ (bounds :x) 2)
        {:keys [x y]} bounds
        ext (if (> x y) {:x x :y x} {:x y :y y})
        {:keys [hours minutes seconds]} time]
    (ellipse {:id name
              :position pos
              :grabbable? true
              :inspectable? true
              :layout 
              (fn [world new-props]
                (redefine world ($morph name) 
                            (fn [self props submorphs]
                              (create-clock name (:extent new-props) (:position new-props) (get-current-time)))))
              :fps 1
              :step (fn [world self-ref]
                      (redefine world self-ref
                                (fn [_ props _]
                                  (create-clock name 
                                                (:extent props) 
                                                (:position props) 
                                                (get-current-time)))))
              :extent ext
              :border-width 4
              :border-color "darkgrey"
              :fill "-webkit-gradient(radial, 50% 50%, 0, 50% 50%, 250, from(rgb(255, 255, 255)), to(rgb(224, 224, 224)))"
              :drop-shadoe true}
             (create-labels radius) 
             (hour-pointer radius hours) 
             (minute-pointer radius minutes) 
             (second-pointer radius seconds))))

(def custom-morphs
  [(-> (rectangle 
        {:position {:x 300 :y 300}
         :extent {:x 200 :y 200}
         :grabbable? true
         :fill "red"
         :inspectable? true
         :id "test3"}
        (ellipse 
             {:position {:x 50 :y 50}
              :extent {:x 100 :y 100}
              :grabbable? true
              :inspectable? true
              :fill "green"
              :id "eli"})))
   (image {:url "http://www.daniellaondesign.com/uploads/7/3/9/7/7397659/464698_orig.jpg"
           :extent {:x 300 :y 500}
           :position {:x 50 :y 50}
           :grabbable? true
           :inspectable? true
           :id "kyoto"}
          (create-clock "Clock" {:x 300 :y 300} {:x 300 :y 300} (get-current-time)))
   (rectangle {:position {:x 50 :y 50} 
                   :id "test" 
                   :draggable? true
                   :extent {:x 100 :y 100} 
                   :fill "blue"
                   :inspectable? true})
   (rectangle {:position {:x 30 :y 30} 
                   :id "test2" 
                   :grabbable? true
                   :extent {:x 50 :y 50} :fill "yellow"})])

(def my-world (-> default-world-state
                (add-morphs-to "world" custom-morphs)
                ; (focus-editor-on "world-editor" "world")
                ))

(def view (evolve my-world lively (async/merge [signals redefinitions])))

(go
 (<! (init-compiler macro-info (fn [c] (prn "INIT RES" c))))
 (go-loop [] (rerender (<! view)) (recur))
 (run-tests 'cljs-morphic.test))
