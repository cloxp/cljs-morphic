(ns cljs-morphic.macros
  (:require
   [cljs-morphic.helper :refer [morph? applicative tree-zipper find-bound-props]] 
   [clojure.zip]))


(defmacro defmorph 
  [fn-name & stuff]
  (let [has-doc (string? (first stuff))
        doc-string (if has-doc (first stuff))
        [args & body] (if has-doc (rest stuff) stuff)]
    `(defn ~fn-name {:doc ~doc-string}
       ~args
         (vary-meta ~@body assoc 
                    :sexp (apply list '~fn-name ~args)
                    :expanded-expression? true))))

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
           (let [m# (first ~morph)
                 p# (second ~morph)
                 s# (drop 2 ~morph)]
             (vary-meta 
              (apply ~fn-name 
                (applicative ~morph) 
                p# 
                s#
                ~@(drop 3 args)())
              assoc :break-abstraction? true)))
         ) 
       (~args
         ~@body))))

(defmulti read-morph (fn [expr]
                       (cond
                         (morph? expr) :morph
                         (= `map (first expr)) :map
                         (= 'for (first expr)) :expr ; :for
                         :default :expr)))

(defmethod read-morph :morph 
  [morph]
  morph)

(defn instrument-morph-def
  [zippd i]
  (clojure.zip/edit zippd (fn [expr] 
                            (if (morph? expr)
                              `(vary-meta ~expr assoc 
                                          :code-idx ~i
                                          :bound-props (find-bound-props (quote ~expr)))
                              expr))))

(defmethod read-morph :map
  [map-expr]
  (let [[_ map-fn & rest-expr] map-expr
        root (tree-zipper map-fn)
        all (take-while (complement clojure.zip/end?) (iterate clojure.zip/next root))
        last-with-counting-ctx {:i (count all), :z (last all)}
        visit-and-prev (fn [{:keys [i z]}] 
                        {:i (dec i),
                          :z (clojure.zip/prev (instrument-morph-def z (dec i)))})
        it (iterate visit-and-prev last-with-counting-ctx)
        tfmed (take-while (comp not nil? :z) it)
        instrumented-fn (-> tfmed last :z clojure.zip/node)]
    `(with-meta ~(apply list 'map instrumented-fn rest-expr)
      {:description ~(list 'quote map-expr)
       :init-description ~(list 'quote map-expr)
        :expanded-expression? true
        :changes {}})))

(defmethod read-morph :expr
  [expr]
  `(with-meta ~expr
       {; current description, also caching the 
        ; changes applied to the expressions submorphs
        :sexp ~(list 'quote expr) 
        ; initial description, without any of the 
        ; changes applied to the expressions submorphs.
        ; this is usueful if the programmer wants to swtich
        ; to a different mode of reflecting change in the description  
        :init-description ~(list 'quote expr)
        ; is the thing the abstraction "hides" actually a single morph?
        :morph? (morph? ~expr)
        ; in case of a single morph, we also save the compiled props
        ; and the vanilla morph description, in case the expression
        ; is not useful for understanding, or is marked as broken
        :compiled-props (when (morph? ~expr) (-> ~expr meta :compiled-props))
        :description (when (morph? ~expr) (-> ~expr meta :description))
        :expanded-expression? true
        :changes {}}))

; MORPH FIXPOINTS

(def backmap {'cljs-morphic.helper/rectangle* 'rectangle
              'cljs-morphic.helper/ellipse* 'ellipse
              'cljs-morphic.helper/image* 'image
              'cljs-morphic.helper/io* 'io
              'cljs-morphic.helper/polygon* 'polygon
              'cljs-morphic.helper/text* 'text})

(defn init-morph [self props submorphs]
  (let [uncompiled-props (when (map? props) 
                           (->> props
                             (filter #(when 
                                        (seq? (val %)) 
                                        (-> % val first (= 'fn))))
                             keys))
        ; defer evaluation of the uncompiled props
        deferred-props (reduce (fn [props prop-name]
                            (update props prop-name #(list 'quote %))) 
                               props uncompiled-props)]
    `(with-meta ~(apply list self deferred-props (map read-morph submorphs))
      {:compiled-props (select-keys ~props '~uncompiled-props)
       :changes {:recompile? false}
       :morph? true
       :description (apply list '~(get backmap self) ~deferred-props '~submorphs)})))

; MORPH MACROS

(defmacro rectangle [props & submorphs]
  (init-morph 'cljs-morphic.helper/rectangle* props submorphs))

(defmacro ellipse [props & submorphs]
  (init-morph 'cljs-morphic.helper/ellipse* props submorphs))

(defmacro image [props & submorphs]
  (init-morph 'cljs-morphic.helper/image* props submorphs))

(defmacro text [props & submorphs]
  (init-morph 'cljs-morphic.helper/text* props submorphs))

(defmacro polygon [props & submorphs]
  (init-morph 'cljs-morphic.helper/polygon* props submorphs))

(defmacro io [props & submorphs]
  (init-morph 'cljs-morphic.helper/io* props submorphs))