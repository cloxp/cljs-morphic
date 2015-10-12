(ns cljs-morphic.evaluator
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [cljs-morphic.macros])
  (:require [clojure.browser.repl :refer [bootstrap]]
            [clojure.string :refer [lower-case]]
            [cljs.js]
            [cljs.reader :refer [read-string]]
            [cljs.pprint :refer [pprint]]
            [cljs.core.async :as async :refer [>! <! put! chan timeout onto-chan]])
  (:import [goog.net XhrIo]
           [goog.events EventType]))

(declare ^:dynamic *closure-index-mem*)

(def morph-libs
    {'cljs-morphic.morph :cljs
     'cljs-morphic.morph.window :cljs
     'cljs-morphic.morph.editor :cljs
     'cljs-morphic.test :cljs
     'cljs-morphic.helper :cljc
     'cljs-morphic.macros :clj
     'cljs-morphic.init-macro :clj
     'cljs.analyzer :cljc
     'goog.net.XhrIo :js
     'goog.events :js})

(defn get-file [url]
  (let [c (chan)
        req (.send XhrIo url
                   (fn [e]
                     (if (.. e -target isSuccess)
                       (put! c (.. e -target getResponseText))
                       (put! c :error))))]
    c))

(defn load-and-callback!
  [name lang cb]
  (go
   (let [lang (if (contains? #{'cljs.analyzer} name) ".js" lang)
         path  (str (cljs.js/ns->relpath name) lang)
         path  (case lang
                 ".cljs" (str "cloxp-cljs-build/out/" path)
                 ".cljc" (str "cloxp-cljs-build/out/" path)
                 ".js" (str "cloxp-cljs-build/out/" path)
                 ".clj" (if (re-matches #"^cljs_morphic/.*" path)
                          (str "src/clj/" path)
                          (str "clojurescript/src/main/clojure/" path)))
        file (<! (get-file path))]
     (if (= :error file)
       false
       (cb {:lang (extension->lang lang) :source file})))))

(defn- skip-load?
  [{:keys [name macros]}]
  (cond
    (= name 'cljs.core) false
    (and (= name 'cljs.pprint) macros) true
    :else false))

(defn- do-load-file
  [file cb]
  (when-not (load-and-callback! file :clj cb)
    (cb nil)))

(defn closure-index
  []
  (go
   (let [paths-to-provides
        (map (fn [[_ path provides]]
               [path (map second
                       (re-seq #"'(.*?)'" provides))])
          (re-seq #"\ngoog\.addDependency\('(.*)', \[(.*?)\].*"
                  (<! (get-file "cloxp-cljs-build/out/goog/deps.js"))))]
    (into {}
      (for [[path provides] paths-to-provides
            provide provides]
                [(symbol provide) (str "goog/" (second (re-find #"(.*)\.js$" path)))])))))

(defn- do-load-goog
  [name cb]
  (if-let [goog-path (get *closure-index-mem* name)]
    (when-not (load-and-callback! (str goog-path ".js") ".js" cb)
      (cb nil))
    (cb nil)))

(defn extension->lang
  [extension]
  (if (= ".js" extension)
    :js
    :clj))

(defn- do-load-other
  [name macros cb]
  (go-loop [extensions (if macros
                      [".clj" ".cljc"]
                      [".cljs" ".cljc" ".js"])]
    (if extensions
      (when-not (<! (load-and-callback!
                      name
                      (first extensions)
                      cb))
                 (recur (next extensions)))
      (cb nil))))

; file here is an alternate parameter denoting a filesystem path
(defn load
  [{:keys [name macros path file] :as full} cb]
  (prn "LOADING " path)
  (cond
    (skip-load? full) (cb {:lang   :js
                           :source ""})
    file (do-load-file file cb)
    (re-matches #"^goog/.*" path) (do-load-goog name cb)
    :else (do-load-other name macros cb)))

(defn load-cache
  ([cstate s] (load-cache cstate s {}))
  ([cstate s opts]
   (let [ext (or (:ext opts) :cljs)]
     (go
      (let [path (str "cloxp-cljs-build/out/" (cljs.js/ns->relpath s) "." (name ext) ".cache.edn")
            cache-edn (<! (get-file path))
            cache (read-string cache-edn)]
        (cljs.js/load-analysis-cache! cstate s cache)
        cache)))))

(def st (cljs.js/empty-state))

(def macro-info {:use-macros {'ellipse 'cljs-morphic.macros
                              'rectangle 'cljs-morphic.macros
                              'image 'cljs-morphic.macros
                              'io 'cljs-morphic.macros
                              'text 'cljs-morphic.macros
                              'polygon 'cljs-morphic.macros}
                 :uses {'create-labels 'cljs-morphic.playground
                        'radius 'cljs-morphic.playground
                        'japanese-kitchen 'cljs-morphic.test
                        'set-prop 'cljs-morphic.morph
                        'add-morph 'cljs-morphic.morph
                        'find-bound-props 'cljs-morphic.helper
                        
                        'analyze 'cljs.analyzer
                        'empty-env 'cljs.analyzer
                        
                        'ellipse* 'cljs-morphic.helper
                        'rectangle* 'cljs-morphic.helper
                        'image* 'cljs-morphic.helper
                        'io* 'cljs-morphic.helper
                        'text* 'cljs-morphic.helper
                        'polygon* 'cljs-morphic.helper
                        'morph? 'cljs-morphic.helper
                        'morph-list? 'cljs-morphic.helper}
                 :require-macros {'cljs-morphic.macros 'cljs-morphic.macros}
                 :requires {'cljs-morphic.helper 'cljs-morphic.helper 
                            'cljs-morphic.playground 'cljs-morphic.playground
                            'cljs-morphic.test 'cljs-morphic.test
                            'cljs-morphic.morph 'cljs-morphic.morph
                            'cljs.analyzer 'cljs.analyzer}})

(defn morph-eval [m]
  (cljs.js/eval 
  st
  m
  {:eval cljs.js/js-eval
   :ns 'cljs-morphic.playground
   :context :expr}
  (fn [c] 
    c)))

(defn morph-eval-str [code]
  (cljs.js/eval-str 
   st
   code
   nil
   {:eval cljs.js/js-eval
    :ns 'cljs-morphic.playground
    :context :expr}
   (fn [c] (:value c))))

(defn init-compiler [init-state cb]
  ; some testing...
  (cljs.js/analyze-str (cljs.js/empty-state) "(fn [world new-props]
                            (str name (:extent new-props) (:position new-props)))" nil
                            {:eval cljs.js/js-eval}
                            (fn [{:keys [value]}]
                              ;(println value)
                              ))
  
  (set! (.-isProvided_ js/goog) (fn [name] false))
  (let [ch (chan)]
    (cljs.js/eval
     st
     '(ns cljs.user
        (:require-macros [cljs-morphic.macros]))
     {:eval cljs.js/js-eval
      :load load
      :ns 'cljs.user
      :context :expr
      :verbose false}
     (fn [c]
       (go
        (<! (load-cache st 'cljs-morphic.playground))
        (swap! st update-in [:cljs.analyzer/namespaces 'cljs.user] merge init-state)
        (put! ch :init-finish)
        (cb c))))
    ch)
  ; the approach of loading caches is pointless, since the caches lack
  ; macro information. So he have to analyze the source from scratch
  ; (go
  ; (<! (load-cache st 'cljs-morphic.morph)) 
  ; (<! (load-cache st 'cljs-morphic.helper {:ext :cljc}))
  ; (<! (load-cache st 'cljs-morphic.playground))
  ; (cb nil))
  ; (go
  ; (binding [*closure-index-mem* (<! (closure-index))]
  ;   (<! (load-cache st 'cljs.analyzer {:ext :cljc}))
  ;   ; (<! (load-cache st 'cljs-morphic.helper {:ext :cljc}))
  ;   (cljs.js/eval
  ;     st
  ;     '(ns cljs.user
  ;       (:require-macros [cljs-morphic.macros]))
  ;     {:eval cljs.js/js-eval
  ;     :load load
  ;     :ns 'cljs.user
  ;     :context :expr
  ;     :verbose false}
  ;     (fn [c]
  ;       ; (if (:error c) 
  ;       ;   (throw (str "Compiler init failed: " 
  ;       ;               c 
  ;       ;               (get-in @st [:cljs.analyzer/namespaces 'cljs.core :requires])))
  ;       ;   (do
  ;       ;     (swap! st update-in [:cljs.analyzer/namespaces 'cljs.user] merge init-state)
  ;       ;     (cb c)))
  ;       (swap! st update-in [:cljs.analyzer/namespaces 'cljs.user] merge init-state)
  ;       (cb c)))))
  )