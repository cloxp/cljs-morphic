// Compiled by ClojureScript 0.0-2342
goog.provide('cljs_workspace.branch_merge');
goog.require('cljs.core');
goog.require('om.dom');
goog.require('om.dom');
goog.require('om.core');
goog.require('om.core');
cljs_workspace.branch_merge.preserve_list = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
cljs_workspace.branch_merge.merge_candidate = cljs.core.atom.call(null,null);
cljs_workspace.branch_merge.staged_for_merge = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"from","from",1815293044),null,new cljs.core.Keyword(null,"into","into",-150836029),null], null));
cljs_workspace.branch_merge.merge_callback = cljs.core.atom.call(null,(function (branch){return false;
}));
cljs_workspace.branch_merge.merge_state = (function merge_state(local_state,remote_state){var merged = cljs.core.merge.call(null,local_state,remote_state);return cljs.core.reduce.call(null,((function (merged){
return (function (state,path){return cljs.core.assoc_in.call(null,state,path,cljs.core.get_in.call(null,local_state,path));
});})(merged))
,merged,cljs.core.keys.call(null,cljs.core.deref.call(null,cljs_workspace.branch_merge.preserve_list)));
});
cljs_workspace.branch_merge.reachable_from = (function reachable_from(fp,branch){if(!(cljs.core.contains_QMARK_.call(null,fp,new cljs.core.Keyword(null,"fork","fork",1062974235))))
{return null;
} else
{if(cljs.core._EQ_.call(null,cljs.core.get_in.call(null,fp,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cont","cont",-577100214),new cljs.core.Keyword(null,"root","root",-448657453)], null)),branch))
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cont","cont",-577100214)], null);
} else
{if(cljs.core._EQ_.call(null,fp.call(null,new cljs.core.Keyword(null,"fork","fork",1062974235)),branch))
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"fork","fork",1062974235)], null);
} else
{var temp__4124__auto__ = reachable_from.call(null,cljs.core.last.call(null,cljs.core.deref.call(null,cljs.core.get_in.call(null,fp,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"fork","fork",1062974235),new cljs.core.Keyword(null,"data","data",-232669377)], null)))),branch);if(cljs.core.truth_(temp__4124__auto__))
{var path = temp__4124__auto__;return cljs.core.apply.call(null,cljs.core.conj,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"fork","fork",1062974235)], null),path);
} else
{var temp__4124__auto____$1 = reachable_from.call(null,cljs.core.last.call(null,cljs.core.deref.call(null,cljs.core.get_in.call(null,fp,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cont","cont",-577100214),new cljs.core.Keyword(null,"data","data",-232669377)], null)))),branch);if(cljs.core.truth_(temp__4124__auto____$1))
{var path = temp__4124__auto____$1;return cljs.core.apply.call(null,cljs.core.conj,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cont","cont",-577100214)], null),path);
} else
{return null;
}
}
}
}
}
});
cljs_workspace.branch_merge.depth_search_fork_point = (function depth_search_fork_point(a,b,root_branch){var fork_point = cljs.core.last.call(null,cljs.core.deref.call(null,root_branch.call(null,new cljs.core.Keyword(null,"data","data",-232669377))));if(cljs.core.contains_QMARK_.call(null,fork_point,new cljs.core.Keyword(null,"cont","cont",-577100214)))
{var temp__4124__auto__ = depth_search_fork_point.call(null,a,b,fork_point.call(null,new cljs.core.Keyword(null,"cont","cont",-577100214)));if(cljs.core.truth_(temp__4124__auto__))
{var cont_reachable = temp__4124__auto__;return cont_reachable;
} else
{var temp__4124__auto____$1 = depth_search_fork_point.call(null,a,b,fork_point.call(null,new cljs.core.Keyword(null,"fork","fork",1062974235)));if(cljs.core.truth_(temp__4124__auto____$1))
{var fork_reachable = temp__4124__auto____$1;return fork_reachable;
} else
{var path_to_a = cljs_workspace.branch_merge.reachable_from.call(null,fork_point,a);var path_to_b = cljs_workspace.branch_merge.reachable_from.call(null,fork_point,b);if(cljs.core.truth_((function (){var and__3614__auto__ = path_to_a;if(cljs.core.truth_(and__3614__auto__))
{return path_to_b;
} else
{return and__3614__auto__;
}
})()))
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [fork_point,path_to_a,path_to_b], null);
} else
{return null;
}
}
}
} else
{return null;
}
});
cljs_workspace.branch_merge.fork_point = (function fork_point(a,b,root_branch){var temp__4124__auto__ = cljs_workspace.branch_merge.depth_search_fork_point.call(null,a,b,root_branch);if(cljs.core.truth_(temp__4124__auto__))
{var res = temp__4124__auto__;return res;
} else
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [root_branch,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentVector.EMPTY], null);
}
});
cljs_workspace.branch_merge.extract_branch = (function extract_branch(start_fp,path){if(cljs.core.empty_QMARK_.call(null,path))
{if(cljs.core.contains_QMARK_.call(null,start_fp,new cljs.core.Keyword(null,"cont","cont",-577100214)))
{return extract_branch.call(null,start_fp,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cont","cont",-577100214)], null));
} else
{return cljs.core.PersistentVector.EMPTY;
}
} else
{var next_attr = cljs.core.first.call(null,path);var data = cljs.core.deref.call(null,cljs.core.get_in.call(null,start_fp,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [next_attr,new cljs.core.Keyword(null,"data","data",-232669377)], null)));return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.concat.call(null,cljs.core.butlast.call(null,data),extract_branch.call(null,cljs.core.last.call(null,data),cljs.core.rest.call(null,path))));
}
});
cljs_workspace.branch_merge.merge_streams = (function merge_streams(s1,s2){return cljs.core.map.call(null,cljs_workspace.branch_merge.merge_state,cljs.core.concat.call(null,s1,cljs.core.repeat.call(null,cljs.core.last.call(null,s1))),s2);
});
cljs_workspace.branch_merge.merge_from_flattened = (function merge_from_flattened(branch,flat_data){var local_data = cljs.core.deref.call(null,branch.call(null,new cljs.core.Keyword(null,"data","data",-232669377)));var flat_data__$1 = (((cljs.core.count.call(null,local_data) > cljs.core.count.call(null,flat_data)))?cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.concat.call(null,flat_data,cljs.core.repeat.call(null,(cljs.core.count.call(null,local_data) - cljs.core.count.call(null,flat_data)),cljs.core.last.call(null,flat_data)))):flat_data);var result = (function (){var temp__4124__auto__ = cljs.core.last.call(null,local_data);if(cljs.core.truth_(temp__4124__auto__))
{var last_entry = temp__4124__auto__;if(cljs.core.contains_QMARK_.call(null,last_entry,new cljs.core.Keyword(null,"cont","cont",-577100214)))
{var merged_part = cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.map.call(null,cljs_workspace.branch_merge.merge_state,cljs.core.butlast.call(null,local_data),flat_data__$1));var cont = merge_from_flattened.call(null,last_entry.call(null,new cljs.core.Keyword(null,"cont","cont",-577100214)),cljs.core.drop.call(null,cljs.core.count.call(null,local_data),flat_data__$1));var fork = merge_from_flattened.call(null,last_entry.call(null,new cljs.core.Keyword(null,"fork","fork",1062974235)),cljs.core.drop.call(null,cljs.core.count.call(null,local_data),flat_data__$1));return cljs.core.conj.call(null,merged_part,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cont","cont",-577100214),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"root","root",-448657453),cljs.core.get_in.call(null,last_entry,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cont","cont",-577100214),new cljs.core.Keyword(null,"root","root",-448657453)], null)),new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.atom.call(null,cont)], null),new cljs.core.Keyword(null,"fork","fork",1062974235),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.get_in.call(null,last_entry,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"fork","fork",1062974235),new cljs.core.Keyword(null,"id","id",-1388402092)], null)),new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.atom.call(null,fork)], null)], null));
} else
{return cljs_workspace.branch_merge.merge_streams.call(null,local_data,flat_data__$1);
}
} else
{return cljs.core.map.call(null,cljs_workspace.branch_merge.merge_state,cljs.core.repeat.call(null,cljs.core.PersistentArrayMap.EMPTY),flat_data__$1);
}
})();return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,result);
});
cljs_workspace.branch_merge.merge_branches = (function merge_branches(remote_branch,local_branch,root_branch){cljs.core.prn.call(null,"Merging Branch ",remote_branch.call(null,new cljs.core.Keyword(null,"id","id",-1388402092))," into ",local_branch.call(null,new cljs.core.Keyword(null,"id","id",-1388402092)));
var vec__5880 = cljs_workspace.branch_merge.fork_point.call(null,remote_branch,local_branch,root_branch);var fp = cljs.core.nth.call(null,vec__5880,(0),null);var remote_path = cljs.core.nth.call(null,vec__5880,(1),null);var local_path = cljs.core.nth.call(null,vec__5880,(2),null);var remote = cljs_workspace.branch_merge.extract_branch.call(null,fp,remote_path);var local = fp.call(null,cljs.core.first.call(null,local_path));var merged_branch = cljs_workspace.branch_merge.merge_from_flattened.call(null,local,remote);cljs.core.reset_BANG_.call(null,local.call(null,new cljs.core.Keyword(null,"data","data",-232669377)),merged_branch);
return cljs.core.deref.call(null,cljs_workspace.branch_merge.merge_callback).call(null,local);
});
cljs_workspace.branch_merge.select_for_merge = (function select_for_merge(branch,cbk){cljs.core.prn.call(null,"select for merge: ",cbk);
if(cljs.core._EQ_.call(null,cljs.core.deref.call(null,cljs_workspace.branch_merge.merge_candidate),branch))
{return cljs.core.reset_BANG_.call(null,cljs_workspace.branch_merge.merge_candidate,null);
} else
{if(cljs.core.truth_(cljs.core.deref.call(null,cljs_workspace.branch_merge.merge_candidate)))
{cljs.core.reset_BANG_.call(null,cljs_workspace.branch_merge.staged_for_merge,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"from","from",1815293044),cljs.core.deref.call(null,cljs_workspace.branch_merge.merge_candidate),new cljs.core.Keyword(null,"into","into",-150836029),branch], null));
cbk.call(null,cljs.core.deref.call(null,cljs_workspace.branch_merge.merge_candidate),branch);
return cljs.core.reset_BANG_.call(null,cljs_workspace.branch_merge.merge_candidate,null);
} else
{return cljs.core.reset_BANG_.call(null,cljs_workspace.branch_merge.merge_candidate,branch);
}
}
});
cljs_workspace.branch_merge.unstage_branches = (function unstage_branches(){cljs.core.reset_BANG_.call(null,cljs_workspace.branch_merge.merge_candidate,null);
return cljs.core.reset_BANG_.call(null,cljs_workspace.branch_merge.staged_for_merge,cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"from","from",1815293044),null,new cljs.core.Keyword(null,"into","into",-150836029),null], null)));
});
cljs_workspace.branch_merge.merge_staged_branches = (function merge_staged_branches(root_branch){var map__5882 = cljs.core.deref.call(null,cljs_workspace.branch_merge.staged_for_merge);var map__5882__$1 = ((cljs.core.seq_QMARK_.call(null,map__5882))?cljs.core.apply.call(null,cljs.core.hash_map,map__5882):map__5882);var into = cljs.core.get.call(null,map__5882__$1,new cljs.core.Keyword(null,"into","into",-150836029));var from = cljs.core.get.call(null,map__5882__$1,new cljs.core.Keyword(null,"from","from",1815293044));return cljs_workspace.branch_merge.merge_branches.call(null,from,into,root_branch);
});
cljs_workspace.branch_merge.toggle_preserve = (function toggle_preserve(morph_path){if(cljs.core.contains_QMARK_.call(null,cljs.core.deref.call(null,cljs_workspace.branch_merge.preserve_list),morph_path))
{cljs.core.swap_BANG_.call(null,cljs_workspace.branch_merge.preserve_list,cljs.core.dissoc,morph_path);
} else
{cljs.core.swap_BANG_.call(null,cljs_workspace.branch_merge.preserve_list,cljs.core.assoc,morph_path,true);
}
return cljs.core.prn.call(null,"PRESERVING: ",cljs.core.deref.call(null,cljs_workspace.branch_merge.preserve_list));
});
