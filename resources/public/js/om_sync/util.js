// Compiled by ClojureScript 0.0-2342
goog.provide('om_sync.util');
goog.require('cljs.core');
goog.require('goog.events.EventType');
goog.require('goog.net.XhrIo');
goog.require('goog.events');
goog.require('goog.events');
goog.require('cljs.reader');
goog.require('cljs.reader');
om_sync.util.popn = (function popn(n,v){var n__$1 = n;var res = v;while(true){
if((n__$1 > (0)))
{{
var G__14567 = (n__$1 - (1));
var G__14568 = cljs.core.pop.call(null,res);
n__$1 = G__14567;
res = G__14568;
continue;
}
} else
{return res;
}
break;
}
});
om_sync.util.sub = (function sub(p0,p1){return cljs.core.vec.call(null,cljs.core.drop.call(null,(cljs.core.count.call(null,p0) - cljs.core.count.call(null,p1)),p0));
});
om_sync.util.tx_tag = (function tx_tag(p__14569){var map__14571 = p__14569;var map__14571__$1 = ((cljs.core.seq_QMARK_.call(null,map__14571))?cljs.core.apply.call(null,cljs.core.hash_map,map__14571):map__14571);var tx_data = map__14571__$1;var tag = cljs.core.get.call(null,map__14571__$1,new cljs.core.Keyword(null,"tag","tag",-1290361223));if((tag instanceof cljs.core.Keyword))
{return tag;
} else
{return cljs.core.first.call(null,tag);
}
});
om_sync.util.subpath_QMARK_ = (function subpath_QMARK_(a,b){return cljs.core._EQ_.call(null,a,om_sync.util.popn.call(null,(cljs.core.count.call(null,b) - cljs.core.count.call(null,a)),b));
});
om_sync.util.error_QMARK_ = (function error_QMARK_(res){return cljs.core.contains_QMARK_.call(null,res,new cljs.core.Keyword(null,"error","error",-978969032));
});
om_sync.util.meths = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"get","get",1683182755),"GET",new cljs.core.Keyword(null,"put","put",1299772570),"PUT",new cljs.core.Keyword(null,"post","post",269697687),"POST",new cljs.core.Keyword(null,"delete","delete",-1768633620),"DELETE"], null);
om_sync.util.edn_xhr = (function edn_xhr(p__14572){var map__14574 = p__14572;var map__14574__$1 = ((cljs.core.seq_QMARK_.call(null,map__14574))?cljs.core.apply.call(null,cljs.core.hash_map,map__14574):map__14574);var on_error = cljs.core.get.call(null,map__14574__$1,new cljs.core.Keyword(null,"on-error","on-error",1728533530));var on_complete = cljs.core.get.call(null,map__14574__$1,new cljs.core.Keyword(null,"on-complete","on-complete",-1531183971));var data = cljs.core.get.call(null,map__14574__$1,new cljs.core.Keyword(null,"data","data",-232669377));var url = cljs.core.get.call(null,map__14574__$1,new cljs.core.Keyword(null,"url","url",276297046));var method = cljs.core.get.call(null,map__14574__$1,new cljs.core.Keyword(null,"method","method",55703592));var xhr = (new goog.net.XhrIo());goog.events.listen(xhr,goog.net.EventType.SUCCESS,((function (xhr,map__14574,map__14574__$1,on_error,on_complete,data,url,method){
return (function (e){return on_complete.call(null,cljs.reader.read_string.call(null,xhr.getResponseText()));
});})(xhr,map__14574,map__14574__$1,on_error,on_complete,data,url,method))
);
goog.events.listen(xhr,goog.net.EventType.ERROR,((function (xhr,map__14574,map__14574__$1,on_error,on_complete,data,url,method){
return (function (e){return on_error.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",-978969032),xhr.getResponseText()], null));
});})(xhr,map__14574,map__14574__$1,on_error,on_complete,data,url,method))
);
return xhr.send(url,om_sync.util.meths.call(null,method),(cljs.core.truth_(data)?cljs.core.pr_str.call(null,data):null),{"Accept": "application/edn", "Content-Type": "application/edn"});
});
