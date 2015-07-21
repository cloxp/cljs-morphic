(ns cljs-workspace.repl
  (:require [clojure.browser.repl :as repl]))

(enable-console-print!)

(def port 9050)
(def host (.. js/document -location -hostname))

(repl/connect (str "http://" host ":" port "/repl"))
(println "repl connected on port " port)