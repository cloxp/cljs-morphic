// Compiled by ClojureScript 0.0-2342
goog.provide('cljs_workspace');
goog.require('cljs.core');
goog.require('cljs.reader');
goog.require('om_sync.util');
goog.require('cljs_workspace.history');
goog.require('cljs_workspace.morph');
goog.require('cljs.core.async');
goog.require('cljs_workspace.branch_merge');
goog.require('cljs_workspace.branch_vis');
goog.require('om_sync.core');
goog.require('cljs_workspace.branch_merge');
goog.require('cljs_workspace.morph');
goog.require('cljs_workspace.history');
goog.require('cljs_workspace.repl');
goog.require('om.dom');
goog.require('goog.style');
goog.require('goog.events.EventType');
goog.require('cljs.core.async');
goog.require('om.dom');
goog.require('cljs.core.async');
goog.require('cljs_workspace.branch_vis');
goog.require('om_sync.core');
goog.require('cljs_workspace.morph');
goog.require('goog.events.EventType');
goog.require('goog.events');
goog.require('cljs_workspace.history');
goog.require('cljs_workspace.branch_merge');
goog.require('om.core');
goog.require('om_sync.util');
goog.require('om.core');
goog.require('goog.style');
goog.require('cljs.reader');
goog.require('cljs_workspace.repl');
goog.require('goog.events');
cljs.core.enable_console_print_BANG_.call(null);
cljs_workspace.socket = cljs.core.atom.call(null,null);
cljs.core.reset_BANG_.call(null,cljs_workspace.morph.right_click_behavior,(function (e,state){cljs_workspace.branch_merge.toggle_preserve.call(null,cljs_workspace.morph.find_morph_path.call(null,cljs.core.deref.call(null,cljs_workspace.history.app_state),state.call(null,new cljs.core.Keyword(null,"id","id",-1388402092))));
return cljs_workspace.morph.toggle_halo.call(null,cljs_workspace.history.app_state,state.call(null,new cljs.core.Keyword(null,"id","id",-1388402092)));
}));
cljs.core.prn.call(null,cljs.core.deref.call(null,cljs_workspace.morph.right_click_behavior));
cljs_workspace.mario = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),"Mario",new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ShapeClass","ShapeClass",1004841735),"Image",new cljs.core.Keyword(null,"url","url",276297046),"http://www.veryicon.com/icon/png/Game/Super%20Mario/Super%20Paper%20Mario.png",new cljs.core.Keyword(null,"Extent","Extent",1039752349),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(100),new cljs.core.Keyword(null,"y","y",-1757859776),(100)], null)], null),new cljs.core.Keyword(null,"submorphs","submorphs",360747770),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"isDraggable","isDraggable",-181233715),true,new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(50),new cljs.core.Keyword(null,"y","y",-1757859776),(50)], null)], null)], null);
cljs_workspace.luigi = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),"Luigi",new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ShapeClass","ShapeClass",1004841735),"Image",new cljs.core.Keyword(null,"url","url",276297046),"http://img4.wikia.nocookie.net/__cb20111019211716/villains/images/2/23/Super_paper_mario_-_luigi_2.png",new cljs.core.Keyword(null,"Extent","Extent",1039752349),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(100),new cljs.core.Keyword(null,"y","y",-1757859776),(100)], null)], null),new cljs.core.Keyword(null,"submorphs","submorphs",360747770),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"isDraggable","isDraggable",-181233715),true,new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(200),new cljs.core.Keyword(null,"y","y",-1757859776),(200)], null)], null)], null);
cljs_workspace.mario_world = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),"World",new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(10),new cljs.core.Keyword(null,"y","y",-1757859776),(10)], null),new cljs.core.Keyword(null,"isDraggable","isDraggable",-181233715),true], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"Extent","Extent",1039752349),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(500),new cljs.core.Keyword(null,"y","y",-1757859776),(400)], null),new cljs.core.Keyword(null,"ShapeClass","ShapeClass",1004841735),"Image",new cljs.core.Keyword(null,"url","url",276297046),"http://images4.alphacoders.com/245/2456.jpg"], null),new cljs.core.Keyword(null,"submorphs","submorphs",360747770),cljs.core.PersistentVector.EMPTY], null);
cljs_workspace.subtitle = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),(5),new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(0),new cljs.core.Keyword(null,"y","y",-1757859776),(420)], null),new cljs.core.Keyword(null,"isDraggable","isDraggable",-181233715),true], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"Extent","Extent",1039752349),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(510),new cljs.core.Keyword(null,"y","y",-1757859776),(200)], null),new cljs.core.Keyword(null,"BorderColor","BorderColor",-1430586062),"darkgrey",new cljs.core.Keyword(null,"BorderWidth","BorderWidth",-270769170),(2),new cljs.core.Keyword(null,"Fill","Fill",-880021796),"lightgrey"], null),new cljs.core.Keyword(null,"submorphs","submorphs",360747770),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),(4),new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"Preserve","Preserve",279768628),true,new cljs.core.Keyword(null,"MorphClass","MorphClass",-645912738),"Text",new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(10),new cljs.core.Keyword(null,"y","y",-1757859776),(10)], null),new cljs.core.Keyword(null,"TextString","TextString",-1730000367),"Welcome to Super Mario World!",new cljs.core.Keyword(null,"isDraggable","isDraggable",-181233715),true], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ShapeClass","ShapeClass",1004841735),"Text",new cljs.core.Keyword(null,"Extent","Extent",1039752349),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(510),new cljs.core.Keyword(null,"y","y",-1757859776),(200)], null)], null)], null)], null)], null);
cljs_workspace.history.init_history.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"url","url",276297046),"/data",new cljs.core.Keyword("server","id","server/id",-281224431),(42),new cljs.core.Keyword(null,"coll","coll",1647737163),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),(1),new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),(1),new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(50),new cljs.core.Keyword(null,"y","y",-1757859776),(200)], null)], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),(1),new cljs.core.Keyword(null,"BorderWidth","BorderWidth",-270769170),(5),new cljs.core.Keyword(null,"BorderColor","BorderColor",-1430586062),"rgb(0,0,0)",new cljs.core.Keyword(null,"Fill","Fill",-880021796),"rgb(255,255,255)",new cljs.core.Keyword(null,"Extent","Extent",1039752349),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(510),new cljs.core.Keyword(null,"y","y",-1757859776),(410)], null)], null),new cljs.core.Keyword(null,"submorphs","submorphs",360747770),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs_workspace.mario_world,cljs_workspace.mario,cljs_workspace.luigi,cljs_workspace.subtitle], null)], null)], null));
cljs_workspace.socket = cljs.core.atom.call(null,null);
cljs_workspace.send_update = (function send_update(state){cljs.core.prn.call(null,"Sending update!");
return cljs.core.deref.call(null,cljs_workspace.socket).send(cljs.core.pr_str.call(null,cljs.core.select_keys.call(null,state.call(null,new cljs.core.Keyword(null,"tx-data","tx-data",934159761)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-state","new-state",-490349212)], null))));
});
cljs_workspace.handle_push = (function handle_push(e){var temp__4126__auto__ = cljs.reader.read_string.call(null,e.data);if(cljs.core.truth_(temp__4126__auto__))
{var state = temp__4126__auto__;console.log(e);
if(cljs.core.truth_(state.call(null,new cljs.core.Keyword(null,"master-update","master-update",-370928128))))
{cljs.core.prn.call(null,"New master pushed!");
return cljs_workspace.history.update_master.call(null,state.call(null,new cljs.core.Keyword(null,"new-master-branch","new-master-branch",-660207882)));
} else
{cljs_workspace.history.save_to_master.call(null,state);
if(cljs_workspace.branch_vis.is_master.call(null,cljs.core.deref.call(null,cljs_workspace.history.current_branch)))
{return cljs.core.reset_BANG_.call(null,cljs_workspace.history.app_state,state);
} else
{return null;
}
}
} else
{return null;
}
});
var sub_chan_9959 = cljs.core.async.chan.call(null);cljs_workspace.app_view = ((function (sub_chan_9959){
return (function app_view(app,owner,opts){if(typeof cljs_workspace.t9954 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs_workspace.t9954 = (function (opts,owner,app,app_view,sub_chan,meta9955){
this.opts = opts;
this.owner = owner;
this.app = app;
this.app_view = app_view;
this.sub_chan = sub_chan;
this.meta9955 = meta9955;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs_workspace.t9954.cljs$lang$type = true;
cljs_workspace.t9954.cljs$lang$ctorStr = "cljs-workspace/t9954";
cljs_workspace.t9954.cljs$lang$ctorPrWriter = ((function (sub_chan_9959){
return (function (this__4202__auto__,writer__4203__auto__,opt__4204__auto__){return cljs.core._write.call(null,writer__4203__auto__,"cljs-workspace/t9954");
});})(sub_chan_9959))
;
cljs_workspace.t9954.prototype.om$core$IRenderState$ = true;
cljs_workspace.t9954.prototype.om$core$IRenderState$render_state$arity$2 = ((function (sub_chan_9959){
return (function (_,p__9957){var self__ = this;
var map__9958 = p__9957;var map__9958__$1 = ((cljs.core.seq_QMARK_.call(null,map__9958))?cljs.core.apply.call(null,cljs.core.hash_map,map__9958):map__9958);var err_msg = cljs.core.get.call(null,map__9958__$1,new cljs.core.Keyword(null,"err-msg","err-msg",-1158512684));var ___$1 = this;cljs.core.async.take_BANG_.call(null,self__.sub_chan,cljs_workspace.send_update);
return React.DOM.div({"id": "om-sync-node"},om.core.build.call(null,om_sync.core.om_sync,self__.app,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opts","opts",155075701),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"view","view",1247994814),cljs_workspace.morph.morph,new cljs.core.Keyword(null,"filter","filter",-948537934),cljs.core.comp.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"create","create",-1301499256),null,new cljs.core.Keyword(null,"update","update",1045576396),null,new cljs.core.Keyword(null,"delete","delete",-1768633620),null], null), null),om_sync.util.tx_tag),new cljs.core.Keyword(null,"id-key","id-key",-1881730044),new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"on-success","on-success",1786904109),((function (___$1,map__9958,map__9958__$1,err_msg,sub_chan_9959){
return (function (res,tx_data){return cljs.core.prn.call(null,"sent update");
});})(___$1,map__9958,map__9958__$1,err_msg,sub_chan_9959))
,new cljs.core.Keyword(null,"sync-chan","sync-chan",701238019),self__.sub_chan,new cljs.core.Keyword(null,"on-error","on-error",1728533530),((function (___$1,map__9958,map__9958__$1,err_msg,sub_chan_9959){
return (function (err,tx_data){cljs.core.prn.call(null,"Error:");
cljs.core.reset_BANG_.call(null,cljs_workspace.history.app_state,new cljs.core.Keyword(null,"old-state","old-state",1039580704).cljs$core$IFn$_invoke$arity$1(tx_data));
return om.core.set_state_BANG_.call(null,self__.owner,new cljs.core.Keyword(null,"err-msg","err-msg",-1158512684),"Ooops! Sorry something went wrong try again later.");
});})(___$1,map__9958,map__9958__$1,err_msg,sub_chan_9959))
], null)], null)),(cljs.core.truth_(err_msg)?React.DOM.div(null,err_msg):null));
});})(sub_chan_9959))
;
cljs_workspace.t9954.prototype.om$core$IWillUpdate$ = true;
cljs_workspace.t9954.prototype.om$core$IWillUpdate$will_update$arity$3 = ((function (sub_chan_9959){
return (function (_,next_props,next_state){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(new cljs.core.Keyword(null,"err-msg","err-msg",-1158512684).cljs$core$IFn$_invoke$arity$1(next_state)))
{return setTimeout(((function (___$1,sub_chan_9959){
return (function (){return om.core.set_state_BANG_.call(null,self__.owner,new cljs.core.Keyword(null,"err-msg","err-msg",-1158512684),null);
});})(___$1,sub_chan_9959))
,(5000));
} else
{return null;
}
});})(sub_chan_9959))
;
cljs_workspace.t9954.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (sub_chan_9959){
return (function (_9956){var self__ = this;
var _9956__$1 = this;return self__.meta9955;
});})(sub_chan_9959))
;
cljs_workspace.t9954.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (sub_chan_9959){
return (function (_9956,meta9955__$1){var self__ = this;
var _9956__$1 = this;return (new cljs_workspace.t9954(self__.opts,self__.owner,self__.app,self__.app_view,self__.sub_chan,meta9955__$1));
});})(sub_chan_9959))
;
cljs_workspace.__GT_t9954 = ((function (sub_chan_9959){
return (function __GT_t9954(opts__$1,owner__$1,app__$1,app_view__$1,sub_chan__$1,meta9955){return (new cljs_workspace.t9954(opts__$1,owner__$1,app__$1,app_view__$1,sub_chan__$1,meta9955));
});})(sub_chan_9959))
;
}
return (new cljs_workspace.t9954(opts,owner,app,app_view,sub_chan_9959,null));
});})(sub_chan_9959))
;
var tx_chan_9960 = cljs.core.async.chan.call(null);var tx_pub_chan_9961 = cljs.core.async.pub.call(null,tx_chan_9960,((function (tx_chan_9960){
return (function (tx){return new cljs.core.Keyword(null,"txs","txs",2056038378);
});})(tx_chan_9960))
);cljs.core.prn.call(null,"connect channel to server");
om_sync.util.edn_xhr.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"url","url",276297046),"/data",new cljs.core.Keyword(null,"on-error","on-error",1728533530),((function (tx_chan_9960,tx_pub_chan_9961){
return (function (res,tx_data){cljs.core.prn.call(null,"Error: ");
return cljs.core.println.call(null,res);
});})(tx_chan_9960,tx_pub_chan_9961))
,new cljs.core.Keyword(null,"on-complete","on-complete",-1531183971),((function (tx_chan_9960,tx_pub_chan_9961){
return (function (res){var host_9962 = (window["location"]["hostname"]);var port_9963 = (window["location"]["port"]);var conn_9964 = (new WebSocket(("ws://"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(host_9962)+":"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(port_9963)+"/ws")));conn_9964.onmessage = cljs_workspace.handle_push;
cljs.core.reset_BANG_.call(null,cljs_workspace.socket,conn_9964);
if((res == null))
{} else
{cljs.core.reset_BANG_.call(null,cljs_workspace.history.app_state,res);
}
return om.core.root.call(null,cljs_workspace.app_view,cljs_workspace.history.app_state,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"target","target",253001721),document.getElementById("app"),new cljs.core.Keyword(null,"shared","shared",-384145993),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tx-chan","tx-chan",1461202998),tx_pub_chan_9961], null),new cljs.core.Keyword(null,"tx-listen","tx-listen",119130367),((function (tx_chan_9960,tx_pub_chan_9961){
return (function (tx_data,root_cursor){cljs_workspace.history.save_state.call(null,new cljs.core.Keyword(null,"new-state","new-state",-490349212).cljs$core$IFn$_invoke$arity$1(tx_data));
if(cljs_workspace.branch_vis.is_master.call(null,cljs.core.deref.call(null,cljs_workspace.history.current_branch)))
{return cljs.core.deref.call(null,cljs_workspace.socket).send(cljs.core.pr_str.call(null,cljs.core.select_keys.call(null,tx_data,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-state","new-state",-490349212)], null))));
} else
{return null;
}
});})(tx_chan_9960,tx_pub_chan_9961))
], null));
});})(tx_chan_9960,tx_pub_chan_9961))
], null));
