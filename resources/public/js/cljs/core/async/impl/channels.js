// Compiled by ClojureScript 0.0-2342
goog.provide('cljs.core.async.impl.channels');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.protocols');
cljs.core.async.impl.channels.box = (function box(val){if(typeof cljs.core.async.impl.channels.t14268 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.impl.channels.t14268 = (function (val,box,meta14269){
this.val = val;
this.box = box;
this.meta14269 = meta14269;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 425984;
})
cljs.core.async.impl.channels.t14268.cljs$lang$type = true;
cljs.core.async.impl.channels.t14268.cljs$lang$ctorStr = "cljs.core.async.impl.channels/t14268";
cljs.core.async.impl.channels.t14268.cljs$lang$ctorPrWriter = (function (this__4202__auto__,writer__4203__auto__,opt__4204__auto__){return cljs.core._write.call(null,writer__4203__auto__,"cljs.core.async.impl.channels/t14268");
});
cljs.core.async.impl.channels.t14268.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.val;
});
cljs.core.async.impl.channels.t14268.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14270){var self__ = this;
var _14270__$1 = this;return self__.meta14269;
});
cljs.core.async.impl.channels.t14268.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14270,meta14269__$1){var self__ = this;
var _14270__$1 = this;return (new cljs.core.async.impl.channels.t14268(self__.val,self__.box,meta14269__$1));
});
cljs.core.async.impl.channels.__GT_t14268 = (function __GT_t14268(val__$1,box__$1,meta14269){return (new cljs.core.async.impl.channels.t14268(val__$1,box__$1,meta14269));
});
}
return (new cljs.core.async.impl.channels.t14268(val,box,null));
});

/**
* @constructor
*/
cljs.core.async.impl.channels.PutBox = (function (handler,val){
this.handler = handler;
this.val = val;
})
cljs.core.async.impl.channels.PutBox.cljs$lang$type = true;
cljs.core.async.impl.channels.PutBox.cljs$lang$ctorStr = "cljs.core.async.impl.channels/PutBox";
cljs.core.async.impl.channels.PutBox.cljs$lang$ctorPrWriter = (function (this__4205__auto__,writer__4206__auto__,opts__4207__auto__){return cljs.core._write.call(null,writer__4206__auto__,"cljs.core.async.impl.channels/PutBox");
});
cljs.core.async.impl.channels.__GT_PutBox = (function __GT_PutBox(handler,val){return (new cljs.core.async.impl.channels.PutBox(handler,val));
});
cljs.core.async.impl.channels.put_active_QMARK_ = (function put_active_QMARK_(box){return cljs.core.async.impl.protocols.active_QMARK_.call(null,box.handler);
});
cljs.core.async.impl.channels.MAX_DIRTY = (64);

