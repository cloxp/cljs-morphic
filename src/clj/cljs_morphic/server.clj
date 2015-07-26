(ns cljs-morphic.server
 (:require [rksm.cloxp-com.server :as server]))

(defn start-server []
	(server/start-server! :port 8084))