(ns cljs-workspace.branch-merge
  (:require [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]))

(def preserve-list (atom {}))
(def merge-candidate (atom nil))
(def staged-for-merge (atom {:from nil :into nil}))

(def merge-callback (atom (fn [branch] false)))

(defn merge-state [local-state remote-state]
    (let [merged (merge local-state remote-state)]
      ; recover the old values, that ar on the exclude list and return
      (reduce 
        (fn [state path] (assoc-in state path (get-in local-state path))) 
        merged 
        (keys @preserve-list))))

(defn reachable-from [fp branch]
  (if (not (contains? fp :fork))
    nil ; this is not a fork point at all
    (if (= (get-in fp [:cont :root]) branch)
      [:cont]
      (if (= (fp :fork) branch) 
        [:fork]
        ; if not a single step suffices we recursively try to check if there
        ; is any path to the branch through :fork or :cont
        (if-let [path (reachable-from (last @(get-in fp [:fork :data])) branch)]
          (apply conj [:fork] path)
          (if-let [path (reachable-from (last @(get-in fp [:cont :data])) branch)]
            (apply conj [:cont] path)
            nil)))))) ; not reachable at all!

(defn depth-search-fork-point [a b root-branch]
  (let [fork-point (last @(root-branch :data))]
    (if (contains? fork-point :cont) ; check if we reached leaf or not
        (if-let [cont-reachable (depth-search-fork-point a b (fork-point :cont))]
          cont-reachable
          (if-let [fork-reachable (depth-search-fork-point a b (fork-point :fork))]
            fork-reachable
            (let [path-to-a (reachable-from fork-point a)
                  path-to-b (reachable-from fork-point b)]
              (if (and path-to-a path-to-b)
                [fork-point path-to-a path-to-b]
                nil))))
        nil)))  ; this branch does not contain a potential fork point at all
        
(defn fork-point [a b root-branch]
  (if-let [res (depth-search-fork-point a b root-branch)]
    res
    [root-branch [] []])) ; find the path to branch from root

(defn extract-branch [start-fp path]
    (if (empty? path)
      (if (contains? start-fp :cont)
        (extract-branch start-fp [:cont])
        [])
      (let [next-attr (first path)
            data @(get-in start-fp [next-attr :data])]
          (into [] (concat (butlast data) (extract-branch (last data) (rest path)))))))

(defn merge-streams [s1 s2]
  (map merge-state (concat s1 (repeat (last s1))) s2))

(defn merge-from-flattened [branch flat-data]
  (let [local-data @(branch :data)
        flat-data (if (> (count local-data) (count flat-data)) 
                      (into [] (concat flat-data (repeat (- (count local-data) (count flat-data)) (last flat-data))))
                      flat-data)
        result
            (if-let [last-entry (last local-data)]
                (if (contains? last-entry :cont) 
                    ; we have to now continue merging into BOTH forking branches, as we are NOT stroing diffs
                    (let [merged-part (into [] (map merge-state (butlast local-data) flat-data))
                          cont (merge-from-flattened (last-entry :cont) (drop (count local-data) flat-data))
                          fork (merge-from-flattened (last-entry :fork) (drop (count local-data) flat-data))]
                        (conj merged-part {:cont {:root (get-in last-entry [:cont :root]) :data (atom cont)} 
                                           :fork {:id (get-in last-entry [:fork :id]) :data (atom fork)}}))
                    ; we reached the end of the branch and just append additional states to the branch
                    ; that are all merges with the last state in the branch
                    (merge-streams local-data flat-data))
                ; this is a weird case and the branch part we have to merge into
                ; is actually a stub and contains no entries. In that case we just
                ; append merged versions with the previous last entry to until the flattened
                ; data is used up. But this is so weird, we can just aswell return the flat-data
                (map merge-state (repeat {}) flat-data))
          ]
      (into [] result)))

(defn merge-branches [remote-branch local-branch root-branch]
  (prn "Merging Branch " (remote-branch :id) " into " (local-branch :id))
  (let [[fp remote-path local-path] (fork-point remote-branch local-branch root-branch)
         ; we first flatten the remote branch such that it appears to be one continuous
         ; vector of states, which makes it easier to perform the merge into our local branch
         remote (extract-branch fp remote-path)
         local (fp (first local-path)) ; we have to merge into all the subbranches anyway so we dont care for the rest path
         merged-branch (merge-from-flattened local remote)]
      (reset! (local :data) merged-branch) ; maybe clean up the remote branch that got included?
      (@merge-callback local)))

(defn select-for-merge [branch cbk]
  ; if we select the same twice, we deselect
  (prn "select for merge: " cbk)
  (if (= @merge-candidate branch)
      (reset! merge-candidate nil)
      (if @merge-candidate 
        (do 
          (reset! staged-for-merge {:from @merge-candidate :into branch})
          (cbk @merge-candidate branch)
          (reset! merge-candidate nil))
        (reset! merge-candidate branch))))

(defn unstage-branches []
  (reset! merge-candidate nil)
  (reset! staged-for-merge (atom {:from nil :into nil})))

(defn merge-staged-branches [root-branch]
  (let [{:keys [from into]} @staged-for-merge]
    (merge-branches from into root-branch)))

(defn toggle-preserve [morph-path]
  (if (contains? @preserve-list morph-path) 
      (swap! preserve-list dissoc morph-path)
      (swap! preserve-list assoc morph-path true))
  (prn "PRESERVING: " @preserve-list))

