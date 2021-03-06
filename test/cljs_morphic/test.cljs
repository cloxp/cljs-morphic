(ns cljs-morphic.test
  (:require [cljs.test :as t]
            [cljs.reader :refer [read-string]]
            [fresnel.lenses :refer [fetch putback]]
            [cljs.pprint :refer [pprint write]]
            [cljs-morphic.morph :refer [redefine
                                        move-morph without set-prop add-morphs-to add-morph
                                        submorphs properties description optimization changes $morph it morph-lens =>]])
  (:require-macros [cljs.test :refer (is deftest run-tests testing)]
                   [cljs-morphic.macros :refer [rectangle ellipse image]]))

(defn japanese-kitchen [pos]
  (rectangle {:id "miso" :fill "red" :position pos}
             (ellipse {:id "beans" :fill "green"})))

(def expression-world
  (rectangle {:id "world" :position {:x 0 :y 0}}
              (ellipse {:id "b" :position {:x 42 :y 42}}
                       (map (fn [a b]
                              (ellipse {:id (str a b)
                                        :extent {:x a :y b}
                                        :position {:x 10 :y 42}})) (range 3) (range 3))
                       (ellipse {:id "tea" :fill "black"})
                       (ellipse {:id "milk" :fill "white"}))
              (image {:id "c" :position {:x 100 :y 100}}
                                          (japanese-kitchen {:x 42 :y 42}))))

(def simple-ast 
  (rectangle {:id "a"}
             (ellipse {:id "b"})
             (image {:id "c"})))

(def simple-world 
  (rectangle {:id "world" :position {:x 0 :y 0}}
             (ellipse {:id "b" :position {:x 42 :y 42}})
             (image {:id "c" :position {:x 100 :y 100}})))

(def simple-world-desc
  '(rectangle {:id "world" :position {:x 0 :y 0}}
             (ellipse {:id "b" :position {:x 42 :y 42}})
             (image {:id "c" :position {:x 100 :y 100}})))

(def complex-world 
  (rectangle {:id "world" :position {:x 0 :y 0}}
             (ellipse {:id "b" :position {:x 42 :y 42}}
                      (ellipse {:id "tea" :fill "black"})
                      (ellipse {:id "milk" :fill "white"}))
             (image {:id "c" :position {:x 100 :y 100}}
                    (rectangle {:id "miso" :fill "red"}
                               (ellipse {:id "beans" :fill "green"})))))

(def simple-ast-wrapped 
  [(rectangle {:id "a"}
              (ellipse {:id "b"})
              (image {:id "c"}))
   (rectangle {:id "hand"})])

(deftest test-morph-lens
  (testing "Getting a morph through submorph lenses."
    (is (= (fetch simple-world [submorphs 0])
           (ellipse {:id "b" :position {:x 42 :y 42}})))
    (is (= (fetch complex-world [submorphs 1 submorphs 0 submorphs 0])
           (ellipse {:id "beans" :fill "green"}))))
  
  (testing "Acessing morph props through the prop lens."
    (is (= (fetch simple-world [submorphs 0 properties :position])
           {:x 42 :y 42}))
    (is (= (fetch complex-world [submorphs 1 submorphs 0 submorphs 0 properties :fill])
           "green"))
    (is (= (fetch simple-world [submorphs properties :id])
           ["b" "c"])))
  
  (testing "Setting morph props through the prop lens."
    (is (= (putback simple-world [submorphs 0 properties :position] {:x 100 :y 50})
           (rectangle {:id "world" :position {:x 0 :y 0}}
                      (ellipse {:id "b" :position {:x 100 :y 50}})
                      (image {:id "c" :position {:x 100 :y 100}}))))
    (is (= (putback complex-world [submorphs 1 submorphs 0 submorphs 0 properties :fill] "black")
           (rectangle {:id "world" :position {:x 0 :y 0}}
                      (ellipse {:id "b" :position {:x 42 :y 42}}
                               (ellipse {:id "tea" :fill "black"})
                               (ellipse {:id "milk" :fill "white"}))
                      (image {:id "c" :position {:x 100 :y 100}}
                             (rectangle {:id "miso" :fill "red"}
                                        (ellipse {:id "beans" :fill "black"})))))))
  
  (testing "morph-lens produces lens composition"
    (is
     (= (morph-lens simple-world "b" [it])
        [it submorphs 0])))
  
  (testing "Getting a morph through lens generator $morph"
    (is (= (fetch simple-world ($morph "b"))
           (ellipse {:id "b" :position {:x 42 :y 42}})))
    (is (= (fetch complex-world ($morph "beans"))
           (ellipse {:id "beans" :fill "green"})))
    (is (= (fetch complex-world [($morph "beans") properties :fill])
           "green"))))

