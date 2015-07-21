(defproject cljs-morphic "0.1.2"
  :description "Experimental combination of om and the morphic paradigm for live and direct development of visual applications"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License",
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :plugins [[lein-cljsbuild "1.0.6"]
            ; [com.keminglabs/cljx "0.3.2" :exclusions [org.clojure/clojure]]
            ]
  :source-paths ["src/clj" "src/cljs" "src/cljx" "test"]
  :cljsbuild {:builds [{:source-paths ["src/cljs" "src/gen/clj" "src/gen/cljs" "test"]
                        :output-path "cljs-build-shell"}]
              :test-commands {"morph-tree-test" ["phantomjs" "phantom/unit-test.js"]}}
;   :cljx {:builds [{:source-paths ["src/cljx"]
;                   :output-path "src/gen/clj"
;                   :rules :clj}
;                   {:source-paths ["src/cljx"]
;                   :output-path "src/gen/cljs"
;                   :rules :cljs}]}
  :dependencies
  [[org.clojure/clojure "1.6.0"]
   [org.clojure/clojurescript "0.0-3126"]
   [org.rksm/cloxp-com "0.1.5"]
   [http-kit "2.1.19"]
   [compojure/compojure "1.3.2"]
   [ring "1.3.1"]
   [fogus/ring-edn "0.2.0"]
   [om "0.8.0-rc1"]
   [org.clojure/core.async "0.1.303.0-886421-alpha"]
   [cljs-tooling "0.1.7"]
   [bostonou/cljs-pprint "0.0.4-SNAPSHOT"]
   [prismatic/om-tools "0.3.11"]
   [org.clojure/core.match "0.3.0-alpha4"]])
