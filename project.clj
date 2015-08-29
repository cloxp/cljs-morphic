(defproject cljs-morphic "0.1.2"
  :description "Experimental combination of om and the morphic paradigm for live and direct development of visual applications"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License",
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :plugins [[lein-cljsbuild "1.0.6"]
            [com.keminglabs/cljx "0.6.0" :exclusions [org.clojure/clojure]]
			      ;[com.cemerick/clojurescript.test "0.3.3"]
            ]
  :prep-tasks [["cljx" "once"] "javac" "compile"]
  :source-paths ["src/clj" "src/cljs" "src/cljc" "test"]
  :cljsbuild {:builds {:main {:source-paths ["src/clj" "src/cljs" "src/cljc" "test"]
                  						:compiler {:optimizations :whitespace
                               					 :output-dir "target/out"
                            						 :output-to "target/cloxp-cljs.js"
                                         :source-map "target/cloxp-cljs.js.map"}}}
         			  :test-commands {"unit-tests" ["phantomjs" :runner "target/cloxp-cljs.js"]}}
  :dependencies
  [[org.clojure/clojure "1.7.0"]
   [org.clojure/clojurescript "1.7.28"]
   [org.rksm/cloxp-com "0.1.9-SNAPSHOT"]
   [org.omcljs/om "0.9.0"]
   [org.clojure/core.async "0.1.346.0-17112a-alpha"]
   [fresnel "0.3.0-SNAPSHOT" :exclusions [org.clojure/clojure]]
   [cljs-tooling "0.1.7"]
   [bostonou/cljs-pprint "0.0.4-SNAPSHOT"]
   [org.clojure/core.match "0.3.0-alpha4"]
   [pjstadig/humane-test-output "0.7.0"]]
  :injections 
  [(require 'pjstadig.humane-test-output)
   (pjstadig.humane-test-output/activate!)])
