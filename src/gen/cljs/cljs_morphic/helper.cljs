(ns cljs-morphic.helper
         (:require 
                   [clojure.data :refer [diff]]
                   [cljs.tools.reader :as reader])
                  
                                               )

(defn morph? [m]
  (or (-> m meta :morph?)
      (some #(= % m) ['ellipse 'rectangle 'image 'polygon 'text 'io])))

(defn expanded-expression? [expr]
  (and (meta expr) (:expanded-expression (meta expr))))

(defn even-out [morphs]
  (let [morphs (apply concat (map (fn [m]
                                           (if (morph? m)
                                             [m]
                                             m)) morphs))]
    (when morphs (apply vector morphs))))

(defn default-meta [morph]
  (let [[self props & submorphs] morph
        compile-required-props (->> props
                                 (filter #(when 
                                            (seq? (val %)) 
                                            (-> % val first (= 'fn))))
                                 keys)]
    {:cached-code (atom nil) ; holds the stringified ast pretty printed to prevent unnessecary re-pprints
     :compiled-props {} ; dictionary of all props that need to be compiled and the compiled values
     :changes {:recompile? (not (empty? compile-required-props))}
     :requires-compile compile-required-props}))

(defmulti read-morph (fn [expr]
                       (cond
                         (morph? expr) :morph
                         (= 'map (first expr)) :map
                         :default :expr)))

(defmethod read-morph :morph 
  [morph]
  morph)

(defmethod read-morph :map
  [map-expr]
  (let [[_ map-fn % rest-expr] map-expr]
    (list 'quote map-expr)))

(defmethod read-morph :expr
  [expr]
  (list 'quote expr))

; MORPH FIXPOINTS

(defn rectangle* [props & submorphs]
  (apply list `rectangle* props submorphs))

(defn ellipse* [props & submorphs]
  (apply list `ellipse* props submorphs))

(defn image* [props & submorphs]
  (apply list `image* props submorphs))

(defn text* [props & submorphs]
  (apply list `text* props submorphs))

(defn polygon* [props & submorphs]
  (apply list `polygon* props submorphs))

(defn io* [props & submorphs]
  (apply list `io* props submorphs))

(defn init-morph [self props submorphs]
  (let [uncompiled-props (->> props
                           (filter #(when 
                                      (seq? (val %)) 
                                      (-> % val first (= 'fn))))
                           keys)
        ; defer evaluation of the uncompiled props
        deferred-props (reduce (fn [props prop-name]
                        (update props prop-name #(list 'quote %))) props uncompiled-props)]
    `(with-meta ~(apply list self deferred-props (map read-morph submorphs))
      {:compiled-props ~(select-keys deferred-props uncompiled-props)
       :changes {:recompile? false}
       :morph? true
       :description ~(str (apply list self props submorphs))})))

; MORPH MACROS

                                       
                                           

                                     
                                         

                                   
                                       

                                  
                                      

                                     
                                         

                                
                                    

(defn enum [xs]
  (map vector (range) xs))

(defn add-changes [cha chb]
  "combine two different change sets naively, no merge!"
  {; structural changes do not commute! Yet they may conflict, or
   :recompile? (or (:recompile? cha) (:recompile? chb) false)
   ; not make sense, if we add two conflicting changes of the same morph
   :structure (concat (:structure cha) (:structure chb))
   ; conflicing property changes are just overridden by the most recent change
   :properties (merge (:properties cha) (:properties chb))})

(defn diff-submorphs [morph-id new-submorphs old-submorphs]
  (let [changes {:recompile? true
                 :structure []
                 :properties {}}
        old# (hash (map #(-> % second :id) old-submorphs))
        new# (hash (map #(-> % second :id) (even-out new-submorphs)))
        is-old-submorphs? (fn [x]
                            (cond
                              (morph? x) false 
                              (seq? x) 
                              (= old# (hash (map (fn [m]
                                                   (cond
                                                     (morph? m)
                                                     (-> m second :id)
                                                     (expanded-expression? m)
                                                     m)) (even-out x))))))]
    (cond
      ;if nothing changed, no changes
      (= new# old#) (assoc changes :recompile? false)
      ;if this morph was previously childless, we simply declare all new submorphs as added
      (empty? old-submorphs) (assoc changes :structure 
                                    (map #(list 'add-morph morph-id %) (even-out new-submorphs)))
      ; if old submorph structure is entirely preserved:
      ;  [ new [old]] -> add-before new or [[old] new] -> add-morph new
      (some is-old-submorphs? 
            new-submorphs) 
      (let [before-id (-> old-submorphs first second :id)
            add-before (take-while #(-> % is-old-submorphs? not) new-submorphs)
            add-after (rest (drop-while #(-> % is-old-submorphs? not) new-submorphs))]
        (assoc changes :structure 
               (concat (map #(list 'add-morph-before morph-id before-id %) add-before)
                       (map #(list 'add-morph morph-id %) add-after))))
      :else
      ; changes if old submorphs got completely scrambled, which is terrible
      ; since this API enables flexibility, but does not convey the INTENT of the users
      ; changes AT ALL. We therefore need to go and infer all the changes by hand.
      ; Instead of using redefine for advanced reorganizing of the data, the user
      ; should use putback lenses such as replace, add, add-before, remove instead.
      (let [new-submorphs (even-out new-submorphs)
            id->old-submorphs (into {} (map (fn [m] [(-> m second :id) m]) old-submorphs))
            ; 1st: identify all known submorphs together with their idx
            known-idx (filter (fn [[idx m]]
                                (contains? id->old-submorphs (-> m second :id))) 
                              (enum new-submorphs))
            ; 2nd: identify all removed submorphs
            id->new-submorphs (into {} (map (fn [m] [(-> m second :id) m]) new-submorphs))
            removed (remove (fn [[_ {id :id} & _]]
                              (contains? id->new-submorphs id)) 
                            old-submorphs)
            removed (map (fn [[_ {id :id} & _]] (list 'without id)) removed)
            ; 3rd: Identify the last known submorph, after which only new or no morphs follow
            [idx last-known] (last known-idx)
            ; 4th: Associate all of the morphs AFTER the last known morph with (add-morph)
            add-after (map #(list 'add-morph morph-id %) (drop (inc idx) new-submorphs))
            ; 5th: For each known morph, identify all preceding new morphs and associate them
            ;      with an (add-morph-before known-morph-id)
            ;      [ . . idx . . . idx . . .idx]
            ; 
            add-before (apply concat 
                         (for [[[idx-before _] [idx-after [_ {id :id} & _]]] 
                               (partition 2 1 (concat [[-1 nil]] known-idx))]
                           (map #(list 'add-morph-before morph-id id %) 
                                (->> new-submorphs 
                                  (take idx-after)
                                  (drop (inc idx-before))))))]
        (assoc changes :structure (concat removed add-before add-after))))))

(defn diff-properties [old-props new-props]
  {:recompile? false
   :structure []
   :properties (if-let [changed-props (keys (second (diff old-props new-props)))]
                 {(old-props :id) (select-keys new-props changed-props)}
                 {})})

(defn applicative [morph]
  "Transforms the edn representing a morph into
  and applicative function."
  (fn [new-props & new-submorphs]
    (let [[self old-props & old-submorphs] morph
          old-changes (assoc (-> morph meta :changes) :recompile? false)
          structure-changes (diff-submorphs (old-props :id) 
                                  new-submorphs 
                                  (apply vector old-submorphs))
          property-changes (diff-properties old-props new-props)
          new-changes (-> old-changes 
                        (add-changes structure-changes) 
                        (add-changes property-changes))
          submorphs (even-out new-submorphs)
          new-meta-data (assoc (meta morph) :changes new-changes)] 
      (with-meta (apply list self 
                   new-props 
                   submorphs) new-meta-data))))

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

                   
                                 
                   
                                       
                                             
                                                     
                          
                                      
                                                 
                                                                                 
                                                        
                                     
                             
                                    
                  
                 
                                   
           
             
                   
;;;;;;;;;;;; This file autogenerated from src/cljx/cljs_morphic/helper.cljx
