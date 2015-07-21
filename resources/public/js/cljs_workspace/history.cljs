(ns cljs-workspace.history
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs-workspace.morph 
              :as morphic 
              :refer [set-position set-fill set-extent add-morph remove-morph]]
            [cljs-workspace.branch-vis :refer [render-tree is-master]]))

(enable-console-print!)

(defn pluralize [n w]
  (if (> n 1) 
      (str w "s")
      (str w)))

(def diagram-width 400)
(def branch-height 20)

;; global atom referencing the current state of the app
(def app-state (atom nil))


(defn init-history [init-state]
  (reset! app-state init-state)
  (reset! (@current-branch :data) @(@app-history :data))
  (add-morph history-view (@current-branch :id) history-indicator))

(def branch-count (atom 1))

(defn generate-uuid []
  @branch-count)

;; global atom referencing the branch that we currently operate on
(def current-branch (atom {:id "Master" :data (atom [])}))

;; global atom referencing the total history graph
(def app-history (atom {:id "Master" :data (@current-branch :data)}))

;; ffd
(def history-view)

;; this variable indicates that we are currently reverted to an earlier
;; state of the branch and also which one we have reverted to
(def reverted-to (atom -1))

(defn update-master [fp new-branch-data]
  )

(defn most-recent-state []
  (let [l (len @(@current-branch :data))]
        (when (> l 0) (nth-history (- l 2)))))

(defn switch-to-branch [branch]
  (prn "old branch id: " (@current-branch :id))
  (prn "new branch id: "  (branch :id))
  (remove-morph history-view (@current-branch :id) "indexMorph")
  (set-fill history-view (@current-branch :id) "lightgrey")
  (set-fill history-view (branch :id) "green")
  (add-morph history-view (branch :id) history-indicator)
  (reset! current-branch branch)
  (when-let [s (most-recent-state)]
    (reset! app-state s))
  (render-tree @app-history @current-branch (fn [branch] (switch-to-branch branch)) (* (len @(branch :data)) (/ index 100))))

(defn nth-history 
  ([i] 
    (nth-history i @(@current-branch :data)))
  ([i data]
    ;; lookup in unrolled linked list
    (if (< i (dec (count data))) 
      (let [e (nth data i)] 
        (if (e :cont)
          (first @(get-in e [:cont :data]))
          e))
      (if-let [cont (get-in (last data) [:cont :data])]
        (nth-history (- i (dec (count data))) @cont)
        nil))))

(defn len [unrolled-list]
  (+ -1 (count unrolled-list) 
    (when-let [end (last unrolled-list)]
      (when-let [n (get-in end [:cont :data])] (len @n)))))

(def history-indicator
  {:id "indexMorph"
   :morph {:Position {:x (/ diagram-width 2) :y 3}}
   :shape {:Fill "lightgreen"
           :Extent {:x 4 :y branch-height }}})

(defn branch-morph [posX posY width height branch]
         {:id (branch :id)
          :morph {:Position {:x posX :y posY}
                  :onClick (fn [this] (switch-to-branch branch))}
          :shape {:Fill "green"
                  :BorderColor "darkgreen"
                  :Extent {:x width :y height}}
           :submorphs []})

(def history-view
  (atom {:id "wrapper"
         :morph {:Position {:x 10 :y 50}}
         :shape {:BorderColor "black"
                 :Extent {:x (+ diagram-width 10) :y (+ branch-height 10) }}
         :submorphs 
         [(branch-morph 5 5 (- diagram-width 0) branch-height @current-branch)]}))

(def history-slider 
  (dom/input #js {:style #js {:position "absolute" :top 5 :left 5} 
                  :type "range" :min 0 :max 100 :defaultValue 100
                  :onChange #(revert-to (.. % -target -value))}))

(defn move-indicator-to [index]
  (set-position history-view "indexMorph" {:x (* diagram-width (/ index 100)) :y 3}))

(defn revert-to [i]
  (prn "request revert: " i)
  (let [index (* (dec (len @(@current-branch :data))) (/ i 100))]
    (when-let [state (when (>= index 1) (nth-history index))]
      (prn "revert to: " index)
      (reset! app-state state)
      (reset! reverted-to i)
      (render-tree @app-history @current-branch (fn [branch] (switch-to-branch branch)) index)
;      (move-indicator-to i)
)))

(defn add-new-branch [branch]
    (let [new-branch-morph (branch-morph 
                          5 (+ 5 (* branch-height (dec @branch-count))) 
                         (- diagram-width 0) branch-height branch)]
      (add-morph history-view "wrapper" new-branch-morph)
      (set-extent history-view "wrapper" {:x (+ diagram-width 10) :y (+ 10 (* branch-height @branch-count))})
      (switch-to-branch branch))
    (.log js/console (morphic/dict->js @history-view)))

;; snapshot the state when it is changed:

; The history actually stores each state as a first class object, 
; even after branching happens:
;
; -----\----
;       \------
; {:id ... :data [ . . . .  {:cont ---------------------> {:root . :data [ . . . . . ] }
;                            :fork | }]}
;                                  \                        
;                                   V                      
;                                  {:id ... :data [ . . . . . { . . }]}

(defn get-branch-part [i branch]
  (if (< i (dec (count @branch))) 
      (let [e (nth @branch i)] 
        (if (e :cont)
          [0 (get-in e [:cont :data])]
          [i branch]))
      (if-let [cont (get-in (last @branch) [:cont :data])]
        (get-branch-part (- i (dec (count @branch))) cont)
        (prn "Out of Range!"))))

(defn branch-at 
  ([i n]
    (branch-at current-branch i n))
  ([branch i n] (prn "Branching at " i)
    (swap! branch-count inc)
    (let [index (* (dec (len @(@branch :data))) (/ i 100))
          [rel-index branch-part] (get-branch-part index (@branch :data))
          new-branch {:id (generate-uuid) :data (atom [])}
          ; split the current branch
          pre-branch (vec (take rel-index @branch-part)) 
          post-branch (vec (drop rel-index @branch-part))
          ; insert the branching point into the old branch
          branched-branch (conj pre-branch {:cont {:root @branch :data (atom post-branch)} :fork new-branch})]
        ; update the old branch with the inserted version
        (reset! branch-part branched-branch)
        ; let current branch pointer point to new branch
        (add-new-branch new-branch)
        (reset! reverted-to -1))))

(defn append-to-branch [branch s]
  ; in case the branch got forked we have to jump these interruptions
  (if-let [end (last @branch)]
    (if-let [cont (get-in end [:cont :data])] 
      (append-to-branch cont s)
      (swap! branch conj s))
    (swap! branch conj s)))

(defn save-to-master [n]
  (let [master-branch app-history]
    (save-state n master-branch)))
  
(defn save-state
  ([n] 
    (save-state n current-branch))
  ([n branch]
    (cond (> 100 @reverted-to -1 )
      ; we have to branch because a modification based on a reverted state:
      (branch-at @reverted-to n)
      ; else just append to history
      :else
      (let [b @(@branch :data)]
        (when-not (= (last b) n)
          (append-to-branch (@branch :data) n))
        (let [c (len b)]
            (render-tree @app-history @branch (fn [b] (switch-to-branch b)) (* c (/ index 100)))
            (prn (str c " Saved " (pluralize c "State"))))))))

(om/root
  (fn [app owner]
    (om/component 
      (dom/div {}
        history-slider)))
  history-view 
  {:target (. js/document (getElementById "inspector"))})