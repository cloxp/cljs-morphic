(defproject cljs-morphic "0.1.2"
  :description "Experimental combination of om and the morphic paradigm for live and direct development of visual applications"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License",
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :plugins [[lein-cljsbuild "1.0.6"]
            [com.keminglabs/cljx "0.6.0" :exclusions [org.clojure/clojure]]]
  :source-paths ["src/clj" "src/cljs" "src/cljx" "test"]
  :cljsbuild {:builds {:main {:source-paths ["src/clj" "src/cljs" "src/gen/clj" "src/gen/cljs" "test"]
                        :output-path "cloxp-cljs-build"}}
              :test-commands {"morph-tree-test" ["slimerjs" "cloxp-cljs-build/cloxp-cljs.js"]}}
  ; :cljx {:builds [{:source-paths ["src/cljx"]
  ;                 :output-path "src/gen/clj"
  ;                 :rules :clj}
  ;                 {:source-paths ["src/cljx"]
  ;                 :output-path "src/gen/cljs"
  ;                 :rules :cljs}]}
  :dependencies
  [[org.clojure/clojure "1.7.0"]
   [org.clojure/clojurescript "0.0-3308"]
   [org.rksm/cloxp-com "0.1.9-SNAPSHOT"]
   [om "0.8.0-rc1"]
   [org.clojure/core.async "0.1.346.0-17112a-alpha"]
   [fresnel "0.3.0-SNAPSHOT"]
   [cljs-tooling "0.1.7"]
   [bostonou/cljs-pprint "0.0.4-SNAPSHOT"]
   [fipp "0.6.2"]
   [org.clojure/core.match "0.3.0-alpha4"]])
