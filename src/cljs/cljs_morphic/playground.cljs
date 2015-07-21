(ns cljs-morphic.playground
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [cljs-morphic.morph :refer [rectangle ellipse image
                                        rerender redefine move-morph morph-under-me
                                        without get-description
                                        world-state find-morph set-prop add-morphs-to
                                        evolve redefinitions hot-swapping compile-props default-meta
                                        read-morph]]
            [cljs-morphic.morph.editor :refer [ace-editor set-editor-value]]
            [cljs-morphic.morph.window :refer [window]]
            [cljs-morphic.morph.halo :refer [halo]]
            [cljs-morphic.event :refer [signals]]
            [cljs-morphic.helper :refer [eucl-distance add-points morph?] :refer-macros [morph-fn]]
            [cljs-morphic.test :as t]
            [cljs.core.async :as async :refer [<! chan close!]]
            [cljs.reader :refer [read-string]]
            [cljs.contrib.pprint :refer [pprint]]
            [cljs.core.match :refer-macros [match]]
            [rksm.cloxp-com.net :as net]
            [cljs.test :refer-macros [deftest testing is run-tests]]))

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
                                     (redefine focus-id (fn [self props submorphs]
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
                (redefine focus-id (fn [self props submorphs]
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

(defn dragging-in-progress [pos focus-id world-state
                            {evt-type :type 
                         {id :id drag-cb :on-drag} :target-props 
                         {new-pos :pos} :args}]
  (match [evt-type id]
         [:mouse-move _] 
         [(cond-> world-state
            drag-cb (drag-cb focus-id)
            true (redefine focus-id (fn [self props submorphs]
                                 (drag self props submorphs pos new-pos)))) 
          (partial dragging-in-progress new-pos focus-id)]
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
             [world-state (partial dragging-in-progress pos focus-id)]
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
  (let [[halo props submorphs] (find-morph world-state "halo")]
    (not (nil? (find-morph (halo props submorphs) id)))))

(defn focus-editor-on [world-state editor-id target-morph]
  (-> world-state
    (set-prop editor-id :target target-morph)
    (observe editor-id
           target-morph
           (fn [world editor inspected-morph changes]
             (-> world
               (redefine editor (fn [e p s]
                                  (set-editor-value 
                                   (e p s) (get-description world inspected-morph changes))))))
           (fn [world editor inspected-morph]
             (-> world
               (redefine editor (fn [e p s]
                                  (set-editor-value 
                                   (e p s) "Target Removed!"))))))))

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
                    (redefine world-state target (fn [_ _ _]
                                               (read-string (args :value)))))
                  (partial inspecting)]
         :else :zero))

; OBSERVING

(defn observe [world-state observer observee observee-redefined observee-removed]
  (-> world-state
    (redefine observer (fn [observer p s]
                         (observer 
                          (assoc p :observee-redefined observee-redefined
                                   :observee-removed observee-removed)
                          s)))
    (redefine observee (fn [observee p s]
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
                                   (let [[_ {redefined-cb :observee-redefined} _] (find-morph world observer)]
                                     (if redefined-cb
                                       (redefined-cb world observer observee changes)
                                       world))) world-state observers) observing] 
         [:removed] [(reduce (fn [world observer]
                                 (let [[_ {removed-cb :observee-redemoved} _] (find-morph world observer)]
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
   hand
   hot-swapping])

(def default-world-state
  [(rectangle {:id "world" 
                  :extent {:x 1000 :y 1000} 
                  :position {:x 500 :y 0} 
                  :fill "darkgrey"})
   (rectangle {:id "handMorph" :fill "red" :extent {:x 2 :y 2}})
   (ace-editor "Welcome to cljs-morphic!" {:x 0 :y 0} {:x 500 :y 1000} "world-editor")])

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