(deftest test-morph-description-lens
  (testing "Description lens with plain lens composition"
    (is (= (fetch simple-world [description])
           (with-out-str 
             (pprint simple-world-desc)))))
  
  (testing "Descriptions behind abstractions are unaffected"
    (is (= (fetch expression-world [submorphs 0 submorphs 0 submorphs 0 description])
           (with-out-str
             (pprint '(ellipse {:id "00"
                               :extent {:x 0 :y 0}
                               :position {:x 10 :y 42}}))))))
  
  (testing "Description changes are propagated back to morphs"
    (is 
     (= (cljs.reader/read-string 
         "(image {:id \"c\", :position {:x 0, :y 10}, :extent {:x 42, :y 50}})")
        '(image {:id "c" :position {:x 0 :y 10} :extent {:x 42 :y 50}})))
    (is 
     (= (putback simple-world [submorphs 1 description]
                 "(image {:id \"c\", :position {:x 0, :y 10}, :extent {:x 42, :y 50}})")
        (rectangle {:id "world" :position {:x 0 :y 0}}
                   (ellipse {:id "b" :position {:x 42 :y 42}})
                   (image {:id "c" :position {:x 0 :y 10} :extent {:x 42 :y 50}}))))
    (is 
     (= (putback simple-world [submorphs 1 description]
                 "(image {:id \"c\", :position {:x 0, :y 10}, :extent {:x 42, :y 50}} (japanese-kitchen {:x 42 :y 42}))")
        (rectangle {:id "world" :position {:x 0 :y 0}}
                   (ellipse {:id "b" :position {:x 42 :y 42}})
                   (image {:id "c" :position {:x 0 :y 10} :extent {:x 42 :y 50}} 
                          (japanese-kitchen {:x 42 :y 42})))))
    (is 
     (= (putback simple-world [submorphs 1 description]
                 "(image {:id \"c\", :position {:x 0, :y 10}, :extent {:x 42, :y 50}} (map
                                                                                      (fn
                                                                                        [x]
                                                                                        (ellipse
                                                                                         {:id (str x)
                                                                                          :fill \"blue\",
                                                                                          :inspectable? true,
                                                                                          :extent {:y 20, :x 20},
                                                                                          :position {:y (* x 10), :x (* x 10)}})) 
                                                                                                       (range 10)))")
        (rectangle {:id "world" :position {:x 0 :y 0}}
                   (ellipse {:id "b" :position {:x 42 :y 42}})
                   (image {:id "c" :position {:x 0 :y 10} :extent {:x 42 :y 50}} 
                          (map
                           (fn
                             [x]
                             (ellipse
                              {:id (str x)
                               :fill "blue",
                               :inspectable? true,
                               :extent {:y 20, :x 20},
                               :position {:y (* x 10), :x (* x 10)}})) 
                           (range 10))))))))

