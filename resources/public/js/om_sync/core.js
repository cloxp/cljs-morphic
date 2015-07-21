// Compiled by ClojureScript 0.0-2342
goog.provide('om_sync.core');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('om_sync.util');
goog.require('om_sync.util');
goog.require('om.dom');
goog.require('om.dom');
goog.require('om.core');
goog.require('om.core');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
om_sync.core.type__GT_method = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"create","create",-1301499256),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"update","update",1045576396),new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.Keyword(null,"delete","delete",-1768633620),new cljs.core.Keyword(null,"delete","delete",-1768633620)], null);
om_sync.core.sync_server = (function sync_server(url,tag,edn){var res_chan = cljs.core.async.chan.call(null);om_sync.util.edn_xhr.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"method","method",55703592),om_sync.core.type__GT_method.call(null,tag),new cljs.core.Keyword(null,"url","url",276297046),url,new cljs.core.Keyword(null,"data","data",-232669377),edn,new cljs.core.Keyword(null,"on-error","on-error",1728533530),((function (res_chan){
return (function (err){return cljs.core.async.put_BANG_.call(null,res_chan,err);
});})(res_chan))
,new cljs.core.Keyword(null,"on-complete","on-complete",-1531183971),((function (res_chan){
return (function (res){return cljs.core.async.put_BANG_.call(null,res_chan,res);
});})(res_chan))
], null));
return res_chan;
});
om_sync.core.tag_and_edn = (function tag_and_edn(coll_path,path,tag_fn,id_key,tx_data){var tag = ((!((tag_fn == null)))?tag_fn.call(null,tx_data):om_sync.util.tx_tag.call(null,tx_data));var edn = (function (){var pred__14281 = cljs.core._EQ_;var expr__14282 = tag;if(cljs.core.truth_(pred__14281.call(null,new cljs.core.Keyword(null,"create","create",-1301499256),expr__14282)))
{return new cljs.core.Keyword(null,"new-value","new-value",1087038368).cljs$core$IFn$_invoke$arity$1(tx_data);
} else
{if(cljs.core.truth_(pred__14281.call(null,new cljs.core.Keyword(null,"update","update",1045576396),expr__14282)))
{var ppath = om_sync.util.popn.call(null,(cljs.core.count.call(null,path) - (cljs.core.count.call(null,coll_path) + (1))),path);var m = cljs.core.select_keys.call(null,cljs.core.get_in.call(null,new cljs.core.Keyword(null,"new-state","new-state",-490349212).cljs$core$IFn$_invoke$arity$1(tx_data),ppath),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [id_key], null));var rel = om_sync.util.sub.call(null,path,coll_path);return cljs.core.assoc_in.call(null,m,cljs.core.rest.call(null,rel),new cljs.core.Keyword(null,"new-value","new-value",1087038368).cljs$core$IFn$_invoke$arity$1(tx_data));
} else
{if(cljs.core.truth_(pred__14281.call(null,new cljs.core.Keyword(null,"delete","delete",-1768633620),expr__14282)))
{return id_key.call(null,new cljs.core.Keyword(null,"old-value","old-value",862546795).cljs$core$IFn$_invoke$arity$1(tx_data));
} else
{return null;
}
}
}
})();return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag,edn], null);
});
/**
* ALPHA: Creates a reusable sync componet. Data must be a map containing
* :url and :coll keys. :url must identify a server endpoint that can
* takes EDN data via POST for create, PUT for update, and DELETE for
* delete. :coll must be a cursor into the application state. Note the
* first argument could of course just be a cursor itself.
* 
* In order to function you must provide a subscribeable core.async
* channel that will stream all :tx-listen events. This channel must be
* called :tx-chan and provided via the :share option to om.core/root. It
* must be a channel constructed with cljs.core.async/pub with the topic
* :txs.
* 
* Once built om-sync will act on any transactions to the :coll value
* regardless of depth. In order to identiy which transactions to act
* on these transactions must be labeled as :create, :update, or
* :delete.
* 
* om-sync takes a variety of options via the :opts passed to
* om.core/build:
* 
* :view - a required Om component function to render the collection.
* 
* :id-key - which property represents the server id for a item in the
* collection.
* 
* :filter - a function which filters which tagged transaction to actually sync.
* 
* :tag-fn - not all components you might want to interact with may
* have properly tagged their transactions. This function will
* receive the transaction data and return the determined tag.
* 
* :on-success - a callback function that will receive the server
* response and the transaction data on success.
* 
* :on-error - a callback function that will receive the server error
* and the transaction data on failure. The transaction data can
* easily be leveraged to rollback the application state.
* 
* :sync-chan - if given this option, om-sync will not invoke
* sync-server instead it will put a map containing the :listen-path,
* :url, :tag, :edn, :on-success, :on-error, and :tx-data on the
* provided channel. This higher level operations such as server
* request batching and multiple om-sync component coordination.
*/
om_sync.core.om_sync = (function() {
var om_sync__$1 = null;
var om_sync__$1__2 = (function (data,owner){return om_sync__$1.call(null,data,owner,null);
});
var om_sync__$1__3 = (function (p__14284,owner,opts){var map__14410 = p__14284;var map__14410__$1 = ((cljs.core.seq_QMARK_.call(null,map__14410))?cljs.core.apply.call(null,cljs.core.hash_map,map__14410):map__14410);var data = map__14410__$1;var coll = cljs.core.get.call(null,map__14410__$1,new cljs.core.Keyword(null,"coll","coll",1647737163));var url = cljs.core.get.call(null,map__14410__$1,new cljs.core.Keyword(null,"url","url",276297046));if(!((url == null)))
{} else
{throw (new Error(("Assert failed: om-sync component not given url\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"not","not",1044554643,null),cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),new cljs.core.Symbol(null,"url","url",1916828573,null))))))));
}
if(typeof om_sync.core.t14411 !== 'undefined')
{} else
{
/**
* @constructor
*/
om_sync.core.t14411 = (function (url,coll,data,map__14410,opts,owner,p__14284,om_sync,meta14412){
this.url = url;
this.coll = coll;
this.data = data;
this.map__14410 = map__14410;
this.opts = opts;
this.owner = owner;
this.p__14284 = p__14284;
this.om_sync = om_sync;
this.meta14412 = meta14412;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
om_sync.core.t14411.cljs$lang$type = true;
om_sync.core.t14411.cljs$lang$ctorStr = "om-sync.core/t14411";
om_sync.core.t14411.cljs$lang$ctorPrWriter = ((function (map__14410,map__14410__$1,data,coll,url){
return (function (this__4202__auto__,writer__4203__auto__,opt__4204__auto__){return cljs.core._write.call(null,writer__4203__auto__,"om-sync.core/t14411");
});})(map__14410,map__14410__$1,data,coll,url))
;
om_sync.core.t14411.prototype.om$core$IRender$ = true;
om_sync.core.t14411.prototype.om$core$IRender$render$arity$1 = ((function (map__14410,map__14410__$1,data,coll,url){
return (function (_){var self__ = this;
var ___$1 = this;return om.core.build.call(null,new cljs.core.Keyword(null,"view","view",1247994814).cljs$core$IFn$_invoke$arity$1(self__.opts),self__.coll);
});})(map__14410,map__14410__$1,data,coll,url))
;
om_sync.core.t14411.prototype.om$core$IWillUnmount$ = true;
om_sync.core.t14411.prototype.om$core$IWillUnmount$will_unmount$arity$1 = ((function (map__14410,map__14410__$1,data,coll,url){
return (function (_){var self__ = this;
var ___$1 = this;var map__14414 = om.core.get_state.call(null,self__.owner);var map__14414__$1 = ((cljs.core.seq_QMARK_.call(null,map__14414))?cljs.core.apply.call(null,cljs.core.hash_map,map__14414):map__14414);var txs = cljs.core.get.call(null,map__14414__$1,new cljs.core.Keyword(null,"txs","txs",2056038378));var kill_chan = cljs.core.get.call(null,map__14414__$1,new cljs.core.Keyword(null,"kill-chan","kill-chan",-1563670254));if(cljs.core.truth_(kill_chan))
{cljs.core.async.put_BANG_.call(null,kill_chan,(new Date()));
} else
{}
if(cljs.core.truth_(txs))
{return cljs.core.async.unsub.call(null,om.core.get_shared.call(null,self__.owner,new cljs.core.Keyword(null,"tx-chan","tx-chan",1461202998)),new cljs.core.Keyword(null,"txs","txs",2056038378),txs);
} else
{return null;
}
});})(map__14410,map__14410__$1,data,coll,url))
;
om_sync.core.t14411.prototype.om$core$IWillMount$ = true;
om_sync.core.t14411.prototype.om$core$IWillMount$will_mount$arity$1 = ((function (map__14410,map__14410__$1,data,coll,url){
return (function (_){var self__ = this;
var ___$1 = this;var map__14415 = self__.opts;var map__14415__$1 = ((cljs.core.seq_QMARK_.call(null,map__14415))?cljs.core.apply.call(null,cljs.core.hash_map,map__14415):map__14415);var sync_chan = cljs.core.get.call(null,map__14415__$1,new cljs.core.Keyword(null,"sync-chan","sync-chan",701238019));var tag_fn = cljs.core.get.call(null,map__14415__$1,new cljs.core.Keyword(null,"tag-fn","tag-fn",-1398476045));var filter = cljs.core.get.call(null,map__14415__$1,new cljs.core.Keyword(null,"filter","filter",-948537934));var id_key = cljs.core.get.call(null,map__14415__$1,new cljs.core.Keyword(null,"id-key","id-key",-1881730044));var map__14416 = self__.opts;var map__14416__$1 = ((cljs.core.seq_QMARK_.call(null,map__14416))?cljs.core.apply.call(null,cljs.core.hash_map,map__14416):map__14416);var on_error = cljs.core.get.call(null,map__14416__$1,new cljs.core.Keyword(null,"on-error","on-error",1728533530));var on_success = cljs.core.get.call(null,map__14416__$1,new cljs.core.Keyword(null,"on-success","on-success",1786904109));var kill_chan = om.core.get_state.call(null,self__.owner,new cljs.core.Keyword(null,"kill-chan","kill-chan",-1563670254));var tx_chan = om.core.get_shared.call(null,self__.owner,new cljs.core.Keyword(null,"tx-chan","tx-chan",1461202998));var txs = cljs.core.async.chan.call(null);var coll_path = om.core.path.call(null,self__.coll);if(!((tx_chan == null)))
{} else
{throw (new Error(("Assert failed: om-sync requires shared :tx-chan pub channel with :txs topic\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"not","not",1044554643,null),cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),new cljs.core.Symbol(null,"tx-chan","tx-chan",-1193232771,null))))))));
}
cljs.core.async.sub.call(null,tx_chan,new cljs.core.Keyword(null,"txs","txs",2056038378),txs);
om.core.set_state_BANG_.call(null,self__.owner,new cljs.core.Keyword(null,"txs","txs",2056038378),txs);
var c__7126__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__7126__auto__,map__14415,map__14415__$1,sync_chan,tag_fn,filter,id_key,map__14416,map__14416__$1,on_error,on_success,kill_chan,tx_chan,txs,coll_path,___$1,map__14410,map__14410__$1,data,coll,url){
return (function (){var f__7127__auto__ = (function (){var switch__7111__auto__ = ((function (c__7126__auto__,map__14415,map__14415__$1,sync_chan,tag_fn,filter,id_key,map__14416,map__14416__$1,on_error,on_success,kill_chan,tx_chan,txs,coll_path,___$1,map__14410,map__14410__$1,data,coll,url){
return (function (state_14489){var state_val_14490 = (state_14489[(1)]);if((state_val_14490 === (7)))
{var inst_14485 = (state_14489[(2)]);var state_14489__$1 = state_14489;var statearr_14491_14535 = state_14489__$1;(statearr_14491_14535[(2)] = inst_14485);
(statearr_14491_14535[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (20)))
{var inst_14456 = (state_14489[(7)]);var inst_14457 = (state_14489[(8)]);var inst_14458 = (state_14489[(9)]);var inst_14462 = [new cljs.core.Keyword(null,"url","url",276297046),new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Keyword(null,"edn","edn",1317840885),new cljs.core.Keyword(null,"listen-path","listen-path",431574919),new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.Keyword(null,"on-error","on-error",1728533530),new cljs.core.Keyword(null,"tx-data","tx-data",934159761)];var inst_14463 = [self__.url,inst_14456,inst_14457,coll_path,on_success,on_error,inst_14458];var inst_14464 = cljs.core.PersistentHashMap.fromArrays(inst_14462,inst_14463);var state_14489__$1 = state_14489;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14489__$1,(23),sync_chan,inst_14464);
} else
{if((state_val_14490 === (27)))
{var inst_14477 = (state_14489[(2)]);var state_14489__$1 = state_14489;var statearr_14492_14536 = state_14489__$1;(statearr_14492_14536[(2)] = inst_14477);
(statearr_14492_14536[(1)] = (22));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (1)))
{var state_14489__$1 = state_14489;var statearr_14493_14537 = state_14489__$1;(statearr_14493_14537[(2)] = null);
(statearr_14493_14537[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (24)))
{var inst_14470 = (state_14489[(10)]);var inst_14470__$1 = (state_14489[(2)]);var inst_14471 = om_sync.util.error_QMARK_.call(null,inst_14470__$1);var state_14489__$1 = (function (){var statearr_14494 = state_14489;(statearr_14494[(10)] = inst_14470__$1);
return statearr_14494;
})();if(inst_14471)
{var statearr_14495_14538 = state_14489__$1;(statearr_14495_14538[(1)] = (25));
} else
{var statearr_14496_14539 = state_14489__$1;(statearr_14496_14539[(1)] = (26));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (4)))
{var inst_14423 = (state_14489[(2)]);var inst_14424 = cljs.core.nth.call(null,inst_14423,(0),null);var inst_14425 = cljs.core.nth.call(null,inst_14423,(1),null);var inst_14426 = cljs.core._EQ_.call(null,inst_14425,kill_chan);var state_14489__$1 = (function (){var statearr_14497 = state_14489;(statearr_14497[(11)] = inst_14424);
return statearr_14497;
})();if(inst_14426)
{var statearr_14498_14540 = state_14489__$1;(statearr_14498_14540[(1)] = (5));
} else
{var statearr_14499_14541 = state_14489__$1;(statearr_14499_14541[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (15)))
{var inst_14437 = (state_14489[(12)]);var inst_14447 = filter.call(null,inst_14437);var state_14489__$1 = state_14489;var statearr_14500_14542 = state_14489__$1;(statearr_14500_14542[(2)] = inst_14447);
(statearr_14500_14542[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (21)))
{var inst_14456 = (state_14489[(7)]);var inst_14457 = (state_14489[(8)]);var inst_14468 = om_sync.core.sync_server.call(null,self__.url,inst_14456,inst_14457);var state_14489__$1 = state_14489;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14489__$1,(24),inst_14468);
} else
{if((state_val_14490 === (13)))
{var inst_14452 = (state_14489[(2)]);var state_14489__$1 = state_14489;if(cljs.core.truth_(inst_14452))
{var statearr_14501_14543 = state_14489__$1;(statearr_14501_14543[(1)] = (17));
} else
{var statearr_14502_14544 = state_14489__$1;(statearr_14502_14544[(1)] = (18));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (22)))
{var inst_14479 = (state_14489[(2)]);var state_14489__$1 = state_14489;var statearr_14503_14545 = state_14489__$1;(statearr_14503_14545[(2)] = inst_14479);
(statearr_14503_14545[(1)] = (19));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (6)))
{var inst_14424 = (state_14489[(11)]);var inst_14431 = (state_14489[(13)]);var inst_14431__$1 = cljs.core.nth.call(null,inst_14424,(0),null);var inst_14432 = cljs.core.seq_QMARK_.call(null,inst_14431__$1);var state_14489__$1 = (function (){var statearr_14504 = state_14489;(statearr_14504[(13)] = inst_14431__$1);
return statearr_14504;
})();if(inst_14432)
{var statearr_14505_14546 = state_14489__$1;(statearr_14505_14546[(1)] = (8));
} else
{var statearr_14506_14547 = state_14489__$1;(statearr_14506_14547[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (25)))
{var inst_14470 = (state_14489[(10)]);var inst_14458 = (state_14489[(9)]);var inst_14473 = on_error.call(null,inst_14470,inst_14458);var state_14489__$1 = state_14489;var statearr_14507_14548 = state_14489__$1;(statearr_14507_14548[(2)] = inst_14473);
(statearr_14507_14548[(1)] = (27));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (17)))
{var inst_14456 = (state_14489[(7)]);var inst_14437 = (state_14489[(12)]);var inst_14440 = (state_14489[(14)]);var inst_14455 = om_sync.core.tag_and_edn.call(null,coll_path,inst_14440,tag_fn,id_key,inst_14437);var inst_14456__$1 = cljs.core.nth.call(null,inst_14455,(0),null);var inst_14457 = cljs.core.nth.call(null,inst_14455,(1),null);var inst_14458 = cljs.core.assoc.call(null,inst_14437,new cljs.core.Keyword("om-sync.core","tag","om-sync.core/tag",-1945709604),inst_14456__$1);var inst_14459 = (sync_chan == null);var inst_14460 = cljs.core.not.call(null,inst_14459);var state_14489__$1 = (function (){var statearr_14508 = state_14489;(statearr_14508[(7)] = inst_14456__$1);
(statearr_14508[(8)] = inst_14457);
(statearr_14508[(9)] = inst_14458);
return statearr_14508;
})();if(inst_14460)
{var statearr_14509_14549 = state_14489__$1;(statearr_14509_14549[(1)] = (20));
} else
{var statearr_14510_14550 = state_14489__$1;(statearr_14510_14550[(1)] = (21));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (3)))
{var inst_14487 = (state_14489[(2)]);var state_14489__$1 = state_14489;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14489__$1,inst_14487);
} else
{if((state_val_14490 === (12)))
{var inst_14442 = (state_14489[(15)]);var state_14489__$1 = state_14489;var statearr_14511_14551 = state_14489__$1;(statearr_14511_14551[(2)] = inst_14442);
(statearr_14511_14551[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (2)))
{var inst_14419 = cljs.core.PersistentVector.EMPTY_NODE;var inst_14420 = [txs,kill_chan];var inst_14421 = (new cljs.core.PersistentVector(null,2,(5),inst_14419,inst_14420,null));var state_14489__$1 = state_14489;return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_14489__$1,(4),inst_14421);
} else
{if((state_val_14490 === (23)))
{var inst_14466 = (state_14489[(2)]);var state_14489__$1 = state_14489;var statearr_14512_14552 = state_14489__$1;(statearr_14512_14552[(2)] = inst_14466);
(statearr_14512_14552[(1)] = (22));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (19)))
{var inst_14482 = (state_14489[(2)]);var state_14489__$1 = (function (){var statearr_14513 = state_14489;(statearr_14513[(16)] = inst_14482);
return statearr_14513;
})();var statearr_14514_14553 = state_14489__$1;(statearr_14514_14553[(2)] = null);
(statearr_14514_14553[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (11)))
{var inst_14444 = (state_14489[(17)]);var inst_14444__$1 = (filter == null);var state_14489__$1 = (function (){var statearr_14515 = state_14489;(statearr_14515[(17)] = inst_14444__$1);
return statearr_14515;
})();if(cljs.core.truth_(inst_14444__$1))
{var statearr_14516_14554 = state_14489__$1;(statearr_14516_14554[(1)] = (14));
} else
{var statearr_14517_14555 = state_14489__$1;(statearr_14517_14555[(1)] = (15));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (9)))
{var inst_14431 = (state_14489[(13)]);var state_14489__$1 = state_14489;var statearr_14518_14556 = state_14489__$1;(statearr_14518_14556[(2)] = inst_14431);
(statearr_14518_14556[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (5)))
{var state_14489__$1 = state_14489;var statearr_14519_14557 = state_14489__$1;(statearr_14519_14557[(2)] = new cljs.core.Keyword(null,"done","done",-889844188));
(statearr_14519_14557[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (14)))
{var inst_14444 = (state_14489[(17)]);var state_14489__$1 = state_14489;var statearr_14520_14558 = state_14489__$1;(statearr_14520_14558[(2)] = inst_14444);
(statearr_14520_14558[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (26)))
{var inst_14470 = (state_14489[(10)]);var inst_14458 = (state_14489[(9)]);var inst_14475 = on_success.call(null,inst_14470,inst_14458);var state_14489__$1 = state_14489;var statearr_14521_14559 = state_14489__$1;(statearr_14521_14559[(2)] = inst_14475);
(statearr_14521_14559[(1)] = (27));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (16)))
{var inst_14449 = (state_14489[(2)]);var state_14489__$1 = state_14489;var statearr_14522_14560 = state_14489__$1;(statearr_14522_14560[(2)] = inst_14449);
(statearr_14522_14560[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (10)))
{var inst_14424 = (state_14489[(11)]);var inst_14437 = (state_14489[(12)]);var inst_14440 = (state_14489[(14)]);var inst_14442 = (state_14489[(15)]);var inst_14437__$1 = (state_14489[(2)]);var inst_14438 = cljs.core.get.call(null,inst_14437__$1,new cljs.core.Keyword(null,"new-state","new-state",-490349212));var inst_14439 = cljs.core.get.call(null,inst_14437__$1,new cljs.core.Keyword(null,"new-value","new-value",1087038368));var inst_14440__$1 = cljs.core.get.call(null,inst_14437__$1,new cljs.core.Keyword(null,"path","path",-188191168));var inst_14441 = cljs.core.nth.call(null,inst_14424,(1),null);var inst_14442__$1 = om_sync.util.subpath_QMARK_.call(null,coll_path,inst_14440__$1);var state_14489__$1 = (function (){var statearr_14523 = state_14489;(statearr_14523[(18)] = inst_14439);
(statearr_14523[(12)] = inst_14437__$1);
(statearr_14523[(19)] = inst_14441);
(statearr_14523[(14)] = inst_14440__$1);
(statearr_14523[(15)] = inst_14442__$1);
(statearr_14523[(20)] = inst_14438);
return statearr_14523;
})();if(inst_14442__$1)
{var statearr_14524_14561 = state_14489__$1;(statearr_14524_14561[(1)] = (11));
} else
{var statearr_14525_14562 = state_14489__$1;(statearr_14525_14562[(1)] = (12));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (18)))
{var state_14489__$1 = state_14489;var statearr_14526_14563 = state_14489__$1;(statearr_14526_14563[(2)] = null);
(statearr_14526_14563[(1)] = (19));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14490 === (8)))
{var inst_14431 = (state_14489[(13)]);var inst_14434 = cljs.core.apply.call(null,cljs.core.hash_map,inst_14431);var state_14489__$1 = state_14489;var statearr_14527_14564 = state_14489__$1;(statearr_14527_14564[(2)] = inst_14434);
(statearr_14527_14564[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__7126__auto__,map__14415,map__14415__$1,sync_chan,tag_fn,filter,id_key,map__14416,map__14416__$1,on_error,on_success,kill_chan,tx_chan,txs,coll_path,___$1,map__14410,map__14410__$1,data,coll,url))
;return ((function (switch__7111__auto__,c__7126__auto__,map__14415,map__14415__$1,sync_chan,tag_fn,filter,id_key,map__14416,map__14416__$1,on_error,on_success,kill_chan,tx_chan,txs,coll_path,___$1,map__14410,map__14410__$1,data,coll,url){
return (function() {
var state_machine__7112__auto__ = null;
var state_machine__7112__auto____0 = (function (){var statearr_14531 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_14531[(0)] = state_machine__7112__auto__);
(statearr_14531[(1)] = (1));
return statearr_14531;
});
var state_machine__7112__auto____1 = (function (state_14489){while(true){
var ret_value__7113__auto__ = (function (){try{while(true){
var result__7114__auto__ = switch__7111__auto__.call(null,state_14489);if(cljs.core.keyword_identical_QMARK_.call(null,result__7114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__7114__auto__;
}
break;
}
}catch (e14532){if((e14532 instanceof Object))
{var ex__7115__auto__ = e14532;var statearr_14533_14565 = state_14489;(statearr_14533_14565[(5)] = ex__7115__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14489);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14532;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7113__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14566 = state_14489;
state_14489 = G__14566;
continue;
}
} else
{return ret_value__7113__auto__;
}
break;
}
});
state_machine__7112__auto__ = function(state_14489){
switch(arguments.length){
case 0:
return state_machine__7112__auto____0.call(this);
case 1:
return state_machine__7112__auto____1.call(this,state_14489);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__7112__auto____0;
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__7112__auto____1;
return state_machine__7112__auto__;
})()
;})(switch__7111__auto__,c__7126__auto__,map__14415,map__14415__$1,sync_chan,tag_fn,filter,id_key,map__14416,map__14416__$1,on_error,on_success,kill_chan,tx_chan,txs,coll_path,___$1,map__14410,map__14410__$1,data,coll,url))
})();var state__7128__auto__ = (function (){var statearr_14534 = f__7127__auto__.call(null);(statearr_14534[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7126__auto__);
return statearr_14534;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7128__auto__);
});})(c__7126__auto__,map__14415,map__14415__$1,sync_chan,tag_fn,filter,id_key,map__14416,map__14416__$1,on_error,on_success,kill_chan,tx_chan,txs,coll_path,___$1,map__14410,map__14410__$1,data,coll,url))
);
return c__7126__auto__;
});})(map__14410,map__14410__$1,data,coll,url))
;
om_sync.core.t14411.prototype.om$core$IInitState$ = true;
om_sync.core.t14411.prototype.om$core$IInitState$init_state$arity$1 = ((function (map__14410,map__14410__$1,data,coll,url){
return (function (_){var self__ = this;
var ___$1 = this;return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"kill-chan","kill-chan",-1563670254),cljs.core.async.chan.call(null)], null);
});})(map__14410,map__14410__$1,data,coll,url))
;
om_sync.core.t14411.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (map__14410,map__14410__$1,data,coll,url){
return (function (_14413){var self__ = this;
var _14413__$1 = this;return self__.meta14412;
});})(map__14410,map__14410__$1,data,coll,url))
;
om_sync.core.t14411.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (map__14410,map__14410__$1,data,coll,url){
return (function (_14413,meta14412__$1){var self__ = this;
var _14413__$1 = this;return (new om_sync.core.t14411(self__.url,self__.coll,self__.data,self__.map__14410,self__.opts,self__.owner,self__.p__14284,self__.om_sync,meta14412__$1));
});})(map__14410,map__14410__$1,data,coll,url))
;
om_sync.core.__GT_t14411 = ((function (map__14410,map__14410__$1,data,coll,url){
return (function __GT_t14411(url__$1,coll__$1,data__$1,map__14410__$2,opts__$1,owner__$1,p__14284__$1,om_sync__$2,meta14412){return (new om_sync.core.t14411(url__$1,coll__$1,data__$1,map__14410__$2,opts__$1,owner__$1,p__14284__$1,om_sync__$2,meta14412));
});})(map__14410,map__14410__$1,data,coll,url))
;
}
return (new om_sync.core.t14411(url,coll,data,map__14410__$1,opts,owner,p__14284,om_sync__$1,null));
});
om_sync__$1 = function(p__14284,owner,opts){
switch(arguments.length){
case 2:
return om_sync__$1__2.call(this,p__14284,owner);
case 3:
return om_sync__$1__3.call(this,p__14284,owner,opts);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
om_sync__$1.cljs$core$IFn$_invoke$arity$2 = om_sync__$1__2;
om_sync__$1.cljs$core$IFn$_invoke$arity$3 = om_sync__$1__3;
return om_sync__$1;
})()
;
