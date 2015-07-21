(ns cljs-workspace.branch-vis
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [cljs-workspace.morph 
              :as morphic 
              :refer [morph set-position set-fill set-extent add-morph remove-morph]]
            [cljs-workspace.branch-merge :as branch-merge]))

(enable-console-print!)
;; utilities to render a branching unrolled linked list
;; into a visual tree view. Similar to the visualization
;; of branches in a git repository (ala Github)


; renders a given branching tree (implemented as unrolled linked list)
; into a morph structure that is then passed to om and rendered to the
; given div element (div-id)

; we also only branch downwards for now (simplicity)
;         
;  ------\---\----->  main
;         \   \--\----->  1
;          \     \------>  2
;           \------->   3 ...
;
; Data structure:
;
; {:id ... :data -> [ . . . .  {:cont ---------------------> {:root . :data -> [ . . . . . ]} 
;                            :fork | }]}
;                                  \                        
;                                   V                      
;                                  {:id ... :data -> [ . . . . . { . . }]}

(def current-branch-ref (atom nil)) ;; supplied by the user of the module
(def branch-callback-fn (atom (fn [branch] (prn "Clicked on me!"))))
(def reverted-index (atom -1))
(def rendered-tree (atom nil))

(def highlighted-branches (atom {}))

(def history-marker {:morph {:Position {:x 0 :y 1}}
                     :shape {:Fill "lightgreen"
                             :Extent {:x 5 :y 5}}})


; TODO visualize the movement of one branch into the other

(defn is-on-current [branch]
  (if @current-branch-ref
    (or (when (contains? branch :id)
            (= (@current-branch-ref :id) (branch :id))) 
        (when (contains? branch :root)
            (= @current-branch-ref (branch :root))))
    false))

(defn is-master [branch]
  (or (= "Master" (get branch :id))
      (= "Master" (get-in branch [:root :id]))))

(defn get-coloring [branch]
  (if (contains? @highlighted-branches (hash branch))
    "red"
    (if (is-on-current branch) "green"
      (if (is-master branch) "blue" "black"))))

(defn scale-branch-model [model max-width] model)

(defn highlight-branch [root path]
  (when-let [next-step (first path)]
    (let [branch-part (root next-step)]
      (do 
        (swap! highlighted-branches assoc (hash branch-part) true)
        (if (= 1 (count path))
          (let [fp? (last @(branch-part :data))]
            (if (contains? fp? :cont)
              (highlight-branch fp? [:cont])))))
      (let [fp (last @(branch-part :data))]
        (highlight-branch fp (rest path))))))

(defn visualize-merge-candidates [fork-point path-to-a path-to-b]
  (prn "highlighting: " path-to-a " " path-to-b)
  (highlight-branch fork-point path-to-a)
  (highlight-branch fork-point path-to-b)
  (refresh-view))

(defn render-stub [branch start-point]
  [{ ; id nessecary? not for now... we do not alter the morph structure but just rerender it completely
    :morph {:MorphClass "Path"
            :Position start-point
            :onClick (fn [this] 
                        (@branch-callback-fn branch)
                        false)}
    :shape {:ShapeClass "Path"
            :StrokeWidth 5
            :Fill (get-coloring branch)
            :PathElements [{:x 0 :y 0}]}
            :submorphs []},
            20])

(defn render-bubble [origin r fill branch]
  { :id (if (contains? branch :id) (branch :id) (get-in branch [:root :id]))
    :morph {:Position origin
           :onClick (fn [this]
                      (branch-merge/select-for-merge 
                        (if (contains? branch :id) branch (branch :root))
                        (fn [a b]
                          (let [[fp pa pb] (branch-merge/fork-point a b @rendered-tree)]
                            (visualize-merge-candidates fp pa pb))))
                      (let [fill (if (= (get-in this [:shape :Fill]) "red") 
                                    (do 
                                      (remove-morph branch-view (this :id) (str "box-" (this :id)))
                                      (get-coloring branch))
                                    (let [textfield { :id (str "box-" (this :id))
                                                      :morph {:Position {:x 15 :y -3} 
                                                             :MorphClass "Text" 
                                                             :TextString (str (this :id))}
                                                      :shape {:ShapeClass "Text"}}]
                                       (add-morph branch-view (this :id) textfield)
                                       "red"))]
                        (set-fill branch-view (this :id) fill))
                      false)}
   :shape {:ShapeClass "Ellipse"
           :Extent {:x r :y r}
           :Fill fill}
   :submorphs []})

(defn render-leaf [cont start-point]
  (let [fill (get-coloring cont)]
    [{ ; id nessecary? not for now... we do not alter the morph structure but just rerender it completely
      :morph {:MorphClass "Path"
              :Position start-point
              :onClick (fn [this] 
                          (if (contains? cont :root)
                            (let [b (cont :root)]
                              (@branch-callback-fn b))
                            (let [b cont]
                              (@branch-callback-fn b)))
                          false)}
      :shape {:ShapeClass "Path"
              :StrokeWidth 5
              :Fill fill
              :PathElements [{:x 0 :y 0} {:x (count @(cont :data)) :y 0} ]}
              :submorphs [(render-bubble {:x (count @(cont :data)) :y -1} 10 fill cont)]}, ; place a cute bubble at the end :-)
              20]))

