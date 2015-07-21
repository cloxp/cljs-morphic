// Compiled by ClojureScript 0.0-2342
goog.provide('cljs_workspace.draggable');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('om.dom');
goog.require('goog.style');
goog.require('goog.events.EventType');
goog.require('cljs.core.async');
goog.require('om.dom');
goog.require('cljs.core.async');
goog.require('goog.events.EventType');
goog.require('goog.events');
goog.require('om.core');
goog.require('om.core');
goog.require('goog.style');
goog.require('goog.events');
cljs_workspace.draggable.clicked_morph = cljs.core.atom.call(null,null);
cljs_workspace.draggable.prev_cursor_pos = cljs.core.atom.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0)], null));
cljs_workspace.draggable.listen = (function listen(el,type){var out = cljs.core.async.chan.call(null);goog.events.listen(el,type,((function (out){
return (function (p1__9567_SHARP_){return cljs.core.async.put_BANG_.call(null,out,p1__9567_SHARP_);
});})(out))
);
return out;
});
cljs_workspace.draggable.element_offset = (function element_offset(el){var offset = goog.style.getPageOffset(el);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [offset.x,offset.y], null);
});
cljs_workspace.draggable.location = (function location__$1(e){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e.clientX,e.clientY], null);
});
cljs_workspace.draggable.drag = (function drag(e,app,offset){var old_pos = cljs.core.get_in.call(null,cljs.core.deref.call(null,app),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.Keyword(null,"Position","Position",1624823324)], null));var vec__9571 = cljs.core.deref.call(null,cljs_workspace.draggable.prev_cursor_pos);var prev_cursor_x = cljs.core.nth.call(null,vec__9571,(0),null);var prev_cursor_y = cljs.core.nth.call(null,vec__9571,(1),null);var vec__9572 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(e.clientX - prev_cursor_x),(e.clientY - prev_cursor_y)], null);var delta_x = cljs.core.nth.call(null,vec__9572,(0),null);var delta_y = cljs.core.nth.call(null,vec__9572,(1),null);var vec__9573 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(old_pos.call(null,new cljs.core.Keyword(null,"x","x",2099068185)) + delta_x),(old_pos.call(null,new cljs.core.Keyword(null,"y","y",-1757859776)) + delta_y)], null);var new_pos_x = cljs.core.nth.call(null,vec__9573,(0),null);var new_pos_y = cljs.core.nth.call(null,vec__9573,(1),null);if(cljs.core.truth_((function (){var and__3614__auto__ = cljs.core._EQ_.call(null,cljs.core.deref.call(null,app).call(null,new cljs.core.Keyword(null,"id","id",-1388402092)),cljs.core.deref.call(null,cljs_workspace.draggable.clicked_morph));if(and__3614__auto__)
{return cljs.core.get_in.call(null,cljs.core.deref.call(null,app),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.Keyword(null,"isDraggable","isDraggable",-181233715)], null));
} else
{return and__3614__auto__;
}
})()))
{cljs.core.swap_BANG_.call(null,cljs_workspace.draggable.prev_cursor_pos,((function (old_pos,vec__9571,prev_cursor_x,prev_cursor_y,vec__9572,delta_x,delta_y,vec__9573,new_pos_x,new_pos_y){
return (function (){return cljs.core.identity.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e.clientX,e.clientY], null));
});})(old_pos,vec__9571,prev_cursor_x,prev_cursor_y,vec__9572,delta_x,delta_y,vec__9573,new_pos_x,new_pos_y))
);
return om.core.update_BANG_.call(null,app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.Keyword(null,"Position","Position",1624823324)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),new_pos_x,new cljs.core.Keyword(null,"y","y",-1757859776),new_pos_y], null),new cljs.core.Keyword(null,"update","update",1045576396));
} else
{return null;
}
});
cljs_workspace.draggable.stop_dragging = (function stop_dragging(e,app){cljs.core.swap_BANG_.call(null,cljs_workspace.draggable.clicked_morph,(function (){return cljs.core.identity.call(null,null);
}));
var G__9576 = window;goog.events.unlisten(G__9576,goog.events.EventType.MOUSEUP,stop_dragging);
goog.events.unlisten(G__9576,goog.events.EventType.MOUSEMOVE,((function (G__9576){
return (function (p1__9574_SHARP_){return cljs_workspace.draggable.drag.call(null,p1__9574_SHARP_,app,null);
});})(G__9576))
);
return G__9576;
});
cljs_workspace.draggable.start_dragging = (function start_dragging(e,app,owner){cljs.core.swap_BANG_.call(null,cljs_workspace.draggable.prev_cursor_pos,(function (){return cljs.core.identity.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e.clientX,e.clientY], null));
}));
if(cljs.core.not.call(null,cljs.core.deref.call(null,cljs_workspace.draggable.clicked_morph)))
{cljs.core.swap_BANG_.call(null,cljs_workspace.draggable.clicked_morph,(function (){return cljs.core.deref.call(null,app).call(null,new cljs.core.Keyword(null,"id","id",-1388402092));
}));
} else
{}
var vec__9580 = cljs_workspace.draggable.element_offset.call(null,om.core.get_node.call(null,owner));var offset_x = cljs.core.nth.call(null,vec__9580,(0),null);var offset_y = cljs.core.nth.call(null,vec__9580,(1),null);var G__9581 = window;goog.events.listen(G__9581,goog.events.EventType.MOUSEUP,cljs_workspace.draggable.stop_dragging);
goog.events.listen(G__9581,goog.events.EventType.MOUSEMOVE,((function (G__9581,vec__9580,offset_x,offset_y){
return (function (p1__9577_SHARP_){return cljs_workspace.draggable.drag.call(null,p1__9577_SHARP_,app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [offset_x,offset_y], null));
});})(G__9581,vec__9580,offset_x,offset_y))
);
return G__9581;
});
