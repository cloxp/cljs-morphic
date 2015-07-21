// Compiled by ClojureScript 0.0-2342
goog.provide('cljs_workspace.branch_vis');
goog.require('cljs.core');
goog.require('cljs_workspace.morph');
goog.require('cljs_workspace.branch_merge');
goog.require('cljs_workspace.branch_merge');
goog.require('cljs_workspace.morph');
goog.require('cljs_workspace.morph');
goog.require('om.dom');
goog.require('om.dom');
goog.require('om.core');
goog.require('om.core');
cljs.core.enable_console_print_BANG_.call(null);
cljs_workspace.branch_vis.current_branch_ref = cljs.core.atom.call(null,null);
cljs_workspace.branch_vis.branch_callback_fn = cljs.core.atom.call(null,(function (branch){return cljs.core.prn.call(null,"Clicked on me!");
}));
cljs_workspace.branch_vis.reverted_index = cljs.core.atom.call(null,(-1));
cljs_workspace.branch_vis.rendered_tree = cljs.core.atom.call(null,null);
cljs_workspace.branch_vis.highlighted_branches = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
cljs_workspace.branch_vis.history_marker = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(0),new cljs.core.Keyword(null,"y","y",-1757859776),(1)], null)], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"Fill","Fill",-880021796),"lightgreen",new cljs.core.Keyword(null,"Extent","Extent",1039752349),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(5),new cljs.core.Keyword(null,"y","y",-1757859776),(5)], null)], null)], null);
cljs_workspace.branch_vis.is_on_current = (function is_on_current(branch){if(cljs.core.truth_(cljs.core.deref.call(null,cljs_workspace.branch_vis.current_branch_ref)))
{var or__3626__auto__ = ((cljs.core.contains_QMARK_.call(null,branch,new cljs.core.Keyword(null,"id","id",-1388402092)))?cljs.core._EQ_.call(null,cljs.core.deref.call(null,cljs_workspace.branch_vis.current_branch_ref).call(null,new cljs.core.Keyword(null,"id","id",-1388402092)),branch.call(null,new cljs.core.Keyword(null,"id","id",-1388402092))):null);if(cljs.core.truth_(or__3626__auto__))
{return or__3626__auto__;
} else
{if(cljs.core.contains_QMARK_.call(null,branch,new cljs.core.Keyword(null,"root","root",-448657453)))
{return cljs.core._EQ_.call(null,cljs.core.deref.call(null,cljs_workspace.branch_vis.current_branch_ref),branch.call(null,new cljs.core.Keyword(null,"root","root",-448657453)));
} else
{return null;
}
}
} else
{return false;
}
});
cljs_workspace.branch_vis.is_master = (function is_master(branch){return (cljs.core._EQ_.call(null,"Master",cljs.core.get.call(null,branch,new cljs.core.Keyword(null,"id","id",-1388402092)))) || (cljs.core._EQ_.call(null,"Master",cljs.core.get_in.call(null,branch,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"root","root",-448657453),new cljs.core.Keyword(null,"id","id",-1388402092)], null))));
});
cljs_workspace.branch_vis.get_coloring = (function get_coloring(branch){if(cljs.core.contains_QMARK_.call(null,cljs.core.deref.call(null,cljs_workspace.branch_vis.highlighted_branches),cljs.core.hash.call(null,branch)))
{return "red";
} else
{if(cljs.core.truth_(cljs_workspace.branch_vis.is_on_current.call(null,branch)))
{return "green";
} else
{if(cljs_workspace.branch_vis.is_master.call(null,branch))
{return "blue";
} else
{return "black";
}
}
}
});
cljs_workspace.branch_vis.scale_branch_model = (function scale_branch_model(model,max_width){return model;
});
cljs_workspace.branch_vis.highlight_branch = (function highlight_branch(root,path){var temp__4126__auto__ = cljs.core.first.call(null,path);if(cljs.core.truth_(temp__4126__auto__))
{var next_step = temp__4126__auto__;var branch_part = root.call(null,next_step);cljs.core.swap_BANG_.call(null,cljs_workspace.branch_vis.highlighted_branches,cljs.core.assoc,cljs.core.hash.call(null,branch_part),true);
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,path)))
{var fp_QMARK__5883 = cljs.core.last.call(null,cljs.core.deref.call(null,branch_part.call(null,new cljs.core.Keyword(null,"data","data",-232669377))));if(cljs.core.contains_QMARK_.call(null,fp_QMARK__5883,new cljs.core.Keyword(null,"cont","cont",-577100214)))
{highlight_branch.call(null,fp_QMARK__5883,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cont","cont",-577100214)], null));
} else
{}
} else
{}
var fp = cljs.core.last.call(null,cljs.core.deref.call(null,branch_part.call(null,new cljs.core.Keyword(null,"data","data",-232669377))));return highlight_branch.call(null,fp,cljs.core.rest.call(null,path));
} else
{return null;
}
});
cljs_workspace.branch_vis.visualize_merge_candidates = (function visualize_merge_candidates(fork_point,path_to_a,path_to_b){cljs.core.prn.call(null,"highlighting: ",path_to_a," ",path_to_b);
cljs_workspace.branch_vis.highlight_branch.call(null,fork_point,path_to_a);
cljs_workspace.branch_vis.highlight_branch.call(null,fork_point,path_to_b);
return cljs_workspace.branch_vis.refresh_view.call(null);
});
cljs_workspace.branch_vis.render_stub = (function render_stub(branch,start_point){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"MorphClass","MorphClass",-645912738),"Path",new cljs.core.Keyword(null,"Position","Position",1624823324),start_point,new cljs.core.Keyword(null,"onClick","onClick",-1991238530),(function (this$){cljs.core.deref.call(null,cljs_workspace.branch_vis.branch_callback_fn).call(null,branch);
return false;
})], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"ShapeClass","ShapeClass",1004841735),"Path",new cljs.core.Keyword(null,"StrokeWidth","StrokeWidth",-953392262),(5),new cljs.core.Keyword(null,"Fill","Fill",-880021796),cljs_workspace.branch_vis.get_coloring.call(null,branch),new cljs.core.Keyword(null,"PathElements","PathElements",1090898558),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(0),new cljs.core.Keyword(null,"y","y",-1757859776),(0)], null)], null)], null),new cljs.core.Keyword(null,"submorphs","submorphs",360747770),cljs.core.PersistentVector.EMPTY], null),(20)], null);
});
cljs_workspace.branch_vis.render_bubble = (function render_bubble(origin,r,fill,branch){return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),((cljs.core.contains_QMARK_.call(null,branch,new cljs.core.Keyword(null,"id","id",-1388402092)))?branch.call(null,new cljs.core.Keyword(null,"id","id",-1388402092)):cljs.core.get_in.call(null,branch,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"root","root",-448657453),new cljs.core.Keyword(null,"id","id",-1388402092)], null))),new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"Position","Position",1624823324),origin,new cljs.core.Keyword(null,"onClick","onClick",-1991238530),(function (this$){cljs_workspace.branch_merge.select_for_merge.call(null,((cljs.core.contains_QMARK_.call(null,branch,new cljs.core.Keyword(null,"id","id",-1388402092)))?branch:branch.call(null,new cljs.core.Keyword(null,"root","root",-448657453))),(function (a,b){var vec__5885 = cljs_workspace.branch_merge.fork_point.call(null,a,b,cljs.core.deref.call(null,cljs_workspace.branch_vis.rendered_tree));var fp = cljs.core.nth.call(null,vec__5885,(0),null);var pa = cljs.core.nth.call(null,vec__5885,(1),null);var pb = cljs.core.nth.call(null,vec__5885,(2),null);return cljs_workspace.branch_vis.visualize_merge_candidates.call(null,fp,pa,pb);
}));
var fill_5886__$1 = ((cljs.core._EQ_.call(null,cljs.core.get_in.call(null,this$,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.Keyword(null,"Fill","Fill",-880021796)], null)),"red"))?(function (){cljs_workspace.morph.remove_morph.call(null,cljs_workspace.branch_vis.branch_view,this$.call(null,new cljs.core.Keyword(null,"id","id",-1388402092)),("box-"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(this$.call(null,new cljs.core.Keyword(null,"id","id",-1388402092)))));
return cljs_workspace.branch_vis.get_coloring.call(null,branch);
})():(function (){var textfield = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),("box-"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(this$.call(null,new cljs.core.Keyword(null,"id","id",-1388402092)))),new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(15),new cljs.core.Keyword(null,"y","y",-1757859776),(-3)], null),new cljs.core.Keyword(null,"MorphClass","MorphClass",-645912738),"Text",new cljs.core.Keyword(null,"TextString","TextString",-1730000367),(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(this$.call(null,new cljs.core.Keyword(null,"id","id",-1388402092))))], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ShapeClass","ShapeClass",1004841735),"Text"], null)], null);cljs_workspace.morph.add_morph.call(null,cljs_workspace.branch_vis.branch_view,this$.call(null,new cljs.core.Keyword(null,"id","id",-1388402092)),textfield);
return "red";
})());cljs_workspace.morph.set_fill.call(null,cljs_workspace.branch_vis.branch_view,this$.call(null,new cljs.core.Keyword(null,"id","id",-1388402092)),fill_5886__$1);
return false;
})], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ShapeClass","ShapeClass",1004841735),"Ellipse",new cljs.core.Keyword(null,"Extent","Extent",1039752349),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),r,new cljs.core.Keyword(null,"y","y",-1757859776),r], null),new cljs.core.Keyword(null,"Fill","Fill",-880021796),fill], null),new cljs.core.Keyword(null,"submorphs","submorphs",360747770),cljs.core.PersistentVector.EMPTY], null);
});
cljs_workspace.branch_vis.render_leaf = (function render_leaf(cont,start_point){var fill = cljs_workspace.branch_vis.get_coloring.call(null,cont);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"MorphClass","MorphClass",-645912738),"Path",new cljs.core.Keyword(null,"Position","Position",1624823324),start_point,new cljs.core.Keyword(null,"onClick","onClick",-1991238530),((function (fill){
return (function (this$){if(cljs.core.contains_QMARK_.call(null,cont,new cljs.core.Keyword(null,"root","root",-448657453)))
{var b_5887 = cont.call(null,new cljs.core.Keyword(null,"root","root",-448657453));cljs.core.deref.call(null,cljs_workspace.branch_vis.branch_callback_fn).call(null,b_5887);
} else
{var b_5888 = cont;cljs.core.deref.call(null,cljs_workspace.branch_vis.branch_callback_fn).call(null,b_5888);
}
return false;
});})(fill))
], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"ShapeClass","ShapeClass",1004841735),"Path",new cljs.core.Keyword(null,"StrokeWidth","StrokeWidth",-953392262),(5),new cljs.core.Keyword(null,"Fill","Fill",-880021796),fill,new cljs.core.Keyword(null,"PathElements","PathElements",1090898558),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(0),new cljs.core.Keyword(null,"y","y",-1757859776),(0)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.count.call(null,cljs.core.deref.call(null,cont.call(null,new cljs.core.Keyword(null,"data","data",-232669377)))),new cljs.core.Keyword(null,"y","y",-1757859776),(0)], null)], null)], null),new cljs.core.Keyword(null,"submorphs","submorphs",360747770),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs_workspace.branch_vis.render_bubble.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.count.call(null,cljs.core.deref.call(null,cont.call(null,new cljs.core.Keyword(null,"data","data",-232669377)))),new cljs.core.Keyword(null,"y","y",-1757859776),(-1)], null),(10),fill,cont)], null)], null),(20)], null);
});
cljs_workspace.branch_vis.smoothen = (function smoothen(vertices){var vec__5890 = cljs.core.take_last.call(null,(2),vertices);var middle = cljs.core.nth.call(null,vec__5890,(0),null);var end = cljs.core.nth.call(null,vec__5890,(1),null);var half_point = (end.call(null,new cljs.core.Keyword(null,"x","x",2099068185)) - middle.call(null,new cljs.core.Keyword(null,"x","x",2099068185)));var rounded_edge = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"arc","arc",252411045),new cljs.core.Keyword(null,"anchors","anchors",1699348867),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,middle,new cljs.core.Keyword(null,"y","y",-1757859776),(middle.call(null,new cljs.core.Keyword(null,"y","y",-1757859776)) - half_point)),middle,end], null)], null);return cljs.core.conj.call(null,cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.drop_last.call(null,(2),vertices)),rounded_edge);
});
cljs_workspace.branch_vis.translat = (function translat(op,p1,p2){return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),op.call(null,p1.call(null,new cljs.core.Keyword(null,"x","x",2099068185)),p2.call(null,new cljs.core.Keyword(null,"x","x",2099068185))),new cljs.core.Keyword(null,"y","y",-1757859776),op.call(null,p1.call(null,new cljs.core.Keyword(null,"y","y",-1757859776)),p2.call(null,new cljs.core.Keyword(null,"y","y",-1757859776)))], null);
});
cljs_workspace.branch_vis.create_arc = (function create_arc(start,end,fill){return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"MorphClass","MorphClass",-645912738),"Path",new cljs.core.Keyword(null,"Position","Position",1624823324),start], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"ShapeClass","ShapeClass",1004841735),"Path",new cljs.core.Keyword(null,"StrokeWidth","StrokeWidth",-953392262),(5),new cljs.core.Keyword(null,"Fill","Fill",-880021796),fill,new cljs.core.Keyword(null,"PathElements","PathElements",1090898558),cljs_workspace.branch_vis.smoothen.call(null,cljs.core.map.call(null,(function (p1__5891_SHARP_){return cljs_workspace.branch_vis.translat.call(null,cljs.core._,p1__5891_SHARP_,start);
}),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [start,cljs.core.assoc.call(null,end,new cljs.core.Keyword(null,"x","x",2099068185),start.call(null,new cljs.core.Keyword(null,"x","x",2099068185))),end], null)))], null)], null);
});
cljs_workspace.branch_vis.render_fork = (function render_fork(branch,cont,fork,start_point){var fill = cljs_workspace.branch_vis.get_coloring.call(null,branch);var end_point = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.count.call(null,cljs.core.deref.call(null,branch.call(null,new cljs.core.Keyword(null,"data","data",-232669377)))),new cljs.core.Keyword(null,"y","y",-1757859776),(0)], null);var vec__5894 = cljs_workspace.branch_vis.render_branch.call(null,cont,end_point);var cont_path = cljs.core.nth.call(null,vec__5894,(0),null);var cont_space = cljs.core.nth.call(null,vec__5894,(1),null);var fork_start_point = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(end_point.call(null,new cljs.core.Keyword(null,"x","x",2099068185)) + (10)),new cljs.core.Keyword(null,"y","y",-1757859776),cont_space], null);var vec__5895 = cljs_workspace.branch_vis.render_branch.call(null,fork,fork_start_point);var fork_path = cljs.core.nth.call(null,vec__5895,(0),null);var fork_space = cljs.core.nth.call(null,vec__5895,(1),null);var arc_path = cljs_workspace.branch_vis.create_arc.call(null,end_point,fork_start_point,cljs.core.get_in.call(null,fork_path,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.Keyword(null,"Fill","Fill",-880021796)], null)));return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"MorphClass","MorphClass",-645912738),"Path",new cljs.core.Keyword(null,"Position","Position",1624823324),start_point,new cljs.core.Keyword(null,"onClick","onClick",-1991238530),((function (fill,end_point,vec__5894,cont_path,cont_space,fork_start_point,vec__5895,fork_path,fork_space,arc_path){
return (function (this$){cljs.core.deref.call(null,cljs_workspace.branch_vis.branch_callback_fn).call(null,cont.call(null,new cljs.core.Keyword(null,"root","root",-448657453)));
return false;
});})(fill,end_point,vec__5894,cont_path,cont_space,fork_start_point,vec__5895,fork_path,fork_space,arc_path))
], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"ShapeClass","ShapeClass",1004841735),"Path",new cljs.core.Keyword(null,"StrokeWidth","StrokeWidth",-953392262),(5),new cljs.core.Keyword(null,"Fill","Fill",-880021796),fill,new cljs.core.Keyword(null,"PathElements","PathElements",1090898558),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(0),new cljs.core.Keyword(null,"y","y",-1757859776),(0)], null),end_point], null)], null),new cljs.core.Keyword(null,"submorphs","submorphs",360747770),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cont_path,arc_path,fork_path], null)], null),(cont_space + fork_space)], null);
});
cljs_workspace.branch_vis.attach_marker = (function attach_marker(branch_morph,branch){var marker = cljs.core.assoc_in.call(null,cljs_workspace.branch_vis.history_marker,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.Keyword(null,"x","x",2099068185)], null),cljs.core.deref.call(null,cljs_workspace.branch_vis.reverted_index));return cljs.core.update_in.call(null,branch_morph,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"submorphs","submorphs",360747770)], null),cljs.core.conj,marker);
});
cljs_workspace.branch_vis.render_branch = (function() {
var render_branch = null;
var render_branch__1 = (function (branch){return render_branch.call(null,branch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(0),new cljs.core.Keyword(null,"y","y",-1757859776),(0)], null));
});
var render_branch__2 = (function (branch,start_point){var vec__5897 = (function (){var temp__4124__auto__ = cljs.core.last.call(null,cljs.core.deref.call(null,branch.call(null,new cljs.core.Keyword(null,"data","data",-232669377))));if(cljs.core.truth_(temp__4124__auto__))
{var end = temp__4124__auto__;var temp__4124__auto____$1 = end.call(null,new cljs.core.Keyword(null,"cont","cont",-577100214));if(cljs.core.truth_(temp__4124__auto____$1))
{var cont = temp__4124__auto____$1;var fork = end.call(null,new cljs.core.Keyword(null,"fork","fork",1062974235));return cljs_workspace.branch_vis.render_fork.call(null,branch,cont,fork,start_point);
} else
{return cljs_workspace.branch_vis.render_leaf.call(null,branch,start_point);
}
} else
{return cljs_workspace.branch_vis.render_stub.call(null,branch,start_point);
}
})();var bm = cljs.core.nth.call(null,vec__5897,(0),null);var sp = cljs.core.nth.call(null,vec__5897,(1),null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_((function (){var and__3614__auto__ = cljs.core.contains_QMARK_.call(null,branch,new cljs.core.Keyword(null,"id","id",-1388402092));if(and__3614__auto__)
{var and__3614__auto____$1 = cljs_workspace.branch_vis.is_on_current.call(null,branch);if(cljs.core.truth_(and__3614__auto____$1))
{return (cljs.core.deref.call(null,cljs_workspace.branch_vis.reverted_index) > (0));
} else
{return and__3614__auto____$1;
}
} else
{return and__3614__auto__;
}
})())?cljs_workspace.branch_vis.attach_marker.call(null,bm,branch):bm),sp], null);
});
render_branch = function(branch,start_point){
switch(arguments.length){
case 1:
return render_branch__1.call(this,branch);
case 2:
return render_branch__2.call(this,branch,start_point);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
render_branch.cljs$core$IFn$_invoke$arity$1 = render_branch__1;
render_branch.cljs$core$IFn$_invoke$arity$2 = render_branch__2;
return render_branch;
})()
;
cljs_workspace.branch_vis.merge_button = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),"mergeButton",new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(400),new cljs.core.Keyword(null,"y","y",-1757859776),(100)], null),new cljs.core.Keyword(null,"onClick","onClick",-1991238530),(function (this$){cljs_workspace.branch_merge.merge_staged_branches.call(null,cljs.core.deref.call(null,cljs_workspace.branch_vis.rendered_tree));
cljs.core.reset_BANG_.call(null,cljs_workspace.branch_vis.highlighted_branches,cljs.core.PersistentArrayMap.EMPTY);
return cljs_workspace.branch_vis.refresh_view.call(null);
})], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"Extent","Extent",1039752349),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(55),new cljs.core.Keyword(null,"y","y",-1757859776),(20)], null),new cljs.core.Keyword(null,"BorderColor","BorderColor",-1430586062),"darkgrey",new cljs.core.Keyword(null,"Fill","Fill",-880021796),"lightgrey"], null),new cljs.core.Keyword(null,"submorphs","submorphs",360747770),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"MorphClass","MorphClass",-645912738),"Text",new cljs.core.Keyword(null,"AllowInput","AllowInput",-1697166251),false,new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(5),new cljs.core.Keyword(null,"y","y",-1757859776),(5)], null),new cljs.core.Keyword(null,"TextString","TextString",-1730000367),"Merge"], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ShapeClass","ShapeClass",1004841735),"Text"], null)], null)], null)], null);
cljs_workspace.branch_vis.cancel_button = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),"cancelButton",new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(470),new cljs.core.Keyword(null,"y","y",-1757859776),(100)], null),new cljs.core.Keyword(null,"onClick","onClick",-1991238530),(function (this$){cljs_workspace.branch_merge.unstage_branches.call(null);
cljs.core.reset_BANG_.call(null,cljs_workspace.branch_vis.highlighted_branches,cljs.core.PersistentArrayMap.EMPTY);
return cljs_workspace.branch_vis.refresh_view.call(null);
})], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"Extent","Extent",1039752349),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(55),new cljs.core.Keyword(null,"y","y",-1757859776),(20)], null),new cljs.core.Keyword(null,"BorderColor","BorderColor",-1430586062),"darkgrey",new cljs.core.Keyword(null,"Fill","Fill",-880021796),"lightgrey"], null),new cljs.core.Keyword(null,"submorphs","submorphs",360747770),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"MorphClass","MorphClass",-645912738),"Text",new cljs.core.Keyword(null,"AllowInput","AllowInput",-1697166251),false,new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(5),new cljs.core.Keyword(null,"y","y",-1757859776),(5)], null),new cljs.core.Keyword(null,"TextString","TextString",-1730000367),"Cancel"], null),new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ShapeClass","ShapeClass",1004841735),"Text"], null)], null)], null)], null);
cljs_workspace.branch_vis.refresh_view = (function refresh_view(){var vec__5899 = cljs_workspace.branch_vis.render_branch.call(null,cljs.core.deref.call(null,cljs_workspace.branch_vis.rendered_tree));var model = cljs.core.nth.call(null,vec__5899,(0),null);var _ = cljs.core.nth.call(null,vec__5899,(1),null);return cljs.core.swap_BANG_.call(null,cljs_workspace.branch_vis.branch_view,cljs.core.assoc,new cljs.core.Keyword(null,"submorphs","submorphs",360747770),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs_workspace.branch_vis.merge_button,cljs_workspace.branch_vis.cancel_button,cljs_workspace.branch_vis.scale_branch_model.call(null,model,(400))], null));
});
cljs_workspace.branch_vis.render_tree = (function render_tree(tree,branch,branch_callback,reverted){if(cljs.core.not_EQ_.call(null,cljs.core.deref.call(null,cljs_workspace.branch_vis.current_branch_ref),branch))
{cljs.core.prn.call(null,"have to recolor!");
} else
{}
cljs.core.reset_BANG_.call(null,cljs_workspace.branch_vis.rendered_tree,tree);
cljs.core.reset_BANG_.call(null,cljs_workspace.branch_vis.current_branch_ref,branch);
cljs.core.reset_BANG_.call(null,cljs_workspace.branch_vis.branch_callback_fn,branch_callback);
cljs.core.reset_BANG_.call(null,cljs_workspace.branch_vis.reverted_index,reverted);
return cljs_workspace.branch_vis.refresh_view.call(null);
});
cljs_workspace.branch_vis.branch_view = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),"branchView",new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"Extent","Extent",1039752349),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(400),new cljs.core.Keyword(null,"y","y",-1757859776),(100)], null)], null),new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(50),new cljs.core.Keyword(null,"y","y",-1757859776),(50)], null),new cljs.core.Keyword(null,"isDraggable","isDraggable",-181233715),true], null),new cljs.core.Keyword(null,"submorphs","submorphs",360747770),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs_workspace.branch_vis.merge_button,cljs_workspace.branch_vis.cancel_button], null)], null));
om.core.root.call(null,(function (app,owner){if(typeof cljs_workspace.branch_vis.t5900 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs_workspace.branch_vis.t5900 = (function (owner,app,meta5901){
this.owner = owner;
this.app = app;
this.meta5901 = meta5901;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs_workspace.branch_vis.t5900.cljs$lang$type = true;
cljs_workspace.branch_vis.t5900.cljs$lang$ctorStr = "cljs-workspace.branch-vis/t5900";
cljs_workspace.branch_vis.t5900.cljs$lang$ctorPrWriter = (function (this__4202__auto__,writer__4203__auto__,opt__4204__auto__){return cljs.core._write.call(null,writer__4203__auto__,"cljs-workspace.branch-vis/t5900");
});
cljs_workspace.branch_vis.t5900.prototype.om$core$IRender$ = true;
cljs_workspace.branch_vis.t5900.prototype.om$core$IRender$render$arity$1 = (function (this__5222__auto__){var self__ = this;
var this__5222__auto____$1 = this;return React.DOM.div(cljs.core.PersistentArrayMap.EMPTY,om.core.build.call(null,cljs_workspace.morph.morph,self__.app));
});
cljs_workspace.branch_vis.t5900.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_5902){var self__ = this;
var _5902__$1 = this;return self__.meta5901;
});
cljs_workspace.branch_vis.t5900.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_5902,meta5901__$1){var self__ = this;
var _5902__$1 = this;return (new cljs_workspace.branch_vis.t5900(self__.owner,self__.app,meta5901__$1));
});
cljs_workspace.branch_vis.__GT_t5900 = (function __GT_t5900(owner__$1,app__$1,meta5901){return (new cljs_workspace.branch_vis.t5900(owner__$1,app__$1,meta5901));
});
}
return (new cljs_workspace.branch_vis.t5900(owner,app,null));
}),cljs_workspace.branch_vis.branch_view,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),document.getElementById("branch")], null));
