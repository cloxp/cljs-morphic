(ns cljs-workspace.morph
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [goog.events :as events]
            [goog.events.EventType :as EventType]
            [cljs.core.async :as async :refer [>! <! put! chan]]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [goog.style :as gstyle]
            [goog.dom :as gdom]
            [cljs-workspace.draggable :as draggable :refer [clicked-morph]]
            [cljs-workspace.branch-merge :as branch-merge]
            ; [clojure.browser.repl :as repl]
            )
  (:import [goog.events EventType]))

(enable-console-print!)

(def right-click-behavior (atom (fn [e state] (prn "No Right Click Behavior!"))))

(def right-click-event (atom nil))

(defn not-yet-handled [event]
  (if (= @right-click-event (.-timeStamp event))
    false
    (do
      (reset! right-click-event (.-timeStamp event))
      (prn (.-timeStamp event) " ... was not yet handled!")
      true)))

; morph property to CSS property translators

(defn get-fill-css [value]
  {"background" value})

(defn get-position-css [value]
   {"position" "absolute" 
    "left" (:x value)
    "top" (:y value)})

(defn get-extent-css [value]
  {"height" (:y value)
   "width" (:x value)})

(defn get-border-width-css [value]
  {"border-width" value
   "border-style" "solid"})

(defn get-border-color-css [value]
  {"border-color" value
   "border-style" "solid"})

; translation from morph data to CSS style prop

(defn dict->js [dict]
  (apply js-obj (apply concat (seq dict))))

(defn extract-style [state]
  (apply merge 
        (map (fn [[prop value]] 
            (case prop 
              :Fill (get-fill-css value)
              :Position (get-position-css value)
              :Extent (get-extent-css value)
              :BorderWidth (get-border-width-css value)
              :BorderColor (get-border-color-css value)
              ;; more to come... 
              nil
              )) state)))

; morph component + rendering functions

(defmulti shape (fn [app owner] (get-in app [:shape :ShapeClass])))
(defmulti morph (fn [app owner] (get-in app [:morph :MorphClass])))

; utilities

(defn render-submorphs [app]
  (dom/div #js {:className "originNode"}
    (apply dom/div nil
      (om/build-all morph (:submorphs app)))))

; property accessors

(defn find-morph-path
  ([morph-model id] 
    (if (contains? morph-model :coll) ; this is a hack to work with om-sync applied
      (into [:coll] (find-morph-path (morph-model :coll) id []))
      (into [] (find-morph-path morph-model id []))))
  ([morph-model id path]
    (when-let [submorph (get-in morph-model path)]
      (if (== id (submorph :id)) 
        path
        (if-let [submorphs (submorph :submorphs)]
          (some #(find-morph-path morph-model id 
            (concat path [:submorphs %])) (range (count submorphs)))
          nil)))))

(defn get-prop-path [model id attrPath]
    (into [] (concat (find-morph-path @model id) attrPath)))

(defn set-position [model id pos]
  (let [prop-path (get-prop-path model id [:morph :Position])]
    (swap! model assoc-in prop-path pos)))

(defn add-morph [model id morph]
  (let [prop-path (get-prop-path model id [:submorphs])
        submorphs (get-in @model prop-path)]
    (swap! model assoc-in prop-path (conj submorphs morph))))