(deftest test-morph-change-lens
  (testing "Changes lens reflects changes that have been introduced to morphs."
    (is (= (fetch simple-world [submorphs 1 changes])
           {:structure []
            :properties {}
            :recompile? false}))
    (is (= (-> simple-world 
             (putback [submorphs 1 properties :position] {:x 101 :y 102}) 
             (fetch [submorphs 1 changes]))
           {:recompile? false
            :structure []
            :properties {"c" {:position {:x 101 :y 102}}}}))
    (let [shiro-miso (-> complex-world 
                       (putback [submorphs 1 submorphs 0 properties :fill] "white"))]
      (is
       (= (fetch shiro-miso changes)
          {:recompile? false
           :structure []
           :properties {"miso" {:fill "white"}}}))
      (is
       (= (fetch shiro-miso [submorphs 1 submorphs 0 changes])
          {:recompile? false
           :structure []
           :properties {"miso" {:fill "white"}}}))
      (is
       (= (fetch shiro-miso [submorphs 1 submorphs 0 submorphs 0 changes])
          {:recompile? false
           :structure []
           :properties {}}))))
  
  (testing "redefine captures add-morph change"
    (let [redefined-morph (redefine (ellipse {:id "moon"} (rectangle {:id "cheese"}))
                                    it 
                                    (fn [moon props submorphs]
                                      (moon props submorphs (ellipse {:id "green"}))))]
      (is (= (fetch redefined-morph changes)
             {:recompile? true
              :structure ['(add-morph "moon" (ellipse {:id "green"}))]
              :properties {}}))))
  
  (testing "redefine captures add-morph-before change"
    (let [redefined-morph (redefine (ellipse {:id "moon"} 
                                             (rectangle {:id "gouda"}) 
                                             (rectangle {:id "cheese"}))
                                    it 
                                    (fn [moon props submorphs]
                                      (moon props 
                                            (ellipse {:id "green"}) 
                                            submorphs)))]
      (is (= (fetch redefined-morph changes)
             {:recompile? true
              :structure ['(add-morph-before "moon" "gouda" (ellipse {:id "green"}))]
              :properties {}})))
    (let [redefined-morph (redefine (ellipse {:id "moon"} 
                                             (rectangle {:id "gouda"}) 
                                             (rectangle {:id "cheese"}))
                                    it 
                                    (fn [moon props [gouda cheese]]
                                      (moon props 
                                            gouda 
                                            (ellipse {:id "green"}) 
                                            cheese)))]
      (is (= (fetch redefined-morph changes)
             {:recompile? true
              :structure ['(add-morph-before "moon" "cheese" (ellipse {:id "green"}))]
              :properties {}}))))
  
  (testing "redefine captures without morph change"
    (let [redefined-morph (redefine (ellipse {:id "moon"} 
                                             (rectangle {:id "gouda"}) 
                                             (rectangle {:id "cheese"}))
                                    [submorphs 0] 
                                    (fn [gouda props submorphs]))]
      (is (= (fetch redefined-morph changes)
             {:recompile? true
              :structure ['(without "gouda")]
              :properties {}}))))
  
  (testing "shorthand calls to add-morph causes changes"
    (let [redefined-morph (add-morph (ellipse {:id "moon"} 
                                              (rectangle {:id "gouda"}) 
                                              (rectangle {:id "cheese"}))
                                     "moon" 
                                     (ellipse {:id "green"}))]
      (is (= (fetch redefined-morph changes)
             {:recompile? true
              :structure ['(add-morph "moon" (ellipse {:id "green"}))]
              :properties {}}))))
  
  (testing "the submorphs lens transfers property changes"
    (let [redefined-morph (set-prop (ellipse {:id "moon"} 
                                             (rectangle {:id "gouda"}) 
                                             (rectangle {:id "cheese"}))
                                    "gouda" 
                                    :position {:x 42 :y 24})]
      (is (= (fetch redefined-morph changes)
             (fetch redefined-morph [submorphs 0 changes])))
      (is (= (fetch redefined-morph changes)
             {:recompile? false
              :structure []
              :properties {"gouda" {:position {:x 42 :y 24}}}}))))
  
  (testing "the submorphs lens transfers structural changes"
    (let [redefined-morph (add-morph (ellipse {:id "moon"} 
                                              (rectangle {:id "gouda"}) 
                                              (rectangle {:id "cheese"}))
                                     "gouda" 
                                     (ellipse {:id "green"}))]
      (is (= redefined-morph
             (ellipse {:id "moon"} 
                      (rectangle {:id "gouda"}
                                 (ellipse {:id "green"})) 
                      (rectangle {:id "cheese"}))))
      (is (= (fetch redefined-morph changes)
             {:recompile? true
              :structure ['(add-morph "gouda" (ellipse {:id "green"}))]
              :properties {}}))))
  
  (testing "Use putback lenses to clarify intention of changes")
  
  (testing "Changes lens applies changes that have been added by redefining changes."
    (let [changed-world (putback simple-world [changes]
                                 {:structure ['(add-morph "c" (rectangle {:id "mops" :fill "brown"}))]
                                  :properties {"c" {:position {:x 50 :y 50}}
                                               "b" {:fill "green"}}})]
      (is (= changed-world
             (rectangle {:id "world" :position {:x 0 :y 0}}
                        (ellipse {:id "b" :position {:x 42 :y 42} :fill "green"})
                        (image {:id "c" :position {:x 50 :y 50}}
                               (rectangle {:id "mops" :fill "brown"})))))
      (is (= (fetch changed-world [submorphs 1 submorphs 0 changes])
             {:recompile? false
              :structure []
              :properties {}}))
      (is (= (fetch changed-world [submorphs 1 changes])
             {:recompile? false
              :structure ['(add-morph "c" (rectangle {:id "mops" :fill "brown"}))]
              :properties {"c" {:position {:x 50 :y 50}}}}))
      (is (= (fetch changed-world [changes])
             {:recompile? false
              :structure ['(add-morph "c" (rectangle {:id "mops" :fill "brown"}))]
              :properties {"c" {:position {:x 50 :y 50}}
                           "b" {:fill "green"}}})))))

(deftest test-lenses-and-expressions
  (testing "An abstraction is preserved yet its submorphs are also accessible."
    (is (= (read-string (fetch expression-world [($morph "c") submorphs 0 description]))
           (read-string "(japanese-kitchen {:x 42, :y 42})\n")))
    (is (= (fetch expression-world [($morph "c") submorphs 0 submorphs])
           [(ellipse {:id "beans" :fill "green"})]))
    (is (= (fetch expression-world [($morph "c") submorphs 0 properties :position])
           {:x 42 :y 42})))
  
  (testing "Redefining an abstraction causes changes in its submorphs."
    (is (= (-> expression-world
             (putback [($morph "c") submorphs 0 description] "(japanese-kitchen {:x 100, :y 100})\n")
             (fetch [($morph "c") submorphs 0 description])
             read-string)
           (read-string "(japanese-kitchen {:x 100, :y 100})\n"))))
  
  (testing "Redefining the submorphs of an abstraction causes the abstraction to be redefined."
    (is (= (-> expression-world
             (=> "miso" :position {:x 0 :y 0})
             (fetch [($morph "c") submorphs 0 description]))
           (with-out-str 
             (pprint '(-> (japanese-kitchen {:x 42 :y 42})
                        (=> "miso" :position {:x 0 :y 0}))))))
    (is (= (-> expression-world 
             (add-morph "miso" (ellipse {:id "sakana" :fill "blue"}))
             (fetch [($morph "c") submorphs 0 description]))
           (with-out-str 
             (pprint '(-> (japanese-kitchen {:x 42 :y 42})
              (add-morph "miso" (ellipse {:id "sakana" :fill "blue"})))))))
    (is (= (-> expression-world
             (=> "miso" :position {:x 0 :y 0})
             (add-morph "miso" (ellipse {:id "sakana" :fill "blue"}))
             (fetch [($morph "c") submorphs 0 description]))
           (with-out-str
             (pprint '(-> (japanese-kitchen {:x 42 :y 42})
                        (add-morph "miso" (ellipse {:id "sakana" :fill "blue"}))
                        (=> "miso" :position {:x 0 :y 0}))))))
    (is (= (-> expression-world 
             (without "miso")
             (fetch [($morph "c") submorphs 0]))
           nil)))
  
  (testing "Morphs next to Expressions can still be removed."
    (is (= (-> expression-world
             (without "tea")
             (fetch description))
               (with-out-str 
                 (pprint '(rectangle {:id "world" :position {:x 0 :y 0}}
                                     (ellipse {:id "b" :position {:x 42 :y 42}}
                                              (map (fn [a b]
                                                     (ellipse {:id (str a b)
                                                               :extent {:x a :y b}
                                                               :position {:x 10 :y 42}})) (range 3) (range 3))
                                              (ellipse {:id "milk" :fill "white"}))
                                     (image {:id "c" :position {:x 100 :y 100}}
                                            (japanese-kitchen {:x 42 :y 42})))))))))

(deftest test-loop-mapping
  (testing "Changing an unbound property of a looped morph, alters the prototype"
    (is (= (-> expression-world
             (putback [($morph "b") submorphs 0 submorphs 1 properties :position] {:x 0 :y 0})
             (putback [($morph "b") submorphs 0 submorphs 1 properties :fill] "red")
             (fetch optimization))
           (with-out-str 
             (pprint '(rectangle {:id "world" :position {:x 0 :y 0}}
                                 (ellipse {:id "b" :position {:x 42 :y 42}}
                                          (map (fn [a b]
                                                 (ellipse {:id (str a b)
                                                           :extent {:x a :y b}
                                                           :position {:x 0 :y 0}
                                                           :fill "red"})) (range 3) (range 3))
                                          (ellipse {:id "tea" :fill "black"})
                                          (ellipse {:id "milk" :fill "white"}))
                                 (image {:id "c" :position {:x 100 :y 100}}
                                        (japanese-kitchen {:x 42 :y 42}))))))))
  
  (testing "Changing an unbound property of a looped morph, propagates change among all other looped morphs"
    (is (let [w (putback expression-world [($morph "b") submorphs 0 submorphs 1 properties :fill] "red")]
          (every? (fn [morph]
                    (= "red" (-> morph second :fill))) (fetch w [($morph "b") submorphs 0 submorphs])))))
  
  (testing "Changing a bound property of a looped morph, alters the whole expression"
    (is (= (-> expression-world 
             (putback [($morph "b") submorphs 0 submorphs 1 properties :extent] {:x 42 :y 42})
             (fetch description))
           (with-out-str
             (pprint '(rectangle {:id "world" :position {:x 0 :y 0}}
                                 (ellipse {:id "b" :position {:x 42 :y 42}}
                                          (-> (map (fn [a b]
                                                     (ellipse {:id (str a b)
                                                               :extent {:x a :y b}
                                                               :position {:x 10 :y 42}})) (range 3) (range 3))
                                            (=> "11" :extent {:x 42 :y 42}))
                                          (ellipse {:id "tea" :fill "black"})
                                          (ellipse {:id "milk" :fill "white"}))
                                 (image {:id "c" :position {:x 100 :y 100}}
                                        (japanese-kitchen {:x 42 :y 42})))))))))

(deftest test-set-prop
  (testing "Setting a prop redefines the morph in the ast."
    (is (= (set-prop simple-ast "b" :position {:x 42 :y 314})
           (rectangle {:id "a"}
                      (ellipse {:id "b" :position {:x 42 :y 314}})
                      (image {:id "c"}))))))

(deftest test-move-morph
  (testing "Moving a morph in the ast."
    (is (= (move-morph simple-world "b" "c")
           (rectangle {:id "world" :position {:x 0 :y 0}}
                      (image {:id "c" :position {:x 100 :y 100}}
                             (ellipse {:id "b" :position {:x -58 :y -58}})))))))

(deftest test-ast-remove-morph
  (testing "Correct Modification of the morphic AST when removing a morph."
    (is (= (without simple-ast "b")
           (rectangle {:id "a"}
                      (image {:id "c"}))))))

(deftest test-ast-add-morph
  (testing "Correct Modification of the morphic AST when adding a morph."
    (is (= (add-morph simple-ast "a" (ellipse {:id "x"}))
           (rectangle {:id "a"}
                      (ellipse {:id "b"})
                      (image {:id "c"})
                      (ellipse {:id "x"}))))))

(deftest test-ast-add-morphs
  (testing "Correct Modification of the morphic AST when adding multiple morphs."
    (is (= (add-morphs-to simple-ast "a" [(ellipse {:id "x"}) (ellipse {:id "y"})])
           (rectangle {:id "a"}
                      (ellipse {:id "x"})
                      (ellipse {:id "y"})
                      (ellipse {:id "b"})
                      (image {:id "c"}))))))

(deftest test-wrapped-ast-add-morph
  (testing "Correct Modifaction of a morphic AST starting with a collection of morphs."
    (is (= (add-morphs-to simple-ast-wrapped "a" [(ellipse {:id "x"})])
           [(rectangle {:id "a"}
                       (ellipse {:id "x"})
                       (ellipse {:id "b"})
                       (image {:id "c"}))
            (rectangle {:id "hand"})]))
    (is (= (add-morphs-to simple-ast-wrapped "a" [(ellipse {:id "x"}) (ellipse {:id "y"})])
           [(rectangle {:id "a"}
                       (ellipse {:id "x"})
                       (ellipse {:id "y"})
                       (ellipse {:id "b"})
                       (image {:id "c"}))
            (rectangle {:id "hand"})]))))