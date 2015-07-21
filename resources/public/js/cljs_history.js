// Compiled by ClojureScript 0.0-2277
goog.provide('cljs_history');
goog.require('cljs.core');
goog.require('om_sync.util');
goog.require('cljs_workspace.morph');
goog.require('om_sync.core');
goog.require('cljs_workspace.morph');
goog.require('om.dom');
goog.require('goog.events.EventType');
goog.require('om.dom');
goog.require('om_sync.core');
goog.require('cljs_workspace.morph');
goog.require('goog.events.EventType');
goog.require('goog.events');
goog.require('om.core');
goog.require('om_sync.util');
goog.require('om.core');
goog.require('goog.events');
cljs.core.enable_console_print_BANG_.call(null);
cljs_history.diagram_width = (400);
cljs_history.branch_height = (20);
cljs_history.app_history = cljs.core.atom.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,cljs_history.app_state)], null));
cljs_history.current_branch = cljs.core.atom.call(null,cljs.core.deref.call(null,cljs_history.app_history));
cljs_history.reverted_to = cljs.core.atom.call(null,(-1));
cljs_history.history_slider = om.dom.input.call(null,{"onChange": (function (p1__14692_SHARP_){return cljs_history.revert_to.call(null,p1__14692_SHARP_.target.value);
}), "defaultValue": (100), "max": (100), "min": (0), "type": "range", "style": {"left": (5), "top": (5), "position": "absolute"}});
cljs_history.history_indicator = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),"indexMorph",new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(cljs_history.diagram_width / (2)),new cljs.core.Keyword(null,"y","y",-1757859776),(3)], null)], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"Fill","Fill",-880021796),"lightgreen",new cljs.core.Keyword(null,"Extent","Extent",1039752349),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(4),new cljs.core.Keyword(null,"y","y",-1757859776),cljs_history.branch_height], null)], null)], null);
cljs_history.move_indicator_to = (function move_indicator_to(index){return cljs_workspace.morph.set_position.call(null,cljs_history.history_view,"indexMorph",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(cljs_history.diagram_width * (index / (100))),new cljs.core.Keyword(null,"y","y",-1757859776),(3)], null));
});
cljs_history.branch_morph = (function branch_morph(posX,posY,width,height,branch){return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.hash.call(null,branch),new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),posX,new cljs.core.Keyword(null,"y","y",-1757859776),posY], null),new cljs.core.Keyword(null,"onClick","onClick",-1991238530),(function (e){return cljs_history.switch_to_branch.call(null,branch);
})], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"Fill","Fill",-880021796),"green",new cljs.core.Keyword(null,"BorderColor","BorderColor",-1430586062),"darkgreen",new cljs.core.Keyword(null,"Extent","Extent",1039752349),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),width,new cljs.core.Keyword(null,"y","y",-1757859776),height], null)], null),new cljs.core.Keyword(null,"submorphs","submorphs",360747770),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs_history.history_indicator], null)], null);
});
cljs_history.add_new_branch = (function add_new_branch(branch){var new_branch_morph = cljs_history.branch_morph.call(null,(5),((5) + (cljs_history.branch_height * cljs.core.deref.call(null,cljs_history.branch_count))),(cljs_history.diagram_width - (0)),cljs_history.branch_height,branch);cljs.core.swap_BANG_.call(null,cljs_history.branch_count,cljs.core.inc);
cljs_workspace.morph.add_morph.call(null,cljs_history.history_view,"wrapper",new_branch_morph);
cljs_workspace.morph.set_extent.call(null,cljs_history.history_view,"wrapper",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),cljs_history.diagram_width,new cljs.core.Keyword(null,"y","y",-1757859776),((10) + (cljs_history.branch_height * cljs.core.deref.call(null,cljs_history.branch_count)))], null));
cljs_history.switch_to_branch.call(null,branch);
return console.log(cljs_workspace.morph.dict__GT_js.call(null,cljs.core.deref.call(null,cljs_history.history_view)));
});
cljs_history.pluralize = (function pluralize(n,w){if((n > (1)))
{return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(w)+"s");
} else
{return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(w));
}
});
cljs_history.nth_history = (function() {
var nth_history = null;
var nth_history__1 = (function (i){return nth_history.call(null,i,cljs_history.current_branch);
});
var nth_history__2 = (function (i,branch){return cljs.core.nth.call(null,cljs.core.deref.call(null,cljs.core.deref.call(null,branch).call(null,new cljs.core.Keyword(null,"coll","coll",1647737163))),i);
});
nth_history = function(i,branch){
switch(arguments.length){
case 1:
return nth_history__1.call(this,i);
case 2:
return nth_history__2.call(this,i,branch);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
nth_history.cljs$core$IFn$_invoke$arity$1 = nth_history__1;
nth_history.cljs$core$IFn$_invoke$arity$2 = nth_history__2;
return nth_history;
})()
;
cljs_history.branch_at = (function branch_at(i,n){cljs.core.prn.call(null,"Branching at ",i);
var index = i;var new_branch = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"offset-index","offset-index",-27145132),i,new cljs.core.Keyword(null,"coll","coll",1647737163),cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY),new cljs.core.Keyword(null,"parent","parent",-878878779),cljs.core.atom.call(null,cljs.core.deref.call(null,cljs_history.current_branch))], null);var coll = cljs.core.deref.call(null,cljs.core.deref.call(null,cljs_history.current_branch).call(null,new cljs.core.Keyword(null,"coll","coll",1647737163)));var vec__14694 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.vec.call(null,cljs.core.take.call(null,index,coll)),cljs.core.vec.call(null,cljs.core.drop.call(null,index,coll))], null);var pre_branch = cljs.core.nth.call(null,vec__14694,(0),null);var post_branch = cljs.core.nth.call(null,vec__14694,(1),null);var branched_branch = cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.concat.call(null,pre_branch,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"new-branch","new-branch",-613967578),new_branch,new cljs.core.Keyword(null,"old-value","old-value",862546795),cljs.core.first.call(null,post_branch)], null)], null),cljs.core.rest.call(null,post_branch)));cljs.core.reset_BANG_.call(null,cljs.core.deref.call(null,cljs_history.current_branch).call(null,new cljs.core.Keyword(null,"coll","coll",1647737163)),branched_branch);
cljs_history.add_new_branch.call(null,new_branch);
return cljs.core.reset_BANG_.call(null,cljs_history.reverted_to,(-1));
});
cljs_history.save_state = (function save_state(n){if((((100) > cljs.core.deref.call(null,cljs_history.reverted_to))) && ((cljs.core.deref.call(null,cljs_history.reverted_to) > (-1))))
{return cljs_history.branch_at.call(null,cljs.core.deref.call(null,cljs_history.reverted_to),n);
} else
{if(new cljs.core.Keyword(null,"else","else",-1508377146))
{var b = cljs.core.deref.call(null,cljs.core.deref.call(null,cljs_history.current_branch).call(null,new cljs.core.Keyword(null,"coll","coll",1647737163)));if(cljs.core._EQ_.call(null,cljs.core.last.call(null,b),n))
{} else
{cljs.core.swap_BANG_.call(null,cljs.core.deref.call(null,cljs_history.current_branch).call(null,new cljs.core.Keyword(null,"coll","coll",1647737163)),cljs.core.conj,n);
}
var c = (cljs.core.deref.call(null,cljs_history.current_branch).call(null,new cljs.core.Keyword(null,"offset-index","offset-index",-27145132)) + cljs.core.count.call(null,b));return cljs.core.prn.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c)+" Saved "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs_history.pluralize.call(null,c,"State"))));
} else
{return null;
}
}
});
cljs_history.revert_to = (function revert_to(i){cljs.core.prn.call(null,"request revert: ",i);
var index = ((cljs.core.count.call(null,cljs.core.deref.call(null,cljs.core.deref.call(null,cljs_history.current_branch).call(null,new cljs.core.Keyword(null,"coll","coll",1647737163)))) - (1)) * (i / (100)));var temp__4126__auto__ = (((index >= (1)))?cljs_history.nth_history.call(null,index):null);if(cljs.core.truth_(temp__4126__auto__))
{var state = temp__4126__auto__;cljs.core.prn.call(null,"revert to: ",index);
cljs.core.reset_BANG_.call(null,cljs_history.app_state,state);
cljs.core.reset_BANG_.call(null,cljs_history.reverted_to,i);
return cljs_history.move_indicator_to.call(null,i);
} else
{return null;
}
});
cljs_history.switch_to_branch = (function switch_to_branch(branch){cljs_history.remove_morph.call(null,cljs_history.history_view,cljs.core.hash.call(null,cljs.core.deref.call(null,cljs_history.current_branch)),"indexMorph");
cljs_workspace.morph.set_fill.call(null,cljs_history.history_view,cljs.core.hash.call(null,cljs.core.deref.call(null,cljs_history.current_branch)),"lightgrey");
cljs_workspace.morph.set_fill.call(null,cljs_history.history_view,cljs.core.hash.call(null,branch),"green");
return cljs.core.reset_BANG_.call(null,cljs_history.current_branch,branch);
});
cljs_history.history_view = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),"wrapper",new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(10),new cljs.core.Keyword(null,"y","y",-1757859776),(50)], null)], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"BorderColor","BorderColor",-1430586062),"black",new cljs.core.Keyword(null,"Extent","Extent",1039752349),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(cljs_history.diagram_width + (10)),new cljs.core.Keyword(null,"y","y",-1757859776),(cljs_history.branch_height + (10))], null)], null),new cljs.core.Keyword(null,"submorphs","submorphs",360747770),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs_history.branch_morph.call(null,(5),(5),(cljs_history.diagram_width - (0)),cljs_history.branch_height,cljs.core.deref.call(null,cljs_history.current_branch))], null)], null));
