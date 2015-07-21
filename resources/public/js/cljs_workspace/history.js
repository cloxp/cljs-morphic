// Compiled by ClojureScript 0.0-2342
goog.provide('cljs_workspace.history');
goog.require('cljs.core');
goog.require('cljs_workspace.morph');
goog.require('cljs_workspace.branch_vis');
goog.require('cljs_workspace.branch_vis');
goog.require('cljs_workspace.morph');
goog.require('cljs_workspace.morph');
goog.require('om.dom');
goog.require('om.dom');
goog.require('om.core');
goog.require('om.core');
cljs.core.enable_console_print_BANG_.call(null);
cljs_workspace.history.pluralize = (function pluralize(n,w){if((n > (1)))
{return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(w)+"s");
} else
{return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(w));
}
});
cljs_workspace.history.diagram_width = (400);
cljs_workspace.history.branch_height = (20);
cljs_workspace.history.app_state = cljs.core.atom.call(null,null);
cljs_workspace.history.init_history = (function init_history(init_state){cljs.core.reset_BANG_.call(null,cljs_workspace.history.app_state,init_state);
cljs.core.reset_BANG_.call(null,cljs.core.deref.call(null,cljs_workspace.history.current_branch).call(null,new cljs.core.Keyword(null,"data","data",-232669377)),cljs.core.deref.call(null,cljs.core.deref.call(null,cljs_workspace.history.app_history).call(null,new cljs.core.Keyword(null,"data","data",-232669377))));
return cljs_workspace.morph.add_morph.call(null,cljs_workspace.history.history_view,cljs.core.deref.call(null,cljs_workspace.history.current_branch).call(null,new cljs.core.Keyword(null,"id","id",-1388402092)),cljs_workspace.history.history_indicator);
});
cljs_workspace.history.branch_count = cljs.core.atom.call(null,(1));
cljs_workspace.history.generate_uuid = (function generate_uuid(){return cljs.core.deref.call(null,cljs_workspace.history.branch_count);
});
cljs_workspace.history.current_branch = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"Master",new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY)], null));
cljs_workspace.history.app_history = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"Master",new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.deref.call(null,cljs_workspace.history.current_branch).call(null,new cljs.core.Keyword(null,"data","data",-232669377))], null));
cljs_workspace.history.reverted_to = cljs.core.atom.call(null,(-1));
cljs_workspace.history.update_master = (function update_master(fp,new_branch_data){return null;
});
cljs_workspace.history.most_recent_state = (function most_recent_state(){var l = cljs_workspace.history.len.call(null,cljs.core.deref.call(null,cljs.core.deref.call(null,cljs_workspace.history.current_branch).call(null,new cljs.core.Keyword(null,"data","data",-232669377))));if((l > (0)))
{return cljs_workspace.history.nth_history.call(null,(l - (2)));
} else
{return null;
}
});
cljs_workspace.history.switch_to_branch = (function switch_to_branch(branch){cljs.core.prn.call(null,"old branch id: ",cljs.core.deref.call(null,cljs_workspace.history.current_branch).call(null,new cljs.core.Keyword(null,"id","id",-1388402092)));
cljs.core.prn.call(null,"new branch id: ",branch.call(null,new cljs.core.Keyword(null,"id","id",-1388402092)));
cljs_workspace.morph.remove_morph.call(null,cljs_workspace.history.history_view,cljs.core.deref.call(null,cljs_workspace.history.current_branch).call(null,new cljs.core.Keyword(null,"id","id",-1388402092)),"indexMorph");
cljs_workspace.morph.set_fill.call(null,cljs_workspace.history.history_view,cljs.core.deref.call(null,cljs_workspace.history.current_branch).call(null,new cljs.core.Keyword(null,"id","id",-1388402092)),"lightgrey");
cljs_workspace.morph.set_fill.call(null,cljs_workspace.history.history_view,branch.call(null,new cljs.core.Keyword(null,"id","id",-1388402092)),"green");
cljs_workspace.morph.add_morph.call(null,cljs_workspace.history.history_view,branch.call(null,new cljs.core.Keyword(null,"id","id",-1388402092)),cljs_workspace.history.history_indicator);
cljs.core.reset_BANG_.call(null,cljs_workspace.history.current_branch,branch);
var temp__4126__auto___9582 = cljs_workspace.history.most_recent_state.call(null);if(cljs.core.truth_(temp__4126__auto___9582))
{var s_9583 = temp__4126__auto___9582;cljs.core.reset_BANG_.call(null,cljs_workspace.history.app_state,s_9583);
} else
{}
return cljs_workspace.branch_vis.render_tree.call(null,cljs.core.deref.call(null,cljs_workspace.history.app_history),cljs.core.deref.call(null,cljs_workspace.history.current_branch),(function (branch__$1){return switch_to_branch.call(null,branch__$1);
}),(cljs_workspace.history.len.call(null,cljs.core.deref.call(null,branch.call(null,new cljs.core.Keyword(null,"data","data",-232669377)))) * (cljs_workspace.history.index / (100))));
});
cljs_workspace.history.nth_history = (function() {
var nth_history = null;
var nth_history__1 = (function (i){return nth_history.call(null,i,cljs.core.deref.call(null,cljs.core.deref.call(null,cljs_workspace.history.current_branch).call(null,new cljs.core.Keyword(null,"data","data",-232669377))));
});
var nth_history__2 = (function (i,data){if((i < (cljs.core.count.call(null,data) - (1))))
{var e = cljs.core.nth.call(null,data,i);if(cljs.core.truth_(e.call(null,new cljs.core.Keyword(null,"cont","cont",-577100214))))
{return cljs.core.first.call(null,cljs.core.deref.call(null,cljs.core.get_in.call(null,e,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cont","cont",-577100214),new cljs.core.Keyword(null,"data","data",-232669377)], null))));
} else
{return e;
}
} else
{var temp__4124__auto__ = cljs.core.get_in.call(null,cljs.core.last.call(null,data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cont","cont",-577100214),new cljs.core.Keyword(null,"data","data",-232669377)], null));if(cljs.core.truth_(temp__4124__auto__))
{var cont = temp__4124__auto__;return nth_history.call(null,(i - (cljs.core.count.call(null,data) - (1))),cljs.core.deref.call(null,cont));
} else
{return null;
}
}
});
nth_history = function(i,data){
switch(arguments.length){
case 1:
return nth_history__1.call(this,i);
case 2:
return nth_history__2.call(this,i,data);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
nth_history.cljs$core$IFn$_invoke$arity$1 = nth_history__1;
nth_history.cljs$core$IFn$_invoke$arity$2 = nth_history__2;
return nth_history;
})()
;
cljs_workspace.history.len = (function len(unrolled_list){return (((-1) + cljs.core.count.call(null,unrolled_list)) + (function (){var temp__4126__auto__ = cljs.core.last.call(null,unrolled_list);if(cljs.core.truth_(temp__4126__auto__))
{var end = temp__4126__auto__;var temp__4126__auto____$1 = cljs.core.get_in.call(null,end,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cont","cont",-577100214),new cljs.core.Keyword(null,"data","data",-232669377)], null));if(cljs.core.truth_(temp__4126__auto____$1))
{var n = temp__4126__auto____$1;return len.call(null,cljs.core.deref.call(null,n));
} else
{return null;
}
} else
{return null;
}
})());
});
cljs_workspace.history.history_indicator = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),"indexMorph",new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(cljs_workspace.history.diagram_width / (2)),new cljs.core.Keyword(null,"y","y",-1757859776),(3)], null)], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"Fill","Fill",-880021796),"lightgreen",new cljs.core.Keyword(null,"Extent","Extent",1039752349),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(4),new cljs.core.Keyword(null,"y","y",-1757859776),cljs_workspace.history.branch_height], null)], null)], null);
cljs_workspace.history.branch_morph = (function branch_morph(posX,posY,width,height,branch){return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),branch.call(null,new cljs.core.Keyword(null,"id","id",-1388402092)),new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),posX,new cljs.core.Keyword(null,"y","y",-1757859776),posY], null),new cljs.core.Keyword(null,"onClick","onClick",-1991238530),(function (this$){return cljs_workspace.history.switch_to_branch.call(null,branch);
})], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"Fill","Fill",-880021796),"green",new cljs.core.Keyword(null,"BorderColor","BorderColor",-1430586062),"darkgreen",new cljs.core.Keyword(null,"Extent","Extent",1039752349),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),width,new cljs.core.Keyword(null,"y","y",-1757859776),height], null)], null),new cljs.core.Keyword(null,"submorphs","submorphs",360747770),cljs.core.PersistentVector.EMPTY], null);
});
cljs_workspace.history.history_view = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),"wrapper",new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(10),new cljs.core.Keyword(null,"y","y",-1757859776),(50)], null)], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"BorderColor","BorderColor",-1430586062),"black",new cljs.core.Keyword(null,"Extent","Extent",1039752349),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(cljs_workspace.history.diagram_width + (10)),new cljs.core.Keyword(null,"y","y",-1757859776),(cljs_workspace.history.branch_height + (10))], null)], null),new cljs.core.Keyword(null,"submorphs","submorphs",360747770),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs_workspace.history.branch_morph.call(null,(5),(5),(cljs_workspace.history.diagram_width - (0)),cljs_workspace.history.branch_height,cljs.core.deref.call(null,cljs_workspace.history.current_branch))], null)], null));
cljs_workspace.history.history_slider = om.dom.input.call(null,{"onChange": (function (p1__9584_SHARP_){return cljs_workspace.history.revert_to.call(null,p1__9584_SHARP_.target.value);
}), "defaultValue": (100), "max": (100), "min": (0), "type": "range", "style": {"left": (5), "top": (5), "position": "absolute"}});
cljs_workspace.history.move_indicator_to = (function move_indicator_to(index){return cljs_workspace.morph.set_position.call(null,cljs_workspace.history.history_view,"indexMorph",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(cljs_workspace.history.diagram_width * (index / (100))),new cljs.core.Keyword(null,"y","y",-1757859776),(3)], null));
});
cljs_workspace.history.revert_to = (function revert_to(i){cljs.core.prn.call(null,"request revert: ",i);
var index = ((cljs_workspace.history.len.call(null,cljs.core.deref.call(null,cljs.core.deref.call(null,cljs_workspace.history.current_branch).call(null,new cljs.core.Keyword(null,"data","data",-232669377)))) - (1)) * (i / (100)));var temp__4126__auto__ = (((index >= (1)))?cljs_workspace.history.nth_history.call(null,index):null);if(cljs.core.truth_(temp__4126__auto__))
{var state = temp__4126__auto__;cljs.core.prn.call(null,"revert to: ",index);
cljs.core.reset_BANG_.call(null,cljs_workspace.history.app_state,state);
cljs.core.reset_BANG_.call(null,cljs_workspace.history.reverted_to,i);
return cljs_workspace.branch_vis.render_tree.call(null,cljs.core.deref.call(null,cljs_workspace.history.app_history),cljs.core.deref.call(null,cljs_workspace.history.current_branch),((function (state,temp__4126__auto__,index){
return (function (branch){return cljs_workspace.history.switch_to_branch.call(null,branch);
});})(state,temp__4126__auto__,index))
,index);
} else
{return null;
}
});
cljs_workspace.history.add_new_branch = (function add_new_branch(branch){var new_branch_morph_9585 = cljs_workspace.history.branch_morph.call(null,(5),((5) + (cljs_workspace.history.branch_height * (cljs.core.deref.call(null,cljs_workspace.history.branch_count) - (1)))),(cljs_workspace.history.diagram_width - (0)),cljs_workspace.history.branch_height,branch);cljs_workspace.morph.add_morph.call(null,cljs_workspace.history.history_view,"wrapper",new_branch_morph_9585);
cljs_workspace.morph.set_extent.call(null,cljs_workspace.history.history_view,"wrapper",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(cljs_workspace.history.diagram_width + (10)),new cljs.core.Keyword(null,"y","y",-1757859776),((10) + (cljs_workspace.history.branch_height * cljs.core.deref.call(null,cljs_workspace.history.branch_count)))], null));
cljs_workspace.history.switch_to_branch.call(null,branch);
return console.log(cljs_workspace.morph.dict__GT_js.call(null,cljs.core.deref.call(null,cljs_workspace.history.history_view)));
});
cljs_workspace.history.get_branch_part = (function get_branch_part(i,branch){if((i < (cljs.core.count.call(null,cljs.core.deref.call(null,branch)) - (1))))
{var e = cljs.core.nth.call(null,cljs.core.deref.call(null,branch),i);if(cljs.core.truth_(e.call(null,new cljs.core.Keyword(null,"cont","cont",-577100214))))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),cljs.core.get_in.call(null,e,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cont","cont",-577100214),new cljs.core.Keyword(null,"data","data",-232669377)], null))], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,branch], null);
}
} else
{var temp__4124__auto__ = cljs.core.get_in.call(null,cljs.core.last.call(null,cljs.core.deref.call(null,branch)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cont","cont",-577100214),new cljs.core.Keyword(null,"data","data",-232669377)], null));if(cljs.core.truth_(temp__4124__auto__))
{var cont = temp__4124__auto__;return get_branch_part.call(null,(i - (cljs.core.count.call(null,cljs.core.deref.call(null,branch)) - (1))),cont);
} else
{return cljs.core.prn.call(null,"Out of Range!");
}
}
});
cljs_workspace.history.branch_at = (function() {
var branch_at = null;
var branch_at__2 = (function (i,n){return branch_at.call(null,cljs_workspace.history.current_branch,i,n);
});
var branch_at__3 = (function (branch,i,n){cljs.core.prn.call(null,"Branching at ",i);
cljs.core.swap_BANG_.call(null,cljs_workspace.history.branch_count,cljs.core.inc);
var index = ((cljs_workspace.history.len.call(null,cljs.core.deref.call(null,cljs.core.deref.call(null,branch).call(null,new cljs.core.Keyword(null,"data","data",-232669377)))) - (1)) * (i / (100)));var vec__9587 = cljs_workspace.history.get_branch_part.call(null,index,cljs.core.deref.call(null,branch).call(null,new cljs.core.Keyword(null,"data","data",-232669377)));var rel_index = cljs.core.nth.call(null,vec__9587,(0),null);var branch_part = cljs.core.nth.call(null,vec__9587,(1),null);var new_branch = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),cljs_workspace.history.generate_uuid.call(null),new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY)], null);var pre_branch = cljs.core.vec.call(null,cljs.core.take.call(null,rel_index,cljs.core.deref.call(null,branch_part)));var post_branch = cljs.core.vec.call(null,cljs.core.drop.call(null,rel_index,cljs.core.deref.call(null,branch_part)));var branched_branch = cljs.core.conj.call(null,pre_branch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cont","cont",-577100214),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"root","root",-448657453),cljs.core.deref.call(null,branch),new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.atom.call(null,post_branch)], null),new cljs.core.Keyword(null,"fork","fork",1062974235),new_branch], null));cljs.core.reset_BANG_.call(null,branch_part,branched_branch);
cljs_workspace.history.add_new_branch.call(null,new_branch);
return cljs.core.reset_BANG_.call(null,cljs_workspace.history.reverted_to,(-1));
});
branch_at = function(branch,i,n){
switch(arguments.length){
case 2:
return branch_at__2.call(this,branch,i);
case 3:
return branch_at__3.call(this,branch,i,n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
branch_at.cljs$core$IFn$_invoke$arity$2 = branch_at__2;
branch_at.cljs$core$IFn$_invoke$arity$3 = branch_at__3;
return branch_at;
})()
;
cljs_workspace.history.append_to_branch = (function append_to_branch(branch,s){var temp__4124__auto__ = cljs.core.last.call(null,cljs.core.deref.call(null,branch));if(cljs.core.truth_(temp__4124__auto__))
{var end = temp__4124__auto__;var temp__4124__auto____$1 = cljs.core.get_in.call(null,end,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cont","cont",-577100214),new cljs.core.Keyword(null,"data","data",-232669377)], null));if(cljs.core.truth_(temp__4124__auto____$1))
{var cont = temp__4124__auto____$1;return append_to_branch.call(null,cont,s);
} else
{return cljs.core.swap_BANG_.call(null,branch,cljs.core.conj,s);
}
} else
{return cljs.core.swap_BANG_.call(null,branch,cljs.core.conj,s);
}
});
cljs_workspace.history.save_to_master = (function save_to_master(n){var master_branch = cljs_workspace.history.app_history;return cljs_workspace.history.save_state.call(null,n,master_branch);
});
cljs_workspace.history.save_state = (function() {
var save_state = null;
var save_state__1 = (function (n){return save_state.call(null,n,cljs_workspace.history.current_branch);
});
var save_state__2 = (function (n,branch){if((((100) > cljs.core.deref.call(null,cljs_workspace.history.reverted_to))) && ((cljs.core.deref.call(null,cljs_workspace.history.reverted_to) > (-1))))
{return cljs_workspace.history.branch_at.call(null,cljs.core.deref.call(null,cljs_workspace.history.reverted_to),n);
} else
{var b = cljs.core.deref.call(null,cljs.core.deref.call(null,branch).call(null,new cljs.core.Keyword(null,"data","data",-232669377)));if(cljs.core._EQ_.call(null,cljs.core.last.call(null,b),n))
{} else
{cljs_workspace.history.append_to_branch.call(null,cljs.core.deref.call(null,branch).call(null,new cljs.core.Keyword(null,"data","data",-232669377)),n);
}
var c = cljs_workspace.history.len.call(null,b);cljs_workspace.branch_vis.render_tree.call(null,cljs.core.deref.call(null,cljs_workspace.history.app_history),cljs.core.deref.call(null,branch),((function (c,b){
return (function (b__$1){return cljs_workspace.history.switch_to_branch.call(null,b__$1);
});})(c,b))
,(c * (cljs_workspace.history.index / (100))));
return cljs.core.prn.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c)+" Saved "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs_workspace.history.pluralize.call(null,c,"State"))));

}
});
save_state = function(n,branch){
switch(arguments.length){
case 1:
return save_state__1.call(this,n);
case 2:
return save_state__2.call(this,n,branch);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
save_state.cljs$core$IFn$_invoke$arity$1 = save_state__1;
save_state.cljs$core$IFn$_invoke$arity$2 = save_state__2;
return save_state;
})()
;
om.core.root.call(null,(function (app,owner){if(typeof cljs_workspace.history.t9588 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs_workspace.history.t9588 = (function (owner,app,meta9589){
this.owner = owner;
this.app = app;
this.meta9589 = meta9589;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs_workspace.history.t9588.cljs$lang$type = true;
cljs_workspace.history.t9588.cljs$lang$ctorStr = "cljs-workspace.history/t9588";
cljs_workspace.history.t9588.cljs$lang$ctorPrWriter = (function (this__4202__auto__,writer__4203__auto__,opt__4204__auto__){return cljs.core._write.call(null,writer__4203__auto__,"cljs-workspace.history/t9588");
});
cljs_workspace.history.t9588.prototype.om$core$IRender$ = true;
cljs_workspace.history.t9588.prototype.om$core$IRender$render$arity$1 = (function (this__5222__auto__){var self__ = this;
var this__5222__auto____$1 = this;return React.DOM.div(cljs.core.PersistentArrayMap.EMPTY,cljs_workspace.history.history_slider);
});
cljs_workspace.history.t9588.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_9590){var self__ = this;
var _9590__$1 = this;return self__.meta9589;
});
cljs_workspace.history.t9588.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_9590,meta9589__$1){var self__ = this;
var _9590__$1 = this;return (new cljs_workspace.history.t9588(self__.owner,self__.app,meta9589__$1));
});
cljs_workspace.history.__GT_t9588 = (function __GT_t9588(owner__$1,app__$1,meta9589){return (new cljs_workspace.history.t9588(owner__$1,app__$1,meta9589));
});
}
return (new cljs_workspace.history.t9588(owner,app,null));
}),cljs_workspace.history.history_view,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),document.getElementById("inspector")], null));