(defn remove-morph [model id morph-id]
  (let [prop-path (get-prop-path model id [:submorphs])
        submorphs (get-in @model prop-path)]
    (swap! model assoc-in prop-path (into [] (filter #(not= (% :id) morph-id) submorphs)))))

(defn set-fill [model id color]
  (let [prop-path (get-prop-path model id [:shape :Fill])]
    (swap! model assoc-in prop-path color)))

(defn set-extent [model id extent]
  (let [prop-path (get-prop-path model id [:shape :Extent])]
    (swap! model assoc-in prop-path extent)))

(defn set-border-color [model id fill]
  (let [prop-path (get-prop-path model id [:shape :BorderColor])]
    (swap! model assoc-in prop-path fill)))

(defn toggle-halo [model id]
  (let [prop-path (get-prop-path model id [:morph :Halo])]
    (prn prop-path " before:" (get-in @model prop-path))
    (swap! model (fn [m] 
                    (if (get-in m prop-path)
                      (assoc-in m prop-path false)
                      (assoc-in m prop-path true))))
    (prn prop-path "Halo value after:" (get-in @model prop-path))))

; multimethod for morph

(defmethod morph "Text" [app owner]
  (reify
    om/IRender
    (render [this]
      (let [style (dict->js (extract-style (:morph app)))]
        (dom/div  #js {:style style
                       :className "morphNode" } (shape app owner))))))

(defn handle-click [e state]
  ; add/remove morph from preserve list
  ; (branch-merge/toggle-preserve state)
  ; handle the custom behavior
  (when (and (not-yet-handled e) (.-altKey e))
    (@right-click-behavior e state))
  (when-let [cb (get-in state [:morph :onClick])] 
              (cb state)))

; render based on ad hoc definition of morph like frame
; to visualize the halo
(defn render-halo [app owner]
  (let [css {:Extent (get-in app [:shape :Extent])
             :BorderWidth 1
             :Position {:x 0 :y 0}
             :BorderColor "red"}]
    (dom/div #js {:style (dict->js (extract-style css))})))

(defmethod morph :default [app owner]
  (reify
    om/IRender
    (render [this]
        (let [style (dict->js (extract-style (:morph app)))]
          (dom/div  #js {:style style
                       :className "morphNode"
                       :onClick #(handle-click % @app)
                       :onMouseDown #(draggable/start-dragging % app owner)
                       :onMouseUp #(draggable/stop-dragging % app)
                      } 
                   (when (get-in app [:morph :Halo])
                      (render-halo app owner))
                   (shape app owner))))))

;; multi method for shape
(defn handle-input [e owner app]
  (let [span (om/get-node owner "myInput")]
    (prn (.-innerText span))
    (om/update! app [:morph :TextString] (.-innerText span) :update)))

(defn save-input [e owner app]
  (prn (.-key e))
  false)

(defn create-text-node [app owner]
    (dom/div #js {:className "visible Selection"
                  :contentEditable (nil? (get-in app [:morph :AllowInput]))
                  :onMouseDown #(swap! clicked-morph (fn [_] @app :id))
                  :onInput #(handle-input % owner app)
                  ; :onKeyDown #(when (.-metaKey %) (save-input % owner app))} (dom/span #js {
                    :ref "myInput"} (get-in app [:morph :TextString])))

(defn handle-path-element [e]
  (case (e :type)
    :arc (let [[a b c] (e :anchors)] 
            (str "C" (a :x) "," (a :y) " " (b :x) "," (b :y) " " (c :x) "," (c :y) " "))
    (str "L" (e :x) "," (e :y) " ")))

(defn to-svg-attr [elements]
  (let [car (first elements)
        cdr (rest elements)]
    (str "M" (car :x) "," (car :y) " "
      (reduce str (map handle-path-element cdr)))))

(defn unpack [e]
  (case (e :type)
    :arc (e :anchors)
    e))

(defn render-path-node [app owner]
  (prn (flatten (map unpack (get-in app [:shape :PathElements]))))
  (let [vertices (flatten (map unpack (get-in app [:shape :PathElements])))
        minX (apply min (map #(% :x) vertices))
        minY (apply min (map #(% :y) vertices))
        maxX (apply max (map #(% :x) vertices))
        maxY (apply max (map #(% :y) vertices))
        half-stroke (/ (get-in app [:shape :StrokeWidth]) 2)
        w (Math/abs (- minX maxX))
        h (Math/abs (- minY maxY))]
  (dom/svg #js { :style #js {:position "absolute" 
                             :fill "none" }
                  :width (+ 1 w (* 2 half-stroke)) 
                  :height (+ 1 h (* 2 half-stroke))
                    :viewBox (str (- minX 1 half-stroke) " "
                                  (- minY 1 half-stroke) " "
                                  (+ maxX (* 2 half-stroke)) " "
                                  (+ maxY (* 2 half-stroke)))}
    (dom/path #js {:strokeWidth (get-in app [:shape :StrokeWidth]) 
                   :stroke (get-in app [:shape :Fill]) 
                   :d (to-svg-attr (get-in app [:shape :PathElements]))}))))

(defmethod shape "Image" [app owner]
  (let [style (dict->js (extract-style (:shape app)))]
    (dom/img #js {:style style
                  :draggable false
                  :src (get-in app [:shape :url])})))

(defmethod shape "Path" [app owner]
  (let [style (extract-style (:shape app))]
      (dom/div #js {:style (dict->js style) :className "Morph Path"} 
        ; we render a svg sub-tag into which we place a 
        ; <path> that covers the given PathElements
        (render-path-node app owner)
        (render-submorphs app))))
  
(defmethod shape "Ellipse" [app owner]
  (let [style (extract-style (:shape app))]
    ;; we apply some customizations to the style, to make the shape elliptical
    (let [ellipse-style (assoc style 
                          "border-radius" (str (style "width") " /" (style "height")))]
      (dom/div #js {:style (dict->js ellipse-style)} (render-submorphs app)))))

(defmethod shape "Text" [app owner]
  (prn "Rendering Text Shape")
  (let [style (extract-style (:shape app))]
    (let [text-style (assoc style "cursor" "default")]
      (dom/div #js {:style (dict->js text-style)
                    :className "Morph Text"} (create-text-node app owner)))))

(defmethod shape :default [app owner]
  (let [style (extract-style (:shape app))]
    (dom/div #js {:style (dict->js style)} (render-submorphs app))))