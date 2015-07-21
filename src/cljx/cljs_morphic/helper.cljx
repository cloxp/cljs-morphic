(ns cljs-morphic.helper
  #+cljs (:require [cljs.core.match :refer-macros [match]])
  #+clj (:require [clojure.core.match :refer [match]]))

(defn morph? [m]
  (match [m]
         [([(:or 'rectangle
                 'ellipse
                 'image
                 'io
                 'polygon
                 'text) _ & _] :seq)] true
         :else false))

(defn expanded-expression? [expr]
  (and (meta expr) (not-empty (:expanded-expression (meta expr)))))

(defn applicative [m]
  "Transforms the edn representing a morph into
  and applicative function.
  Structure of new-submorphs
  
  (nil) -> nil
  ([a b] [c]), (a b c), (a [b c]) -> [ a b c ... ]
  
  "
  (fn [new-props & new-submorphs]
    (let [[morph _ _] m
          submorphs (apply concat (map (fn [m]
                                           (if (morph? m)
                                             [m]
                                             m)) new-submorphs))
          submorphs (when submorphs (apply vector submorphs))] 
      (with-meta (apply list morph 
                   new-props 
                   submorphs) (meta m)))))

(defn apply-to-morph [function m]
  "Transforms the morph into an applicable and then applies
   function to the applicable morph together with its props and submorphs."
  (let [[morph props & submorphs] m]
    (function (applicative m) 
                         props 
                         submorphs)))

(defn some-morph [morphs test-fn]
  (some  #(if (expanded-expression? %)
          (some-morph (-> % meta :expanded-expression) test-fn)
                      (apply-to-morph test-fn %)) morphs))

(defn add-points [point & points]
  (reduce (fn [p1 p2]
            (let [{x1 :x y1 :y} p1
                  {x2 :x y2 :y} p2]
              {:x (+ x1 x2) :y (+ y1 y2)} )) point points))

(defn eucl-distance [a {bx :x by :y}]
  (let [{:keys [x y]} (add-points a {:x (- bx) :y (- by)})]
    (+ (* x x) (* y y))))

(defn contains-rect? [[origin-a extent-a]
                      [origin-b extent-b]]
  (and ; can the origin of a allow for a containment?
       (< (origin-a :x) (origin-b :x)) 
       (< (origin-a :y) (origin-b :y)) 
       ; if so, can the extent of a contain all of b
       ; when expanded form the origin? 
       (let [expand-a (add-points origin-a extent-a)
             expand-b (add-points origin-b extent-b)]
         (and (> (expand-a :x) (expand-b :x)) 
              (> (expand-a :y) (expand-b :y))))))

(defn bounds [morph]
  [(-> morph :props :position) (-> morph :props :extent)])

(defn bottom-right [morph]
  (-> morph :props :extent))

(defn top-right [morph]
  (let [extent (-> morph :props :extent)]
    (add-points {:x (extent :x) :y 0} extent)))

(defn bottom-left [morph]
  (let [extent (-> morph :props :extent)]
    (add-points {:x 0 :y (extent :y)} extent)))

; TODO: This macro still does not work, if the user defines
; a morph-fn with variying args, ie. : [self props submorphs & args]
; Fix by removing dispatch alltogether and just wrapping the function
; entirely

(defmacro morph-fn 
  "Adds destructuring of morphic"
  [fn-name & stuff]
  (let [has-doc (string? (first stuff))
        doc-string (if has-doc (first stuff))
        [args & body] (if has-doc (rest stuff) stuff)
        morph `morph-ref#]
    `(defn ~fn-name {:doc ~doc-string}
       (~(into [] (concat [morph] (drop 3 args)))
         (if (vector? ~morph)  ;morph is already destructured by previous fn call
          (apply ~fn-name (conj ~morph ~@(drop 3 args)))
           (let [[m# p# & s#] ~morph]
             (apply ~fn-name 
               (applicative ~morph) 
               p# 
               s#
               ~@(drop 3 args)())))
         ) 
       (~args
         ~@body))))