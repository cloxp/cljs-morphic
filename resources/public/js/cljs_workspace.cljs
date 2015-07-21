(ns cljs-workspace
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [goog.events :as events]
            [goog.events.EventType :as EventType]
            [cljs.core.async :as async :refer [>! <! put! chan]]
            [cljs.reader :refer [read-string]]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [goog.style :as gstyle]
            [om-sync.core :refer [om-sync]]
            [om-sync.util :refer [tx-tag edn-xhr]]
            [cljs-workspace.morph :as morphic :refer [set-fill toggle-halo find-morph-path]]
            [cljs-workspace.history :as history :refer [app-state init-history current-branch update-master]]
            [cljs-workspace.branch-merge :as branch-merge :refer [extract-branch]]
            [cljs-workspace.branch-vis :refer [is-master]]
            [cljs-workspace.repl :as repl])
  (:import [goog.events EventType]))

(enable-console-print!)

(def socket 
  (atom nil))

; Initialize modules

(reset! morphic/right-click-behavior 
  (fn [e state]
    (branch-merge/toggle-preserve (find-morph-path @app-state (state :id)))
    ; now also highlight all the morphs that are being preserved
    ; without changing the state
    (toggle-halo app-state (state :id))))

(prn @morphic/right-click-behavior)

; Unfortunate module separation, but the merge module right now needs to know which
; branch is the master, as this triggers a master rewrite on all clients through the server

(def mario {:id "Mario", :shape {:ShapeClass "Image", :url "http://www.veryicon.com/icon/png/Game/Super%20Mario/Super%20Paper%20Mario.png", :Extent {:x 100, :y 100}}, :submorphs [], :morph {:isDraggable true, :Position {:x 50, :y 50}}})

(def luigi {:id "Luigi", :shape {:ShapeClass "Image", :url "http://img4.wikia.nocookie.net/__cb20111019211716/villains/images/2/23/Super_paper_mario_-_luigi_2.png", :Extent {:x 100, :y 100}}, :submorphs [], :morph {:isDraggable true, :Position {:x 200, :y 200}}})

(def mario-world
  {:id "World"
   :morph {:Position {:x 10 :y 10} :isDraggable true}
   :shape {:Extent {:x 500 :y 400}
           :ShapeClass "Image"
           :url "http://images4.alphacoders.com/245/2456.jpg"}
   :submorphs []})

(def subtitle {:id 5
               :morph {:Position {:x 0 :y 420} :isDraggable true}
               :shape {:Extent {:x 510 :y 200}
                       :BorderColor "darkgrey"
                       :BorderWidth 2
                       :Fill "lightgrey"}
                :submorphs [{:id 4
                             :morph {:Preserve true
                                     :MorphClass "Text" 
                                     :Position {:x 10 :y 10}
                                     :TextString "Welcome to Super Mario World!"
                                     :isDraggable true}
                             :shape {:ShapeClass "Text"
                                     :Extent {:x 510 :y 200}}}]})

(init-history
         {:url "/data"
          :server/id 42
          :coll {:id 1
                :morph {:id 1 :Position {:x 50 :y 200}}
                :shape {:id 1
                        :BorderWidth 5
                        :BorderColor "rgb(0,0,0)"
                        :Fill "rgb(255,255,255)"
                        :Extent {:x 510 :y 410}}
                :submorphs [mario-world mario luigi subtitle]}})

(def socket 
  (atom nil))

; (defn undo [e]
;   (when (> (count @app-history) 1)
;     (swap! app-history pop)
;     (reset! app-state (last @app-history))))

; (om/root
;   (fn [app owner]
;     (om/component (dom/input #js {:type "range" :min 0 :max 100 :defaultValue 100
;                                   :onChange #(revert-to (.. % -target -value))})))
;   {} 
;   {:target (. js/document (getElementById "inspector"))})

(defn send-update [state]
  (prn "Sending update!")
  (.send @socket (pr-str (select-keys (state :tx-data) [:new-state]))))

(defn handle-push [e]
  (when-let [state (read-string (.-data e))]
    (.log js/console e)
    (if (state :master-update)
      (do
        (prn "New master pushed!")
        (update-master (state :new-master-branch)))
      (do
        (history/save-to-master state)
        (when (is-master @current-branch) (reset! app-state state))))))

(let [sub-chan (chan)]
(defn app-view [app owner opts]
    (reify
      om/IWillUpdate
      (will-update [_ next-props next-state]
        (when (:err-msg next-state)
          (js/setTimeout #(om/set-state! owner :err-msg nil) 5000)))
      om/IRenderState
      (render-state [_ {:keys [err-msg]}]
        (async/take! sub-chan send-update)
        (dom/div #js {:id "om-sync-node"}
            (om/build om-sync app
              {:opts {:view morphic/morph
                      :filter (comp #{:create :update :delete} tx-tag)
                      :id-key :id
                      :on-success (fn [res tx-data] (prn "sent update"))
                      :sync-chan sub-chan
                      :on-error
                      (fn [err tx-data]
                        (prn "Error:")
                        (reset! app-state (:old-state tx-data))
                        (om/set-state! owner :err-msg
                          "Ooops! Sorry something went wrong try again later."))}})
           (when err-msg
             (dom/div nil err-msg)))))))

(let [tx-chan (chan)
      tx-pub-chan (async/pub tx-chan (fn [tx] :txs ))]
  (prn "connect channel to server")
  (edn-xhr
    {:method :get
     :url "/data"
     :on-error (fn [res tx-data] (prn "Error: ")(println res))
     :on-complete
     (fn [res]
       (let [host (aget js/window "location" "hostname")
             port (aget js/window "location" "port")
             conn (js/WebSocket. (str "ws://" host ":" port "/ws"))]
            (set! (.-onmessage conn) handle-push)
            (reset! socket conn)) ; set the socket, so that it can be used for sending things
        (when-not (nil? res) (reset! app-state res))
        (om/root app-view app-state
           {:target (. js/document (getElementById "app"))
            :shared {:tx-chan tx-pub-chan}
            :tx-listen
            (fn [tx-data root-cursor]
                (history/save-state (:new-state tx-data)) ; to enable the timeline
                (when (is-master @current-branch) 
                  (.send @socket (pr-str (select-keys tx-data [:new-state])))))}))}))

; (om/root
;   (fn [app owner]
;     (om/component 
;       (dom/div {}
;         (om/build morphic/morph app)
;         history/history-slider)))
;   history/history-view 
;   {:target (. js/document (getElementById "inspector"))})

; TODO: helper methods, to easy the repl interaction

