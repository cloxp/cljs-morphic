(ns cljs-morphic.test
  (:require [cljs.test]
        [cljs-morphic.morph :refer [rectangle ellipse image redefine 
                                    move-morph without set-prop add-morphs-to]])
  (:require-macros [cljs.test :refer [deftest testing is run-all-tests]]))

(def simple-ast 
  (rectangle {:id "a"}
             (ellipse {:id "b"})
             (image {:id "c"})))

(def simple-world 
  (rectangle {:id "world" :position {:x 0 :y 0}}
             (ellipse {:id "b" :position {:x 42 :y 42}})
             (image {:id "c" :position {:x 100 :y 100}})))

(def simple-ast-wrapped 
  [(rectangle {:id "a"}
              (ellipse {:id "b"})
              (image {:id "c"}))
   (rectangle {:id "hand"})])

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
    (is (= (add-morphs-to simple-ast "a" (ellipse {:id "x"}))
              (rectangle {:id "a"}
                          (ellipse {:id "x"})
                          (ellipse {:id "b"})
                          (image {:id "c"}))))))

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