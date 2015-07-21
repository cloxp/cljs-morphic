// Compiled by ClojureScript 0.0-2342
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
cljs.core.async.fn_handler = (function fn_handler(f){if(typeof cljs.core.async.t11519 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11519 = (function (f,fn_handler,meta11520){
this.f = f;
this.fn_handler = fn_handler;
this.meta11520 = meta11520;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11519.cljs$lang$type = true;
cljs.core.async.t11519.cljs$lang$ctorStr = "cljs.core.async/t11519";
cljs.core.async.t11519.cljs$lang$ctorPrWriter = (function (this__4202__auto__,writer__4203__auto__,opt__4204__auto__){return cljs.core._write.call(null,writer__4203__auto__,"cljs.core.async/t11519");
});
cljs.core.async.t11519.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t11519.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return true;
});
cljs.core.async.t11519.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.f;
});
cljs.core.async.t11519.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11521){var self__ = this;
var _11521__$1 = this;return self__.meta11520;
});
cljs.core.async.t11519.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11521,meta11520__$1){var self__ = this;
var _11521__$1 = this;return (new cljs.core.async.t11519(self__.f,self__.fn_handler,meta11520__$1));
});
cljs.core.async.__GT_t11519 = (function __GT_t11519(f__$1,fn_handler__$1,meta11520){return (new cljs.core.async.t11519(f__$1,fn_handler__$1,meta11520));
});
}
return (new cljs.core.async.t11519(f,fn_handler,null));
});
/**
* Returns a fixed buffer of size n. When full, puts will block/park.
*/
cljs.core.async.buffer = (function buffer(n){return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
* Returns a buffer of size n. When full, puts will complete but
* val will be dropped (no transfer).
*/
cljs.core.async.dropping_buffer = (function dropping_buffer(n){return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
* Returns a buffer of size n. When full, puts will complete, and be
* buffered, but oldest elements in buffer will be dropped (not
* transferred).
*/
cljs.core.async.sliding_buffer = (function sliding_buffer(n){return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
* Returns true if a channel created with buff will never block. That is to say,
* puts into this buffer will never cause the buffer to be full.
*/
cljs.core.async.unblocking_buffer_QMARK_ = (function unblocking_buffer_QMARK_(buff){var G__11523 = buff;if(G__11523)
{var bit__4289__auto__ = null;if(cljs.core.truth_((function (){var or__3626__auto__ = bit__4289__auto__;if(cljs.core.truth_(or__3626__auto__))
{return or__3626__auto__;
} else
{return G__11523.cljs$core$async$impl$protocols$UnblockingBuffer$;
}
})()))
{return true;
} else
{if((!G__11523.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__11523);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__11523);
}
});
/**
* Creates a channel with an optional buffer. If buf-or-n is a number,
* will create and use a fixed buffer of that size.
*/
cljs.core.async.chan = (function() {
var chan = null;
var chan__0 = (function (){return chan.call(null,null);
});
var chan__1 = (function (buf_or_n){var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1));
});
chan = function(buf_or_n){
switch(arguments.length){
case 0:
return chan__0.call(this);
case 1:
return chan__1.call(this,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chan.cljs$core$IFn$_invoke$arity$0 = chan__0;
chan.cljs$core$IFn$_invoke$arity$1 = chan__1;
return chan;
})()
;
/**
* Returns a channel that will close after msecs
*/
cljs.core.async.timeout = (function timeout(msecs){return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
* takes a val from port. Must be called inside a (go ...) block. Will
* return nil if closed. Will park if nothing is available.
* Returns true unless port is already closed
*/
cljs.core.async._LT__BANG_ = (function _LT__BANG_(port){throw (new Error(("Assert failed: <! used not in (go ...) block\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,null)))));

});
/**
* Asynchronously takes a val from port, passing to fn1. Will pass nil
* if closed. If on-caller? (default true) is true, and value is
* immediately available, will call fn1 on calling thread.
* Returns nil.
*/
cljs.core.async.take_BANG_ = (function() {
var take_BANG_ = null;
var take_BANG___2 = (function (port,fn1){return take_BANG_.call(null,port,fn1,true);
});
var take_BANG___3 = (function (port,fn1,on_caller_QMARK_){var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));if(cljs.core.truth_(ret))
{var val_11524 = cljs.core.deref.call(null,ret);if(cljs.core.truth_(on_caller_QMARK_))
{fn1.call(null,val_11524);
} else
{cljs.core.async.impl.dispatch.run.call(null,((function (val_11524,ret){
return (function (){return fn1.call(null,val_11524);
});})(val_11524,ret))
);
}
} else
{}
return null;
});
take_BANG_ = function(port,fn1,on_caller_QMARK_){
switch(arguments.length){
case 2:
return take_BANG___2.call(this,port,fn1);
case 3:
return take_BANG___3.call(this,port,fn1,on_caller_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
take_BANG_.cljs$core$IFn$_invoke$arity$2 = take_BANG___2;
take_BANG_.cljs$core$IFn$_invoke$arity$3 = take_BANG___3;
return take_BANG_;
})()
;
cljs.core.async.nop = (function nop(_){return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
/**
* puts a val into port. nil values are not allowed. Must be called
* inside a (go ...) block. Will park if no buffer space is available.
* Returns true unless port is already closed.
*/
cljs.core.async._GT__BANG_ = (function _GT__BANG_(port,val){throw (new Error(("Assert failed: >! used not in (go ...) block\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,null)))));

});
/**
* Asynchronously puts a val into port, calling fn0 (if supplied) when
* complete. nil values are not allowed. Will throw if closed. If
* on-caller? (default true) is true, and the put is immediately
* accepted, will call fn0 on calling thread.  Returns nil.
*/
cljs.core.async.put_BANG_ = (function() {
var put_BANG_ = null;
var put_BANG___2 = (function (port,val){var temp__4124__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);if(cljs.core.truth_(temp__4124__auto__))
{var ret = temp__4124__auto__;return cljs.core.deref.call(null,ret);
} else
{return true;
}
});
var put_BANG___3 = (function (port,val,fn1){return put_BANG_.call(null,port,val,fn1,true);
});
var put_BANG___4 = (function (port,val,fn1,on_caller_QMARK_){var temp__4124__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));if(cljs.core.truth_(temp__4124__auto__))
{var retb = temp__4124__auto__;var ret = cljs.core.deref.call(null,retb);if(cljs.core.truth_(on_caller_QMARK_))
{fn1.call(null,ret);
} else
{cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__4124__auto__){
return (function (){return fn1.call(null,ret);
});})(ret,retb,temp__4124__auto__))
);
}
return ret;
} else
{return true;
}
});
put_BANG_ = function(port,val,fn1,on_caller_QMARK_){
switch(arguments.length){
case 2:
return put_BANG___2.call(this,port,val);
case 3:
return put_BANG___3.call(this,port,val,fn1);
case 4:
return put_BANG___4.call(this,port,val,fn1,on_caller_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
put_BANG_.cljs$core$IFn$_invoke$arity$2 = put_BANG___2;
put_BANG_.cljs$core$IFn$_invoke$arity$3 = put_BANG___3;
put_BANG_.cljs$core$IFn$_invoke$arity$4 = put_BANG___4;
return put_BANG_;
})()
;
cljs.core.async.close_BANG_ = (function close_BANG_(port){return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function random_array(n){var a = (new Array(n));var n__4495__auto___11525 = n;var x_11526 = (0);while(true){
if((x_11526 < n__4495__auto___11525))
{(a[x_11526] = (0));
{
var G__11527 = (x_11526 + (1));
x_11526 = G__11527;
continue;
}
} else
{}
break;
}
var i = (1);while(true){
if(cljs.core._EQ_.call(null,i,n))
{return a;
} else
{var j = cljs.core.rand_int.call(null,i);(a[i] = (a[j]));
(a[j] = i);
{
var G__11528 = (i + (1));
i = G__11528;
continue;
}
}
break;
}
});
cljs.core.async.alt_flag = (function alt_flag(){var flag = cljs.core.atom.call(null,true);if(typeof cljs.core.async.t11532 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11532 = (function (flag,alt_flag,meta11533){
this.flag = flag;
this.alt_flag = alt_flag;
this.meta11533 = meta11533;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11532.cljs$lang$type = true;
cljs.core.async.t11532.cljs$lang$ctorStr = "cljs.core.async/t11532";
cljs.core.async.t11532.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__4202__auto__,writer__4203__auto__,opt__4204__auto__){return cljs.core._write.call(null,writer__4203__auto__,"cljs.core.async/t11532");
});})(flag))
;
cljs.core.async.t11532.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t11532.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.deref.call(null,self__.flag);
});})(flag))
;
cljs.core.async.t11532.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.flag,null);
return true;
});})(flag))
;
cljs.core.async.t11532.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_11534){var self__ = this;
var _11534__$1 = this;return self__.meta11533;
});})(flag))
;
cljs.core.async.t11532.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_11534,meta11533__$1){var self__ = this;
var _11534__$1 = this;return (new cljs.core.async.t11532(self__.flag,self__.alt_flag,meta11533__$1));
});})(flag))
;
cljs.core.async.__GT_t11532 = ((function (flag){
return (function __GT_t11532(flag__$1,alt_flag__$1,meta11533){return (new cljs.core.async.t11532(flag__$1,alt_flag__$1,meta11533));
});})(flag))
;
}
return (new cljs.core.async.t11532(flag,alt_flag,null));
});
cljs.core.async.alt_handler = (function alt_handler(flag,cb){if(typeof cljs.core.async.t11538 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11538 = (function (cb,flag,alt_handler,meta11539){
this.cb = cb;
this.flag = flag;
this.alt_handler = alt_handler;
this.meta11539 = meta11539;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11538.cljs$lang$type = true;
cljs.core.async.t11538.cljs$lang$ctorStr = "cljs.core.async/t11538";
cljs.core.async.t11538.cljs$lang$ctorPrWriter = (function (this__4202__auto__,writer__4203__auto__,opt__4204__auto__){return cljs.core._write.call(null,writer__4203__auto__,"cljs.core.async/t11538");
});
cljs.core.async.t11538.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t11538.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});
cljs.core.async.t11538.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.async.impl.protocols.commit.call(null,self__.flag);
return self__.cb;
});
cljs.core.async.t11538.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11540){var self__ = this;
var _11540__$1 = this;return self__.meta11539;
});
cljs.core.async.t11538.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11540,meta11539__$1){var self__ = this;
var _11540__$1 = this;return (new cljs.core.async.t11538(self__.cb,self__.flag,self__.alt_handler,meta11539__$1));
});
cljs.core.async.__GT_t11538 = (function __GT_t11538(cb__$1,flag__$1,alt_handler__$1,meta11539){return (new cljs.core.async.t11538(cb__$1,flag__$1,alt_handler__$1,meta11539));
});
}
return (new cljs.core.async.t11538(cb,flag,alt_handler,null));
});
/**
* returns derefable [val port] if immediate, nil if enqueued
*/
cljs.core.async.do_alts = (function do_alts(fret,ports,opts){var flag = cljs.core.async.alt_flag.call(null);var n = cljs.core.count.call(null,ports);var idxs = cljs.core.async.random_array.call(null,n);var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);var ret = (function (){var i = (0);while(true){
if((i < n))
{var idx = (cljs.core.truth_(priority)?i:(idxs[i]));var port = cljs.core.nth.call(null,ports,idx);var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__11541_SHARP_){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__11541_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__11542_SHARP_){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__11542_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));if(cljs.core.truth_(vbox))
{return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__3626__auto__ = wport;if(cljs.core.truth_(or__3626__auto__))
{return or__3626__auto__;
} else
{return port;
}
})()], null));
} else
{{
var G__11543 = (i + (1));
i = G__11543;
continue;
}
}
} else
{return null;
}
break;
}
})();var or__3626__auto__ = ret;if(cljs.core.truth_(or__3626__auto__))
{return or__3626__auto__;
} else
{if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328)))
{var temp__4126__auto__ = (function (){var and__3614__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);if(cljs.core.truth_(and__3614__auto__))
{return cljs.core.async.impl.protocols.commit.call(null,flag);
} else
{return and__3614__auto__;
}
})();if(cljs.core.truth_(temp__4126__auto__))
{var got = temp__4126__auto__;return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else
{return null;
}
} else
{return null;
}
}
});
/**
* Completes at most one of several channel operations. Must be called
* inside a (go ...) block. ports is a vector of channel endpoints,
* which can be either a channel to take from or a vector of
* [channel-to-put-to val-to-put], in any combination. Takes will be
* made as if by <!, and puts will be made as if by >!. Unless
* the :priority option is true, if more than one port operation is
* ready a non-deterministic choice will be made. If no operation is
* ready and a :default value is supplied, [default-val :default] will
* be returned, otherwise alts! will park until the first operation to
* become ready completes. Returns [val port] of the completed
* operation, where val is the value taken for takes, and a
* boolean (true unless already closed, as per put!) for puts.
* 
* opts are passed as :key val ... Supported options:
* 
* :default val - the value to use if none of the operations are immediately ready
* :priority true - (default nil) when true, the operations will be tried in order.
* 
* Note: there is no guarantee that the port exps or val exprs will be
* used, nor in what order should they be, so they should not be
* depended upon for side effects.
* @param {...*} var_args
*/
cljs.core.async.alts_BANG_ = (function() { 
var alts_BANG___delegate = function (ports,p__11544){var map__11546 = p__11544;var map__11546__$1 = ((cljs.core.seq_QMARK_.call(null,map__11546))?cljs.core.apply.call(null,cljs.core.hash_map,map__11546):map__11546);var opts = map__11546__$1;throw (new Error(("Assert failed: alts! used not in (go ...) block\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,null)))));

};
var alts_BANG_ = function (ports,var_args){
var p__11544 = null;if (arguments.length > 1) {
  p__11544 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return alts_BANG___delegate.call(this,ports,p__11544);};
alts_BANG_.cljs$lang$maxFixedArity = 1;
alts_BANG_.cljs$lang$applyTo = (function (arglist__11547){
var ports = cljs.core.first(arglist__11547);
var p__11544 = cljs.core.rest(arglist__11547);
return alts_BANG___delegate(ports,p__11544);
});
alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = alts_BANG___delegate;
return alts_BANG_;
})()
;
/**
* Takes a function and a source channel, and returns a channel which
* contains the values produced by applying f to each value taken from
* the source channel
*/
cljs.core.async.map_LT_ = (function map_LT_(f,ch){if(typeof cljs.core.async.t11555 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11555 = (function (ch,f,map_LT_,meta11556){
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta11556 = meta11556;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11555.cljs$lang$type = true;
cljs.core.async.t11555.cljs$lang$ctorStr = "cljs.core.async/t11555";
cljs.core.async.t11555.cljs$lang$ctorPrWriter = (function (this__4202__auto__,writer__4203__auto__,opt__4204__auto__){return cljs.core._write.call(null,writer__4203__auto__,"cljs.core.async/t11555");
});
cljs.core.async.t11555.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t11555.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});
cljs.core.async.t11555.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t11555.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){if(typeof cljs.core.async.t11558 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11558 = (function (fn1,_,meta11556,ch,f,map_LT_,meta11559){
this.fn1 = fn1;
this._ = _;
this.meta11556 = meta11556;
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta11559 = meta11559;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11558.cljs$lang$type = true;
cljs.core.async.t11558.cljs$lang$ctorStr = "cljs.core.async/t11558";
cljs.core.async.t11558.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__4202__auto__,writer__4203__auto__,opt__4204__auto__){return cljs.core._write.call(null,writer__4203__auto__,"cljs.core.async/t11558");
});})(___$1))
;
cljs.core.async.t11558.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t11558.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;
cljs.core.async.t11558.prototype.cljs$core$async$impl$protocols$Handler$lock_id$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.lock_id.call(null,self__.fn1);
});})(___$1))
;
cljs.core.async.t11558.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);return ((function (f1,___$4,___$1){
return (function (p1__11548_SHARP_){return f1.call(null,(((p1__11548_SHARP_ == null))?null:self__.f.call(null,p1__11548_SHARP_)));
});
;})(f1,___$4,___$1))
});})(___$1))
;
cljs.core.async.t11558.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_11560){var self__ = this;
var _11560__$1 = this;return self__.meta11559;
});})(___$1))
;
cljs.core.async.t11558.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_11560,meta11559__$1){var self__ = this;
var _11560__$1 = this;return (new cljs.core.async.t11558(self__.fn1,self__._,self__.meta11556,self__.ch,self__.f,self__.map_LT_,meta11559__$1));
});})(___$1))
;
cljs.core.async.__GT_t11558 = ((function (___$1){
return (function __GT_t11558(fn1__$1,___$2,meta11556__$1,ch__$2,f__$2,map_LT___$2,meta11559){return (new cljs.core.async.t11558(fn1__$1,___$2,meta11556__$1,ch__$2,f__$2,map_LT___$2,meta11559));
});})(___$1))
;
}
return (new cljs.core.async.t11558(fn1,___$1,self__.meta11556,self__.ch,self__.f,self__.map_LT_,null));
})());if(cljs.core.truth_((function (){var and__3614__auto__ = ret;if(cljs.core.truth_(and__3614__auto__))
{return !((cljs.core.deref.call(null,ret) == null));
} else
{return and__3614__auto__;
}
})()))
{return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else
{return ret;
}
});
cljs.core.async.t11555.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t11555.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t11555.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});
cljs.core.async.t11555.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11557){var self__ = this;
var _11557__$1 = this;return self__.meta11556;
});
cljs.core.async.t11555.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11557,meta11556__$1){var self__ = this;
var _11557__$1 = this;return (new cljs.core.async.t11555(self__.ch,self__.f,self__.map_LT_,meta11556__$1));
});
cljs.core.async.__GT_t11555 = (function __GT_t11555(ch__$1,f__$1,map_LT___$1,meta11556){return (new cljs.core.async.t11555(ch__$1,f__$1,map_LT___$1,meta11556));
});
}
return (new cljs.core.async.t11555(ch,f,map_LT_,null));
});
/**
* Takes a function and a target channel, and returns a channel which
* applies f to each value before supplying it to the target channel.
*/
cljs.core.async.map_GT_ = (function map_GT_(f,ch){if(typeof cljs.core.async.t11564 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11564 = (function (ch,f,map_GT_,meta11565){
this.ch = ch;
this.f = f;
this.map_GT_ = map_GT_;
this.meta11565 = meta11565;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11564.cljs$lang$type = true;
cljs.core.async.t11564.cljs$lang$ctorStr = "cljs.core.async/t11564";
cljs.core.async.t11564.cljs$lang$ctorPrWriter = (function (this__4202__auto__,writer__4203__auto__,opt__4204__auto__){return cljs.core._write.call(null,writer__4203__auto__,"cljs.core.async/t11564");
});
cljs.core.async.t11564.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t11564.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});
cljs.core.async.t11564.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t11564.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t11564.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t11564.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t11564.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11566){var self__ = this;
var _11566__$1 = this;return self__.meta11565;
});
cljs.core.async.t11564.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11566,meta11565__$1){var self__ = this;
var _11566__$1 = this;return (new cljs.core.async.t11564(self__.ch,self__.f,self__.map_GT_,meta11565__$1));
});
cljs.core.async.__GT_t11564 = (function __GT_t11564(ch__$1,f__$1,map_GT___$1,meta11565){return (new cljs.core.async.t11564(ch__$1,f__$1,map_GT___$1,meta11565));
});
}
return (new cljs.core.async.t11564(ch,f,map_GT_,null));
});
/**
* Takes a predicate and a target channel, and returns a channel which
* supplies only the values for which the predicate returns true to the
* target channel.
*/
cljs.core.async.filter_GT_ = (function filter_GT_(p,ch){if(typeof cljs.core.async.t11570 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11570 = (function (ch,p,filter_GT_,meta11571){
this.ch = ch;
this.p = p;
this.filter_GT_ = filter_GT_;
this.meta11571 = meta11571;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11570.cljs$lang$type = true;
cljs.core.async.t11570.cljs$lang$ctorStr = "cljs.core.async/t11570";
cljs.core.async.t11570.cljs$lang$ctorPrWriter = (function (this__4202__auto__,writer__4203__auto__,opt__4204__auto__){return cljs.core._write.call(null,writer__4203__auto__,"cljs.core.async/t11570");
});
cljs.core.async.t11570.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t11570.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.p.call(null,val)))
{return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else
{return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});
cljs.core.async.t11570.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t11570.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t11570.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t11570.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t11570.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});
cljs.core.async.t11570.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11572){var self__ = this;
var _11572__$1 = this;return self__.meta11571;
});
cljs.core.async.t11570.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11572,meta11571__$1){var self__ = this;
var _11572__$1 = this;return (new cljs.core.async.t11570(self__.ch,self__.p,self__.filter_GT_,meta11571__$1));
});
cljs.core.async.__GT_t11570 = (function __GT_t11570(ch__$1,p__$1,filter_GT___$1,meta11571){return (new cljs.core.async.t11570(ch__$1,p__$1,filter_GT___$1,meta11571));
});
}
return (new cljs.core.async.t11570(ch,p,filter_GT_,null));
});
/**
* Takes a predicate and a target channel, and returns a channel which
* supplies only the values for which the predicate returns false to the
* target channel.
*/
cljs.core.async.remove_GT_ = (function remove_GT_(p,ch){return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
* Takes a predicate and a source channel, and returns a channel which
* contains only the values taken from the source channel for which the
* predicate returns true. The returned channel will be unbuffered by
* default, or a buf-or-n can be supplied. The channel will close
* when the source channel closes.
*/
cljs.core.async.filter_LT_ = (function() {
var filter_LT_ = null;
var filter_LT___2 = (function (p,ch){return filter_LT_.call(null,p,ch,null);
});
var filter_LT___3 = (function (p,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__7126__auto___11655 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__7126__auto___11655,out){
return (function (){var f__7127__auto__ = (function (){var switch__7111__auto__ = ((function (c__7126__auto___11655,out){
return (function (state_11634){var state_val_11635 = (state_11634[(1)]);if((state_val_11635 === (7)))
{var inst_11630 = (state_11634[(2)]);var state_11634__$1 = state_11634;var statearr_11636_11656 = state_11634__$1;(statearr_11636_11656[(2)] = inst_11630);
(statearr_11636_11656[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11635 === (1)))
{var state_11634__$1 = state_11634;var statearr_11637_11657 = state_11634__$1;(statearr_11637_11657[(2)] = null);
(statearr_11637_11657[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11635 === (4)))
{var inst_11616 = (state_11634[(7)]);var inst_11616__$1 = (state_11634[(2)]);var inst_11617 = (inst_11616__$1 == null);var state_11634__$1 = (function (){var statearr_11638 = state_11634;(statearr_11638[(7)] = inst_11616__$1);
return statearr_11638;
})();if(cljs.core.truth_(inst_11617))
{var statearr_11639_11658 = state_11634__$1;(statearr_11639_11658[(1)] = (5));
} else
{var statearr_11640_11659 = state_11634__$1;(statearr_11640_11659[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11635 === (6)))
{var inst_11616 = (state_11634[(7)]);var inst_11621 = p.call(null,inst_11616);var state_11634__$1 = state_11634;if(cljs.core.truth_(inst_11621))
{var statearr_11641_11660 = state_11634__$1;(statearr_11641_11660[(1)] = (8));
} else
{var statearr_11642_11661 = state_11634__$1;(statearr_11642_11661[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11635 === (3)))
{var inst_11632 = (state_11634[(2)]);var state_11634__$1 = state_11634;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11634__$1,inst_11632);
} else
{if((state_val_11635 === (2)))
{var state_11634__$1 = state_11634;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11634__$1,(4),ch);
} else
{if((state_val_11635 === (11)))
{var inst_11624 = (state_11634[(2)]);var state_11634__$1 = state_11634;var statearr_11643_11662 = state_11634__$1;(statearr_11643_11662[(2)] = inst_11624);
(statearr_11643_11662[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11635 === (9)))
{var state_11634__$1 = state_11634;var statearr_11644_11663 = state_11634__$1;(statearr_11644_11663[(2)] = null);
(statearr_11644_11663[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11635 === (5)))
{var inst_11619 = cljs.core.async.close_BANG_.call(null,out);var state_11634__$1 = state_11634;var statearr_11645_11664 = state_11634__$1;(statearr_11645_11664[(2)] = inst_11619);
(statearr_11645_11664[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11635 === (10)))
{var inst_11627 = (state_11634[(2)]);var state_11634__$1 = (function (){var statearr_11646 = state_11634;(statearr_11646[(8)] = inst_11627);
return statearr_11646;
})();var statearr_11647_11665 = state_11634__$1;(statearr_11647_11665[(2)] = null);
(statearr_11647_11665[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11635 === (8)))
{var inst_11616 = (state_11634[(7)]);var state_11634__$1 = state_11634;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11634__$1,(11),out,inst_11616);
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
});})(c__7126__auto___11655,out))
;return ((function (switch__7111__auto__,c__7126__auto___11655,out){
return (function() {
var state_machine__7112__auto__ = null;
var state_machine__7112__auto____0 = (function (){var statearr_11651 = [null,null,null,null,null,null,null,null,null];(statearr_11651[(0)] = state_machine__7112__auto__);
(statearr_11651[(1)] = (1));
return statearr_11651;
});
var state_machine__7112__auto____1 = (function (state_11634){while(true){
var ret_value__7113__auto__ = (function (){try{while(true){
var result__7114__auto__ = switch__7111__auto__.call(null,state_11634);if(cljs.core.keyword_identical_QMARK_.call(null,result__7114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__7114__auto__;
}
break;
}
}catch (e11652){if((e11652 instanceof Object))
{var ex__7115__auto__ = e11652;var statearr_11653_11666 = state_11634;(statearr_11653_11666[(5)] = ex__7115__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11634);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e11652;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7113__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__11667 = state_11634;
state_11634 = G__11667;
continue;
}
} else
{return ret_value__7113__auto__;
}
break;
}
});
state_machine__7112__auto__ = function(state_11634){
switch(arguments.length){
case 0:
return state_machine__7112__auto____0.call(this);
case 1:
return state_machine__7112__auto____1.call(this,state_11634);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__7112__auto____0;
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__7112__auto____1;
return state_machine__7112__auto__;
})()
;})(switch__7111__auto__,c__7126__auto___11655,out))
})();var state__7128__auto__ = (function (){var statearr_11654 = f__7127__auto__.call(null);(statearr_11654[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7126__auto___11655);
return statearr_11654;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7128__auto__);
});})(c__7126__auto___11655,out))
);
return out;
});
filter_LT_ = function(p,ch,buf_or_n){
switch(arguments.length){
case 2:
return filter_LT___2.call(this,p,ch);
case 3:
return filter_LT___3.call(this,p,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
filter_LT_.cljs$core$IFn$_invoke$arity$2 = filter_LT___2;
filter_LT_.cljs$core$IFn$_invoke$arity$3 = filter_LT___3;
return filter_LT_;
})()
;
/**
* Takes a predicate and a source channel, and returns a channel which
* contains only the values taken from the source channel for which the
* predicate returns false. The returned channel will be unbuffered by
* default, or a buf-or-n can be supplied. The channel will close
* when the source channel closes.
*/
cljs.core.async.remove_LT_ = (function() {
var remove_LT_ = null;
var remove_LT___2 = (function (p,ch){return remove_LT_.call(null,p,ch,null);
});
var remove_LT___3 = (function (p,ch,buf_or_n){return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});
remove_LT_ = function(p,ch,buf_or_n){
switch(arguments.length){
case 2:
return remove_LT___2.call(this,p,ch);
case 3:
return remove_LT___3.call(this,p,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
remove_LT_.cljs$core$IFn$_invoke$arity$2 = remove_LT___2;
remove_LT_.cljs$core$IFn$_invoke$arity$3 = remove_LT___3;
return remove_LT_;
})()
;
cljs.core.async.mapcat_STAR_ = (function mapcat_STAR_(f,in$,out){var c__7126__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__7126__auto__){
return (function (){var f__7127__auto__ = (function (){var switch__7111__auto__ = ((function (c__7126__auto__){
return (function (state_11833){var state_val_11834 = (state_11833[(1)]);if((state_val_11834 === (7)))
{var inst_11829 = (state_11833[(2)]);var state_11833__$1 = state_11833;var statearr_11835_11876 = state_11833__$1;(statearr_11835_11876[(2)] = inst_11829);
(statearr_11835_11876[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11834 === (20)))
{var inst_11799 = (state_11833[(7)]);var inst_11810 = (state_11833[(2)]);var inst_11811 = cljs.core.next.call(null,inst_11799);var inst_11785 = inst_11811;var inst_11786 = null;var inst_11787 = (0);var inst_11788 = (0);var state_11833__$1 = (function (){var statearr_11836 = state_11833;(statearr_11836[(8)] = inst_11788);
(statearr_11836[(9)] = inst_11785);
(statearr_11836[(10)] = inst_11787);
(statearr_11836[(11)] = inst_11810);
(statearr_11836[(12)] = inst_11786);
return statearr_11836;
})();var statearr_11837_11877 = state_11833__$1;(statearr_11837_11877[(2)] = null);
(statearr_11837_11877[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11834 === (1)))
{var state_11833__$1 = state_11833;var statearr_11838_11878 = state_11833__$1;(statearr_11838_11878[(2)] = null);
(statearr_11838_11878[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11834 === (4)))
{var inst_11774 = (state_11833[(13)]);var inst_11774__$1 = (state_11833[(2)]);var inst_11775 = (inst_11774__$1 == null);var state_11833__$1 = (function (){var statearr_11839 = state_11833;(statearr_11839[(13)] = inst_11774__$1);
return statearr_11839;
})();if(cljs.core.truth_(inst_11775))
{var statearr_11840_11879 = state_11833__$1;(statearr_11840_11879[(1)] = (5));
} else
{var statearr_11841_11880 = state_11833__$1;(statearr_11841_11880[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11834 === (15)))
{var state_11833__$1 = state_11833;var statearr_11845_11881 = state_11833__$1;(statearr_11845_11881[(2)] = null);
(statearr_11845_11881[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11834 === (21)))
{var state_11833__$1 = state_11833;var statearr_11846_11882 = state_11833__$1;(statearr_11846_11882[(2)] = null);
(statearr_11846_11882[(1)] = (23));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11834 === (13)))
{var inst_11788 = (state_11833[(8)]);var inst_11785 = (state_11833[(9)]);var inst_11787 = (state_11833[(10)]);var inst_11786 = (state_11833[(12)]);var inst_11795 = (state_11833[(2)]);var inst_11796 = (inst_11788 + (1));var tmp11842 = inst_11785;var tmp11843 = inst_11787;var tmp11844 = inst_11786;var inst_11785__$1 = tmp11842;var inst_11786__$1 = tmp11844;var inst_11787__$1 = tmp11843;var inst_11788__$1 = inst_11796;var state_11833__$1 = (function (){var statearr_11847 = state_11833;(statearr_11847[(14)] = inst_11795);
(statearr_11847[(8)] = inst_11788__$1);
(statearr_11847[(9)] = inst_11785__$1);
(statearr_11847[(10)] = inst_11787__$1);
(statearr_11847[(12)] = inst_11786__$1);
return statearr_11847;
})();var statearr_11848_11883 = state_11833__$1;(statearr_11848_11883[(2)] = null);
(statearr_11848_11883[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11834 === (22)))
{var state_11833__$1 = state_11833;var statearr_11849_11884 = state_11833__$1;(statearr_11849_11884[(2)] = null);
(statearr_11849_11884[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11834 === (6)))
{var inst_11774 = (state_11833[(13)]);var inst_11783 = f.call(null,inst_11774);var inst_11784 = cljs.core.seq.call(null,inst_11783);var inst_11785 = inst_11784;var inst_11786 = null;var inst_11787 = (0);var inst_11788 = (0);var state_11833__$1 = (function (){var statearr_11850 = state_11833;(statearr_11850[(8)] = inst_11788);
(statearr_11850[(9)] = inst_11785);
(statearr_11850[(10)] = inst_11787);
(statearr_11850[(12)] = inst_11786);
return statearr_11850;
})();var statearr_11851_11885 = state_11833__$1;(statearr_11851_11885[(2)] = null);
(statearr_11851_11885[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11834 === (17)))
{var inst_11799 = (state_11833[(7)]);var inst_11803 = cljs.core.chunk_first.call(null,inst_11799);var inst_11804 = cljs.core.chunk_rest.call(null,inst_11799);var inst_11805 = cljs.core.count.call(null,inst_11803);var inst_11785 = inst_11804;var inst_11786 = inst_11803;var inst_11787 = inst_11805;var inst_11788 = (0);var state_11833__$1 = (function (){var statearr_11852 = state_11833;(statearr_11852[(8)] = inst_11788);
(statearr_11852[(9)] = inst_11785);
(statearr_11852[(10)] = inst_11787);
(statearr_11852[(12)] = inst_11786);
return statearr_11852;
})();var statearr_11853_11886 = state_11833__$1;(statearr_11853_11886[(2)] = null);
(statearr_11853_11886[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11834 === (3)))
{var inst_11831 = (state_11833[(2)]);var state_11833__$1 = state_11833;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11833__$1,inst_11831);
} else
{if((state_val_11834 === (12)))
{var inst_11819 = (state_11833[(2)]);var state_11833__$1 = state_11833;var statearr_11854_11887 = state_11833__$1;(statearr_11854_11887[(2)] = inst_11819);
(statearr_11854_11887[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11834 === (2)))
{var state_11833__$1 = state_11833;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11833__$1,(4),in$);
} else
{if((state_val_11834 === (23)))
{var inst_11827 = (state_11833[(2)]);var state_11833__$1 = state_11833;var statearr_11855_11888 = state_11833__$1;(statearr_11855_11888[(2)] = inst_11827);
(statearr_11855_11888[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11834 === (19)))
{var inst_11814 = (state_11833[(2)]);var state_11833__$1 = state_11833;var statearr_11856_11889 = state_11833__$1;(statearr_11856_11889[(2)] = inst_11814);
(statearr_11856_11889[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11834 === (11)))
{var inst_11785 = (state_11833[(9)]);var inst_11799 = (state_11833[(7)]);var inst_11799__$1 = cljs.core.seq.call(null,inst_11785);var state_11833__$1 = (function (){var statearr_11857 = state_11833;(statearr_11857[(7)] = inst_11799__$1);
return statearr_11857;
})();if(inst_11799__$1)
{var statearr_11858_11890 = state_11833__$1;(statearr_11858_11890[(1)] = (14));
} else
{var statearr_11859_11891 = state_11833__$1;(statearr_11859_11891[(1)] = (15));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11834 === (9)))
{var inst_11821 = (state_11833[(2)]);var inst_11822 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);var state_11833__$1 = (function (){var statearr_11860 = state_11833;(statearr_11860[(15)] = inst_11821);
return statearr_11860;
})();if(cljs.core.truth_(inst_11822))
{var statearr_11861_11892 = state_11833__$1;(statearr_11861_11892[(1)] = (21));
} else
{var statearr_11862_11893 = state_11833__$1;(statearr_11862_11893[(1)] = (22));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11834 === (5)))
{var inst_11777 = cljs.core.async.close_BANG_.call(null,out);var state_11833__$1 = state_11833;var statearr_11863_11894 = state_11833__$1;(statearr_11863_11894[(2)] = inst_11777);
(statearr_11863_11894[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11834 === (14)))
{var inst_11799 = (state_11833[(7)]);var inst_11801 = cljs.core.chunked_seq_QMARK_.call(null,inst_11799);var state_11833__$1 = state_11833;if(inst_11801)
{var statearr_11864_11895 = state_11833__$1;(statearr_11864_11895[(1)] = (17));
} else
{var statearr_11865_11896 = state_11833__$1;(statearr_11865_11896[(1)] = (18));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11834 === (16)))
{var inst_11817 = (state_11833[(2)]);var state_11833__$1 = state_11833;var statearr_11866_11897 = state_11833__$1;(statearr_11866_11897[(2)] = inst_11817);
(statearr_11866_11897[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11834 === (10)))
{var inst_11788 = (state_11833[(8)]);var inst_11786 = (state_11833[(12)]);var inst_11793 = cljs.core._nth.call(null,inst_11786,inst_11788);var state_11833__$1 = state_11833;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11833__$1,(13),out,inst_11793);
} else
{if((state_val_11834 === (18)))
{var inst_11799 = (state_11833[(7)]);var inst_11808 = cljs.core.first.call(null,inst_11799);var state_11833__$1 = state_11833;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11833__$1,(20),out,inst_11808);
} else
{if((state_val_11834 === (8)))
{var inst_11788 = (state_11833[(8)]);var inst_11787 = (state_11833[(10)]);var inst_11790 = (inst_11788 < inst_11787);var inst_11791 = inst_11790;var state_11833__$1 = state_11833;if(cljs.core.truth_(inst_11791))
{var statearr_11867_11898 = state_11833__$1;(statearr_11867_11898[(1)] = (10));
} else
{var statearr_11868_11899 = state_11833__$1;(statearr_11868_11899[(1)] = (11));
}
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
});})(c__7126__auto__))
;return ((function (switch__7111__auto__,c__7126__auto__){
return (function() {
var state_machine__7112__auto__ = null;
var state_machine__7112__auto____0 = (function (){var statearr_11872 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_11872[(0)] = state_machine__7112__auto__);
(statearr_11872[(1)] = (1));
return statearr_11872;
});
var state_machine__7112__auto____1 = (function (state_11833){while(true){
var ret_value__7113__auto__ = (function (){try{while(true){
var result__7114__auto__ = switch__7111__auto__.call(null,state_11833);if(cljs.core.keyword_identical_QMARK_.call(null,result__7114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__7114__auto__;
}
break;
}
}catch (e11873){if((e11873 instanceof Object))
{var ex__7115__auto__ = e11873;var statearr_11874_11900 = state_11833;(statearr_11874_11900[(5)] = ex__7115__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11833);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e11873;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7113__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__11901 = state_11833;
state_11833 = G__11901;
continue;
}
} else
{return ret_value__7113__auto__;
}
break;
}
});
state_machine__7112__auto__ = function(state_11833){
switch(arguments.length){
case 0:
return state_machine__7112__auto____0.call(this);
case 1:
return state_machine__7112__auto____1.call(this,state_11833);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__7112__auto____0;
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__7112__auto____1;
return state_machine__7112__auto__;
})()
;})(switch__7111__auto__,c__7126__auto__))
})();var state__7128__auto__ = (function (){var statearr_11875 = f__7127__auto__.call(null);(statearr_11875[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7126__auto__);
return statearr_11875;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7128__auto__);
});})(c__7126__auto__))
);
return c__7126__auto__;
});
/**
* Takes a function and a source channel, and returns a channel which
* contains the values in each collection produced by applying f to
* each value taken from the source channel. f must return a
* collection.
* 
* The returned channel will be unbuffered by default, or a buf-or-n
* can be supplied. The channel will close when the source channel
* closes.
*/
cljs.core.async.mapcat_LT_ = (function() {
var mapcat_LT_ = null;
var mapcat_LT___2 = (function (f,in$){return mapcat_LT_.call(null,f,in$,null);
});
var mapcat_LT___3 = (function (f,in$,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);cljs.core.async.mapcat_STAR_.call(null,f,in$,out);
return out;
});
mapcat_LT_ = function(f,in$,buf_or_n){
switch(arguments.length){
case 2:
return mapcat_LT___2.call(this,f,in$);
case 3:
return mapcat_LT___3.call(this,f,in$,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = mapcat_LT___2;
mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = mapcat_LT___3;
return mapcat_LT_;
})()
;
/**
* Takes a function and a target channel, and returns a channel which
* applies f to each value put, then supplies each element of the result
* to the target channel. f must return a collection.
* 
* The returned channel will be unbuffered by default, or a buf-or-n
* can be supplied. The target channel will be closed when the source
* channel closes.
*/
cljs.core.async.mapcat_GT_ = (function() {
var mapcat_GT_ = null;
var mapcat_GT___2 = (function (f,out){return mapcat_GT_.call(null,f,out,null);
});
var mapcat_GT___3 = (function (f,out,buf_or_n){var in$ = cljs.core.async.chan.call(null,buf_or_n);cljs.core.async.mapcat_STAR_.call(null,f,in$,out);
return in$;
});
mapcat_GT_ = function(f,out,buf_or_n){
switch(arguments.length){
case 2:
return mapcat_GT___2.call(this,f,out);
case 3:
return mapcat_GT___3.call(this,f,out,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = mapcat_GT___2;
mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = mapcat_GT___3;
return mapcat_GT_;
})()
;
/**
* Takes elements from the from channel and supplies them to the to
* channel. By default, the to channel will be closed when the from
* channel closes, but can be determined by the close?  parameter. Will
* stop consuming the from channel if the to channel closes
*/
cljs.core.async.pipe = (function() {
var pipe = null;
var pipe__2 = (function (from,to){return pipe.call(null,from,to,true);
});
var pipe__3 = (function (from,to,close_QMARK_){var c__7126__auto___11996 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__7126__auto___11996){
return (function (){var f__7127__auto__ = (function (){var switch__7111__auto__ = ((function (c__7126__auto___11996){
return (function (state_11972){var state_val_11973 = (state_11972[(1)]);if((state_val_11973 === (7)))
{var inst_11968 = (state_11972[(2)]);var state_11972__$1 = state_11972;var statearr_11974_11997 = state_11972__$1;(statearr_11974_11997[(2)] = inst_11968);
(statearr_11974_11997[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11973 === (1)))
{var state_11972__$1 = state_11972;var statearr_11975_11998 = state_11972__$1;(statearr_11975_11998[(2)] = null);
(statearr_11975_11998[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11973 === (4)))
{var inst_11951 = (state_11972[(7)]);var inst_11951__$1 = (state_11972[(2)]);var inst_11952 = (inst_11951__$1 == null);var state_11972__$1 = (function (){var statearr_11976 = state_11972;(statearr_11976[(7)] = inst_11951__$1);
return statearr_11976;
})();if(cljs.core.truth_(inst_11952))
{var statearr_11977_11999 = state_11972__$1;(statearr_11977_11999[(1)] = (5));
} else
{var statearr_11978_12000 = state_11972__$1;(statearr_11978_12000[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11973 === (13)))
{var state_11972__$1 = state_11972;var statearr_11979_12001 = state_11972__$1;(statearr_11979_12001[(2)] = null);
(statearr_11979_12001[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11973 === (6)))
{var inst_11951 = (state_11972[(7)]);var state_11972__$1 = state_11972;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11972__$1,(11),to,inst_11951);
} else
{if((state_val_11973 === (3)))
{var inst_11970 = (state_11972[(2)]);var state_11972__$1 = state_11972;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11972__$1,inst_11970);
} else
{if((state_val_11973 === (12)))
{var state_11972__$1 = state_11972;var statearr_11980_12002 = state_11972__$1;(statearr_11980_12002[(2)] = null);
(statearr_11980_12002[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11973 === (2)))
{var state_11972__$1 = state_11972;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11972__$1,(4),from);
} else
{if((state_val_11973 === (11)))
{var inst_11961 = (state_11972[(2)]);var state_11972__$1 = state_11972;if(cljs.core.truth_(inst_11961))
{var statearr_11981_12003 = state_11972__$1;(statearr_11981_12003[(1)] = (12));
} else
{var statearr_11982_12004 = state_11972__$1;(statearr_11982_12004[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11973 === (9)))
{var state_11972__$1 = state_11972;var statearr_11983_12005 = state_11972__$1;(statearr_11983_12005[(2)] = null);
(statearr_11983_12005[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11973 === (5)))
{var state_11972__$1 = state_11972;if(cljs.core.truth_(close_QMARK_))
{var statearr_11984_12006 = state_11972__$1;(statearr_11984_12006[(1)] = (8));
} else
{var statearr_11985_12007 = state_11972__$1;(statearr_11985_12007[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11973 === (14)))
{var inst_11966 = (state_11972[(2)]);var state_11972__$1 = state_11972;var statearr_11986_12008 = state_11972__$1;(statearr_11986_12008[(2)] = inst_11966);
(statearr_11986_12008[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11973 === (10)))
{var inst_11958 = (state_11972[(2)]);var state_11972__$1 = state_11972;var statearr_11987_12009 = state_11972__$1;(statearr_11987_12009[(2)] = inst_11958);
(statearr_11987_12009[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11973 === (8)))
{var inst_11955 = cljs.core.async.close_BANG_.call(null,to);var state_11972__$1 = state_11972;var statearr_11988_12010 = state_11972__$1;(statearr_11988_12010[(2)] = inst_11955);
(statearr_11988_12010[(1)] = (10));
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
});})(c__7126__auto___11996))
;return ((function (switch__7111__auto__,c__7126__auto___11996){
return (function() {
var state_machine__7112__auto__ = null;
var state_machine__7112__auto____0 = (function (){var statearr_11992 = [null,null,null,null,null,null,null,null];(statearr_11992[(0)] = state_machine__7112__auto__);
(statearr_11992[(1)] = (1));
return statearr_11992;
});
var state_machine__7112__auto____1 = (function (state_11972){while(true){
var ret_value__7113__auto__ = (function (){try{while(true){
var result__7114__auto__ = switch__7111__auto__.call(null,state_11972);if(cljs.core.keyword_identical_QMARK_.call(null,result__7114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__7114__auto__;
}
break;
}
}catch (e11993){if((e11993 instanceof Object))
{var ex__7115__auto__ = e11993;var statearr_11994_12011 = state_11972;(statearr_11994_12011[(5)] = ex__7115__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11972);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e11993;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7113__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12012 = state_11972;
state_11972 = G__12012;
continue;
}
} else
{return ret_value__7113__auto__;
}
break;
}
});
state_machine__7112__auto__ = function(state_11972){
switch(arguments.length){
case 0:
return state_machine__7112__auto____0.call(this);
case 1:
return state_machine__7112__auto____1.call(this,state_11972);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__7112__auto____0;
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__7112__auto____1;
return state_machine__7112__auto__;
})()
;})(switch__7111__auto__,c__7126__auto___11996))
})();var state__7128__auto__ = (function (){var statearr_11995 = f__7127__auto__.call(null);(statearr_11995[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7126__auto___11996);
return statearr_11995;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7128__auto__);
});})(c__7126__auto___11996))
);
return to;
});
pipe = function(from,to,close_QMARK_){
switch(arguments.length){
case 2:
return pipe__2.call(this,from,to);
case 3:
return pipe__3.call(this,from,to,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pipe.cljs$core$IFn$_invoke$arity$2 = pipe__2;
pipe.cljs$core$IFn$_invoke$arity$3 = pipe__3;
return pipe;
})()
;
/**
* Takes a predicate and a source channel and returns a vector of two
* channels, the first of which will contain the values for which the
* predicate returned true, the second those for which it returned
* false.
* 
* The out channels will be unbuffered by default, or two buf-or-ns can
* be supplied. The channels will close after the source channel has
* closed.
*/
cljs.core.async.split = (function() {
var split = null;
var split__2 = (function (p,ch){return split.call(null,p,ch,null,null);
});
var split__4 = (function (p,ch,t_buf_or_n,f_buf_or_n){var tc = cljs.core.async.chan.call(null,t_buf_or_n);var fc = cljs.core.async.chan.call(null,f_buf_or_n);var c__7126__auto___12113 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__7126__auto___12113,tc,fc){
return (function (){var f__7127__auto__ = (function (){var switch__7111__auto__ = ((function (c__7126__auto___12113,tc,fc){
return (function (state_12088){var state_val_12089 = (state_12088[(1)]);if((state_val_12089 === (7)))
{var inst_12084 = (state_12088[(2)]);var state_12088__$1 = state_12088;var statearr_12090_12114 = state_12088__$1;(statearr_12090_12114[(2)] = inst_12084);
(statearr_12090_12114[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12089 === (1)))
{var state_12088__$1 = state_12088;var statearr_12091_12115 = state_12088__$1;(statearr_12091_12115[(2)] = null);
(statearr_12091_12115[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12089 === (4)))
{var inst_12065 = (state_12088[(7)]);var inst_12065__$1 = (state_12088[(2)]);var inst_12066 = (inst_12065__$1 == null);var state_12088__$1 = (function (){var statearr_12092 = state_12088;(statearr_12092[(7)] = inst_12065__$1);
return statearr_12092;
})();if(cljs.core.truth_(inst_12066))
{var statearr_12093_12116 = state_12088__$1;(statearr_12093_12116[(1)] = (5));
} else
{var statearr_12094_12117 = state_12088__$1;(statearr_12094_12117[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12089 === (13)))
{var state_12088__$1 = state_12088;var statearr_12095_12118 = state_12088__$1;(statearr_12095_12118[(2)] = null);
(statearr_12095_12118[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12089 === (6)))
{var inst_12065 = (state_12088[(7)]);var inst_12071 = p.call(null,inst_12065);var state_12088__$1 = state_12088;if(cljs.core.truth_(inst_12071))
{var statearr_12096_12119 = state_12088__$1;(statearr_12096_12119[(1)] = (9));
} else
{var statearr_12097_12120 = state_12088__$1;(statearr_12097_12120[(1)] = (10));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12089 === (3)))
{var inst_12086 = (state_12088[(2)]);var state_12088__$1 = state_12088;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12088__$1,inst_12086);
} else
{if((state_val_12089 === (12)))
{var state_12088__$1 = state_12088;var statearr_12098_12121 = state_12088__$1;(statearr_12098_12121[(2)] = null);
(statearr_12098_12121[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12089 === (2)))
{var state_12088__$1 = state_12088;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12088__$1,(4),ch);
} else
{if((state_val_12089 === (11)))
{var inst_12065 = (state_12088[(7)]);var inst_12075 = (state_12088[(2)]);var state_12088__$1 = state_12088;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12088__$1,(8),inst_12075,inst_12065);
} else
{if((state_val_12089 === (9)))
{var state_12088__$1 = state_12088;var statearr_12099_12122 = state_12088__$1;(statearr_12099_12122[(2)] = tc);
(statearr_12099_12122[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12089 === (5)))
{var inst_12068 = cljs.core.async.close_BANG_.call(null,tc);var inst_12069 = cljs.core.async.close_BANG_.call(null,fc);var state_12088__$1 = (function (){var statearr_12100 = state_12088;(statearr_12100[(8)] = inst_12068);
return statearr_12100;
})();var statearr_12101_12123 = state_12088__$1;(statearr_12101_12123[(2)] = inst_12069);
(statearr_12101_12123[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12089 === (14)))
{var inst_12082 = (state_12088[(2)]);var state_12088__$1 = state_12088;var statearr_12102_12124 = state_12088__$1;(statearr_12102_12124[(2)] = inst_12082);
(statearr_12102_12124[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12089 === (10)))
{var state_12088__$1 = state_12088;var statearr_12103_12125 = state_12088__$1;(statearr_12103_12125[(2)] = fc);
(statearr_12103_12125[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12089 === (8)))
{var inst_12077 = (state_12088[(2)]);var state_12088__$1 = state_12088;if(cljs.core.truth_(inst_12077))
{var statearr_12104_12126 = state_12088__$1;(statearr_12104_12126[(1)] = (12));
} else
{var statearr_12105_12127 = state_12088__$1;(statearr_12105_12127[(1)] = (13));
}
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
});})(c__7126__auto___12113,tc,fc))
;return ((function (switch__7111__auto__,c__7126__auto___12113,tc,fc){
return (function() {
var state_machine__7112__auto__ = null;
var state_machine__7112__auto____0 = (function (){var statearr_12109 = [null,null,null,null,null,null,null,null,null];(statearr_12109[(0)] = state_machine__7112__auto__);
(statearr_12109[(1)] = (1));
return statearr_12109;
});
var state_machine__7112__auto____1 = (function (state_12088){while(true){
var ret_value__7113__auto__ = (function (){try{while(true){
var result__7114__auto__ = switch__7111__auto__.call(null,state_12088);if(cljs.core.keyword_identical_QMARK_.call(null,result__7114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__7114__auto__;
}
break;
}
}catch (e12110){if((e12110 instanceof Object))
{var ex__7115__auto__ = e12110;var statearr_12111_12128 = state_12088;(statearr_12111_12128[(5)] = ex__7115__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12088);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12110;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7113__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12129 = state_12088;
state_12088 = G__12129;
continue;
}
} else
{return ret_value__7113__auto__;
}
break;
}
});
state_machine__7112__auto__ = function(state_12088){
switch(arguments.length){
case 0:
return state_machine__7112__auto____0.call(this);
case 1:
return state_machine__7112__auto____1.call(this,state_12088);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__7112__auto____0;
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__7112__auto____1;
return state_machine__7112__auto__;
})()
;})(switch__7111__auto__,c__7126__auto___12113,tc,fc))
})();var state__7128__auto__ = (function (){var statearr_12112 = f__7127__auto__.call(null);(statearr_12112[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7126__auto___12113);
return statearr_12112;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7128__auto__);
});})(c__7126__auto___12113,tc,fc))
);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});
split = function(p,ch,t_buf_or_n,f_buf_or_n){
switch(arguments.length){
case 2:
return split__2.call(this,p,ch);
case 4:
return split__4.call(this,p,ch,t_buf_or_n,f_buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
split.cljs$core$IFn$_invoke$arity$2 = split__2;
split.cljs$core$IFn$_invoke$arity$4 = split__4;
return split;
})()
;
/**
* f should be a function of 2 arguments. Returns a channel containing
* the single result of applying f to init and the first item from the
* channel, then applying f to that result and the 2nd item, etc. If
* the channel closes without yielding items, returns init and f is not
* called. ch must close before reduce produces a result.
*/
cljs.core.async.reduce = (function reduce(f,init,ch){var c__7126__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__7126__auto__){
return (function (){var f__7127__auto__ = (function (){var switch__7111__auto__ = ((function (c__7126__auto__){
return (function (state_12176){var state_val_12177 = (state_12176[(1)]);if((state_val_12177 === (7)))
{var inst_12172 = (state_12176[(2)]);var state_12176__$1 = state_12176;var statearr_12178_12194 = state_12176__$1;(statearr_12178_12194[(2)] = inst_12172);
(statearr_12178_12194[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12177 === (6)))
{var inst_12165 = (state_12176[(7)]);var inst_12162 = (state_12176[(8)]);var inst_12169 = f.call(null,inst_12162,inst_12165);var inst_12162__$1 = inst_12169;var state_12176__$1 = (function (){var statearr_12179 = state_12176;(statearr_12179[(8)] = inst_12162__$1);
return statearr_12179;
})();var statearr_12180_12195 = state_12176__$1;(statearr_12180_12195[(2)] = null);
(statearr_12180_12195[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12177 === (5)))
{var inst_12162 = (state_12176[(8)]);var state_12176__$1 = state_12176;var statearr_12181_12196 = state_12176__$1;(statearr_12181_12196[(2)] = inst_12162);
(statearr_12181_12196[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12177 === (4)))
{var inst_12165 = (state_12176[(7)]);var inst_12165__$1 = (state_12176[(2)]);var inst_12166 = (inst_12165__$1 == null);var state_12176__$1 = (function (){var statearr_12182 = state_12176;(statearr_12182[(7)] = inst_12165__$1);
return statearr_12182;
})();if(cljs.core.truth_(inst_12166))
{var statearr_12183_12197 = state_12176__$1;(statearr_12183_12197[(1)] = (5));
} else
{var statearr_12184_12198 = state_12176__$1;(statearr_12184_12198[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12177 === (3)))
{var inst_12174 = (state_12176[(2)]);var state_12176__$1 = state_12176;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12176__$1,inst_12174);
} else
{if((state_val_12177 === (2)))
{var state_12176__$1 = state_12176;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12176__$1,(4),ch);
} else
{if((state_val_12177 === (1)))
{var inst_12162 = init;var state_12176__$1 = (function (){var statearr_12185 = state_12176;(statearr_12185[(8)] = inst_12162);
return statearr_12185;
})();var statearr_12186_12199 = state_12176__$1;(statearr_12186_12199[(2)] = null);
(statearr_12186_12199[(1)] = (2));
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
});})(c__7126__auto__))
;return ((function (switch__7111__auto__,c__7126__auto__){
return (function() {
var state_machine__7112__auto__ = null;
var state_machine__7112__auto____0 = (function (){var statearr_12190 = [null,null,null,null,null,null,null,null,null];(statearr_12190[(0)] = state_machine__7112__auto__);
(statearr_12190[(1)] = (1));
return statearr_12190;
});
var state_machine__7112__auto____1 = (function (state_12176){while(true){
var ret_value__7113__auto__ = (function (){try{while(true){
var result__7114__auto__ = switch__7111__auto__.call(null,state_12176);if(cljs.core.keyword_identical_QMARK_.call(null,result__7114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__7114__auto__;
}
break;
}
}catch (e12191){if((e12191 instanceof Object))
{var ex__7115__auto__ = e12191;var statearr_12192_12200 = state_12176;(statearr_12192_12200[(5)] = ex__7115__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12176);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12191;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7113__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12201 = state_12176;
state_12176 = G__12201;
continue;
}
} else
{return ret_value__7113__auto__;
}
break;
}
});
state_machine__7112__auto__ = function(state_12176){
switch(arguments.length){
case 0:
return state_machine__7112__auto____0.call(this);
case 1:
return state_machine__7112__auto____1.call(this,state_12176);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__7112__auto____0;
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__7112__auto____1;
return state_machine__7112__auto__;
})()
;})(switch__7111__auto__,c__7126__auto__))
})();var state__7128__auto__ = (function (){var statearr_12193 = f__7127__auto__.call(null);(statearr_12193[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7126__auto__);
return statearr_12193;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7128__auto__);
});})(c__7126__auto__))
);
return c__7126__auto__;
});
/**
* Puts the contents of coll into the supplied channel.
* 
* By default the channel will be closed after the items are copied,
* but can be determined by the close? parameter.
* 
* Returns a channel which will close after the items are copied.
*/
cljs.core.async.onto_chan = (function() {
var onto_chan = null;
var onto_chan__2 = (function (ch,coll){return onto_chan.call(null,ch,coll,true);
});
var onto_chan__3 = (function (ch,coll,close_QMARK_){var c__7126__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__7126__auto__){
return (function (){var f__7127__auto__ = (function (){var switch__7111__auto__ = ((function (c__7126__auto__){
return (function (state_12275){var state_val_12276 = (state_12275[(1)]);if((state_val_12276 === (7)))
{var inst_12257 = (state_12275[(2)]);var state_12275__$1 = state_12275;var statearr_12277_12300 = state_12275__$1;(statearr_12277_12300[(2)] = inst_12257);
(statearr_12277_12300[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12276 === (1)))
{var inst_12251 = cljs.core.seq.call(null,coll);var inst_12252 = inst_12251;var state_12275__$1 = (function (){var statearr_12278 = state_12275;(statearr_12278[(7)] = inst_12252);
return statearr_12278;
})();var statearr_12279_12301 = state_12275__$1;(statearr_12279_12301[(2)] = null);
(statearr_12279_12301[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12276 === (4)))
{var inst_12252 = (state_12275[(7)]);var inst_12255 = cljs.core.first.call(null,inst_12252);var state_12275__$1 = state_12275;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12275__$1,(7),ch,inst_12255);
} else
{if((state_val_12276 === (13)))
{var inst_12269 = (state_12275[(2)]);var state_12275__$1 = state_12275;var statearr_12280_12302 = state_12275__$1;(statearr_12280_12302[(2)] = inst_12269);
(statearr_12280_12302[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12276 === (6)))
{var inst_12260 = (state_12275[(2)]);var state_12275__$1 = state_12275;if(cljs.core.truth_(inst_12260))
{var statearr_12281_12303 = state_12275__$1;(statearr_12281_12303[(1)] = (8));
} else
{var statearr_12282_12304 = state_12275__$1;(statearr_12282_12304[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12276 === (3)))
{var inst_12273 = (state_12275[(2)]);var state_12275__$1 = state_12275;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12275__$1,inst_12273);
} else
{if((state_val_12276 === (12)))
{var state_12275__$1 = state_12275;var statearr_12283_12305 = state_12275__$1;(statearr_12283_12305[(2)] = null);
(statearr_12283_12305[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12276 === (2)))
{var inst_12252 = (state_12275[(7)]);var state_12275__$1 = state_12275;if(cljs.core.truth_(inst_12252))
{var statearr_12284_12306 = state_12275__$1;(statearr_12284_12306[(1)] = (4));
} else
{var statearr_12285_12307 = state_12275__$1;(statearr_12285_12307[(1)] = (5));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12276 === (11)))
{var inst_12266 = cljs.core.async.close_BANG_.call(null,ch);var state_12275__$1 = state_12275;var statearr_12286_12308 = state_12275__$1;(statearr_12286_12308[(2)] = inst_12266);
(statearr_12286_12308[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12276 === (9)))
{var state_12275__$1 = state_12275;if(cljs.core.truth_(close_QMARK_))
{var statearr_12287_12309 = state_12275__$1;(statearr_12287_12309[(1)] = (11));
} else
{var statearr_12288_12310 = state_12275__$1;(statearr_12288_12310[(1)] = (12));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12276 === (5)))
{var inst_12252 = (state_12275[(7)]);var state_12275__$1 = state_12275;var statearr_12289_12311 = state_12275__$1;(statearr_12289_12311[(2)] = inst_12252);
(statearr_12289_12311[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12276 === (10)))
{var inst_12271 = (state_12275[(2)]);var state_12275__$1 = state_12275;var statearr_12290_12312 = state_12275__$1;(statearr_12290_12312[(2)] = inst_12271);
(statearr_12290_12312[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12276 === (8)))
{var inst_12252 = (state_12275[(7)]);var inst_12262 = cljs.core.next.call(null,inst_12252);var inst_12252__$1 = inst_12262;var state_12275__$1 = (function (){var statearr_12291 = state_12275;(statearr_12291[(7)] = inst_12252__$1);
return statearr_12291;
})();var statearr_12292_12313 = state_12275__$1;(statearr_12292_12313[(2)] = null);
(statearr_12292_12313[(1)] = (2));
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
});})(c__7126__auto__))
;return ((function (switch__7111__auto__,c__7126__auto__){
return (function() {
var state_machine__7112__auto__ = null;
var state_machine__7112__auto____0 = (function (){var statearr_12296 = [null,null,null,null,null,null,null,null];(statearr_12296[(0)] = state_machine__7112__auto__);
(statearr_12296[(1)] = (1));
return statearr_12296;
});
var state_machine__7112__auto____1 = (function (state_12275){while(true){
var ret_value__7113__auto__ = (function (){try{while(true){
var result__7114__auto__ = switch__7111__auto__.call(null,state_12275);if(cljs.core.keyword_identical_QMARK_.call(null,result__7114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__7114__auto__;
}
break;
}
}catch (e12297){if((e12297 instanceof Object))
{var ex__7115__auto__ = e12297;var statearr_12298_12314 = state_12275;(statearr_12298_12314[(5)] = ex__7115__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12275);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12297;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7113__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12315 = state_12275;
state_12275 = G__12315;
continue;
}
} else
{return ret_value__7113__auto__;
}
break;
}
});
state_machine__7112__auto__ = function(state_12275){
switch(arguments.length){
case 0:
return state_machine__7112__auto____0.call(this);
case 1:
return state_machine__7112__auto____1.call(this,state_12275);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__7112__auto____0;
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__7112__auto____1;
return state_machine__7112__auto__;
})()
;})(switch__7111__auto__,c__7126__auto__))
})();var state__7128__auto__ = (function (){var statearr_12299 = f__7127__auto__.call(null);(statearr_12299[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7126__auto__);
return statearr_12299;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7128__auto__);
});})(c__7126__auto__))
);
return c__7126__auto__;
});
onto_chan = function(ch,coll,close_QMARK_){
switch(arguments.length){
case 2:
return onto_chan__2.call(this,ch,coll);
case 3:
return onto_chan__3.call(this,ch,coll,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
onto_chan.cljs$core$IFn$_invoke$arity$2 = onto_chan__2;
onto_chan.cljs$core$IFn$_invoke$arity$3 = onto_chan__3;
return onto_chan;
})()
;
/**
* Creates and returns a channel which contains the contents of coll,
* closing when exhausted.
*/
cljs.core.async.to_chan = (function to_chan(coll){var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));cljs.core.async.onto_chan.call(null,ch,coll);
return ch;
});
cljs.core.async.Mux = (function (){var obj12317 = {};return obj12317;
})();
cljs.core.async.muxch_STAR_ = (function muxch_STAR_(_){if((function (){var and__3614__auto__ = _;if(and__3614__auto__)
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1;
} else
{return and__3614__auto__;
}
})())
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else
{var x__4262__auto__ = (((_ == null))?null:_);return (function (){var or__3626__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__4262__auto__)]);if(or__3626__auto__)
{return or__3626__auto__;
} else
{var or__3626__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);if(or__3626__auto____$1)
{return or__3626__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
})().call(null,_);
}
});
cljs.core.async.Mult = (function (){var obj12319 = {};return obj12319;
})();
cljs.core.async.tap_STAR_ = (function tap_STAR_(m,ch,close_QMARK_){if((function (){var and__3614__auto__ = m;if(and__3614__auto__)
{return m.cljs$core$async$Mult$tap_STAR_$arity$3;
} else
{return and__3614__auto__;
}
})())
{return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else
{var x__4262__auto__ = (((m == null))?null:m);return (function (){var or__3626__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__4262__auto__)]);if(or__3626__auto__)
{return or__3626__auto__;
} else
{var or__3626__auto____$1 = (cljs.core.async.tap_STAR_["_"]);if(or__3626__auto____$1)
{return or__3626__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
})().call(null,m,ch,close_QMARK_);
}
});
cljs.core.async.untap_STAR_ = (function untap_STAR_(m,ch){if((function (){var and__3614__auto__ = m;if(and__3614__auto__)
{return m.cljs$core$async$Mult$untap_STAR_$arity$2;
} else
{return and__3614__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else
{var x__4262__auto__ = (((m == null))?null:m);return (function (){var or__3626__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__4262__auto__)]);if(or__3626__auto__)
{return or__3626__auto__;
} else
{var or__3626__auto____$1 = (cljs.core.async.untap_STAR_["_"]);if(or__3626__auto____$1)
{return or__3626__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.untap_all_STAR_ = (function untap_all_STAR_(m){if((function (){var and__3614__auto__ = m;if(and__3614__auto__)
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1;
} else
{return and__3614__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else
{var x__4262__auto__ = (((m == null))?null:m);return (function (){var or__3626__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__4262__auto__)]);if(or__3626__auto__)
{return or__3626__auto__;
} else
{var or__3626__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);if(or__3626__auto____$1)
{return or__3626__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
})().call(null,m);
}
});
/**
* Creates and returns a mult(iple) of the supplied channel. Channels
* containing copies of the channel can be created with 'tap', and
* detached with 'untap'.
* 
* Each item is distributed to all taps in parallel and synchronously,
* i.e. each tap must accept before the next item is distributed. Use
* buffering/windowing to prevent slow taps from holding up the mult.
* 
* Items received when there are no taps get dropped.
* 
* If a tap puts to a closed channel, it will be removed from the mult.
*/
cljs.core.async.mult = (function mult(ch){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var m = (function (){if(typeof cljs.core.async.t12541 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t12541 = (function (cs,ch,mult,meta12542){
this.cs = cs;
this.ch = ch;
this.mult = mult;
this.meta12542 = meta12542;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t12541.cljs$lang$type = true;
cljs.core.async.t12541.cljs$lang$ctorStr = "cljs.core.async/t12541";
cljs.core.async.t12541.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__4202__auto__,writer__4203__auto__,opt__4204__auto__){return cljs.core._write.call(null,writer__4203__auto__,"cljs.core.async/t12541");
});})(cs))
;
cljs.core.async.t12541.prototype.cljs$core$async$Mult$ = true;
cljs.core.async.t12541.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$2,close_QMARK_){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$2,close_QMARK_);
return null;
});})(cs))
;
cljs.core.async.t12541.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$2){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$2);
return null;
});})(cs))
;
cljs.core.async.t12541.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return null;
});})(cs))
;
cljs.core.async.t12541.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t12541.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(cs))
;
cljs.core.async.t12541.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_12543){var self__ = this;
var _12543__$1 = this;return self__.meta12542;
});})(cs))
;
cljs.core.async.t12541.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_12543,meta12542__$1){var self__ = this;
var _12543__$1 = this;return (new cljs.core.async.t12541(self__.cs,self__.ch,self__.mult,meta12542__$1));
});})(cs))
;
cljs.core.async.__GT_t12541 = ((function (cs){
return (function __GT_t12541(cs__$1,ch__$1,mult__$1,meta12542){return (new cljs.core.async.t12541(cs__$1,ch__$1,mult__$1,meta12542));
});})(cs))
;
}
return (new cljs.core.async.t12541(cs,ch,mult,null));
})();var dchan = cljs.core.async.chan.call(null,(1));var dctr = cljs.core.atom.call(null,null);var done = ((function (cs,m,dchan,dctr){
return (function (_){if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0)))
{return cljs.core.async.put_BANG_.call(null,dchan,true);
} else
{return null;
}
});})(cs,m,dchan,dctr))
;var c__7126__auto___12762 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__7126__auto___12762,cs,m,dchan,dctr,done){
return (function (){var f__7127__auto__ = (function (){var switch__7111__auto__ = ((function (c__7126__auto___12762,cs,m,dchan,dctr,done){
return (function (state_12674){var state_val_12675 = (state_12674[(1)]);if((state_val_12675 === (7)))
{var inst_12670 = (state_12674[(2)]);var state_12674__$1 = state_12674;var statearr_12676_12763 = state_12674__$1;(statearr_12676_12763[(2)] = inst_12670);
(statearr_12676_12763[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (20)))
{var inst_12575 = (state_12674[(7)]);var inst_12585 = cljs.core.first.call(null,inst_12575);var inst_12586 = cljs.core.nth.call(null,inst_12585,(0),null);var inst_12587 = cljs.core.nth.call(null,inst_12585,(1),null);var state_12674__$1 = (function (){var statearr_12677 = state_12674;(statearr_12677[(8)] = inst_12586);
return statearr_12677;
})();if(cljs.core.truth_(inst_12587))
{var statearr_12678_12764 = state_12674__$1;(statearr_12678_12764[(1)] = (22));
} else
{var statearr_12679_12765 = state_12674__$1;(statearr_12679_12765[(1)] = (23));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (27)))
{var inst_12615 = (state_12674[(9)]);var inst_12546 = (state_12674[(10)]);var inst_12617 = (state_12674[(11)]);var inst_12622 = (state_12674[(12)]);var inst_12622__$1 = cljs.core._nth.call(null,inst_12615,inst_12617);var inst_12623 = cljs.core.async.put_BANG_.call(null,inst_12622__$1,inst_12546,done);var state_12674__$1 = (function (){var statearr_12680 = state_12674;(statearr_12680[(12)] = inst_12622__$1);
return statearr_12680;
})();if(cljs.core.truth_(inst_12623))
{var statearr_12681_12766 = state_12674__$1;(statearr_12681_12766[(1)] = (30));
} else
{var statearr_12682_12767 = state_12674__$1;(statearr_12682_12767[(1)] = (31));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (1)))
{var state_12674__$1 = state_12674;var statearr_12683_12768 = state_12674__$1;(statearr_12683_12768[(2)] = null);
(statearr_12683_12768[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (24)))
{var inst_12575 = (state_12674[(7)]);var inst_12592 = (state_12674[(2)]);var inst_12593 = cljs.core.next.call(null,inst_12575);var inst_12555 = inst_12593;var inst_12556 = null;var inst_12557 = (0);var inst_12558 = (0);var state_12674__$1 = (function (){var statearr_12684 = state_12674;(statearr_12684[(13)] = inst_12556);
(statearr_12684[(14)] = inst_12555);
(statearr_12684[(15)] = inst_12558);
(statearr_12684[(16)] = inst_12557);
(statearr_12684[(17)] = inst_12592);
return statearr_12684;
})();var statearr_12685_12769 = state_12674__$1;(statearr_12685_12769[(2)] = null);
(statearr_12685_12769[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (39)))
{var state_12674__$1 = state_12674;var statearr_12689_12770 = state_12674__$1;(statearr_12689_12770[(2)] = null);
(statearr_12689_12770[(1)] = (41));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (4)))
{var inst_12546 = (state_12674[(10)]);var inst_12546__$1 = (state_12674[(2)]);var inst_12547 = (inst_12546__$1 == null);var state_12674__$1 = (function (){var statearr_12690 = state_12674;(statearr_12690[(10)] = inst_12546__$1);
return statearr_12690;
})();if(cljs.core.truth_(inst_12547))
{var statearr_12691_12771 = state_12674__$1;(statearr_12691_12771[(1)] = (5));
} else
{var statearr_12692_12772 = state_12674__$1;(statearr_12692_12772[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (15)))
{var inst_12556 = (state_12674[(13)]);var inst_12555 = (state_12674[(14)]);var inst_12558 = (state_12674[(15)]);var inst_12557 = (state_12674[(16)]);var inst_12571 = (state_12674[(2)]);var inst_12572 = (inst_12558 + (1));var tmp12686 = inst_12556;var tmp12687 = inst_12555;var tmp12688 = inst_12557;var inst_12555__$1 = tmp12687;var inst_12556__$1 = tmp12686;var inst_12557__$1 = tmp12688;var inst_12558__$1 = inst_12572;var state_12674__$1 = (function (){var statearr_12693 = state_12674;(statearr_12693[(13)] = inst_12556__$1);
(statearr_12693[(14)] = inst_12555__$1);
(statearr_12693[(15)] = inst_12558__$1);
(statearr_12693[(18)] = inst_12571);
(statearr_12693[(16)] = inst_12557__$1);
return statearr_12693;
})();var statearr_12694_12773 = state_12674__$1;(statearr_12694_12773[(2)] = null);
(statearr_12694_12773[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (21)))
{var inst_12596 = (state_12674[(2)]);var state_12674__$1 = state_12674;var statearr_12698_12774 = state_12674__$1;(statearr_12698_12774[(2)] = inst_12596);
(statearr_12698_12774[(1)] = (18));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (31)))
{var inst_12622 = (state_12674[(12)]);var inst_12626 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var inst_12627 = cljs.core.async.untap_STAR_.call(null,m,inst_12622);var state_12674__$1 = (function (){var statearr_12699 = state_12674;(statearr_12699[(19)] = inst_12626);
return statearr_12699;
})();var statearr_12700_12775 = state_12674__$1;(statearr_12700_12775[(2)] = inst_12627);
(statearr_12700_12775[(1)] = (32));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (32)))
{var inst_12615 = (state_12674[(9)]);var inst_12614 = (state_12674[(20)]);var inst_12617 = (state_12674[(11)]);var inst_12616 = (state_12674[(21)]);var inst_12629 = (state_12674[(2)]);var inst_12630 = (inst_12617 + (1));var tmp12695 = inst_12615;var tmp12696 = inst_12614;var tmp12697 = inst_12616;var inst_12614__$1 = tmp12696;var inst_12615__$1 = tmp12695;var inst_12616__$1 = tmp12697;var inst_12617__$1 = inst_12630;var state_12674__$1 = (function (){var statearr_12701 = state_12674;(statearr_12701[(9)] = inst_12615__$1);
(statearr_12701[(20)] = inst_12614__$1);
(statearr_12701[(11)] = inst_12617__$1);
(statearr_12701[(21)] = inst_12616__$1);
(statearr_12701[(22)] = inst_12629);
return statearr_12701;
})();var statearr_12702_12776 = state_12674__$1;(statearr_12702_12776[(2)] = null);
(statearr_12702_12776[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (40)))
{var inst_12642 = (state_12674[(23)]);var inst_12646 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var inst_12647 = cljs.core.async.untap_STAR_.call(null,m,inst_12642);var state_12674__$1 = (function (){var statearr_12703 = state_12674;(statearr_12703[(24)] = inst_12646);
return statearr_12703;
})();var statearr_12704_12777 = state_12674__$1;(statearr_12704_12777[(2)] = inst_12647);
(statearr_12704_12777[(1)] = (41));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (33)))
{var inst_12633 = (state_12674[(25)]);var inst_12635 = cljs.core.chunked_seq_QMARK_.call(null,inst_12633);var state_12674__$1 = state_12674;if(inst_12635)
{var statearr_12705_12778 = state_12674__$1;(statearr_12705_12778[(1)] = (36));
} else
{var statearr_12706_12779 = state_12674__$1;(statearr_12706_12779[(1)] = (37));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (13)))
{var inst_12565 = (state_12674[(26)]);var inst_12568 = cljs.core.async.close_BANG_.call(null,inst_12565);var state_12674__$1 = state_12674;var statearr_12707_12780 = state_12674__$1;(statearr_12707_12780[(2)] = inst_12568);
(statearr_12707_12780[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (22)))
{var inst_12586 = (state_12674[(8)]);var inst_12589 = cljs.core.async.close_BANG_.call(null,inst_12586);var state_12674__$1 = state_12674;var statearr_12708_12781 = state_12674__$1;(statearr_12708_12781[(2)] = inst_12589);
(statearr_12708_12781[(1)] = (24));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (36)))
{var inst_12633 = (state_12674[(25)]);var inst_12637 = cljs.core.chunk_first.call(null,inst_12633);var inst_12638 = cljs.core.chunk_rest.call(null,inst_12633);var inst_12639 = cljs.core.count.call(null,inst_12637);var inst_12614 = inst_12638;var inst_12615 = inst_12637;var inst_12616 = inst_12639;var inst_12617 = (0);var state_12674__$1 = (function (){var statearr_12709 = state_12674;(statearr_12709[(9)] = inst_12615);
(statearr_12709[(20)] = inst_12614);
(statearr_12709[(11)] = inst_12617);
(statearr_12709[(21)] = inst_12616);
return statearr_12709;
})();var statearr_12710_12782 = state_12674__$1;(statearr_12710_12782[(2)] = null);
(statearr_12710_12782[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (41)))
{var inst_12633 = (state_12674[(25)]);var inst_12649 = (state_12674[(2)]);var inst_12650 = cljs.core.next.call(null,inst_12633);var inst_12614 = inst_12650;var inst_12615 = null;var inst_12616 = (0);var inst_12617 = (0);var state_12674__$1 = (function (){var statearr_12711 = state_12674;(statearr_12711[(9)] = inst_12615);
(statearr_12711[(20)] = inst_12614);
(statearr_12711[(11)] = inst_12617);
(statearr_12711[(27)] = inst_12649);
(statearr_12711[(21)] = inst_12616);
return statearr_12711;
})();var statearr_12712_12783 = state_12674__$1;(statearr_12712_12783[(2)] = null);
(statearr_12712_12783[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (43)))
{var state_12674__$1 = state_12674;var statearr_12713_12784 = state_12674__$1;(statearr_12713_12784[(2)] = null);
(statearr_12713_12784[(1)] = (44));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (29)))
{var inst_12658 = (state_12674[(2)]);var state_12674__$1 = state_12674;var statearr_12714_12785 = state_12674__$1;(statearr_12714_12785[(2)] = inst_12658);
(statearr_12714_12785[(1)] = (26));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (44)))
{var inst_12667 = (state_12674[(2)]);var state_12674__$1 = (function (){var statearr_12715 = state_12674;(statearr_12715[(28)] = inst_12667);
return statearr_12715;
})();var statearr_12716_12786 = state_12674__$1;(statearr_12716_12786[(2)] = null);
(statearr_12716_12786[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (6)))
{var inst_12606 = (state_12674[(29)]);var inst_12605 = cljs.core.deref.call(null,cs);var inst_12606__$1 = cljs.core.keys.call(null,inst_12605);var inst_12607 = cljs.core.count.call(null,inst_12606__$1);var inst_12608 = cljs.core.reset_BANG_.call(null,dctr,inst_12607);var inst_12613 = cljs.core.seq.call(null,inst_12606__$1);var inst_12614 = inst_12613;var inst_12615 = null;var inst_12616 = (0);var inst_12617 = (0);var state_12674__$1 = (function (){var statearr_12717 = state_12674;(statearr_12717[(9)] = inst_12615);
(statearr_12717[(30)] = inst_12608);
(statearr_12717[(20)] = inst_12614);
(statearr_12717[(11)] = inst_12617);
(statearr_12717[(29)] = inst_12606__$1);
(statearr_12717[(21)] = inst_12616);
return statearr_12717;
})();var statearr_12718_12787 = state_12674__$1;(statearr_12718_12787[(2)] = null);
(statearr_12718_12787[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (28)))
{var inst_12614 = (state_12674[(20)]);var inst_12633 = (state_12674[(25)]);var inst_12633__$1 = cljs.core.seq.call(null,inst_12614);var state_12674__$1 = (function (){var statearr_12719 = state_12674;(statearr_12719[(25)] = inst_12633__$1);
return statearr_12719;
})();if(inst_12633__$1)
{var statearr_12720_12788 = state_12674__$1;(statearr_12720_12788[(1)] = (33));
} else
{var statearr_12721_12789 = state_12674__$1;(statearr_12721_12789[(1)] = (34));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (25)))
{var inst_12617 = (state_12674[(11)]);var inst_12616 = (state_12674[(21)]);var inst_12619 = (inst_12617 < inst_12616);var inst_12620 = inst_12619;var state_12674__$1 = state_12674;if(cljs.core.truth_(inst_12620))
{var statearr_12722_12790 = state_12674__$1;(statearr_12722_12790[(1)] = (27));
} else
{var statearr_12723_12791 = state_12674__$1;(statearr_12723_12791[(1)] = (28));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (34)))
{var state_12674__$1 = state_12674;var statearr_12724_12792 = state_12674__$1;(statearr_12724_12792[(2)] = null);
(statearr_12724_12792[(1)] = (35));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (17)))
{var state_12674__$1 = state_12674;var statearr_12725_12793 = state_12674__$1;(statearr_12725_12793[(2)] = null);
(statearr_12725_12793[(1)] = (18));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (3)))
{var inst_12672 = (state_12674[(2)]);var state_12674__$1 = state_12674;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12674__$1,inst_12672);
} else
{if((state_val_12675 === (12)))
{var inst_12601 = (state_12674[(2)]);var state_12674__$1 = state_12674;var statearr_12726_12794 = state_12674__$1;(statearr_12726_12794[(2)] = inst_12601);
(statearr_12726_12794[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (2)))
{var state_12674__$1 = state_12674;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12674__$1,(4),ch);
} else
{if((state_val_12675 === (23)))
{var state_12674__$1 = state_12674;var statearr_12727_12795 = state_12674__$1;(statearr_12727_12795[(2)] = null);
(statearr_12727_12795[(1)] = (24));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (35)))
{var inst_12656 = (state_12674[(2)]);var state_12674__$1 = state_12674;var statearr_12728_12796 = state_12674__$1;(statearr_12728_12796[(2)] = inst_12656);
(statearr_12728_12796[(1)] = (29));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (19)))
{var inst_12575 = (state_12674[(7)]);var inst_12579 = cljs.core.chunk_first.call(null,inst_12575);var inst_12580 = cljs.core.chunk_rest.call(null,inst_12575);var inst_12581 = cljs.core.count.call(null,inst_12579);var inst_12555 = inst_12580;var inst_12556 = inst_12579;var inst_12557 = inst_12581;var inst_12558 = (0);var state_12674__$1 = (function (){var statearr_12729 = state_12674;(statearr_12729[(13)] = inst_12556);
(statearr_12729[(14)] = inst_12555);
(statearr_12729[(15)] = inst_12558);
(statearr_12729[(16)] = inst_12557);
return statearr_12729;
})();var statearr_12730_12797 = state_12674__$1;(statearr_12730_12797[(2)] = null);
(statearr_12730_12797[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (11)))
{var inst_12555 = (state_12674[(14)]);var inst_12575 = (state_12674[(7)]);var inst_12575__$1 = cljs.core.seq.call(null,inst_12555);var state_12674__$1 = (function (){var statearr_12731 = state_12674;(statearr_12731[(7)] = inst_12575__$1);
return statearr_12731;
})();if(inst_12575__$1)
{var statearr_12732_12798 = state_12674__$1;(statearr_12732_12798[(1)] = (16));
} else
{var statearr_12733_12799 = state_12674__$1;(statearr_12733_12799[(1)] = (17));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (9)))
{var inst_12603 = (state_12674[(2)]);var state_12674__$1 = state_12674;var statearr_12734_12800 = state_12674__$1;(statearr_12734_12800[(2)] = inst_12603);
(statearr_12734_12800[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (5)))
{var inst_12553 = cljs.core.deref.call(null,cs);var inst_12554 = cljs.core.seq.call(null,inst_12553);var inst_12555 = inst_12554;var inst_12556 = null;var inst_12557 = (0);var inst_12558 = (0);var state_12674__$1 = (function (){var statearr_12735 = state_12674;(statearr_12735[(13)] = inst_12556);
(statearr_12735[(14)] = inst_12555);
(statearr_12735[(15)] = inst_12558);
(statearr_12735[(16)] = inst_12557);
return statearr_12735;
})();var statearr_12736_12801 = state_12674__$1;(statearr_12736_12801[(2)] = null);
(statearr_12736_12801[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (14)))
{var state_12674__$1 = state_12674;var statearr_12737_12802 = state_12674__$1;(statearr_12737_12802[(2)] = null);
(statearr_12737_12802[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (45)))
{var inst_12664 = (state_12674[(2)]);var state_12674__$1 = state_12674;var statearr_12738_12803 = state_12674__$1;(statearr_12738_12803[(2)] = inst_12664);
(statearr_12738_12803[(1)] = (44));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (26)))
{var inst_12606 = (state_12674[(29)]);var inst_12660 = (state_12674[(2)]);var inst_12661 = cljs.core.seq.call(null,inst_12606);var state_12674__$1 = (function (){var statearr_12739 = state_12674;(statearr_12739[(31)] = inst_12660);
return statearr_12739;
})();if(inst_12661)
{var statearr_12740_12804 = state_12674__$1;(statearr_12740_12804[(1)] = (42));
} else
{var statearr_12741_12805 = state_12674__$1;(statearr_12741_12805[(1)] = (43));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (16)))
{var inst_12575 = (state_12674[(7)]);var inst_12577 = cljs.core.chunked_seq_QMARK_.call(null,inst_12575);var state_12674__$1 = state_12674;if(inst_12577)
{var statearr_12742_12806 = state_12674__$1;(statearr_12742_12806[(1)] = (19));
} else
{var statearr_12743_12807 = state_12674__$1;(statearr_12743_12807[(1)] = (20));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (38)))
{var inst_12653 = (state_12674[(2)]);var state_12674__$1 = state_12674;var statearr_12744_12808 = state_12674__$1;(statearr_12744_12808[(2)] = inst_12653);
(statearr_12744_12808[(1)] = (35));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (30)))
{var state_12674__$1 = state_12674;var statearr_12745_12809 = state_12674__$1;(statearr_12745_12809[(2)] = null);
(statearr_12745_12809[(1)] = (32));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (10)))
{var inst_12556 = (state_12674[(13)]);var inst_12558 = (state_12674[(15)]);var inst_12564 = cljs.core._nth.call(null,inst_12556,inst_12558);var inst_12565 = cljs.core.nth.call(null,inst_12564,(0),null);var inst_12566 = cljs.core.nth.call(null,inst_12564,(1),null);var state_12674__$1 = (function (){var statearr_12746 = state_12674;(statearr_12746[(26)] = inst_12565);
return statearr_12746;
})();if(cljs.core.truth_(inst_12566))
{var statearr_12747_12810 = state_12674__$1;(statearr_12747_12810[(1)] = (13));
} else
{var statearr_12748_12811 = state_12674__$1;(statearr_12748_12811[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (18)))
{var inst_12599 = (state_12674[(2)]);var state_12674__$1 = state_12674;var statearr_12749_12812 = state_12674__$1;(statearr_12749_12812[(2)] = inst_12599);
(statearr_12749_12812[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (42)))
{var state_12674__$1 = state_12674;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12674__$1,(45),dchan);
} else
{if((state_val_12675 === (37)))
{var inst_12642 = (state_12674[(23)]);var inst_12546 = (state_12674[(10)]);var inst_12633 = (state_12674[(25)]);var inst_12642__$1 = cljs.core.first.call(null,inst_12633);var inst_12643 = cljs.core.async.put_BANG_.call(null,inst_12642__$1,inst_12546,done);var state_12674__$1 = (function (){var statearr_12750 = state_12674;(statearr_12750[(23)] = inst_12642__$1);
return statearr_12750;
})();if(cljs.core.truth_(inst_12643))
{var statearr_12751_12813 = state_12674__$1;(statearr_12751_12813[(1)] = (39));
} else
{var statearr_12752_12814 = state_12674__$1;(statearr_12752_12814[(1)] = (40));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12675 === (8)))
{var inst_12558 = (state_12674[(15)]);var inst_12557 = (state_12674[(16)]);var inst_12560 = (inst_12558 < inst_12557);var inst_12561 = inst_12560;var state_12674__$1 = state_12674;if(cljs.core.truth_(inst_12561))
{var statearr_12753_12815 = state_12674__$1;(statearr_12753_12815[(1)] = (10));
} else
{var statearr_12754_12816 = state_12674__$1;(statearr_12754_12816[(1)] = (11));
}
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
});})(c__7126__auto___12762,cs,m,dchan,dctr,done))
;return ((function (switch__7111__auto__,c__7126__auto___12762,cs,m,dchan,dctr,done){
return (function() {
var state_machine__7112__auto__ = null;
var state_machine__7112__auto____0 = (function (){var statearr_12758 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_12758[(0)] = state_machine__7112__auto__);
(statearr_12758[(1)] = (1));
return statearr_12758;
});
var state_machine__7112__auto____1 = (function (state_12674){while(true){
var ret_value__7113__auto__ = (function (){try{while(true){
var result__7114__auto__ = switch__7111__auto__.call(null,state_12674);if(cljs.core.keyword_identical_QMARK_.call(null,result__7114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__7114__auto__;
}
break;
}
}catch (e12759){if((e12759 instanceof Object))
{var ex__7115__auto__ = e12759;var statearr_12760_12817 = state_12674;(statearr_12760_12817[(5)] = ex__7115__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12674);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12759;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7113__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12818 = state_12674;
state_12674 = G__12818;
continue;
}
} else
{return ret_value__7113__auto__;
}
break;
}
});
state_machine__7112__auto__ = function(state_12674){
switch(arguments.length){
case 0:
return state_machine__7112__auto____0.call(this);
case 1:
return state_machine__7112__auto____1.call(this,state_12674);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__7112__auto____0;
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__7112__auto____1;
return state_machine__7112__auto__;
})()
;})(switch__7111__auto__,c__7126__auto___12762,cs,m,dchan,dctr,done))
})();var state__7128__auto__ = (function (){var statearr_12761 = f__7127__auto__.call(null);(statearr_12761[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7126__auto___12762);
return statearr_12761;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7128__auto__);
});})(c__7126__auto___12762,cs,m,dchan,dctr,done))
);
return m;
});
/**
* Copies the mult source onto the supplied channel.
* 
* By default the channel will be closed when the source closes,
* but can be determined by the close? parameter.
*/
cljs.core.async.tap = (function() {
var tap = null;
var tap__2 = (function (mult,ch){return tap.call(null,mult,ch,true);
});
var tap__3 = (function (mult,ch,close_QMARK_){cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);
return ch;
});
tap = function(mult,ch,close_QMARK_){
switch(arguments.length){
case 2:
return tap__2.call(this,mult,ch);
case 3:
return tap__3.call(this,mult,ch,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
tap.cljs$core$IFn$_invoke$arity$2 = tap__2;
tap.cljs$core$IFn$_invoke$arity$3 = tap__3;
return tap;
})()
;
/**
* Disconnects a target channel from a mult
*/
cljs.core.async.untap = (function untap(mult,ch){return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
* Disconnects all target channels from a mult
*/
cljs.core.async.untap_all = (function untap_all(mult){return cljs.core.async.untap_all_STAR_.call(null,mult);
});
cljs.core.async.Mix = (function (){var obj12820 = {};return obj12820;
})();
cljs.core.async.admix_STAR_ = (function admix_STAR_(m,ch){if((function (){var and__3614__auto__ = m;if(and__3614__auto__)
{return m.cljs$core$async$Mix$admix_STAR_$arity$2;
} else
{return and__3614__auto__;
}
})())
{return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else
{var x__4262__auto__ = (((m == null))?null:m);return (function (){var or__3626__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__4262__auto__)]);if(or__3626__auto__)
{return or__3626__auto__;
} else
{var or__3626__auto____$1 = (cljs.core.async.admix_STAR_["_"]);if(or__3626__auto____$1)
{return or__3626__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_STAR_ = (function unmix_STAR_(m,ch){if((function (){var and__3614__auto__ = m;if(and__3614__auto__)
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2;
} else
{return and__3614__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else
{var x__4262__auto__ = (((m == null))?null:m);return (function (){var or__3626__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__4262__auto__)]);if(or__3626__auto__)
{return or__3626__auto__;
} else
{var or__3626__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);if(or__3626__auto____$1)
{return or__3626__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_all_STAR_ = (function unmix_all_STAR_(m){if((function (){var and__3614__auto__ = m;if(and__3614__auto__)
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1;
} else
{return and__3614__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else
{var x__4262__auto__ = (((m == null))?null:m);return (function (){var or__3626__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__4262__auto__)]);if(or__3626__auto__)
{return or__3626__auto__;
} else
{var or__3626__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);if(or__3626__auto____$1)
{return or__3626__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
})().call(null,m);
}
});
cljs.core.async.toggle_STAR_ = (function toggle_STAR_(m,state_map){if((function (){var and__3614__auto__ = m;if(and__3614__auto__)
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2;
} else
{return and__3614__auto__;
}
})())
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else
{var x__4262__auto__ = (((m == null))?null:m);return (function (){var or__3626__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__4262__auto__)]);if(or__3626__auto__)
{return or__3626__auto__;
} else
{var or__3626__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);if(or__3626__auto____$1)
{return or__3626__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
})().call(null,m,state_map);
}
});
cljs.core.async.solo_mode_STAR_ = (function solo_mode_STAR_(m,mode){if((function (){var and__3614__auto__ = m;if(and__3614__auto__)
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2;
} else
{return and__3614__auto__;
}
})())
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else
{var x__4262__auto__ = (((m == null))?null:m);return (function (){var or__3626__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__4262__auto__)]);if(or__3626__auto__)
{return or__3626__auto__;
} else
{var or__3626__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);if(or__3626__auto____$1)
{return or__3626__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
})().call(null,m,mode);
}
});
/**
* Creates and returns a mix of one or more input channels which will
* be put on the supplied out channel. Input sources can be added to
* the mix with 'admix', and removed with 'unmix'. A mix supports
* soloing, muting and pausing multiple inputs atomically using
* 'toggle', and can solo using either muting or pausing as determined
* by 'solo-mode'.
* 
* Each channel can have zero or more boolean modes set via 'toggle':
* 
* :solo - when true, only this (ond other soloed) channel(s) will appear
* in the mix output channel. :mute and :pause states of soloed
* channels are ignored. If solo-mode is :mute, non-soloed
* channels are muted, if :pause, non-soloed channels are
* paused.
* 
* :mute - muted channels will have their contents consumed but not included in the mix
* :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
*/
cljs.core.async.mix = (function mix(out){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));var change = cljs.core.async.chan.call(null);var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){if(cljs.core.truth_(attr.call(null,v)))
{return cljs.core.conj.call(null,ret,c);
} else
{return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){var chs = cljs.core.deref.call(null,cs);var mode = cljs.core.deref.call(null,solo_mode);var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;var m = (function (){if(typeof cljs.core.async.t12940 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t12940 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta12941){
this.change = change;
this.mix = mix;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta12941 = meta12941;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t12940.cljs$lang$type = true;
cljs.core.async.t12940.cljs$lang$ctorStr = "cljs.core.async/t12940";
cljs.core.async.t12940.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__4202__auto__,writer__4203__auto__,opt__4204__auto__){return cljs.core._write.call(null,writer__4203__auto__,"cljs.core.async/t12940");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12940.prototype.cljs$core$async$Mix$ = true;
cljs.core.async.t12940.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12940.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12940.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12940.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12940.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.solo_modes.call(null,mode)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(("mode must be one of: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)))+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"mode","mode",-2000032078,null)))))));
}
cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12940.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t12940.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12940.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_12942){var self__ = this;
var _12942__$1 = this;return self__.meta12941;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12940.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_12942,meta12941__$1){var self__ = this;
var _12942__$1 = this;return (new cljs.core.async.t12940(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta12941__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.__GT_t12940 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function __GT_t12940(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta12941){return (new cljs.core.async.t12940(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta12941));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
}
return (new cljs.core.async.t12940(change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,null));
})();var c__7126__auto___13059 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__7126__auto___13059,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){var f__7127__auto__ = (function (){var switch__7111__auto__ = ((function (c__7126__auto___13059,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_13012){var state_val_13013 = (state_13012[(1)]);if((state_val_13013 === (7)))
{var inst_12956 = (state_13012[(7)]);var inst_12961 = cljs.core.apply.call(null,cljs.core.hash_map,inst_12956);var state_13012__$1 = state_13012;var statearr_13014_13060 = state_13012__$1;(statearr_13014_13060[(2)] = inst_12961);
(statearr_13014_13060[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (20)))
{var inst_12971 = (state_13012[(8)]);var state_13012__$1 = state_13012;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13012__$1,(23),out,inst_12971);
} else
{if((state_val_13013 === (1)))
{var inst_12946 = (state_13012[(9)]);var inst_12946__$1 = calc_state.call(null);var inst_12947 = cljs.core.seq_QMARK_.call(null,inst_12946__$1);var state_13012__$1 = (function (){var statearr_13015 = state_13012;(statearr_13015[(9)] = inst_12946__$1);
return statearr_13015;
})();if(inst_12947)
{var statearr_13016_13061 = state_13012__$1;(statearr_13016_13061[(1)] = (2));
} else
{var statearr_13017_13062 = state_13012__$1;(statearr_13017_13062[(1)] = (3));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (24)))
{var inst_12964 = (state_13012[(10)]);var inst_12956 = inst_12964;var state_13012__$1 = (function (){var statearr_13018 = state_13012;(statearr_13018[(7)] = inst_12956);
return statearr_13018;
})();var statearr_13019_13063 = state_13012__$1;(statearr_13019_13063[(2)] = null);
(statearr_13019_13063[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (4)))
{var inst_12946 = (state_13012[(9)]);var inst_12952 = (state_13012[(2)]);var inst_12953 = cljs.core.get.call(null,inst_12952,new cljs.core.Keyword(null,"reads","reads",-1215067361));var inst_12954 = cljs.core.get.call(null,inst_12952,new cljs.core.Keyword(null,"mutes","mutes",1068806309));var inst_12955 = cljs.core.get.call(null,inst_12952,new cljs.core.Keyword(null,"solos","solos",1441458643));var inst_12956 = inst_12946;var state_13012__$1 = (function (){var statearr_13020 = state_13012;(statearr_13020[(7)] = inst_12956);
(statearr_13020[(11)] = inst_12954);
(statearr_13020[(12)] = inst_12955);
(statearr_13020[(13)] = inst_12953);
return statearr_13020;
})();var statearr_13021_13064 = state_13012__$1;(statearr_13021_13064[(2)] = null);
(statearr_13021_13064[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (15)))
{var state_13012__$1 = state_13012;var statearr_13022_13065 = state_13012__$1;(statearr_13022_13065[(2)] = null);
(statearr_13022_13065[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (21)))
{var inst_12964 = (state_13012[(10)]);var inst_12956 = inst_12964;var state_13012__$1 = (function (){var statearr_13023 = state_13012;(statearr_13023[(7)] = inst_12956);
return statearr_13023;
})();var statearr_13024_13066 = state_13012__$1;(statearr_13024_13066[(2)] = null);
(statearr_13024_13066[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (13)))
{var inst_13008 = (state_13012[(2)]);var state_13012__$1 = state_13012;var statearr_13025_13067 = state_13012__$1;(statearr_13025_13067[(2)] = inst_13008);
(statearr_13025_13067[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (22)))
{var inst_13006 = (state_13012[(2)]);var state_13012__$1 = state_13012;var statearr_13026_13068 = state_13012__$1;(statearr_13026_13068[(2)] = inst_13006);
(statearr_13026_13068[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (6)))
{var inst_13010 = (state_13012[(2)]);var state_13012__$1 = state_13012;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13012__$1,inst_13010);
} else
{if((state_val_13013 === (25)))
{var state_13012__$1 = state_13012;var statearr_13027_13069 = state_13012__$1;(statearr_13027_13069[(2)] = null);
(statearr_13027_13069[(1)] = (26));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (17)))
{var inst_12986 = (state_13012[(14)]);var state_13012__$1 = state_13012;var statearr_13028_13070 = state_13012__$1;(statearr_13028_13070[(2)] = inst_12986);
(statearr_13028_13070[(1)] = (19));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (3)))
{var inst_12946 = (state_13012[(9)]);var state_13012__$1 = state_13012;var statearr_13029_13071 = state_13012__$1;(statearr_13029_13071[(2)] = inst_12946);
(statearr_13029_13071[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (12)))
{var inst_12967 = (state_13012[(15)]);var inst_12986 = (state_13012[(14)]);var inst_12972 = (state_13012[(16)]);var inst_12986__$1 = inst_12967.call(null,inst_12972);var state_13012__$1 = (function (){var statearr_13030 = state_13012;(statearr_13030[(14)] = inst_12986__$1);
return statearr_13030;
})();if(cljs.core.truth_(inst_12986__$1))
{var statearr_13031_13072 = state_13012__$1;(statearr_13031_13072[(1)] = (17));
} else
{var statearr_13032_13073 = state_13012__$1;(statearr_13032_13073[(1)] = (18));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (2)))
{var inst_12946 = (state_13012[(9)]);var inst_12949 = cljs.core.apply.call(null,cljs.core.hash_map,inst_12946);var state_13012__$1 = state_13012;var statearr_13033_13074 = state_13012__$1;(statearr_13033_13074[(2)] = inst_12949);
(statearr_13033_13074[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (23)))
{var inst_12997 = (state_13012[(2)]);var state_13012__$1 = state_13012;if(cljs.core.truth_(inst_12997))
{var statearr_13034_13075 = state_13012__$1;(statearr_13034_13075[(1)] = (24));
} else
{var statearr_13035_13076 = state_13012__$1;(statearr_13035_13076[(1)] = (25));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (19)))
{var inst_12994 = (state_13012[(2)]);var state_13012__$1 = state_13012;if(cljs.core.truth_(inst_12994))
{var statearr_13036_13077 = state_13012__$1;(statearr_13036_13077[(1)] = (20));
} else
{var statearr_13037_13078 = state_13012__$1;(statearr_13037_13078[(1)] = (21));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (11)))
{var inst_12971 = (state_13012[(8)]);var inst_12977 = (inst_12971 == null);var state_13012__$1 = state_13012;if(cljs.core.truth_(inst_12977))
{var statearr_13038_13079 = state_13012__$1;(statearr_13038_13079[(1)] = (14));
} else
{var statearr_13039_13080 = state_13012__$1;(statearr_13039_13080[(1)] = (15));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (9)))
{var inst_12964 = (state_13012[(10)]);var inst_12964__$1 = (state_13012[(2)]);var inst_12965 = cljs.core.get.call(null,inst_12964__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));var inst_12966 = cljs.core.get.call(null,inst_12964__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));var inst_12967 = cljs.core.get.call(null,inst_12964__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));var state_13012__$1 = (function (){var statearr_13040 = state_13012;(statearr_13040[(17)] = inst_12966);
(statearr_13040[(15)] = inst_12967);
(statearr_13040[(10)] = inst_12964__$1);
return statearr_13040;
})();return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_13012__$1,(10),inst_12965);
} else
{if((state_val_13013 === (5)))
{var inst_12956 = (state_13012[(7)]);var inst_12959 = cljs.core.seq_QMARK_.call(null,inst_12956);var state_13012__$1 = state_13012;if(inst_12959)
{var statearr_13041_13081 = state_13012__$1;(statearr_13041_13081[(1)] = (7));
} else
{var statearr_13042_13082 = state_13012__$1;(statearr_13042_13082[(1)] = (8));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (14)))
{var inst_12972 = (state_13012[(16)]);var inst_12979 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_12972);var state_13012__$1 = state_13012;var statearr_13043_13083 = state_13012__$1;(statearr_13043_13083[(2)] = inst_12979);
(statearr_13043_13083[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (26)))
{var inst_13002 = (state_13012[(2)]);var state_13012__$1 = state_13012;var statearr_13044_13084 = state_13012__$1;(statearr_13044_13084[(2)] = inst_13002);
(statearr_13044_13084[(1)] = (22));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (16)))
{var inst_12982 = (state_13012[(2)]);var inst_12983 = calc_state.call(null);var inst_12956 = inst_12983;var state_13012__$1 = (function (){var statearr_13045 = state_13012;(statearr_13045[(7)] = inst_12956);
(statearr_13045[(18)] = inst_12982);
return statearr_13045;
})();var statearr_13046_13085 = state_13012__$1;(statearr_13046_13085[(2)] = null);
(statearr_13046_13085[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (10)))
{var inst_12972 = (state_13012[(16)]);var inst_12971 = (state_13012[(8)]);var inst_12970 = (state_13012[(2)]);var inst_12971__$1 = cljs.core.nth.call(null,inst_12970,(0),null);var inst_12972__$1 = cljs.core.nth.call(null,inst_12970,(1),null);var inst_12973 = (inst_12971__$1 == null);var inst_12974 = cljs.core._EQ_.call(null,inst_12972__$1,change);var inst_12975 = (inst_12973) || (inst_12974);var state_13012__$1 = (function (){var statearr_13047 = state_13012;(statearr_13047[(16)] = inst_12972__$1);
(statearr_13047[(8)] = inst_12971__$1);
return statearr_13047;
})();if(cljs.core.truth_(inst_12975))
{var statearr_13048_13086 = state_13012__$1;(statearr_13048_13086[(1)] = (11));
} else
{var statearr_13049_13087 = state_13012__$1;(statearr_13049_13087[(1)] = (12));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (18)))
{var inst_12966 = (state_13012[(17)]);var inst_12967 = (state_13012[(15)]);var inst_12972 = (state_13012[(16)]);var inst_12989 = cljs.core.empty_QMARK_.call(null,inst_12967);var inst_12990 = inst_12966.call(null,inst_12972);var inst_12991 = cljs.core.not.call(null,inst_12990);var inst_12992 = (inst_12989) && (inst_12991);var state_13012__$1 = state_13012;var statearr_13050_13088 = state_13012__$1;(statearr_13050_13088[(2)] = inst_12992);
(statearr_13050_13088[(1)] = (19));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13013 === (8)))
{var inst_12956 = (state_13012[(7)]);var state_13012__$1 = state_13012;var statearr_13051_13089 = state_13012__$1;(statearr_13051_13089[(2)] = inst_12956);
(statearr_13051_13089[(1)] = (9));
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
});})(c__7126__auto___13059,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;return ((function (switch__7111__auto__,c__7126__auto___13059,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var state_machine__7112__auto__ = null;
var state_machine__7112__auto____0 = (function (){var statearr_13055 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13055[(0)] = state_machine__7112__auto__);
(statearr_13055[(1)] = (1));
return statearr_13055;
});
var state_machine__7112__auto____1 = (function (state_13012){while(true){
var ret_value__7113__auto__ = (function (){try{while(true){
var result__7114__auto__ = switch__7111__auto__.call(null,state_13012);if(cljs.core.keyword_identical_QMARK_.call(null,result__7114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__7114__auto__;
}
break;
}
}catch (e13056){if((e13056 instanceof Object))
{var ex__7115__auto__ = e13056;var statearr_13057_13090 = state_13012;(statearr_13057_13090[(5)] = ex__7115__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13012);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13056;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7113__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13091 = state_13012;
state_13012 = G__13091;
continue;
}
} else
{return ret_value__7113__auto__;
}
break;
}
});
state_machine__7112__auto__ = function(state_13012){
switch(arguments.length){
case 0:
return state_machine__7112__auto____0.call(this);
case 1:
return state_machine__7112__auto____1.call(this,state_13012);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__7112__auto____0;
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__7112__auto____1;
return state_machine__7112__auto__;
})()
;})(switch__7111__auto__,c__7126__auto___13059,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();var state__7128__auto__ = (function (){var statearr_13058 = f__7127__auto__.call(null);(statearr_13058[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7126__auto___13059);
return statearr_13058;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7128__auto__);
});})(c__7126__auto___13059,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);
return m;
});
/**
* Adds ch as an input to the mix
*/
cljs.core.async.admix = (function admix(mix,ch){return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
* Removes ch as an input to the mix
*/
cljs.core.async.unmix = (function unmix(mix,ch){return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
* removes all inputs from the mix
*/
cljs.core.async.unmix_all = (function unmix_all(mix){return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
* Atomically sets the state(s) of one or more channels in a mix. The
* state map is a map of channels -> channel-state-map. A
* channel-state-map is a map of attrs -> boolean, where attr is one or
* more of :mute, :pause or :solo. Any states supplied are merged with
* the current state.
* 
* Note that channels can be added to a mix via toggle, which can be
* used to add channels in a particular (e.g. paused) state.
*/
cljs.core.async.toggle = (function toggle(mix,state_map){return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
* Sets the solo mode of the mix. mode must be one of :mute or :pause
*/
cljs.core.async.solo_mode = (function solo_mode(mix,mode){return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});
cljs.core.async.Pub = (function (){var obj13093 = {};return obj13093;
})();
cljs.core.async.sub_STAR_ = (function sub_STAR_(p,v,ch,close_QMARK_){if((function (){var and__3614__auto__ = p;if(and__3614__auto__)
{return p.cljs$core$async$Pub$sub_STAR_$arity$4;
} else
{return and__3614__auto__;
}
})())
{return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else
{var x__4262__auto__ = (((p == null))?null:p);return (function (){var or__3626__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__4262__auto__)]);if(or__3626__auto__)
{return or__3626__auto__;
} else
{var or__3626__auto____$1 = (cljs.core.async.sub_STAR_["_"]);if(or__3626__auto____$1)
{return or__3626__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
})().call(null,p,v,ch,close_QMARK_);
}
});
cljs.core.async.unsub_STAR_ = (function unsub_STAR_(p,v,ch){if((function (){var and__3614__auto__ = p;if(and__3614__auto__)
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3;
} else
{return and__3614__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else
{var x__4262__auto__ = (((p == null))?null:p);return (function (){var or__3626__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__4262__auto__)]);if(or__3626__auto__)
{return or__3626__auto__;
} else
{var or__3626__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);if(or__3626__auto____$1)
{return or__3626__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
})().call(null,p,v,ch);
}
});
cljs.core.async.unsub_all_STAR_ = (function() {
var unsub_all_STAR_ = null;
var unsub_all_STAR___1 = (function (p){if((function (){var and__3614__auto__ = p;if(and__3614__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1;
} else
{return and__3614__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else
{var x__4262__auto__ = (((p == null))?null:p);return (function (){var or__3626__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4262__auto__)]);if(or__3626__auto__)
{return or__3626__auto__;
} else
{var or__3626__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__3626__auto____$1)
{return or__3626__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p);
}
});
var unsub_all_STAR___2 = (function (p,v){if((function (){var and__3614__auto__ = p;if(and__3614__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2;
} else
{return and__3614__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else
{var x__4262__auto__ = (((p == null))?null:p);return (function (){var or__3626__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4262__auto__)]);if(or__3626__auto__)
{return or__3626__auto__;
} else
{var or__3626__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__3626__auto____$1)
{return or__3626__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p,v);
}
});
unsub_all_STAR_ = function(p,v){
switch(arguments.length){
case 1:
return unsub_all_STAR___1.call(this,p);
case 2:
return unsub_all_STAR___2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = unsub_all_STAR___1;
unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = unsub_all_STAR___2;
return unsub_all_STAR_;
})()
;
/**
* Creates and returns a pub(lication) of the supplied channel,
* partitioned into topics by the topic-fn. topic-fn will be applied to
* each value on the channel and the result will determine the 'topic'
* on which that value will be put. Channels can be subscribed to
* receive copies of topics using 'sub', and unsubscribed using
* 'unsub'. Each topic will be handled by an internal mult on a
* dedicated channel. By default these internal channels are
* unbuffered, but a buf-fn can be supplied which, given a topic,
* creates a buffer with desired properties.
* 
* Each item is distributed to all subs in parallel and synchronously,
* i.e. each sub must accept before the next item is distributed. Use
* buffering/windowing to prevent slow subs from holding up the pub.
* 
* Items received when there are no matching subs get dropped.
* 
* Note that if buf-fns are used then each topic is handled
* asynchronously, i.e. if a channel is subscribed to more than one
* topic it should not expect them to be interleaved identically with
* the source.
*/
cljs.core.async.pub = (function() {
var pub = null;
var pub__2 = (function (ch,topic_fn){return pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});
var pub__3 = (function (ch,topic_fn,buf_fn){var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var ensure_mult = ((function (mults){
return (function (topic){var or__3626__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);if(cljs.core.truth_(or__3626__auto__))
{return or__3626__auto__;
} else
{return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__3626__auto__,mults){
return (function (p1__13094_SHARP_){if(cljs.core.truth_(p1__13094_SHARP_.call(null,topic)))
{return p1__13094_SHARP_;
} else
{return cljs.core.assoc.call(null,p1__13094_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__3626__auto__,mults))
),topic);
}
});})(mults))
;var p = (function (){if(typeof cljs.core.async.t13217 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t13217 = (function (ensure_mult,mults,buf_fn,topic_fn,ch,pub,meta13218){
this.ensure_mult = ensure_mult;
this.mults = mults;
this.buf_fn = buf_fn;
this.topic_fn = topic_fn;
this.ch = ch;
this.pub = pub;
this.meta13218 = meta13218;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t13217.cljs$lang$type = true;
cljs.core.async.t13217.cljs$lang$ctorStr = "cljs.core.async/t13217";
cljs.core.async.t13217.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__4202__auto__,writer__4203__auto__,opt__4204__auto__){return cljs.core._write.call(null,writer__4203__auto__,"cljs.core.async/t13217");
});})(mults,ensure_mult))
;
cljs.core.async.t13217.prototype.cljs$core$async$Pub$ = true;
cljs.core.async.t13217.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2,close_QMARK_){var self__ = this;
var p__$1 = this;var m = self__.ensure_mult.call(null,topic);return cljs.core.async.tap.call(null,m,ch__$2,close_QMARK_);
});})(mults,ensure_mult))
;
cljs.core.async.t13217.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2){var self__ = this;
var p__$1 = this;var temp__4126__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);if(cljs.core.truth_(temp__4126__auto__))
{var m = temp__4126__auto__;return cljs.core.async.untap.call(null,m,ch__$2);
} else
{return null;
}
});})(mults,ensure_mult))
;
cljs.core.async.t13217.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;
cljs.core.async.t13217.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){var self__ = this;
var ___$1 = this;return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;
cljs.core.async.t13217.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t13217.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(mults,ensure_mult))
;
cljs.core.async.t13217.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_13219){var self__ = this;
var _13219__$1 = this;return self__.meta13218;
});})(mults,ensure_mult))
;
cljs.core.async.t13217.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_13219,meta13218__$1){var self__ = this;
var _13219__$1 = this;return (new cljs.core.async.t13217(self__.ensure_mult,self__.mults,self__.buf_fn,self__.topic_fn,self__.ch,self__.pub,meta13218__$1));
});})(mults,ensure_mult))
;
cljs.core.async.__GT_t13217 = ((function (mults,ensure_mult){
return (function __GT_t13217(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta13218){return (new cljs.core.async.t13217(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta13218));
});})(mults,ensure_mult))
;
}
return (new cljs.core.async.t13217(ensure_mult,mults,buf_fn,topic_fn,ch,pub,null));
})();var c__7126__auto___13339 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__7126__auto___13339,mults,ensure_mult,p){
return (function (){var f__7127__auto__ = (function (){var switch__7111__auto__ = ((function (c__7126__auto___13339,mults,ensure_mult,p){
return (function (state_13291){var state_val_13292 = (state_13291[(1)]);if((state_val_13292 === (7)))
{var inst_13287 = (state_13291[(2)]);var state_13291__$1 = state_13291;var statearr_13293_13340 = state_13291__$1;(statearr_13293_13340[(2)] = inst_13287);
(statearr_13293_13340[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (20)))
{var state_13291__$1 = state_13291;var statearr_13294_13341 = state_13291__$1;(statearr_13294_13341[(2)] = null);
(statearr_13294_13341[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (1)))
{var state_13291__$1 = state_13291;var statearr_13295_13342 = state_13291__$1;(statearr_13295_13342[(2)] = null);
(statearr_13295_13342[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (24)))
{var inst_13270 = (state_13291[(7)]);var inst_13279 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_13270);var state_13291__$1 = state_13291;var statearr_13296_13343 = state_13291__$1;(statearr_13296_13343[(2)] = inst_13279);
(statearr_13296_13343[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (4)))
{var inst_13222 = (state_13291[(8)]);var inst_13222__$1 = (state_13291[(2)]);var inst_13223 = (inst_13222__$1 == null);var state_13291__$1 = (function (){var statearr_13297 = state_13291;(statearr_13297[(8)] = inst_13222__$1);
return statearr_13297;
})();if(cljs.core.truth_(inst_13223))
{var statearr_13298_13344 = state_13291__$1;(statearr_13298_13344[(1)] = (5));
} else
{var statearr_13299_13345 = state_13291__$1;(statearr_13299_13345[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (15)))
{var inst_13264 = (state_13291[(2)]);var state_13291__$1 = state_13291;var statearr_13300_13346 = state_13291__$1;(statearr_13300_13346[(2)] = inst_13264);
(statearr_13300_13346[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (21)))
{var inst_13284 = (state_13291[(2)]);var state_13291__$1 = (function (){var statearr_13301 = state_13291;(statearr_13301[(9)] = inst_13284);
return statearr_13301;
})();var statearr_13302_13347 = state_13291__$1;(statearr_13302_13347[(2)] = null);
(statearr_13302_13347[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (13)))
{var inst_13246 = (state_13291[(10)]);var inst_13248 = cljs.core.chunked_seq_QMARK_.call(null,inst_13246);var state_13291__$1 = state_13291;if(inst_13248)
{var statearr_13303_13348 = state_13291__$1;(statearr_13303_13348[(1)] = (16));
} else
{var statearr_13304_13349 = state_13291__$1;(statearr_13304_13349[(1)] = (17));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (22)))
{var inst_13276 = (state_13291[(2)]);var state_13291__$1 = state_13291;if(cljs.core.truth_(inst_13276))
{var statearr_13305_13350 = state_13291__$1;(statearr_13305_13350[(1)] = (23));
} else
{var statearr_13306_13351 = state_13291__$1;(statearr_13306_13351[(1)] = (24));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (6)))
{var inst_13270 = (state_13291[(7)]);var inst_13272 = (state_13291[(11)]);var inst_13222 = (state_13291[(8)]);var inst_13270__$1 = topic_fn.call(null,inst_13222);var inst_13271 = cljs.core.deref.call(null,mults);var inst_13272__$1 = cljs.core.get.call(null,inst_13271,inst_13270__$1);var state_13291__$1 = (function (){var statearr_13307 = state_13291;(statearr_13307[(7)] = inst_13270__$1);
(statearr_13307[(11)] = inst_13272__$1);
return statearr_13307;
})();if(cljs.core.truth_(inst_13272__$1))
{var statearr_13308_13352 = state_13291__$1;(statearr_13308_13352[(1)] = (19));
} else
{var statearr_13309_13353 = state_13291__$1;(statearr_13309_13353[(1)] = (20));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (25)))
{var inst_13281 = (state_13291[(2)]);var state_13291__$1 = state_13291;var statearr_13310_13354 = state_13291__$1;(statearr_13310_13354[(2)] = inst_13281);
(statearr_13310_13354[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (17)))
{var inst_13246 = (state_13291[(10)]);var inst_13255 = cljs.core.first.call(null,inst_13246);var inst_13256 = cljs.core.async.muxch_STAR_.call(null,inst_13255);var inst_13257 = cljs.core.async.close_BANG_.call(null,inst_13256);var inst_13258 = cljs.core.next.call(null,inst_13246);var inst_13232 = inst_13258;var inst_13233 = null;var inst_13234 = (0);var inst_13235 = (0);var state_13291__$1 = (function (){var statearr_13311 = state_13291;(statearr_13311[(12)] = inst_13257);
(statearr_13311[(13)] = inst_13233);
(statearr_13311[(14)] = inst_13234);
(statearr_13311[(15)] = inst_13232);
(statearr_13311[(16)] = inst_13235);
return statearr_13311;
})();var statearr_13312_13355 = state_13291__$1;(statearr_13312_13355[(2)] = null);
(statearr_13312_13355[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (3)))
{var inst_13289 = (state_13291[(2)]);var state_13291__$1 = state_13291;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13291__$1,inst_13289);
} else
{if((state_val_13292 === (12)))
{var inst_13266 = (state_13291[(2)]);var state_13291__$1 = state_13291;var statearr_13313_13356 = state_13291__$1;(statearr_13313_13356[(2)] = inst_13266);
(statearr_13313_13356[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (2)))
{var state_13291__$1 = state_13291;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13291__$1,(4),ch);
} else
{if((state_val_13292 === (23)))
{var state_13291__$1 = state_13291;var statearr_13314_13357 = state_13291__$1;(statearr_13314_13357[(2)] = null);
(statearr_13314_13357[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (19)))
{var inst_13272 = (state_13291[(11)]);var inst_13222 = (state_13291[(8)]);var inst_13274 = cljs.core.async.muxch_STAR_.call(null,inst_13272);var state_13291__$1 = state_13291;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13291__$1,(22),inst_13274,inst_13222);
} else
{if((state_val_13292 === (11)))
{var inst_13246 = (state_13291[(10)]);var inst_13232 = (state_13291[(15)]);var inst_13246__$1 = cljs.core.seq.call(null,inst_13232);var state_13291__$1 = (function (){var statearr_13315 = state_13291;(statearr_13315[(10)] = inst_13246__$1);
return statearr_13315;
})();if(inst_13246__$1)
{var statearr_13316_13358 = state_13291__$1;(statearr_13316_13358[(1)] = (13));
} else
{var statearr_13317_13359 = state_13291__$1;(statearr_13317_13359[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (9)))
{var inst_13268 = (state_13291[(2)]);var state_13291__$1 = state_13291;var statearr_13318_13360 = state_13291__$1;(statearr_13318_13360[(2)] = inst_13268);
(statearr_13318_13360[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (5)))
{var inst_13229 = cljs.core.deref.call(null,mults);var inst_13230 = cljs.core.vals.call(null,inst_13229);var inst_13231 = cljs.core.seq.call(null,inst_13230);var inst_13232 = inst_13231;var inst_13233 = null;var inst_13234 = (0);var inst_13235 = (0);var state_13291__$1 = (function (){var statearr_13319 = state_13291;(statearr_13319[(13)] = inst_13233);
(statearr_13319[(14)] = inst_13234);
(statearr_13319[(15)] = inst_13232);
(statearr_13319[(16)] = inst_13235);
return statearr_13319;
})();var statearr_13320_13361 = state_13291__$1;(statearr_13320_13361[(2)] = null);
(statearr_13320_13361[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (14)))
{var state_13291__$1 = state_13291;var statearr_13324_13362 = state_13291__$1;(statearr_13324_13362[(2)] = null);
(statearr_13324_13362[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (16)))
{var inst_13246 = (state_13291[(10)]);var inst_13250 = cljs.core.chunk_first.call(null,inst_13246);var inst_13251 = cljs.core.chunk_rest.call(null,inst_13246);var inst_13252 = cljs.core.count.call(null,inst_13250);var inst_13232 = inst_13251;var inst_13233 = inst_13250;var inst_13234 = inst_13252;var inst_13235 = (0);var state_13291__$1 = (function (){var statearr_13325 = state_13291;(statearr_13325[(13)] = inst_13233);
(statearr_13325[(14)] = inst_13234);
(statearr_13325[(15)] = inst_13232);
(statearr_13325[(16)] = inst_13235);
return statearr_13325;
})();var statearr_13326_13363 = state_13291__$1;(statearr_13326_13363[(2)] = null);
(statearr_13326_13363[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (10)))
{var inst_13233 = (state_13291[(13)]);var inst_13234 = (state_13291[(14)]);var inst_13232 = (state_13291[(15)]);var inst_13235 = (state_13291[(16)]);var inst_13240 = cljs.core._nth.call(null,inst_13233,inst_13235);var inst_13241 = cljs.core.async.muxch_STAR_.call(null,inst_13240);var inst_13242 = cljs.core.async.close_BANG_.call(null,inst_13241);var inst_13243 = (inst_13235 + (1));var tmp13321 = inst_13233;var tmp13322 = inst_13234;var tmp13323 = inst_13232;var inst_13232__$1 = tmp13323;var inst_13233__$1 = tmp13321;var inst_13234__$1 = tmp13322;var inst_13235__$1 = inst_13243;var state_13291__$1 = (function (){var statearr_13327 = state_13291;(statearr_13327[(13)] = inst_13233__$1);
(statearr_13327[(14)] = inst_13234__$1);
(statearr_13327[(15)] = inst_13232__$1);
(statearr_13327[(17)] = inst_13242);
(statearr_13327[(16)] = inst_13235__$1);
return statearr_13327;
})();var statearr_13328_13364 = state_13291__$1;(statearr_13328_13364[(2)] = null);
(statearr_13328_13364[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (18)))
{var inst_13261 = (state_13291[(2)]);var state_13291__$1 = state_13291;var statearr_13329_13365 = state_13291__$1;(statearr_13329_13365[(2)] = inst_13261);
(statearr_13329_13365[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13292 === (8)))
{var inst_13234 = (state_13291[(14)]);var inst_13235 = (state_13291[(16)]);var inst_13237 = (inst_13235 < inst_13234);var inst_13238 = inst_13237;var state_13291__$1 = state_13291;if(cljs.core.truth_(inst_13238))
{var statearr_13330_13366 = state_13291__$1;(statearr_13330_13366[(1)] = (10));
} else
{var statearr_13331_13367 = state_13291__$1;(statearr_13331_13367[(1)] = (11));
}
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
});})(c__7126__auto___13339,mults,ensure_mult,p))
;return ((function (switch__7111__auto__,c__7126__auto___13339,mults,ensure_mult,p){
return (function() {
var state_machine__7112__auto__ = null;
var state_machine__7112__auto____0 = (function (){var statearr_13335 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13335[(0)] = state_machine__7112__auto__);
(statearr_13335[(1)] = (1));
return statearr_13335;
});
var state_machine__7112__auto____1 = (function (state_13291){while(true){
var ret_value__7113__auto__ = (function (){try{while(true){
var result__7114__auto__ = switch__7111__auto__.call(null,state_13291);if(cljs.core.keyword_identical_QMARK_.call(null,result__7114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__7114__auto__;
}
break;
}
}catch (e13336){if((e13336 instanceof Object))
{var ex__7115__auto__ = e13336;var statearr_13337_13368 = state_13291;(statearr_13337_13368[(5)] = ex__7115__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13291);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13336;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7113__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13369 = state_13291;
state_13291 = G__13369;
continue;
}
} else
{return ret_value__7113__auto__;
}
break;
}
});
state_machine__7112__auto__ = function(state_13291){
switch(arguments.length){
case 0:
return state_machine__7112__auto____0.call(this);
case 1:
return state_machine__7112__auto____1.call(this,state_13291);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__7112__auto____0;
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__7112__auto____1;
return state_machine__7112__auto__;
})()
;})(switch__7111__auto__,c__7126__auto___13339,mults,ensure_mult,p))
})();var state__7128__auto__ = (function (){var statearr_13338 = f__7127__auto__.call(null);(statearr_13338[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7126__auto___13339);
return statearr_13338;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7128__auto__);
});})(c__7126__auto___13339,mults,ensure_mult,p))
);
return p;
});
pub = function(ch,topic_fn,buf_fn){
switch(arguments.length){
case 2:
return pub__2.call(this,ch,topic_fn);
case 3:
return pub__3.call(this,ch,topic_fn,buf_fn);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pub.cljs$core$IFn$_invoke$arity$2 = pub__2;
pub.cljs$core$IFn$_invoke$arity$3 = pub__3;
return pub;
})()
;
/**
* Subscribes a channel to a topic of a pub.
* 
* By default the channel will be closed when the source closes,
* but can be determined by the close? parameter.
*/
cljs.core.async.sub = (function() {
var sub = null;
var sub__3 = (function (p,topic,ch){return sub.call(null,p,topic,ch,true);
});
var sub__4 = (function (p,topic,ch,close_QMARK_){return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});
sub = function(p,topic,ch,close_QMARK_){
switch(arguments.length){
case 3:
return sub__3.call(this,p,topic,ch);
case 4:
return sub__4.call(this,p,topic,ch,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
sub.cljs$core$IFn$_invoke$arity$3 = sub__3;
sub.cljs$core$IFn$_invoke$arity$4 = sub__4;
return sub;
})()
;
/**
* Unsubscribes a channel from a topic of a pub
*/
cljs.core.async.unsub = (function unsub(p,topic,ch){return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
* Unsubscribes all channels from a pub, or a topic of a pub
*/
cljs.core.async.unsub_all = (function() {
var unsub_all = null;
var unsub_all__1 = (function (p){return cljs.core.async.unsub_all_STAR_.call(null,p);
});
var unsub_all__2 = (function (p,topic){return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});
unsub_all = function(p,topic){
switch(arguments.length){
case 1:
return unsub_all__1.call(this,p);
case 2:
return unsub_all__2.call(this,p,topic);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unsub_all.cljs$core$IFn$_invoke$arity$1 = unsub_all__1;
unsub_all.cljs$core$IFn$_invoke$arity$2 = unsub_all__2;
return unsub_all;
})()
;
/**
* Takes a function and a collection of source channels, and returns a
* channel which contains the values produced by applying f to the set
* of first items taken from each source channel, followed by applying
* f to the set of second items from each channel, until any one of the
* channels is closed, at which point the output channel will be
* closed. The returned channel will be unbuffered by default, or a
* buf-or-n can be supplied
*/
cljs.core.async.map = (function() {
var map = null;
var map__2 = (function (f,chs){return map.call(null,f,chs,null);
});
var map__3 = (function (f,chs,buf_or_n){var chs__$1 = cljs.core.vec.call(null,chs);var out = cljs.core.async.chan.call(null,buf_or_n);var cnt = cljs.core.count.call(null,chs__$1);var rets = cljs.core.object_array.call(null,cnt);var dchan = cljs.core.async.chan.call(null,(1));var dctr = cljs.core.atom.call(null,null);var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){(rets[i] = ret);
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0)))
{return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else
{return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));var c__7126__auto___13506 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__7126__auto___13506,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){var f__7127__auto__ = (function (){var switch__7111__auto__ = ((function (c__7126__auto___13506,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_13476){var state_val_13477 = (state_13476[(1)]);if((state_val_13477 === (7)))
{var state_13476__$1 = state_13476;var statearr_13478_13507 = state_13476__$1;(statearr_13478_13507[(2)] = null);
(statearr_13478_13507[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13477 === (1)))
{var state_13476__$1 = state_13476;var statearr_13479_13508 = state_13476__$1;(statearr_13479_13508[(2)] = null);
(statearr_13479_13508[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13477 === (4)))
{var inst_13440 = (state_13476[(7)]);var inst_13442 = (inst_13440 < cnt);var state_13476__$1 = state_13476;if(cljs.core.truth_(inst_13442))
{var statearr_13480_13509 = state_13476__$1;(statearr_13480_13509[(1)] = (6));
} else
{var statearr_13481_13510 = state_13476__$1;(statearr_13481_13510[(1)] = (7));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13477 === (15)))
{var inst_13472 = (state_13476[(2)]);var state_13476__$1 = state_13476;var statearr_13482_13511 = state_13476__$1;(statearr_13482_13511[(2)] = inst_13472);
(statearr_13482_13511[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13477 === (13)))
{var inst_13465 = cljs.core.async.close_BANG_.call(null,out);var state_13476__$1 = state_13476;var statearr_13483_13512 = state_13476__$1;(statearr_13483_13512[(2)] = inst_13465);
(statearr_13483_13512[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13477 === (6)))
{var state_13476__$1 = state_13476;var statearr_13484_13513 = state_13476__$1;(statearr_13484_13513[(2)] = null);
(statearr_13484_13513[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13477 === (3)))
{var inst_13474 = (state_13476[(2)]);var state_13476__$1 = state_13476;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13476__$1,inst_13474);
} else
{if((state_val_13477 === (12)))
{var inst_13462 = (state_13476[(8)]);var inst_13462__$1 = (state_13476[(2)]);var inst_13463 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_13462__$1);var state_13476__$1 = (function (){var statearr_13485 = state_13476;(statearr_13485[(8)] = inst_13462__$1);
return statearr_13485;
})();if(cljs.core.truth_(inst_13463))
{var statearr_13486_13514 = state_13476__$1;(statearr_13486_13514[(1)] = (13));
} else
{var statearr_13487_13515 = state_13476__$1;(statearr_13487_13515[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13477 === (2)))
{var inst_13439 = cljs.core.reset_BANG_.call(null,dctr,cnt);var inst_13440 = (0);var state_13476__$1 = (function (){var statearr_13488 = state_13476;(statearr_13488[(7)] = inst_13440);
(statearr_13488[(9)] = inst_13439);
return statearr_13488;
})();var statearr_13489_13516 = state_13476__$1;(statearr_13489_13516[(2)] = null);
(statearr_13489_13516[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13477 === (11)))
{var inst_13440 = (state_13476[(7)]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_13476,(10),Object,null,(9));var inst_13449 = chs__$1.call(null,inst_13440);var inst_13450 = done.call(null,inst_13440);var inst_13451 = cljs.core.async.take_BANG_.call(null,inst_13449,inst_13450);var state_13476__$1 = state_13476;var statearr_13490_13517 = state_13476__$1;(statearr_13490_13517[(2)] = inst_13451);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13476__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13477 === (9)))
{var inst_13440 = (state_13476[(7)]);var inst_13453 = (state_13476[(2)]);var inst_13454 = (inst_13440 + (1));var inst_13440__$1 = inst_13454;var state_13476__$1 = (function (){var statearr_13491 = state_13476;(statearr_13491[(7)] = inst_13440__$1);
(statearr_13491[(10)] = inst_13453);
return statearr_13491;
})();var statearr_13492_13518 = state_13476__$1;(statearr_13492_13518[(2)] = null);
(statearr_13492_13518[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13477 === (5)))
{var inst_13460 = (state_13476[(2)]);var state_13476__$1 = (function (){var statearr_13493 = state_13476;(statearr_13493[(11)] = inst_13460);
return statearr_13493;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13476__$1,(12),dchan);
} else
{if((state_val_13477 === (14)))
{var inst_13462 = (state_13476[(8)]);var inst_13467 = cljs.core.apply.call(null,f,inst_13462);var state_13476__$1 = state_13476;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13476__$1,(16),out,inst_13467);
} else
{if((state_val_13477 === (16)))
{var inst_13469 = (state_13476[(2)]);var state_13476__$1 = (function (){var statearr_13494 = state_13476;(statearr_13494[(12)] = inst_13469);
return statearr_13494;
})();var statearr_13495_13519 = state_13476__$1;(statearr_13495_13519[(2)] = null);
(statearr_13495_13519[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13477 === (10)))
{var inst_13444 = (state_13476[(2)]);var inst_13445 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var state_13476__$1 = (function (){var statearr_13496 = state_13476;(statearr_13496[(13)] = inst_13444);
return statearr_13496;
})();var statearr_13497_13520 = state_13476__$1;(statearr_13497_13520[(2)] = inst_13445);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13476__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13477 === (8)))
{var inst_13458 = (state_13476[(2)]);var state_13476__$1 = state_13476;var statearr_13498_13521 = state_13476__$1;(statearr_13498_13521[(2)] = inst_13458);
(statearr_13498_13521[(1)] = (5));
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
});})(c__7126__auto___13506,chs__$1,out,cnt,rets,dchan,dctr,done))
;return ((function (switch__7111__auto__,c__7126__auto___13506,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var state_machine__7112__auto__ = null;
var state_machine__7112__auto____0 = (function (){var statearr_13502 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13502[(0)] = state_machine__7112__auto__);
(statearr_13502[(1)] = (1));
return statearr_13502;
});
var state_machine__7112__auto____1 = (function (state_13476){while(true){
var ret_value__7113__auto__ = (function (){try{while(true){
var result__7114__auto__ = switch__7111__auto__.call(null,state_13476);if(cljs.core.keyword_identical_QMARK_.call(null,result__7114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__7114__auto__;
}
break;
}
}catch (e13503){if((e13503 instanceof Object))
{var ex__7115__auto__ = e13503;var statearr_13504_13522 = state_13476;(statearr_13504_13522[(5)] = ex__7115__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13476);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13503;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7113__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13523 = state_13476;
state_13476 = G__13523;
continue;
}
} else
{return ret_value__7113__auto__;
}
break;
}
});
state_machine__7112__auto__ = function(state_13476){
switch(arguments.length){
case 0:
return state_machine__7112__auto____0.call(this);
case 1:
return state_machine__7112__auto____1.call(this,state_13476);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__7112__auto____0;
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__7112__auto____1;
return state_machine__7112__auto__;
})()
;})(switch__7111__auto__,c__7126__auto___13506,chs__$1,out,cnt,rets,dchan,dctr,done))
})();var state__7128__auto__ = (function (){var statearr_13505 = f__7127__auto__.call(null);(statearr_13505[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7126__auto___13506);
return statearr_13505;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7128__auto__);
});})(c__7126__auto___13506,chs__$1,out,cnt,rets,dchan,dctr,done))
);
return out;
});
map = function(f,chs,buf_or_n){
switch(arguments.length){
case 2:
return map__2.call(this,f,chs);
case 3:
return map__3.call(this,f,chs,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
map.cljs$core$IFn$_invoke$arity$2 = map__2;
map.cljs$core$IFn$_invoke$arity$3 = map__3;
return map;
})()
;
/**
* Takes a collection of source channels and returns a channel which
* contains all values taken from them. The returned channel will be
* unbuffered by default, or a buf-or-n can be supplied. The channel
* will close after all the source channels have closed.
*/
cljs.core.async.merge = (function() {
var merge = null;
var merge__1 = (function (chs){return merge.call(null,chs,null);
});
var merge__2 = (function (chs,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__7126__auto___13631 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__7126__auto___13631,out){
return (function (){var f__7127__auto__ = (function (){var switch__7111__auto__ = ((function (c__7126__auto___13631,out){
return (function (state_13607){var state_val_13608 = (state_13607[(1)]);if((state_val_13608 === (7)))
{var inst_13586 = (state_13607[(7)]);var inst_13587 = (state_13607[(8)]);var inst_13586__$1 = (state_13607[(2)]);var inst_13587__$1 = cljs.core.nth.call(null,inst_13586__$1,(0),null);var inst_13588 = cljs.core.nth.call(null,inst_13586__$1,(1),null);var inst_13589 = (inst_13587__$1 == null);var state_13607__$1 = (function (){var statearr_13609 = state_13607;(statearr_13609[(7)] = inst_13586__$1);
(statearr_13609[(9)] = inst_13588);
(statearr_13609[(8)] = inst_13587__$1);
return statearr_13609;
})();if(cljs.core.truth_(inst_13589))
{var statearr_13610_13632 = state_13607__$1;(statearr_13610_13632[(1)] = (8));
} else
{var statearr_13611_13633 = state_13607__$1;(statearr_13611_13633[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13608 === (1)))
{var inst_13578 = cljs.core.vec.call(null,chs);var inst_13579 = inst_13578;var state_13607__$1 = (function (){var statearr_13612 = state_13607;(statearr_13612[(10)] = inst_13579);
return statearr_13612;
})();var statearr_13613_13634 = state_13607__$1;(statearr_13613_13634[(2)] = null);
(statearr_13613_13634[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13608 === (4)))
{var inst_13579 = (state_13607[(10)]);var state_13607__$1 = state_13607;return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_13607__$1,(7),inst_13579);
} else
{if((state_val_13608 === (6)))
{var inst_13603 = (state_13607[(2)]);var state_13607__$1 = state_13607;var statearr_13614_13635 = state_13607__$1;(statearr_13614_13635[(2)] = inst_13603);
(statearr_13614_13635[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13608 === (3)))
{var inst_13605 = (state_13607[(2)]);var state_13607__$1 = state_13607;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13607__$1,inst_13605);
} else
{if((state_val_13608 === (2)))
{var inst_13579 = (state_13607[(10)]);var inst_13581 = cljs.core.count.call(null,inst_13579);var inst_13582 = (inst_13581 > (0));var state_13607__$1 = state_13607;if(cljs.core.truth_(inst_13582))
{var statearr_13616_13636 = state_13607__$1;(statearr_13616_13636[(1)] = (4));
} else
{var statearr_13617_13637 = state_13607__$1;(statearr_13617_13637[(1)] = (5));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13608 === (11)))
{var inst_13579 = (state_13607[(10)]);var inst_13596 = (state_13607[(2)]);var tmp13615 = inst_13579;var inst_13579__$1 = tmp13615;var state_13607__$1 = (function (){var statearr_13618 = state_13607;(statearr_13618[(10)] = inst_13579__$1);
(statearr_13618[(11)] = inst_13596);
return statearr_13618;
})();var statearr_13619_13638 = state_13607__$1;(statearr_13619_13638[(2)] = null);
(statearr_13619_13638[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13608 === (9)))
{var inst_13587 = (state_13607[(8)]);var state_13607__$1 = state_13607;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13607__$1,(11),out,inst_13587);
} else
{if((state_val_13608 === (5)))
{var inst_13601 = cljs.core.async.close_BANG_.call(null,out);var state_13607__$1 = state_13607;var statearr_13620_13639 = state_13607__$1;(statearr_13620_13639[(2)] = inst_13601);
(statearr_13620_13639[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13608 === (10)))
{var inst_13599 = (state_13607[(2)]);var state_13607__$1 = state_13607;var statearr_13621_13640 = state_13607__$1;(statearr_13621_13640[(2)] = inst_13599);
(statearr_13621_13640[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13608 === (8)))
{var inst_13579 = (state_13607[(10)]);var inst_13586 = (state_13607[(7)]);var inst_13588 = (state_13607[(9)]);var inst_13587 = (state_13607[(8)]);var inst_13591 = (function (){var c = inst_13588;var v = inst_13587;var vec__13584 = inst_13586;var cs = inst_13579;return ((function (c,v,vec__13584,cs,inst_13579,inst_13586,inst_13588,inst_13587,state_val_13608,c__7126__auto___13631,out){
return (function (p1__13524_SHARP_){return cljs.core.not_EQ_.call(null,c,p1__13524_SHARP_);
});
;})(c,v,vec__13584,cs,inst_13579,inst_13586,inst_13588,inst_13587,state_val_13608,c__7126__auto___13631,out))
})();var inst_13592 = cljs.core.filterv.call(null,inst_13591,inst_13579);var inst_13579__$1 = inst_13592;var state_13607__$1 = (function (){var statearr_13622 = state_13607;(statearr_13622[(10)] = inst_13579__$1);
return statearr_13622;
})();var statearr_13623_13641 = state_13607__$1;(statearr_13623_13641[(2)] = null);
(statearr_13623_13641[(1)] = (2));
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
});})(c__7126__auto___13631,out))
;return ((function (switch__7111__auto__,c__7126__auto___13631,out){
return (function() {
var state_machine__7112__auto__ = null;
var state_machine__7112__auto____0 = (function (){var statearr_13627 = [null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13627[(0)] = state_machine__7112__auto__);
(statearr_13627[(1)] = (1));
return statearr_13627;
});
var state_machine__7112__auto____1 = (function (state_13607){while(true){
var ret_value__7113__auto__ = (function (){try{while(true){
var result__7114__auto__ = switch__7111__auto__.call(null,state_13607);if(cljs.core.keyword_identical_QMARK_.call(null,result__7114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__7114__auto__;
}
break;
}
}catch (e13628){if((e13628 instanceof Object))
{var ex__7115__auto__ = e13628;var statearr_13629_13642 = state_13607;(statearr_13629_13642[(5)] = ex__7115__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13607);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13628;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7113__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13643 = state_13607;
state_13607 = G__13643;
continue;
}
} else
{return ret_value__7113__auto__;
}
break;
}
});
state_machine__7112__auto__ = function(state_13607){
switch(arguments.length){
case 0:
return state_machine__7112__auto____0.call(this);
case 1:
return state_machine__7112__auto____1.call(this,state_13607);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__7112__auto____0;
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__7112__auto____1;
return state_machine__7112__auto__;
})()
;})(switch__7111__auto__,c__7126__auto___13631,out))
})();var state__7128__auto__ = (function (){var statearr_13630 = f__7127__auto__.call(null);(statearr_13630[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7126__auto___13631);
return statearr_13630;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7128__auto__);
});})(c__7126__auto___13631,out))
);
return out;
});
merge = function(chs,buf_or_n){
switch(arguments.length){
case 1:
return merge__1.call(this,chs);
case 2:
return merge__2.call(this,chs,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
merge.cljs$core$IFn$_invoke$arity$1 = merge__1;
merge.cljs$core$IFn$_invoke$arity$2 = merge__2;
return merge;
})()
;
/**
* Returns a channel containing the single (collection) result of the
* items taken from the channel conjoined to the supplied
* collection. ch must close before into produces a result.
*/
cljs.core.async.into = (function into(coll,ch){return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
* Returns a channel that will return, at most, n items from ch. After n items
* have been returned, or ch has been closed, the return chanel will close.
* 
* The output channel is unbuffered by default, unless buf-or-n is given.
*/
cljs.core.async.take = (function() {
var take = null;
var take__2 = (function (n,ch){return take.call(null,n,ch,null);
});
var take__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__7126__auto___13736 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__7126__auto___13736,out){
return (function (){var f__7127__auto__ = (function (){var switch__7111__auto__ = ((function (c__7126__auto___13736,out){
return (function (state_13713){var state_val_13714 = (state_13713[(1)]);if((state_val_13714 === (7)))
{var inst_13695 = (state_13713[(7)]);var inst_13695__$1 = (state_13713[(2)]);var inst_13696 = (inst_13695__$1 == null);var inst_13697 = cljs.core.not.call(null,inst_13696);var state_13713__$1 = (function (){var statearr_13715 = state_13713;(statearr_13715[(7)] = inst_13695__$1);
return statearr_13715;
})();if(inst_13697)
{var statearr_13716_13737 = state_13713__$1;(statearr_13716_13737[(1)] = (8));
} else
{var statearr_13717_13738 = state_13713__$1;(statearr_13717_13738[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13714 === (1)))
{var inst_13690 = (0);var state_13713__$1 = (function (){var statearr_13718 = state_13713;(statearr_13718[(8)] = inst_13690);
return statearr_13718;
})();var statearr_13719_13739 = state_13713__$1;(statearr_13719_13739[(2)] = null);
(statearr_13719_13739[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13714 === (4)))
{var state_13713__$1 = state_13713;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13713__$1,(7),ch);
} else
{if((state_val_13714 === (6)))
{var inst_13708 = (state_13713[(2)]);var state_13713__$1 = state_13713;var statearr_13720_13740 = state_13713__$1;(statearr_13720_13740[(2)] = inst_13708);
(statearr_13720_13740[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13714 === (3)))
{var inst_13710 = (state_13713[(2)]);var inst_13711 = cljs.core.async.close_BANG_.call(null,out);var state_13713__$1 = (function (){var statearr_13721 = state_13713;(statearr_13721[(9)] = inst_13710);
return statearr_13721;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13713__$1,inst_13711);
} else
{if((state_val_13714 === (2)))
{var inst_13690 = (state_13713[(8)]);var inst_13692 = (inst_13690 < n);var state_13713__$1 = state_13713;if(cljs.core.truth_(inst_13692))
{var statearr_13722_13741 = state_13713__$1;(statearr_13722_13741[(1)] = (4));
} else
{var statearr_13723_13742 = state_13713__$1;(statearr_13723_13742[(1)] = (5));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13714 === (11)))
{var inst_13690 = (state_13713[(8)]);var inst_13700 = (state_13713[(2)]);var inst_13701 = (inst_13690 + (1));var inst_13690__$1 = inst_13701;var state_13713__$1 = (function (){var statearr_13724 = state_13713;(statearr_13724[(8)] = inst_13690__$1);
(statearr_13724[(10)] = inst_13700);
return statearr_13724;
})();var statearr_13725_13743 = state_13713__$1;(statearr_13725_13743[(2)] = null);
(statearr_13725_13743[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13714 === (9)))
{var state_13713__$1 = state_13713;var statearr_13726_13744 = state_13713__$1;(statearr_13726_13744[(2)] = null);
(statearr_13726_13744[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13714 === (5)))
{var state_13713__$1 = state_13713;var statearr_13727_13745 = state_13713__$1;(statearr_13727_13745[(2)] = null);
(statearr_13727_13745[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13714 === (10)))
{var inst_13705 = (state_13713[(2)]);var state_13713__$1 = state_13713;var statearr_13728_13746 = state_13713__$1;(statearr_13728_13746[(2)] = inst_13705);
(statearr_13728_13746[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13714 === (8)))
{var inst_13695 = (state_13713[(7)]);var state_13713__$1 = state_13713;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13713__$1,(11),out,inst_13695);
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
});})(c__7126__auto___13736,out))
;return ((function (switch__7111__auto__,c__7126__auto___13736,out){
return (function() {
var state_machine__7112__auto__ = null;
var state_machine__7112__auto____0 = (function (){var statearr_13732 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_13732[(0)] = state_machine__7112__auto__);
(statearr_13732[(1)] = (1));
return statearr_13732;
});
var state_machine__7112__auto____1 = (function (state_13713){while(true){
var ret_value__7113__auto__ = (function (){try{while(true){
var result__7114__auto__ = switch__7111__auto__.call(null,state_13713);if(cljs.core.keyword_identical_QMARK_.call(null,result__7114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__7114__auto__;
}
break;
}
}catch (e13733){if((e13733 instanceof Object))
{var ex__7115__auto__ = e13733;var statearr_13734_13747 = state_13713;(statearr_13734_13747[(5)] = ex__7115__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13713);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13733;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7113__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13748 = state_13713;
state_13713 = G__13748;
continue;
}
} else
{return ret_value__7113__auto__;
}
break;
}
});
state_machine__7112__auto__ = function(state_13713){
switch(arguments.length){
case 0:
return state_machine__7112__auto____0.call(this);
case 1:
return state_machine__7112__auto____1.call(this,state_13713);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__7112__auto____0;
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__7112__auto____1;
return state_machine__7112__auto__;
})()
;})(switch__7111__auto__,c__7126__auto___13736,out))
})();var state__7128__auto__ = (function (){var statearr_13735 = f__7127__auto__.call(null);(statearr_13735[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7126__auto___13736);
return statearr_13735;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7128__auto__);
});})(c__7126__auto___13736,out))
);
return out;
});
take = function(n,ch,buf_or_n){
switch(arguments.length){
case 2:
return take__2.call(this,n,ch);
case 3:
return take__3.call(this,n,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
take.cljs$core$IFn$_invoke$arity$2 = take__2;
take.cljs$core$IFn$_invoke$arity$3 = take__3;
return take;
})()
;
/**
* Returns a channel that will contain values from ch. Consecutive duplicate
* values will be dropped.
* 
* The output channel is unbuffered by default, unless buf-or-n is given.
*/
cljs.core.async.unique = (function() {
var unique = null;
var unique__1 = (function (ch){return unique.call(null,ch,null);
});
var unique__2 = (function (ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__7126__auto___13845 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__7126__auto___13845,out){
return (function (){var f__7127__auto__ = (function (){var switch__7111__auto__ = ((function (c__7126__auto___13845,out){
return (function (state_13820){var state_val_13821 = (state_13820[(1)]);if((state_val_13821 === (7)))
{var inst_13815 = (state_13820[(2)]);var state_13820__$1 = state_13820;var statearr_13822_13846 = state_13820__$1;(statearr_13822_13846[(2)] = inst_13815);
(statearr_13822_13846[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13821 === (1)))
{var inst_13797 = null;var state_13820__$1 = (function (){var statearr_13823 = state_13820;(statearr_13823[(7)] = inst_13797);
return statearr_13823;
})();var statearr_13824_13847 = state_13820__$1;(statearr_13824_13847[(2)] = null);
(statearr_13824_13847[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13821 === (4)))
{var inst_13800 = (state_13820[(8)]);var inst_13800__$1 = (state_13820[(2)]);var inst_13801 = (inst_13800__$1 == null);var inst_13802 = cljs.core.not.call(null,inst_13801);var state_13820__$1 = (function (){var statearr_13825 = state_13820;(statearr_13825[(8)] = inst_13800__$1);
return statearr_13825;
})();if(inst_13802)
{var statearr_13826_13848 = state_13820__$1;(statearr_13826_13848[(1)] = (5));
} else
{var statearr_13827_13849 = state_13820__$1;(statearr_13827_13849[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13821 === (6)))
{var state_13820__$1 = state_13820;var statearr_13828_13850 = state_13820__$1;(statearr_13828_13850[(2)] = null);
(statearr_13828_13850[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13821 === (3)))
{var inst_13817 = (state_13820[(2)]);var inst_13818 = cljs.core.async.close_BANG_.call(null,out);var state_13820__$1 = (function (){var statearr_13829 = state_13820;(statearr_13829[(9)] = inst_13817);
return statearr_13829;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13820__$1,inst_13818);
} else
{if((state_val_13821 === (2)))
{var state_13820__$1 = state_13820;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13820__$1,(4),ch);
} else
{if((state_val_13821 === (11)))
{var inst_13800 = (state_13820[(8)]);var inst_13809 = (state_13820[(2)]);var inst_13797 = inst_13800;var state_13820__$1 = (function (){var statearr_13830 = state_13820;(statearr_13830[(7)] = inst_13797);
(statearr_13830[(10)] = inst_13809);
return statearr_13830;
})();var statearr_13831_13851 = state_13820__$1;(statearr_13831_13851[(2)] = null);
(statearr_13831_13851[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13821 === (9)))
{var inst_13800 = (state_13820[(8)]);var state_13820__$1 = state_13820;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13820__$1,(11),out,inst_13800);
} else
{if((state_val_13821 === (5)))
{var inst_13797 = (state_13820[(7)]);var inst_13800 = (state_13820[(8)]);var inst_13804 = cljs.core._EQ_.call(null,inst_13800,inst_13797);var state_13820__$1 = state_13820;if(inst_13804)
{var statearr_13833_13852 = state_13820__$1;(statearr_13833_13852[(1)] = (8));
} else
{var statearr_13834_13853 = state_13820__$1;(statearr_13834_13853[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13821 === (10)))
{var inst_13812 = (state_13820[(2)]);var state_13820__$1 = state_13820;var statearr_13835_13854 = state_13820__$1;(statearr_13835_13854[(2)] = inst_13812);
(statearr_13835_13854[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13821 === (8)))
{var inst_13797 = (state_13820[(7)]);var tmp13832 = inst_13797;var inst_13797__$1 = tmp13832;var state_13820__$1 = (function (){var statearr_13836 = state_13820;(statearr_13836[(7)] = inst_13797__$1);
return statearr_13836;
})();var statearr_13837_13855 = state_13820__$1;(statearr_13837_13855[(2)] = null);
(statearr_13837_13855[(1)] = (2));
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
});})(c__7126__auto___13845,out))
;return ((function (switch__7111__auto__,c__7126__auto___13845,out){
return (function() {
var state_machine__7112__auto__ = null;
var state_machine__7112__auto____0 = (function (){var statearr_13841 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_13841[(0)] = state_machine__7112__auto__);
(statearr_13841[(1)] = (1));
return statearr_13841;
});
var state_machine__7112__auto____1 = (function (state_13820){while(true){
var ret_value__7113__auto__ = (function (){try{while(true){
var result__7114__auto__ = switch__7111__auto__.call(null,state_13820);if(cljs.core.keyword_identical_QMARK_.call(null,result__7114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__7114__auto__;
}
break;
}
}catch (e13842){if((e13842 instanceof Object))
{var ex__7115__auto__ = e13842;var statearr_13843_13856 = state_13820;(statearr_13843_13856[(5)] = ex__7115__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13820);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13842;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7113__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13857 = state_13820;
state_13820 = G__13857;
continue;
}
} else
{return ret_value__7113__auto__;
}
break;
}
});
state_machine__7112__auto__ = function(state_13820){
switch(arguments.length){
case 0:
return state_machine__7112__auto____0.call(this);
case 1:
return state_machine__7112__auto____1.call(this,state_13820);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__7112__auto____0;
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__7112__auto____1;
return state_machine__7112__auto__;
})()
;})(switch__7111__auto__,c__7126__auto___13845,out))
})();var state__7128__auto__ = (function (){var statearr_13844 = f__7127__auto__.call(null);(statearr_13844[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7126__auto___13845);
return statearr_13844;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7128__auto__);
});})(c__7126__auto___13845,out))
);
return out;
});
unique = function(ch,buf_or_n){
switch(arguments.length){
case 1:
return unique__1.call(this,ch);
case 2:
return unique__2.call(this,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unique.cljs$core$IFn$_invoke$arity$1 = unique__1;
unique.cljs$core$IFn$_invoke$arity$2 = unique__2;
return unique;
})()
;
/**
* Returns a channel that will contain vectors of n items taken from ch. The
* final vector in the return channel may be smaller than n if ch closed before
* the vector could be completely filled.
* 
* The output channel is unbuffered by default, unless buf-or-n is given
*/
cljs.core.async.partition = (function() {
var partition = null;
var partition__2 = (function (n,ch){return partition.call(null,n,ch,null);
});
var partition__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__7126__auto___13992 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__7126__auto___13992,out){
return (function (){var f__7127__auto__ = (function (){var switch__7111__auto__ = ((function (c__7126__auto___13992,out){
return (function (state_13962){var state_val_13963 = (state_13962[(1)]);if((state_val_13963 === (7)))
{var inst_13958 = (state_13962[(2)]);var state_13962__$1 = state_13962;var statearr_13964_13993 = state_13962__$1;(statearr_13964_13993[(2)] = inst_13958);
(statearr_13964_13993[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13963 === (1)))
{var inst_13925 = (new Array(n));var inst_13926 = inst_13925;var inst_13927 = (0);var state_13962__$1 = (function (){var statearr_13965 = state_13962;(statearr_13965[(7)] = inst_13926);
(statearr_13965[(8)] = inst_13927);
return statearr_13965;
})();var statearr_13966_13994 = state_13962__$1;(statearr_13966_13994[(2)] = null);
(statearr_13966_13994[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13963 === (4)))
{var inst_13930 = (state_13962[(9)]);var inst_13930__$1 = (state_13962[(2)]);var inst_13931 = (inst_13930__$1 == null);var inst_13932 = cljs.core.not.call(null,inst_13931);var state_13962__$1 = (function (){var statearr_13967 = state_13962;(statearr_13967[(9)] = inst_13930__$1);
return statearr_13967;
})();if(inst_13932)
{var statearr_13968_13995 = state_13962__$1;(statearr_13968_13995[(1)] = (5));
} else
{var statearr_13969_13996 = state_13962__$1;(statearr_13969_13996[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13963 === (15)))
{var inst_13952 = (state_13962[(2)]);var state_13962__$1 = state_13962;var statearr_13970_13997 = state_13962__$1;(statearr_13970_13997[(2)] = inst_13952);
(statearr_13970_13997[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13963 === (13)))
{var state_13962__$1 = state_13962;var statearr_13971_13998 = state_13962__$1;(statearr_13971_13998[(2)] = null);
(statearr_13971_13998[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13963 === (6)))
{var inst_13927 = (state_13962[(8)]);var inst_13948 = (inst_13927 > (0));var state_13962__$1 = state_13962;if(cljs.core.truth_(inst_13948))
{var statearr_13972_13999 = state_13962__$1;(statearr_13972_13999[(1)] = (12));
} else
{var statearr_13973_14000 = state_13962__$1;(statearr_13973_14000[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13963 === (3)))
{var inst_13960 = (state_13962[(2)]);var state_13962__$1 = state_13962;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13962__$1,inst_13960);
} else
{if((state_val_13963 === (12)))
{var inst_13926 = (state_13962[(7)]);var inst_13950 = cljs.core.vec.call(null,inst_13926);var state_13962__$1 = state_13962;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13962__$1,(15),out,inst_13950);
} else
{if((state_val_13963 === (2)))
{var state_13962__$1 = state_13962;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13962__$1,(4),ch);
} else
{if((state_val_13963 === (11)))
{var inst_13942 = (state_13962[(2)]);var inst_13943 = (new Array(n));var inst_13926 = inst_13943;var inst_13927 = (0);var state_13962__$1 = (function (){var statearr_13974 = state_13962;(statearr_13974[(7)] = inst_13926);
(statearr_13974[(10)] = inst_13942);
(statearr_13974[(8)] = inst_13927);
return statearr_13974;
})();var statearr_13975_14001 = state_13962__$1;(statearr_13975_14001[(2)] = null);
(statearr_13975_14001[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13963 === (9)))
{var inst_13926 = (state_13962[(7)]);var inst_13940 = cljs.core.vec.call(null,inst_13926);var state_13962__$1 = state_13962;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13962__$1,(11),out,inst_13940);
} else
{if((state_val_13963 === (5)))
{var inst_13935 = (state_13962[(11)]);var inst_13926 = (state_13962[(7)]);var inst_13930 = (state_13962[(9)]);var inst_13927 = (state_13962[(8)]);var inst_13934 = (inst_13926[inst_13927] = inst_13930);var inst_13935__$1 = (inst_13927 + (1));var inst_13936 = (inst_13935__$1 < n);var state_13962__$1 = (function (){var statearr_13976 = state_13962;(statearr_13976[(11)] = inst_13935__$1);
(statearr_13976[(12)] = inst_13934);
return statearr_13976;
})();if(cljs.core.truth_(inst_13936))
{var statearr_13977_14002 = state_13962__$1;(statearr_13977_14002[(1)] = (8));
} else
{var statearr_13978_14003 = state_13962__$1;(statearr_13978_14003[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13963 === (14)))
{var inst_13955 = (state_13962[(2)]);var inst_13956 = cljs.core.async.close_BANG_.call(null,out);var state_13962__$1 = (function (){var statearr_13980 = state_13962;(statearr_13980[(13)] = inst_13955);
return statearr_13980;
})();var statearr_13981_14004 = state_13962__$1;(statearr_13981_14004[(2)] = inst_13956);
(statearr_13981_14004[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13963 === (10)))
{var inst_13946 = (state_13962[(2)]);var state_13962__$1 = state_13962;var statearr_13982_14005 = state_13962__$1;(statearr_13982_14005[(2)] = inst_13946);
(statearr_13982_14005[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13963 === (8)))
{var inst_13935 = (state_13962[(11)]);var inst_13926 = (state_13962[(7)]);var tmp13979 = inst_13926;var inst_13926__$1 = tmp13979;var inst_13927 = inst_13935;var state_13962__$1 = (function (){var statearr_13983 = state_13962;(statearr_13983[(7)] = inst_13926__$1);
(statearr_13983[(8)] = inst_13927);
return statearr_13983;
})();var statearr_13984_14006 = state_13962__$1;(statearr_13984_14006[(2)] = null);
(statearr_13984_14006[(1)] = (2));
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
});})(c__7126__auto___13992,out))
;return ((function (switch__7111__auto__,c__7126__auto___13992,out){
return (function() {
var state_machine__7112__auto__ = null;
var state_machine__7112__auto____0 = (function (){var statearr_13988 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13988[(0)] = state_machine__7112__auto__);
(statearr_13988[(1)] = (1));
return statearr_13988;
});
var state_machine__7112__auto____1 = (function (state_13962){while(true){
var ret_value__7113__auto__ = (function (){try{while(true){
var result__7114__auto__ = switch__7111__auto__.call(null,state_13962);if(cljs.core.keyword_identical_QMARK_.call(null,result__7114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__7114__auto__;
}
break;
}
}catch (e13989){if((e13989 instanceof Object))
{var ex__7115__auto__ = e13989;var statearr_13990_14007 = state_13962;(statearr_13990_14007[(5)] = ex__7115__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13962);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13989;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7113__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14008 = state_13962;
state_13962 = G__14008;
continue;
}
} else
{return ret_value__7113__auto__;
}
break;
}
});
state_machine__7112__auto__ = function(state_13962){
switch(arguments.length){
case 0:
return state_machine__7112__auto____0.call(this);
case 1:
return state_machine__7112__auto____1.call(this,state_13962);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__7112__auto____0;
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__7112__auto____1;
return state_machine__7112__auto__;
})()
;})(switch__7111__auto__,c__7126__auto___13992,out))
})();var state__7128__auto__ = (function (){var statearr_13991 = f__7127__auto__.call(null);(statearr_13991[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7126__auto___13992);
return statearr_13991;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7128__auto__);
});})(c__7126__auto___13992,out))
);
return out;
});
partition = function(n,ch,buf_or_n){
switch(arguments.length){
case 2:
return partition__2.call(this,n,ch);
case 3:
return partition__3.call(this,n,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
partition.cljs$core$IFn$_invoke$arity$2 = partition__2;
partition.cljs$core$IFn$_invoke$arity$3 = partition__3;
return partition;
})()
;
/**
* Returns a channel that will contain vectors of items taken from ch. New
* vectors will be created whenever (f itm) returns a value that differs from
* the previous item's (f itm).
* 
* The output channel is unbuffered, unless buf-or-n is given
*/
cljs.core.async.partition_by = (function() {
var partition_by = null;
var partition_by__2 = (function (f,ch){return partition_by.call(null,f,ch,null);
});
var partition_by__3 = (function (f,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__7126__auto___14151 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__7126__auto___14151,out){
return (function (){var f__7127__auto__ = (function (){var switch__7111__auto__ = ((function (c__7126__auto___14151,out){
return (function (state_14121){var state_val_14122 = (state_14121[(1)]);if((state_val_14122 === (7)))
{var inst_14117 = (state_14121[(2)]);var state_14121__$1 = state_14121;var statearr_14123_14152 = state_14121__$1;(statearr_14123_14152[(2)] = inst_14117);
(statearr_14123_14152[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14122 === (1)))
{var inst_14080 = [];var inst_14081 = inst_14080;var inst_14082 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);var state_14121__$1 = (function (){var statearr_14124 = state_14121;(statearr_14124[(7)] = inst_14082);
(statearr_14124[(8)] = inst_14081);
return statearr_14124;
})();var statearr_14125_14153 = state_14121__$1;(statearr_14125_14153[(2)] = null);
(statearr_14125_14153[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14122 === (4)))
{var inst_14085 = (state_14121[(9)]);var inst_14085__$1 = (state_14121[(2)]);var inst_14086 = (inst_14085__$1 == null);var inst_14087 = cljs.core.not.call(null,inst_14086);var state_14121__$1 = (function (){var statearr_14126 = state_14121;(statearr_14126[(9)] = inst_14085__$1);
return statearr_14126;
})();if(inst_14087)
{var statearr_14127_14154 = state_14121__$1;(statearr_14127_14154[(1)] = (5));
} else
{var statearr_14128_14155 = state_14121__$1;(statearr_14128_14155[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14122 === (15)))
{var inst_14111 = (state_14121[(2)]);var state_14121__$1 = state_14121;var statearr_14129_14156 = state_14121__$1;(statearr_14129_14156[(2)] = inst_14111);
(statearr_14129_14156[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14122 === (13)))
{var state_14121__$1 = state_14121;var statearr_14130_14157 = state_14121__$1;(statearr_14130_14157[(2)] = null);
(statearr_14130_14157[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14122 === (6)))
{var inst_14081 = (state_14121[(8)]);var inst_14106 = inst_14081.length;var inst_14107 = (inst_14106 > (0));var state_14121__$1 = state_14121;if(cljs.core.truth_(inst_14107))
{var statearr_14131_14158 = state_14121__$1;(statearr_14131_14158[(1)] = (12));
} else
{var statearr_14132_14159 = state_14121__$1;(statearr_14132_14159[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14122 === (3)))
{var inst_14119 = (state_14121[(2)]);var state_14121__$1 = state_14121;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14121__$1,inst_14119);
} else
{if((state_val_14122 === (12)))
{var inst_14081 = (state_14121[(8)]);var inst_14109 = cljs.core.vec.call(null,inst_14081);var state_14121__$1 = state_14121;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14121__$1,(15),out,inst_14109);
} else
{if((state_val_14122 === (2)))
{var state_14121__$1 = state_14121;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14121__$1,(4),ch);
} else
{if((state_val_14122 === (11)))
{var inst_14085 = (state_14121[(9)]);var inst_14089 = (state_14121[(10)]);var inst_14099 = (state_14121[(2)]);var inst_14100 = [];var inst_14101 = inst_14100.push(inst_14085);var inst_14081 = inst_14100;var inst_14082 = inst_14089;var state_14121__$1 = (function (){var statearr_14133 = state_14121;(statearr_14133[(11)] = inst_14101);
(statearr_14133[(12)] = inst_14099);
(statearr_14133[(7)] = inst_14082);
(statearr_14133[(8)] = inst_14081);
return statearr_14133;
})();var statearr_14134_14160 = state_14121__$1;(statearr_14134_14160[(2)] = null);
(statearr_14134_14160[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14122 === (9)))
{var inst_14081 = (state_14121[(8)]);var inst_14097 = cljs.core.vec.call(null,inst_14081);var state_14121__$1 = state_14121;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14121__$1,(11),out,inst_14097);
} else
{if((state_val_14122 === (5)))
{var inst_14085 = (state_14121[(9)]);var inst_14082 = (state_14121[(7)]);var inst_14089 = (state_14121[(10)]);var inst_14089__$1 = f.call(null,inst_14085);var inst_14090 = cljs.core._EQ_.call(null,inst_14089__$1,inst_14082);var inst_14091 = cljs.core.keyword_identical_QMARK_.call(null,inst_14082,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));var inst_14092 = (inst_14090) || (inst_14091);var state_14121__$1 = (function (){var statearr_14135 = state_14121;(statearr_14135[(10)] = inst_14089__$1);
return statearr_14135;
})();if(cljs.core.truth_(inst_14092))
{var statearr_14136_14161 = state_14121__$1;(statearr_14136_14161[(1)] = (8));
} else
{var statearr_14137_14162 = state_14121__$1;(statearr_14137_14162[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14122 === (14)))
{var inst_14114 = (state_14121[(2)]);var inst_14115 = cljs.core.async.close_BANG_.call(null,out);var state_14121__$1 = (function (){var statearr_14139 = state_14121;(statearr_14139[(13)] = inst_14114);
return statearr_14139;
})();var statearr_14140_14163 = state_14121__$1;(statearr_14140_14163[(2)] = inst_14115);
(statearr_14140_14163[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14122 === (10)))
{var inst_14104 = (state_14121[(2)]);var state_14121__$1 = state_14121;var statearr_14141_14164 = state_14121__$1;(statearr_14141_14164[(2)] = inst_14104);
(statearr_14141_14164[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14122 === (8)))
{var inst_14085 = (state_14121[(9)]);var inst_14081 = (state_14121[(8)]);var inst_14089 = (state_14121[(10)]);var inst_14094 = inst_14081.push(inst_14085);var tmp14138 = inst_14081;var inst_14081__$1 = tmp14138;var inst_14082 = inst_14089;var state_14121__$1 = (function (){var statearr_14142 = state_14121;(statearr_14142[(7)] = inst_14082);
(statearr_14142[(8)] = inst_14081__$1);
(statearr_14142[(14)] = inst_14094);
return statearr_14142;
})();var statearr_14143_14165 = state_14121__$1;(statearr_14143_14165[(2)] = null);
(statearr_14143_14165[(1)] = (2));
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
});})(c__7126__auto___14151,out))
;return ((function (switch__7111__auto__,c__7126__auto___14151,out){
return (function() {
var state_machine__7112__auto__ = null;
var state_machine__7112__auto____0 = (function (){var statearr_14147 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_14147[(0)] = state_machine__7112__auto__);
(statearr_14147[(1)] = (1));
return statearr_14147;
});
var state_machine__7112__auto____1 = (function (state_14121){while(true){
var ret_value__7113__auto__ = (function (){try{while(true){
var result__7114__auto__ = switch__7111__auto__.call(null,state_14121);if(cljs.core.keyword_identical_QMARK_.call(null,result__7114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__7114__auto__;
}
break;
}
}catch (e14148){if((e14148 instanceof Object))
{var ex__7115__auto__ = e14148;var statearr_14149_14166 = state_14121;(statearr_14149_14166[(5)] = ex__7115__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14121);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14148;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7113__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14167 = state_14121;
state_14121 = G__14167;
continue;
}
} else
{return ret_value__7113__auto__;
}
break;
}
});
state_machine__7112__auto__ = function(state_14121){
switch(arguments.length){
case 0:
return state_machine__7112__auto____0.call(this);
case 1:
return state_machine__7112__auto____1.call(this,state_14121);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__7112__auto____0;
state_machine__7112__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__7112__auto____1;
return state_machine__7112__auto__;
})()
;})(switch__7111__auto__,c__7126__auto___14151,out))
})();var state__7128__auto__ = (function (){var statearr_14150 = f__7127__auto__.call(null);(statearr_14150[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7126__auto___14151);
return statearr_14150;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7128__auto__);
});})(c__7126__auto___14151,out))
);
return out;
});
partition_by = function(f,ch,buf_or_n){
switch(arguments.length){
case 2:
return partition_by__2.call(this,f,ch);
case 3:
return partition_by__3.call(this,f,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
partition_by.cljs$core$IFn$_invoke$arity$2 = partition_by__2;
partition_by.cljs$core$IFn$_invoke$arity$3 = partition_by__3;
return partition_by;
})()
;
