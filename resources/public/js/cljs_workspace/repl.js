// Compiled by ClojureScript 0.0-2342
goog.provide('cljs_workspace.repl');
goog.require('cljs.core');
goog.require('clojure.browser.repl');
goog.require('clojure.browser.repl');
cljs.core.enable_console_print_BANG_.call(null);
cljs_workspace.repl.port = (9050);
cljs_workspace.repl.host = document.location.hostname;
clojure.browser.repl.connect.call(null,("http://"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs_workspace.repl.host)+":"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs_workspace.repl.port)+"/repl"));
cljs.core.println.call(null,"repl connected on port ",cljs_workspace.repl.port);