(defn smoothen [vertices]
  ; interpolate last 2 edges, 
  ; by substituting the last 2 points with an arc
  (let [[middle end] (take-last 2 vertices)
        half-point (- (end :x) (middle :x))
        rounded-edge {:type :arc
                      :anchors [(assoc middle :y (- (middle :y) half-point)) middle end]}]
        (conj (into [] (drop-last 2 vertices)) rounded-edge)))

(defn translat [op p1 p2]
  {:x (op (p1 :x) (p2 :x)) :y (op (p1 :y) (p2 :y))})

(defn create-arc [start end fill]
  { :morph {:MorphClass "Path"
            :Position start}
    :shape {:ShapeClass "Path"
            :StrokeWidth 5
            :Fill fill
            :PathElements (smoothen (map #(translat - % start) [start (assoc end :x (start :x)) end]))}})

(defn render-fork [branch cont fork start-point]
  (let [fill (get-coloring branch)
        end-point {:x (count @(branch :data)) :y 0} ; based on start-point and number of entries
        [cont-path cont-space] (render-branch cont end-point) ; we have a fork, return a path that visualizes branching
        fork-start-point {:x (+ (end-point :x) 10) :y cont-space} ; based on end-point and space occupation of the cont
        [fork-path fork-space] (render-branch fork fork-start-point)
        arc-path (create-arc end-point fork-start-point (get-in fork-path [:shape :Fill]))]
            [{; id nessecary? not for now... we do not alter the morph structure but just rerender it completely
             :morph {:MorphClass "Path"
                     :Position start-point
                     :onClick (fn [this] 
                                (@branch-callback-fn (cont :root))
                                false)}
             :shape {:ShapeClass "Path"
                     :StrokeWidth 5
                     :Fill fill
                     :PathElements [{:x 0 :y 0} end-point]}
             :submorphs [cont-path arc-path fork-path]},
              (+ cont-space fork-space)]))

(defn attach-marker [branch-morph branch]
  (let [marker (assoc-in history-marker [:morph :Position :x] @reverted-index)]
    (update-in branch-morph [:submorphs] conj marker)))

(defn render-branch
  ([branch]
    (render-branch branch {:x 0 :y 0}))
  ([branch start-point]
     ; check if the current branch has any entries
     (let [[bm sp] 
       (if-let [end (last @(branch :data))]
          (if-let [cont (end :cont)] ; check for fork
            (let [fork (end :fork)]
              (render-fork branch cont fork start-point))
            (render-leaf branch start-point))
          (render-stub branch start-point) ; this brunch has no entries yet
        )]
        [(if (and (contains? branch :id) ; we only attach markers to the root of the branch
                  (is-on-current branch) 
                  (> @reverted-index 0)) (attach-marker bm branch) bm) sp])))

(def merge-button 
  {:id "mergeButton"
   :morph {:Position {:x 400 :y 100}
           :onClick (fn [this]
                      (branch-merge/merge-staged-branches @rendered-tree)
                      (reset! highlighted-branches {})
                      (refresh-view))}
   :shape {:Extent {:x 55 :y 20}
           :BorderColor "darkgrey"
           :Fill "lightgrey"}
   :submorphs [{:morph {:MorphClass "Text"
                        :AllowInput false
                        :Position {:x 5 :y 5}
                        :TextString "Merge"}
                :shape {:ShapeClass "Text"}}]})

(def cancel-button
  {:id "cancelButton"
  :morph {:Position {:x 470 :y 100}
           :onClick (fn [this]
                      (branch-merge/unstage-branches)
                      (reset! highlighted-branches {})
                      (refresh-view))}
   :shape {:Extent {:x 55 :y 20}
           :BorderColor "darkgrey"
           :Fill "lightgrey"}
   :submorphs [{:morph {:MorphClass "Text"
                        :AllowInput false
                        :Position {:x 5 :y 5}
                        :TextString "Cancel"}
                :shape {:ShapeClass "Text"}}]})

(defn refresh-view []
  (let [[model _] (render-branch @rendered-tree)]
      (swap! branch-view assoc :submorphs [merge-button cancel-button (scale-branch-model model 400)])))

(defn render-tree [tree branch branch-callback reverted]
  ; idea, walk to the leaves of the tree, and then start traversing
  ; from there and end at the root. This way we can make sure, that we
  ; reserve enough space such that all branches are neatly spaced apart)
  (when (not= @current-branch-ref branch) (prn "have to recolor!"))
  (reset! rendered-tree tree)
  (reset! current-branch-ref branch)
  (reset! branch-callback-fn branch-callback)
  (reset! reverted-index reverted)
  (refresh-view))

(def branch-view (atom
  {:id "branchView"
   :shape {:Extent {:x 400 :y 100}}
   :morph {:Position {:x 50 :y 50} :isDraggable true}
   :submorphs [merge-button cancel-button]}))

(om/root
  (fn [app owner]
    (om/component 
      (dom/div {}
        (om/build morph app))))
branch-view 
{:target (. js/document (getElementById "branch"))})