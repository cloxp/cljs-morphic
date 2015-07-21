// Compiled by ClojureScript 0.0-2342
goog.provide('cljs_workspace.morph');
goog.require('cljs.core');
goog.require('cljs_workspace.draggable');
goog.require('cljs.core.async');
goog.require('cljs_workspace.branch_merge');
goog.require('goog.dom');
goog.require('om.dom');
goog.require('cljs_workspace.draggable');
goog.require('goog.style');
goog.require('goog.events.EventType');
goog.require('cljs.core.async');
goog.require('om.dom');
goog.require('cljs.core.async');
goog.require('goog.events.EventType');
goog.require('goog.events');
goog.require('goog.dom');
goog.require('cljs_workspace.branch_merge');
goog.require('om.core');
goog.require('om.core');
goog.require('goog.style');
goog.require('cljs_workspace.draggable');
goog.require('goog.events');
cljs.core.enable_console_print_BANG_.call(null);
cljs_workspace.morph.right_click_behavior = cljs.core.atom.call(null,(function (e,state){return cljs.core.prn.call(null,"No Right Click Behavior!");
}));
cljs_workspace.morph.right_click_event = cljs.core.atom.call(null,null);
cljs_workspace.morph.not_yet_handled = (function not_yet_handled(event){if(cljs.core._EQ_.call(null,cljs.core.deref.call(null,cljs_workspace.morph.right_click_event),event.timeStamp))
{return false;
} else
{cljs.core.reset_BANG_.call(null,cljs_workspace.morph.right_click_event,event.timeStamp);
cljs.core.prn.call(null,event.timeStamp," ... was not yet handled!");
return true;
}
});
cljs_workspace.morph.get_fill_css = (function get_fill_css(value){return new cljs.core.PersistentArrayMap(null, 1, ["background",value], null);
});
cljs_workspace.morph.get_position_css = (function get_position_css(value){return new cljs.core.PersistentArrayMap(null, 3, ["position","absolute","left",new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(value),"top",new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(value)], null);
});
cljs_workspace.morph.get_extent_css = (function get_extent_css(value){return new cljs.core.PersistentArrayMap(null, 2, ["height",new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(value),"width",new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(value)], null);
});
cljs_workspace.morph.get_border_width_css = (function get_border_width_css(value){return new cljs.core.PersistentArrayMap(null, 2, ["border-width",value,"border-style","solid"], null);
});
cljs_workspace.morph.get_border_color_css = (function get_border_color_css(value){return new cljs.core.PersistentArrayMap(null, 2, ["border-color",value,"border-style","solid"], null);
});
cljs_workspace.morph.dict__GT_js = (function dict__GT_js(dict){return cljs.core.apply.call(null,cljs.core.js_obj,cljs.core.apply.call(null,cljs.core.concat,cljs.core.seq.call(null,dict)));
});
cljs_workspace.morph.extract_style = (function extract_style(state){return cljs.core.apply.call(null,cljs.core.merge,cljs.core.map.call(null,(function (p__9594){var vec__9595 = p__9594;var prop = cljs.core.nth.call(null,vec__9595,(0),null);var value = cljs.core.nth.call(null,vec__9595,(1),null);var G__9596 = (((prop instanceof cljs.core.Keyword))?prop.fqn:null);switch (G__9596) {
case "BorderColor":
return cljs_workspace.morph.get_border_color_css.call(null,value);

break;
case "BorderWidth":
return cljs_workspace.morph.get_border_width_css.call(null,value);

break;
case "Extent":
return cljs_workspace.morph.get_extent_css.call(null,value);

break;
case "Position":
return cljs_workspace.morph.get_position_css.call(null,value);

break;
case "Fill":
return cljs_workspace.morph.get_fill_css.call(null,value);

break;
default:
return null;

}
}),state));
});
cljs_workspace.morph.shape = (function (){var method_table__4505__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__4506__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__4507__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__4508__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__4509__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("shape",((function (method_table__4505__auto__,prefer_table__4506__auto__,method_cache__4507__auto__,cached_hierarchy__4508__auto__,hierarchy__4509__auto__){
return (function (app,owner){return cljs.core.get_in.call(null,app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.Keyword(null,"ShapeClass","ShapeClass",1004841735)], null));
});})(method_table__4505__auto__,prefer_table__4506__auto__,method_cache__4507__auto__,cached_hierarchy__4508__auto__,hierarchy__4509__auto__))
,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4509__auto__,method_table__4505__auto__,prefer_table__4506__auto__,method_cache__4507__auto__,cached_hierarchy__4508__auto__));
})();
cljs_workspace.morph.morph = (function (){var method_table__4505__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__4506__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__4507__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__4508__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__4509__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("morph",((function (method_table__4505__auto__,prefer_table__4506__auto__,method_cache__4507__auto__,cached_hierarchy__4508__auto__,hierarchy__4509__auto__){
return (function (app,owner){return cljs.core.get_in.call(null,app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.Keyword(null,"MorphClass","MorphClass",-645912738)], null));
});})(method_table__4505__auto__,prefer_table__4506__auto__,method_cache__4507__auto__,cached_hierarchy__4508__auto__,hierarchy__4509__auto__))
,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4509__auto__,method_table__4505__auto__,prefer_table__4506__auto__,method_cache__4507__auto__,cached_hierarchy__4508__auto__));
})();
cljs_workspace.morph.render_submorphs = (function render_submorphs(app){return React.DOM.div({"className": "originNode"},cljs.core.apply.call(null,om.dom.div,null,om.core.build_all.call(null,cljs_workspace.morph.morph,new cljs.core.Keyword(null,"submorphs","submorphs",360747770).cljs$core$IFn$_invoke$arity$1(app))));
});
cljs_workspace.morph.find_morph_path = (function() {
var find_morph_path = null;
var find_morph_path__2 = (function (morph_model,id){if(cljs.core.contains_QMARK_.call(null,morph_model,new cljs.core.Keyword(null,"coll","coll",1647737163)))
{return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"coll","coll",1647737163)], null),find_morph_path.call(null,morph_model.call(null,new cljs.core.Keyword(null,"coll","coll",1647737163)),id,cljs.core.PersistentVector.EMPTY));
} else
{return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,find_morph_path.call(null,morph_model,id,cljs.core.PersistentVector.EMPTY));
}
});
var find_morph_path__3 = (function (morph_model,id,path){var temp__4126__auto__ = cljs.core.get_in.call(null,morph_model,path);if(cljs.core.truth_(temp__4126__auto__))
{var submorph = temp__4126__auto__;if((id === submorph.call(null,new cljs.core.Keyword(null,"id","id",-1388402092))))
{return path;
} else
{var temp__4124__auto__ = submorph.call(null,new cljs.core.Keyword(null,"submorphs","submorphs",360747770));if(cljs.core.truth_(temp__4124__auto__))
{var submorphs = temp__4124__auto__;return cljs.core.some.call(null,((function (submorphs,temp__4124__auto__,submorph,temp__4126__auto__){
return (function (p1__9598_SHARP_){return find_morph_path.call(null,morph_model,id,cljs.core.concat.call(null,path,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"submorphs","submorphs",360747770),p1__9598_SHARP_], null)));
});})(submorphs,temp__4124__auto__,submorph,temp__4126__auto__))
,cljs.core.range.call(null,cljs.core.count.call(null,submorphs)));
} else
{return null;
}
}
} else
{return null;
}
});
find_morph_path = function(morph_model,id,path){
switch(arguments.length){
case 2:
return find_morph_path__2.call(this,morph_model,id);
case 3:
return find_morph_path__3.call(this,morph_model,id,path);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
find_morph_path.cljs$core$IFn$_invoke$arity$2 = find_morph_path__2;
find_morph_path.cljs$core$IFn$_invoke$arity$3 = find_morph_path__3;
return find_morph_path;
})()
;
cljs_workspace.morph.get_prop_path = (function get_prop_path(model,id,attrPath){return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.concat.call(null,cljs_workspace.morph.find_morph_path.call(null,cljs.core.deref.call(null,model),id),attrPath));
});
cljs_workspace.morph.set_position = (function set_position(model,id,pos){var prop_path = cljs_workspace.morph.get_prop_path.call(null,model,id,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.Keyword(null,"Position","Position",1624823324)], null));return cljs.core.swap_BANG_.call(null,model,cljs.core.assoc_in,prop_path,pos);
});
cljs_workspace.morph.add_morph = (function add_morph(model,id,morph){var prop_path = cljs_workspace.morph.get_prop_path.call(null,model,id,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"submorphs","submorphs",360747770)], null));var submorphs = cljs.core.get_in.call(null,cljs.core.deref.call(null,model),prop_path);return cljs.core.swap_BANG_.call(null,model,cljs.core.assoc_in,prop_path,cljs.core.conj.call(null,submorphs,morph));
});
cljs_workspace.morph.remove_morph = (function remove_morph(model,id,morph_id){var prop_path = cljs_workspace.morph.get_prop_path.call(null,model,id,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"submorphs","submorphs",360747770)], null));var submorphs = cljs.core.get_in.call(null,cljs.core.deref.call(null,model),prop_path);return cljs.core.swap_BANG_.call(null,model,cljs.core.assoc_in,prop_path,cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.filter.call(null,((function (prop_path,submorphs){
return (function (p1__9599_SHARP_){return cljs.core.not_EQ_.call(null,p1__9599_SHARP_.call(null,new cljs.core.Keyword(null,"id","id",-1388402092)),morph_id);
});})(prop_path,submorphs))
,submorphs)));
});
cljs_workspace.morph.set_fill = (function set_fill(model,id,color){var prop_path = cljs_workspace.morph.get_prop_path.call(null,model,id,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.Keyword(null,"Fill","Fill",-880021796)], null));return cljs.core.swap_BANG_.call(null,model,cljs.core.assoc_in,prop_path,color);
});
cljs_workspace.morph.set_extent = (function set_extent(model,id,extent){var prop_path = cljs_workspace.morph.get_prop_path.call(null,model,id,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.Keyword(null,"Extent","Extent",1039752349)], null));return cljs.core.swap_BANG_.call(null,model,cljs.core.assoc_in,prop_path,extent);
});
cljs_workspace.morph.set_border_color = (function set_border_color(model,id,fill){var prop_path = cljs_workspace.morph.get_prop_path.call(null,model,id,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.Keyword(null,"BorderColor","BorderColor",-1430586062)], null));return cljs.core.swap_BANG_.call(null,model,cljs.core.assoc_in,prop_path,fill);
});
cljs_workspace.morph.toggle_halo = (function toggle_halo(model,id){var prop_path = cljs_workspace.morph.get_prop_path.call(null,model,id,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.Keyword(null,"Halo","Halo",623226868)], null));cljs.core.prn.call(null,prop_path," before:",cljs.core.get_in.call(null,cljs.core.deref.call(null,model),prop_path));
cljs.core.swap_BANG_.call(null,model,((function (prop_path){
return (function (m){if(cljs.core.truth_(cljs.core.get_in.call(null,m,prop_path)))
{return cljs.core.assoc_in.call(null,m,prop_path,false);
} else
{return cljs.core.assoc_in.call(null,m,prop_path,true);
}
});})(prop_path))
);
return cljs.core.prn.call(null,prop_path,"Halo value after:",cljs.core.get_in.call(null,cljs.core.deref.call(null,model),prop_path));
});
cljs.core._add_method.call(null,cljs_workspace.morph.morph,"Text",(function (app,owner){if(typeof cljs_workspace.morph.t9600 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs_workspace.morph.t9600 = (function (owner,app,meta9601){
this.owner = owner;
this.app = app;
this.meta9601 = meta9601;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs_workspace.morph.t9600.cljs$lang$type = true;
cljs_workspace.morph.t9600.cljs$lang$ctorStr = "cljs-workspace.morph/t9600";
cljs_workspace.morph.t9600.cljs$lang$ctorPrWriter = (function (this__4202__auto__,writer__4203__auto__,opt__4204__auto__){return cljs.core._write.call(null,writer__4203__auto__,"cljs-workspace.morph/t9600");
});
cljs_workspace.morph.t9600.prototype.om$core$IRender$ = true;
cljs_workspace.morph.t9600.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var style = cljs_workspace.morph.dict__GT_js.call(null,cljs_workspace.morph.extract_style.call(null,new cljs.core.Keyword(null,"morph","morph",-595175877).cljs$core$IFn$_invoke$arity$1(self__.app)));return React.DOM.div({"className": "morphNode", "style": style},cljs_workspace.morph.shape.call(null,self__.app,self__.owner));
});
cljs_workspace.morph.t9600.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_9602){var self__ = this;
var _9602__$1 = this;return self__.meta9601;
});
cljs_workspace.morph.t9600.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_9602,meta9601__$1){var self__ = this;
var _9602__$1 = this;return (new cljs_workspace.morph.t9600(self__.owner,self__.app,meta9601__$1));
});
cljs_workspace.morph.__GT_t9600 = (function __GT_t9600(owner__$1,app__$1,meta9601){return (new cljs_workspace.morph.t9600(owner__$1,app__$1,meta9601));
});
}
return (new cljs_workspace.morph.t9600(owner,app,null));
}));
cljs_workspace.morph.handle_click = (function handle_click(e,state){if(cljs.core.truth_((function (){var and__3614__auto__ = cljs_workspace.morph.not_yet_handled.call(null,e);if(and__3614__auto__)
{return e.altKey;
} else
{return and__3614__auto__;
}
})()))
{cljs.core.deref.call(null,cljs_workspace.morph.right_click_behavior).call(null,e,state);
} else
{}
var temp__4126__auto__ = cljs.core.get_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.Keyword(null,"onClick","onClick",-1991238530)], null));if(cljs.core.truth_(temp__4126__auto__))
{var cb = temp__4126__auto__;return cb.call(null,state);
} else
{return null;
}
});
cljs_workspace.morph.render_halo = (function render_halo(app,owner){var css = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"Extent","Extent",1039752349),cljs.core.get_in.call(null,app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.Keyword(null,"Extent","Extent",1039752349)], null)),new cljs.core.Keyword(null,"BorderWidth","BorderWidth",-270769170),(1),new cljs.core.Keyword(null,"Position","Position",1624823324),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(0),new cljs.core.Keyword(null,"y","y",-1757859776),(0)], null),new cljs.core.Keyword(null,"BorderColor","BorderColor",-1430586062),"red"], null);return React.DOM.div({"style": cljs_workspace.morph.dict__GT_js.call(null,cljs_workspace.morph.extract_style.call(null,css))});
});
cljs.core._add_method.call(null,cljs_workspace.morph.morph,new cljs.core.Keyword(null,"default","default",-1987822328),(function (app,owner){if(typeof cljs_workspace.morph.t9606 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs_workspace.morph.t9606 = (function (owner,app,meta9607){
this.owner = owner;
this.app = app;
this.meta9607 = meta9607;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs_workspace.morph.t9606.cljs$lang$type = true;
cljs_workspace.morph.t9606.cljs$lang$ctorStr = "cljs-workspace.morph/t9606";
cljs_workspace.morph.t9606.cljs$lang$ctorPrWriter = (function (this__4202__auto__,writer__4203__auto__,opt__4204__auto__){return cljs.core._write.call(null,writer__4203__auto__,"cljs-workspace.morph/t9606");
});
cljs_workspace.morph.t9606.prototype.om$core$IRender$ = true;
cljs_workspace.morph.t9606.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var style = cljs_workspace.morph.dict__GT_js.call(null,cljs_workspace.morph.extract_style.call(null,new cljs.core.Keyword(null,"morph","morph",-595175877).cljs$core$IFn$_invoke$arity$1(self__.app)));return React.DOM.div({"onMouseUp": ((function (style,this$__$1){
return (function (p1__9605_SHARP_){return cljs_workspace.draggable.stop_dragging.call(null,p1__9605_SHARP_,self__.app);
});})(style,this$__$1))
, "onMouseDown": ((function (style,this$__$1){
return (function (p1__9604_SHARP_){return cljs_workspace.draggable.start_dragging.call(null,p1__9604_SHARP_,self__.app,self__.owner);
});})(style,this$__$1))
, "onClick": ((function (style,this$__$1){
return (function (p1__9603_SHARP_){return cljs_workspace.morph.handle_click.call(null,p1__9603_SHARP_,cljs.core.deref.call(null,self__.app));
});})(style,this$__$1))
, "className": "morphNode", "style": style},(cljs.core.truth_(cljs.core.get_in.call(null,self__.app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.Keyword(null,"Halo","Halo",623226868)], null)))?cljs_workspace.morph.render_halo.call(null,self__.app,self__.owner):null),cljs_workspace.morph.shape.call(null,self__.app,self__.owner));
});
cljs_workspace.morph.t9606.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_9608){var self__ = this;
var _9608__$1 = this;return self__.meta9607;
});
cljs_workspace.morph.t9606.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_9608,meta9607__$1){var self__ = this;
var _9608__$1 = this;return (new cljs_workspace.morph.t9606(self__.owner,self__.app,meta9607__$1));
});
cljs_workspace.morph.__GT_t9606 = (function __GT_t9606(owner__$1,app__$1,meta9607){return (new cljs_workspace.morph.t9606(owner__$1,app__$1,meta9607));
});
}
return (new cljs_workspace.morph.t9606(owner,app,null));
}));
cljs_workspace.morph.handle_input = (function handle_input(e,owner,app){var span = om.core.get_node.call(null,owner,"myInput");cljs.core.prn.call(null,span.innerText);
return om.core.update_BANG_.call(null,app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.Keyword(null,"TextString","TextString",-1730000367)], null),span.innerText,new cljs.core.Keyword(null,"update","update",1045576396));
});
cljs_workspace.morph.save_input = (function save_input(e,owner,app){cljs.core.prn.call(null,e.key);
return false;
});
cljs_workspace.morph.create_text_node = (function create_text_node(app,owner){return React.DOM.div({"ref": "myInput", "onInput": (function (p1__9609_SHARP_){return cljs_workspace.morph.handle_input.call(null,p1__9609_SHARP_,owner,app);
}), "onMouseDown": (function (){return cljs.core.swap_BANG_.call(null,cljs_workspace.draggable.clicked_morph,(function (_){cljs.core.deref.call(null,app);
return new cljs.core.Keyword(null,"id","id",-1388402092);
}));
}), "contentEditable": (cljs.core.get_in.call(null,app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.Keyword(null,"AllowInput","AllowInput",-1697166251)], null)) == null), "className": "visible Selection"},cljs.core.get_in.call(null,app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"morph","morph",-595175877),new cljs.core.Keyword(null,"TextString","TextString",-1730000367)], null)));
});
cljs_workspace.morph.handle_path_element = (function handle_path_element(e){var G__9612 = (((e.call(null,new cljs.core.Keyword(null,"type","type",1174270348)) instanceof cljs.core.Keyword))?e.call(null,new cljs.core.Keyword(null,"type","type",1174270348)).fqn:null);switch (G__9612) {
case "arc":
var vec__9613 = e.call(null,new cljs.core.Keyword(null,"anchors","anchors",1699348867));var a = cljs.core.nth.call(null,vec__9613,(0),null);var b = cljs.core.nth.call(null,vec__9613,(1),null);var c = cljs.core.nth.call(null,vec__9613,(2),null);return ("C"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(a.call(null,new cljs.core.Keyword(null,"x","x",2099068185)))+","+cljs.core.str.cljs$core$IFn$_invoke$arity$1(a.call(null,new cljs.core.Keyword(null,"y","y",-1757859776)))+" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(b.call(null,new cljs.core.Keyword(null,"x","x",2099068185)))+","+cljs.core.str.cljs$core$IFn$_invoke$arity$1(b.call(null,new cljs.core.Keyword(null,"y","y",-1757859776)))+" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c.call(null,new cljs.core.Keyword(null,"x","x",2099068185)))+","+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c.call(null,new cljs.core.Keyword(null,"y","y",-1757859776)))+" ");

break;
default:
return ("L"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.call(null,new cljs.core.Keyword(null,"x","x",2099068185)))+","+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e.call(null,new cljs.core.Keyword(null,"y","y",-1757859776)))+" ");

}
});
cljs_workspace.morph.to_svg_attr = (function to_svg_attr(elements){var car = cljs.core.first.call(null,elements);var cdr = cljs.core.rest.call(null,elements);return ("M"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(car.call(null,new cljs.core.Keyword(null,"x","x",2099068185)))+","+cljs.core.str.cljs$core$IFn$_invoke$arity$1(car.call(null,new cljs.core.Keyword(null,"y","y",-1757859776)))+" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.reduce.call(null,cljs.core.str,cljs.core.map.call(null,cljs_workspace.morph.handle_path_element,cdr))));
});
cljs_workspace.morph.unpack = (function unpack(e){var G__9616 = (((e.call(null,new cljs.core.Keyword(null,"type","type",1174270348)) instanceof cljs.core.Keyword))?e.call(null,new cljs.core.Keyword(null,"type","type",1174270348)).fqn:null);switch (G__9616) {
case "arc":
return e.call(null,new cljs.core.Keyword(null,"anchors","anchors",1699348867));

break;
default:
return e;

}
});
cljs_workspace.morph.render_path_node = (function render_path_node(app,owner){cljs.core.prn.call(null,cljs.core.flatten.call(null,cljs.core.map.call(null,cljs_workspace.morph.unpack,cljs.core.get_in.call(null,app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.Keyword(null,"PathElements","PathElements",1090898558)], null)))));
var vertices = cljs.core.flatten.call(null,cljs.core.map.call(null,cljs_workspace.morph.unpack,cljs.core.get_in.call(null,app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.Keyword(null,"PathElements","PathElements",1090898558)], null))));var minX = cljs.core.apply.call(null,cljs.core.min,cljs.core.map.call(null,((function (vertices){
return (function (p1__9618_SHARP_){return p1__9618_SHARP_.call(null,new cljs.core.Keyword(null,"x","x",2099068185));
});})(vertices))
,vertices));var minY = cljs.core.apply.call(null,cljs.core.min,cljs.core.map.call(null,((function (vertices,minX){
return (function (p1__9619_SHARP_){return p1__9619_SHARP_.call(null,new cljs.core.Keyword(null,"y","y",-1757859776));
});})(vertices,minX))
,vertices));var maxX = cljs.core.apply.call(null,cljs.core.max,cljs.core.map.call(null,((function (vertices,minX,minY){
return (function (p1__9620_SHARP_){return p1__9620_SHARP_.call(null,new cljs.core.Keyword(null,"x","x",2099068185));
});})(vertices,minX,minY))
,vertices));var maxY = cljs.core.apply.call(null,cljs.core.max,cljs.core.map.call(null,((function (vertices,minX,minY,maxX){
return (function (p1__9621_SHARP_){return p1__9621_SHARP_.call(null,new cljs.core.Keyword(null,"y","y",-1757859776));
});})(vertices,minX,minY,maxX))
,vertices));var half_stroke = (cljs.core.get_in.call(null,app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.Keyword(null,"StrokeWidth","StrokeWidth",-953392262)], null)) / (2));var w = Math.abs.call(null,(minX - maxX));var h = Math.abs.call(null,(minY - maxY));return React.DOM.svg({"viewBox": (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(((minX - (1)) - half_stroke))+" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(((minY - (1)) - half_stroke))+" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((maxX + ((2) * half_stroke)))+" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1((maxY + ((2) * half_stroke)))), "height": (((1) + h) + ((2) * half_stroke)), "width": (((1) + w) + ((2) * half_stroke)), "style": {"fill": "none", "position": "absolute"}},React.DOM.path({"d": cljs_workspace.morph.to_svg_attr.call(null,cljs.core.get_in.call(null,app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.Keyword(null,"PathElements","PathElements",1090898558)], null))), "stroke": cljs.core.get_in.call(null,app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.Keyword(null,"Fill","Fill",-880021796)], null)), "strokeWidth": cljs.core.get_in.call(null,app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.Keyword(null,"StrokeWidth","StrokeWidth",-953392262)], null))}));
});
cljs.core._add_method.call(null,cljs_workspace.morph.shape,"Image",(function (app,owner){var style = cljs_workspace.morph.dict__GT_js.call(null,cljs_workspace.morph.extract_style.call(null,new cljs.core.Keyword(null,"shape","shape",1190694006).cljs$core$IFn$_invoke$arity$1(app)));return React.DOM.img({"src": cljs.core.get_in.call(null,app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.Keyword(null,"url","url",276297046)], null)), "draggable": false, "style": style});
}));
cljs.core._add_method.call(null,cljs_workspace.morph.shape,"Path",(function (app,owner){var style = cljs_workspace.morph.extract_style.call(null,new cljs.core.Keyword(null,"shape","shape",1190694006).cljs$core$IFn$_invoke$arity$1(app));return React.DOM.div({"className": "Morph Path", "style": cljs_workspace.morph.dict__GT_js.call(null,style)},cljs_workspace.morph.render_path_node.call(null,app,owner),cljs_workspace.morph.render_submorphs.call(null,app));
}));
cljs.core._add_method.call(null,cljs_workspace.morph.shape,"Ellipse",(function (app,owner){var style = cljs_workspace.morph.extract_style.call(null,new cljs.core.Keyword(null,"shape","shape",1190694006).cljs$core$IFn$_invoke$arity$1(app));var ellipse_style = cljs.core.assoc.call(null,style,"border-radius",(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(style.call(null,"width"))+" /"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(style.call(null,"height"))));return React.DOM.div({"style": cljs_workspace.morph.dict__GT_js.call(null,ellipse_style)},cljs_workspace.morph.render_submorphs.call(null,app));
}));
cljs.core._add_method.call(null,cljs_workspace.morph.shape,"Text",(function (app,owner){cljs.core.prn.call(null,"Rendering Text Shape");
var style = cljs_workspace.morph.extract_style.call(null,new cljs.core.Keyword(null,"shape","shape",1190694006).cljs$core$IFn$_invoke$arity$1(app));var text_style = cljs.core.assoc.call(null,style,"cursor","default");return React.DOM.div({"className": "Morph Text", "style": cljs_workspace.morph.dict__GT_js.call(null,text_style)},cljs_workspace.morph.create_text_node.call(null,app,owner));
}));
cljs.core._add_method.call(null,cljs_workspace.morph.shape,new cljs.core.Keyword(null,"default","default",-1987822328),(function (app,owner){var style = cljs_workspace.morph.extract_style.call(null,new cljs.core.Keyword(null,"shape","shape",1190694006).cljs$core$IFn$_invoke$arity$1(app));return React.DOM.div({"style": cljs_workspace.morph.dict__GT_js.call(null,style)},cljs_workspace.morph.render_submorphs.call(null,app));
}));