/**
* @constructor
*/
cljs.core.async.impl.channels.ManyToManyChannel = (function (takes,dirty_takes,puts,dirty_puts,buf,closed){
this.takes = takes;
this.dirty_takes = dirty_takes;
this.puts = puts;
this.dirty_puts = dirty_puts;
this.buf = buf;
this.closed = closed;
})
cljs.core.async.impl.channels.ManyToManyChannel.cljs$lang$type = true;
cljs.core.async.impl.channels.ManyToManyChannel.cljs$lang$ctorStr = "cljs.core.async.impl.channels/ManyToManyChannel";
cljs.core.async.impl.channels.ManyToManyChannel.cljs$lang$ctorPrWriter = (function (this__4202__auto__,writer__4203__auto__,opt__4204__auto__){return cljs.core._write.call(null,writer__4203__auto__,"cljs.core.async.impl.channels/ManyToManyChannel");
});
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.closed;
});
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;if(self__.closed)
{return null;
} else
{self__.closed = true;
while(true){
var taker_14271 = self__.takes.pop();if((taker_14271 == null))
{} else
{if(cljs.core.async.impl.protocols.active_QMARK_.call(null,taker_14271))
{var take_cb_14272 = cljs.core.async.impl.protocols.commit.call(null,taker_14271);cljs.core.async.impl.dispatch.run.call(null,((function (take_cb_14272,taker_14271,this$__$1){
return (function (){return take_cb_14272.call(null,null);
});})(take_cb_14272,taker_14271,this$__$1))
);
} else
{}
{
continue;
}
}
break;
}
return null;
}
});
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (this$,handler){var self__ = this;
var this$__$1 = this;if(!(cljs.core.async.impl.protocols.active_QMARK_.call(null,handler)))
{return null;
} else
{if((!((self__.buf == null))) && ((cljs.core.count.call(null,self__.buf) > (0))))
{var _ = cljs.core.async.impl.protocols.commit.call(null,handler);var retval = cljs.core.async.impl.channels.box.call(null,cljs.core.async.impl.protocols.remove_BANG_.call(null,self__.buf));while(true){
var putter_14273 = self__.puts.pop();if(!((putter_14273 == null)))
{var put_handler_14274 = putter_14273.handler;var val_14275 = putter_14273.val;if(cljs.core.async.impl.protocols.active_QMARK_.call(null,put_handler_14274))
{var put_cb_14276 = cljs.core.async.impl.protocols.commit.call(null,put_handler_14274);var __14277__$1 = cljs.core.async.impl.protocols.commit.call(null,handler);cljs.core.async.impl.dispatch.run.call(null,((function (put_cb_14276,__14277__$1,put_handler_14274,val_14275,putter_14273,_,retval,this$__$1){
return (function (){return put_cb_14276.call(null,true);
});})(put_cb_14276,__14277__$1,put_handler_14274,val_14275,putter_14273,_,retval,this$__$1))
);
cljs.core.async.impl.protocols.add_BANG_.call(null,self__.buf,val_14275);
} else
{{
continue;
}
}
} else
{}
break;
}
return retval;
} else
{while(true){
var putter = self__.puts.pop();if(!((putter == null)))
{var put_handler = putter.handler;var val = putter.val;if(cljs.core.async.impl.protocols.active_QMARK_.call(null,put_handler))
{var put_cb = cljs.core.async.impl.protocols.commit.call(null,put_handler);var _ = cljs.core.async.impl.protocols.commit.call(null,handler);cljs.core.async.impl.dispatch.run.call(null,((function (put_cb,_,put_handler,val,putter,this$__$1){
return (function (){return put_cb.call(null,true);
});})(put_cb,_,put_handler,val,putter,this$__$1))
);
return cljs.core.async.impl.channels.box.call(null,val);
} else
{{
continue;
}
}
} else
{if(self__.closed)
{var _ = cljs.core.async.impl.protocols.commit.call(null,handler);return cljs.core.async.impl.channels.box.call(null,null);
} else
{if((self__.dirty_takes > cljs.core.async.impl.channels.MAX_DIRTY))
{self__.dirty_takes = (0);
self__.takes.cleanup(cljs.core.async.impl.protocols.active_QMARK_);
} else
{self__.dirty_takes = (self__.dirty_takes + (1));
}
if((self__.takes.length < cljs.core.async.impl.protocols.MAX_QUEUE_SIZE))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(("No more than "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.async.impl.protocols.MAX_QUEUE_SIZE)+" pending takes are allowed on a single channel."))+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),cljs.core.list(new cljs.core.Symbol(null,".-length",".-length",-280799999,null),new cljs.core.Symbol(null,"takes","takes",298247964,null)),new cljs.core.Symbol("impl","MAX-QUEUE-SIZE","impl/MAX-QUEUE-SIZE",1508600732,null)))))));
}
self__.takes.unbounded_unshift(handler);
return null;
}
}
break;
}
}
}
});
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (this$,val,handler){var self__ = this;
var this$__$1 = this;if(!((val == null)))
{} else
{throw (new Error(("Assert failed: Can't put nil in on a channel\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"not","not",1044554643,null),cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),new cljs.core.Symbol(null,"val","val",1769233139,null))))))));
}
var closed__$1 = self__.closed;if((closed__$1) || (!(cljs.core.async.impl.protocols.active_QMARK_.call(null,handler))))
{return cljs.core.async.impl.channels.box.call(null,!(closed__$1));
} else
{while(true){
var taker = self__.takes.pop();if(!((taker == null)))
{if(cljs.core.async.impl.protocols.active_QMARK_.call(null,taker))
{var take_cb = cljs.core.async.impl.protocols.commit.call(null,taker);var _ = cljs.core.async.impl.protocols.commit.call(null,handler);cljs.core.async.impl.dispatch.run.call(null,((function (take_cb,_,taker,closed__$1,this$__$1){
return (function (){return take_cb.call(null,val);
});})(take_cb,_,taker,closed__$1,this$__$1))
);
return cljs.core.async.impl.channels.box.call(null,true);
} else
{{
continue;
}
}
} else
{if(!(((self__.buf == null)) || (cljs.core.async.impl.protocols.full_QMARK_.call(null,self__.buf))))
{var _ = cljs.core.async.impl.protocols.commit.call(null,handler);cljs.core.async.impl.protocols.add_BANG_.call(null,self__.buf,val);
return cljs.core.async.impl.channels.box.call(null,true);
} else
{if((self__.dirty_puts > cljs.core.async.impl.channels.MAX_DIRTY))
{self__.dirty_puts = (0);
self__.puts.cleanup(cljs.core.async.impl.channels.put_active_QMARK_);
} else
{self__.dirty_puts = (self__.dirty_puts + (1));
}
if((self__.puts.length < cljs.core.async.impl.protocols.MAX_QUEUE_SIZE))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(("No more than "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.async.impl.protocols.MAX_QUEUE_SIZE)+" pending puts are allowed on a single channel. Consider using a windowed buffer."))+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"<","<",993667236,null),cljs.core.list(new cljs.core.Symbol(null,".-length",".-length",-280799999,null),new cljs.core.Symbol(null,"puts","puts",-1883877054,null)),new cljs.core.Symbol("impl","MAX-QUEUE-SIZE","impl/MAX-QUEUE-SIZE",1508600732,null)))))));
}
self__.puts.unbounded_unshift((new cljs.core.async.impl.channels.PutBox(handler,val)));
return null;
}
}
break;
}
}
});
cljs.core.async.impl.channels.__GT_ManyToManyChannel = (function __GT_ManyToManyChannel(takes,dirty_takes,puts,dirty_puts,buf,closed){return (new cljs.core.async.impl.channels.ManyToManyChannel(takes,dirty_takes,puts,dirty_puts,buf,closed));
});
cljs.core.async.impl.channels.chan = (function chan(buf){return (new cljs.core.async.impl.channels.ManyToManyChannel(cljs.core.async.impl.buffers.ring_buffer.call(null,(32)),(0),cljs.core.async.impl.buffers.ring_buffer.call(null,(32)),(0),buf,false));
});
