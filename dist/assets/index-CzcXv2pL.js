var e=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var t=e((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var ee=Array.isArray;function S(){}var C={H:null,A:null,T:null,S:null},w=Object.prototype.hasOwnProperty;function te(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function ne(e,t){return te(e.type,t,e.props)}function T(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function re(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ie=/\/+/g;function ae(e,t){return typeof e==`object`&&e&&e.key!=null?re(``+e.key):t.toString(36)}function oe(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(S,S):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function se(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,se(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+ae(e,0):a,ee(o)?(i=``,c!=null&&(i=c.replace(ie,`$&/`)+`/`),se(o,r,i,``,function(e){return e})):o!=null&&(T(o)&&(o=ne(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ie,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(ee(e))for(var u=0;u<e.length;u++)a=e[u],s=l+ae(a,u),c+=se(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+ae(a,u++),c+=se(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return se(oe(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ce(e,t,n){if(e==null)return e;var r=[],i=0;return se(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function le(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var E=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},D={map:ce,forEach:function(e,t,n){ce(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ce(e,function(){t++}),t},toArray:function(e){return ce(e,function(e){return e})||[]},only:function(e){if(!T(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=D,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=C,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return C.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!w.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return te(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)w.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return te(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=T,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:le}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=C.T,n={};C.T=n;try{var r=e(),i=C.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(S,E)}catch(e){E(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),C.T=t}},e.unstable_useCacheRefresh=function(){return C.H.useCacheRefresh()},e.use=function(e){return C.H.use(e)},e.useActionState=function(e,t,n){return C.H.useActionState(e,t,n)},e.useCallback=function(e,t){return C.H.useCallback(e,t)},e.useContext=function(e){return C.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return C.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return C.H.useEffect(e,t)},e.useEffectEvent=function(e){return C.H.useEffectEvent(e)},e.useId=function(){return C.H.useId()},e.useImperativeHandle=function(e,t,n){return C.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return C.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return C.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return C.H.useMemo(e,t)},e.useOptimistic=function(e,t){return C.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return C.H.useReducer(e,t,n)},e.useRef=function(e){return C.H.useRef(e)},e.useState=function(e){return C.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return C.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return C.H.useTransition()},e.version=`19.2.8`})),n=e(((e,n)=>{n.exports=t()})),r=e((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,ee||(ee=!0,T());else{var t=n(l);t!==null&&ae(x,t.startTime-e)}}}var ee=!1,S=-1,C=5,w=-1;function te(){return g?!0:!(e.unstable_now()-w<C)}function ne(){if(g=!1,ee){var t=e.unstable_now();w=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(S),S=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&te());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ae(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?T():ee=!1}}}var T;if(typeof y==`function`)T=function(){y(ne)};else if(typeof MessageChannel<`u`){var re=new MessageChannel,ie=re.port2;re.port1.onmessage=ne,T=function(){ie.postMessage(null)}}else T=function(){_(ne,0)};function ae(t,n){S=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):C=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(S),S=-1):h=!0,ae(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,ee||(ee=!0,T()))),r},e.unstable_shouldYield=te,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),i=e(((e,t)=>{t.exports=r()})),a=e((e=>{var t=n();function r(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function i(){}var a={d:{f:i,r:function(){throw Error(r(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},o=Symbol.for(`react.portal`);function s(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var c=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function l(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,e.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(r(299));return s(e,t,null,n)},e.flushSync=function(e){var t=c.T,n=a.p;try{if(c.T=null,a.p=2,e)return e()}finally{c.T=t,a.p=n,a.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,a.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&a.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=l(n,t.crossOrigin),i=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?a.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:i,fetchPriority:o}):n===`script`&&a.d.X(e,{crossOrigin:r,integrity:i,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=l(t.as,t.crossOrigin);a.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??a.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=l(n,t.crossOrigin);a.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=l(t.as,t.crossOrigin);a.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else a.d.m(e)}},e.requestFormReset=function(e){a.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return c.H.useFormState(e,t,n)},e.useFormStatus=function(){return c.H.useHostTransitionStatus()},e.version=`19.2.8`})),o=e(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=a()})),s=e((e=>{var t=i(),r=n(),a=o();function s(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function c(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function l(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function u(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function d(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function f(e){if(l(e)!==e)throw Error(s(188))}function p(e){var t=e.alternate;if(!t){if(t=l(e),t===null)throw Error(s(188));return t===e?e:null}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var a=i.alternate;if(a===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===n)return f(i),e;if(a===r)return f(i),t;a=a.sibling}throw Error(s(188))}if(n.return!==r.return)n=i,r=a;else{for(var o=!1,c=i.child;c;){if(c===n){o=!0,n=i,r=a;break}if(c===r){o=!0,r=i,n=a;break}c=c.sibling}if(!o){for(c=a.child;c;){if(c===n){o=!0,n=a,r=i;break}if(c===r){o=!0,r=a,n=i;break}c=c.sibling}if(!o)throw Error(s(189))}}if(n.alternate!==r)throw Error(s(190))}if(n.tag!==3)throw Error(s(188));return n.stateNode.current===n?e:t}function m(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=m(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),ee=Symbol.for(`react.consumer`),S=Symbol.for(`react.context`),C=Symbol.for(`react.forward_ref`),w=Symbol.for(`react.suspense`),te=Symbol.for(`react.suspense_list`),ne=Symbol.for(`react.memo`),T=Symbol.for(`react.lazy`),re=Symbol.for(`react.activity`),ie=Symbol.for(`react.memo_cache_sentinel`),ae=Symbol.iterator;function oe(e){return typeof e!=`object`||!e?null:(e=ae&&e[ae]||e[`@@iterator`],typeof e==`function`?e:null)}var se=Symbol.for(`react.client.reference`);function ce(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===se?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case w:return`Suspense`;case te:return`SuspenseList`;case re:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case S:return e.displayName||`Context`;case ee:return(e._context.displayName||`Context`)+`.Consumer`;case C:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case ne:return t=e.displayName||null,t===null?ce(e.type)||`Memo`:t;case T:t=e._payload,e=e._init;try{return ce(e(t))}catch{}}return null}var le=Array.isArray,E=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,D=a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ue={pending:!1,data:null,method:null,action:null},de=[],fe=-1;function pe(e){return{current:e}}function O(e){0>fe||(e.current=de[fe],de[fe]=null,fe--)}function k(e,t){fe++,de[fe]=e.current,e.current=t}var me=pe(null),he=pe(null),ge=pe(null),_e=pe(null);function ve(e,t){switch(k(ge,t),k(he,e),k(me,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}O(me),k(me,e)}function ye(){O(me),O(he),O(ge)}function be(e){e.memoizedState!==null&&k(_e,e);var t=me.current,n=Hd(t,e.type);t!==n&&(k(he,e),k(me,n))}function xe(e){he.current===e&&(O(me),O(he)),_e.current===e&&(O(_e),Qf._currentValue=ue)}var Se,Ce;function we(e){if(Se===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Se=t&&t[1]||``,Ce=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Se+e+Ce}var Te=!1;function Ee(e,t){if(!e||Te)return``;Te=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Te=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?we(n):``}function De(e,t){switch(e.tag){case 26:case 27:case 5:return we(e.type);case 16:return we(`Lazy`);case 13:return e.child!==t&&t!==null?we(`Suspense Fallback`):we(`Suspense`);case 19:return we(`SuspenseList`);case 0:case 15:return Ee(e.type,!1);case 11:return Ee(e.type.render,!1);case 1:return Ee(e.type,!0);case 31:return we(`Activity`);default:return``}}function Oe(e){try{var t=``,n=null;do t+=De(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var ke=Object.prototype.hasOwnProperty,Ae=t.unstable_scheduleCallback,je=t.unstable_cancelCallback,Me=t.unstable_shouldYield,Ne=t.unstable_requestPaint,Pe=t.unstable_now,Fe=t.unstable_getCurrentPriorityLevel,Ie=t.unstable_ImmediatePriority,Le=t.unstable_UserBlockingPriority,Re=t.unstable_NormalPriority,ze=t.unstable_LowPriority,Be=t.unstable_IdlePriority,Ve=t.log,He=t.unstable_setDisableYieldValue,Ue=null,We=null;function Ge(e){if(typeof Ve==`function`&&He(e),We&&typeof We.setStrictMode==`function`)try{We.setStrictMode(Ue,e)}catch{}}var Ke=Math.clz32?Math.clz32:Ye,qe=Math.log,Je=Math.LN2;function Ye(e){return e>>>=0,e===0?32:31-(qe(e)/Je|0)|0}var Xe=256,Ze=262144,Qe=4194304;function $e(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function et(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=$e(n))):i=$e(o):i=$e(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=$e(n))):i=$e(o)):i=$e(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function tt(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function nt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function rt(){var e=Qe;return Qe<<=1,!(Qe&62914560)&&(Qe=4194304),e}function it(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function at(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function ot(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Ke(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&st(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function st(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Ke(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function ct(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ke(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function lt(e,t){var n=t&-t;return n=n&42?1:ut(n),(n&(e.suspendedLanes|t))===0?n:0}function ut(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function dt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function ft(){var e=D.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function pt(e,t){var n=D.p;try{return D.p=e,t()}finally{D.p=n}}var mt=Math.random().toString(36).slice(2),ht=`__reactFiber$`+mt,gt=`__reactProps$`+mt,A=`__reactContainer$`+mt,_t=`__reactEvents$`+mt,vt=`__reactListeners$`+mt,yt=`__reactHandles$`+mt,bt=`__reactResources$`+mt,xt=`__reactMarker$`+mt;function St(e){delete e[ht],delete e[gt],delete e[_t],delete e[vt],delete e[yt]}function Ct(e){var t=e[ht];if(t)return t;for(var n=e.parentNode;n;){if(t=n[A]||n[ht]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[ht])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function wt(e){if(e=e[ht]||e[A]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Tt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(s(33))}function Et(e){var t=e[bt];return t||=e[bt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Dt(e){e[xt]=!0}var Ot=new Set,kt={};function At(e,t){jt(e,t),jt(e+`Capture`,t)}function jt(e,t){for(kt[e]=t,e=0;e<t.length;e++)Ot.add(t[e])}var Mt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Nt={},Pt={};function Ft(e){return ke.call(Pt,e)?!0:ke.call(Nt,e)?!1:Mt.test(e)?Pt[e]=!0:(Nt[e]=!0,!1)}function It(e,t,n){if(Ft(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}}function Lt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Rt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function j(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function zt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Bt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Vt(e){if(!e._valueTracker){var t=zt(e)?`checked`:`value`;e._valueTracker=Bt(e,t,``+e[t])}}function Ht(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=zt(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}function Ut(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Wt=/[\n"\\]/g;function Gt(e){return e.replace(Wt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Kt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+j(t)):e.value!==``+j(t)&&(e.value=``+j(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Jt(e,o,j(n)):Jt(e,o,j(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+j(s):e.removeAttribute(`name`)}function qt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Vt(e);return}n=n==null?``:``+j(n),t=t==null?n:``+j(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Vt(e)}function Jt(e,t,n){t===`number`&&Ut(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Yt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+j(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Xt(e,t,n){if(t!=null&&(t=``+j(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+j(n)}function Zt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(s(92));if(le(r)){if(1<r.length)throw Error(s(93));r=r[0]}n=r}n??=``,t=n}n=j(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Vt(e)}function Qt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var $t=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function en(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||$t.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function tn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(s(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var i in t)r=t[i],t.hasOwnProperty(i)&&n[i]!==r&&en(e,i,r)}else for(var a in t)t.hasOwnProperty(a)&&en(e,a,t[a])}function nn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var rn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),an=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function on(e){return an.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function sn(){}var cn=null;function ln(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var un=null,dn=null;function fn(e){var t=wt(e);if(t&&(e=t.stateNode)){var n=e[gt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Kt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Gt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=r[gt]||null;if(!i)throw Error(s(90));Kt(r,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Ht(r)}break a;case`textarea`:Xt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Yt(e,!!n.multiple,t,!1)}}}var pn=!1;function mn(e,t,n){if(pn)return e(t,n);pn=!0;try{return e(t)}finally{if(pn=!1,(un!==null||dn!==null)&&(bu(),un&&(t=un,e=dn,dn=un=null,fn(t),e)))for(t=0;t<e.length;t++)fn(e[t])}}function hn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[gt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(s(231,t,typeof n));return n}var gn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),_n=!1;if(gn)try{var vn={};Object.defineProperty(vn,"passive",{get:function(){_n=!0}}),window.addEventListener(`test`,vn,vn),window.removeEventListener(`test`,vn,vn)}catch{_n=!1}var yn=null,bn=null,xn=null;function Sn(){if(xn)return xn;var e,t=bn,n=t.length,r,i=`value`in yn?yn.value:yn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return xn=i.slice(e,1<r?1-r:void 0)}function Cn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function wn(){return!0}function Tn(){return!1}function En(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?wn:Tn,this.isPropagationStopped=Tn,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=wn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=wn)},persist:function(){},isPersistent:wn}),t}var Dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},On=En(Dn),kn=h({},Dn,{view:0,detail:0}),An=En(kn),jn,Mn,Nn,Pn=h({},kn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Gn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Nn&&(Nn&&e.type===`mousemove`?(jn=e.screenX-Nn.screenX,Mn=e.screenY-Nn.screenY):Mn=jn=0,Nn=e),jn)},movementY:function(e){return`movementY`in e?e.movementY:Mn}}),Fn=En(Pn),In=En(h({},Pn,{dataTransfer:0})),Ln=En(h({},kn,{relatedTarget:0})),Rn=En(h({},Dn,{animationName:0,elapsedTime:0,pseudoElement:0})),zn=En(h({},Dn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Bn=En(h({},Dn,{data:0})),Vn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Hn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Un={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Wn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Un[e])?!!t[e]:!1}function Gn(){return Wn}var Kn=En(h({},kn,{key:function(e){if(e.key){var t=Vn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Cn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Hn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Gn,charCode:function(e){return e.type===`keypress`?Cn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Cn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),qn=En(h({},Pn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Jn=En(h({},kn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Gn})),Yn=En(h({},Dn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Xn=En(h({},Pn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Zn=En(h({},Dn,{newState:0,oldState:0})),Qn=[9,13,27,32],$n=gn&&`CompositionEvent`in window,er=null;gn&&`documentMode`in document&&(er=document.documentMode);var tr=gn&&`TextEvent`in window&&!er,nr=gn&&(!$n||er&&8<er&&11>=er),rr=` `,ir=!1;function ar(e,t){switch(e){case`keyup`:return Qn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function or(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var sr=!1;function M(e,t){switch(e){case`compositionend`:return or(t);case`keypress`:return t.which===32?(ir=!0,rr):null;case`textInput`:return e=t.data,e===rr&&ir?null:e;default:return null}}function cr(e,t){if(sr)return e===`compositionend`||!$n&&ar(e,t)?(e=Sn(),xn=bn=yn=null,sr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return nr&&t.locale!==`ko`?null:t.data;default:return null}}var lr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ur(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!lr[e.type]:t===`textarea`}function dr(e,t,n,r){un?dn?dn.push(r):dn=[r]:un=r,t=Ed(t,`onChange`),0<t.length&&(n=new On(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var fr=null,pr=null;function mr(e){yd(e,0)}function hr(e){if(Ht(Tt(e)))return e}function gr(e,t){if(e===`change`)return t}var _r=!1;if(gn){var vr;if(gn){var yr=`oninput`in document;if(!yr){var br=document.createElement(`div`);br.setAttribute(`oninput`,`return;`),yr=typeof br.oninput==`function`}vr=yr}else vr=!1;_r=vr&&(!document.documentMode||9<document.documentMode)}function xr(){fr&&(fr.detachEvent(`onpropertychange`,Sr),pr=fr=null)}function Sr(e){if(e.propertyName===`value`&&hr(pr)){var t=[];dr(t,pr,e,ln(e)),mn(mr,t)}}function Cr(e,t,n){e===`focusin`?(xr(),fr=t,pr=n,fr.attachEvent(`onpropertychange`,Sr)):e===`focusout`&&xr()}function wr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return hr(pr)}function Tr(e,t){if(e===`click`)return hr(t)}function Er(e,t){if(e===`input`||e===`change`)return hr(t)}function Dr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Or=typeof Object.is==`function`?Object.is:Dr;function kr(e,t){if(Or(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!ke.call(t,i)||!Or(e[i],t[i]))return!1}return!0}function Ar(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function jr(e,t){var n=Ar(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Ar(n)}}function Mr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Mr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Nr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ut(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ut(e.document)}return t}function Pr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Fr=gn&&`documentMode`in document&&11>=document.documentMode,Ir=null,Lr=null,Rr=null,zr=!1;function Br(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;zr||Ir==null||Ir!==Ut(r)||(r=Ir,`selectionStart`in r&&Pr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Rr&&kr(Rr,r)||(Rr=r,r=Ed(Lr,`onSelect`),0<r.length&&(t=new On(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Ir)))}function Vr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Hr={animationend:Vr(`Animation`,`AnimationEnd`),animationiteration:Vr(`Animation`,`AnimationIteration`),animationstart:Vr(`Animation`,`AnimationStart`),transitionrun:Vr(`Transition`,`TransitionRun`),transitionstart:Vr(`Transition`,`TransitionStart`),transitioncancel:Vr(`Transition`,`TransitionCancel`),transitionend:Vr(`Transition`,`TransitionEnd`)},Ur={},Wr={};gn&&(Wr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Hr.animationend.animation,delete Hr.animationiteration.animation,delete Hr.animationstart.animation),`TransitionEvent`in window||delete Hr.transitionend.transition);function Gr(e){if(Ur[e])return Ur[e];if(!Hr[e])return e;var t=Hr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Wr)return Ur[e]=t[n];return e}var Kr=Gr(`animationend`),qr=Gr(`animationiteration`),Jr=Gr(`animationstart`),Yr=Gr(`transitionrun`),Xr=Gr(`transitionstart`),Zr=Gr(`transitioncancel`),Qr=Gr(`transitionend`),$r=new Map,ei=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);ei.push(`scrollEnd`);function ti(e,t){$r.set(e,t),At(t,[e])}var ni=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},ri=[],ii=0,ai=0;function N(){for(var e=ii,t=ai=ii=0;t<e;){var n=ri[t];ri[t++]=null;var r=ri[t];ri[t++]=null;var i=ri[t];ri[t++]=null;var a=ri[t];if(ri[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&li(n,i,a)}}function oi(e,t,n,r){ri[ii++]=e,ri[ii++]=t,ri[ii++]=n,ri[ii++]=r,ai|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function si(e,t,n,r){return oi(e,t,n,r),ui(e)}function ci(e,t){return oi(e,null,null,t),ui(e)}function li(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Ke(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ui(e){if(50<du)throw du=0,fu=null,Error(s(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var di={};function fi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function pi(e,t,n,r){return new fi(e,t,n,r)}function mi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function hi(e,t){var n=e.alternate;return n===null?(n=pi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function gi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function _i(e,t,n,r,i,a){var o=0;if(r=e,typeof e==`function`)mi(e)&&(o=1);else if(typeof e==`string`)o=Uf(e,n,me.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case re:return e=pi(31,n,t,i),e.elementType=re,e.lanes=a,e;case y:return vi(n.children,i,a,t);case b:o=8,i|=24;break;case x:return e=pi(12,n,t,i|2),e.elementType=x,e.lanes=a,e;case w:return e=pi(13,n,t,i),e.elementType=w,e.lanes=a,e;case te:return e=pi(19,n,t,i),e.elementType=te,e.lanes=a,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case S:o=10;break a;case ee:o=9;break a;case C:o=11;break a;case ne:o=14;break a;case T:o=16,r=null;break a}o=29,n=Error(s(130,e===null?`null`:typeof e,``)),r=null}return t=pi(o,n,t,i),t.elementType=e,t.type=r,t.lanes=a,t}function vi(e,t,n,r){return e=pi(7,e,r,t),e.lanes=n,e}function yi(e,t,n){return e=pi(6,e,null,t),e.lanes=n,e}function bi(e){var t=pi(18,null,null,0);return t.stateNode=e,t}function xi(e,t,n){return t=pi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Si=new WeakMap;function Ci(e,t){if(typeof e==`object`&&e){var n=Si.get(e);return n===void 0?(t={value:e,source:t,stack:Oe(t)},Si.set(e,t),t):n}return{value:e,source:t,stack:Oe(t)}}var wi=[],Ti=0,Ei=null,Di=0,Oi=[],ki=0,Ai=null,ji=1,Mi=``;function Ni(e,t){wi[Ti++]=Di,wi[Ti++]=Ei,Ei=e,Di=t}function Pi(e,t,n){Oi[ki++]=ji,Oi[ki++]=Mi,Oi[ki++]=Ai,Ai=e;var r=ji;e=Mi;var i=32-Ke(r)-1;r&=~(1<<i),n+=1;var a=32-Ke(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,ji=1<<32-Ke(t)+i|n<<i|r,Mi=a+e}else ji=1<<a|n<<i|r,Mi=e}function Fi(e){e.return!==null&&(Ni(e,1),Pi(e,1,0))}function Ii(e){for(;e===Ei;)Ei=wi[--Ti],wi[Ti]=null,Di=wi[--Ti],wi[Ti]=null;for(;e===Ai;)Ai=Oi[--ki],Oi[ki]=null,Mi=Oi[--ki],Oi[ki]=null,ji=Oi[--ki],Oi[ki]=null}function Li(e,t){Oi[ki++]=ji,Oi[ki++]=Mi,Oi[ki++]=Ai,ji=t.id,Mi=t.overflow,Ai=e}var P=null,F=null,I=!1,Ri=null,zi=!1,Bi=Error(s(519));function Vi(e){throw qi(Ci(Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Bi}function Hi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[ht]=e,t[gt]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),qt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),Zt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=sn),t=!0):t=!1,t||Vi(e,!0)}function Ui(e){for(P=e.return;P;)switch(P.tag){case 5:case 31:case 13:zi=!1;return;case 27:case 3:zi=!0;return;default:P=P.return}}function Wi(e){if(e!==P)return!1;if(!I)return Ui(e),I=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||Ud(e.type,e.memoizedProps)),n=!n),n&&F&&Vi(e),Ui(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(317));F=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(317));F=uf(e)}else t===27?(t=F,Zd(e.type)?(e=lf,lf=null,F=e):F=t):F=P?cf(e.stateNode.nextSibling):null;return!0}function Gi(){F=P=null,I=!1}function Ki(){var e=Ri;return e!==null&&(Zl===null?Zl=e:Zl.push.apply(Zl,e),Ri=null),e}function qi(e){Ri===null?Ri=[e]:Ri.push(e)}var Ji=pe(null),Yi=null,Xi=null;function Zi(e,t,n){k(Ji,t._currentValue),t._currentValue=n}function Qi(e){e._currentValue=Ji.current,O(Ji)}function $i(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function ea(e,t,n,r){var i=e.child;for(i!==null&&(i.return=e);i!==null;){var a=i.dependencies;if(a!==null){var o=i.child;a=a.firstContext;a:for(;a!==null;){var c=a;a=i;for(var l=0;l<t.length;l++)if(c.context===t[l]){a.lanes|=n,c=a.alternate,c!==null&&(c.lanes|=n),$i(a.return,n,e),r||(o=null);break a}a=c.next}}else if(i.tag===18){if(o=i.return,o===null)throw Error(s(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),$i(o,n,e),o=null}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}}function ta(e,t,n,r){e=null;for(var i=t,a=!1;i!==null;){if(!a){if(i.flags&524288)a=!0;else if(i.flags&262144)break}if(i.tag===10){var o=i.alternate;if(o===null)throw Error(s(387));if(o=o.memoizedProps,o!==null){var c=i.type;Or(i.pendingProps.value,o.value)||(e===null?e=[c]:e.push(c))}}else if(i===_e.current){if(o=i.alternate,o===null)throw Error(s(387));o.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}i=i.return}e!==null&&ea(t,e,n,r),t.flags|=262144}function na(e){for(e=e.firstContext;e!==null;){if(!Or(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ra(e){Yi=e,Xi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ia(e){return oa(Yi,e)}function aa(e,t){return Yi===null&&ra(e),oa(e,t)}function oa(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Xi===null){if(e===null)throw Error(s(308));Xi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Xi=Xi.next=t;return n}var sa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},ca=t.unstable_scheduleCallback,la=t.unstable_NormalPriority,ua={$$typeof:S,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function da(){return{controller:new sa,data:new Map,refCount:0}}function fa(e){e.refCount--,e.refCount===0&&ca(la,function(){e.controller.abort()})}var pa=null,ma=0,ha=0,ga=null;function _a(e,t){if(pa===null){var n=pa=[];ma=0,ha=dd(),ga={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return ma++,t.then(va,va),t}function va(){if(--ma===0&&pa!==null){ga!==null&&(ga.status=`fulfilled`);var e=pa;pa=null,ha=0,ga=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function ya(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var ba=E.S;E.S=function(e,t){eu=Pe(),typeof t==`object`&&t&&typeof t.then==`function`&&_a(e,t),ba!==null&&ba(e,t)};var xa=pe(null);function Sa(){var e=xa.current;return e===null?q.pooledCache:e}function Ca(e,t){t===null?k(xa,xa.current):k(xa,t.pool)}function L(){var e=Sa();return e===null?null:{parent:ua._currentValue,pool:e}}var wa=Error(s(460)),Ta=Error(s(474)),Ea=Error(s(542)),Da={then:function(){}};function Oa(e){return e=e.status,e===`fulfilled`||e===`rejected`}function ka(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(sn,sn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Na(e),e;default:if(typeof t.status==`string`)t.then(sn,sn);else{if(e=q,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Na(e),e}throw ja=t,wa}}function Aa(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(ja=e,wa):e}}var ja=null;function Ma(){if(ja===null)throw Error(s(459));var e=ja;return ja=null,e}function Na(e){if(e===wa||e===Ea)throw Error(s(483))}var Pa=null,Fa=0;function Ia(e){var t=Fa;return Fa+=1,Pa===null&&(Pa=[]),ka(Pa,e,t)}function La(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Ra(e,t){throw t.$$typeof===g?Error(s(525)):(e=Object.prototype.toString.call(t),Error(s(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function za(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function i(e,t){return e=hi(e,t),e.index=0,e.sibling=null,e}function a(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function o(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=yi(n,e.mode,r),t.return=e,t):(t=i(t,n),t.return=e,t)}function l(e,t,n,r){var a=n.type;return a===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===a||typeof a==`object`&&a&&a.$$typeof===T&&Aa(a)===t.type)?(t=i(t,n.props),La(t,n),t.return=e,t):(t=_i(n.type,n.key,n.props,null,e.mode,r),La(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=xi(n,e.mode,r),t.return=e,t):(t=i(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,a){return t===null||t.tag!==7?(t=vi(n,e.mode,r,a),t.return=e,t):(t=i(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=yi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=_i(t.type,t.key,t.props,null,e.mode,n),La(n,t),n.return=e,n;case v:return t=xi(t,e.mode,n),t.return=e,t;case T:return t=Aa(t),f(e,t,n)}if(le(t)||oe(t))return t=vi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Ia(t),n);if(t.$$typeof===S)return f(e,aa(e,t),n);Ra(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case T:return n=Aa(n),p(e,t,n,r)}if(le(n)||oe(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Ia(n),r);if(n.$$typeof===S)return p(e,t,aa(e,n),r);Ra(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case T:return r=Aa(r),m(e,t,n,r,i)}if(le(r)||oe(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Ia(r),i);if(r.$$typeof===S)return m(e,t,n,aa(t,r),i);Ra(t,r)}return null}function h(i,o,s,c){for(var l=null,u=null,d=o,h=o=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),o=a(_,o,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),I&&Ni(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(o=a(d,o,h),u===null?l=d:u.sibling=d,u=d);return I&&Ni(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),o=a(g,o,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),I&&Ni(i,h),l}function g(i,o,c,l){if(c==null)throw Error(s(151));for(var u=null,d=null,h=o,g=o=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(i,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(i,h),o=a(y,o,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(i,h),I&&Ni(i,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(i,v.value,l),v!==null&&(o=a(v,o,g),d===null?u=v:d.sibling=v,d=v);return I&&Ni(i,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,i,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),o=a(v,o,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(i,e)}),I&&Ni(i,g),u}function b(e,r,a,c){if(typeof a==`object`&&a&&a.type===y&&a.key===null&&(a=a.props.children),typeof a==`object`&&a){switch(a.$$typeof){case _:a:{for(var l=a.key;r!==null;){if(r.key===l){if(l=a.type,l===y){if(r.tag===7){n(e,r.sibling),c=i(r,a.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===T&&Aa(l)===r.type){n(e,r.sibling),c=i(r,a.props),La(c,a),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}a.type===y?(c=vi(a.props.children,e.mode,c,a.key),c.return=e,e=c):(c=_i(a.type,a.key,a.props,null,e.mode,c),La(c,a),c.return=e,e=c)}return o(e);case v:a:{for(l=a.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===a.containerInfo&&r.stateNode.implementation===a.implementation){n(e,r.sibling),c=i(r,a.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=xi(a,e.mode,c),c.return=e,e=c}return o(e);case T:return a=Aa(a),b(e,r,a,c)}if(le(a))return h(e,r,a,c);if(oe(a)){if(l=oe(a),typeof l!=`function`)throw Error(s(150));return a=l.call(a),g(e,r,a,c)}if(typeof a.then==`function`)return b(e,r,Ia(a),c);if(a.$$typeof===S)return b(e,r,aa(e,a),c);Ra(e,a)}return typeof a==`string`&&a!==``||typeof a==`number`||typeof a==`bigint`?(a=``+a,r!==null&&r.tag===6?(n(e,r.sibling),c=i(r,a),c.return=e,e=c):(n(e,r),c=yi(a,e.mode,c),c.return=e,e=c),o(e)):n(e,r)}return function(e,t,n,r){try{Fa=0;var i=b(e,t,n,r);return Pa=null,i}catch(t){if(t===wa||t===Ea)throw t;var a=pi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Ba=za(!0),Va=za(!1),Ha=!1;function Ua(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Wa(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ga(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ka(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,K&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ui(e),li(e,null,n),t}return oi(e,r,t,n),ui(e)}function qa(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ct(e,n)}}function Ja(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Ya=!1;function Xa(){if(Ya){var e=ga;if(e!==null)throw e}}function Za(e,t,n,r){Ya=!1;var i=e.updateQueue;Ha=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Y&f)===f:(r&f)===f){f!==0&&f===ha&&(Ya=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:Ha=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Gl|=o,e.lanes=o,e.memoizedState=d}}function Qa(e,t){if(typeof e!=`function`)throw Error(s(191,e));e.call(t)}function $a(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Qa(n[e],t)}var eo=pe(null),to=pe(0);function no(e,t){e=Ul,k(to,e),k(eo,t),Ul=e|t.baseLanes}function ro(){k(to,Ul),k(eo,eo.current)}function io(){Ul=to.current,O(eo),O(to)}var ao=pe(null),oo=null;function so(e){var t=e.alternate;k(R,R.current&1),k(ao,e),oo===null&&(t===null||eo.current!==null||t.memoizedState!==null)&&(oo=e)}function co(e){k(R,R.current),k(ao,e),oo===null&&(oo=e)}function lo(e){e.tag===22?(k(R,R.current),k(ao,e),oo===null&&(oo=e)):uo(e)}function uo(){k(R,R.current),k(ao,ao.current)}function fo(e){O(ao),oo===e&&(oo=null),O(R)}var R=pe(0);function po(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var mo=0,z=null,B=null,ho=null,go=!1,_o=!1,vo=!1,yo=0,bo=0,xo=null,So=0;function V(){throw Error(s(321))}function Co(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Or(e[n],t[n]))return!1;return!0}function wo(e,t,n,r,i,a){return mo=a,z=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,E.H=e===null||e.memoizedState===null?Bs:Vs,vo=!1,a=n(r,i),vo=!1,_o&&(a=Eo(t,n,r,i)),To(e),a}function To(e){E.H=zs;var t=B!==null&&B.next!==null;if(mo=0,ho=B=z=null,go=!1,bo=0,xo=null,t)throw Error(s(300));e===null||ic||(e=e.dependencies,e!==null&&na(e)&&(ic=!0))}function Eo(e,t,n,r){z=e;var i=0;do{if(_o&&(xo=null),bo=0,_o=!1,25<=i)throw Error(s(301));if(i+=1,ho=B=null,e.updateQueue!=null){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}E.H=Hs,a=t(n,r)}while(_o);return a}function Do(){var e=E.H,t=e.useState()[0];return t=typeof t.then==`function`?Po(t):t,e=e.useState()[0],(B===null?null:B.memoizedState)!==e&&(z.flags|=1024),t}function Oo(){var e=yo!==0;return yo=0,e}function ko(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Ao(e){if(go){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}go=!1}mo=0,ho=B=z=null,_o=!1,bo=yo=0,xo=null}function jo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ho===null?z.memoizedState=ho=e:ho=ho.next=e,ho}function Mo(){if(B===null){var e=z.alternate;e=e===null?null:e.memoizedState}else e=B.next;var t=ho===null?z.memoizedState:ho.next;if(t!==null)ho=t,B=e;else{if(e===null)throw z.alternate===null?Error(s(467)):Error(s(310));B=e,e={memoizedState:B.memoizedState,baseState:B.baseState,baseQueue:B.baseQueue,queue:B.queue,next:null},ho===null?z.memoizedState=ho=e:ho=ho.next=e}return ho}function No(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Po(e){var t=bo;return bo+=1,xo===null&&(xo=[]),e=ka(xo,e,t),t=z,(ho===null?t.memoizedState:ho.next)===null&&(t=t.alternate,E.H=t===null||t.memoizedState===null?Bs:Vs),e}function Fo(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Po(e);if(e.$$typeof===S)return ia(e)}throw Error(s(438,String(e)))}function Io(e){var t=null,n=z.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=z.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=No(),z.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ie;return t.index++,n}function Lo(e,t){return typeof t==`function`?t(e):t}function Ro(e){return zo(Mo(),B,e)}function zo(e,t,n){var r=e.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=n;var i=e.baseQueue,a=r.pending;if(a!==null){if(i!==null){var o=i.next;i.next=a.next,a.next=o}t.baseQueue=i=a,r.pending=null}if(a=e.baseState,i===null)e.memoizedState=a;else{t=i.next;var c=o=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(mo&f)===f:(Y&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===ha&&(d=!0);else if((mo&p)===p){u=u.next,p===ha&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,o=a):l=l.next=f,z.lanes|=p,Gl|=p;f=u.action,vo&&n(a,f),a=u.hasEagerState?u.eagerState:n(a,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,o=a):l=l.next=p,z.lanes|=f,Gl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?o=a:l.next=c,!Or(a,e.memoizedState)&&(ic=!0,d&&(n=ga,n!==null)))throw n;e.memoizedState=a,e.baseState=o,e.baseQueue=l,r.lastRenderedState=a}return i===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Bo(e){var t=Mo(),n=t.queue;if(n===null)throw Error(s(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,a=t.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do a=e(a,o.action),o=o.next;while(o!==i);Or(a,t.memoizedState)||(ic=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function Vo(e,t,n){var r=z,i=Mo(),a=I;if(a){if(n===void 0)throw Error(s(407));n=n()}else n=t();var o=!Or((B||i).memoizedState,n);if(o&&(i.memoizedState=n,ic=!0),i=i.queue,fs(Wo.bind(null,r,i,e),[e]),i.getSnapshot!==t||o||ho!==null&&ho.memoizedState.tag&1){if(r.flags|=2048,ss(9,{destroy:void 0},Uo.bind(null,r,i,n,t),null),q===null)throw Error(s(349));a||mo&127||Ho(r,t,n)}return n}function Ho(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=z.updateQueue,t===null?(t=No(),z.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Uo(e,t,n,r){t.value=n,t.getSnapshot=r,Go(t)&&Ko(e)}function Wo(e,t,n){return n(function(){Go(t)&&Ko(e)})}function Go(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Or(e,n)}catch{return!0}}function Ko(e){var t=ci(e,2);t!==null&&hu(t,e,2)}function qo(e){var t=jo();if(typeof e==`function`){var n=e;if(e=n(),vo){Ge(!0);try{n()}finally{Ge(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Lo,lastRenderedState:e},t}function Jo(e,t,n,r){return e.baseState=n,zo(e,B,typeof r==`function`?r:Lo)}function Yo(e,t,n,r,i){if(Is(e))throw Error(s(485));if(e=t.action,e!==null){var a={payload:i,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){a.listeners.push(e)}};E.T===null?a.isTransition=!1:n(!0),r(a),n=t.pending,n===null?(a.next=t.pending=a,Xo(t,a)):(a.next=n.next,t.pending=n.next=a)}}function Xo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=E.T,o={};E.T=o;try{var s=n(i,r),c=E.S;c!==null&&c(o,s),Zo(e,t,s)}catch(n){$o(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),E.T=a}}else try{a=n(i,r),Zo(e,t,a)}catch(n){$o(e,t,n)}}function Zo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Qo(e,t,n)},function(n){return $o(e,t,n)}):Qo(e,t,n)}function Qo(e,t,n){t.status=`fulfilled`,t.value=n,es(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Xo(e,n)))}function $o(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,es(t),t=t.next;while(t!==r)}e.action=null}function es(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function ts(e,t){return t}function ns(e,t){if(I){var n=q.formState;if(n!==null){a:{var r=z;if(I){if(F){b:{for(var i=F,a=zi;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){F=cf(i.nextSibling),r=i.data===`F!`;break a}}Vi(r)}r=!1}r&&(t=n[0])}}return n=jo(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ts,lastRenderedState:t},n.queue=r,n=H.bind(null,z,r),r.dispatch=n,r=qo(!1),a=Fs.bind(null,z,!1,r.queue),r=jo(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Yo.bind(null,z,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function rs(e){return is(Mo(),B,e)}function is(e,t,n){if(t=zo(e,t,ts)[0],e=Ro(Lo)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Po(t)}catch(e){throw e===wa?Ea:e}else r=t;t=Mo();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(z.flags|=2048,ss(9,{destroy:void 0},as.bind(null,i,n),null)),[r,a,e]}function as(e,t){e.action=t}function os(e){var t=Mo(),n=B;if(n!==null)return is(t,n,e);Mo(),t=t.memoizedState,n=Mo();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function ss(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=z.updateQueue,t===null&&(t=No(),z.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function cs(){return Mo().memoizedState}function ls(e,t,n,r){var i=jo();z.flags|=e,i.memoizedState=ss(1|t,{destroy:void 0},n,r===void 0?null:r)}function us(e,t,n,r){var i=Mo();r=r===void 0?null:r;var a=i.memoizedState.inst;B!==null&&r!==null&&Co(r,B.memoizedState.deps)?i.memoizedState=ss(t,a,n,r):(z.flags|=e,i.memoizedState=ss(1|t,a,n,r))}function ds(e,t){ls(8390656,8,e,t)}function fs(e,t){us(2048,8,e,t)}function ps(e){z.flags|=4;var t=z.updateQueue;if(t===null)t=No(),z.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function ms(e){var t=Mo().memoizedState;return ps({ref:t,nextImpl:e}),function(){if(K&2)throw Error(s(440));return t.impl.apply(void 0,arguments)}}function hs(e,t){return us(4,2,e,t)}function gs(e,t){return us(4,4,e,t)}function _s(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function vs(e,t,n){n=n==null?null:n.concat([e]),us(4,4,_s.bind(null,t,e),n)}function ys(){}function bs(e,t){var n=Mo();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Co(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function xs(e,t){var n=Mo();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Co(t,r[1]))return r[0];if(r=e(),vo){Ge(!0);try{e()}finally{Ge(!1)}}return n.memoizedState=[r,t],r}function Ss(e,t,n){return n===void 0||mo&1073741824&&!(Y&261930)?e.memoizedState=t:(e.memoizedState=n,e=mu(),z.lanes|=e,Gl|=e,n)}function Cs(e,t,n,r){return Or(n,t)?n:eo.current===null?!(mo&42)||mo&1073741824&&!(Y&261930)?(ic=!0,e.memoizedState=n):(e=mu(),z.lanes|=e,Gl|=e,t):(e=Ss(e,n,r),Or(e,t)||(ic=!0),e)}function ws(e,t,n,r,i){var a=D.p;D.p=a!==0&&8>a?a:8;var o=E.T,s={};E.T=s,Fs(e,!1,t,n);try{var c=i(),l=E.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Ps(e,t,ya(c,r),pu(e)):Ps(e,t,r,pu(e))}catch(n){Ps(e,t,{then:function(){},status:`rejected`,reason:n},pu())}finally{D.p=a,o!==null&&s.types!==null&&(o.types=s.types),E.T=o}}function Ts(){}function Es(e,t,n,r){if(e.tag!==5)throw Error(s(476));var i=Ds(e).queue;ws(e,i,t,ue,n===null?Ts:function(){return Os(e),n(r)})}function Ds(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ue,baseState:ue,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Lo,lastRenderedState:ue},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Lo,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Os(e){var t=Ds(e);t.next===null&&(t=e.alternate.memoizedState),Ps(e,t.next.queue,{},pu())}function ks(){return ia(Qf)}function As(){return Mo().memoizedState}function js(){return Mo().memoizedState}function Ms(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=pu();e=Ga(n);var r=Ka(t,e,n);r!==null&&(hu(r,t,n),qa(r,t,n)),t={cache:da()},e.payload=t;return}t=t.return}}function Ns(e,t,n){var r=pu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Is(e)?Ls(t,n):(n=si(e,t,n,r),n!==null&&(hu(n,e,r),Rs(n,t,r)))}function H(e,t,n){Ps(e,t,n,pu())}function Ps(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Is(e))Ls(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Or(s,o))return oi(e,t,i,0),q===null&&N(),!1}catch{}if(n=si(e,t,i,r),n!==null)return hu(n,e,r),Rs(n,t,r),!0}return!1}function Fs(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Is(e)){if(t)throw Error(s(479))}else t=si(e,n,r,2),t!==null&&hu(t,e,2)}function Is(e){var t=e.alternate;return e===z||t!==null&&t===z}function Ls(e,t){_o=go=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Rs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ct(e,n)}}var zs={readContext:ia,use:Fo,useCallback:V,useContext:V,useEffect:V,useImperativeHandle:V,useLayoutEffect:V,useInsertionEffect:V,useMemo:V,useReducer:V,useRef:V,useState:V,useDebugValue:V,useDeferredValue:V,useTransition:V,useSyncExternalStore:V,useId:V,useHostTransitionStatus:V,useFormState:V,useActionState:V,useOptimistic:V,useMemoCache:V,useCacheRefresh:V};zs.useEffectEvent=V;var Bs={readContext:ia,use:Fo,useCallback:function(e,t){return jo().memoizedState=[e,t===void 0?null:t],e},useContext:ia,useEffect:ds,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),ls(4194308,4,_s.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ls(4194308,4,e,t)},useInsertionEffect:function(e,t){ls(4,2,e,t)},useMemo:function(e,t){var n=jo();t=t===void 0?null:t;var r=e();if(vo){Ge(!0);try{e()}finally{Ge(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=jo();if(n!==void 0){var i=n(t);if(vo){Ge(!0);try{n(t)}finally{Ge(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Ns.bind(null,z,e),[r.memoizedState,e]},useRef:function(e){var t=jo();return e={current:e},t.memoizedState=e},useState:function(e){e=qo(e);var t=e.queue,n=H.bind(null,z,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:ys,useDeferredValue:function(e,t){return Ss(jo(),e,t)},useTransition:function(){var e=qo(!1);return e=ws.bind(null,z,e.queue,!0,!1),jo().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=z,i=jo();if(I){if(n===void 0)throw Error(s(407));n=n()}else{if(n=t(),q===null)throw Error(s(349));Y&127||Ho(r,t,n)}i.memoizedState=n;var a={value:n,getSnapshot:t};return i.queue=a,ds(Wo.bind(null,r,a,e),[e]),r.flags|=2048,ss(9,{destroy:void 0},Uo.bind(null,r,a,n,t),null),n},useId:function(){var e=jo(),t=q.identifierPrefix;if(I){var n=Mi,r=ji;n=(r&~(1<<32-Ke(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=yo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=So++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:ks,useFormState:ns,useActionState:ns,useOptimistic:function(e){var t=jo();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Fs.bind(null,z,!0,n),n.dispatch=t,[e,t]},useMemoCache:Io,useCacheRefresh:function(){return jo().memoizedState=Ms.bind(null,z)},useEffectEvent:function(e){var t=jo(),n={impl:e};return t.memoizedState=n,function(){if(K&2)throw Error(s(440));return n.impl.apply(void 0,arguments)}}},Vs={readContext:ia,use:Fo,useCallback:bs,useContext:ia,useEffect:fs,useImperativeHandle:vs,useInsertionEffect:hs,useLayoutEffect:gs,useMemo:xs,useReducer:Ro,useRef:cs,useState:function(){return Ro(Lo)},useDebugValue:ys,useDeferredValue:function(e,t){return Cs(Mo(),B.memoizedState,e,t)},useTransition:function(){var e=Ro(Lo)[0],t=Mo().memoizedState;return[typeof e==`boolean`?e:Po(e),t]},useSyncExternalStore:Vo,useId:As,useHostTransitionStatus:ks,useFormState:rs,useActionState:rs,useOptimistic:function(e,t){return Jo(Mo(),B,e,t)},useMemoCache:Io,useCacheRefresh:js};Vs.useEffectEvent=ms;var Hs={readContext:ia,use:Fo,useCallback:bs,useContext:ia,useEffect:fs,useImperativeHandle:vs,useInsertionEffect:hs,useLayoutEffect:gs,useMemo:xs,useReducer:Bo,useRef:cs,useState:function(){return Bo(Lo)},useDebugValue:ys,useDeferredValue:function(e,t){var n=Mo();return B===null?Ss(n,e,t):Cs(n,B.memoizedState,e,t)},useTransition:function(){var e=Bo(Lo)[0],t=Mo().memoizedState;return[typeof e==`boolean`?e:Po(e),t]},useSyncExternalStore:Vo,useId:As,useHostTransitionStatus:ks,useFormState:os,useActionState:os,useOptimistic:function(e,t){var n=Mo();return B===null?(n.baseState=e,[e,n.queue.dispatch]):Jo(n,B,e,t)},useMemoCache:Io,useCacheRefresh:js};Hs.useEffectEvent=ms;function Us(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ws={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Ga(r);i.payload=t,n!=null&&(i.callback=n),t=Ka(e,i,r),t!==null&&(hu(t,e,r),qa(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Ga(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Ka(e,i,r),t!==null&&(hu(t,e,r),qa(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pu(),r=Ga(n);r.tag=2,t!=null&&(r.callback=t),t=Ka(e,r,n),t!==null&&(hu(t,e,n),qa(t,e,n))}};function Gs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!kr(n,r)||!kr(i,a):!0}function Ks(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Ws.enqueueReplaceState(t,t.state,null)}function qs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Js(e){ni(e)}function Ys(e){console.error(e)}function Xs(e){ni(e)}function Zs(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Qs(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function $s(e,t,n){return n=Ga(n),n.tag=3,n.payload={element:null},n.callback=function(){Zs(e,t)},n}function ec(e){return e=Ga(e),e.tag=3,e}function tc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Qs(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Qs(t,n,r),typeof i!=`function`&&(ru===null?ru=new Set([this]):ru.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function nc(e,t,n,r,i){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&ta(t,n,i,!0),n=ao.current,n!==null){switch(n.tag){case 31:case 13:return oo===null?Du():n.alternate===null&&Wl===0&&(Wl=3),n.flags&=-257,n.flags|=65536,n.lanes=i,r===Da?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,i)),!1;case 22:return n.flags|=65536,r===Da?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,i)),!1}throw Error(s(435,n.tag))}return Gu(e,r,i),Du(),!1}if(I)return t=ao.current,t===null?(r!==Bi&&(t=Error(s(423),{cause:r}),qi(Ci(t,n))),e=e.current.alternate,e.flags|=65536,i&=-i,e.lanes|=i,r=Ci(r,n),i=$s(e.stateNode,r,i),Ja(e,i),Wl!==4&&(Wl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=i,r!==Bi&&(e=Error(s(422),{cause:r}),qi(Ci(e,n)))),!1;var a=Error(s(520),{cause:r});if(a=Ci(a,n),Xl===null?Xl=[a]:Xl.push(a),Wl!==4&&(Wl=2),t===null)return!0;r=Ci(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=i&-i,n.lanes|=e,e=$s(n.stateNode,r,e),Ja(n,e),!1;case 1:if(t=n.type,a=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||a!==null&&typeof a.componentDidCatch==`function`&&(ru===null||!ru.has(a))))return n.flags|=65536,i&=-i,n.lanes|=i,i=ec(i),tc(i,e,n,r),Ja(n,i),!1}n=n.return}while(n!==null);return!1}var rc=Error(s(461)),ic=!1;function ac(e,t,n,r){t.child=e===null?Va(t,null,n,r):Ba(t,e.child,n,r)}function oc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return ra(t),r=wo(e,t,n,o,a,i),s=Oo(),e!==null&&!ic?(ko(e,t,i),kc(e,t,i)):(I&&s&&Fi(t),t.flags|=1,ac(e,t,r,i),t.child)}function sc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!mi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,cc(e,t,a,r,i)):(e=_i(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Ac(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?kr:n,n(o,r)&&e.ref===t.ref)return kc(e,t,i)}return t.flags|=1,e=hi(a,r),e.ref=t.ref,e.return=t,t.child=e}function cc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(kr(a,r)&&e.ref===t.ref){if(ic=!1,t.pendingProps=r=a,Ac(e,i))e.flags&131072&&(ic=!0);else return t.lanes=e.lanes,kc(e,t,i)}}return hc(e,t,n,r,i)}function lc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return dc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ca(t,a===null?null:a.cachePool),a===null?ro():no(t,a),lo(t);else return r=t.lanes=536870912,dc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ca(t,null),ro(),uo(t)):(Ca(t,a.cachePool),no(t,a),uo(t),t.memoizedState=null);return ac(e,t,i,n),t.child}function uc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function dc(e,t,n,r,i){var a=Sa();return a=a===null?null:{parent:ua._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ca(t,null),ro(),lo(t),e!==null&&ta(e,t,r,!0),t.childLanes=i,null}function U(e,t){return t=wc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function fc(e,t,n){return Ba(t,e.child,null,n),e=U(t,t.pendingProps),e.flags|=2,fo(t),t.memoizedState=null,e}function pc(e,t,n){var r=t.pendingProps,i=!!(t.flags&128);if(t.flags&=-129,e===null){if(I){if(r.mode===`hidden`)return e=U(t,r),t.lanes=536870912,uc(null,e);if(co(t),(e=F)?(e=rf(e,zi),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ai===null?null:{id:ji,overflow:Mi},retryLane:536870912,hydrationErrors:null},n=bi(e),n.return=t,t.child=n,P=t,F=null)):e=null,e===null)throw Vi(t);return t.lanes=536870912,null}return U(t,r)}var a=e.memoizedState;if(a!==null){var o=a.dehydrated;if(co(t),i){if(t.flags&256)t.flags&=-257,t=fc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(s(558))}else if(ic||ta(e,t,n,!1),i=(n&e.childLanes)!==0,ic||i){if(r=q,r!==null&&(o=lt(r,n),o!==0&&o!==a.retryLane))throw a.retryLane=o,ci(e,o),hu(r,e,o),rc;Du(),t=fc(e,t,n)}else e=a.treeContext,F=cf(o.nextSibling),P=t,I=!0,Ri=null,zi=!1,e!==null&&Li(t,e),t=U(t,r),t.flags|=4096;return t}return e=hi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function mc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(s(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function hc(e,t,n,r,i){return ra(t),n=wo(e,t,n,r,void 0,i),r=Oo(),e!==null&&!ic?(ko(e,t,i),kc(e,t,i)):(I&&r&&Fi(t),t.flags|=1,ac(e,t,n,i),t.child)}function gc(e,t,n,r,i,a){return ra(t),t.updateQueue=null,n=Eo(t,r,n,i),To(e),r=Oo(),e!==null&&!ic?(ko(e,t,a),kc(e,t,a)):(I&&r&&Fi(t),t.flags|=1,ac(e,t,n,a),t.child)}function _c(e,t,n,r,i){if(ra(t),t.stateNode===null){var a=di,o=n.contextType;typeof o==`object`&&o&&(a=ia(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Ws,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Ua(t),o=n.contextType,a.context=typeof o==`object`&&o?ia(o):di,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Us(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Ws.enqueueReplaceState(a,a.state,null),Za(t,r,a,i),Xa(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=qs(n,s);a.props=c;var l=a.context,u=n.contextType;o=di,typeof u==`object`&&u&&(o=ia(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Ks(t,a,r,o),Ha=!1;var f=t.memoizedState;a.state=f,Za(t,r,a,i),Xa(),l=t.memoizedState,s||f!==l||Ha?(typeof d==`function`&&(Us(t,n,d,r),l=t.memoizedState),(c=Ha||Gs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Wa(e,t),o=t.memoizedProps,u=qs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=di,typeof l==`object`&&l&&(c=ia(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Ks(t,a,r,c),Ha=!1,f=t.memoizedState,a.state=f,Za(t,r,a,i),Xa();var p=t.memoizedState;o!==d||f!==p||Ha||e!==null&&e.dependencies!==null&&na(e.dependencies)?(typeof s==`function`&&(Us(t,n,s,r),p=t.memoizedState),(u=Ha||Gs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&na(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,mc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Ba(t,e.child,null,i),t.child=Ba(t,null,n,i)):ac(e,t,n,i),t.memoizedState=a.state,e=t.child):e=kc(e,t,i),e}function vc(e,t,n,r){return Gi(),t.flags|=256,ac(e,t,n,r),t.child}var yc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function bc(e){return{baseLanes:e,cachePool:L()}}function xc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Jl),e}function Sc(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(R.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(I){if(i?so(t):uo(t),(e=F)?(e=rf(e,zi),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ai===null?null:{id:ji,overflow:Mi},retryLane:536870912,hydrationErrors:null},n=bi(e),n.return=t,t.child=n,P=t,F=null)):e=null,e===null)throw Vi(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,i?(uo(t),i=t.mode,c=wc({mode:`hidden`,children:c},i),r=vi(r,i,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=bc(n),r.childLanes=xc(e,o,n),t.memoizedState=yc,uc(null,r)):(so(t),Cc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(a)t.flags&256?(so(t),t.flags&=-257,t=Tc(e,t,n)):t.memoizedState===null?(uo(t),c=r.fallback,i=t.mode,r=wc({mode:`visible`,children:r.children},i),c=vi(c,i,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Ba(t,e.child,null,n),r=t.child,r.memoizedState=bc(n),r.childLanes=xc(e,o,n),t.memoizedState=yc,t=uc(null,r)):(uo(t),t.child=e.child,t.flags|=128,t=null);else if(so(t),of(c)){if(o=c.nextSibling&&c.nextSibling.dataset,o)var u=o.dgst;o=u,r=Error(s(419)),r.stack=``,r.digest=o,qi({value:r,source:null,stack:null}),t=Tc(e,t,n)}else if(ic||ta(e,t,n,!1),o=(n&e.childLanes)!==0,ic||o){if(o=q,o!==null&&(r=lt(o,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,ci(e,r),hu(o,e,r),rc;af(c)||Du(),t=Tc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,F=cf(c.nextSibling),P=t,I=!0,Ri=null,zi=!1,e!==null&&Li(t,e),t=Cc(t,r.children),t.flags|=4096);return t}return i?(uo(t),c=r.fallback,i=t.mode,l=e.child,u=l.sibling,r=hi(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=vi(c,i,n,null),c.flags|=2):c=hi(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,uc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=bc(n):(i=c.cachePool,i===null?i=L():(l=ua._currentValue,i=i.parent===l?i:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:i}),r.memoizedState=c,r.childLanes=xc(e,o,n),t.memoizedState=yc,uc(e.child,r)):(so(t),n=e.child,e=n.sibling,n=hi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Cc(e,t){return t=wc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function wc(e,t){return e=pi(22,e,null,t),e.lanes=0,e}function Tc(e,t,n){return Ba(t,e.child,null,n),e=Cc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ec(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),$i(e.return,t,n)}function Dc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Oc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=R.current,s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,k(R,o),ac(e,t,r,n),r=I?Di:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ec(e,n,t);else if(e.tag===19)Ec(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&po(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Dc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&po(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Dc(t,!0,n,null,a,r);break;case`together`:Dc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function kc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Gl|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(ta(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(s(153));if(t.child!==null){for(e=t.child,n=hi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=hi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Ac(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&na(e)))}function jc(e,t,n){switch(t.tag){case 3:ve(t,t.stateNode.containerInfo),Zi(t,ua,e.memoizedState.cache),Gi();break;case 27:case 5:be(t);break;case 4:ve(t,t.stateNode.containerInfo);break;case 10:Zi(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,co(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(so(t),e=kc(e,t,n),e===null?null:e.sibling):Sc(e,t,n):(so(t),t.flags|=128,null);so(t);break;case 19:var i=!!(e.flags&128);if(r=(n&t.childLanes)!==0,r||=(ta(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Oc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),k(R,R.current),r)break;return null;case 22:return t.lanes=0,lc(e,t,n,t.pendingProps);case 24:Zi(t,ua,e.memoizedState.cache)}return kc(e,t,n)}function Mc(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)ic=!0;else{if(!Ac(e,n)&&!(t.flags&128))return ic=!1,jc(e,t,n);ic=!!(e.flags&131072)}}else ic=!1,I&&t.flags&1048576&&Pi(t,Di,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Aa(t.elementType),t.type=e,typeof e==`function`)mi(e)?(r=qs(e,r),t.tag=1,t=_c(null,t,e,r,n)):(t.tag=0,t=hc(null,t,e,r,n));else{if(e!=null){var i=e.$$typeof;if(i===C){t.tag=11,t=oc(null,t,e,r,n);break a}if(i===ne){t.tag=14,t=sc(null,t,e,r,n);break a}}throw t=ce(e)||e,Error(s(306,t,``))}}return t;case 0:return hc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,i=qs(r,t.pendingProps),_c(e,t,r,i,n);case 3:a:{if(ve(t,t.stateNode.containerInfo),e===null)throw Error(s(387));r=t.pendingProps;var a=t.memoizedState;i=a.element,Wa(e,t),Za(t,r,null,n);var o=t.memoizedState;if(r=o.cache,Zi(t,ua,r),r!==a.cache&&ea(t,[ua],n,!0),Xa(),r=o.element,a.isDehydrated){if(a={element:r,isDehydrated:!1,cache:o.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=vc(e,t,r,n);break a}if(r!==i){i=Ci(Error(s(424)),t),qi(i),t=vc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(F=cf(e.firstChild),P=t,I=!0,Ri=null,zi=!0,n=Va(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Gi(),r===i){t=kc(e,t,n);break a}ac(e,t,r,n)}t=t.child}return t;case 26:return mc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:I||(n=t.type,e=t.pendingProps,r=Bd(ge.current).createElement(n),r[ht]=t,r[gt]=e,Pd(r,n,e),Dt(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return be(t),e===null&&I&&(r=t.stateNode=ff(t.type,t.pendingProps,ge.current),P=t,zi=!0,i=F,Zd(t.type)?(lf=i,F=cf(r.firstChild)):F=i),ac(e,t,t.pendingProps.children,n),mc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&I&&((i=r=F)&&(r=tf(r,t.type,t.pendingProps,zi),r===null?i=!1:(t.stateNode=r,P=t,F=cf(r.firstChild),zi=!1,i=!0)),i||Vi(t)),be(t),i=t.type,a=t.pendingProps,o=e===null?null:e.memoizedProps,r=a.children,Ud(i,a)?r=null:o!==null&&Ud(i,o)&&(t.flags|=32),t.memoizedState!==null&&(i=wo(e,t,Do,null,null,n),Qf._currentValue=i),mc(e,t),ac(e,t,r,n),t.child;case 6:return e===null&&I&&((e=n=F)&&(n=nf(n,t.pendingProps,zi),n===null?e=!1:(t.stateNode=n,P=t,F=null,e=!0)),e||Vi(t)),null;case 13:return Sc(e,t,n);case 4:return ve(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ba(t,null,r,n):ac(e,t,r,n),t.child;case 11:return oc(e,t,t.type,t.pendingProps,n);case 7:return ac(e,t,t.pendingProps,n),t.child;case 8:return ac(e,t,t.pendingProps.children,n),t.child;case 12:return ac(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Zi(t,t.type,r.value),ac(e,t,r.children,n),t.child;case 9:return i=t.type._context,r=t.pendingProps.children,ra(t),i=ia(i),r=r(i),t.flags|=1,ac(e,t,r,n),t.child;case 14:return sc(e,t,t.type,t.pendingProps,n);case 15:return cc(e,t,t.type,t.pendingProps,n);case 19:return Oc(e,t,n);case 31:return pc(e,t,n);case 22:return lc(e,t,n,t.pendingProps);case 24:return ra(t),r=ia(ua),e===null?(i=Sa(),i===null&&(i=q,a=da(),i.pooledCache=a,a.refCount++,a!==null&&(i.pooledCacheLanes|=n),i=a),t.memoizedState={parent:r,cache:i},Ua(t),Zi(t,ua,i)):((e.lanes&n)!==0&&(Wa(e,t),Za(t,null,null,n),Xa()),i=e.memoizedState,a=t.memoizedState,i.parent===r?(r=a.cache,Zi(t,ua,r),r!==i.cache&&ea(t,[ua],n,!0)):(i={parent:r,cache:r},t.memoizedState=i,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=i),Zi(t,ua,r))),ac(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(s(156,t.tag))}function Nc(e){e.flags|=4}function Pc(e,t,n,r,i){if((t=!!(e.mode&32))&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(wu())e.flags|=8192;else throw ja=Da,Ta}}else e.flags&=-16777217}function Fc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t)){if(wu())e.flags|=8192;else throw ja=Da,Ta}}function Ic(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:rt(),e.lanes|=t,Yl|=t)}function Lc(e,t){if(!I)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function W(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Rc(e,t,n){var r=t.pendingProps;switch(Ii(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return W(t),null;case 1:return W(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Qi(ua),ye(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Wi(t)?Nc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ki())),W(t),null;case 26:var i=t.type,a=t.memoizedState;return e===null?(Nc(t),a===null?(W(t),Pc(t,i,null,r,n)):(W(t),Fc(t,a))):a?a===e.memoizedState?(W(t),t.flags&=-16777217):(Nc(t),W(t),Fc(t,a)):(e=e.memoizedProps,e!==r&&Nc(t),W(t),Pc(t,i,e,r,n)),null;case 27:if(xe(t),n=ge.current,i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Nc(t);else{if(!r){if(t.stateNode===null)throw Error(s(166));return W(t),null}e=me.current,Wi(t)?Hi(t,e):(e=ff(i,r,n),t.stateNode=e,Nc(t))}return W(t),null;case 5:if(xe(t),i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Nc(t);else{if(!r){if(t.stateNode===null)throw Error(s(166));return W(t),null}if(a=me.current,Wi(t))Hi(t,a);else{var o=Bd(ge.current);switch(a){case 1:a=o.createElementNS(`http://www.w3.org/2000/svg`,i);break;case 2:a=o.createElementNS(`http://www.w3.org/1998/Math/MathML`,i);break;default:switch(i){case`svg`:a=o.createElementNS(`http://www.w3.org/2000/svg`,i);break;case`math`:a=o.createElementNS(`http://www.w3.org/1998/Math/MathML`,i);break;case`script`:a=o.createElement(`div`),a.innerHTML=`<script><\/script>`,a=a.removeChild(a.firstChild);break;case`select`:a=typeof r.is==`string`?o.createElement(`select`,{is:r.is}):o.createElement(`select`),r.multiple?a.multiple=!0:r.size&&(a.size=r.size);break;default:a=typeof r.is==`string`?o.createElement(i,{is:r.is}):o.createElement(i)}}a[ht]=t,a[gt]=r;a:for(o=t.child;o!==null;){if(o.tag===5||o.tag===6)a.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===t)break a;for(;o.sibling===null;){if(o.return===null||o.return===t)break a;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=a;a:switch(Pd(a,i,r),i){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Nc(t)}}return W(t),Pc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Nc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(s(166));if(e=ge.current,Wi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,i=P,i!==null)switch(i.tag){case 27:case 5:r=i.memoizedProps}e[ht]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||Vi(t,!0)}else e=Bd(e).createTextNode(r),e[ht]=t,t.stateNode=e}return W(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Wi(t),n!==null){if(e===null){if(!r)throw Error(s(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(557));e[ht]=t}else Gi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;W(t),e=!1}else n=Ki(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(fo(t),t):(fo(t),null);if(t.flags&128)throw Error(s(558))}return W(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(i=Wi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(s(318));if(i=t.memoizedState,i=i===null?null:i.dehydrated,!i)throw Error(s(317));i[ht]=t}else Gi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;W(t),i=!1}else i=Ki(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),i=!0;if(!i)return t.flags&256?(fo(t),t):(fo(t),null)}return fo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,i=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(i=r.alternate.memoizedState.cachePool.pool),a=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(a=r.memoizedState.cachePool.pool),a!==i&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Ic(t,t.updateQueue),W(t),null);case 4:return ye(),e===null&&Sd(t.stateNode.containerInfo),W(t),null;case 10:return Qi(t.type),W(t),null;case 19:if(O(R),r=t.memoizedState,r===null)return W(t),null;if(i=!!(t.flags&128),a=r.rendering,a===null){if(i)Lc(r,!1);else{if(Wl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=po(e),a!==null){for(t.flags|=128,Lc(r,!1),e=a.updateQueue,t.updateQueue=e,Ic(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)gi(n,e),n=n.sibling;return k(R,R.current&1|2),I&&Ni(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Pe()>tu&&(t.flags|=128,i=!0,Lc(r,!1),t.lanes=4194304)}}else{if(!i){if(e=po(a),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,Ic(t,e),Lc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!a.alternate&&!I)return W(t),null}else 2*Pe()-r.renderingStartTime>tu&&n!==536870912&&(t.flags|=128,i=!0,Lc(r,!1),t.lanes=4194304)}r.isBackwards?(a.sibling=t.child,t.child=a):(e=r.last,e===null?t.child=a:e.sibling=a,r.last=a)}return r.tail===null?(W(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Pe(),e.sibling=null,n=R.current,k(R,i?n&1|2:n&1),I&&Ni(t,r.treeForkCount),e);case 22:case 23:return fo(t),io(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(W(t),t.subtreeFlags&6&&(t.flags|=8192)):W(t),n=t.updateQueue,n!==null&&Ic(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&O(xa),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Qi(ua),W(t),null;case 25:return null;case 30:return null}throw Error(s(156,t.tag))}function zc(e,t){switch(Ii(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Qi(ua),ye(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return xe(t),null;case 31:if(t.memoizedState!==null){if(fo(t),t.alternate===null)throw Error(s(340));Gi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(fo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(s(340));Gi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return O(R),null;case 4:return ye(),null;case 10:return Qi(t.type),null;case 22:case 23:return fo(t),io(),e!==null&&O(xa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Qi(ua),null;case 25:return null;default:return null}}function Bc(e,t){switch(Ii(t),t.tag){case 3:Qi(ua),ye();break;case 26:case 27:case 5:xe(t);break;case 4:ye();break;case 31:t.memoizedState!==null&&fo(t);break;case 13:fo(t);break;case 19:O(R);break;case 10:Qi(t.type);break;case 22:case 23:fo(t),io(),e!==null&&O(xa);break;case 24:Qi(ua)}}function Vc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Hc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Uc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{$a(t,n)}catch(t){Z(e,e.return,t)}}}function Wc(e,t,n){n.props=qs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Gc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Kc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}}function qc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Jc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[gt]=t}catch(t){Z(e,e.return,t)}}function Yc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Xc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Yc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Zc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=sn));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Zc(e,t,n),e=e.sibling;e!==null;)Zc(e,t,n),e=e.sibling}function Qc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Qc(e,t,n),e=e.sibling;e!==null;)Qc(e,t,n),e=e.sibling}function $c(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[ht]=e,t[gt]=n}catch(t){Z(e,e.return,t)}}var el=!1,tl=!1,nl=!1,rl=typeof WeakSet==`function`?WeakSet:Set,il=null;function al(e,t){if(e=e.containerInfo,Rd=sp,e=Nr(e),Pr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break a}var o=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||i!==0&&f.nodeType!==3||(c=o+i),f!==a||r!==0&&f.nodeType!==3||(l=o+r),f.nodeType===3&&(o+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===i&&(c=o),p===a&&++d===r&&(l=o),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,il=t;il!==null;)if(t=il,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,il=e;else for(;il!==null;){switch(t=il,a=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)i=e[n],i.ref.impl=i.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&a!==null){e=void 0,n=t,i=a.memoizedProps,a=a.memoizedState,r=n.stateNode;try{var h=qs(n.type,i);e=r.getSnapshotBeforeUpdate(h,a),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(s(163))}if(e=t.sibling,e!==null){e.return=t.return,il=e;break}il=t.return}}function ol(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:bl(e,n),r&4&&Vc(5,n);break;case 1:if(bl(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=qs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}}r&64&&Uc(n),r&512&&Gc(n,n.return);break;case 3:if(bl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{$a(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&$c(n);case 26:case 5:bl(e,n),t===null&&r&4&&qc(n),r&512&&Gc(n,n.return);break;case 12:bl(e,n);break;case 31:bl(e,n),r&4&&dl(e,n);break;case 13:bl(e,n),r&4&&fl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||el,!r){t=t!==null&&t.memoizedState!==null||tl,i=el;var a=tl;el=r,(tl=t)&&!a?Sl(e,n,!!(n.subtreeFlags&8772)):bl(e,n),el=i,tl=a}break;case 30:break;default:bl(e,n)}}function sl(e){var t=e.alternate;t!==null&&(e.alternate=null,sl(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&St(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var G=null,cl=!1;function ll(e,t,n){for(n=n.child;n!==null;)ul(e,t,n),n=n.sibling}function ul(e,t,n){if(We&&typeof We.onCommitFiberUnmount==`function`)try{We.onCommitFiberUnmount(Ue,n)}catch{}switch(n.tag){case 26:tl||Kc(n,t),ll(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:tl||Kc(n,t);var r=G,i=cl;Zd(n.type)&&(G=n.stateNode,cl=!1),ll(e,t,n),pf(n.stateNode),G=r,cl=i;break;case 5:tl||Kc(n,t);case 6:if(r=G,i=cl,G=null,ll(e,t,n),G=r,cl=i,G!==null){if(cl)try{(G.nodeType===9?G.body:G.nodeName===`HTML`?G.ownerDocument.body:G).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{G.removeChild(n.stateNode)}catch(e){Z(n,t,e)}}break;case 18:G!==null&&(cl?(e=G,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(G,n.stateNode));break;case 4:r=G,i=cl,G=n.stateNode.containerInfo,cl=!0,ll(e,t,n),G=r,cl=i;break;case 0:case 11:case 14:case 15:Hc(2,n,t),tl||Hc(4,n,t),ll(e,t,n);break;case 1:tl||(Kc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Wc(n,t,r)),ll(e,t,n);break;case 21:ll(e,t,n);break;case 22:tl=(r=tl)||n.memoizedState!==null,ll(e,t,n),tl=r;break;default:ll(e,t,n)}}function dl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Z(t,t.return,e)}}}function fl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Z(t,t.return,e)}}function pl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new rl),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new rl),t;default:throw Error(s(435,e.tag))}}function ml(e,t){var n=pl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function hl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r],a=e,o=t,c=o;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){G=c.stateNode,cl=!1;break a}break;case 5:G=c.stateNode,cl=!1;break a;case 3:case 4:G=c.stateNode.containerInfo,cl=!0;break a}c=c.return}if(G===null)throw Error(s(160));ul(a,o,i),G=null,cl=!1,a=i.alternate,a!==null&&(a.return=null),i.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)_l(t,e),t=t.sibling}var gl=null;function _l(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:hl(t,e),vl(e),r&4&&(Hc(3,e,e.return),Vc(3,e),Hc(5,e,e.return));break;case 1:hl(t,e),vl(e),r&512&&(tl||n===null||Kc(n,n.return)),r&64&&el&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var i=gl;if(hl(t,e),vl(e),r&512&&(tl||n===null||Kc(n,n.return)),r&4){var a=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null){if(r===null){if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,i=i.ownerDocument||i;b:switch(r){case`title`:a=i.getElementsByTagName(`title`)[0],(!a||a[xt]||a[ht]||a.namespaceURI===`http://www.w3.org/2000/svg`||a.hasAttribute(`itemprop`))&&(a=i.createElement(r),i.head.insertBefore(a,i.querySelector(`head > title`))),Pd(a,r,n),a[ht]=e,Dt(a),r=a;break a;case`link`:var o=Vf(`link`,`href`,i).get(r+(n.href||``));if(o){for(var c=0;c<o.length;c++)if(a=o[c],a.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&a.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&a.getAttribute(`title`)===(n.title==null?null:n.title)&&a.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(c,1);break b}}a=i.createElement(r),Pd(a,r,n),i.head.appendChild(a);break;case`meta`:if(o=Vf(`meta`,`content`,i).get(r+(n.content||``))){for(c=0;c<o.length;c++)if(a=o[c],a.getAttribute(`content`)===(n.content==null?null:``+n.content)&&a.getAttribute(`name`)===(n.name==null?null:n.name)&&a.getAttribute(`property`)===(n.property==null?null:n.property)&&a.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&a.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(c,1);break b}}a=i.createElement(r),Pd(a,r,n),i.head.appendChild(a);break;default:throw Error(s(468,r))}a[ht]=e,Dt(a),r=a}e.stateNode=r}else Hf(i,e.type,e.stateNode)}else e.stateNode=If(i,r,e.memoizedProps)}else a===r?r===null&&e.stateNode!==null&&Jc(e,e.memoizedProps,n.memoizedProps):(a===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):a.count--,r===null?Hf(i,e.type,e.stateNode):If(i,r,e.memoizedProps))}break;case 27:hl(t,e),vl(e),r&512&&(tl||n===null||Kc(n,n.return)),n!==null&&r&4&&Jc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(hl(t,e),vl(e),r&512&&(tl||n===null||Kc(n,n.return)),e.flags&32){i=e.stateNode;try{Qt(i,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(i=e.memoizedProps,Jc(e,i,n===null?i:n.memoizedProps)),r&1024&&(nl=!0);break;case 6:if(hl(t,e),vl(e),r&4){if(e.stateNode===null)throw Error(s(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Bf=null,i=gl,gl=gf(t.containerInfo),hl(t,e),gl=i,vl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Z(e,e.return,t)}nl&&(nl=!1,yl(e));break;case 4:r=gl,gl=gf(e.stateNode.containerInfo),hl(t,e),vl(e),gl=r;break;case 12:hl(t,e),vl(e);break;case 31:hl(t,e),vl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 13:hl(t,e),vl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&($l=Pe()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 22:i=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=el,d=tl;if(el=u||i,tl=d||l,hl(t,e),tl=d,el=u,vl(e),r&8192)a:for(t=e.stateNode,t._visibility=i?t._visibility&-2:t._visibility|1,i&&(n===null||l||el||tl||xl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(a=l.stateNode,i)o=a.style,typeof o.setProperty==`function`?o.setProperty(`display`,`none`,`important`):o.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=i?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;i?$d(m,!0):$d(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,ml(e,n))));break;case 19:hl(t,e),vl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 30:break;case 21:break;default:hl(t,e),vl(e)}}function vl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Yc(r)){n=r;break}r=r.return}if(n==null)throw Error(s(160));switch(n.tag){case 27:var i=n.stateNode;Qc(e,Xc(e),i);break;case 5:var a=n.stateNode;n.flags&32&&(Qt(a,``),n.flags&=-33),Qc(e,Xc(e),a);break;case 3:case 4:var o=n.stateNode.containerInfo;Zc(e,Xc(e),o);break;default:throw Error(s(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function yl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;yl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function bl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)ol(e,t.alternate,t),t=t.sibling}function xl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Hc(4,t,t.return),xl(t);break;case 1:Kc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Wc(t,t.return,n),xl(t);break;case 27:pf(t.stateNode);case 26:case 5:Kc(t,t.return),xl(t);break;case 22:t.memoizedState===null&&xl(t);break;case 30:xl(t);break;default:xl(t)}e=e.sibling}}function Sl(e,t,n){for(n&&=!!(t.subtreeFlags&8772),t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:Sl(i,a,n),Vc(4,a);break;case 1:if(Sl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Qa(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&Uc(a),Gc(a,a.return);break;case 27:$c(a);case 26:case 5:Sl(i,a,n),n&&r===null&&o&4&&qc(a),Gc(a,a.return);break;case 12:Sl(i,a,n);break;case 31:Sl(i,a,n),n&&o&4&&dl(i,a);break;case 13:Sl(i,a,n),n&&o&4&&fl(i,a);break;case 22:a.memoizedState===null&&Sl(i,a,n),Gc(a,a.return);break;case 30:break;default:Sl(i,a,n)}t=t.sibling}}function Cl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&fa(n))}function wl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&fa(e))}function Tl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)El(e,t,n,r),t=t.sibling}function El(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Tl(e,t,n,r),i&2048&&Vc(9,t);break;case 1:Tl(e,t,n,r);break;case 3:Tl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&fa(e)));break;case 12:if(i&2048){Tl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Tl(e,t,n,r);break;case 31:Tl(e,t,n,r);break;case 13:Tl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Tl(e,t,n,r):(a._visibility|=2,Dl(e,t,n,r,!!(t.subtreeFlags&10256)||!1)):a._visibility&2?Tl(e,t,n,r):Ol(e,t),i&2048&&Cl(o,t);break;case 24:Tl(e,t,n,r),i&2048&&wl(t.alternate,t);break;default:Tl(e,t,n,r)}}function Dl(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Dl(a,o,s,c,i),Vc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Dl(a,o,s,c,i)):u._visibility&2?Dl(a,o,s,c,i):Ol(a,o),i&&l&2048&&Cl(o.alternate,o);break;case 24:Dl(a,o,s,c,i),i&&l&2048&&wl(o.alternate,o);break;default:Dl(a,o,s,c,i)}t=t.sibling}}function Ol(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Ol(n,r),i&2048&&Cl(r.alternate,r);break;case 24:Ol(n,r),i&2048&&wl(r.alternate,r);break;default:Ol(n,r)}t=t.sibling}}var kl=8192;function Al(e,t,n){if(e.subtreeFlags&kl)for(e=e.child;e!==null;)jl(e,t,n),e=e.sibling}function jl(e,t,n){switch(e.tag){case 26:Al(e,t,n),e.flags&kl&&e.memoizedState!==null&&Gf(n,gl,e.memoizedState,e.memoizedProps);break;case 5:Al(e,t,n);break;case 3:case 4:var r=gl;gl=gf(e.stateNode.containerInfo),Al(e,t,n),gl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=kl,kl=16777216,Al(e,t,n),kl=r):Al(e,t,n));break;default:Al(e,t,n)}}function Ml(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Nl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];il=r,Il(r,e)}Ml(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Pl(e),e=e.sibling}function Pl(e){switch(e.tag){case 0:case 11:case 15:Nl(e),e.flags&2048&&Hc(9,e,e.return);break;case 3:Nl(e);break;case 12:Nl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Fl(e)):Nl(e);break;default:Nl(e)}}function Fl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];il=r,Il(r,e)}Ml(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Hc(8,t,t.return),Fl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Fl(t));break;default:Fl(t)}e=e.sibling}}function Il(e,t){for(;il!==null;){var n=il;switch(n.tag){case 0:case 11:case 15:Hc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:fa(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,il=r;else a:for(n=e;il!==null;){r=il;var i=r.sibling,a=r.return;if(sl(r),r===n){il=null;break a}if(i!==null){i.return=a,il=i;break a}il=a}}}var Ll={getCacheForType:function(e){var t=ia(ua),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return ia(ua).controller.signal}},Rl=typeof WeakMap==`function`?WeakMap:Map,K=0,q=null,J=null,Y=0,X=0,zl=null,Bl=!1,Vl=!1,Hl=!1,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=null,Zl=null,Ql=!1,$l=0,eu=0,tu=1/0,nu=null,ru=null,iu=0,au=null,ou=null,su=0,cu=0,lu=null,uu=null,du=0,fu=null;function pu(){return K&2&&Y!==0?Y&-Y:E.T===null?ft():dd()}function mu(){if(Jl===0){if(!(Y&536870912)||I){var e=Ze;Ze<<=1,!(Ze&3932160)&&(Ze=262144),Jl=e}else Jl=536870912}return e=ao.current,e!==null&&(e.flags|=32),Jl}function hu(e,t,n){(e===q&&(X===2||X===9)||e.cancelPendingCommit!==null)&&(Su(e,0),yu(e,Y,Jl,!1)),at(e,n),(!(K&2)||e!==q)&&(e===q&&(!(K&2)&&(Kl|=n),Wl===4&&yu(e,Y,Jl,!1)),rd(e))}function gu(e,t,n){if(K&6)throw Error(s(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||tt(e,t),i=r?Au(e,t):Ou(e,t,!0),a=r;do{if(i===0){Vl&&!r&&yu(e,t,0,!1);break}if(n=e.current.alternate,a&&!vu(n)){i=Ou(e,t,!1),a=!1;continue}if(i===2){if(a=t,e.errorRecoveryDisabledLanes&a)var o=0;else o=e.pendingLanes&-536870913,o=o===0?o&536870912?536870912:0:o;if(o!==0){t=o;a:{var c=e;i=Xl;var l=c.current.memoizedState.isDehydrated;if(l&&(Su(c,o).flags|=256),o=Ou(c,o,!1),o!==2){if(Hl&&!l){c.errorRecoveryDisabledLanes|=a,Kl|=a,i=4;break a}a=Zl,Zl=i,a!==null&&(Zl===null?Zl=a:Zl.push.apply(Zl,a))}i=o}if(a=!1,i!==2)continue}}if(i===1){Su(e,0),yu(e,t,0,!0);break}a:{switch(r=e,a=i,a){case 0:case 1:throw Error(s(345));case 4:if((t&4194048)!==t)break;case 6:yu(r,t,Jl,!Bl);break a;case 2:Zl=null;break;case 3:case 5:break;default:throw Error(s(329))}if((t&62914560)===t&&(i=$l+300-Pe(),10<i)){if(yu(r,t,Jl,!Bl),et(r,0,!0)!==0)break a;su=t,r.timeoutHandle=Kd(_u.bind(null,r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,a,`Throttled`,-0,0),i);break a}_u(r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,a,null,-0,0)}break}while(1);rd(e)}function _u(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:sn},jl(t,a,d);var m=(a&62914560)===a?$l-Pe():(a&4194048)===a?eu-Pe():0;if(m=qf(d,m),m!==null){su=a,e.cancelPendingCommit=m(Lu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),yu(e,a,o,!l);return}}Lu(e,t,a,n,r,i,o,s,c)}function vu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Or(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yu(e,t,n,r){t&=~ql,t&=~Kl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Ke(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&st(e,n,t)}function bu(){return K&6?!0:(id(0,!1),!1)}function xu(){if(J!==null){if(X===0)var e=J.return;else e=J,Xi=Yi=null,Ao(e),Pa=null,Fa=0,e=J;for(;e!==null;)Bc(e.alternate,e),e=e.return;J=null}}function Su(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),su=0,xu(),q=e,J=n=hi(e.current,null),Y=t,X=0,zl=null,Bl=!1,Vl=tt(e,t),Hl=!1,Yl=Jl=ql=Kl=Gl=Wl=0,Zl=Xl=null,Ql=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Ke(r),a=1<<i;t|=e[i],r&=~a}return Ul=t,N(),n}function Cu(e,t){z=null,E.H=zs,t===wa||t===Ea?(t=Ma(),X=3):t===Ta?(t=Ma(),X=4):X=t===rc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,zl=t,J===null&&(Wl=1,Zs(e,Ci(t,e.current)))}function wu(){var e=ao.current;return e===null?!0:(Y&4194048)===Y?oo===null:(Y&62914560)===Y||Y&536870912?e===oo:!1}function Tu(){var e=E.H;return E.H=zs,e===null?zs:e}function Eu(){var e=E.A;return E.A=Ll,e}function Du(){Wl=4,Bl||(Y&4194048)!==Y&&ao.current!==null||(Vl=!0),!(Gl&134217727)&&!(Kl&134217727)||q===null||yu(q,Y,Jl,!1)}function Ou(e,t,n){var r=K;K|=2;var i=Tu(),a=Eu();(q!==e||Y!==t)&&(nu=null,Su(e,t)),t=!1;var o=Wl;a:do try{if(X!==0&&J!==null){var s=J,c=zl;switch(X){case 8:xu(),o=6;break a;case 3:case 2:case 9:case 6:ao.current===null&&(t=!0);var l=X;if(X=0,zl=null,Pu(e,s,c,l),n&&Vl){o=0;break a}break;default:l=X,X=0,zl=null,Pu(e,s,c,l)}}ku(),o=Wl;break}catch(t){Cu(e,t)}while(1);return t&&e.shellSuspendCounter++,Xi=Yi=null,K=r,E.H=i,E.A=a,J===null&&(q=null,Y=0,N()),o}function ku(){for(;J!==null;)Mu(J)}function Au(e,t){var n=K;K|=2;var r=Tu(),i=Eu();q!==e||Y!==t?(nu=null,tu=Pe()+500,Su(e,t)):Vl=tt(e,t);a:do try{if(X!==0&&J!==null){t=J;var a=zl;b:switch(X){case 1:X=0,zl=null,Pu(e,t,a,1);break;case 2:case 9:if(Oa(a)){X=0,zl=null,Nu(t);break}t=function(){X!==2&&X!==9||q!==e||(X=7),rd(e)},a.then(t,t);break a;case 3:X=7;break a;case 4:X=5;break a;case 7:Oa(a)?(X=0,zl=null,Nu(t)):(X=0,zl=null,Pu(e,t,a,7));break;case 5:var o=null;switch(J.tag){case 26:o=J.memoizedState;case 5:case 27:var c=J;if(o?Wf(o):c.stateNode.complete){X=0,zl=null;var l=c.sibling;if(l!==null)J=l;else{var u=c.return;u===null?J=null:(J=u,Fu(u))}break b}}X=0,zl=null,Pu(e,t,a,5);break;case 6:X=0,zl=null,Pu(e,t,a,6);break;case 8:xu(),Wl=6;break a;default:throw Error(s(462))}}ju();break}catch(t){Cu(e,t)}while(1);return Xi=Yi=null,E.H=r,E.A=i,K=n,J===null?(q=null,Y=0,N(),Wl):0}function ju(){for(;J!==null&&!Me();)Mu(J)}function Mu(e){var t=Mc(e.alternate,e,Ul);e.memoizedProps=e.pendingProps,t===null?Fu(e):J=t}function Nu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=gc(n,t,t.pendingProps,t.type,void 0,Y);break;case 11:t=gc(n,t,t.pendingProps,t.type.render,t.ref,Y);break;case 5:Ao(t);default:Bc(n,t),t=J=gi(t,Ul),t=Mc(n,t,Ul)}e.memoizedProps=e.pendingProps,t===null?Fu(e):J=t}function Pu(e,t,n,r){Xi=Yi=null,Ao(t),Pa=null,Fa=0;var i=t.return;try{if(nc(e,i,t,n,Y)){Wl=1,Zs(e,Ci(n,e.current)),J=null;return}}catch(t){if(i!==null)throw J=i,t;Wl=1,Zs(e,Ci(n,e.current)),J=null;return}t.flags&32768?(I||r===1?e=!0:Vl||Y&536870912?e=!1:(Bl=e=!0,(r===2||r===9||r===3||r===6)&&(r=ao.current,r!==null&&r.tag===13&&(r.flags|=16384))),Iu(t,e)):Fu(t)}function Fu(e){var t=e;do{if(t.flags&32768){Iu(t,Bl);return}e=t.return;var n=Rc(t.alternate,t,Ul);if(n!==null){J=n;return}if(t=t.sibling,t!==null){J=t;return}J=t=e}while(t!==null);Wl===0&&(Wl=5)}function Iu(e,t){do{var n=zc(e.alternate,e);if(n!==null){n.flags&=32767,J=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){J=e;return}J=e=n}while(e!==null);Wl=6,J=null}function Lu(e,t,n,r,i,a,o,c,l){e.cancelPendingCommit=null;do Hu();while(iu!==0);if(K&6)throw Error(s(327));if(t!==null){if(t===e.current)throw Error(s(177));if(a=t.lanes|t.childLanes,a|=ai,ot(e,n,a,o,c,l),e===q&&(J=q=null,Y=0),ou=t,au=e,su=n,cu=a,lu=i,uu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(Re,function(){return Uu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=E.T,E.T=null,i=D.p,D.p=2,o=K,K|=4;try{al(e,t,n)}finally{K=o,D.p=i,E.T=r}}iu=1,Ru(),zu(),Bu()}}function Ru(){if(iu===1){iu=0;var e=au,t=ou,n=!!(t.flags&13878);if(t.subtreeFlags&13878||n){n=E.T,E.T=null;var r=D.p;D.p=2;var i=K;K|=4;try{_l(t,e);var a=zd,o=Nr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Mr(s.ownerDocument.documentElement,s)){if(c!==null&&Pr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=jr(s,h),v=jr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{K=i,D.p=r,E.T=n}}e.current=t,iu=2}}function zu(){if(iu===2){iu=0;var e=au,t=ou,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=E.T,E.T=null;var r=D.p;D.p=2;var i=K;K|=4;try{ol(e,t.alternate,t)}finally{K=i,D.p=r,E.T=n}}iu=3}}function Bu(){if(iu===4||iu===3){iu=0,Ne();var e=au,t=ou,n=su,r=uu;t.subtreeFlags&10256||t.flags&10256?iu=5:(iu=0,ou=au=null,Vu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(ru=null),dt(n),t=t.stateNode,We&&typeof We.onCommitFiberRoot==`function`)try{We.onCommitFiberRoot(Ue,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=E.T,i=D.p,D.p=2,E.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{E.T=t,D.p=i}}su&3&&Hu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===fu?du++:(du=0,fu=e):du=0,id(0,!1)}}function Vu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,fa(t)))}function Hu(){return Ru(),zu(),Bu(),Uu()}function Uu(){if(iu!==5)return!1;var e=au,t=cu;cu=0;var n=dt(su),r=E.T,i=D.p;try{D.p=32>n?32:n,E.T=null,n=lu,lu=null;var a=au,o=su;if(iu=0,ou=au=null,su=0,K&6)throw Error(s(331));var c=K;if(K|=4,Pl(a.current),El(a,a.current,o,n),K=c,id(0,!1),We&&typeof We.onPostCommitFiberRoot==`function`)try{We.onPostCommitFiberRoot(Ue,a)}catch{}return!0}finally{D.p=i,E.T=r,Vu(e,t)}}function Wu(e,t,n){t=Ci(n,t),t=$s(e.stateNode,t,2),e=Ka(e,t,2),e!==null&&(at(e,2),rd(e))}function Z(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(ru===null||!ru.has(r))){e=Ci(n,e),n=ec(2),r=Ka(t,n,2),r!==null&&(tc(n,r,t,e),at(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Rl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Hl=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,q===e&&(Y&n)===n&&(Wl===4||Wl===3&&(Y&62914560)===Y&&300>Pe()-$l?!(K&2)&&Su(e,0):ql|=n,Yl===Y&&(Yl=0)),rd(e)}function qu(e,t){t===0&&(t=rt()),e=ci(e,t),e!==null&&(at(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return Ae(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Ke(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=Y,a=et(r,r===q?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||tt(r,a)||(n=!0,ld(r,a))}r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=Pe(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}iu!==0&&iu!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Ke(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=nt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=q,n=Y,n=et(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(X===2||X===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&je(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||tt(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&je(r),dt(n)){case 2:case 8:n=Le;break;case 32:n=Re;break;case 268435456:n=Be;break;default:n=Re}return r=cd.bind(null,e),n=Ae(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&je(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(iu!==0&&iu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Hu()&&e.callbackNode!==n)return null;var r=Y;return r=et(e,e===q?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(gu(e,r,t),sd(e,Pe()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Hu())return null;gu(e,t,!0)}function ud(){Yd(function(){K&6?Ae(Ie,ad):od()})}function dd(){if(nd===0){var e=ha;e===0&&(e=Xe,Xe<<=1,!(Xe&261888)&&(Xe=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:on(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[gt]||null).action),o=r.submitter;o&&(t=(t=o[gt]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new On(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);Es(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),Es(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<ei.length;hd++){var gd=ei[hd];ti(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}ti(Kr,`onAnimationEnd`),ti(qr,`onAnimationIteration`),ti(Jr,`onAnimationStart`),ti(`dblclick`,`onDoubleClick`),ti(`focusin`,`onFocus`),ti(`focusout`,`onBlur`),ti(Yr,`onTransitionRun`),ti(Xr,`onTransitionStart`),ti(Zr,`onTransitionCancel`),ti(Qr,`onTransitionEnd`),jt(`onMouseEnter`,[`mouseout`,`mouseover`]),jt(`onMouseLeave`,[`mouseout`,`mouseover`]),jt(`onPointerEnter`,[`pointerout`,`pointerover`]),jt(`onPointerLeave`,[`pointerout`,`pointerover`]),At(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),At(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),At(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),At(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),At(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),At(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ni(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ni(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[_t];n===void 0&&(n=t[_t]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,Ot.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!_n||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===i)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&o.stateNode.containerInfo===i)return;o=o.return}for(;s!==null;){if(o=Ct(s),o===null)return;if(c=o.tag,c===5||c===6||c===26||c===27){r=a=o;continue a}s=s.parentNode}}r=r.return}mn(function(){var r=a,i=ln(n),o=[];a:{var s=$r.get(e);if(s!==void 0){var c=On,u=e;switch(e){case`keypress`:if(Cn(n)===0)break a;case`keydown`:case`keyup`:c=Kn;break;case`focusin`:u=`focus`,c=Ln;break;case`focusout`:u=`blur`,c=Ln;break;case`beforeblur`:case`afterblur`:c=Ln;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:c=Fn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:c=In;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:c=Jn;break;case Kr:case qr:case Jr:c=Rn;break;case Qr:c=Yn;break;case`scroll`:case`scrollend`:c=An;break;case`wheel`:c=Xn;break;case`copy`:case`cut`:case`paste`:c=zn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:c=qn;break;case`toggle`:case`beforetoggle`:c=Zn}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?s===null?null:s+`Capture`:s;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=hn(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(s=new c(s,u,null,n,i),o.push({event:s,listeners:d}))}}if(!(t&7)){a:{if(s=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,s&&n!==cn&&(u=n.relatedTarget||n.fromElement)&&(Ct(u)||u[A]))break a;if((c||s)&&(s=i.window===i?i:(s=i.ownerDocument)?s.defaultView||s.parentWindow:window,c?(u=n.relatedTarget||n.toElement,c=r,u=u?Ct(u):null,u!==null&&(f=l(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(c=null,u=r),c!==u)){if(d=Fn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=qn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?s:Tt(c),h=u==null?s:Tt(u),s=new d(g,m+`leave`,c,n,i),s.target=f,s.relatedTarget=h,g=null,Ct(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,c&&u)b:{for(d=Dd,p=c,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;c!==null&&Od(o,s,c,d,!1),u!==null&&f!==null&&Od(o,f,u,d,!0)}}a:{if(s=r?Tt(r):window,c=s.nodeName&&s.nodeName.toLowerCase(),c===`select`||c===`input`&&s.type===`file`)var v=gr;else if(ur(s)){if(_r)v=Er;else{v=wr;var y=Cr}}else c=s.nodeName,!c||c.toLowerCase()!==`input`||s.type!==`checkbox`&&s.type!==`radio`?r&&nn(r.elementType)&&(v=gr):v=Tr;if(v&&=v(e,r)){dr(o,v,n,i);break a}y&&y(e,s,r),e===`focusout`&&r&&s.type===`number`&&r.memoizedProps.value!=null&&Jt(s,`number`,s.value)}switch(y=r?Tt(r):window,e){case`focusin`:(ur(y)||y.contentEditable===`true`)&&(Ir=y,Lr=r,Rr=null);break;case`focusout`:Rr=Lr=Ir=null;break;case`mousedown`:zr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:zr=!1,Br(o,n,i);break;case`selectionchange`:if(Fr)break;case`keydown`:case`keyup`:Br(o,n,i)}var b;if($n)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else sr?ar(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(nr&&n.locale!==`ko`&&(sr||x!==`onCompositionStart`?x===`onCompositionEnd`&&sr&&(b=Sn()):(yn=i,bn=`value`in yn?yn.value:yn.textContent,sr=!0)),y=Ed(r,x),0<y.length&&(x=new Bn(x,e,null,n,i),o.push({event:x,listeners:y}),b?x.data=b:(b=or(n),b!==null&&(x.data=b)))),(b=tr?M(e,n):cr(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new Bn(`onBeforeInput`,`beforeinput`,null,n,i),o.push({event:y,listeners:x}),y.data=b)),md(o,e,r,n,i)}yd(o,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=hn(e,n),i!=null&&r.unshift(Td(e,i,a)),i=hn(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=hn(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=hn(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,i,a){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Qt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Qt(e,``+r);break;case`className`:Lt(e,`class`,r);break;case`tabIndex`:Lt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Lt(e,n,r);break;case`style`:tn(e,r,a);break;case`data`:if(t!==`object`){Lt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=on(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof a==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,i.name,i,null),$(e,t,`formEncType`,i.formEncType,i,null),$(e,t,`formMethod`,i.formMethod,i,null),$(e,t,`formTarget`,i.formTarget,i,null)):($(e,t,`encType`,i.encType,i,null),$(e,t,`method`,i.method,i,null),$(e,t,`target`,i.target,i,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=on(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=sn);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(s(61));if(n=r.__html,n!=null){if(i.children!=null)throw Error(s(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=on(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),It(e,`popover`,r);break;case`xlinkActuate`:Rt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Rt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Rt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Rt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Rt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Rt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Rt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Rt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Rt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:It(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=rn.get(n)||n,It(e,n,r))}}function Nd(e,t,n,r,i,a){switch(n){case`style`:tn(e,r,a);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(s(61));if(n=r.__html,n!=null){if(i.children!=null)throw Error(s(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Qt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Qt(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=sn);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!kt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(i=n.endsWith(`Capture`),t=n.slice(2,i?n.length-7:void 0),a=e[gt]||null,a=a==null?null:a[n],typeof a==`function`&&e.removeEventListener(t,a,i),typeof r==`function`)){typeof a!=`function`&&a!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,i);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):It(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,i=!1,a;for(a in n)if(n.hasOwnProperty(a)){var o=n[a];if(o!=null)switch(a){case`src`:r=!0;break;case`srcSet`:i=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(s(137,t));default:$(e,t,a,o,n,null)}}i&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=a=o=i=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:i=d;break;case`type`:o=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:a=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(s(137,t));break;default:$(e,t,r,d,n,null)}}qt(e,a,c,l,u,o,i,!1);return;case`select`:for(i in Q(`invalid`,e),r=o=a=null,n)if(n.hasOwnProperty(i)&&(c=n[i],c!=null))switch(i){case`value`:a=c;break;case`defaultValue`:o=c;break;case`multiple`:r=c;default:$(e,t,i,c,n,null)}t=a,n=o,e.multiple=!!r,t==null?n!=null&&Yt(e,!!r,n,!0):Yt(e,!!r,t,!1);return;case`textarea`:for(o in Q(`invalid`,e),a=i=r=null,n)if(n.hasOwnProperty(o)&&(c=n[o],c!=null))switch(o){case`value`:r=c;break;case`defaultValue`:i=c;break;case`children`:a=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(s(91));break;default:$(e,t,o,c,n,null)}Zt(e,r,i,a);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(s(137,t));default:$(e,t,u,r,n,null)}return;default:if(nn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var i=null,a=null,o=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:a=m;break;case`name`:i=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:o=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(s(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Kt(e,o,c,l,u,d,a,i);return;case`select`:for(a in m=o=c=p=null,n)if(l=n[a],n.hasOwnProperty(a)&&l!=null)switch(a){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(a)||$(e,t,a,null,r,l)}for(i in r)if(a=r[i],l=n[i],r.hasOwnProperty(i)&&(a!=null||l!=null))switch(i){case`value`:p=a;break;case`defaultValue`:c=a;break;case`multiple`:o=a;default:a!==l&&$(e,t,i,a,r,l)}t=c,n=o,r=m,p==null?!!r!=!!n&&(t==null?Yt(e,!!n,n?[]:``,!1):Yt(e,!!n,t,!0)):Yt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(i=n[c],n.hasOwnProperty(c)&&i!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,i)}for(o in r)if(i=r[o],a=n[o],r.hasOwnProperty(o)&&(i!=null||a!=null))switch(o){case`value`:p=i;break;case`defaultValue`:m=i;break;case`children`:break;case`dangerouslySetInnerHTML`:if(i!=null)throw Error(s(91));break;default:i!==a&&$(e,t,o,i,r,a)}Xt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(s(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(nn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e!==Wd&&(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[xt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body)}n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),St(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[xt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(s(452));return e;case`head`:if(e=t.head,!e)throw Error(s(453));return e;case`body`:if(e=t.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);St(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=D.d;D.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=bu();return e||t}function yf(e){var t=wt(e);t!==null&&t.tag===5&&t.type===`form`?Os(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Gt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),Dt(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Gt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Gt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Gt(n.imageSizes)+`"]`)):i+=`[href="`+Gt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),Dt(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Gt(r)+`"][href="`+Gt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),Dt(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=Et(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);Dt(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=Et(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Dt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=Et(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Dt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var i=(i=ge.current)?gf(i):null;if(!i)throw Error(s(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=Et(i).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var a=Et(i).hoistableStyles,o=a.get(e);if(o||(i=i.ownerDocument||i,o={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},a.set(e,o),(a=i.querySelector(jf(e)))&&!a._p&&(o.instance=a,o.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),a||Nf(i,e,n,o.state))),t&&r===null)throw Error(s(528,``));return o}if(t&&r!==null)throw Error(s(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=Et(i).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(s(444,e))}}function Af(e){return`href="`+Gt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),Dt(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Gt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Gt(n.href)+`"]`);if(r)return t.instance=r,Dt(r),r;var i=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Dt(r),Pd(r,`style`,i),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:i=Af(n.href);var a=e.querySelector(jf(i));if(a)return t.state.loading|=4,t.instance=a,Dt(a),a;r=Mf(n),(i=mf.get(i))&&Rf(r,i),a=(e.ownerDocument||e).createElement(`link`),Dt(a);var o=a;return o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),t.state.loading|=4,Lf(a,n.precedence,e),t.instance=a;case`script`:return a=Pf(n.src),(i=e.querySelector(Ff(a)))?(t.instance=i,Dt(i),i):(r=n,(i=mf.get(a))&&(r=h({},n),zf(r,i)),e=e.ownerDocument||e,i=e.createElement(`script`),Dt(i),Pd(i,`link`,r),e.head.appendChild(i),t.instance=i);case`void`:return null;default:throw Error(s(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[xt]||a[ht]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Dt(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),Dt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:S,Provider:null,Consumer:null,_currentValue:ue,_currentValue2:ue,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=it(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=it(0),this.hiddenUpdates=it(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=pi(3,null,null,t),e.current=a,a.stateNode=e,t=da(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Ua(a),e}function tp(e){return e?(e=di,e):di}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Ga(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Ka(e,r,t),n!==null&&(hu(n,e,t),qa(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=ci(e,67108864);t!==null&&hu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=pu();t=ut(t);var n=ci(e,t);n!==null&&hu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=E.T;E.T=null;var a=D.p;try{D.p=2,up(e,t,n,r)}finally{D.p=a,E.T=i}}function lp(e,t,n,r){var i=E.T;E.T=null;var a=D.p;try{D.p=8,up(e,t,n,r)}finally{D.p=a,E.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=wt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=$e(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Ke(o);s.entanglements[1]|=c,o&=~c}rd(a),!(K&6)&&(tu=Pe()+500,id(0,!1))}}break;case 31:case 13:s=ci(a,2),s!==null&&hu(s,a,2),bu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=ln(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=Ct(e),e!==null){var t=l(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=u(t),e!==null)return e;e=null}else if(n===31){if(e=d(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Fe()){case Ie:return 2;case Le:return 8;case Re:case ze:return 32;case Be:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=wt(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=Ct(e.target);if(t!==null){var n=l(t);if(n!==null){if(t=n.tag,t===13){if(t=u(n),t!==null){e.blockedOn=t,pt(e.priority,function(){op(n)});return}}else if(t===31){if(t=d(n),t!==null){e.blockedOn=t,pt(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);cn=r,n.target.dispatchEvent(r),cn=null}else return t=wt(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=wt(n);a!==null&&(e.splice(t,3),t-=3,Es(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[gt]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[gt]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(s(409));var n=t.current;np(n,pu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),bu(),t[A]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=ft();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=r.version;if(Lp!==`19.2.8`)throw Error(s(527,Lp,`19.2.8`));D.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(s(188)):(e=Object.keys(e).join(`,`),Error(s(268,e)));return e=p(t),e=e===null?null:m(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.8`,rendererPackageName:`react-dom`,currentDispatcherRef:E,reconcilerVersion:`19.2.8`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{Ue=zp.inject(Rp),We=zp}catch{}}e.createRoot=function(e,t){if(!c(e))throw Error(s(299));var n=!1,r=``,i=Js,a=Ys,o=Xs;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(i=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,i,a,o,Pp),e[A]=t.current,Sd(e),new Fp(t)}})),c=e(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=s()})),l=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),u=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),d=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),f=e=>{let t=d(e);return t.charAt(0).toUpperCase()+t.slice(1)},p={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`},m=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0;return!1},h=n(),g=(0,h.createContext)({}),_=()=>(0,h.useContext)(g),v=(0,h.forwardRef)(({color:e,size:t,strokeWidth:n,absoluteStrokeWidth:r,className:i=``,children:a,iconNode:o,...s},c)=>{let{size:u=24,strokeWidth:d=2,absoluteStrokeWidth:f=!1,color:g=`currentColor`,className:v=``}=_()??{},y=r??f?Number(n??d)*24/Number(t??u):n??d;return(0,h.createElement)(`svg`,{ref:c,...p,width:t??u??p.width,height:t??u??p.height,stroke:e??g,strokeWidth:y,className:l(`lucide`,v,i),...!a&&!m(s)&&{"aria-hidden":`true`},...s},[...o.map(([e,t])=>(0,h.createElement)(e,t)),...Array.isArray(a)?a:[a]])}),y=(e,t)=>{let n=(0,h.forwardRef)(({className:n,...r},i)=>(0,h.createElement)(v,{ref:i,iconNode:t,className:l(`lucide-${u(f(e))}`,`lucide-${e}`,n),...r}));return n.displayName=f(e),n},b=y(`activity`,[[`path`,{d:`M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2`,key:`169zse`}]]),x=y(`arrow-down-right`,[[`path`,{d:`m7 7 10 10`,key:`1fmybs`}],[`path`,{d:`M17 7v10H7`,key:`6fjiku`}]]),ee=y(`arrow-up-right`,[[`path`,{d:`M7 7h10v10`,key:`1tivn9`}],[`path`,{d:`M7 17 17 7`,key:`1vkiza`}]]),S=y(`ban`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M4.929 4.929 19.07 19.071`,key:`196cmz`}]]),C=y(`bell`,[[`path`,{d:`M10.268 21a2 2 0 0 0 3.464 0`,key:`vwvbt9`}],[`path`,{d:`M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326`,key:`11g9vi`}]]),w=y(`check`,[[`path`,{d:`M20 6 9 17l-5-5`,key:`1gmf2c`}]]),te=y(`chevron-down`,[[`path`,{d:`m6 9 6 6 6-6`,key:`qrunsl`}]]),ne=y(`circle-check`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),T=y(`circle-dollar-sign`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8`,key:`1h4pet`}],[`path`,{d:`M12 18V6`,key:`zqpxq5`}]]),re=y(`clock-3`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 6v6h4`,key:`135r8i`}]]),ie=y(`copy`,[[`rect`,{width:`14`,height:`14`,x:`8`,y:`8`,rx:`2`,ry:`2`,key:`17jyea`}],[`path`,{d:`M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`,key:`zix9uf`}]]),ae=y(`credit-card`,[[`rect`,{width:`20`,height:`14`,x:`2`,y:`5`,rx:`2`,key:`ynyp8z`}],[`line`,{x1:`2`,x2:`22`,y1:`10`,y2:`10`,key:`1b3vmo`}]]),oe=y(`database`,[[`ellipse`,{cx:`12`,cy:`5`,rx:`9`,ry:`3`,key:`msslwz`}],[`path`,{d:`M3 5V19A9 3 0 0 0 21 19V5`,key:`1wlel7`}],[`path`,{d:`M3 12A9 3 0 0 0 21 12`,key:`mv7ke4`}]]),se=y(`download`,[[`path`,{d:`M12 15V3`,key:`m9g1x1`}],[`path`,{d:`M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`,key:`ih7n3h`}],[`path`,{d:`m7 10 5 5 5-5`,key:`brsn70`}]]),ce=y(`ellipsis`,[[`circle`,{cx:`12`,cy:`12`,r:`1`,key:`41hilf`}],[`circle`,{cx:`19`,cy:`12`,r:`1`,key:`1wjl8i`}],[`circle`,{cx:`5`,cy:`12`,r:`1`,key:`1pcz8c`}]]),le=y(`external-link`,[[`path`,{d:`M15 3h6v6`,key:`1q9fwt`}],[`path`,{d:`M10 14 21 3`,key:`gplh6r`}],[`path`,{d:`M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`,key:`a6xqqp`}]]),E=y(`eye-off`,[[`path`,{d:`M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49`,key:`ct8e1f`}],[`path`,{d:`M14.084 14.158a3 3 0 0 1-4.242-4.242`,key:`151rxh`}],[`path`,{d:`M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143`,key:`13bj9a`}],[`path`,{d:`m2 2 20 20`,key:`1ooewy`}]]),D=y(`eye`,[[`path`,{d:`M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0`,key:`1nclc0`}],[`circle`,{cx:`12`,cy:`12`,r:`3`,key:`1v7zrd`}]]),ue=y(`flame`,[[`path`,{d:`M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4`,key:`1slcih`}]]),de=y(`gauge`,[[`path`,{d:`m12 14 4-4`,key:`9kzdfg`}],[`path`,{d:`M3.34 19a10 10 0 1 1 17.32 0`,key:`19p75a`}]]),fe=y(`infinity`,[[`path`,{d:`M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8`,key:`18ogeb`}]]),pe=y(`key-round`,[[`path`,{d:`M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z`,key:`1s6t7t`}],[`circle`,{cx:`16.5`,cy:`7.5`,r:`.5`,fill:`currentColor`,key:`w0ekpg`}]]),O=y(`laptop`,[[`path`,{d:`M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z`,key:`1pdavp`}],[`path`,{d:`M20.054 15.987H3.946`,key:`14rxg9`}]]),k=y(`layout-dashboard`,[[`rect`,{width:`7`,height:`9`,x:`3`,y:`3`,rx:`1`,key:`10lvy0`}],[`rect`,{width:`7`,height:`5`,x:`14`,y:`3`,rx:`1`,key:`16une8`}],[`rect`,{width:`7`,height:`9`,x:`14`,y:`12`,rx:`1`,key:`1hutg5`}],[`rect`,{width:`7`,height:`5`,x:`3`,y:`16`,rx:`1`,key:`ldoo1y`}]]),me=y(`life-buoy`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m4.93 4.93 4.24 4.24`,key:`1ymg45`}],[`path`,{d:`m14.83 9.17 4.24-4.24`,key:`1cb5xl`}],[`path`,{d:`m14.83 14.83 4.24 4.24`,key:`q42g0n`}],[`path`,{d:`m9.17 14.83-4.24 4.24`,key:`bqpfvv`}],[`circle`,{cx:`12`,cy:`12`,r:`4`,key:`4exip2`}]]),he=y(`lock-open`,[[`rect`,{width:`18`,height:`11`,x:`3`,y:`11`,rx:`2`,ry:`2`,key:`1w4ew1`}],[`path`,{d:`M7 11V7a5 5 0 0 1 9.9-1`,key:`1mm8w8`}]]),ge=y(`log-out`,[[`path`,{d:`m16 17 5-5-5-5`,key:`1bji2h`}],[`path`,{d:`M21 12H9`,key:`dn1m92`}],[`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`,key:`1uf3rs`}]]),_e=y(`message-square`,[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}]]),ve=y(`monitor`,[[`rect`,{width:`20`,height:`14`,x:`2`,y:`3`,rx:`2`,key:`48i651`}],[`line`,{x1:`8`,x2:`16`,y1:`21`,y2:`21`,key:`1svkeh`}],[`line`,{x1:`12`,x2:`12`,y1:`17`,y2:`21`,key:`vw1qmm`}]]),ye=y(`moon`,[[`path`,{d:`M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401`,key:`kfwtm`}]]),be=y(`palette`,[[`path`,{d:`M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z`,key:`e79jfc`}],[`circle`,{cx:`13.5`,cy:`6.5`,r:`.5`,fill:`currentColor`,key:`1okk4w`}],[`circle`,{cx:`17.5`,cy:`10.5`,r:`.5`,fill:`currentColor`,key:`f64h9f`}],[`circle`,{cx:`6.5`,cy:`12.5`,r:`.5`,fill:`currentColor`,key:`qy21gx`}],[`circle`,{cx:`8.5`,cy:`7.5`,r:`.5`,fill:`currentColor`,key:`fotxhn`}]]),xe=y(`phone`,[[`path`,{d:`M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384`,key:`9njp5v`}]]),Se=y(`plus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`M12 5v14`,key:`s699le`}]]),Ce=y(`printer`,[[`path`,{d:`M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2`,key:`143wyd`}],[`path`,{d:`M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6`,key:`1itne7`}],[`rect`,{x:`6`,y:`14`,width:`12`,height:`8`,rx:`1`,key:`1ue0tg`}]]),we=y(`qr-code`,[[`rect`,{width:`5`,height:`5`,x:`3`,y:`3`,rx:`1`,key:`1tu5fj`}],[`rect`,{width:`5`,height:`5`,x:`16`,y:`3`,rx:`1`,key:`1v8r4q`}],[`rect`,{width:`5`,height:`5`,x:`3`,y:`16`,rx:`1`,key:`1x03jg`}],[`path`,{d:`M21 16h-3a2 2 0 0 0-2 2v3`,key:`177gqh`}],[`path`,{d:`M21 21v.01`,key:`ents32`}],[`path`,{d:`M12 7v3a2 2 0 0 1-2 2H7`,key:`8crl2c`}],[`path`,{d:`M3 12h.01`,key:`nlz23k`}],[`path`,{d:`M12 3h.01`,key:`n36tog`}],[`path`,{d:`M12 16v.01`,key:`133mhm`}],[`path`,{d:`M16 12h1`,key:`1slzba`}],[`path`,{d:`M21 12v.01`,key:`1lwtk9`}],[`path`,{d:`M12 21v-1`,key:`1880an`}]]),Te=y(`radio`,[[`path`,{d:`M16.247 7.761a6 6 0 0 1 0 8.478`,key:`1fwjs5`}],[`path`,{d:`M19.075 4.933a10 10 0 0 1 0 14.134`,key:`ehdyv1`}],[`path`,{d:`M4.925 19.067a10 10 0 0 1 0-14.134`,key:`1q22gi`}],[`path`,{d:`M7.753 16.239a6 6 0 0 1 0-8.478`,key:`r2q7qm`}],[`circle`,{cx:`12`,cy:`12`,r:`2`,key:`1c9p78`}]]),Ee=y(`receipt-text`,[[`path`,{d:`M13 16H8`,key:`wsln4y`}],[`path`,{d:`M14 8H8`,key:`1l3xfs`}],[`path`,{d:`M16 12H8`,key:`1fr5h0`}],[`path`,{d:`M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z`,key:`ycz6yz`}]]),De=y(`refresh-cw`,[[`path`,{d:`M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8`,key:`v9h5vc`}],[`path`,{d:`M21 3v5h-5`,key:`1q7to0`}],[`path`,{d:`M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16`,key:`3uifl3`}],[`path`,{d:`M8 16H3v5`,key:`1cv678`}]]),Oe=y(`router`,[[`rect`,{width:`20`,height:`8`,x:`2`,y:`14`,rx:`2`,key:`w68u3i`}],[`path`,{d:`M6.01 18H6`,key:`19vcac`}],[`path`,{d:`M10.01 18H10`,key:`uamcmx`}],[`path`,{d:`M15 10v4`,key:`qjz1xs`}],[`path`,{d:`M17.84 7.17a4 4 0 0 0-5.66 0`,key:`1rif40`}],[`path`,{d:`M20.66 4.34a8 8 0 0 0-11.31 0`,key:`6a5xfq`}]]),ke=y(`save`,[[`path`,{d:`M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z`,key:`1c8476`}],[`path`,{d:`M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7`,key:`1ydtos`}],[`path`,{d:`M7 3v4a1 1 0 0 0 1 1h7`,key:`t51u73`}]]),Ae=y(`search`,[[`path`,{d:`m21 21-4.34-4.34`,key:`14j7rj`}],[`circle`,{cx:`11`,cy:`11`,r:`8`,key:`4ej97u`}]]),je=y(`send`,[[`path`,{d:`M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z`,key:`1ffxy3`}],[`path`,{d:`m21.854 2.147-10.94 10.939`,key:`12cjpa`}]]),Me=y(`server`,[[`rect`,{width:`20`,height:`8`,x:`2`,y:`2`,rx:`2`,ry:`2`,key:`ngkwjq`}],[`rect`,{width:`20`,height:`8`,x:`2`,y:`14`,rx:`2`,ry:`2`,key:`iecqi9`}],[`line`,{x1:`6`,x2:`6.01`,y1:`6`,y2:`6`,key:`16zg32`}],[`line`,{x1:`6`,x2:`6.01`,y1:`18`,y2:`18`,key:`nzw8ys`}]]),Ne=y(`settings-2`,[[`path`,{d:`M14 17H5`,key:`gfn3mx`}],[`path`,{d:`M19 7h-9`,key:`6i9tg`}],[`circle`,{cx:`17`,cy:`17`,r:`3`,key:`18b49y`}],[`circle`,{cx:`7`,cy:`7`,r:`3`,key:`dfmy0x`}]]),Pe=y(`shield-check`,[[`path`,{d:`M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,key:`oel41y`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),Fe=y(`signal`,[[`path`,{d:`M2 20h.01`,key:`4haj6o`}],[`path`,{d:`M7 20v-4`,key:`j294jx`}],[`path`,{d:`M12 20v-8`,key:`i3yub9`}],[`path`,{d:`M17 20V8`,key:`1tkaf5`}],[`path`,{d:`M22 4v16`,key:`sih9yq`}]]),Ie=y(`sliders-vertical`,[[`path`,{d:`M10 8h4`,key:`1sr2af`}],[`path`,{d:`M12 21v-9`,key:`17s77i`}],[`path`,{d:`M12 8V3`,key:`13r4qs`}],[`path`,{d:`M17 16h4`,key:`h1uq16`}],[`path`,{d:`M19 12V3`,key:`o1uvq1`}],[`path`,{d:`M19 21v-5`,key:`qua636`}],[`path`,{d:`M3 14h4`,key:`bcjad9`}],[`path`,{d:`M5 10V3`,key:`cb8scm`}],[`path`,{d:`M5 21v-7`,key:`1w1uti`}]]),Le=y(`smartphone`,[[`rect`,{width:`14`,height:`20`,x:`5`,y:`2`,rx:`2`,ry:`2`,key:`1yt0o3`}],[`path`,{d:`M12 18h.01`,key:`mhygvu`}]]),Re=y(`sparkles`,[[`path`,{d:`M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z`,key:`1s2grr`}],[`path`,{d:`M20 2v4`,key:`1rf3ol`}],[`path`,{d:`M22 4h-4`,key:`gwowj6`}],[`circle`,{cx:`4`,cy:`20`,r:`2`,key:`6kqj1y`}]]),ze=y(`sun`,[[`circle`,{cx:`12`,cy:`12`,r:`4`,key:`4exip2`}],[`path`,{d:`M12 2v2`,key:`tus03m`}],[`path`,{d:`M12 20v2`,key:`1lh1kg`}],[`path`,{d:`m4.93 4.93 1.41 1.41`,key:`149t6j`}],[`path`,{d:`m17.66 17.66 1.41 1.41`,key:`ptbguv`}],[`path`,{d:`M2 12h2`,key:`1t8f8n`}],[`path`,{d:`M20 12h2`,key:`1q8mjw`}],[`path`,{d:`m6.34 17.66-1.41 1.41`,key:`1m8zz5`}],[`path`,{d:`m19.07 4.93-1.41 1.41`,key:`1shlcs`}]]),Be=y(`terminal`,[[`path`,{d:`M12 19h8`,key:`baeox8`}],[`path`,{d:`m4 17 6-6-6-6`,key:`1yngyt`}]]),Ve=y(`ticket`,[[`path`,{d:`M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z`,key:`qn84l0`}],[`path`,{d:`M13 5v2`,key:`dyzc3o`}],[`path`,{d:`M13 17v2`,key:`1ont0d`}],[`path`,{d:`M13 11v2`,key:`1wjjxi`}]]),He=y(`trash-2`,[[`path`,{d:`M10 11v6`,key:`nco0om`}],[`path`,{d:`M14 11v6`,key:`outv1u`}],[`path`,{d:`M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6`,key:`miytrc`}],[`path`,{d:`M3 6h18`,key:`d0wm0j`}],[`path`,{d:`M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2`,key:`e791ji`}]]),Ue=y(`trending-up`,[[`path`,{d:`M16 7h6v6`,key:`box55l`}],[`path`,{d:`m22 7-8.5 8.5-5-5L2 17`,key:`1t1m79`}]]),We=y(`triangle-alert`,[[`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`,key:`wmoenq`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]]),Ge=y(`user-check`,[[`path`,{d:`m16 11 2 2 4-4`,key:`9rsbq5`}],[`path`,{d:`M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`,key:`1yyitq`}],[`circle`,{cx:`9`,cy:`7`,r:`4`,key:`nufk8`}]]),Ke=y(`user-plus`,[[`path`,{d:`M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`,key:`1yyitq`}],[`circle`,{cx:`9`,cy:`7`,r:`4`,key:`nufk8`}],[`line`,{x1:`19`,x2:`19`,y1:`8`,y2:`14`,key:`1bvyxn`}],[`line`,{x1:`22`,x2:`16`,y1:`11`,y2:`11`,key:`1shjgl`}]]),qe=y(`user-x`,[[`path`,{d:`M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`,key:`1yyitq`}],[`circle`,{cx:`9`,cy:`7`,r:`4`,key:`nufk8`}],[`line`,{x1:`17`,x2:`22`,y1:`8`,y2:`13`,key:`3nzzx3`}],[`line`,{x1:`22`,x2:`17`,y1:`8`,y2:`13`,key:`1swrse`}]]),Je=y(`users`,[[`path`,{d:`M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`,key:`1yyitq`}],[`path`,{d:`M16 3.128a4 4 0 0 1 0 7.744`,key:`16gr8j`}],[`path`,{d:`M22 21v-2a4 4 0 0 0-3-3.87`,key:`kshegd`}],[`circle`,{cx:`9`,cy:`7`,r:`4`,key:`nufk8`}]]),Ye=y(`wifi-off`,[[`path`,{d:`M12 20h.01`,key:`zekei9`}],[`path`,{d:`M8.5 16.429a5 5 0 0 1 7 0`,key:`1bycff`}],[`path`,{d:`M5 12.859a10 10 0 0 1 5.17-2.69`,key:`1dl1wf`}],[`path`,{d:`M19 12.859a10 10 0 0 0-2.007-1.523`,key:`4k23kn`}],[`path`,{d:`M2 8.82a15 15 0 0 1 4.177-2.643`,key:`1grhjp`}],[`path`,{d:`M22 8.82a15 15 0 0 0-11.288-3.764`,key:`z3jwby`}],[`path`,{d:`m2 2 20 20`,key:`1ooewy`}]]),Xe=y(`wifi`,[[`path`,{d:`M12 20h.01`,key:`zekei9`}],[`path`,{d:`M2 8.82a15 15 0 0 1 20 0`,key:`dnpr2z`}],[`path`,{d:`M5 12.859a10 10 0 0 1 14 0`,key:`1x1e6c`}],[`path`,{d:`M8.5 16.429a5 5 0 0 1 7 0`,key:`1bycff`}]]),Ze=y(`x`,[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]),Qe=y(`zap`,[[`path`,{d:`M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z`,key:`1v7up4`}]]),$e=c(),et=Symbol.for(`@supabase/supabase-js.traceContextExtractor`);function tt(){return globalThis[et]}function nt(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols==`function`)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n}function rt(e,t,n,r){function i(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||=Promise)(function(n,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?n(e.value):i(e.value).then(o,s)}c((r=r.apply(e,t||[])).next())})}var it=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),at=class extends Error{constructor(e,t=`FunctionsError`,n){super(e),this.name=t,this.context=n}toJSON(){return{name:this.name,message:this.message,context:this.context}}},ot=class extends at{constructor(e){super(`Failed to send a request to the Edge Function`,`FunctionsFetchError`,e)}},st=class extends at{constructor(e){super(`Relay Error invoking the Edge Function`,`FunctionsRelayError`,e)}},ct=class extends at{constructor(e){super(`Edge Function returned a non-2xx status code`,`FunctionsHttpError`,e)}},lt;(function(e){e.Any=`any`,e.ApNortheast1=`ap-northeast-1`,e.ApNortheast2=`ap-northeast-2`,e.ApSouth1=`ap-south-1`,e.ApSoutheast1=`ap-southeast-1`,e.ApSoutheast2=`ap-southeast-2`,e.CaCentral1=`ca-central-1`,e.EuCentral1=`eu-central-1`,e.EuWest1=`eu-west-1`,e.EuWest2=`eu-west-2`,e.EuWest3=`eu-west-3`,e.SaEast1=`sa-east-1`,e.UsEast1=`us-east-1`,e.UsWest1=`us-west-1`,e.UsWest2=`us-west-2`})(lt||={});var ut=class{constructor(e,{headers:t={},customFetch:n,region:r=lt.Any}={}){this.url=e,this.headers=t,this.region=r,this.fetch=it(n)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return rt(this,arguments,void 0,function*(e,t={}){var n;let r,i,a;try{let{headers:n,method:o,body:s,signal:c,timeout:l}=t,u={},{region:d}=t;d||=this.region;let f=new URL(`${this.url}/${e}`);d&&d!==`any`&&(u[`x-region`]=d,f.searchParams.set(`forceFunctionRegion`,d));let p,m=!!n&&Object.keys(n).some(e=>e.toLowerCase()===`content-type`);s&&!m?typeof Blob<`u`&&s instanceof Blob||s instanceof ArrayBuffer?(u[`Content-Type`]=`application/octet-stream`,p=s):typeof s==`string`?(u[`Content-Type`]=`text/plain`,p=s):typeof FormData<`u`&&s instanceof FormData?p=s:(u[`Content-Type`]=`application/json`,p=JSON.stringify(s)):p=s&&typeof s!=`string`&&!(typeof Blob<`u`&&s instanceof Blob)&&!(s instanceof ArrayBuffer)&&!(typeof FormData<`u`&&s instanceof FormData)?JSON.stringify(s):s;let h=c;l&&(i=new AbortController,r=setTimeout(()=>i.abort(),l),c?(h=i.signal,a=()=>i.abort(),c.addEventListener(`abort`,a)):h=i.signal);let g=yield this.fetch(f.toString(),{method:o||`POST`,headers:Object.assign(Object.assign(Object.assign({},u),this.headers),n),body:p,signal:h}).catch(e=>{throw new ot(e)}),_=g.headers.get(`x-relay-error`);if(_&&_===`true`)throw new st(g);if(!g.ok)throw new ct(g);let v=(g.headers.get(`Content-Type`)??`text/plain`).split(`;`)[0].trim().toLowerCase(),y;return y=v===`application/json`?yield g.json():v===`application/octet-stream`||v===`application/pdf`?yield g.blob():v===`text/event-stream`?g:v===`multipart/form-data`?yield g.formData():yield g.text(),{data:y,error:null,response:g}}catch(e){return{data:null,error:e,response:e instanceof ct||e instanceof st?e.context:void 0}}finally{r&&clearTimeout(r),a&&((n=t.signal)==null||n.removeEventListener(`abort`,a))}})}},dt=3,ft=e=>Math.min(1e3*2**e,3e4),pt=[520,503],mt=[`GET`,`HEAD`,`OPTIONS`],ht=class extends Error{constructor(e){super(e.message),this.name=`PostgrestError`,this.details=e.details,this.hint=e.hint,this.code=e.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};function gt(e){"@babel/helpers - typeof";return gt=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},gt(e)}function A(e,t){if(gt(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(gt(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function _t(e){var t=A(e,`string`);return gt(t)==`symbol`?t:t+``}function vt(e,t,n){return(t=_t(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function yt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function bt(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?yt(Object(n),!0).forEach(function(t){vt(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):yt(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function xt(e,t){return new Promise(n=>{if(t?.aborted){n();return}let r=setTimeout(()=>{t?.removeEventListener(`abort`,i),n()},e);function i(){clearTimeout(r),n()}t?.addEventListener(`abort`,i)})}function St(e,t,n,r){return!(!r||n>=dt||!mt.includes(e)||!pt.includes(t))}var Ct=class{constructor(e){this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=e.method,this.url=e.url,this.headers=new Headers(e.headers),this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=e.shouldThrowOnError??!1,this.signal=e.signal,this.isMaybeSingle=e.isMaybeSingle??!1,this.shouldStripNulls=e.shouldStripNulls??!1,this.urlLengthLimit=e.urlLengthLimit??8e3,this.retryEnabled=e.retry??!0,this.fetch=e.fetch?e.fetch:fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get(`Accept`)===`text/csv`)throw Error(`stripNulls() cannot be used with csv()`);return this.shouldStripNulls=!0,this}setHeader(e,t){return this.headers=new Headers(this.headers),this.headers.set(e,t),this}retry(e){return this.retryEnabled=e,this}then(e,t){var n=this;if(this.schema===void 0||([`GET`,`HEAD`].includes(this.method)?this.headers.set(`Accept-Profile`,this.schema):this.headers.set(`Content-Profile`,this.schema)),this.method!==`GET`&&this.method!==`HEAD`&&this.headers.set(`Content-Type`,`application/json`),this.shouldStripNulls){let e=this.headers.get(`Accept`);e===`application/vnd.pgrst.object+json`?this.headers.set(`Accept`,`application/vnd.pgrst.object+json;nulls=stripped`):(!e||e===`application/json`)&&this.headers.set(`Accept`,`application/vnd.pgrst.array+json;nulls=stripped`)}let r=this.fetch,i=(async()=>{let e=0;for(;;){let t={};n.headers.forEach((e,n)=>{t[n]=e}),e>0&&(t[`X-Retry-Count`]=String(e));let i;try{i=await r(n.url.toString(),{method:n.method,headers:t,body:JSON.stringify(n.body,(e,t)=>typeof t==`bigint`?t.toString():t),signal:n.signal})}catch(t){if(t?.name===`AbortError`||t?.code===`ABORT_ERR`||!mt.includes(n.method))throw t;if(n.retryEnabled&&e<dt){let t=ft(e);e++,await xt(t,n.signal);continue}throw t}if(St(n.method,i.status,e,n.retryEnabled)){let t=i.headers?.get(`Retry-After`)??null,r=t===null?ft(e):Math.max(0,parseInt(t,10)||0)*1e3;await i.text(),e++,await xt(r,n.signal);continue}return await n.processResponse(i)}})();return this.shouldThrowOnError||(i=i.catch(e=>{let t=``,n=``,r=``,i=e?.cause;if(i){let n=i?.message??``,r=i?.code??``;t=`${e?.name??`FetchError`}: ${e?.message}`,t+=`\n\nCaused by: ${i?.name??`Error`}: ${n}`,r&&(t+=` (${r})`),i?.stack&&(t+=`\n${i.stack}`)}else t=e?.stack??``;let a=this.url.toString().length;return e?.name===`AbortError`||e?.code===`ABORT_ERR`?(r=``,n=`Request was aborted (timeout or manual cancellation)`,a>this.urlLengthLimit&&(n+=`. Note: Your request URL is ${a} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):(i?.name===`HeadersOverflowError`||i?.code===`UND_ERR_HEADERS_OVERFLOW`)&&(r=``,n=`HTTP headers exceeded server limits (typically 16KB)`,a>this.urlLengthLimit&&(n+=`. Your request URL is ${a} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${e?.name??`FetchError`}: ${e?.message}`,details:t,hint:n,code:r},data:null,count:null,status:0,statusText:``}})),i.then(e,t)}async processResponse(e){var t=this;let n=null,r=null,i=null,a=e.status,o=e.statusText;if(e.ok){if(t.method!==`HEAD`){let i=await e.text();if(i!==``){if(t.headers.get(`Accept`)===`text/csv`)r=i;else if(t.headers.get(`Accept`)&&t.headers.get(`Accept`)?.includes(`application/vnd.pgrst.plan+text`))r=i;else try{r=JSON.parse(i)}catch{if(n={message:i},r=null,t.shouldThrowOnError)throw new ht({message:i,details:``,hint:``,code:``})}}}let s=t.headers.get(`Prefer`)?.match(/count=(exact|planned|estimated)/),c=e.headers.get(`content-range`)?.split(`/`);if(s&&c&&c.length>1&&(i=parseInt(c[1])),t.isMaybeSingle&&Array.isArray(r)){if(r.length>1){if(n={code:`PGRST116`,details:`Results contain ${r.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:`JSON object requested, multiple (or no) rows returned`},r=null,i=null,a=406,o=`Not Acceptable`,t.shouldThrowOnError)throw new ht(bt(bt({},n),{},{hint:n.hint??``}))}else r=r.length===1?r[0]:null}}else{let i=await e.text();try{n=JSON.parse(i),Array.isArray(n)&&e.status===404&&(r=[],n=null,a=200,o=`OK`)}catch{e.status===404&&i===``?(a=204,o=`No Content`):n={message:i}}if(n&&t.shouldThrowOnError)throw new ht(n)}return{success:n===null,error:n,data:r,count:i,status:a,statusText:o}}returns(){return this}overrideTypes(){return this}},wt=class extends Ct{throwOnError(){return super.throwOnError()}select(e){let t=!1,n=(e??`*`).split(``).map(e=>/\s/.test(e)&&!t?``:(e===`"`&&(t=!t),e)).join(``);return this.url.searchParams.set(`select`,n),this.headers.append(`Prefer`,`return=representation`),this}order(e,{ascending:t=!0,nullsFirst:n,foreignTable:r,referencedTable:i=r}={}){let a=i?`${i}.order`:`order`,o=this.url.searchParams.get(a);return this.url.searchParams.set(a,`${o?`${o},`:``}${e}.${t?`asc`:`desc`}${n===void 0?``:n?`.nullsfirst`:`.nullslast`}`),this}limit(e,{foreignTable:t,referencedTable:n=t}={}){let r=n===void 0?`limit`:`${n}.limit`;return this.url.searchParams.set(r,`${e}`),this}range(e,t,{foreignTable:n,referencedTable:r=n}={}){let i=r===void 0?`offset`:`${r}.offset`,a=r===void 0?`limit`:`${r}.limit`;return this.url.searchParams.set(i,`${e}`),this.url.searchParams.set(a,`${t-e+1}`),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.set(`Accept`,`application/vnd.pgrst.object+json`),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set(`Accept`,`text/csv`),this}geojson(){return this.headers.set(`Accept`,`application/geo+json`),this}explain({analyze:e=!1,verbose:t=!1,settings:n=!1,buffers:r=!1,wal:i=!1,format:a=`text`}={}){let o=[e?`analyze`:null,t?`verbose`:null,n?`settings`:null,r?`buffers`:null,i?`wal`:null].filter(Boolean).join(`|`),s=this.headers.get(`Accept`)??`application/json`;return this.headers.set(`Accept`,`application/vnd.pgrst.plan+${a}; for="${s}"; options=${o};`),this}rollback(){return this.headers.append(`Prefer`,`tx=rollback`),this}returns(){return this}maxAffected(e){return this.headers.append(`Prefer`,`handling=strict`),this.headers.append(`Prefer`,`max-affected=${e}`),this}},Tt=RegExp(`[,()]`),Et=class extends wt{throwOnError(){return super.throwOnError()}eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(`,`)}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(`,`)}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(`,`)}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(`,`)}}`),this}regexMatch(e,t){return this.url.searchParams.append(e,`match.${t}`),this}regexIMatch(e,t){return this.url.searchParams.append(e,`imatch.${t}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}isDistinct(e,t){return this.url.searchParams.append(e,`isdistinct.${t}`),this}in(e,t){let n=Array.from(new Set(t)).map(e=>typeof e==`string`&&Tt.test(e)?`"${e}"`:`${e}`).join(`,`);return this.url.searchParams.append(e,`in.(${n})`),this}notIn(e,t){let n=Array.from(new Set(t)).map(e=>typeof e==`string`&&Tt.test(e)?`"${e}"`:`${e}`).join(`,`);return this.url.searchParams.append(e,`not.in.(${n})`),this}contains(e,t){return typeof t==`string`?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(`,`)}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return typeof t==`string`?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(`,`)}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return typeof t==`string`?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(`,`)}}`),this}textSearch(e,t,{config:n,type:r}={}){let i=``;r===`plain`?i=`pl`:r===`phrase`?i=`ph`:r===`websearch`&&(i=`w`);let a=n===void 0?``:`(${n})`;return this.url.searchParams.append(e,`${i}fts${a}.${t}`),this}match(e){return Object.entries(e).filter(([e,t])=>t!==void 0).forEach(([e,t])=>{this.url.searchParams.append(e,`eq.${t}`)}),this}not(e,t,n){return this.url.searchParams.append(e,`not.${t}.${n}`),this}or(e,{foreignTable:t,referencedTable:n=t}={}){let r=n?`${n}.or`:`or`;return this.url.searchParams.append(r,`(${e})`),this}filter(e,t,n){return this.url.searchParams.append(e,`${t}.${n}`),this}},Dt=class{constructor(e,{headers:t={},schema:n,fetch:r,urlLengthLimit:i=8e3,retry:a}){this.url=e,this.headers=new Headers(t),this.schema=n,this.fetch=r,this.urlLengthLimit=i,this.retry=a}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(e,t){let{head:n=!1,count:r}=t??{},i=n?`HEAD`:`GET`,a=!1,o=(e??`*`).split(``).map(e=>/\s/.test(e)&&!a?``:(e===`"`&&(a=!a),e)).join(``),{url:s,headers:c}=this.cloneRequestState();return s.searchParams.set(`select`,o),r&&c.append(`Prefer`,`count=${r}`),new Et({method:i,url:s,headers:c,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(e,{count:t,defaultToNull:n=!0}={}){let{url:r,headers:i}=this.cloneRequestState();if(t&&i.append(`Prefer`,`count=${t}`),n||i.append(`Prefer`,`missing=default`),Array.isArray(e)){let t=e.reduce((e,t)=>e.concat(Object.keys(t)),[]);if(t.length>0){let e=[...new Set(t)].map(e=>`"${e}"`);r.searchParams.set(`columns`,e.join(`,`))}}return new Et({method:`POST`,url:r,headers:i,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(e,{onConflict:t,ignoreDuplicates:n=!1,count:r,defaultToNull:i=!0}={}){let{url:a,headers:o}=this.cloneRequestState();if(o.append(`Prefer`,`resolution=${n?`ignore`:`merge`}-duplicates`),t!==void 0&&a.searchParams.set(`on_conflict`,t),r&&o.append(`Prefer`,`count=${r}`),i||o.append(`Prefer`,`missing=default`),Array.isArray(e)){let t=e.reduce((e,t)=>e.concat(Object.keys(t)),[]);if(t.length>0){let e=[...new Set(t)].map(e=>`"${e}"`);a.searchParams.set(`columns`,e.join(`,`))}}return new Et({method:`POST`,url:a,headers:o,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(e,{count:t}={}){let{url:n,headers:r}=this.cloneRequestState();return t&&r.append(`Prefer`,`count=${t}`),new Et({method:`PATCH`,url:n,headers:r,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:e}={}){let{url:t,headers:n}=this.cloneRequestState();return e&&n.append(`Prefer`,`count=${e}`),new Et({method:`DELETE`,url:t,headers:n,schema:this.schema,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}},Ot=class e{constructor(e,{headers:t={},schema:n,fetch:r,timeout:i,urlLengthLimit:a=8e3,retry:o}={}){this.url=e,this.headers=new Headers(t),this.schemaName=n,this.urlLengthLimit=a;let s=r??globalThis.fetch;this.fetch=i!==void 0&&i>0?(e,t)=>{let n=new AbortController,r=setTimeout(()=>n.abort(),i),a=t?.signal;if(a){if(a.aborted)return clearTimeout(r),s(e,t);let i=()=>{clearTimeout(r),n.abort()};return a.addEventListener(`abort`,i,{once:!0}),s(e,bt(bt({},t),{},{signal:n.signal})).finally(()=>{clearTimeout(r),a.removeEventListener(`abort`,i)})}return s(e,bt(bt({},t),{},{signal:n.signal})).finally(()=>clearTimeout(r))}:s,this.retry=o}from(e){if(!e||typeof e!=`string`||e.trim()===``)throw Error(`Invalid relation name: relation must be a non-empty string.`);return new Dt(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(t){return new e(this.url,{headers:this.headers,schema:t,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}rpc(e,t={},{head:n=!1,get:r=!1,count:i}={}){let a,o=new URL(`${this.url}/rpc/${e}`),s,c=e=>typeof e==`object`&&!!e&&(!Array.isArray(e)||e.some(c)),l=n&&Object.values(t).some(c);l?(a=`POST`,s=t):n||r?(a=n?`HEAD`:`GET`,Object.entries(t).filter(([e,t])=>t!==void 0).map(([e,t])=>[e,Array.isArray(t)?`{${t.join(`,`)}}`:`${t}`]).forEach(([e,t])=>{o.searchParams.append(e,t)})):(a=`POST`,s=t);let u=new Headers(this.headers);return l?u.set(`Prefer`,i?`count=${i},return=minimal`:`return=minimal`):i&&u.set(`Prefer`,`count=${i}`),new Et({method:a,url:o,headers:u,schema:this.schemaName,body:s,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}},kt=class{constructor(){}static detectEnvironment(){if(typeof WebSocket<`u`)return{type:`native`,wsConstructor:WebSocket};let e=globalThis;if(typeof globalThis<`u`&&e.WebSocket!==void 0)return{type:`native`,wsConstructor:e.WebSocket};let t=typeof global<`u`?global:void 0;if(t&&t.WebSocket!==void 0)return{type:`native`,wsConstructor:t.WebSocket};if(typeof globalThis<`u`&&e.WebSocketPair!==void 0&&globalThis.WebSocket===void 0)return{type:`cloudflare`,error:`Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.`,workaround:`Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime.`};if(typeof globalThis<`u`&&e.EdgeRuntime||typeof navigator<`u`&&navigator.userAgent?.includes(`Vercel-Edge`))return{type:`unsupported`,error:`Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.`,workaround:`Use serverless functions or a different deployment target for WebSocket functionality.`};let n=globalThis.process;if(n){let e=n.versions;if(e&&e.node)return{type:`unsupported`,error:`Node.js detected but native WebSocket not found.`,workaround:`Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option.`}}return{type:`unsupported`,error:`Unknown JavaScript runtime without WebSocket support.`,workaround:`Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation.`}}static getWebSocketConstructor(){let e=this.detectEnvironment();if(e.wsConstructor)return e.wsConstructor;let t=e.error||`WebSocket not supported in this environment.`;throw e.workaround&&(t+=`\n\nSuggested solution: ${e.workaround}`),Error(t)}static isWebSocketSupported(){try{return this.detectEnvironment().type===`native`}catch{return!1}}},At=`realtime-js/2.112.4`,jt=`1.0.0`,Mt=`2.0.0`,Nt=Mt,Pt=1e4,Ft={closed:`closed`,errored:`errored`,joined:`joined`,joining:`joining`,leaving:`leaving`},It={close:`phx_close`,error:`phx_error`,join:`phx_join`,reply:`phx_reply`,leave:`phx_leave`,access_token:`access_token`},Lt={connecting:`connecting`,open:`open`,closing:`closing`,closed:`closed`},Rt=class{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT=`broadcast`,this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,t){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event==`string`)return t(this._binaryEncodeUserBroadcastPush(e));let n=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(n))}_binaryEncodeUserBroadcastPush(e){return this._isArrayBuffer(e.payload?.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){let t=e.payload?.payload??new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,t)}_encodeJsonUserBroadcastPush(e){let t=e.payload?.payload??{},n=new TextEncoder().encode(JSON.stringify(t)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,n)}_encodeUserBroadcastPush(e,t,n){let r=new TextEncoder,i=r.encode(e.topic),a=r.encode(e.ref??``),o=r.encode(e.join_ref??``),s=r.encode(e.payload.event),c=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},l=r.encode(Object.keys(c).length===0?``:JSON.stringify(c));if(o.length>255)throw Error(`joinRef length ${o.length} exceeds maximum of 255`);if(a.length>255)throw Error(`ref length ${a.length} exceeds maximum of 255`);if(i.length>255)throw Error(`topic length ${i.length} exceeds maximum of 255`);if(s.length>255)throw Error(`userEvent length ${s.length} exceeds maximum of 255`);if(l.length>255)throw Error(`metadata length ${l.length} exceeds maximum of 255`);let u=this.USER_BROADCAST_PUSH_META_LENGTH+o.length+a.length+i.length+s.length+l.length,d=new ArrayBuffer(this.HEADER_LENGTH+u),f=new DataView(d),p=new Uint8Array(d),m=0;f.setUint8(m++,this.KINDS.userBroadcastPush),f.setUint8(m++,o.length),f.setUint8(m++,a.length),f.setUint8(m++,i.length),f.setUint8(m++,s.length),f.setUint8(m++,l.length),f.setUint8(m++,t),p.set(o,m),m+=o.length,p.set(a,m),m+=a.length,p.set(i,m),m+=i.length,p.set(s,m),m+=s.length,p.set(l,m),m+=l.length;var h=new Uint8Array(d.byteLength+n.byteLength);return h.set(new Uint8Array(d),0),h.set(new Uint8Array(n),d.byteLength),h.buffer}decode(e,t){if(this._isArrayBuffer(e))return t(this._binaryDecode(e));if(typeof e==`string`){let[n,r,i,a,o]=JSON.parse(e);return t({join_ref:n,ref:r,topic:i,event:a,payload:o})}return t({})}_binaryDecode(e){let t=new DataView(e),n=t.getUint8(0),r=new TextDecoder;switch(n){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,t,r)}}_decodeUserBroadcast(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=t.getUint8(4),s=this.HEADER_LENGTH+4,c=n.decode(e.slice(s,s+r));s+=r;let l=n.decode(e.slice(s,s+i));s+=i;let u=n.decode(e.slice(s,s+a));s+=a;let d=e.slice(s,e.byteLength),f=o===this.JSON_ENCODING?JSON.parse(n.decode(d)):d,p={type:this.BROADCAST_EVENT,event:l,payload:f};return a>0&&(p.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:p}}_isArrayBuffer(e){return e instanceof ArrayBuffer||e?.constructor?.name===`ArrayBuffer`}_pick(e,t){return!e||typeof e!=`object`?{}:Object.fromEntries(Object.entries(e).filter(([e])=>t.includes(e)))}},j;(function(e){e.abstime=`abstime`,e.bool=`bool`,e.date=`date`,e.daterange=`daterange`,e.float4=`float4`,e.float8=`float8`,e.int2=`int2`,e.int4=`int4`,e.int4range=`int4range`,e.int8=`int8`,e.int8range=`int8range`,e.json=`json`,e.jsonb=`jsonb`,e.money=`money`,e.numeric=`numeric`,e.oid=`oid`,e.reltime=`reltime`,e.text=`text`,e.time=`time`,e.timestamp=`timestamp`,e.timestamptz=`timestamptz`,e.timetz=`timetz`,e.tsrange=`tsrange`,e.tstzrange=`tstzrange`})(j||={});var zt=(e,t,n={})=>{let r=n.skipTypes??[];return t?Object.keys(t).reduce((n,i)=>(n[i]=Bt(i,e,t,r),n),{}):{}},Bt=(e,t,n,r)=>{let i=t.find(t=>t.name===e)?.type,a=n[e];return i&&!r.includes(i)?Vt(i,a):Ht(a)},Vt=(e,t)=>{if(e.charAt(0)===`_`)return Kt(t,e.slice(1,e.length));switch(e){case j.bool:return Ut(t);case j.float4:case j.float8:case j.int2:case j.int4:case j.int8:case j.numeric:case j.oid:return Wt(t);case j.json:case j.jsonb:return Gt(t);case j.timestamp:return qt(t);case j.abstime:case j.date:case j.daterange:case j.int4range:case j.int8range:case j.money:case j.reltime:case j.text:case j.time:case j.timestamptz:case j.timetz:case j.tsrange:case j.tstzrange:return Ht(t);default:return Ht(t)}},Ht=e=>e,Ut=e=>{switch(e){case`t`:return!0;case`f`:return!1;default:return e}},Wt=e=>{if(typeof e==`string`){let t=parseFloat(e);if(!Number.isNaN(t))return t}return e},Gt=e=>{if(typeof e==`string`)try{return JSON.parse(e)}catch{return e}return e},Kt=(e,t)=>{if(typeof e!=`string`)return e;let n=e.length-1,r=e[n];if(e[0]===`{`&&r===`}`){let r,i=e.slice(1,n);try{r=JSON.parse(`[`+i+`]`)}catch{r=i?i.split(`,`):[]}return r.map(e=>Vt(t,e))}return e},qt=e=>typeof e==`string`?e.replace(` `,`T`):e,Jt=e=>{let t=new URL(e);return t.protocol=t.protocol.replace(/^ws/i,`http`),t.pathname=t.pathname.replace(/\/+$/,``).replace(/\/socket\/websocket$/i,``).replace(/\/socket$/i,``).replace(/\/websocket$/i,``),t.pathname===``||t.pathname===`/`?t.pathname=`/api/broadcast`:t.pathname+=`/api/broadcast`,t.href},Yt=e=>typeof e==`function`?e:function(){return e},Xt=typeof self<`u`?self:null,Zt=typeof window<`u`?window:null,Qt=Xt||Zt||globalThis,$t=`2.0.0`,en=1e4,tn=1e3,nn=100,rn={connecting:0,open:1,closing:2,closed:3},an={closed:`closed`,errored:`errored`,joined:`joined`,joining:`joining`,leaving:`leaving`},on={close:`phx_close`,error:`phx_error`,join:`phx_join`,reply:`phx_reply`,leave:`phx_leave`},sn={longpoll:`longpoll`,websocket:`websocket`},cn={complete:4},ln=`base64url.bearer.phx.`,un=class{constructor(e,t,n,r){this.channel=e,this.event=t,this.payload=n||function(){return{}},this.receivedResp=null,this.timeout=r,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(e){this.timeout=e,this.reset(),this.send()}send(){this.hasReceived(`timeout`)||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(e,t){return this.hasReceived(e)&&t(this.receivedResp.response),this.recHooks.push({status:e,callback:t}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:e,response:t,_ref:n}){this.recHooks.filter(t=>t.status===e).forEach(e=>e.callback(t))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,e=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=e,this.matchReceive(e)}),this.timeoutTimer=setTimeout(()=>{this.trigger(`timeout`,{})},this.timeout)}hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}trigger(e,t){this.channel.trigger(this.refEvent,{status:e,response:t})}},dn=class{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries+=1,this.callback()},this.timerCalc(this.tries+1))}},fn=class{constructor(e,t,n){this.state=an.closed,this.topic=e,this.params=Yt(t||{}),this.socket=n,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new un(this,on.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new dn(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive(`ok`,()=>{this.state=an.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(e=>e.send()),this.pushBuffer=[]}),this.joinPush.receive(`error`,e=>{this.state=an.errored,this.socket.hasLogger()&&this.socket.log(`channel`,`error ${this.topic}`,e),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log(`channel`,`close ${this.topic}`),this.state=an.closed,this.socket.remove(this)}),this.onError(e=>{this.socket.hasLogger()&&this.socket.log(`channel`,`error ${this.topic}`,e),this.isJoining()&&this.joinPush.reset(),this.state=an.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive(`timeout`,()=>{this.socket.hasLogger()&&this.socket.log(`channel`,`timeout ${this.topic}`,this.joinPush.timeout),new un(this,on.leave,Yt({}),this.timeout).send(),this.state=an.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(on.reply,(e,t)=>{this.trigger(this.replyEventName(t),e)})}join(e=this.timeout){if(this.joinedOnce)throw Error(`tried to join multiple times. 'join' can only be called a single time per channel instance`);return this.timeout=e,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=an.closed,this.bindings=[]}onClose(e){this.on(on.close,e)}onError(e){return this.on(on.error,t=>e(t))}on(e,t){let n=this.bindingRef++;return this.bindings.push({event:e,ref:n,callback:t}),n}off(e,t){this.bindings=this.bindings.filter(n=>n.event!==e||t!==void 0&&t!==n.ref)}canPush(){return this.socket.isConnected()&&this.isJoined()}push(e,t,n=this.timeout){if(t||={},!this.joinedOnce)throw Error(`tried to push '${e}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let r=new un(this,e,function(){return t},n);return this.canPush()?r.send():(r.startTimeout(),this.pushBuffer.push(r)),r}leave(e=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=an.leaving;let t=()=>{this.socket.hasLogger()&&this.socket.log(`channel`,`leave ${this.topic}`),this.trigger(on.close,`leave`)},n=new un(this,on.leave,Yt({}),e);return n.receive(`ok`,()=>t()).receive(`timeout`,()=>t()),n.send(),this.canPush()||n.trigger(`ok`,{}),n}onMessage(e,t,n){return t}filterBindings(e,t,n){return!0}isMember(e,t,n,r){return this.topic===e?r&&r!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log(`channel`,`dropping outdated message`,{topic:e,event:t,payload:n,joinRef:r}),!1):!0:!1}joinRef(){return this.joinPush.ref}rejoin(e=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=an.joining,this.joinPush.resend(e))}trigger(e,t,n,r){let i=this.onMessage(e,t,n,r);if(t&&!i)throw Error(`channel onMessage callbacks must return the payload, modified or unmodified`);let a=this.bindings.filter(r=>r.event===e&&this.filterBindings(r,t,n));for(let e=0;e<a.length;e++)a[e].callback(i,n,r||this.joinRef())}replyEventName(e){return`chan_reply_${e}`}isClosed(){return this.state===an.closed}isErrored(){return this.state===an.errored}isJoined(){return this.state===an.joined}isJoining(){return this.state===an.joining}isLeaving(){return this.state===an.leaving}},pn=class{static request(e,t,n,r,i,a,o){if(Qt.XDomainRequest){let n=new Qt.XDomainRequest;return this.xdomainRequest(n,e,t,r,i,a,o)}if(Qt.XMLHttpRequest){let s=new Qt.XMLHttpRequest;return this.xhrRequest(s,e,t,n,r,i,a,o)}if(Qt.fetch&&Qt.AbortController)return this.fetchRequest(e,t,n,r,i,a,o);throw Error(`No suitable XMLHttpRequest implementation found`)}static fetchRequest(e,t,n,r,i,a,o){let s={method:e,headers:n,body:r},c=null;return i&&(c=new AbortController,setTimeout(()=>c.abort(),i),s.signal=c.signal),Qt.fetch(t,s).then(e=>e.text()).then(e=>this.parseJSON(e)).then(e=>o&&o(e)).catch(e=>{e.name===`AbortError`&&a?a():o&&o(null)}),c}static xdomainRequest(e,t,n,r,i,a,o){return e.timeout=i,e.open(t,n),e.onload=()=>{let t=this.parseJSON(e.responseText);o&&o(t)},a&&(e.ontimeout=a),e.onprogress=()=>{},e.send(r),e}static xhrRequest(e,t,n,r,i,a,o,s){e.open(t,n,!0),e.timeout=a;for(let[t,n]of Object.entries(r))e.setRequestHeader(t,n);return e.onerror=()=>s&&s(null),e.onreadystatechange=()=>{e.readyState===cn.complete&&s&&s(this.parseJSON(e.responseText))},o&&(e.ontimeout=o),e.send(i),e}static parseJSON(e){if(!e||e===``)return null;try{return JSON.parse(e)}catch{return console&&console.log(`failed to parse JSON response`,e),null}}static serialize(e,t){let n=[];for(var r in e){if(!Object.prototype.hasOwnProperty.call(e,r))continue;let i=t?`${t}[${r}]`:r,a=e[r];typeof a==`object`?n.push(this.serialize(a,i)):n.push(encodeURIComponent(i)+`=`+encodeURIComponent(a))}return n.join(`&`)}static appendParams(e,t){return Object.keys(t).length===0?e:`${e}${e.match(/\?/)?`&`:`?`}${this.serialize(t)}`}},mn=e=>{let t=``,n=new Uint8Array(e),r=n.byteLength;for(let e=0;e<r;e++)t+=String.fromCharCode(n[e]);return btoa(t)},hn=class{constructor(e,t){t&&t.length===2&&t[1].startsWith(ln)&&(this.authToken=atob(t[1].slice(ln.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(e),this.readyState=rn.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(e){return e.replace(`ws://`,`http://`).replace(`wss://`,`https://`).replace(RegExp(`(.*)/`+sn.websocket),`$1/`+sn.longpoll)}endpointURL(){return pn.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(e,t,n){this.close(e,t,n),this.readyState=rn.connecting}ontimeout(){this.onerror(`timeout`),this.closeAndRetry(1005,`timeout`,!1)}isActive(){return this.readyState===rn.open||this.readyState===rn.connecting}poll(){let e={Accept:`application/json`};this.authToken&&(e[`X-Phoenix-AuthToken`]=this.authToken),this.ajax(`GET`,e,null,()=>this.ontimeout(),e=>{if(e){var{status:t,token:n,messages:r}=e;if(t===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,`session_gone`,!1);return}this.token=n}else t=0;switch(t){case 200:r.forEach(e=>{setTimeout(()=>this.onmessage({data:e}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=rn.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,`forbidden`,!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,`internal server error`,500);break;default:throw Error(`unhandled poll status ${t}`)}})}send(e){typeof e!=`string`&&(e=mn(e)),this.currentBatch?this.currentBatch.push(e):this.awaitingBatchAck?this.batchBuffer.push(e):(this.currentBatch=[e],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(e,t=0){this.awaitingBatchAck=!0;let n=t+nn,r=e.slice(t,n);this.ajax(`POST`,{"Content-Type":`application/x-ndjson`},r.join(`
`),()=>this.onerror(`timeout`),t=>{!t||t.status!==200?(this.awaitingBatchAck=!1,this.onerror(t&&t.status),this.closeAndRetry(1011,`internal server error`,!1)):n<e.length?this.batchSend(e,n):this.batchBuffer.length>0?(this.batchSend(this.batchBuffer),this.batchBuffer=[]):this.awaitingBatchAck=!1})}close(e,t,n){for(let e of this.reqs)e.abort();this.readyState=rn.closed;let r=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:e,reason:t,wasClean:n});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<`u`?this.onclose(new CloseEvent(`close`,r)):this.onclose(r)}ajax(e,t,n,r,i){let a;a=pn.request(e,this.endpointURL(),t,n,this.timeout,()=>{this.reqs.delete(a),r()},e=>{this.reqs.delete(a),this.isActive()&&i(e)}),this.reqs.add(a)}},gn=class e{constructor(t,n={}){let r=n.events||{state:`presence_state`,diff:`presence_diff`};this.state=Object.create(null),this.pendingDiffs=[],this.channel=t,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(r.state,t=>{let{onJoin:n,onLeave:r,onSync:i}=this.caller;this.joinRef=this.channel.joinRef(),this.state=e.syncState(this.state,t,n,r),this.pendingDiffs.forEach(t=>{this.state=e.syncDiff(this.state,t,n,r)}),this.pendingDiffs=[],i()}),this.channel.on(r.diff,t=>{let{onJoin:n,onLeave:r,onSync:i}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(t):(this.state=e.syncDiff(this.state,t,n,r),i())})}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(t){return e.list(this.state,t)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,t,n,r){let i=this.toNullProtoObj(this.clone(e));t=this.toNullProtoObj(t);let a=Object.create(null),o=Object.create(null);return this.map(i,(e,n)=>{t[e]||(o[e]=n)}),this.map(t,(e,t)=>{let n=i[e];if(n){let r=t.metas.map(e=>e.phx_ref),i=n.metas.map(e=>e.phx_ref),s=t.metas.filter(e=>i.indexOf(e.phx_ref)<0),c=n.metas.filter(e=>r.indexOf(e.phx_ref)<0);s.length>0&&(a[e]=t,a[e].metas=s),c.length>0&&(o[e]=this.clone(n),o[e].metas=c)}else a[e]=t}),this.syncDiff(i,{joins:a,leaves:o},n,r)}static syncDiff(e,t,n,r){e=this.toNullProtoObj(e);let{joins:i,leaves:a}=this.clone(t);return n||=function(){},r||=function(){},this.map(i,(t,r)=>{let i=e[t];if(e[t]=this.clone(r),i){let n=e[t].metas.map(e=>e.phx_ref),r=i.metas.filter(e=>n.indexOf(e.phx_ref)<0);e[t].metas.unshift(...r)}n(t,i,r)}),this.map(a,(t,n)=>{let i=e[t];if(!i)return;let a=n.metas.map(e=>e.phx_ref);i.metas=i.metas.filter(e=>a.indexOf(e.phx_ref)<0),r(t,i,n),i.metas.length===0&&delete e[t]}),e}static list(e,t){return t||=function(e,t){return t},this.map(e,(e,n)=>t(e,n))}static map(e,t){return Object.getOwnPropertyNames(e).map(n=>t(n,e[n]))}static toNullProtoObj(e){if(Object.getPrototypeOf(e)===null)return e;let t=Object.create(null);return Object.getOwnPropertyNames(e).forEach(n=>{t[n]=e[n]}),t}static clone(e){return JSON.parse(JSON.stringify(e))}},_n={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(e,t){if(e.payload.constructor===ArrayBuffer)return t(this.binaryEncode(e));{let n=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(n))}},decode(e,t){if(e.constructor===ArrayBuffer)return t(this.binaryDecode(e));{let[n,r,i,a,o]=JSON.parse(e);return t({join_ref:n,ref:r,topic:i,event:a,payload:o})}},binaryEncode(e){let{join_ref:t,ref:n,event:r,topic:i,payload:a}=e,o=new TextEncoder,s=o.encode(t),c=o.encode(n),l=o.encode(i),u=o.encode(r);this.assertFieldSize(s.byteLength,`join_ref`),this.assertFieldSize(c.byteLength,`ref`),this.assertFieldSize(l.byteLength,`topic`),this.assertFieldSize(u.byteLength,`event`);let d=this.META_LENGTH+s.byteLength+c.byteLength+l.byteLength+u.byteLength,f=new ArrayBuffer(this.HEADER_LENGTH+d),p=new Uint8Array(f),m=new DataView(f),h=0;m.setUint8(h++,this.KINDS.push),m.setUint8(h++,s.byteLength),m.setUint8(h++,c.byteLength),m.setUint8(h++,l.byteLength),m.setUint8(h++,u.byteLength),p.set(s,h),h+=s.byteLength,p.set(c,h),h+=c.byteLength,p.set(l,h),h+=l.byteLength,p.set(u,h),h+=u.byteLength;var g=new Uint8Array(f.byteLength+a.byteLength);return g.set(p,0),g.set(new Uint8Array(a),f.byteLength),g.buffer},assertFieldSize(e,t){if(e>255)throw Error(`unable to convert ${t} to binary: must be less than or equal to 255 bytes, but is ${e} bytes`)},binaryDecode(e){let t=new DataView(e),n=t.getUint8(0),r=new TextDecoder;switch(n){case this.KINDS.push:return this.decodePush(e,t,r);case this.KINDS.reply:return this.decodeReply(e,t,r);case this.KINDS.broadcast:return this.decodeBroadcast(e,t,r)}},decodePush(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=this.HEADER_LENGTH+this.META_LENGTH-1,s=n.decode(e.slice(o,o+r));o+=r;let c=n.decode(e.slice(o,o+i));o+=i;let l=n.decode(e.slice(o,o+a));return o+=a,{join_ref:s,ref:null,topic:c,event:l,payload:e.slice(o,e.byteLength)}},decodeReply(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),o=t.getUint8(4),s=this.HEADER_LENGTH+this.META_LENGTH,c=n.decode(e.slice(s,s+r));s+=r;let l=n.decode(e.slice(s,s+i));s+=i;let u=n.decode(e.slice(s,s+a));s+=a;let d=n.decode(e.slice(s,s+o));s+=o;let f={status:d,response:e.slice(s,e.byteLength)};return{join_ref:c,ref:l,topic:u,event:on.reply,payload:f}},decodeBroadcast(e,t,n){let r=t.getUint8(1),i=t.getUint8(2),a=this.HEADER_LENGTH+2,o=n.decode(e.slice(a,a+r));a+=r;let s=n.decode(e.slice(a,a+i));return a+=i,{join_ref:null,ref:null,topic:o,event:s,payload:e.slice(a,e.byteLength)}}},vn=class{constructor(e,t={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=t.timeout||en,this.transport=t.transport||Qt.WebSocket||hn,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=t.longPollFallbackMs,this.fallbackTimer=null;let n=null;try{n=Qt&&Qt.sessionStorage}catch{}this.sessionStore=t.sessionStorage||n,this.establishedConnections=0,this.defaultEncoder=_n.encode.bind(_n),this.defaultDecoder=_n.decode.bind(_n),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=t.binaryType||`arraybuffer`,this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport===hn?(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder):(this.encode=t.encode||this.defaultEncoder,this.decode=t.decode||this.defaultDecoder);let r=null;Zt&&Zt.addEventListener&&(Zt.addEventListener(`pagehide`,e=>{this.conn&&(this.disconnect(),r=this.connectClock)}),Zt.addEventListener(`pageshow`,e=>{r===this.connectClock&&(r=null,this.connect())}),Zt.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=t.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=t.autoSendHeartbeat??!0,this.heartbeatCallback=t.heartbeatCallback??(()=>{}),this.rejoinAfterMs=e=>t.rejoinAfterMs?t.rejoinAfterMs(e):[1e3,2e3,5e3][e-1]||1e4,this.reconnectAfterMs=e=>t.reconnectAfterMs?t.reconnectAfterMs(e):[10,50,100,150,200,250,500,1e3,2e3][e-1]||5e3,this.logger=t.logger||null,!this.logger&&t.debug&&(this.logger=(e,t,n)=>{console.log(`${e}: ${t}`,n)}),this.longpollerTimeout=t.longpollerTimeout||2e4,this.params=Yt(t.params||{}),this.endPoint=`${e}/${sn.websocket}`,this.vsn=t.vsn||$t,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new dn(()=>{if(this.pageHidden){this.log(`Not reconnecting as page is hidden!`),this.teardown();return}this.teardown(async()=>{t.beforeReconnect&&await t.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=t.authToken&&Yt(t.authToken)}getLongPollTransport(){return hn}replaceTransport(e){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&=(this.conn.close(),null),this.transport=e}protocol(){return location.protocol.match(/^https/)?`wss`:`ws`}endPointURL(){let e=pn.appendParams(pn.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return e.charAt(0)===`/`?e.charAt(1)===`/`?`${this.protocol()}:${e}`:`${this.protocol()}://${location.host}${e}`:e}disconnect(e,t,n){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,e&&e()},t,n)}connect(e){e&&(console&&console.log(`passing params to connect is deprecated. Instead pass :params to the Socket constructor`),this.params=Yt(e)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==hn?this.connectWithFallback(hn,this.longPollFallbackMs):this.transportConnect())}log(e,t,n){this.logger&&this.logger(e,t,n)}hasLogger(){return this.logger!==null}onOpen(e){let t=this.makeRef();return this.stateChangeCallbacks.open.push([t,e]),t}onClose(e){let t=this.makeRef();return this.stateChangeCallbacks.close.push([t,e]),t}onError(e){let t=this.makeRef();return this.stateChangeCallbacks.error.push([t,e]),t}onMessage(e){let t=this.makeRef();return this.stateChangeCallbacks.message.push([t,e]),t}onHeartbeat(e){this.heartbeatCallback=e}ping(e){if(!this.isConnected())return!1;let t=this.makeRef(),n=Date.now();this.push({topic:`phoenix`,event:`heartbeat`,payload:{},ref:t});let r=this.onMessage(i=>{i.ref===t&&(this.off([r]),e(Date.now()-n))});return!0}transportName(e){switch(e){case hn:return`LongPoll`;default:return e.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let e;this.authToken&&(e=[`phoenix`,`${ln}${btoa(this.authToken()).replace(/=/g,``)}`]),this.conn=new this.transport(this.endPointURL(),e),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(e){return this.sessionStore&&this.sessionStore.getItem(e)}storeSession(e,t){this.sessionStore&&this.sessionStore.setItem(e,t)}connectWithFallback(e,t=2500){clearTimeout(this.fallbackTimer);let n=!1,r=!0,i,a,o=this.transportName(e),s=t=>{this.log(`transport`,`falling back to ${o}...`,t),this.off([i,a]),r=!1,this.replaceTransport(e),this.transportConnect()};if(this.getSession(`phx:fallback:${o}`))return s(`memorized`);this.fallbackTimer=setTimeout(s,t),a=this.onError(e=>{this.log(`transport`,`error`,e),r&&!n&&(clearTimeout(this.fallbackTimer),s(e))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(n=!0,!r){let t=this.transportName(e);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${t}`,`true`),this.log(`transport`,`established ${t} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(s,t),this.ping(e=>{this.log(`transport`,`connected to primary after`,e),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log(`transport`,`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks(`open`)}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log(`transport`,`heartbeat timeout. Attempting to re-establish connection`);try{this.heartbeatCallback(`timeout`)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}this.triggerChanError(Error(`heartbeat timeout`)),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),tn,`heartbeat timeout`)}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(e,t,n){if(!this.conn)return e&&e();let r=this.conn;this.waitForBufferDone(r,()=>{t?r.close(t,n||``):r.close(),this.waitForSocketClosed(r,()=>{this.conn===r&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),e&&e()})})}waitForBufferDone(e,t,n=1){if(n===5||!e.bufferedAmount){t();return}setTimeout(()=>{this.waitForBufferDone(e,t,n+1)},150*n)}waitForSocketClosed(e,t,n=1){if(n===5||e.readyState===rn.closed){t();return}setTimeout(()=>{this.waitForSocketClosed(e,t,n+1)},150*n)}onConnClose(e){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log(`transport`,`close`,e),this.triggerChanError(e),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks(`close`,e)}onConnError(e){this.hasLogger()&&this.log(`transport`,`error`,e);let t=this.transport,n=this.establishedConnections;this.triggerStateCallbacks(`error`,e,t,n),(t===this.transport||n>0)&&this.triggerChanError(e)}triggerChanError(e){this.channels.forEach(t=>{t.isErrored()||t.isLeaving()||t.isClosed()||t.trigger(on.error,e)})}connectionState(){switch(this.conn&&this.conn.readyState){case rn.connecting:return`connecting`;case rn.open:return`open`;case rn.closing:return`closing`;default:return`closed`}}isConnected(){return this.connectionState()===`open`}remove(e){this.off(e.stateChangeRefs),this.channels=this.channels.filter(t=>t!==e)}off(e){for(let t in this.stateChangeCallbacks)this.stateChangeCallbacks[t]=this.stateChangeCallbacks[t].filter(([t])=>e.indexOf(t)===-1)}channel(e,t={}){let n=new fn(e,t,this);return this.channels.push(n),n}push(e){if(this.hasLogger()){let{topic:t,event:n,payload:r,ref:i,join_ref:a}=e;this.log(`push`,`${t} ${n} (${a}, ${i})`,r)}this.isConnected()?this.encode(e,e=>this.conn.send(e)):this.sendBuffer.push(()=>this.encode(e,e=>this.conn.send(e)))}makeRef(){let e=this.ref+1;return this.ref=e===this.ref?0:e,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback(`disconnected`)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:`phoenix`,event:`heartbeat`,payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback(`sent`)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}onConnMessage(e){this.decode(e.data,e=>{let{topic:t,event:n,payload:r,ref:i,join_ref:a}=e;if(i&&i===this.pendingHeartbeatRef){let e=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(r.status===`ok`?`ok`:`error`,e)}catch(e){this.log(`error`,`error in heartbeat callback`,e)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log(`receive`,`${r.status||``} ${t} ${n} ${i&&`(`+i+`)`||``}`.trim(),r);for(let e=0;e<this.channels.length;e++){let o=this.channels[e];o.isMember(t,n,r,a)&&o.trigger(n,r,i,a)}this.triggerStateCallbacks(`message`,e)})}triggerStateCallbacks(e,...t){try{this.stateChangeCallbacks[e].forEach(([n,r])=>{try{r(...t)}catch(t){this.log(`error`,`error in ${e} callback`,t)}})}catch(t){this.log(`error`,`error triggering ${e} callbacks`,t)}}leaveOpenTopic(e){let t=this.channels.find(t=>t.topic===e&&(t.isJoined()||t.isJoining()));t&&(this.hasLogger()&&this.log(`transport`,`leaving duplicate topic "${e}"`),t.leave())}},yn=class e{constructor(t,n){let r=Sn(n);this.presence=new gn(t.getChannel(),r),this.presence.onJoin((n,r,i)=>{let a=e.onJoinPayload(n,r,i);t.getChannel().trigger(`presence`,a)}),this.presence.onLeave((n,r,i)=>{let a=e.onLeavePayload(n,r,i);t.getChannel().trigger(`presence`,a)}),this.presence.onSync(()=>{t.getChannel().trigger(`presence`,{event:`sync`})})}get state(){return e.transformState(this.presence.state)}static transformState(e){return e=xn(e),Object.getOwnPropertyNames(e).reduce((t,n)=>{let r=e[n];return t[n]=bn(r),t},{})}static onJoinPayload(e,t,n){return{event:`join`,key:e,currentPresences:Cn(t),newPresences:bn(n)}}static onLeavePayload(e,t,n){return{event:`leave`,key:e,currentPresences:Cn(t),leftPresences:bn(n)}}};function bn(e){return e.metas.map(e=>{let t=Object.getOwnPropertyDescriptors(e),n=Object.defineProperties({},t);return n.presence_ref=n.phx_ref,delete n.phx_ref,delete n.phx_ref_prev,n})}function xn(e){return JSON.parse(JSON.stringify(e))}function Sn(e){return e?.events&&{events:e.events}}function Cn(e){return e?.metas?bn(e):[]}var wn;(function(e){e.SYNC=`sync`,e.JOIN=`join`,e.LEAVE=`leave`})(wn||={});var Tn=class{get state(){return this.presenceAdapter.state}constructor(e,t){this.channel=e,this.presenceAdapter=new yn(this.channel.channelAdapter,t)}};function En(e){if(e instanceof Error)return e;if(typeof e==`string`)return Error(e);if(e&&typeof e==`object`){let t=e;if(typeof t.code==`number`){let n=typeof t.reason==`string`&&t.reason?` (${t.reason})`:``;return Error(`socket closed: ${t.code}${n}`,{cause:e})}return Error(`channel error: transport failure`,{cause:e})}return Error(`channel error: connection lost`)}var Dn=class{constructor(e,t,n){let r=On(n);this.channel=e.getSocket().channel(t,r),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,t){return this.channel.on(e,t)}off(e,t){this.channel.off(e,t)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,t,n){let r;try{r=this.channel.push(e,t,n)}catch{throw Error(`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>100){let e=this.channel.pushBuffer.shift();e.cancelTimeout(),this.socket.log(`channel`,`discarded push due to buffer overflow: ${e.event}`,e.payload())}return r}updateJoinPayload(e){let t=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},t),e)}canPush(){return this.socket.isConnected()&&this.state===Ft.joined}isJoined(){return this.state===Ft.joined}isJoining(){return this.state===Ft.joining}isClosed(){return this.state===Ft.closed}isLeaving(){return this.state===Ft.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}};function On(e){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:``,enabled:!1},private:!1},e.config)}}var kn=/[,()"\\]/,An=e=>kn.test(e)||e!==e.trim(),jn=e=>`"${e.replace(/\\/g,`\\\\`).replace(/"/g,`\\"`)}"`,Mn=e=>{let t=e===null?`null`:String(e);return An(t)?jn(t):t},Nn=e=>e===null?`null`:String(e),Pn=(e,t)=>{if(e===`in`){let e=Array.isArray(t)?t:[t];if(e.length===0)throw Error("Realtime `in` filter requires at least one value.");return`in.(${Array.from(new Set(e)).map(e=>Mn(e)).join(`,`)})`}return e===`is`?`is.${Nn(t)}`:`${e}.${Mn(t)}`},Fn=class{constructor(){this.filters=[]}add(e,t,n,r=!1){let i=r?`not.`:``;return this.filters.push(`${e}=${i}${Pn(t,n)}`),this}eq(e,t){return this.add(e,`eq`,t)}neq(e,t){return this.add(e,`neq`,t)}gt(e,t){return this.add(e,`gt`,t)}gte(e,t){return this.add(e,`gte`,t)}lt(e,t){return this.add(e,`lt`,t)}lte(e,t){return this.add(e,`lte`,t)}in(e,t){return this.add(e,`in`,t)}like(e,t){return this.add(e,`like`,t)}ilike(e,t){return this.add(e,`ilike`,t)}match(e,t){return this.add(e,`match`,t)}imatch(e,t){return this.add(e,`imatch`,t)}is(e,t){return this.add(e,`is`,t)}isDistinct(e,t){return this.add(e,`isdistinct`,t)}not(e,t,n){return this.add(e,t,n,!0)}build(){return this.filters.join(`,`)}toString(){return this.build()}},In;(function(e){e.ALL=`*`,e.INSERT=`INSERT`,e.UPDATE=`UPDATE`,e.DELETE=`DELETE`})(In||={});var Ln;(function(e){e.BROADCAST=`broadcast`,e.PRESENCE=`presence`,e.POSTGRES_CHANGES=`postgres_changes`,e.SYSTEM=`system`})(Ln||={});var Rn;(function(e){e.SUBSCRIBED=`SUBSCRIBED`,e.TIMED_OUT=`TIMED_OUT`,e.CLOSED=`CLOSED`,e.CHANNEL_ERROR=`CHANNEL_ERROR`})(Rn||={});var zn=class e{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,t={config:{}},n){if(this.topic=e,this.params=t,this.socket=n,this.bindings={},this.subTopic=e.replace(/^realtime:/i,``),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:``,enabled:!1},private:!1},t.config),this.channelAdapter=new Dn(this.socket.socketAdapter,e,this.params),this.presence=new Tn(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=Jt(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&this.params.config?.broadcast?.replay)throw Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(e,t=this.timeout){if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){let{config:{broadcast:n,presence:r,private:i}}=this.params,a=this.bindings.postgres_changes?.map(e=>e.filter)??[],o=!!this.bindings[Ln.PRESENCE]&&this.bindings[Ln.PRESENCE].length>0||this.params.config.presence?.enabled===!0,s={},c={broadcast:n,presence:Object.assign(Object.assign({},r),{enabled:o}),postgres_changes:a,private:i};this.socket.accessTokenValue&&(s.access_token=this.socket.accessTokenValue),this._onError(t=>{e?.(Rn.CHANNEL_ERROR,En(t))}),this._onClose(()=>e?.(Rn.CLOSED)),this.updateJoinPayload(Object.assign({config:c},s)),this._updateFilterMessage(),this.channelAdapter.subscribe(t).receive(`ok`,async({postgres_changes:t})=>{if(this.socket._isManualToken()||this.socket.setAuth(),t===void 0){e?.(Rn.SUBSCRIBED);return}this._updatePostgresBindings(t,e)}).receive(`error`,t=>{this.state=Ft.errored;let n=Object.values(t).join(`, `)||`error`;e?.(Rn.CHANNEL_ERROR,Error(n,{cause:t}))}).receive(`timeout`,()=>{e?.(Rn.TIMED_OUT)})}return this}_updatePostgresBindings(t,n){let r=this.bindings.postgres_changes,i=r?.length??0,a=[];for(let o=0;o<i;o++){let i=r[o],{filter:{event:s,schema:c,table:l,filter:u}}=i,d=t&&t[o];if(d&&d.event===s&&e.isFilterValueEqual(d.schema,c)&&e.isFilterValueEqual(d.table,l)&&e.isFilterValueEqual(d.filter,u))a.push(Object.assign(Object.assign({},i),{id:d.id}));else{this.unsubscribe(),this.state=Ft.errored,n?.(Rn.CHANNEL_ERROR,Error(`mismatch between server and client bindings for postgres changes`));return}}this.bindings.postgres_changes=a,this.state!=Ft.errored&&n&&n(Rn.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:`presence`,event:`track`,payload:e},t)}async untrack(e={}){return await this.send({type:`presence`,event:`untrack`},e)}on(e,t,n){let r=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),i=e===Ln.PRESENCE||e===Ln.POSTGRES_CHANGES;if(r&&i)throw this.socket.log(`channel`,`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,t,n)}async httpSend(e,t,n={}){if(t==null)return Promise.reject(Error(`Payload is required for httpSend()`));let r=t instanceof ArrayBuffer||ArrayBuffer.isView(t),i={apikey:this.socket.apiKey?this.socket.apiKey:``,"Content-Type":r?`application/octet-stream`:`application/json`};this.socket.accessTokenValue&&(i.Authorization=`Bearer ${this.socket.accessTokenValue}`);let a=new URL(this.broadcastEndpointURL);a.pathname+=`/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e)}`,this.private&&a.searchParams.set(`private`,`true`);let o={method:`POST`,headers:i,body:r?t:JSON.stringify(t)},s=await this._fetchWithTimeout(a.toString(),o,n.timeout??this.timeout);if(s.status===202)return{success:!0};if(s.status===404)return Promise.reject(Error(`httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md`));let c=s.statusText;try{let e=await s.json();c=e.error||e.message||c}catch{}return Promise.reject(Error(c))}async send(e,t={}){if(!this.channelAdapter.canPush()&&e.type===`broadcast`){let n=`Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.`;this.socket.hasLogger()?this.socket.log(`channel`,n):console.warn(n);let{event:r,payload:i}=e,a={apikey:this.socket.apiKey?this.socket.apiKey:``,"Content-Type":`application/json`};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);let o={method:`POST`,headers:a,body:JSON.stringify({messages:[{topic:this.subTopic,event:r,payload:i,private:this.private}]})};try{let e=await this._fetchWithTimeout(this.broadcastEndpointURL,o,t.timeout??this.timeout);return await e.body?.cancel(),e.ok?`ok`:`error`}catch(e){return e instanceof Error&&e.name===`AbortError`?`timed out`:`error`}}return new Promise(n=>{let r=this.channelAdapter.push(e.type,e,t.timeout||this.timeout);e.type===`broadcast`&&!this.params?.config?.broadcast?.ack&&n(`ok`),r.receive(`ok`,()=>n(`ok`)),r.receive(`error`,()=>n(`error`)),r.receive(`timeout`,()=>n(`timed out`))})}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise(t=>{this.channelAdapter.unsubscribe(e).receive(`ok`,()=>t(`ok`)).receive(`timeout`,()=>t(`timed out`)).receive(`error`,()=>t(`error`))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,t,n){let r=new AbortController,i=setTimeout(()=>r.abort(),n),a=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:r.signal}));return clearTimeout(i),a}_on(t,n,r){let i=t.toLocaleLowerCase(),a=n?.filter;if((a instanceof Fn||typeof a==`object`&&a&&typeof a.build==`function`)&&(n=Object.assign(Object.assign({},n),{filter:a.build()})),i===Ln.POSTGRES_CHANGES&&this.bindings[i]?.find(t=>e.isSamePostgresFilter(t.filter,n)))return this.socket.log(`error`,`duplicate \`postgres_changes\` binding for ${this.topic} ignored`,n),this;let o=this.channelAdapter.on(t,r),s={type:i,filter:n,callback:r,ref:o};return this.bindings[i]?this.bindings[i].push(s):this.bindings[i]=[s],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((e,t,n)=>{let r=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(r,n))return!1;let i=this.bindings[r]?.find(t=>t.ref===e.ref);if(!i)return!0;if([`broadcast`,`presence`,`postgres_changes`].includes(r)){if(`id`in i){let e=i.id,n=i.filter?.event;return e&&t.ids?.includes(e)&&(n===`*`||n?.toLocaleLowerCase()===t.data?.type.toLocaleLowerCase())}{let e=(i?.filter?.event)?.toLocaleLowerCase();return e===`*`||e===(t?.event)?.toLocaleLowerCase()}}return i.type.toLocaleLowerCase()===r})}_notThisChannelEvent(e,t){let{close:n,error:r,leave:i,join:a}=It;return t&&[n,r,i,a].includes(e)&&t!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((e,t,n)=>{if(typeof t==`object`&&`ids`in t){let e=t.data,{schema:n,table:r,commit_timestamp:i,type:a,errors:o}=e;return Object.assign(Object.assign({},{schema:n,table:r,commit_timestamp:i,eventType:a,new:{},old:{},errors:o}),this._getPayloadRecords(e))}return t})}copyBindings(e){if(this.joinedOnce)throw Error(`cannot copy bindings into joined channel`);for(let t in e.bindings)for(let n of e.bindings[t])this._on(n.type,n.filter,n.callback)}static isFilterValueEqual(e,t){return(e??void 0)===(t??void 0)}static isSamePostgresFilter(t,n){let r=(t?.select)?.join()??void 0,i=(n?.select)?.join()??void 0;return t?.event===n?.event&&e.isFilterValueEqual(t?.schema,n?.schema)&&e.isFilterValueEqual(t?.table,n?.table)&&e.isFilterValueEqual(t?.filter,n?.filter)&&r===i}_getPayloadRecords(e){let t={new:{},old:{}};return(e.type===`INSERT`||e.type===`UPDATE`)&&(t.new=zt(e.columns,e.record)),(e.type===`UPDATE`||e.type===`DELETE`)&&(t.old=zt(e.columns,e.old_record)),t}},Bn=class{constructor(e,t){this.socket=new vn(e,t)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,t,n,r=1e4){return new Promise(i=>{setTimeout(()=>i(`timeout`),r),this.socket.disconnect(()=>{e(),i(`ok`)},t,n)})}push(e){this.socket.push(e)}log(e,t,n){this.socket.log(e,t,n)}hasLogger(){return this.socket.hasLogger()}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==Lt.connecting}isDisconnecting(){return this.socket.connectionState()==Lt.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}},Vn={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},Hn=[1e3,2e3,5e3,1e4],Un=1e4;function Wn(){let e=new Map;return{get length(){return e.size},clear(){e.clear()},getItem(t){return e.has(t)?e.get(t):null},key(t){return Array.from(e.keys())[t]??null},removeItem(t){e.delete(t)},setItem(t,n){e.set(t,String(n))}}}function Gn(){try{if(typeof globalThis<`u`&&globalThis.sessionStorage)return globalThis.sessionStorage}catch{}return Wn()}var Kn=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`,qn=class{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,t){if(this.channels=[],this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint=``,this.headers={},this.params={},this.ref=0,this.serializer=new Rt,this._manuallySetToken=!1,this._authPromise=null,this._authGeneration=0,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._pendingDisconnectTimer=null,this._disconnectOnEmptyChannelsAfterMs=0,this._resolveFetch=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),!t?.params?.apikey)throw Error(`API key is required to connect to Realtime`);this.apiKey=t.params.apikey;let n=this._initializeOptions(t);this.socketAdapter=new Bn(e,n),this.httpEndpoint=Jt(e),this.fetch=this._resolveFetch(t?.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely(`connect`),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){let t=e.message;throw Error(`WebSocket not available: ${t}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,t){return this._cancelPendingDisconnect(),this.isDisconnecting()?`ok`:await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},e,t)}getChannels(){return this.channels}async removeChannel(e){let t=await e.unsubscribe();return t===`ok`&&e.teardown(),t}async removeAllChannels(){let e=this.channels.map(async e=>{let t=await e.unsubscribe();return e.teardown(),t}),t=await Promise.all(e);return await this.disconnect(),t}log(e,t,n){this.socketAdapter.log(e,t,n)}hasLogger(){return this.socketAdapter.hasLogger()}connectionState(){return this.socketAdapter.connectionState()||Lt.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,t={config:{}}){let n=`realtime:${e}`,r=this.getChannels().find(e=>e.topic===n);if(r)return r;{let n=new zn(`realtime:${e}`,t,this);return this._cancelPendingDisconnect(),this.channels.push(n),n}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){let t=++this._authGeneration,n=this._performAuth(e,t);t===this._authGeneration&&(this._authPromise=n);try{await n}finally{this._authPromise===n&&(this._authPromise=null)}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic),this.channels.length===0&&(this.log(`transport`,`no channels remaining, scheduling disconnect`),this._schedulePendingDisconnect())}_schedulePendingDisconnect(){if(this._cancelPendingDisconnect(),this._disconnectOnEmptyChannelsAfterMs===0){this.log(`transport`,`disconnecting immediately - no channels`),this.disconnect();return}this._pendingDisconnectTimer=setTimeout(()=>{this._pendingDisconnectTimer=null,this.channels.length===0&&(this.log(`transport`,`deferred disconnect fired - no channels, disconnecting`),this.disconnect())},this._disconnectOnEmptyChannelsAfterMs),this.log(`transport`,`deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`)}_cancelPendingDisconnect(){this._pendingDisconnectTimer!==null&&(this.log(`transport`,`pending disconnect cancelled - channel activity detected`),clearTimeout(this._pendingDisconnectTimer),this._pendingDisconnectTimer=null)}async _performAuth(e,t){let n,r=!1;if(e)n=e,r=!0;else if(this.accessToken)try{n=await this.accessToken()}catch(e){this.log(`error`,`Error fetching access token from callback`,e),n=this.accessTokenValue}else n=this.accessTokenValue;t===this._authGeneration&&(this.accessToken?this._manuallySetToken=!1:r&&(this._manuallySetToken=!0),this.accessTokenValue!=n&&(this.accessTokenValue=n,this.channels.forEach(e=>{let t={access_token:n,version:At};e.updateJoinPayload(t),e.joinedOnce&&e.channelAdapter.isJoined()&&e.channelAdapter.push(It.access_token,{access_token:n})})))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e=`general`){this._isManualToken()||this.setAuth().catch(t=>{this.log(`error`,`Error setting auth in ${e}`,t)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(e=>{this.log(`error`,`error waiting for auth on connect`,e)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(t,n)=>{t!==`disconnected`&&(t==`sent`&&this._setAuthSafely(),e&&e(t,n))}}_startWorkerHeartbeat(){this.workerUrl?this.log(`worker`,`starting worker for from ${this.workerUrl}`):this.log(`worker`,`starting default worker`);let e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=e=>{this.log(`worker`,`worker error`,e.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=e=>{e.data.event===`keepAlive`&&this.sendHeartbeat()},this.workerRef.postMessage({event:`start`,interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&=(this.log(`worker`,`terminating worker`),this.workerRef.terminate(),void 0)}_workerObjectUrl(e){let t;if(e)t=e;else{let e=new Blob([Kn],{type:`application/javascript`});t=URL.createObjectURL(e)}return t}_initializeOptions(e){this.worker=e?.worker??!1,this.accessToken=e?.accessToken??null;let t={};t.timeout=e?.timeout??Pt,t.heartbeatIntervalMs=e?.heartbeatIntervalMs??Vn.HEARTBEAT_INTERVAL,this._disconnectOnEmptyChannelsAfterMs=e?.disconnectOnEmptyChannelsAfterMs??2*(e?.heartbeatIntervalMs??Vn.HEARTBEAT_INTERVAL),t.transport=e?.transport??kt.getWebSocketConstructor(),t.params=e?.params,t.logger=e?.logger,t.heartbeatCallback=this._wrapHeartbeatCallback(e?.heartbeatCallback),t.sessionStorage=e?.sessionStorage??Gn(),t.reconnectAfterMs=e?.reconnectAfterMs??(e=>Hn[e-1]||Un);let n,r,i=e?.vsn??Nt;switch(i){case jt:n=(e,t)=>t(JSON.stringify(e)),r=(e,t)=>t(JSON.parse(e));break;case Mt:n=this.serializer.encode.bind(this.serializer),r=this.serializer.decode.bind(this.serializer);break;default:throw Error(`Unsupported serializer version: ${t.vsn}`)}if(t.vsn=i,t.encode=e?.encode??n,t.decode=e?.decode??r,t.beforeReconnect=this._reconnectAuth.bind(this),(e?.logLevel||e?.log_level)&&(this.logLevel=e.logLevel||e.log_level,t.params=Object.assign(Object.assign({},t.params),{log_level:this.logLevel})),this.worker){if(typeof window<`u`&&!window.Worker)throw Error(`Web Worker is not supported`);this.workerUrl=e?.workerUrl,t.autoSendHeartbeat=!this.worker}return t}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}},Jn=class extends Error{constructor(e,t){super(e),this.name=`IcebergError`,this.status=t.status,this.icebergType=t.icebergType,this.icebergCode=t.icebergCode,this.details=t.details,this.isCommitStateUnknown=t.icebergType===`CommitStateUnknownException`||[500,502,504].includes(t.status)&&t.icebergType?.includes(`CommitState`)===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function Yn(e,t,n){let r=new URL(t,e);if(n)for(let[e,t]of Object.entries(n))t!==void 0&&r.searchParams.set(e,t);return r.toString()}async function Xn(e){return!e||e.type===`none`?{}:e.type===`bearer`?{Authorization:`Bearer ${e.token}`}:e.type===`header`?{[e.name]:e.value}:e.type===`custom`?await e.getHeaders():{}}function Zn(e){let t=e.fetchImpl??globalThis.fetch;return{async request({method:n,path:r,query:i,body:a,headers:o}){let s=Yn(e.baseUrl,r,i),c=await Xn(e.auth),l=await t(s,{method:n,headers:{...a?{"Content-Type":`application/json`}:{},...c,...o},body:a?JSON.stringify(a):void 0}),u=await l.text(),d=(l.headers.get(`content-type`)||``).includes(`application/json`),f=d&&u?JSON.parse(u):u;if(!l.ok){let e=d?f:void 0,t=e?.error;throw new Jn(t?.message??`Request failed with status ${l.status}`,{status:l.status,icebergType:t?.type,icebergCode:t?.code,details:e})}return{status:l.status,headers:l.headers,data:f}}}}function Qn(e){return e.join(``)}var $n=class{constructor(e,t=``){this.client=e,this.prefix=t}async listNamespaces(e){let t=e?{parent:Qn(e.namespace)}:void 0;return(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces`,query:t})).data.namespaces.map(e=>({namespace:e}))}async createNamespace(e,t){let n={namespace:e.namespace,properties:t?.properties};return(await this.client.request({method:`POST`,path:`${this.prefix}/namespaces`,body:n})).data}async dropNamespace(e){await this.client.request({method:`DELETE`,path:`${this.prefix}/namespaces/${Qn(e.namespace)}`})}async loadNamespaceMetadata(e){return{properties:(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces/${Qn(e.namespace)}`})).data.properties}}async namespaceExists(e){try{return await this.client.request({method:`HEAD`,path:`${this.prefix}/namespaces/${Qn(e.namespace)}`}),!0}catch(e){if(e instanceof Jn&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(e,t){try{return await this.createNamespace(e,t)}catch(e){if(e instanceof Jn&&e.status===409)return;throw e}}};function er(e){return e.join(``)}var tr=class{constructor(e,t=``,n){this.client=e,this.prefix=t,this.accessDelegation=n}async listTables(e){return(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces/${er(e.namespace)}/tables`})).data.identifiers}async createTable(e,t){let n={};return this.accessDelegation&&(n[`X-Iceberg-Access-Delegation`]=this.accessDelegation),(await this.client.request({method:`POST`,path:`${this.prefix}/namespaces/${er(e.namespace)}/tables`,body:t,headers:n})).data.metadata}async updateTable(e,t){let n=await this.client.request({method:`POST`,path:`${this.prefix}/namespaces/${er(e.namespace)}/tables/${e.name}`,body:t});return{"metadata-location":n.data[`metadata-location`],metadata:n.data.metadata}}async dropTable(e,t){await this.client.request({method:`DELETE`,path:`${this.prefix}/namespaces/${er(e.namespace)}/tables/${e.name}`,query:{purgeRequested:String(t?.purge??!1)}})}async loadTable(e){let t={};return this.accessDelegation&&(t[`X-Iceberg-Access-Delegation`]=this.accessDelegation),(await this.client.request({method:`GET`,path:`${this.prefix}/namespaces/${er(e.namespace)}/tables/${e.name}`,headers:t})).data.metadata}async tableExists(e){let t={};this.accessDelegation&&(t[`X-Iceberg-Access-Delegation`]=this.accessDelegation);try{return await this.client.request({method:`HEAD`,path:`${this.prefix}/namespaces/${er(e.namespace)}/tables/${e.name}`,headers:t}),!0}catch(e){if(e instanceof Jn&&e.status===404)return!1;throw e}}async createTableIfNotExists(e,t){try{return await this.createTable(e,t)}catch(n){if(n instanceof Jn&&n.status===409)return await this.loadTable({namespace:e.namespace,name:t.name});throw n}}},nr=class{constructor(e){let t=`v1`;e.catalogName&&(t+=`/${e.catalogName}`);let n=e.baseUrl.endsWith(`/`)?e.baseUrl:`${e.baseUrl}/`;this.client=Zn({baseUrl:n,auth:e.auth,fetchImpl:e.fetch}),this.accessDelegation=e.accessDelegation?.join(`,`),this.namespaceOps=new $n(this.client,t),this.tableOps=new tr(this.client,t,this.accessDelegation)}async listNamespaces(e){return this.namespaceOps.listNamespaces(e)}async createNamespace(e,t){return this.namespaceOps.createNamespace(e,t)}async dropNamespace(e){await this.namespaceOps.dropNamespace(e)}async loadNamespaceMetadata(e){return this.namespaceOps.loadNamespaceMetadata(e)}async listTables(e){return this.tableOps.listTables(e)}async createTable(e,t){return this.tableOps.createTable(e,t)}async updateTable(e,t){return this.tableOps.updateTable(e,t)}async dropTable(e,t){await this.tableOps.dropTable(e,t)}async loadTable(e){return this.tableOps.loadTable(e)}async namespaceExists(e){return this.namespaceOps.namespaceExists(e)}async tableExists(e){return this.tableOps.tableExists(e)}async createNamespaceIfNotExists(e,t){return this.namespaceOps.createNamespaceIfNotExists(e,t)}async createTableIfNotExists(e,t){return this.tableOps.createTableIfNotExists(e,t)}};function rr(e){"@babel/helpers - typeof";return rr=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},rr(e)}function ir(e,t){if(rr(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(rr(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function ar(e){var t=ir(e,`string`);return rr(t)==`symbol`?t:t+``}function or(e,t,n){return(t=ar(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function sr(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function M(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?sr(Object(n),!0).forEach(function(t){or(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):sr(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var cr=class extends Error{constructor(e,t=`storage`,n,r){super(e),this.__isStorageError=!0,this.namespace=t,this.name=t===`vectors`?`StorageVectorsError`:`StorageError`,this.status=n,this.statusCode=r}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function lr(e){return typeof e==`object`&&!!e&&`__isStorageError`in e}var ur=class extends cr{constructor(e,t,n,r=`storage`,i){super(e,r,t,n),this.name=r===`vectors`?`StorageVectorsApiError`:`StorageApiError`,this.status=t,this.statusCode=n,this.code=i}toJSON(){return M(M({},super.toJSON()),{},{code:this.code})}},dr=class extends cr{constructor(e,t,n=`storage`){super(e,n),this.name=n===`vectors`?`StorageVectorsUnknownError`:`StorageUnknownError`,this.originalError=t}};function fr(e,t,n){let r=M({},e),i=t.toLowerCase();for(let e of Object.keys(r))e.toLowerCase()===i&&delete r[e];return r[i]=n,r}function pr(e){let t={};for(let[n,r]of Object.entries(e))t[n.toLowerCase()]=r;return t}var mr=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),hr=e=>{if(typeof e!=`object`||!e)return!1;let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},gr=e=>{if(Array.isArray(e))return e.map(e=>gr(e));if(typeof e==`function`||e!==Object(e))return e;let t={};return Object.entries(e).forEach(([e,n])=>{let r=e.replace(/([-_][a-z])/gi,e=>e.toUpperCase().replace(/[-_]/g,``));t[r]=gr(n)}),t},_r=e=>!e||typeof e!=`string`||e.length===0||e.length>100||e.trim()!==e||e.includes(`/`)||e.includes(`\\`)?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(e),vr=e=>e.split(`/`).map(encodeURIComponent).join(`/`),yr=e=>{if(typeof e==`object`&&e){let t=e;if(typeof t.msg==`string`)return t.msg;if(typeof t.message==`string`)return t.message;if(typeof t.error_description==`string`)return t.error_description;if(typeof t.error==`string`)return t.error;if(typeof t.error==`object`&&t.error!==null){let e=t.error;if(typeof e.message==`string`)return e.message}}return JSON.stringify(e)},br=async(e,t,n,r)=>{if(typeof e==`object`&&e&&`json`in e&&typeof e.json==`function`){let n=e,i=parseInt(String(n.status),10);Number.isFinite(i)||(i=500),n.json().then(e=>{let n=e?.statusCode||e?.code||i+``;t(new ur(yr(e),i,n,r,e?.code))}).catch(()=>{let e=i+``;t(new ur(n.statusText||`HTTP ${i} error`,i,e,r))})}else t(new dr(yr(e),e,r))},xr=(e,t,n,r)=>{let i={method:e,headers:t?.headers||{}};if(e===`GET`||e===`HEAD`||!r)return M(M({},i),n);if(hr(r)){let e=t?.headers||{},n;for(let[t,r]of Object.entries(e))t.toLowerCase()===`content-type`&&(n=r);i.headers=fr(e,`Content-Type`,n??`application/json`),i.body=JSON.stringify(r)}else i.body=r;return t?.duplex&&(i.duplex=t.duplex),M(M({},i),n)};async function Sr(e,t,n,r,i,a,o){return new Promise((s,c)=>{e(n,xr(t,r,i,a)).then(e=>{if(!e.ok)throw e;if(r?.noResolveJson)return e;if(o===`vectors`){let t=e.headers.get(`content-type`);if(e.headers.get(`content-length`)===`0`||e.status===204||!t||!t.includes(`application/json`))return{}}return e.json()}).then(e=>s(e)).catch(e=>br(e,c,r,o))})}function Cr(e=`storage`){return{get:async(t,n,r,i)=>Sr(t,`GET`,n,r,i,void 0,e),post:async(t,n,r,i,a)=>Sr(t,`POST`,n,i,a,r,e),put:async(t,n,r,i,a)=>Sr(t,`PUT`,n,i,a,r,e),head:async(t,n,r,i)=>Sr(t,`HEAD`,n,M(M({},r),{},{noResolveJson:!0}),i,void 0,e),remove:async(t,n,r,i,a)=>Sr(t,`DELETE`,n,i,a,r,e)}}var{get:wr,post:Tr,put:Er,head:Dr,remove:Or}=Cr(`storage`),kr=Cr(`vectors`),Ar=class{constructor(e,t={},n,r=`storage`){this.shouldThrowOnError=!1,this.url=e,this.headers=pr(t),this.fetch=mr(n),this.namespace=r}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=fr(this.headers,e,t),this}async handleOperation(e){var t=this;try{return{data:await e(),error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(lr(e))return{data:null,error:e};throw e}}},jr=Symbol.toStringTag,Mr=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[jr]=`StreamDownloadBuilder`,this.promise=null}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||=this.execute(),this.promise}async execute(){var e=this;try{return{data:(await e.downloadFn()).body,error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(lr(t))return{data:null,error:t};throw t}}},Nr=Symbol.toStringTag,Pr=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[Nr]=`BlobDownloadBuilder`,this.promise=null}asStream(){return new Mr(this.downloadFn,this.shouldThrowOnError)}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||=this.execute(),this.promise}async execute(){var e=this;try{return{data:await(await e.downloadFn()).blob(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(lr(t))return{data:null,error:t};throw t}}},Fr={limit:100,offset:0,sortBy:{column:`name`,order:`asc`}},Ir={cacheControl:`3600`,contentType:`text/plain;charset=UTF-8`,upsert:!1},Lr=class extends Ar{constructor(e,t={},n,r){super(e,t,r,`storage`),this.bucketId=n}async uploadOrUpdate(e,t,n,r){var i=this;return i.handleOperation(async()=>{let a,o=M(M({},Ir),r),s=M(M({},i.headers),e===`POST`&&{"x-upsert":String(o.upsert)}),c=o.metadata;if(typeof Blob<`u`&&n instanceof Blob?(a=new FormData,a.append(`cacheControl`,o.cacheControl),c&&a.append(`metadata`,i.encodeMetadata(c)),a.append(``,n)):typeof FormData<`u`&&n instanceof FormData?(a=n,a.has(`cacheControl`)||a.append(`cacheControl`,o.cacheControl),c&&!a.has(`metadata`)&&a.append(`metadata`,i.encodeMetadata(c))):(a=n,s[`cache-control`]=`max-age=${o.cacheControl}`,s[`content-type`]=o.contentType,c&&(s[`x-metadata`]=i.toBase64(i.encodeMetadata(c))),(typeof ReadableStream<`u`&&a instanceof ReadableStream||a&&typeof a==`object`&&`pipe`in a&&typeof a.pipe==`function`)&&!o.duplex&&(o.duplex=`half`)),r?.headers)for(let[e,t]of Object.entries(r.headers))s=fr(s,e,t);let l=i._removeEmptyFolders(t),u=i._getFinalPath(l),d=await(e==`PUT`?Er:Tr)(i.fetch,`${i.url}/object/${u}`,a,M({headers:s},o?.duplex?{duplex:o.duplex}:{}));return{path:l,id:d.Id,fullPath:d.Key}})}async upload(e,t,n){return this.uploadOrUpdate(`POST`,e,t,n)}async uploadToSignedUrl(e,t,n,r){var i=this;let a=i._removeEmptyFolders(e),o=i._getFinalPath(a),s=new URL(i.url+`/object/upload/sign/${o}`);return s.searchParams.set(`token`,t),i.handleOperation(async()=>{let e,t=M(M({},Ir),r),o=M(M({},i.headers),{"x-upsert":String(t.upsert)}),c=t.metadata;if(typeof Blob<`u`&&n instanceof Blob?(e=new FormData,e.append(`cacheControl`,t.cacheControl),c&&e.append(`metadata`,i.encodeMetadata(c)),e.append(``,n)):typeof FormData<`u`&&n instanceof FormData?(e=n,e.has(`cacheControl`)||e.append(`cacheControl`,t.cacheControl),c&&!e.has(`metadata`)&&e.append(`metadata`,i.encodeMetadata(c))):(e=n,o[`cache-control`]=`max-age=${t.cacheControl}`,o[`content-type`]=t.contentType,c&&(o[`x-metadata`]=i.toBase64(i.encodeMetadata(c))),(typeof ReadableStream<`u`&&e instanceof ReadableStream||e&&typeof e==`object`&&`pipe`in e&&typeof e.pipe==`function`)&&!t.duplex&&(t.duplex=`half`)),r?.headers)for(let[e,t]of Object.entries(r.headers))o=fr(o,e,t);return{path:a,fullPath:(await Er(i.fetch,s.toString(),e,M({headers:o},t?.duplex?{duplex:t.duplex}:{}))).Key}})}async createSignedUploadUrl(e,t){var n=this;return n.handleOperation(async()=>{let r=n._getFinalPath(e),i=M({},n.headers);t?.upsert&&(i[`x-upsert`]=`true`);let a=await Tr(n.fetch,`${n.url}/object/upload/sign/${r}`,{},{headers:i}),o=new URL(n.url+a.url),s=o.searchParams.get(`token`);if(!s)throw new cr(`No token returned by API`);return{signedUrl:o.toString(),path:e,token:s}})}async update(e,t,n){return this.uploadOrUpdate(`PUT`,e,t,n)}async move(e,t,n){var r=this;return r.handleOperation(async()=>await Tr(r.fetch,`${r.url}/object/move`,{bucketId:r.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n?.destinationBucket},{headers:r.headers}))}async copy(e,t,n){var r=this;return r.handleOperation(async()=>({path:(await Tr(r.fetch,`${r.url}/object/copy`,{bucketId:r.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n?.destinationBucket},{headers:r.headers})).Key}))}async createSignedUrl(e,t,n){var r=this;return r.handleOperation(async()=>{let i=r._getFinalPath(e),a=typeof n?.transform==`object`&&n.transform!==null&&Object.keys(n.transform).length>0,o=await Tr(r.fetch,`${r.url}/object/sign/${i}`,M({expiresIn:t},a?{transform:n.transform}:{}),{headers:r.headers}),s=new URLSearchParams;n?.download&&s.set(`download`,n.download===!0?``:n.download),n?.cacheNonce!=null&&s.set(`cacheNonce`,String(n.cacheNonce));let c=s.toString();return{signedUrl:encodeURI(`${r.url}${o.signedURL}${c?`&${c}`:``}`)}})}async createSignedUrls(e,t,n){var r=this;return r.handleOperation(async()=>{let i=await Tr(r.fetch,`${r.url}/object/sign/${r.bucketId}`,{expiresIn:t,paths:e},{headers:r.headers}),a=new URLSearchParams;n?.download&&a.set(`download`,n.download===!0?``:n.download),n?.cacheNonce!=null&&a.set(`cacheNonce`,String(n.cacheNonce));let o=a.toString();return i.map(e=>M(M({},e),{},{signedUrl:e.signedURL?encodeURI(`${r.url}${e.signedURL}${o?`&${o}`:``}`):null}))})}download(e,t,n){let r=typeof t?.transform==`object`&&t.transform!==null&&Object.keys(t.transform).length>0?`render/image/authenticated`:`object`,i=new URLSearchParams;t?.transform&&this.applyTransformOptsToQuery(i,t.transform),t?.cacheNonce!=null&&i.set(`cacheNonce`,String(t.cacheNonce));let a=i.toString(),o=this._getFinalPath(e);return new Pr(()=>wr(this.fetch,`${this.url}/${r}/${o}${a?`?${a}`:``}`,{headers:this.headers,noResolveJson:!0},n),this.shouldThrowOnError)}async info(e){var t=this;let n=t._getFinalPath(e);return t.handleOperation(async()=>gr(await wr(t.fetch,`${t.url}/object/info/${n}`,{headers:t.headers})))}async exists(e){var t=this;let n=t._getFinalPath(e);try{return await Dr(t.fetch,`${t.url}/object/${n}`,{headers:t.headers}),{data:!0,error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(lr(e)){let t=e instanceof ur?e.status:e instanceof dr?e.originalError?.status:void 0;if(t!==void 0&&[400,404].includes(t))return{data:!1,error:e}}throw e}}getPublicUrl(e,t){let n=this._getFinalPath(e),r=new URLSearchParams;t?.download&&r.set(`download`,t.download===!0?``:t.download),t?.transform&&this.applyTransformOptsToQuery(r,t.transform),t?.cacheNonce!=null&&r.set(`cacheNonce`,String(t.cacheNonce));let i=r.toString(),a=typeof t?.transform==`object`&&t.transform!==null&&Object.keys(t.transform).length>0?`render/image`:`object`;return{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${n}`)+(i?`?${i}`:``)}}}async remove(e){var t=this;return t.handleOperation(async()=>await Or(t.fetch,`${t.url}/object/${t.bucketId}`,{prefixes:e},{headers:t.headers}))}async purgeCache(e,t,n){var r=this;return r.handleOperation(async()=>{let i=vr(r._getFinalPath(e)),a=new URLSearchParams;t?.transformations&&a.set(`transformations`,`true`);let o=a.toString();return await Or(r.fetch,`${r.url}/cdn/${i}${o?`?${o}`:``}`,{},{headers:r.headers},n)})}async list(e,t,n){var r=this;return r.handleOperation(async()=>{let i=t?.sortBy?M(M({},Fr.sortBy),t.sortBy):Fr.sortBy,a=M(M(M({},Fr),t),{},{sortBy:i,prefix:e||``});return await Tr(r.fetch,`${r.url}/object/list/${r.bucketId}`,a,{headers:r.headers},n)})}async listV2(e,t){var n=this;return n.handleOperation(async()=>{let r=M({},e);return await Tr(n.fetch,`${n.url}/object/list-v2/${n.bucketId}`,r,{headers:n.headers},t)})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<`u`?Buffer.from(e).toString(`base64`):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,``)}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,``).replace(/\/+/g,`/`)}applyTransformOptsToQuery(e,t){return t.width&&e.set(`width`,t.width.toString()),t.height&&e.set(`height`,t.height.toString()),t.resize&&e.set(`resize`,t.resize),t.format&&e.set(`format`,t.format),t.quality&&e.set(`quality`,t.quality.toString()),e}},Rr={"X-Client-Info":`storage-js/2.112.4`},zr=class extends Ar{constructor(e,t={},n,r){let i=new URL(e);r?.useNewHostname&&/supabase\.(co|in|red)$/.test(i.hostname)&&!i.hostname.includes(`storage.supabase.`)&&(i.hostname=i.hostname.replace(`supabase.`,`storage.supabase.`));let a=i.href.replace(/\/$/,``),o=M(M({},Rr),t);super(a,o,n,`storage`)}async listBuckets(e){var t=this;return t.handleOperation(async()=>{let n=t.listBucketOptionsToQueryString(e);return await wr(t.fetch,`${t.url}/bucket${n}`,{headers:t.headers})})}async getBucket(e){var t=this;return t.handleOperation(async()=>await wr(t.fetch,`${t.url}/bucket/${e}`,{headers:t.headers}))}async createBucket(e,t={public:!1}){var n=this;return n.handleOperation(async()=>await Tr(n.fetch,`${n.url}/bucket`,{id:e,name:e,type:t.type,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:n.headers}))}async updateBucket(e,t){var n=this;return n.handleOperation(async()=>await Er(n.fetch,`${n.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:n.headers}))}async emptyBucket(e){var t=this;return t.handleOperation(async()=>await Tr(t.fetch,`${t.url}/bucket/${e}/empty`,{},{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await Or(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}async purgeBucketCache(e,t,n){var r=this;return r.handleOperation(async()=>{let i=new URLSearchParams;t?.transformations&&i.set(`transformations`,`true`);let a=i.toString();return await Or(r.fetch,`${r.url}/cdn/${vr(e)}${a?`?${a}`:``}`,{},{headers:r.headers},n)})}listBucketOptionsToQueryString(e){let t={};return e&&(`limit`in e&&(t.limit=String(e.limit)),`offset`in e&&(t.offset=String(e.offset)),e.search&&(t.search=e.search),e.sortColumn&&(t.sortColumn=e.sortColumn),e.sortOrder&&(t.sortOrder=e.sortOrder)),Object.keys(t).length>0?`?`+new URLSearchParams(t).toString():``}},Br=class extends Ar{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=M(M({},Rr),t);super(r,i,n,`storage`)}async createBucket(e){var t=this;return t.handleOperation(async()=>await Tr(t.fetch,`${t.url}/bucket`,{name:e},{headers:t.headers}))}async listBuckets(e){var t=this;return t.handleOperation(async()=>{let n=new URLSearchParams;e?.limit!==void 0&&n.set(`limit`,e.limit.toString()),e?.offset!==void 0&&n.set(`offset`,e.offset.toString()),e?.sortColumn&&n.set(`sortColumn`,e.sortColumn),e?.sortOrder&&n.set(`sortOrder`,e.sortOrder),e?.search&&n.set(`search`,e.search);let r=n.toString(),i=r?`${t.url}/bucket?${r}`:`${t.url}/bucket`;return await wr(t.fetch,i,{headers:t.headers})})}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await Or(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}from(e){var t=this;if(!_r(e))throw new cr(`Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.`);let n=new nr({baseUrl:this.url,catalogName:e,auth:{type:`custom`,getHeaders:async()=>t.headers},fetch:this.fetch}),r=this.shouldThrowOnError;return new Proxy(n,{get(e,t){let n=e[t];return typeof n==`function`?async(...t)=>{try{return{data:await n.apply(e,t),error:null}}catch(e){if(r)throw e;return{data:null,error:e}}}:n}})}},Vr=class extends Ar{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=M(M({},Rr),{},{"Content-Type":`application/json`},t);super(r,i,n,`vectors`)}async createIndex(e){var t=this;return t.handleOperation(async()=>await kr.post(t.fetch,`${t.url}/CreateIndex`,e,{headers:t.headers})||{})}async getIndex(e,t){var n=this;return n.handleOperation(async()=>await kr.post(n.fetch,`${n.url}/GetIndex`,{vectorBucketName:e,indexName:t},{headers:n.headers}))}async listIndexes(e){var t=this;return t.handleOperation(async()=>await kr.post(t.fetch,`${t.url}/ListIndexes`,e,{headers:t.headers}))}async deleteIndex(e,t){var n=this;return n.handleOperation(async()=>await kr.post(n.fetch,`${n.url}/DeleteIndex`,{vectorBucketName:e,indexName:t},{headers:n.headers})||{})}},Hr=class extends Ar{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=M(M({},Rr),{},{"Content-Type":`application/json`},t);super(r,i,n,`vectors`)}async putVectors(e){var t=this;if(e.vectors.length<1||e.vectors.length>500)throw Error(`Vector batch size must be between 1 and 500 items`);return t.handleOperation(async()=>await kr.post(t.fetch,`${t.url}/PutVectors`,e,{headers:t.headers})||{})}async getVectors(e){var t=this;return t.handleOperation(async()=>await kr.post(t.fetch,`${t.url}/GetVectors`,e,{headers:t.headers}))}async listVectors(e){var t=this;if(e.segmentCount!==void 0){if(e.segmentCount<1||e.segmentCount>16)throw Error(`segmentCount must be between 1 and 16`);if(e.segmentIndex!==void 0&&(e.segmentIndex<0||e.segmentIndex>=e.segmentCount))throw Error(`segmentIndex must be between 0 and ${e.segmentCount-1}`)}return t.handleOperation(async()=>await kr.post(t.fetch,`${t.url}/ListVectors`,e,{headers:t.headers}))}async queryVectors(e){var t=this;return t.handleOperation(async()=>await kr.post(t.fetch,`${t.url}/QueryVectors`,e,{headers:t.headers}))}async deleteVectors(e){var t=this;if(e.keys.length<1||e.keys.length>500)throw Error(`Keys batch size must be between 1 and 500 items`);return t.handleOperation(async()=>await kr.post(t.fetch,`${t.url}/DeleteVectors`,e,{headers:t.headers})||{})}},Ur=class extends Ar{constructor(e,t={},n){let r=e.replace(/\/$/,``),i=M(M({},Rr),{},{"Content-Type":`application/json`},t);super(r,i,n,`vectors`)}async createBucket(e){var t=this;return t.handleOperation(async()=>await kr.post(t.fetch,`${t.url}/CreateVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}async getBucket(e){var t=this;return t.handleOperation(async()=>await kr.post(t.fetch,`${t.url}/GetVectorBucket`,{vectorBucketName:e},{headers:t.headers}))}async listBuckets(e={}){var t=this;return t.handleOperation(async()=>await kr.post(t.fetch,`${t.url}/ListVectorBuckets`,e,{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await kr.post(t.fetch,`${t.url}/DeleteVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}},Wr=class extends Ur{constructor(e,t={}){super(e,t.headers||{},t.fetch)}from(e){return new Gr(this.url,this.headers,e,this.fetch)}async createBucket(e){var t=()=>super.createBucket,n=this;return t().call(n,e)}async getBucket(e){var t=()=>super.getBucket,n=this;return t().call(n,e)}async listBuckets(e={}){var t=()=>super.listBuckets,n=this;return t().call(n,e)}async deleteBucket(e){var t=()=>super.deleteBucket,n=this;return t().call(n,e)}},Gr=class extends Vr{constructor(e,t,n,r){super(e,t,r),this.vectorBucketName=n}async createIndex(e){var t=()=>super.createIndex,n=this;return t().call(n,M(M({},e),{},{vectorBucketName:n.vectorBucketName}))}async listIndexes(e={}){var t=()=>super.listIndexes,n=this;return t().call(n,M(M({},e),{},{vectorBucketName:n.vectorBucketName}))}async getIndex(e){var t=()=>super.getIndex,n=this;return t().call(n,n.vectorBucketName,e)}async deleteIndex(e){var t=()=>super.deleteIndex,n=this;return t().call(n,n.vectorBucketName,e)}index(e){return new Kr(this.url,this.headers,this.vectorBucketName,e,this.fetch)}},Kr=class extends Hr{constructor(e,t,n,r,i){super(e,t,i),this.vectorBucketName=n,this.indexName=r}async putVectors(e){var t=()=>super.putVectors,n=this;return t().call(n,M(M({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async getVectors(e){var t=()=>super.getVectors,n=this;return t().call(n,M(M({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async listVectors(e={}){var t=()=>super.listVectors,n=this;return t().call(n,M(M({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async queryVectors(e){var t=()=>super.queryVectors,n=this;return t().call(n,M(M({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async deleteVectors(e){var t=()=>super.deleteVectors,n=this;return t().call(n,M(M({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}},qr=class extends zr{constructor(e,t={},n,r){super(e,t,n,r)}from(e){return new Lr(this.url,this.headers,e,this.fetch)}get vectors(){return new Wr(this.url+`/vector`,{headers:this.headers,fetch:this.fetch})}get analytics(){return new Br(this.url+`/iceberg`,this.headers,this.fetch)}},Jr=`2.112.4`,Yr=3e4,Xr=3*Yr,Zr=2*Yr,Qr=`http://localhost:9999`,$r=`supabase.auth.token`,ei={"X-Client-Info":`gotrue-js/${Jr}`},ti=`X-Supabase-Api-Version`,ni={"2024-01-01":{timestamp:Date.parse(`2024-01-01T00:00:00.0Z`),name:`2024-01-01`}},ri=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,ii=`sb_flow_id`,ai=class extends Error{constructor(e,t,n){super(e),this.__isAuthError=!0,this.name=`AuthError`,this.status=t,this.code=n}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}};function N(e){return typeof e==`object`&&!!e&&`__isAuthError`in e}var oi=class extends ai{constructor(e,t,n){super(e,t,n),this.name=`AuthApiError`,this.status=t,this.code=n}};function si(e){return N(e)&&e.name===`AuthApiError`}var ci=class extends ai{constructor(e,t){super(e),this.name=`AuthUnknownError`,this.originalError=t}},li=class extends ai{constructor(e,t,n,r){super(e,n,r),this.name=t,this.status=n}},ui=class extends li{constructor(){super(`Auth session missing!`,`AuthSessionMissingError`,400,void 0)}};function di(e){return N(e)&&e.name===`AuthSessionMissingError`}var fi=class extends li{constructor(){super(`Auth session or user missing`,`AuthInvalidTokenResponseError`,500,void 0)}},pi=class extends li{constructor(e){super(e,`AuthInvalidCredentialsError`,400,void 0)}},mi=class extends li{constructor(e,t=null){super(e,`AuthImplicitGrantRedirectError`,500,void 0),this.details=null,this.details=t}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}};function hi(e){return N(e)&&e.name===`AuthImplicitGrantRedirectError`}var gi=class extends li{constructor(e,t=null){super(e,`AuthPKCEGrantCodeExchangeError`,500,void 0),this.details=null,this.details=t}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}},_i=class extends li{constructor(){super(`PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.`,`AuthPKCECodeVerifierMissingError`,400,`pkce_code_verifier_not_found`)}},vi=class extends li{constructor(e,t){super(e,`AuthRetryableFetchError`,t,void 0)}};function yi(e){return N(e)&&e.name===`AuthRetryableFetchError`}var bi=class extends li{constructor(e=`Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)`){super(e,`AuthRefreshDiscardedError`,409,void 0)}};function xi(e){return N(e)&&e.name===`AuthRefreshDiscardedError`}var Si=class extends li{constructor(e,t,n){super(e,`AuthWeakPasswordError`,t,`weak_password`),this.reasons=n}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}},Ci=class extends li{constructor(e){super(e,`AuthInvalidJwtError`,400,`invalid_jwt`)}},wi=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_`.split(``),Ti=` 	
\r=`.split(``),Ei=(()=>{let e=Array(128);for(let t=0;t<e.length;t+=1)e[t]=-1;for(let t=0;t<Ti.length;t+=1)e[Ti[t].charCodeAt(0)]=-2;for(let t=0;t<wi.length;t+=1)e[wi[t].charCodeAt(0)]=t;return e})();function Di(e,t,n){if(e!==null)for(t.queue=t.queue<<8|e,t.queuedBits+=8;t.queuedBits>=6;)n(wi[t.queue>>t.queuedBits-6&63]),t.queuedBits-=6;else if(t.queuedBits>0)for(t.queue<<=6-t.queuedBits,t.queuedBits=6;t.queuedBits>=6;)n(wi[t.queue>>t.queuedBits-6&63]),t.queuedBits-=6}function Oi(e,t,n){let r=Ei[e];if(r>-1)for(t.queue=t.queue<<6|r,t.queuedBits+=6;t.queuedBits>=8;)n(t.queue>>t.queuedBits-8&255),t.queuedBits-=8;else if(r===-2)return;else throw Error(`Invalid Base64-URL character "${String.fromCharCode(e)}"`)}function ki(e){let t=[],n=e=>{t.push(String.fromCodePoint(e))},r={utf8seq:0,codepoint:0},i={queue:0,queuedBits:0},a=e=>{Mi(e,r,n)};for(let t=0;t<e.length;t+=1)Oi(e.charCodeAt(t),i,a);return t.join(``)}function Ai(e,t){if(e<=127){t(e);return}if(e<=2047){t(192|e>>6),t(128|e&63);return}if(e<=65535){t(224|e>>12),t(128|e>>6&63),t(128|e&63);return}if(e<=1114111){t(240|e>>18),t(128|e>>12&63),t(128|e>>6&63),t(128|e&63);return}throw Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`)}function ji(e,t){for(let n=0;n<e.length;n+=1){let r=e.charCodeAt(n);if(r>55295&&r<=56319){let t=(r-55296)*1024&65535;r=(e.charCodeAt(n+1)-56320&65535|t)+65536,n+=1}Ai(r,t)}}function Mi(e,t,n){if(t.utf8seq===0){if(e<=127){n(e);return}for(let n=1;n<6;n+=1)if(!(e>>7-n&1)){t.utf8seq=n;break}if(t.utf8seq===2)t.codepoint=e&31;else if(t.utf8seq===3)t.codepoint=e&15;else if(t.utf8seq===4)t.codepoint=e&7;else throw Error(`Invalid UTF-8 sequence`);--t.utf8seq}else if(t.utf8seq>0){if(e<=127)throw Error(`Invalid UTF-8 sequence`);t.codepoint=t.codepoint<<6|e&63,--t.utf8seq,t.utf8seq===0&&n(t.codepoint)}}function Ni(e){let t=[],n={queue:0,queuedBits:0},r=e=>{t.push(e)};for(let t=0;t<e.length;t+=1)Oi(e.charCodeAt(t),n,r);return new Uint8Array(t)}function Pi(e){let t=[];return ji(e,e=>t.push(e)),new Uint8Array(t)}function Fi(e){let t=[],n={queue:0,queuedBits:0},r=e=>{t.push(e)};return e.forEach(e=>Di(e,n,r)),Di(null,n,r),t.join(``)}function Ii(e){return Math.round(Date.now()/1e3)+e}function Li(){return Symbol(`auth-callback`)}var P=()=>typeof window<`u`&&typeof document<`u`,F={tested:!1,writable:!1},I=()=>{if(!P())return!1;try{if(typeof globalThis.localStorage!=`object`)return!1}catch{return!1}if(F.tested)return F.writable;let e=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(e,e),globalThis.localStorage.removeItem(e),F.tested=!0,F.writable=!0}catch{F.tested=!0,F.writable=!1}return F.writable};function Ri(e){let t={},n=new URL(e);if(n.hash&&n.hash[0]===`#`)try{new URLSearchParams(n.hash.substring(1)).forEach((e,n)=>{t[n]=e})}catch{}return n.searchParams.forEach((e,n)=>{t[n]=e}),t}var zi=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),Bi=e=>typeof e==`object`&&!!e&&`status`in e&&`ok`in e&&`json`in e&&typeof e.json==`function`,Vi=async(e,t,n)=>{await e.setItem(t,JSON.stringify(n))},Hi=async(e,t)=>{let n=await e.getItem(t);if(!n)return null;try{return JSON.parse(n)}catch{return null}},Ui=async(e,t)=>{await e.removeItem(t)},Wi=class e{constructor(){this.promise=new e.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}};Wi.promiseConstructor=Promise;function Gi(e){let t=e.split(`.`);if(t.length!==3)throw new Ci(`Invalid JWT structure`);for(let e=0;e<t.length;e++)if(!ri.test(t[e]))throw new Ci(`JWT not in base64url format`);return{header:JSON.parse(ki(t[0])),payload:JSON.parse(ki(t[1])),signature:Ni(t[2]),raw:{header:t[0],payload:t[1]}}}async function Ki(e){return await new Promise(t=>{setTimeout(()=>t(null),e)})}function qi(e,t){return new Promise((n,r)=>{(async()=>{for(let i=0;i<1/0;i++)try{let r=await e(i);if(!t(i,null,r)){n(r);return}}catch(e){if(!t(i,e)){r(e);return}}})()})}function Ji(e){return(`0`+e.toString(16)).substr(-2)}function Yi(){let e=new Uint32Array(56);if(typeof crypto>`u`){let e=``;for(let t=0;t<56;t++)e+=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~`.charAt(Math.floor(Math.random()*66));return e}return crypto.getRandomValues(e),Array.from(e,Ji).join(``)}async function Xi(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest(`SHA-256`,t),r=new Uint8Array(n);return Array.from(r).map(e=>String.fromCharCode(e)).join(``)}async function Zi(e){if(!(typeof crypto<`u`&&crypto.subtle!==void 0&&typeof TextEncoder<`u`))return console.warn(`WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.`),e;let t=await Xi(e);return btoa(t).replace(/\+/g,`-`).replace(/\//g,`_`).replace(/=+$/,``)}var Qi=/^[a-zA-Z0-9_-]{8,64}$/;function $i(e){return typeof e==`string`&&Qi.test(e)?e:null}function ea(){if(typeof crypto<`u`&&typeof crypto.getRandomValues==`function`){let e=new Uint8Array(16);return crypto.getRandomValues(e),Array.from(e,Ji).join(``)}let e=``;for(let t=0;t<32;t++)e+=Math.floor(Math.random()*16).toString(16);return e}var ta=(e,t)=>`${e}-flow-${t}-code-verifier`,na=e=>`${e}-flows-code-verifier`;async function ra(e,t){let n=await Hi(e,na(t));return Array.isArray(n)?n.filter(e=>$i(e)!==null):[]}async function ia(e,t,n,r,i){await Vi(e,ta(t,n),r);let a=(await ra(e,t)).filter(e=>e!==n);for(a.push(n);a.length>5;){let n=a.shift();await Ui(e,ta(t,n)),i?.(n)}await Vi(e,na(t),a),await Vi(e,`${t}-code-verifier`,r)}async function aa(e,t,n){if(n){let r=await Hi(e,ta(t,n));return{verifier:typeof r==`string`?r:null,flowId:n}}let r=await Hi(e,`${t}-code-verifier`);return{verifier:typeof r==`string`?r:null,flowId:null}}async function oa(e,t,n){let r=`${t}-code-verifier`;if(!n){await Ui(e,r);return}let i=ta(t,n),a=await Hi(e,i);await Ui(e,i);let o=await ra(e,t),s=o.filter(e=>e!==n);s.length!==o.length&&(s.length>0?await Vi(e,na(t),s):await Ui(e,na(t))),a!=null&&a===await Hi(e,r)&&await Ui(e,r)}async function sa(e,t){let n=await ra(e,t);for(let r of n)await Ui(e,ta(t,r));await Ui(e,na(t)),await Ui(e,`${t}-code-verifier`)}function ca(e,t){let n=e.indexOf(`#`),r=n===-1?e:e.slice(0,n),i=n===-1?``:e.slice(n),a=r.indexOf(`?`);if(a!==-1){let e=r.slice(0,a),t=r.slice(a+1).split(`&`).filter(e=>e!==``&&e!==`sb_flow_id`&&!e.startsWith(`sb_flow_id=`));r=t.length>0?`${e}?${t.join(`&`)}`:e}let o=r.includes(`?`)?`&`:`?`;return`${r}${o}${ii}=${encodeURIComponent(t)}${i}`}async function la(e,t,n=!1,r){let i=Yi(),a=i;n&&(a+=`/recovery`);let o=ea();await ia(e,t,o,a,r);let s=await Zi(i);return[s,i===s?`plain`:`s256`,o]}var ua=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function da(e){let t=e.headers.get(ti);if(!t||!t.match(ua))return null;try{return new Date(`${t}T00:00:00.0Z`)}catch{return null}}function fa(e){if(!e)throw Error(`Missing exp claim`);if(e<=Math.floor(Date.now()/1e3))throw Error(`JWT has expired`)}function pa(e){switch(e){case`RS256`:return{name:`RSASSA-PKCS1-v1_5`,hash:{name:`SHA-256`}};case`ES256`:return{name:`ECDSA`,namedCurve:`P-256`,hash:{name:`SHA-256`}};default:throw Error(`Invalid alg claim`)}}var ma=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function ha(e){if(!ma.test(e))throw Error(`@supabase/auth-js: Expected parameter to be UUID but is not`)}function ga(e){if(!e.passkey)throw Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).")}function _a(){return new Proxy({},{get:(e,t)=>{if(t===`__isUserNotAvailableProxy`)return!0;if(typeof t==`symbol`){let e=t.toString();if(e===`Symbol(Symbol.toPrimitive)`||e===`Symbol(Symbol.toStringTag)`||e===`Symbol(util.inspect.custom)`)return}throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function va(e,t){return new Proxy(e,{get:(e,n,r)=>{if(n===`__isInsecureUserWarningProxy`)return!0;if(typeof n==`symbol`){let t=n.toString();if(t===`Symbol(Symbol.toPrimitive)`||t===`Symbol(Symbol.toStringTag)`||t===`Symbol(util.inspect.custom)`||t===`Symbol(nodejs.util.inspect.custom)`)return Reflect.get(e,n,r)}return!t.value&&typeof n==`string`&&(console.warn(`Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.`),t.value=!0),Reflect.get(e,n,r)}})}function ya(e){return JSON.parse(JSON.stringify(e))}var ba=e=>{if(typeof e==`object`&&e){let t=e;if(typeof t.msg==`string`)return t.msg;if(typeof t.message==`string`)return t.message;if(typeof t.error_description==`string`)return t.error_description;if(typeof t.error==`string`)return t.error}return JSON.stringify(e)},xa=[500,501,502,503,504,520,521,522,523,524,525,526,527,528,529,530];async function Sa(e){if(!Bi(e))throw new vi(ba(e),0);let t;try{t=await e.json()}catch(t){throw xa.includes(e.status)?new vi(e.statusText||`HTTP ${e.status}`,e.status):new ci(ba(t),t)}if(xa.includes(e.status))throw new vi(ba(t),e.status);let n,r=da(e);if(r&&r.getTime()>=ni[`2024-01-01`].timestamp&&typeof t==`object`&&t&&typeof t.code==`string`?n=t.code:typeof t==`object`&&t&&typeof t.error_code==`string`&&(n=t.error_code),!n){if(typeof t==`object`&&t&&typeof t.weak_password==`object`&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((e,t)=>e&&typeof t==`string`,!0))throw new Si(ba(t),e.status,t.weak_password.reasons)}else if(n===`weak_password`)throw new Si(ba(t),e.status,t.weak_password?.reasons||[]);else if(n===`session_not_found`)throw new ui;throw new oi(ba(t),e.status||500,n)}var Ca=(e,t,n,r)=>{let i={method:e,headers:t?.headers||{}};return e===`GET`?i:(i.headers=Object.assign({"Content-Type":`application/json;charset=UTF-8`},t?.headers),i.body=JSON.stringify(r),Object.assign(Object.assign({},i),n))};async function L(e,t,n,r){let i=Object.assign({},r?.headers);i[`X-Supabase-Api-Version`]||(i[ti]=ni[`2024-01-01`].name),r?.jwt&&(i.Authorization=`Bearer ${r.jwt}`);let a=r?.query??{};r?.redirectTo&&(a.redirect_to=r.redirectTo);let o=await wa(e,t,n+(Object.keys(a).length?`?`+new URLSearchParams(a).toString():``),{headers:i,noResolveJson:r?.noResolveJson},{},r?.body);return r?.xform?r?.xform(o):{data:Object.assign({},o),error:null}}async function wa(e,t,n,r,i,a){let o=Ca(t,r,i,a),s;try{s=await e(n,Object.assign({},o))}catch(e){throw new vi(ba(e),0)}if(s.ok||await Sa(s),r?.noResolveJson)return s;try{return await s.json()}catch(e){await Sa(e)}}function Ta(e){let t=null;ja(e)&&(t=Object.assign({},e),e.expires_at||(t.expires_at=Ii(e.expires_in)));let n=e.user??(typeof e?.id==`string`?e:null);return{data:{session:t,user:n},error:null}}function Ea(e){let t=Ta(e);return!t.error&&e.weak_password&&typeof e.weak_password==`object`&&Array.isArray(e.weak_password.reasons)&&e.weak_password.reasons.length&&e.weak_password.message&&typeof e.weak_password.message==`string`&&e.weak_password.reasons.reduce((e,t)=>e&&typeof t==`string`,!0)&&(t.data.weak_password=e.weak_password),t}function Da(e){return{data:{user:e.user??e},error:null}}function Oa(e){return{data:e,error:null}}function ka(e){let{action_link:t,email_otp:n,hashed_token:r,redirect_to:i,verification_type:a}=e,o=nt(e,[`action_link`,`email_otp`,`hashed_token`,`redirect_to`,`verification_type`]);return{data:{properties:{action_link:t,email_otp:n,hashed_token:r,redirect_to:i,verification_type:a},user:Object.assign({},o)},error:null}}function Aa(e){return e}function ja(e){return!!e.access_token&&!!e.refresh_token&&!!e.expires_in}var Ma=[`global`,`local`,`others`],Na=class{constructor({url:e=``,headers:t={},fetch:n,experimental:r}){this.url=e,this.headers=t,this.fetch=zi(n),this.experimental=r??{},this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)},this.passkey={listPasskeys:this._adminListPasskeys.bind(this),deletePasskey:this._adminDeletePasskey.bind(this)}}async signOut(e,t=Ma[0]){if(Ma.indexOf(t)<0)throw Error(`@supabase/auth-js: Parameter scope must be one of ${Ma.join(`, `)}`);try{return await L(this.fetch,`POST`,`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(e){if(N(e))return{data:null,error:e};throw e}}async inviteUserByEmail(e,t={}){try{return await L(this.fetch,`POST`,`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:Da})}catch(e){if(N(e))return{data:{user:null},error:e};throw e}}async generateLink(e){try{let{options:t}=e,n=nt(e,[`options`]),r=Object.assign(Object.assign({},n),t);return`newEmail`in n&&(r.new_email=n?.newEmail,delete r.newEmail),await L(this.fetch,`POST`,`${this.url}/admin/generate_link`,{body:r,headers:this.headers,xform:ka,redirectTo:t?.redirectTo})}catch(e){if(N(e))return{data:{properties:null,user:null},error:e};throw e}}async createUser(e){try{return await L(this.fetch,`POST`,`${this.url}/admin/users`,{body:e,headers:this.headers,xform:Da})}catch(e){if(N(e))return{data:{user:null},error:e};throw e}}async listUsers(e){try{let t={nextPage:null,lastPage:0,total:0},n=await L(this.fetch,`GET`,`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(e?.page)?.toString()??``,per_page:(e?.perPage)?.toString()??``},xform:Aa});if(n.error)throw n.error;let r=await n.json(),i=n.headers.get(`x-total-count`)??0,a=n.headers.get(`link`)?.split(`,`)??[];return a.length>0&&(a.forEach(e=>{let n=parseInt(e.split(`;`)[0].split(`=`)[1].substring(0,1)),r=JSON.parse(e.split(`;`)[1].split(`=`)[1]);t[`${r}Page`]=n}),t.total=parseInt(i)),{data:Object.assign(Object.assign({},r),t),error:null}}catch(e){if(N(e))return{data:{users:[]},error:e};throw e}}async getUserById(e){ha(e);try{return await L(this.fetch,`GET`,`${this.url}/admin/users/${e}`,{headers:this.headers,xform:Da})}catch(e){if(N(e))return{data:{user:null},error:e};throw e}}async updateUserById(e,t){ha(e);try{return await L(this.fetch,`PUT`,`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:Da})}catch(e){if(N(e))return{data:{user:null},error:e};throw e}}async deleteUser(e,t=!1){ha(e);try{return await L(this.fetch,`DELETE`,`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:Da})}catch(e){if(N(e))return{data:{user:null},error:e};throw e}}async _listFactors(e){ha(e.userId);try{let{data:t,error:n}=await L(this.fetch,`GET`,`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:e=>({data:{factors:e},error:null})});return{data:t,error:n}}catch(e){if(N(e))return{data:null,error:e};throw e}}async _deleteFactor(e){ha(e.userId),ha(e.id);try{return{data:await L(this.fetch,`DELETE`,`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(e){if(N(e))return{data:null,error:e};throw e}}async _listOAuthClients(e){try{let t={nextPage:null,lastPage:0,total:0},n=await L(this.fetch,`GET`,`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(e?.page)?.toString()??``,per_page:(e?.perPage)?.toString()??``},xform:Aa});if(n.error)throw n.error;let r=await n.json(),i=n.headers.get(`x-total-count`)??0,a=n.headers.get(`link`)?.split(`,`)??[];return a.length>0&&(a.forEach(e=>{let n=parseInt(e.split(`;`)[0].split(`=`)[1].substring(0,1)),r=JSON.parse(e.split(`;`)[1].split(`=`)[1]);t[`${r}Page`]=n}),t.total=parseInt(i)),{data:Object.assign(Object.assign({},r),t),error:null}}catch(e){if(N(e))return{data:{clients:[]},error:e};throw e}}async _createOAuthClient(e){try{return await L(this.fetch,`POST`,`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(N(e))return{data:null,error:e};throw e}}async _getOAuthClient(e){try{return await L(this.fetch,`GET`,`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(N(e))return{data:null,error:e};throw e}}async _updateOAuthClient(e,t){try{return await L(this.fetch,`PUT`,`${this.url}/admin/oauth/clients/${e}`,{body:t,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(N(e))return{data:null,error:e};throw e}}async _deleteOAuthClient(e){try{return await L(this.fetch,`DELETE`,`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(N(e))return{data:null,error:e};throw e}}async _regenerateOAuthClientSecret(e){try{return await L(this.fetch,`POST`,`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(N(e))return{data:null,error:e};throw e}}async _listCustomProviders(e){try{let t={};return e?.type&&(t.type=e.type),await L(this.fetch,`GET`,`${this.url}/admin/custom-providers`,{headers:this.headers,query:t,xform:e=>({data:{providers:e?.providers??[]},error:null})})}catch(e){if(N(e))return{data:{providers:[]},error:e};throw e}}async _createCustomProvider(e){try{return await L(this.fetch,`POST`,`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(N(e))return{data:null,error:e};throw e}}async _getCustomProvider(e){try{return await L(this.fetch,`GET`,`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(N(e))return{data:null,error:e};throw e}}async _updateCustomProvider(e,t){try{return await L(this.fetch,`PUT`,`${this.url}/admin/custom-providers/${e}`,{body:t,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(N(e))return{data:null,error:e};throw e}}async _deleteCustomProvider(e){try{return await L(this.fetch,`DELETE`,`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(N(e))return{data:null,error:e};throw e}}async _adminListPasskeys(e){ga(this.experimental),ha(e.userId);try{return await L(this.fetch,`GET`,`${this.url}/admin/users/${e.userId}/passkeys`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(N(e))return{data:null,error:e};throw e}}async _adminDeletePasskey(e){ga(this.experimental),ha(e.userId),ha(e.passkeyId);try{return await L(this.fetch,`DELETE`,`${this.url}/admin/users/${e.userId}/passkeys/${e.passkeyId}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(N(e))return{data:null,error:e};throw e}}};function Pa(e={}){return{getItem:t=>e[t]||null,setItem:(t,n)=>{e[t]=n},removeItem:t=>{delete e[t]}}}globalThis&&I()&&globalThis.localStorage&&globalThis.localStorage.getItem(`supabase.gotrue-js.locks.debug`);var Fa=class extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}};function Ia(){if(typeof globalThis!=`object`)try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<`u`&&(self.globalThis=self)}}function La(e){if(!/^0x[a-fA-F0-9]{40}$/.test(e))throw Error(`@supabase/auth-js: Address "${e}" is invalid.`);return e.toLowerCase()}function Ra(e){return parseInt(e,16)}function za(e){let t=new TextEncoder().encode(e);return`0x`+Array.from(t,e=>e.toString(16).padStart(2,`0`)).join(``)}function Ba(e){let{chainId:t,domain:n,expirationTime:r,issuedAt:i=new Date,nonce:a,notBefore:o,requestId:s,resources:c,scheme:l,uri:u,version:d}=e;if(!Number.isInteger(t))throw Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);if(!n)throw Error(`@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.`);if(a&&a.length<8)throw Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a}`);if(!u)throw Error(`@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.`);if(d!==`1`)throw Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${d}`);if(e.statement?.includes(`
`))throw Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e.statement}`);let f=La(e.address),p=`${l?`${l}://${n}`:n} wants you to sign in with your Ethereum account:\n${f}\n\n${e.statement?`${e.statement}\n`:``}`,m=`URI: ${u}\nVersion: ${d}\nChain ID: ${t}${a?`\nNonce: ${a}`:``}\nIssued At: ${i.toISOString()}`;if(r&&(m+=`\nExpiration Time: ${r.toISOString()}`),o&&(m+=`\nNot Before: ${o.toISOString()}`),s&&(m+=`\nRequest ID: ${s}`),c){let e=`
Resources:`;for(let t of c){if(!t||typeof t!=`string`)throw Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${t}`);e+=`\n- ${t}`}m+=e}return`${p}\n${m}`}var Va=class extends Error{constructor({message:e,code:t,cause:n,name:r}){super(e,{cause:n}),this.__isWebAuthnError=!0,this.name=r??(n instanceof Error?n.name:void 0)??`Unknown Error`,this.code=t}toJSON(){return{name:this.name,message:this.message,code:this.code}}},Ha=class extends Va{constructor(e,t){super({code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:t,message:e}),this.name=`WebAuthnUnknownError`,this.originalError=t}};function Ua({error:e,options:t}){let{publicKey:n}=t;if(!n)throw Error(`options was missing required publicKey property`);if(e.name===`AbortError`){if(t.signal instanceof AbortSignal)return new Va({message:`Registration ceremony was sent an abort signal`,code:`ERROR_CEREMONY_ABORTED`,cause:e})}else if(e.name===`ConstraintError`){if(n.authenticatorSelection?.requireResidentKey===!0)return new Va({message:`Discoverable credentials were required but no available authenticator supported it`,code:`ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT`,cause:e});if(t.mediation===`conditional`&&n.authenticatorSelection?.userVerification===`required`)return new Va({message:`User verification was required during automatic registration but it could not be performed`,code:`ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE`,cause:e});if(n.authenticatorSelection?.userVerification===`required`)return new Va({message:`User verification was required but no available authenticator supported it`,code:`ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT`,cause:e})}else if(e.name===`InvalidStateError`)return new Va({message:`The authenticator was previously registered`,code:`ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED`,cause:e});else if(e.name===`NotAllowedError`)return new Va({message:e.message,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e});else if(e.name===`NotSupportedError`)return n.pubKeyCredParams.filter(e=>e.type===`public-key`).length===0?new Va({message:`No entry in pubKeyCredParams was of type "public-key"`,code:`ERROR_MALFORMED_PUBKEYCREDPARAMS`,cause:e}):new Va({message:`No available authenticator supported any of the specified pubKeyCredParams algorithms`,code:`ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG`,cause:e});else if(e.name===`SecurityError`){let t=window.location.hostname;if(!Xa(t))return new Va({message:`${window.location.hostname} is an invalid domain`,code:`ERROR_INVALID_DOMAIN`,cause:e});if(n.rp.id!==t)return new Va({message:`The RP ID "${n.rp.id}" is invalid for this domain`,code:`ERROR_INVALID_RP_ID`,cause:e})}else if(e.name===`TypeError`){if(n.user.id.byteLength<1||n.user.id.byteLength>64)return new Va({message:`User ID was not between 1 and 64 characters`,code:`ERROR_INVALID_USER_ID_LENGTH`,cause:e})}else if(e.name===`UnknownError`)return new Va({message:`The authenticator was unable to process the specified options, or could not create a new credential`,code:`ERROR_AUTHENTICATOR_GENERAL_ERROR`,cause:e});return new Va({message:`a Non-Webauthn related error has occurred`,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e})}function Wa({error:e,options:t}){let{publicKey:n}=t;if(!n)throw Error(`options was missing required publicKey property`);if(e.name===`AbortError`){if(t.signal instanceof AbortSignal)return new Va({message:`Authentication ceremony was sent an abort signal`,code:`ERROR_CEREMONY_ABORTED`,cause:e})}else if(e.name===`NotAllowedError`)return new Va({message:e.message,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e});else if(e.name===`SecurityError`){let t=window.location.hostname;if(!Xa(t))return new Va({message:`${window.location.hostname} is an invalid domain`,code:`ERROR_INVALID_DOMAIN`,cause:e});if(n.rpId!==t)return new Va({message:`The RP ID "${n.rpId}" is invalid for this domain`,code:`ERROR_INVALID_RP_ID`,cause:e})}else if(e.name===`UnknownError`)return new Va({message:`The authenticator was unable to process the specified options, or could not create a new assertion signature`,code:`ERROR_AUTHENTICATOR_GENERAL_ERROR`,cause:e});return new Va({message:`a Non-Webauthn related error has occurred`,code:`ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY`,cause:e})}var Ga=new class{createNewAbortSignal(){if(this.controller){let e=Error(`Cancelling existing WebAuthn API call for new one`);e.name=`AbortError`,this.controller.abort(e)}let e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){let e=Error(`Manually cancelling existing WebAuthn API call`);e.name=`AbortError`,this.controller.abort(e),this.controller=void 0}}};function Ka(e){if(!e)throw Error(`Credential creation options are required`);if(typeof PublicKeyCredential<`u`&&`parseCreationOptionsFromJSON`in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON==`function`)return PublicKeyCredential.parseCreationOptionsFromJSON(e);let{challenge:t,user:n,excludeCredentials:r}=e,i=nt(e,[`challenge`,`user`,`excludeCredentials`]),a=Ni(t).buffer,o=Object.assign(Object.assign({},n),{id:Ni(n.id).buffer}),s=Object.assign(Object.assign({},i),{challenge:a,user:o});if(r&&r.length>0){s.excludeCredentials=Array(r.length);for(let e=0;e<r.length;e++){let t=r[e];s.excludeCredentials[e]=Object.assign(Object.assign({},t),{id:Ni(t.id).buffer,type:t.type||`public-key`,transports:t.transports})}}return s}function qa(e){if(!e)throw Error(`Credential request options are required`);if(typeof PublicKeyCredential<`u`&&`parseRequestOptionsFromJSON`in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON==`function`)return PublicKeyCredential.parseRequestOptionsFromJSON(e);let{challenge:t,allowCredentials:n}=e,r=nt(e,[`challenge`,`allowCredentials`]),i=Ni(t).buffer,a=Object.assign(Object.assign({},r),{challenge:i});if(n&&n.length>0){a.allowCredentials=Array(n.length);for(let e=0;e<n.length;e++){let t=n[e];a.allowCredentials[e]=Object.assign(Object.assign({},t),{id:Ni(t.id).buffer,type:t.type||`public-key`,transports:t.transports})}}return a}function Ja(e){if(`toJSON`in e&&typeof e.toJSON==`function`)return e.toJSON();let t=e;return{id:e.id,rawId:e.id,response:{attestationObject:Fi(new Uint8Array(e.response.attestationObject)),clientDataJSON:Fi(new Uint8Array(e.response.clientDataJSON))},type:`public-key`,clientExtensionResults:e.getClientExtensionResults(),authenticatorAttachment:t.authenticatorAttachment??void 0}}function Ya(e){if(`toJSON`in e&&typeof e.toJSON==`function`)return e.toJSON();let t=e,n=e.getClientExtensionResults(),r=e.response;return{id:e.id,rawId:e.id,response:{authenticatorData:Fi(new Uint8Array(r.authenticatorData)),clientDataJSON:Fi(new Uint8Array(r.clientDataJSON)),signature:Fi(new Uint8Array(r.signature)),userHandle:r.userHandle?Fi(new Uint8Array(r.userHandle)):void 0},type:`public-key`,clientExtensionResults:n,authenticatorAttachment:t.authenticatorAttachment??void 0}}function Xa(e){return e===`localhost`||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e)}function Za(){return!!(P()&&`PublicKeyCredential`in window&&window.PublicKeyCredential&&`credentials`in navigator&&typeof(navigator==null?void 0:navigator.credentials)?.create==`function`&&typeof(navigator==null?void 0:navigator.credentials)?.get==`function`)}async function Qa(e){try{let t=await navigator.credentials.create(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new Ha(`Browser returned unexpected credential type`,t)}:{data:null,error:new Ha(`Empty credential response`,t)}}catch(t){return{data:null,error:Ua({error:t,options:e})}}}async function $a(e){try{let t=await navigator.credentials.get(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new Ha(`Browser returned unexpected credential type`,t)}:{data:null,error:new Ha(`Empty credential response`,t)}}catch(t){return{data:null,error:Wa({error:t,options:e})}}}var eo={hints:[`security-key`],authenticatorSelection:{authenticatorAttachment:`cross-platform`,requireResidentKey:!1,userVerification:`preferred`,residentKey:`discouraged`},attestation:`direct`},to={userVerification:`preferred`,hints:[`security-key`],attestation:`direct`};function no(...e){let t=e=>typeof e==`object`&&!!e&&!Array.isArray(e),n=e=>e instanceof ArrayBuffer||ArrayBuffer.isView(e),r={};for(let i of e)if(i)for(let e in i){let a=i[e];if(a!==void 0){if(Array.isArray(a))r[e]=a;else if(n(a))r[e]=a;else if(t(a)){let n=r[e];r[e]=t(n)?no(n,a):no(a)}else r[e]=a}}return r}function ro(e,t){return no(eo,e,t||{})}function io(e,t){return no(to,e,t||{})}var ao=class{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:`webauthn`}))}async _challenge({factorId:e,webauthn:t,friendlyName:n,signal:r},i){try{let{data:a,error:o}=await this.client.mfa.challenge({factorId:e,webauthn:t});if(!a)return{data:null,error:o};let s=r??Ga.createNewAbortSignal();if(a.webauthn.type===`create`){let{user:e}=a.webauthn.credential_options.publicKey;if(!e.name){let t=n;if(t)e.name=`${e.id}:${t}`;else{let t=(await this.client.getUser()).data.user,n=t?.user_metadata?.name||t?.email||t?.id||`User`;e.name=`${e.id}:${n}`}}e.displayName||=e.name}switch(a.webauthn.type){case`create`:{let{data:t,error:n}=await Qa({publicKey:ro(a.webauthn.credential_options.publicKey,i?.create),signal:s});return t?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:t}},error:null}:{data:null,error:n}}case`request`:{let t=io(a.webauthn.credential_options.publicKey,i?.request),{data:n,error:r}=await $a(Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:t,signal:s}));return n?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:n}},error:null}:{data:null,error:r}}}}catch(e){return N(e)?{data:null,error:e}:{data:null,error:new ci(`Unexpected error in challenge`,e)}}}async _verify({challengeId:e,factorId:t,webauthn:n}){return this.client.mfa.verify({factorId:t,challengeId:e,webauthn:n})}async _authenticate({factorId:e,webauthn:{rpId:t=typeof window<`u`?window.location.hostname:void 0,rpOrigins:n=typeof window<`u`?[window.location.origin]:void 0,signal:r}={}},i){if(!t)return{data:null,error:new ai(`rpId is required for WebAuthn authentication`)};try{if(!Za())return{data:null,error:new ci(`Browser does not support WebAuthn`,null)};let{data:a,error:o}=await this.challenge({factorId:e,webauthn:{rpId:t,rpOrigins:n},signal:r},{request:i});if(!a)return{data:null,error:o};let{webauthn:s}=a;return this._verify({factorId:e,challengeId:a.challengeId,webauthn:{type:s.type,rpId:t,rpOrigins:n,credential_response:s.credential_response}})}catch(e){return N(e)?{data:null,error:e}:{data:null,error:new ci(`Unexpected error in authenticate`,e)}}}async _register({friendlyName:e,webauthn:{rpId:t=typeof window<`u`?window.location.hostname:void 0,rpOrigins:n=typeof window<`u`?[window.location.origin]:void 0,signal:r}={}},i){if(!t)return{data:null,error:new ai(`rpId is required for WebAuthn registration`)};try{if(!Za())return{data:null,error:new ci(`Browser does not support WebAuthn`,null)};let{data:a,error:o}=await this._enroll({friendlyName:e});if(!a)return await this.client.mfa.listFactors().then(t=>t.data?.all.find(t=>t.factor_type===`webauthn`&&t.friendly_name===e&&t.status!==`unverified`)).then(e=>e?this.client.mfa.unenroll({factorId:e?.id}):void 0),{data:null,error:o};let{data:s,error:c}=await this._challenge({factorId:a.id,friendlyName:a.friendly_name,webauthn:{rpId:t,rpOrigins:n},signal:r},{create:i});return s?this._verify({factorId:a.id,challengeId:s.challengeId,webauthn:{rpId:t,rpOrigins:n,type:s.webauthn.type,credential_response:s.webauthn.credential_response}}):{data:null,error:c}}catch(e){return N(e)?{data:null,error:e}:{data:null,error:new ci(`Unexpected error in register`,e)}}}};Ia();var oo={url:Qr,storageKey:$r,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:ei,flowType:`implicit`,debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1,experimental:{}},so={},co=!1,lo=class e{get jwks(){return so[this.storageKey]?.jwks??{keys:[]}}set jwks(e){so[this.storageKey]=Object.assign(Object.assign({},so[this.storageKey]),{jwks:e})}get jwks_cached_at(){return so[this.storageKey]?.cachedAt??-(2**53-1)}set jwks_cached_at(e){so[this.storageKey]=Object.assign(Object.assign({},so[this.storageKey]),{cachedAt:e})}constructor(t){var n;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.lastRefreshFailure=null,this._sessionRemovalEpoch=0,this.initializePromise=null,this._pendingInitNotifications=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lock=null,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;let r=Object.assign(Object.assign({},oo),t);if(this.storageKey=r.storageKey,this.instanceID=e.nextInstanceID[this.storageKey]??0,e.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!r.debug,typeof r.debug==`function`&&(this.logger=r.debug),this.instanceID>0&&P()){let e=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(e),this.logDebugMessages&&console.trace(e)}if(this.persistSession=r.persistSession,this.autoRefreshToken=r.autoRefreshToken,this.experimental=r.experimental??{},this.admin=new Na({url:r.url,headers:r.headers,fetch:r.fetch,experimental:this.experimental}),this.url=r.url,this.headers=r.headers,this.fetch=zi(r.fetch),this.detectSessionInUrl=r.detectSessionInUrl,this.flowType=r.flowType,this.hasCustomAuthorizationHeader=r.hasCustomAuthorizationHeader,this.throwOnError=r.throwOnError,this.lockAcquireTimeout=r.lockAcquireTimeout,r.lock!=null&&(this.lock=r.lock,co||(co=!0,console.warn(`${this._logPrefix()} The "lock" option is deprecated and will be removed in v3. The client now coordinates session refreshes without a lock, so most apps can drop the option. See https://github.com/supabase/supabase-js/blob/master/packages/core/auth-js/migrations/lockless-coordination.md`))),this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=-(2**53-1)),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new ao(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.passkey={startRegistration:this._startPasskeyRegistration.bind(this),verifyRegistration:this._verifyPasskeyRegistration.bind(this),startAuthentication:this._startPasskeyAuthentication.bind(this),verifyAuthentication:this._verifyPasskeyAuthentication.bind(this),list:this._listPasskeys.bind(this),update:this._updatePasskey.bind(this),delete:this._deletePasskey.bind(this)},this.persistSession?(r.storage?this.storage=r.storage:I()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Pa(this.memoryStorage)),r.userStorage&&(this.userStorage=r.userStorage)):(this.memoryStorage={},this.storage=Pa(this.memoryStorage)),P()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(e){console.error(`Failed to create a new BroadcastChannel, multi-tab state changes will not be available`,e)}(n=this.broadcastChannel)==null||n.addEventListener(`message`,async e=>{this._debug(`received broadcast notification from other tab or client`,e),(e.data.event===`TOKEN_REFRESHED`||e.data.event===`SIGNED_IN`)&&(this.lastRefreshFailure=null);try{await this._notifyAllSubscribers(e.data.event,e.data.session,!1)}catch(e){this._debug(`#broadcastChannel`,`error`,e)}})}r.skipAutoInitialize||this.initialize().catch(e=>{this._debug(`#initialize()`,`error`,e)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${Jr}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){if(this.initializePromise)return await this.initializePromise;this._pendingInitNotifications=[],this.initializePromise=(async()=>this.lock==null?await this._initialize():await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))();let e=await this.initializePromise,t=this._pendingInitNotifications??[];this._pendingInitNotifications=null;for(let e of t)await this._notifyAllSubscribers(e.event,e.session,e.broadcast);return e}async _initialize(){try{let e={},t=`none`;if(P()&&(e=Ri(window.location.href),this._isImplicitGrantCallback(e)?t=`implicit`:await this._isPKCECallback(e)&&(t=`pkce`)),P()&&this.detectSessionInUrl&&t!==`none`){let{data:n,error:r}=await this._getSessionFromURL(e,t);if(r){if(this._debug(`#_initialize()`,`error detecting session from URL`,r),hi(r)){let e=r.details?.code;if(e===`identity_already_exists`||e===`identity_not_found`||e===`single_identity_not_deletable`)return{error:r}}return{error:r}}let{session:i,redirectType:a}=n;return this._debug(`#_initialize()`,`detected session in URL`,i,`redirect type`,a),await this._saveSession(i),setTimeout(async()=>{a===`recovery`?await this._notifyAllSubscribers(`PASSWORD_RECOVERY`,i):await this._notifyAllSubscribers(`SIGNED_IN`,i)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(e){return N(e)?this._returnResult({error:e}):this._returnResult({error:new ci(`Unexpected error during initialization`,e)})}finally{await this._handleVisibilityChange(),this._debug(`#_initialize()`,`end`)}}async signInAnonymously(e){try{let{data:t,error:n}=await L(this.fetch,`POST`,`${this.url}/signup`,{headers:this.headers,body:{data:e?.options?.data??{},gotrue_meta_security:{captcha_token:e?.options?.captchaToken}},xform:Ta});if(n||!t)return this._returnResult({data:{user:null,session:null},error:n});let r=t.session,i=t.user;return t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers(`SIGNED_IN`,r)),this._returnResult({data:{user:i,session:r},error:null})}catch(e){if(N(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signUp(e){let t=null;try{let n;if(`email`in e){let{email:r,password:i,options:a}=e,o=null,s=null;this.flowType===`pkce`&&([o,s,t]=await this._getCodeChallengeAndMethod()),n=await L(this.fetch,`POST`,`${this.url}/signup`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(a?.emailRedirectTo,t),body:{email:r,password:i,data:a?.data??{},gotrue_meta_security:{captcha_token:a?.captchaToken},code_challenge:o,code_challenge_method:s},xform:Ta})}else if(`phone`in e){let{phone:t,password:r,options:i}=e;n=await L(this.fetch,`POST`,`${this.url}/signup`,{headers:this.headers,body:{phone:t,password:r,data:i?.data??{},channel:i?.channel??`sms`,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Ta})}else throw new pi(`You must provide either an email or phone number and a password`);let{data:r,error:i}=n;if(i||!r)return await oa(this.storage,this.storageKey,t),this._returnResult({data:{user:null,session:null},error:i});let a=r.session,o=r.user;return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers(`SIGNED_IN`,a)),this._returnResult({data:{user:o,session:a},error:null})}catch(e){if(await oa(this.storage,this.storageKey,t),N(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithPassword(e){try{let t;if(`email`in e){let{email:n,password:r,options:i}=e;t=await L(this.fetch,`POST`,`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:n,password:r,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Ea})}else if(`phone`in e){let{phone:n,password:r,options:i}=e;t=await L(this.fetch,`POST`,`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:n,password:r,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Ea})}else throw new pi(`You must provide either an email or phone number and a password`);let{data:n,error:r}=t;if(r)return this._returnResult({data:{user:null,session:null},error:r});if(!n||!n.session||!n.user){let e=new fi;return this._returnResult({data:{user:null,session:null},error:e})}return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers(`SIGNED_IN`,n.session)),this._returnResult({data:Object.assign({user:n.user,session:n.session},n.weak_password?{weakPassword:n.weak_password}:null),error:r})}catch(e){if(N(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithOAuth(e){return await this._handleProviderSignIn(e.provider,{redirectTo:e.options?.redirectTo,scopes:e.options?.scopes,queryParams:e.options?.queryParams,skipBrowserRedirect:e.options?.skipBrowserRedirect})}async exchangeCodeForSession(e,t){return await this.initializePromise,this.lock==null?this._exchangeCodeForSession(e,t):this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e,t))}async signInWithWeb3(e){let{chain:t}=e;switch(t){case`ethereum`:return await this.signInWithEthereum(e);case`solana`:return await this.signInWithSolana(e);default:throw Error(`@supabase/auth-js: Unsupported chain "${t}"`)}}async signInWithEthereum(e){let t,n;if(`message`in e)t=e.message,n=e.signature;else{let{chain:r,wallet:i,statement:a,options:o}=e,s;if(!P()){if(typeof i!=`object`||!o?.url)throw Error(`@supabase/auth-js: Both wallet and url must be specified in non-browser environments.`);s=i}else if(typeof i==`object`)s=i;else{let e=window;if(`ethereum`in e&&typeof e.ethereum==`object`&&`request`in e.ethereum&&typeof e.ethereum.request==`function`)s=e.ethereum;else throw Error(`@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.`)}let c=new URL(o?.url??window.location.href),l=await s.request({method:`eth_requestAccounts`}).then(e=>e).catch(()=>{throw Error(`@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid`)});if(!l||l.length===0)throw Error(`@supabase/auth-js: No accounts available. Please ensure the wallet is connected.`);let u=La(l[0]),d=o?.signInWithEthereum?.chainId;d||=Ra(await s.request({method:`eth_chainId`})),t=Ba({domain:c.host,address:u,statement:a,uri:c.href,version:`1`,chainId:d,nonce:o?.signInWithEthereum?.nonce,issuedAt:o?.signInWithEthereum?.issuedAt??new Date,expirationTime:o?.signInWithEthereum?.expirationTime,notBefore:o?.signInWithEthereum?.notBefore,requestId:o?.signInWithEthereum?.requestId,resources:o?.signInWithEthereum?.resources}),n=await s.request({method:`personal_sign`,params:[za(t),u]})}try{let{data:r,error:i}=await L(this.fetch,`POST`,`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:`ethereum`,message:t,signature:n},e.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options?.captchaToken}}:null),xform:Ta});if(i)throw i;if(!r||!r.session||!r.user){let e=new fi;return this._returnResult({data:{user:null,session:null},error:e})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers(`SIGNED_IN`,r.session)),this._returnResult({data:Object.assign({},r),error:i})}catch(e){if(N(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithSolana(e){let t,n;if(`message`in e)t=e.message,n=e.signature;else{let{chain:r,wallet:i,statement:a,options:o}=e,s;if(!P()){if(typeof i!=`object`||!o?.url)throw Error(`@supabase/auth-js: Both wallet and url must be specified in non-browser environments.`);s=i}else if(typeof i==`object`)s=i;else{let e=window;if(`solana`in e&&typeof e.solana==`object`&&(`signIn`in e.solana&&typeof e.solana.signIn==`function`||`signMessage`in e.solana&&typeof e.solana.signMessage==`function`))s=e.solana;else throw Error(`@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.`)}let c=new URL(o?.url??window.location.href);if(`signIn`in s&&s.signIn){let e=await s.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},o?.signInWithSolana),{version:`1`,domain:c.host,uri:c.href}),a?{statement:a}:null)),r;if(Array.isArray(e)&&e[0]&&typeof e[0]==`object`)r=e[0];else if(e&&typeof e==`object`&&`signedMessage`in e&&`signature`in e)r=e;else throw Error(`@supabase/auth-js: Wallet method signIn() returned unrecognized value`);if(`signedMessage`in r&&`signature`in r&&(typeof r.signedMessage==`string`||r.signedMessage instanceof Uint8Array)&&r.signature instanceof Uint8Array)t=typeof r.signedMessage==`string`?r.signedMessage:new TextDecoder().decode(r.signedMessage),n=r.signature;else throw Error(`@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields`)}else{if(!(`signMessage`in s)||typeof s.signMessage!=`function`||!(`publicKey`in s)||typeof s!=`object`||!s.publicKey||!(`toBase58`in s.publicKey)||typeof s.publicKey.toBase58!=`function`)throw Error(`@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API`);t=[`${c.host} wants you to sign in with your Solana account:`,s.publicKey.toBase58(),...a?[``,a,``]:[``],`Version: 1`,`URI: ${c.href}`,`Issued At: ${o?.signInWithSolana?.issuedAt??new Date().toISOString()}`,...o?.signInWithSolana?.notBefore?[`Not Before: ${o.signInWithSolana.notBefore}`]:[],...o?.signInWithSolana?.expirationTime?[`Expiration Time: ${o.signInWithSolana.expirationTime}`]:[],...o?.signInWithSolana?.chainId?[`Chain ID: ${o.signInWithSolana.chainId}`]:[],...o?.signInWithSolana?.nonce?[`Nonce: ${o.signInWithSolana.nonce}`]:[],...o?.signInWithSolana?.requestId?[`Request ID: ${o.signInWithSolana.requestId}`]:[],...o?.signInWithSolana?.resources?.length?[`Resources`,...o.signInWithSolana.resources.map(e=>`- ${e}`)]:[]].join(`
`);let e=await s.signMessage(new TextEncoder().encode(t),`utf8`);if(!e||!(e instanceof Uint8Array))throw Error(`@supabase/auth-js: Wallet signMessage() API returned an recognized value`);n=e}}try{let{data:r,error:i}=await L(this.fetch,`POST`,`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:`solana`,message:t,signature:Fi(n)},e.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options?.captchaToken}}:null),xform:Ta});if(i)throw i;if(!r||!r.session||!r.user){let e=new fi;return this._returnResult({data:{user:null,session:null},error:e})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers(`SIGNED_IN`,r.session)),this._returnResult({data:Object.assign({},r),error:i})}catch(e){if(N(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async _exchangeCodeForSession(e,t){let n=t?.flowId!=null,r=n?$i(t?.flowId):P()?$i(Ri(window.location.href)[ii]):null;n&&!r&&this._debug(`#_exchangeCodeForSession()`,`provided flowId is not a valid flow id`,t?.flowId);let{verifier:i,flowId:a}=n&&!r?{verifier:null,flowId:null}:await aa(this.storage,this.storageKey,r),[o,s]=(i??``).split(`/`);try{if(!o&&this.flowType===`pkce`)throw new _i;let{data:t,error:n}=await L(this.fetch,`POST`,`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:o},xform:Ta});if(await oa(this.storage,this.storageKey,a),n)throw n;if(!t||!t.session||!t.user){let e=new fi;return this._returnResult({data:{user:null,session:null,redirectType:null},error:e})}return t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers(s===`recovery`?`PASSWORD_RECOVERY`:`SIGNED_IN`,t.session)),this._returnResult({data:Object.assign(Object.assign({},t),{redirectType:s??null}),error:n})}catch(e){if(await oa(this.storage,this.storageKey,a),N(e))return this._returnResult({data:{user:null,session:null,redirectType:null},error:e});throw e}}async signInWithIdToken(e){try{let{options:t,provider:n,token:r,access_token:i,nonce:a}=e,{data:o,error:s}=await L(this.fetch,`POST`,`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:n,id_token:r,access_token:i,nonce:a,gotrue_meta_security:{captcha_token:t?.captchaToken}},xform:Ta});if(s)return this._returnResult({data:{user:null,session:null},error:s});if(!o||!o.session||!o.user){let e=new fi;return this._returnResult({data:{user:null,session:null},error:e})}return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers(`SIGNED_IN`,o.session)),this._returnResult({data:o,error:s})}catch(e){if(N(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithOtp(e){let t=null;try{if(`email`in e){let{email:n,options:r}=e,i=null,a=null;this.flowType===`pkce`&&([i,a,t]=await this._getCodeChallengeAndMethod());let{error:o}=await L(this.fetch,`POST`,`${this.url}/otp`,{headers:this.headers,body:{email:n,data:r?.data??{},create_user:r?.shouldCreateUser??!0,gotrue_meta_security:{captcha_token:r?.captchaToken},code_challenge:i,code_challenge_method:a},redirectTo:this._maybeAppendFlowIdToRedirect(r?.emailRedirectTo,t)});return this._returnResult({data:{user:null,session:null},error:o})}if(`phone`in e){let{phone:t,options:n}=e,{data:r,error:i}=await L(this.fetch,`POST`,`${this.url}/otp`,{headers:this.headers,body:{phone:t,data:n?.data??{},create_user:n?.shouldCreateUser??!0,gotrue_meta_security:{captcha_token:n?.captchaToken},channel:n?.channel??`sms`}});return this._returnResult({data:{user:null,session:null,messageId:r?.message_id},error:i})}throw new pi(`You must provide either an email or phone number.`)}catch(e){if(await oa(this.storage,this.storageKey,t),N(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async verifyOtp(e){try{let t,n;`options`in e&&(t=e.options?.redirectTo,n=e.options?.captchaToken);let{data:r,error:i}=await L(this.fetch,`POST`,`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:n}}),redirectTo:t,xform:Ta});if(i)throw i;if(!r)throw Error(`An error occurred on token verification.`);let a=r.session,o=r.user;return a?.access_token&&(await this._saveSession(a),await this._notifyAllSubscribers(e.type==`recovery`?`PASSWORD_RECOVERY`:`SIGNED_IN`,a)),this._returnResult({data:{user:o,session:a},error:null})}catch(e){if(N(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithSSO(e){let t=null;try{let n=null,r=null;this.flowType===`pkce`&&([n,r,t]=await this._getCodeChallengeAndMethod());let i=await L(this.fetch,`POST`,`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},`providerId`in e?{provider_id:e.providerId}:null),`domain`in e?{domain:e.domain}:null),{redirect_to:this._maybeAppendFlowIdToRedirect(e.options?.redirectTo,t)}),e?.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:n,code_challenge_method:r}),headers:this.headers,xform:Oa});return i.data?.url&&P()&&!e.options?.skipBrowserRedirect&&window.location.assign(i.data.url),this._returnResult(i)}catch(e){if(await oa(this.storage,this.storageKey,t),N(e))return this._returnResult({data:null,error:e});throw e}}async reauthenticate(){return await this.initializePromise,this.lock==null?await this._reauthenticate():await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;if(n)throw n;if(!t)throw new ui;let{error:r}=await L(this.fetch,`GET`,`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return this._returnResult({data:{user:null,session:null},error:r})})}catch(e){if(N(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){let t=null;try{let n=`${this.url}/resend`;if(`email`in e){let{email:r,type:i,options:a}=e,o=null,s=null;this.flowType===`pkce`&&([o,s,t]=await this._getCodeChallengeAndMethod());let{error:c}=await L(this.fetch,`POST`,n,{headers:this.headers,body:{email:r,type:i,gotrue_meta_security:{captcha_token:a?.captchaToken},code_challenge:o,code_challenge_method:s},redirectTo:this._maybeAppendFlowIdToRedirect(a?.emailRedirectTo,t)});return c&&await oa(this.storage,this.storageKey,t),this._returnResult({data:{user:null,session:null},error:c})}if(`phone`in e){let{phone:t,type:r,options:i}=e,{data:a,error:o}=await L(this.fetch,`POST`,n,{headers:this.headers,body:{phone:t,type:r,gotrue_meta_security:{captcha_token:i?.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:a?.message_id},error:o})}throw new pi(`You must provide either an email or phone number and a type`)}catch(e){if(await oa(this.storage,this.storageKey,t),N(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async getSession(){return await this.initializePromise,this.lock==null?await this._useSession(async e=>e):await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async e=>e))}async _acquireLock(e,t){this._debug(`#_acquireLock`,`begin`,e);try{if(this.lockAcquired){let e=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),n=(async()=>(await e,await t()))();return this.pendingInLock.push((async()=>{try{await n}catch{}})()),n}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug(`#_acquireLock`,`lock acquired for storage key`,this.storageKey);try{this.lockAcquired=!0;let e=t();for(this.pendingInLock.push((async()=>{try{await e}catch{}})()),await e;this.pendingInLock.length;){let e=[...this.pendingInLock];await Promise.all(e),this.pendingInLock.splice(0,e.length)}return await e}finally{this._debug(`#_acquireLock`,`lock released for storage key`,this.storageKey),this.lockAcquired=!1}})}finally{this._debug(`#_acquireLock`,`end`)}}async _useSession(e){this._debug(`#_useSession`,`begin`);try{return await e(await this.__loadSession())}finally{this._debug(`#_useSession`,`end`)}}async __loadSession(){this._debug(`#__loadSession()`,`begin`),this.lock!=null&&!this.lockAcquired&&this._debug(`#__loadSession()`,`used outside of an acquired lock!`,Error().stack);try{let e=null,t=await Hi(this.storage,this.storageKey);if(this._debug(`#getSession()`,`session from storage`,t),t!==null&&(this._isValidSession(t)?e=t:(this._debug(`#getSession()`,`session from storage is not valid`),await this._removeSession())),!e)return{data:{session:null},error:null};let n=e.expires_at?e.expires_at*1e3-Date.now()<Xr:!1;if(this._debug(`#__loadSession()`,`session has${n?``:` not`} expired`,`expires_at`,e.expires_at),!n){if(this.userStorage){let t=await Hi(this.userStorage,this.storageKey+`-user`);t?.user?e.user=t.user:e.user=_a()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){let t={value:this.suppressGetSessionWarning};e.user=va(e.user,t),t.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}let{data:r,error:i}=await this._callRefreshToken(e.refresh_token);if(i){if(e.expires_at&&e.expires_at*1e3>Date.now()){let t=await Hi(this.storage,this.storageKey);if(t&&t.refresh_token===e.refresh_token)return this._returnResult({data:{session:e},error:null})}return this._returnResult({data:{session:null},error:i})}return this._returnResult({data:{session:r},error:null})}finally{this._debug(`#__loadSession()`,`end`)}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;let t;return t=this.lock==null?await this._getUser():await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser()),t.data.user&&(this.suppressGetSessionWarning=!0),t}async _getUser(e){try{return e?await L(this.fetch,`GET`,`${this.url}/user`,{headers:this.headers,jwt:e,xform:Da}):await this._useSession(async e=>{let{data:t,error:n}=e;if(n)throw n;return!t.session?.access_token&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new ui}:await L(this.fetch,`GET`,`${this.url}/user`,{headers:this.headers,jwt:t.session?.access_token??void 0,xform:Da})})}catch(e){if(N(e))return di(e)&&await this._removeSession(),this._returnResult({data:{user:null},error:e});throw e}}async updateUser(e,t={}){return await this.initializePromise,this.lock==null?await this._updateUser(e,t):await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){let n=null;try{return await this._useSession(async r=>{let{data:i,error:a}=r;if(a)throw a;if(!i.session)throw new ui;let o=i.session,s=null,c=null;this.flowType===`pkce`&&e.email!=null&&([s,c,n]=await this._getCodeChallengeAndMethod());let{data:l,error:u}=await L(this.fetch,`PUT`,`${this.url}/user`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(t?.emailRedirectTo,n),body:Object.assign(Object.assign({},e),{code_challenge:s,code_challenge_method:c}),jwt:o.access_token,xform:Da});if(u)throw u;return o.user=l.user,await this._saveSession(o),await this._notifyAllSubscribers(`USER_UPDATED`,o),this._returnResult({data:{user:o.user},error:null})})}catch(e){if(await oa(this.storage,this.storageKey,n),N(e))return this._returnResult({data:{user:null},error:e});throw e}}async setSession(e){return await this.initializePromise,this.lock==null?await this._setSession(e):await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new ui;let t=Date.now()/1e3,n=t,r=!0,i=null,{payload:a}=Gi(e.access_token);if(a.exp&&(n=a.exp,r=n<=t),r){let{data:t,error:n}=await this._callRefreshToken(e.refresh_token);if(n)return this._returnResult({data:{user:null,session:null},error:n});if(!t)return{data:{user:null,session:null},error:null};i=t}else{let{data:r,error:a}=await this._getUser(e.access_token);if(a)return this._returnResult({data:{user:null,session:null},error:a});i={access_token:e.access_token,refresh_token:e.refresh_token,user:r.user,token_type:`bearer`,expires_in:n-t,expires_at:n},await this._saveSession(i),await this._notifyAllSubscribers(`SIGNED_IN`,i)}return this._returnResult({data:{user:i.user,session:i},error:null})}catch(e){if(N(e))return this._returnResult({data:{session:null,user:null},error:e});throw e}}async refreshSession(e){return await this.initializePromise,this.lock==null?await this._refreshSession(e):await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{if(!e){let{data:n,error:r}=t;if(r)throw r;e=n.session??void 0}if(!e?.refresh_token)throw new ui;let{data:n,error:r}=await this._callRefreshToken(e.refresh_token);return r?this._returnResult({data:{user:null,session:null},error:r}):n?this._returnResult({data:{user:n.user,session:n},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(e){if(N(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async _getSessionFromURL(e,t){try{if(!P())throw new mi(`No browser detected.`);if(e.error||e.error_description||e.error_code)throw new mi(e.error_description||`Error in URL with unspecified error_description`,{error:e.error||`unspecified_error`,code:e.error_code||`unspecified_code`});switch(t){case`implicit`:if(this.flowType===`pkce`)throw new gi(`Not a valid PKCE flow url.`);break;case`pkce`:if(this.flowType===`implicit`)throw new mi(`Not a valid implicit grant flow url.`)}if(t===`pkce`){if(this._debug(`#_initialize()`,`begin`,`is PKCE flow`,!0),!e.code)throw new gi(`No code detected.`);let{data:t,error:n}=await this._exchangeCodeForSession(e.code,{flowId:e[ii]});if(n)throw n;let r=new URL(window.location.href);return r.searchParams.delete(`code`),r.searchParams.delete(ii),window.history.replaceState(window.history.state,``,r.toString()),{data:{session:t.session,redirectType:t.redirectType??null},error:null}}let{provider_token:n,provider_refresh_token:r,access_token:i,refresh_token:a,expires_in:o,expires_at:s,token_type:c}=e;if(!i||!o||!a||!c)throw new mi(`No session defined in URL`);let l=Math.round(Date.now()/1e3),u=parseInt(o),d=l+u;s&&(d=parseInt(s));let f=d-l;f*1e3<=3e4&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${f}s, should have been closer to ${u}s`);let p=d-u;l-p>=120?console.warn(`@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale`,p,d,l):l-p<0&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew`,p,d,l);let{data:m,error:h}=await this._getUser(i);if(h)throw h;let g={provider_token:n,provider_refresh_token:r,access_token:i,expires_in:u,expires_at:d,refresh_token:a,token_type:c,user:m.user};return window.location.hash=``,this._debug(`#_getSessionFromURL()`,`clearing window.location.hash`),this._returnResult({data:{session:g,redirectType:e.type},error:null})}catch(e){if(N(e))return this._returnResult({data:{session:null,redirectType:null},error:e});throw e}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl==`function`?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error||e.error_description||e.error_code)}async _isPKCECallback(e){if(!e.code)return!1;let t=$i(e[ii]);return t&&await Hi(this.storage,ta(this.storageKey,t))?!0:!!await Hi(this.storage,`${this.storageKey}-code-verifier`)}async signOut(e={scope:`global`}){return await this.initializePromise,this.lock==null?await this._signOut(e):await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:`global`}){return await this._useSession(async t=>{let n=async()=>{await this._removeSession()},{data:r,error:i}=t;if(i&&!di(i))return this._returnResult({error:i});let a=r.session?.access_token;if(a){let{error:t}=await this.admin.signOut(a,e);if(t&&!(si(t)&&(t.status===404||t.status===401||t.status===403)||di(t)))return e!==`others`&&await n(),this._returnResult({error:t})}return e!==`others`&&await n(),this._returnResult({error:null})})}onAuthStateChange(e){let t=Li(),n={id:t,callback:e,unsubscribe:()=>{this._debug(`#unsubscribe()`,`state change callback with id removed`,t),this.stateChangeEmitters.delete(t)}};return this._debug(`#onAuthStateChange()`,`registered callback with id`,t),this.stateChangeEmitters.set(t,n),(async()=>{await this.initializePromise,this.lock==null?await this._emitInitialSession(t):await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(t)})})(),{data:{subscription:n}}}async _emitInitialSession(e){return await this._useSession(async t=>{try{let{data:{session:n},error:r}=t;if(r)throw r;await this.stateChangeEmitters.get(e)?.callback(`INITIAL_SESSION`,n),this._debug(`INITIAL_SESSION`,`callback id`,e,`session`,n)}catch(t){await this.stateChangeEmitters.get(e)?.callback(`INITIAL_SESSION`,null),this._debug(`INITIAL_SESSION`,`callback id`,e,`error`,t),di(t)||yi(t)||si(t)&&(t.code===`refresh_token_not_found`||t.code===`refresh_token_already_used`||t.code===`session_expired`)?console.warn(t):console.error(t)}})}async resetPasswordForEmail(e,t={}){let n=null,r=null,i=null;this.flowType===`pkce`&&([n,r,i]=await this._getCodeChallengeAndMethod(!0));try{return await L(this.fetch,`POST`,`${this.url}/recover`,{body:{email:e,code_challenge:n,code_challenge_method:r,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(t.redirectTo,i)})}catch(e){if(await oa(this.storage,this.storageKey,i),N(e))return this._returnResult({data:null,error:e});throw e}}async getUserIdentities(){try{let{data:e,error:t}=await this.getUser();if(t)throw t;return this._returnResult({data:{identities:e.user.identities??[]},error:null})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}async linkIdentity(e){return`token`in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){let t=null;try{let{data:n,error:r}=await this._useSession(async n=>{let{data:r,error:i}=n;if(i)throw i;let{url:a,flowId:o}=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:e.options?.redirectTo,scopes:e.options?.scopes,queryParams:e.options?.queryParams,skipBrowserRedirect:!0});return t=o,await L(this.fetch,`GET`,a,{headers:this.headers,jwt:r.session?.access_token??void 0})});if(r)throw r;return P()&&!e.options?.skipBrowserRedirect&&window.location.assign(n?.url),this._returnResult({data:{provider:e.provider,url:n?.url,flowId:t},error:null})}catch(n){if(N(n))return this._returnResult({data:{provider:e.provider,url:null,flowId:t},error:n});throw n}}async linkIdentityIdToken(e){return await this._useSession(async t=>{try{let{error:n,data:{session:r}}=t;if(n)throw n;let{options:i,provider:a,token:o,access_token:s,nonce:c}=e,{data:l,error:u}=await L(this.fetch,`POST`,`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:r?.access_token??void 0,body:{provider:a,id_token:o,access_token:s,nonce:c,link_identity:!0,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Ta});return u?this._returnResult({data:{user:null,session:null},error:u}):!l||!l.session||!l.user?this._returnResult({data:{user:null,session:null},error:new fi}):(l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers(`USER_UPDATED`,l.session)),this._returnResult({data:l,error:u}))}catch(e){if(await oa(this.storage,this.storageKey,null),N(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}})}async unlinkIdentity(e){try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)throw r;return await L(this.fetch,`DELETE`,`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:n.session?.access_token??void 0})})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}async _refreshAccessToken(e){let t=`#_refreshAccessToken()`;this._debug(t,`begin`);try{let n=Date.now();return await qi(async n=>(n>0&&await Ki(200*2**(n-1)),this._debug(t,`refreshing attempt`,n),await L(this.fetch,`POST`,`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:Ta})),(e,t)=>{let r=200*2**e;return t&&yi(t)&&Date.now()+r-n<3e4})}catch(e){if(this._debug(t,`error`,e),N(e))return this._returnResult({data:{session:null,user:null},error:e});throw e}finally{this._debug(t,`end`)}}_isValidSession(e){return typeof e==`object`&&!!e&&`access_token`in e&&`refresh_token`in e&&`expires_at`in e}async _handleProviderSignIn(e,t){let{url:n,flowId:r}=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug(`#_handleProviderSignIn()`,`provider`,e,`options`,t,`url`,n),P()&&!t.skipBrowserRedirect&&window.location.assign(n),{data:{provider:e,url:n,flowId:r},error:null}}async _recoverAndRefresh(){let e=`#_recoverAndRefresh()`;this._debug(e,`begin`);try{let t=await Hi(this.storage,this.storageKey);if(t&&this.userStorage){let e=await Hi(this.userStorage,this.storageKey+`-user`);!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!e&&(e={user:t.user},await Vi(this.userStorage,this.storageKey+`-user`,e)),t.user=e?.user??_a()}else if(t&&!t.user&&!t.user){let e=await Hi(this.storage,this.storageKey+`-user`);e&&e?.user?(t.user=e.user,await Ui(this.storage,this.storageKey+`-user`),await Vi(this.storage,this.storageKey,t)):t.user=_a()}if(this._debug(e,`session from storage`,t),!this._isValidSession(t)){this._debug(e,`session is not valid`),t!==null&&await this._removeSession();return}let n=(t.expires_at??1/0)*1e3-Date.now()<Xr;if(this._debug(e,`session has${n?``:` not`} expired with margin of ${Xr}s`),n){if(this.autoRefreshToken&&t.refresh_token){let{error:n}=await this._callRefreshToken(t.refresh_token);n&&(xi(n)?this._debug(e,`refresh discarded by commit guard`,n):this._debug(e,`refresh failed`,n))}}else if(t.user&&t.user.__isUserNotAvailableProxy===!0)try{let{data:n,error:r}=await this._getUser(t.access_token);!r&&n?.user?(t.user=n.user,await this._saveSession(t),await this._notifyAllSubscribers(`SIGNED_IN`,t)):this._debug(e,`could not get user data, skipping SIGNED_IN notification`)}catch(t){console.error(`Error getting user data:`,t),this._debug(e,`error getting user data, skipping SIGNED_IN notification`,t)}else await this._notifyAllSubscribers(`SIGNED_IN`,t)}catch(t){this._debug(e,`error`,t),yi(t)?console.warn(t):console.error(t);return}finally{this._debug(e,`end`)}}async _callRefreshToken(e){var t,n;if(!e)throw new ui;if(this.refreshingDeferred)return this.refreshingDeferred.promise;if(this.lastRefreshFailure&&this.lastRefreshFailure.refreshToken===e&&Date.now()<this.lastRefreshFailure.expiresAt)return this._debug(`#_callRefreshToken()`,`returning cached failure (cooldown active)`),this.lastRefreshFailure.result;let r=`#_callRefreshToken()`;this._debug(r,`begin`);try{this.refreshingDeferred=new Wi,this.refreshingDeferred.promise.then(void 0,()=>{});let t=await Hi(this.storage,this.storageKey),{data:n,error:i}=await this._refreshAccessToken(e);if(i)throw i;if(!n.session)throw new ui;let a=await Hi(this.storage,this.storageKey);if(t!==null&&(a===null||a.refresh_token!==t.refresh_token)){this._debug(r,`commit guard: storage changed since refresh started, discarding rotated tokens`,{startedWith:`present`,nowHolds:a?`replaced`:`cleared`});let e={data:null,error:new bi};return this.refreshingDeferred.resolve(e),e}let o=this._sessionRemovalEpoch;if(await this._saveSession(n.session),this._sessionRemovalEpoch!==o){this._debug(r,`commit guard (post-save): _removeSession ran during _saveSession, undoing write`),await Ui(this.storage,this.storageKey),this.userStorage&&await Ui(this.userStorage,this.storageKey+`-user`);let e={data:null,error:new bi};return this.refreshingDeferred.resolve(e),e}await this._notifyAllSubscribers(`TOKEN_REFRESHED`,n.session);let s={data:n.session,error:null};return this.lastRefreshFailure=null,this.refreshingDeferred.resolve(s),s}catch(i){if(this._debug(r,`error`,i),N(i)){let n={data:null,error:i};if(!yi(i)){let e=await Hi(this.storage,this.storageKey);e?.expires_at&&e.expires_at*1e3>Date.now()?this._debug(r,`proactive refresh failed, access token still valid — preserving session`):await this._removeSession()}return this.lastRefreshFailure={refreshToken:e,result:n,expiresAt:Date.now()+Zr},(t=this.refreshingDeferred)==null||t.resolve(n),n}throw(n=this.refreshingDeferred)==null||n.reject(i),i}finally{this.refreshingDeferred=null,this._debug(r,`end`)}}async _notifyAllSubscribers(e,t,n=!0){if(this._pendingInitNotifications!==null&&n){this._pendingInitNotifications.push({event:e,session:t,broadcast:n});return}let r=`#_notifyAllSubscribers(${e})`;this._debug(r,`begin`,t,`broadcast = ${n}`);try{this.broadcastChannel&&n&&this.broadcastChannel.postMessage({event:e,session:t});let r=[],i=Array.from(this.stateChangeEmitters.values()).map(async n=>{try{await n.callback(e,t)}catch(e){r.push(e)}});if(await Promise.all(i),r.length>0){for(let e=0;e<r.length;e+=1)console.error(r[e]);throw r[0]}}finally{this._debug(r,`end`)}}async _saveSession(e){this._debug(`#_saveSession()`,e),this.suppressGetSessionWarning=!0;let t=Object.assign({},e),n=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!n&&t.user&&await Vi(this.userStorage,this.storageKey+`-user`,{user:t.user});let e=Object.assign({},t);delete e.user;let r=ya(e);await Vi(this.storage,this.storageKey,r)}else{let e=ya(t);await Vi(this.storage,this.storageKey,e)}}async _removeSession(){this._sessionRemovalEpoch+=1,this._debug(`#_removeSession()`),this.lastRefreshFailure=null,this.suppressGetSessionWarning=!1,await Ui(this.storage,this.storageKey),await sa(this.storage,this.storageKey),await Ui(this.storage,this.storageKey+`-user`),this.userStorage&&await Ui(this.userStorage,this.storageKey+`-user`),await this._notifyAllSubscribers(`SIGNED_OUT`,null)}_removeVisibilityChangedCallback(){this._debug(`#_removeVisibilityChangedCallback()`);let e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&P()&&window!=null&&window.removeEventListener&&window.removeEventListener(`visibilitychange`,e)}catch(e){console.error(`removing visibilitychange callback failed`,e)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug(`#_startAutoRefresh()`);let e=setInterval(()=>this._autoRefreshTokenTick(),Yr);this.autoRefreshTicker=e,e&&typeof e==`object`&&typeof e.unref==`function`?e.unref():typeof Deno<`u`&&typeof Deno.unrefTimer==`function`&&Deno.unrefTimer(e);let t=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=t,t&&typeof t==`object`&&typeof t.unref==`function`?t.unref():typeof Deno<`u`&&typeof Deno.unrefTimer==`function`&&Deno.unrefTimer(t)}async _stopAutoRefresh(){this._debug(`#_stopAutoRefresh()`);let e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);let t=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,t&&clearTimeout(t)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async dispose(){var e;this._removeVisibilityChangedCallback(),await this._stopAutoRefresh(),(e=this.broadcastChannel)==null||e.close(),this.broadcastChannel=null,this.stateChangeEmitters.clear()}async _autoRefreshTokenTick(){if(this._debug(`#_autoRefreshTokenTick()`,`begin`),this.lock!=null){try{await this._acquireLock(0,async()=>{try{let e=Date.now();try{return await this._useSession(async t=>{let{data:{session:n}}=t;if(!n||!n.refresh_token||!n.expires_at){this._debug(`#_autoRefreshTokenTick()`,`no session`);return}let r=Math.floor((n.expires_at*1e3-e)/Yr);this._debug(`#_autoRefreshTokenTick()`,`access token expires in ${r} ticks, a tick lasts ${Yr}ms, refresh threshold is 3 ticks`),r<=3&&await this._callRefreshToken(n.refresh_token)})}catch(e){console.error(`Auto refresh tick failed with error. This is likely a transient error.`,e)}}finally{this._debug(`#_autoRefreshTokenTick()`,`end`)}})}catch(e){if(e instanceof Fa)this._debug(`auto refresh token tick lock not available`);else throw e}return}if(this.refreshingDeferred!==null){this._debug(`#_autoRefreshTokenTick()`,`refresh already in flight, skipping`);return}try{let e=Date.now();try{await this._useSession(async t=>{let{data:{session:n}}=t;if(!n||!n.refresh_token||!n.expires_at){this._debug(`#_autoRefreshTokenTick()`,`no session`);return}let r=Math.floor((n.expires_at*1e3-e)/Yr);this._debug(`#_autoRefreshTokenTick()`,`access token expires in ${r} ticks, a tick lasts ${Yr}ms, refresh threshold is 3 ticks`),r<=3&&await this._callRefreshToken(n.refresh_token)})}catch(e){console.error(`Auto refresh tick failed with error. This is likely a transient error.`,e)}}finally{this._debug(`#_autoRefreshTokenTick()`,`end`)}}async _handleVisibilityChange(){if(this._debug(`#_handleVisibilityChange()`),!P()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug(`#visibilityChangedCallback`,`error`,e)}},window==null||window.addEventListener(`visibilitychange`,this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error(`_handleVisibilityChange`,e)}}async _onVisibilityChanged(e){let t=`#_onVisibilityChanged(${e})`;if(this._debug(t,`visibilityState`,document.visibilityState),document.visibilityState===`visible`){if(this.autoRefreshToken&&this._startAutoRefresh(),!e){if(await this.initializePromise,this.lock!=null)await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!==`visible`){this._debug(t,`acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting`);return}await this._recoverAndRefresh()});else{if(document.visibilityState!==`visible`){this._debug(t,`visibilityState is no longer visible, skipping recovery`);return}await this._recoverAndRefresh()}}}else document.visibilityState===`hidden`&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,n){let r=n?.redirectTo,i=null,a=null,o=null;this.flowType===`pkce`&&([i,a,o]=await this._getCodeChallengeAndMethod(),r=this._maybeAppendFlowIdToRedirect(r,o));let s=[`provider=${encodeURIComponent(t)}`];if(r&&s.push(`redirect_to=${encodeURIComponent(r)}`),n?.scopes&&s.push(`scopes=${encodeURIComponent(n.scopes)}`),i!=null&&a!=null){let e=new URLSearchParams({code_challenge:`${encodeURIComponent(i)}`,code_challenge_method:`${encodeURIComponent(a)}`});s.push(e.toString())}if(n?.queryParams){let e=new URLSearchParams(n.queryParams);s.push(e.toString())}return n?.skipBrowserRedirect&&s.push(`skip_http_redirect=${n.skipBrowserRedirect}`),{url:`${e}?${s.join(`&`)}`,flowId:o}}_maybeAppendFlowIdToRedirect(e,t){return!e||!t||!this.experimental.appendPkceFlowIdToRedirects?e??void 0:ca(e,t)}async _getCodeChallengeAndMethod(e=!1){return la(this.storage,this.storageKey,e,e=>this._debug(`#_getCodeChallengeAndMethod()`,`evicted oldest pending PKCE verifier slot`,e))}async _unenroll(e){try{return await this._useSession(async t=>{let{data:n,error:r}=t;return r?this._returnResult({data:null,error:r}):await L(this.fetch,`DELETE`,`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:n?.session?.access_token})})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}async _enroll(e){try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let i=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType===`phone`?{phone:e.phone}:e.factorType===`totp`?{issuer:e.issuer}:{}),{data:a,error:o}=await L(this.fetch,`POST`,`${this.url}/factors`,{body:i,headers:this.headers,jwt:n?.session?.access_token});return o?this._returnResult({data:null,error:o}):(e.factorType===`totp`&&a.type===`totp`&&a?.totp?.qr_code&&(a.totp.qr_code=`data:image/svg+xml;utf-8,${a.totp.qr_code}`),this._returnResult({data:a,error:null}))})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}async _verify(e){let t=async()=>{try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let i=Object.assign({challenge_id:e.challengeId},`webauthn`in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type===`create`?Ja(e.webauthn.credential_response):Ya(e.webauthn.credential_response)})}:{code:e.code}),{data:a,error:o}=await L(this.fetch,`POST`,`${this.url}/factors/${e.factorId}/verify`,{body:i,headers:this.headers,jwt:n?.session?.access_token});return o?this._returnResult({data:null,error:o}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+a.expires_in},a)),await this._notifyAllSubscribers(`MFA_CHALLENGE_VERIFIED`,a),this._returnResult({data:a,error:o}))})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}};return this.lock==null?t():this._acquireLock(this.lockAcquireTimeout,t)}async _challenge(e){let t=async()=>{try{return await this._useSession(async t=>{let{data:n,error:r}=t;if(r)return this._returnResult({data:null,error:r});let i=await L(this.fetch,`POST`,`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:n?.session?.access_token});if(i.error)return i;let{data:a}=i;if(a.type!==`webauthn`)return{data:a,error:null};switch(a.webauthn.type){case`create`:return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:Ka(a.webauthn.credential_options.publicKey)})})}),error:null};case`request`:return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:qa(a.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}};return this.lock==null?t():this._acquireLock(this.lockAcquireTimeout,t)}async _challengeAndVerify(e){let{data:t,error:n}=await this._challenge({factorId:e.factorId});return n?this._returnResult({data:null,error:n}):await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){let{data:{user:e},error:t}=await this.getUser();if(t)return{data:null,error:t};let n={all:[],phone:[],totp:[],webauthn:[]};for(let t of e?.factors??[])n.all.push(t),t.status===`verified`&&n[t.factor_type].push(t);return{data:n,error:null}}async _getAuthenticatorAssuranceLevel(e){if(e)try{let{payload:t}=Gi(e),n=null;t.aal&&(n=t.aal);let r=n,{data:{user:i},error:a}=await this.getUser(e);if(a)return this._returnResult({data:null,error:a});((i?.factors)?.filter(e=>e.status===`verified`)??[]).length>0&&(r=`aal2`);let o=t.amr||[];return{data:{currentLevel:n,nextLevel:r,currentAuthenticationMethods:o},error:null}}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}let{data:{session:t},error:n}=await this.getSession();if(n)return this._returnResult({data:null,error:n});if(!t)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};let{payload:r}=Gi(t.access_token),i=null;r.aal&&(i=r.aal);let a=i;(t.user.factors?.filter(e=>e.status===`verified`)??[]).length>0&&(a=`aal2`);let o=r.amr||[];return{data:{currentLevel:i,nextLevel:a,currentAuthenticationMethods:o},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;return r?this._returnResult({data:null,error:r}):n?await L(this.fetch,`GET`,`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:n.access_token,xform:e=>({data:e,error:null})}):this._returnResult({data:null,error:new ui})})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}async _approveAuthorization(e,t){try{return await this._useSession(async n=>{let{data:{session:r},error:i}=n;if(i)return this._returnResult({data:null,error:i});if(!r)return this._returnResult({data:null,error:new ui});let a=await L(this.fetch,`POST`,`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:`approve`},xform:e=>({data:e,error:null})});return a.data&&a.data.redirect_url&&P()&&!t?.skipBrowserRedirect&&window.location.assign(a.data.redirect_url),a})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}async _denyAuthorization(e,t){try{return await this._useSession(async n=>{let{data:{session:r},error:i}=n;if(i)return this._returnResult({data:null,error:i});if(!r)return this._returnResult({data:null,error:new ui});let a=await L(this.fetch,`POST`,`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:`deny`},xform:e=>({data:e,error:null})});return a.data&&a.data.redirect_url&&P()&&!t?.skipBrowserRedirect&&window.location.assign(a.data.redirect_url),a})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}async _listOAuthGrants(){try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;return n?this._returnResult({data:null,error:n}):t?await L(this.fetch,`GET`,`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:t.access_token,xform:e=>({data:e,error:null})}):this._returnResult({data:null,error:new ui})})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;return r?this._returnResult({data:null,error:r}):n?(await L(this.fetch,`DELETE`,`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:n.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new ui})})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}async fetchJwk(e,t={keys:[]}){let n=t.keys.find(t=>t.kid===e);if(n)return n;let r=Date.now();if(n=this.jwks.keys.find(t=>t.kid===e),n&&this.jwks_cached_at+6e5>r)return n;let{data:i,error:a}=await L(this.fetch,`GET`,`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(a)throw a;return!i.keys||i.keys.length===0||(this.jwks=i,this.jwks_cached_at=r,n=i.keys.find(t=>t.kid===e),!n)?null:n}async getClaims(e,t={}){try{let n=e;if(!n){let{data:e,error:t}=await this.getSession();if(t||!e.session)return this._returnResult({data:null,error:t});n=e.session.access_token}let{header:r,payload:i,signature:a,raw:{header:o,payload:s}}=Gi(n);if(!t?.allowExpired)try{fa(i.exp)}catch(e){throw new Ci(e instanceof Error?e.message:`JWT validation failed`)}let c=!r.alg||r.alg.startsWith(`HS`)||!r.kid||!(`crypto`in globalThis&&`subtle`in globalThis.crypto)?null:await this.fetchJwk(r.kid,t?.keys?{keys:t.keys}:t?.jwks);if(!c){let{error:e}=await this.getUser(n);if(e)throw e;return{data:{claims:i,header:r,signature:a},error:null}}let l=pa(r.alg),u=await crypto.subtle.importKey(`jwk`,c,l,!0,[`verify`]);if(!await crypto.subtle.verify(l,u,a,Pi(`${o}.${s}`)))throw new Ci(`Invalid JWT signature`);return{data:{claims:i,header:r,signature:a},error:null}}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}async signInWithPasskey(e){ga(this.experimental);try{if(!Za())return this._returnResult({data:null,error:new ci(`Browser does not support WebAuthn`,null)});let{data:t,error:n}=await this._startPasskeyAuthentication({options:{captchaToken:e?.options?.captchaToken}});if(n||!t)return this._returnResult({data:null,error:n});let{data:r,error:i}=await $a({publicKey:qa(t.options),signal:e?.options?.signal??Ga.createNewAbortSignal()});if(i||!r)return this._returnResult({data:null,error:i??new ci(`WebAuthn ceremony failed`,null)});let a=Ya(r);return this._verifyPasskeyAuthentication({challengeId:t.challenge_id,credential:a})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}async registerPasskey(e){ga(this.experimental);try{if(!Za())return this._returnResult({data:null,error:new ci(`Browser does not support WebAuthn`,null)});let{data:t,error:n}=await this._startPasskeyRegistration();if(n||!t)return this._returnResult({data:null,error:n});let{data:r,error:i}=await Qa({publicKey:Ka(t.options),signal:e?.options?.signal??Ga.createNewAbortSignal()});if(i||!r)return this._returnResult({data:null,error:i??new ci(`WebAuthn ceremony failed`,null)});let a=Ja(r);return this._verifyPasskeyRegistration({challengeId:t.challenge_id,credential:a})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}async _startPasskeyRegistration(){ga(this.experimental);try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;if(n)return this._returnResult({data:null,error:n});if(!t)return this._returnResult({data:null,error:new ui});let{data:r,error:i}=await L(this.fetch,`POST`,`${this.url}/passkeys/registration/options`,{headers:this.headers,jwt:t.access_token,body:{}});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyRegistration(e){ga(this.experimental);try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new ui});let{data:i,error:a}=await L(this.fetch,`POST`,`${this.url}/passkeys/registration/verify`,{headers:this.headers,jwt:n.access_token,body:{challenge_id:e.challengeId,credential:e.credential}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:i,error:null})})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}async _startPasskeyAuthentication(e){ga(this.experimental);try{let{data:t,error:n}=await L(this.fetch,`POST`,`${this.url}/passkeys/authentication/options`,{headers:this.headers,body:{gotrue_meta_security:{captcha_token:e?.options?.captchaToken}}});return n?this._returnResult({data:null,error:n}):this._returnResult({data:t,error:null})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyAuthentication(e){ga(this.experimental);try{let{data:t,error:n}=await L(this.fetch,`POST`,`${this.url}/passkeys/authentication/verify`,{headers:this.headers,body:{challenge_id:e.challengeId,credential:e.credential},xform:Ta});return n?this._returnResult({data:null,error:n}):(t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers(`SIGNED_IN`,t.session)),this._returnResult({data:t,error:null}))}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}async _listPasskeys(){ga(this.experimental);try{return await this._useSession(async e=>{let{data:{session:t},error:n}=e;if(n)return this._returnResult({data:null,error:n});if(!t)return this._returnResult({data:null,error:new ui});let{data:r,error:i}=await L(this.fetch,`GET`,`${this.url}/passkeys`,{headers:this.headers,jwt:t.access_token,xform:e=>({data:e,error:null})});return i?this._returnResult({data:null,error:i}):this._returnResult({data:r,error:null})})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}async _updatePasskey(e){ga(this.experimental);try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new ui});let{data:i,error:a}=await L(this.fetch,`PATCH`,`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:n.access_token,body:{friendly_name:e.friendlyName}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:i,error:null})})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}async _deletePasskey(e){ga(this.experimental);try{return await this._useSession(async t=>{let{data:{session:n},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new ui});let{error:i}=await L(this.fetch,`DELETE`,`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:n.access_token,noResolveJson:!0});return i?this._returnResult({data:null,error:i}):this._returnResult({data:null,error:null})})}catch(e){if(N(e))return this._returnResult({data:null,error:e});throw e}}};lo.nextInstanceID={};var uo=lo,fo=`2.112.4`,R=``,po;if(typeof Deno<`u`)R=`deno`,po=Deno.version?.deno;else if(typeof document<`u`)R=`web`;else if(typeof navigator<`u`&&navigator.product===`ReactNative`)R=`react-native`;else{var mo;R=`node`;let e=globalThis.process;po=e==null||(mo=e.version)==null?void 0:mo.replace(/^v/,``)}var z=[`runtime=${R}`];po&&z.push(`runtime-version=${po}`);var B={headers:{"X-Client-Info":`supabase-js/${fo}; ${z.join(`; `)}`}},ho={schema:`public`},go={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:`implicit`},_o={},vo={enabled:!1,respectSamplingDecision:!0};function yo(e){if(!e||typeof e!=`string`)return null;let t=e.split(`-`);if(t.length!==4)return null;let[n,r,i,a]=t;if(n.length!==2||r.length!==32||i.length!==16||a.length!==2)return null;let o=/^[0-9a-f]+$/i;return!o.test(n)||!o.test(r)||!o.test(i)||!o.test(a)||r===`00000000000000000000000000000000`||i===`0000000000000000`?null:{version:n,traceId:r,parentId:i,traceFlags:a,isSampled:(parseInt(a,16)&1)==1}}function bo(e,t){if(!e||!t||t.length===0)return!1;let n;if(e instanceof URL)n=e;else try{n=new URL(e)}catch{return!1}for(let e of t)try{if(typeof e==`string`){if(xo(n.hostname,e))return!0}else if(e instanceof RegExp){if(e.test(n.hostname))return!0}else if(typeof e==`function`&&e(n))return!0}catch{continue}return!1}function xo(e,t){if(t===e)return!0;if(t.startsWith(`*.`)){let n=t.slice(2);if(e.endsWith(n)&&(e===n||e.endsWith(`.`+n)))return!0}return!1}function So(e){let t=[];try{let n=new URL(e);t.push(n.hostname)}catch{}return t.push(`*.supabase.co`,`*.supabase.in`),t.push(`localhost`,`127.0.0.1`,`[::1]`),t}function V(e){"@babel/helpers - typeof";return V=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},V(e)}function Co(e,t){if(V(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(V(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function wo(e){var t=Co(e,`string`);return V(t)==`symbol`?t:t+``}function To(e,t,n){return(t=wo(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Eo(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Do(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?Eo(Object(n),!0).forEach(function(t){To(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Eo(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var Oo=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),ko=()=>Headers,Ao=e=>e.startsWith(`sb_publishable_`)||e.startsWith(`sb_secret_`),jo=`sb_temp_`,Mo=new Set,No=e=>{if(!e.startsWith(`sb_`)||Ao(e)||e.startsWith(jo))return;let t=e.match(/^sb_[a-zA-Z0-9]+_/)?.[0]??`unknown`;Mo.has(t)||(Mo.add(t),console.warn(`@supabase/supabase-js: Unrecognized Supabase API key format. The client will proceed and send this key as-is; if you see authentication errors you may need to upgrade @supabase/supabase-js to a version that recognizes this key type.`))},Po=(e,t,n,r,i,a)=>{let o=Oo(r),s=ko(),c=i?.enabled===!0,l=i?.respectSamplingDecision!==!1,u=c?So(t):null,d=!(a?.omitApiKeyAsBearer&&Ao(e));return async(t,r)=>{let i=await n(),a=new s(r?.headers);if(a.has(`apikey`)||a.set(`apikey`,e),!a.has(`Authorization`)){let t=i??(d?e:null);t&&a.set(`Authorization`,`Bearer ${t}`)}if(u){let e=Lo(t,u,l);e&&(e.traceparent&&!a.has(`traceparent`)&&a.set(`traceparent`,e.traceparent),e.tracestate&&!a.has(`tracestate`)&&a.set(`tracestate`,e.tracestate),e.baggage&&!a.has(`baggage`)&&a.set(`baggage`,e.baggage))}return o(t,Do(Do({},r),{},{headers:a}))}},Fo=!1,Io=!1;function Lo(e,t,n){let r=tt();if(!r)return Fo||(Fo=!0,console.warn("@supabase/supabase-js: tracePropagation is enabled but the tracing runtime is not loaded, so trace headers will not be attached. Add `import '@supabase/supabase-js/tracing'` at your application entry point (requires the OpenTelemetry API package to be installed). The CDN/UMD build does not support trace propagation.")),null;if(!bo(typeof e==`string`||e instanceof URL?e:e.url,t))return null;let i=r();if(!i||!i.traceparent){var a;if(i!=null&&(a=i.carrierKeys)!=null&&a.length&&!Io){Io=!0;let e=i.carrierKeys.includes(`sentry-trace`)?" Sentry detected: set `propagateTraceparent: true` in Sentry.init() to emit it.":` Configure your tracing SDK to emit W3C trace context on outgoing requests.`;console.warn(`@supabase/supabase-js: tracePropagation is enabled and a tracing SDK is active, but its propagator wrote [${i.carrierKeys.join(`, `)}] and no W3C traceparent header, so trace headers will not be attached.`+e)}return null}if(n){let e=yo(i.traceparent);if(e&&!e.isSampled)return{traceparent:i.traceparent}}return i}function Ro(e){return typeof e==`boolean`?{enabled:e}:e}function zo(e){return e.endsWith(`/`)?e:e+`/`}function Bo(e,t){let{db:n,auth:r,realtime:i,global:a}=e,{db:o,auth:s,realtime:c,global:l}=t,u=Ro(e.tracePropagation),d=Ro(t.tracePropagation),f={db:Do(Do({},o),n),auth:Do(Do({},s),r),realtime:Do(Do({},c),i),storage:{},global:Do(Do(Do({},l),a),{},{headers:Do(Do({},l?.headers??{}),a?.headers??{})}),tracePropagation:{enabled:u?.enabled??d?.enabled??!1,respectSamplingDecision:u?.respectSamplingDecision??d?.respectSamplingDecision??!0},accessToken:async()=>``};return e.accessToken?f.accessToken=e.accessToken:delete f.accessToken,f}function Vo(e){let t=e?.trim();if(!t)throw Error(`supabaseUrl is required.`);if(!t.match(/^https?:\/\//i))throw Error(`Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.`);try{return new URL(zo(t))}catch{throw Error(`Invalid supabaseUrl: Provided URL is malformed.`)}}var Ho=class extends uo{constructor(e){super(e)}},Uo=class{constructor(e,t,n){this.supabaseUrl=e,this.supabaseKey=t;let r=Vo(e);if(!t)throw Error(`supabaseKey is required.`);No(t),this.realtimeUrl=new URL(`realtime/v1`,r),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace(`http`,`ws`),this.authUrl=new URL(`auth/v1`,r),this.storageUrl=new URL(`storage/v1`,r),this.functionsUrl=new URL(`functions/v1`,r);let i=`sb-${r.hostname.split(`.`)[0]}-auth-token`,a={db:ho,realtime:_o,auth:Do(Do({},go),{},{storageKey:i}),global:B,tracePropagation:vo},o=Bo(n??{},a);this.settings=o,this.storageKey=o.auth.storageKey??``,this.headers=o.global.headers??{},o.accessToken?(this.accessToken=o.accessToken,this.auth=new Proxy({},{get:(e,t)=>{throw Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t)} is not possible`)}})):this.auth=this._initSupabaseAuthClient(o.auth??{},this.headers,o.global.fetch),this.fetch=Po(t,e,this._getSessionToken.bind(this),o.global.fetch,o.tracePropagation),this.functionsFetch=Po(t,e,this._getSessionToken.bind(this),o.global.fetch,o.tracePropagation,{omitApiKeyAsBearer:!0}),this.realtime=this._initRealtimeClient(Do({headers:this.headers,accessToken:this._getAccessToken.bind(this),fetch:this.fetch},o.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(e=>this.realtime.setAuth(e)).catch(e=>console.warn(`Failed to set initial Realtime auth token:`,e)),this.rest=new Ot(new URL(`rest/v1`,r).href,{headers:this.headers,schema:o.db.schema,fetch:this.fetch,timeout:o.db.timeout,urlLengthLimit:o.db.urlLengthLimit,retry:o.db.retry}),this.storage=new qr(this.storageUrl.href,this.headers,this.fetch,n?.storage),o.accessToken||this._listenForAuthEvents()}get functions(){return new ut(this.functionsUrl.href,{headers:this.headers,customFetch:this.functionsFetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},n={head:!1,get:!1,count:void 0}){return this.rest.rpc(e,t,n)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getSessionToken(){var e=this;if(e.accessToken)return await e.accessToken();let{data:t}=await e.auth.getSession();return t.session?.access_token??null}async _getAccessToken(){var e=this;return await e._getSessionToken()??e.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:r,userStorage:i,storageKey:a,flowType:o,lock:s,debug:c,throwOnError:l,experimental:u,lockAcquireTimeout:d,skipAutoInitialize:f},p,m){let h={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Ho({url:this.authUrl.href,headers:Do(Do({},h),p),storageKey:a,autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:r,userStorage:i,flowType:o,lock:s,debug:c,throwOnError:l,experimental:u,fetch:m,lockAcquireTimeout:d,skipAutoInitialize:f,hasCustomAuthorizationHeader:Object.keys(this.headers).some(e=>e.toLowerCase()===`authorization`)})}_initRealtimeClient(e){return new qn(this.realtimeUrl.href,Do(Do({},e),{},{params:Do(Do({},{apikey:this.supabaseKey}),e?.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((e,t)=>{this._handleTokenChanged(e,`CLIENT`,t?.access_token)})}_handleTokenChanged(e,t,n){(e===`TOKEN_REFRESHED`||e===`SIGNED_IN`||e===`INITIAL_SESSION`)&&this.changedAccessToken!==n?(this.changedAccessToken=n,this.realtime.setAuth(n)):e===`SIGNED_OUT`&&(this.realtime.setAuth(),t==`STORAGE`&&this.auth.signOut(),this.changedAccessToken=void 0)}},Wo=(e,t,n)=>new Uo(e,t,n);function Go(){if(typeof window<`u`||globalThis.Deno!==void 0)return!1;let e=globalThis.process;if(!e)return!1;let t=e.version;if(t==null)return!1;let n=t.match(/^v(\d+)\./);return n?parseInt(n[1],10)<=20:!1}Go()&&console.warn(`⚠️  Node.js 20 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 22 or later. For more information, visit: https://github.com/orgs/supabase/discussions/45715`);function Ko(){let e=typeof window<`u`?localStorage.getItem(`orion_supabase_url`):null,t=typeof window<`u`?localStorage.getItem(`orion_supabase_key`):null;return{supabaseUrl:(e||`https://ezcwgyhwotomranbyuyh.supabase.co`).trim(),supabaseAnonKey:(t||`sb_publishable_pFXjN8lwSDq4qYmLWDb56w_2wWjxA43`).trim()}}function qo(){let{supabaseUrl:e,supabaseAnonKey:t}=Ko();if(!e||!t)return null;try{return Wo(e,t)}catch(e){return console.warn(`Supabase initialization warning:`,e),null}}var Jo=qo();function Yo(e,t){typeof window>`u`||(e&&localStorage.setItem(`orion_supabase_url`,e.trim()),t&&localStorage.setItem(`orion_supabase_key`,t.trim()),Jo=qo())}var Xo=`orion_bridge_url`,Zo=`orion_bridge_key`,Qo=`orion_bridge_router_id`,$o=8787;function es(e){if(!e)return null;try{let t=new URL(e.trim());return t.protocol!==`http:`&&t.protocol!==`https:`?null:t.toString().replace(/\/$/,``)}catch{return null}}function ts(e){try{return localStorage.getItem(e)||``}catch{return``}}function ns(){return{url:es(ts(Xo))||es(``)||(typeof window<`u`&&window.location.hostname?`http://${window.location.hostname}:${$o}`:`http://localhost:${$o}`),apiKey:ts(Zo)}}function rs(e,t){try{e.trim()?localStorage.setItem(Xo,es(e)||e.trim()):localStorage.removeItem(Xo),t.trim()?localStorage.setItem(Zo,t.trim()):localStorage.removeItem(Zo)}catch{}}function is(){try{return localStorage.getItem(Qo)||``}catch{return``}}function as(e){try{e.trim()?localStorage.setItem(Qo,e.trim()):localStorage.removeItem(Qo)}catch{}}var os=class extends Error{status;constructor(e,t){super(e),this.status=t}};async function ss(e,{method:t=`GET`,body:n}={}){let{url:r,apiKey:i}=ns(),a;try{a=await fetch(`${r}${e}`,{method:t,headers:{"x-bridge-key":i,...n===void 0?{}:{"Content-Type":`application/json`}},body:n===void 0?void 0:JSON.stringify(n)})}catch{throw new os(`Cannot reach the MikroTik bridge at ${r}`,0)}let o=await a.text().catch(()=>``),s=null;try{s=o?JSON.parse(o):null}catch{}if(!a.ok)throw new os(s&&s.error||`Bridge request failed (HTTP ${a.status})`,a.status);return s}function cs(e){let t=Number(e)||0;return t>=1024**3?`${(t/1024**3).toFixed(1)} GB`:t>=1024**2?`${(t/1024**2).toFixed(1)} MB`:t>=1024?`${(t/1024).toFixed(0)} KB`:`${t} B`}var ls={status:()=>ss(`/health`),syncNow:()=>ss(`/sync`,{method:`POST`}),listSessions:e=>ss(`/sessions/${encodeURIComponent(e)}`),disconnectSession:(e,t)=>ss(`/sessions/${encodeURIComponent(e)}/disconnect`,{method:`POST`,body:{activeId:t}}),routerHealth:e=>ss(`/routers/${encodeURIComponent(e)}/health`),rebootRouter:e=>ss(`/routers/${encodeURIComponent(e)}/reboot`,{method:`POST`}),pingFromRouter:(e,t,n=4)=>ss(`/routers/${encodeURIComponent(e)}/ping`,{method:`POST`,body:{address:t,count:n}}),setCustomerBlocked:(e,t,n)=>ss(`/customers/${encodeURIComponent(e)}/block`,{method:`POST`,body:{address:t,blocked:n}})},us=15e3;function ds(e=us){let[t,n]=(0,h.useState)(null),[r,i]=(0,h.useState)(null),[a,o]=(0,h.useState)([]),[s,c]=(0,h.useState)(null),[l,u]=(0,h.useState)(()=>is()),d=(0,h.useRef)(l);d.current=l;let f=(0,h.useCallback)(e=>{u(e),as(e)},[]),p=(0,h.useCallback)(async()=>{let{url:e}=ns();if(!e)return;try{let e=await ls.status();n(e),c(null)}catch(e){n(null),c(e?.message||`Bridge unreachable`);return}let t=d.current;if(!t){i(null),o([]);return}try{let[e,n]=await Promise.all([ls.routerHealth(t),ls.listSessions(t)]);i(e),o(n.sessions),c(null)}catch(e){c(e?.message||`Router unreachable`)}},[]),m=(0,h.useCallback)(async(e,t)=>{let n=d.current;if(!n)return!1;try{return await ls.disconnectSession(n,e),o(t=>t.filter(t=>t.session_id!==e)),!0}catch(e){return c(e?.message||`Kick failed`),!1}},[]);return(0,h.useEffect)(()=>{let t=!1,n,r=async()=>{await p(),t||(n=window.setTimeout(r,e))};return r(),()=>{t=!0,n&&window.clearTimeout(n)}},[p,e]),{status:t,health:r,sessions:a,lastError:s,routerId:l,setRouterId:f,refresh:p,kick:m}}var fs=`orion_theme`;function ps(){if(typeof window>`u`)return`light`;let e=localStorage.getItem(fs);return e===`light`||e===`dark`?e:window.matchMedia&&window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`}function ms(e){if(typeof document>`u`)return;document.documentElement.setAttribute(`data-theme`,e);let t=document.querySelector(`meta[name="theme-color"]`);t&&t.setAttribute(`content`,e===`dark`?`#121715`:`#f4f6f1`)}function hs(){let[e,t]=(0,h.useState)(ps);return(0,h.useEffect)(()=>{ms(e),localStorage.setItem(fs,e)},[e]),{theme:e,toggleTheme:()=>{t(e=>e===`light`?`dark`:`light`)},setTheme:t}}var gs=`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#f4f6f1" />
    <title id="portalTitleTag">Orion Wi-Fi — Sign in</title>
    <script>
      (function() {
        try {
          var theme = localStorage.getItem('orion_theme');
          if (theme !== 'light' && theme !== 'dark') {
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          }
          document.documentElement.setAttribute('data-theme', theme);
        } catch (e) {}
      })();
    <\/script>
    <link rel="stylesheet" href="portal.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap" />
  </head>
  <body>
    <div class="shell">
      <div class="top-right">
        <button class="link-button" id="themeToggle" type="button">Dark mode</button>
      </div>

      <main class="card">
        <div class="brand">
          <div class="brand-mark" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M8.5 16.43a6 6 0 0 1 7 0"/><path d="M12 20h.01"/></svg>
          </div>
          <span id="brandName">orion<span class="brand-dot">.</span></span>
        </div>

        <!-- STEP 1: sign in / buy -->
        <section id="view-auth">
          <p class="eyebrow">Hotspot access</p>
          <h1 id="authTitle">You're connected — sign in</h1>
          <p class="sub" id="authSub">Enter the voucher code from your receipt, or buy instant access with M-Pesa.</p>

          <div class="mode-switch" role="tablist">
            <button id="tabVoucher" type="button" class="active">Voucher</button>
            <button id="tabBuy" type="button">Buy with M-Pesa</button>
          </div>

          <div id="errorBox" class="status-banner err hidden" role="alert"><i></i><p id="errorMsg"></p></div>

          <form id="voucherForm">
            <label for="code">Voucher code
              <input type="text" id="code" name="code" placeholder="ORN-XXXX-XXXX" autocomplete="off" autocapitalize="characters" spellcheck="false" />
            </label>
            <button class="button primary" type="submit" id="voucherBtn">Connect</button>
            <p class="tiny">Find your code on the receipt printed after payment.</p>
          </form>

          <form id="buyForm" class="hidden">
            <div class="packages-list" id="packagesList"><p class="tiny">Loading packages…</p></div>
            <label for="phone" style="margin-top: 16px">M-Pesa phone number
              <input type="tel" id="phone" name="phone" placeholder="07XX XXX XXX" autocomplete="tel" inputmode="tel" />
            </label>
            <button class="button primary" type="submit" id="buyBtn">Buy &amp; pay via M-Pesa</button>
            <p class="tiny">You'll get an STK push prompt on your phone — enter your PIN to confirm.</p>
          </form>
        </section>

        <!-- STEP 2: payment processing -->
        <section id="view-waiting" class="hidden">
          <p class="eyebrow">M-Pesa</p>
          <h1>Check your phone</h1>
          <p class="sub" id="waitingSub">We've sent a payment prompt to your phone.</p>
          <div class="voucher-hero">
            <p class="eyebrow">Total</p>
            <p class="voucher-code" id="waitingAmount">KSh —</p>
            <p class="voucher-sub" id="waitingPkg"></p>
          </div>
          <button class="button primary" id="cancelWaitBtn" type="button">Cancel</button>
        </section>

        <!-- STEP 3: success -->
        <section id="view-success" class="hidden">
          <p class="eyebrow">Payment received</p>
          <h1>You're almost online</h1>
          <p class="sub">Save this code — it's your Wi-Fi login. Use it on this and any other device in your plan.</p>
          <div class="voucher-hero">
            <p class="eyebrow">Your access code</p>
            <p class="voucher-code" id="voucherCode">—</p>
            <p class="voucher-sub" id="voucherMeta"></p>
          </div>
          <div class="status-banner ok" id="receiptLine"><i></i><p></p></div>
          <button class="button primary" id="startBtn" type="button">Start browsing</button>
          <button class="link-button" id="copyCodeBtn" type="button">Copy code</button>
        </section>
      </main>

      <p class="footer-note" id="footerNote">Powered by Orion Hotspot Billing · Pay via M-Pesa · Support: <span id="supportPhone">0700 000 000</span></p>
    </div>

    <script src="portal.js"><\/script>
  </body>
</html>
`,_s=`/* Orion captive portal — standalone stylesheet.
   Uses the same design tokens as the dashboard (src/styles.css). */

:root {
  --bg: #f4f6f1;
  --ink: #25322f;
  --ink-heading: #192320;
  --muted: #7c8881;
  --muted-light: #a5afa8;
  --muted-dark: #58665e;
  --line: #e5e9e2;
  --card-bg: #ffffff;
  --card-subtle-bg: #fbfcfa;
  --coral: #d36b4d;
  --coral-subtle: #fff0e9;
  --coral-glow: #d36b4d30;
  --green: #34786d;
  --mint: #e4f0e7;
  --badge-bg: #edf2ec;
  --badge-color: #708077;
  --live-pill-bg: #e8f4e9;
  --live-pill-color: #39816a;
  --auth-bg: #f6f8f4;
  --auth-card-bg: #ffffff;
  --auth-border: #e5e9e2;
  --auth-input-border: #d7dfd8;
  --auth-input-bg: #ffffff;
  --danger: #c94a32;
  --danger-subtle: #fde8e4;
  /* Ink used on top of brand-colored fills; overridden by the bridge's
     injected branding style so light brand colors stay readable. */
  --on-brand: #ffffff;
}

[data-theme="dark"] {
  --bg: #0e1412;
  --ink: #e2ede7;
  --ink-heading: #f4faf6;
  --muted: #8e9e96;
  --muted-light: #61736b;
  --muted-dark: #b8c8c0;
  --line: #202d28;
  --card-bg: #151f1b;
  --card-subtle-bg: #111a17;
  --coral: #e27558;
  --coral-subtle: #301f1b;
  --coral-glow: #e2755835;
  --green: #48a192;
  --mint: #1a3229;
  --badge-bg: #1f2e27;
  --badge-color: #9eb5aa;
  --live-pill-bg: #153123;
  --live-pill-color: #5ec896;
  --auth-bg: #0a0f0d;
  --auth-card-bg: #151f1b;
  --auth-border: #23322c;
  --auth-input-border: #273730;
  --auth-input-bg: #101815;
  --danger: #f17862;
  --danger-subtle: #3a1c18;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  min-width: 320px;
  background: var(--bg);
  color: var(--ink);
  font-family: 'DM Sans', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-synthesis: none;
  -webkit-font-smoothing: antialiased;
  transition: background-color 0.25s ease, color 0.25s ease;
}

button, input { font: inherit; }
button { cursor: pointer; }

a { color: var(--green); }

.shell {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 24px 16px 40px;
  background: var(--auth-bg);
  transition: background-color 0.25s ease;
}

.top-right { position: absolute; top: 16px; right: 16px; }

.card {
  width: min(100%, 420px);
  background: var(--auth-card-bg);
  border: 1px solid var(--auth-border);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 22px 60px rgba(38, 55, 48, 0.10);
  transition: background-color 0.25s ease, border-color 0.25s ease;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font: 800 25px Manrope, sans-serif;
  letter-spacing: -1px;
  color: var(--ink-heading);
  justify-content: center;
}

.brand-mark {
  width: 31px;
  height: 31px;
  border-radius: 9px;
  color: var(--on-brand, #fff);
  display: grid;
  place-items: center;
  background: var(--coral);
  flex-shrink: 0;
}

.brand-dot { color: var(--coral); }

.eyebrow {
  color: var(--coral);
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: 10px;
  font-weight: 700;
  margin: 22px 0 6px;
}

h1 {
  font: 800 24px Manrope, sans-serif;
  letter-spacing: -0.8px;
  margin: 0;
  color: var(--ink-heading);
}

.sub {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.5;
  margin: 6px 0 20px;
}

.card label {
  display: grid;
  gap: 8px;
  margin: 0 0 16px;
  font-size: 13px;
  font-weight: 700;
  color: var(--muted-dark);
}

.card input[type="text"], .card input[type="tel"], .card input[type="password"] {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--auth-input-border);
  background: var(--auth-input-bg);
  color: var(--ink);
  border-radius: 10px;
  font-weight: 400;
  outline: none;
  transition: border-color 0.15s ease, background-color 0.25s ease;
}

.card input:focus { border-color: var(--coral); }

input::placeholder { color: var(--muted-light); }

.button {
  border: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 13px;
  font-weight: 700;
  width: 100%;
  transition: all 0.15s ease;
}

.button.primary {
  background: var(--coral);
  color: var(--on-brand, #fff);
  box-shadow: 0 5px 12px var(--coral-glow);
}

.button.primary:hover:not(:disabled) { opacity: 0.94; }
.button:disabled { opacity: 0.6; cursor: not-allowed; }

.link-button {
  border: 0;
  background: transparent;
  color: var(--coral);
  font-weight: 700;
  font-size: 12px;
  padding: 4px 0;
}

.tiny {
  color: var(--muted);
  font-size: 11px;
  margin: 8px 0 0;
}

.mode-switch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  background: var(--card-subtle-bg);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 18px;
}

.mode-switch button {
  border: 0;
  background: transparent;
  border-radius: 7px;
  padding: 9px;
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
  transition: all 0.15s ease;
}

.mode-switch button.active {
  background: var(--card-bg);
  color: var(--ink);
  box-shadow: 0 2px 8px rgba(38, 55, 48, 0.08);
}

.demo-note {
  margin-top: 16px;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--coral-subtle);
  color: var(--coral);
  font-size: 11px;
  line-height: 1.5;
}

.demo-note strong { display: block; margin-bottom: 2px; }

.packages-list { display: grid; gap: 10px; margin-top: 4px; }

.package-card {
  border: 1px solid var(--auth-border);
  background: var(--card-subtle-bg);
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.25s ease;
}

.package-card:hover { border-color: var(--coral); }

.package-card.selected {
  border-color: var(--coral);
  box-shadow: 0 0 0 1px var(--coral), 0 8px 24px rgba(38, 55, 48, 0.08);
  background: var(--card-bg);
}

.package-copy { flex: 1; min-width: 0; }
.package-copy strong { display: block; font-size: 13px; color: var(--ink); }
.package-copy span { display: block; font-size: 11px; color: var(--muted); margin-top: 3px; }

.package-price { text-align: right; }
.package-price strong { font: 800 18px Manrope, sans-serif; color: var(--ink-heading); display: block; }
.package-price span { font-size: 10px; color: var(--muted); display: block; margin-top: 2px; }

.status-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 14px;
}

.status-banner.ok { background: var(--live-pill-bg); color: var(--live-pill-color); }
.status-banner.err { background: var(--danger-subtle); color: var(--danger); }
.status-banner i { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
.status-banner p { margin: 0; }

.voucher-hero {
  background: var(--mint);
  border-radius: 12px;
  padding: 18px;
  text-align: center;
  margin-bottom: 16px;
}

.voucher-hero .eyebrow { margin: 0 0 8px; color: var(--green); }

.voucher-code {
  font: 700 27px Manrope, sans-serif;
  letter-spacing: 3px;
  color: var(--ink-heading);
  margin: 0;
}

.voucher-sub { color: var(--muted); font-size: 11px; margin: 8px 0 0; }

.footer-note {
  max-width: 420px;
  margin: 18px auto 0;
  color: var(--muted-light);
  font-size: 10px;
  text-align: center;
  line-height: 1.6;
}

.hidden { display: none !important; }
`,vs=`// Orion captive portal client logic (no dependencies).
//
// Talks to the bridge's public endpoints with relative URLs so the page works
// whatever IP the router assigns:
//   GET  /packages               -> { packages: [...] }
//   POST /pay                    -> { checkoutRequestId, statusUrl, message }
//   GET  /pay/:checkoutRequestId -> { status, packageName, amount, voucherCode, ... }
//
// Voucher login POSTs username/password to the MikroTik hotspot login handler:
//   - preferred action comes from ?linkloginonly= (the router's own
//     http://<hotspot-ip>/login URL, passed through by the redirector page)
//   - fallback is same-origin "login"
//   - ?dst= is forwarded so MikroTik can land the guest on their target site
//
// When /packages fails (e.g. the page is opened outside the hotspot for a
// demo), the portal falls back to DEMO_PACKAGES and simulates payments and
// voucher logins so the whole flow can be demoed without a router or Daraja.

(function () {
  'use strict'

  // --------------------------------------------------------------------------
  // Theme toggle (same behavior and storage key as the dashboard)
  // --------------------------------------------------------------------------

  var themeToggle = document.getElementById('themeToggle')
  var themeMeta = document.querySelector('meta[name="theme-color"]')
  var THEME_COLORS = { light: '#f4f6f1', dark: '#0e1412' }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme)
    if (themeMeta) themeMeta.setAttribute('content', THEME_COLORS[theme])
    themeToggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode'
    try { localStorage.setItem('orion_theme', theme) } catch (e) { /* private mode */ }
  }

  themeToggle.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme')
    applyTheme(current === 'dark' ? 'light' : 'dark')
  })

  // --------------------------------------------------------------------------
  // Fallback demo data (mirrors the dashboard's seeded packages)
  // --------------------------------------------------------------------------

  var DEMO_PACKAGES = [
    { id: 'demo-1', name: '1 Hour Unlimited Rush', duration: '1 Hour', price_amount: 70, speed_limit: '10 Mbps', device_limit: 1 },
    { id: 'demo-2', name: '24h Day Pass Unlimited', duration: '24 Hours', price_amount: 350, speed_limit: '20 Mbps', device_limit: 1 },
    { id: 'demo-3', name: '7 Days Unlimited Flex', duration: '7 Days', price_amount: 1500, speed_limit: '25 Mbps', device_limit: 1 },
    { id: 'demo-4', name: '30 Days Monthly Unlimited Pro', duration: '30 Days', price_amount: 3500, speed_limit: '30 Mbps', device_limit: 1 },
  ]

  // --------------------------------------------------------------------------
  // Tiny helpers
  // --------------------------------------------------------------------------

  function $(id) { return document.getElementById(id) }

  var els = {
    tabVoucher: $('tabVoucher'),
    tabBuy: $('tabBuy'),
    voucherForm: $('voucherForm'),
    code: $('code'),
    voucherBtn: $('voucherBtn'),
    buyForm: $('buyForm'),
    packagesList: $('packagesList'),
    phone: $('phone'),
    buyBtn: $('buyBtn'),
    errorBox: $('errorBox'),
    errorMsg: $('errorMsg'),
    brandName: $('brandName'),
    authTitle: $('authTitle'),
    authSub: $('authSub'),
    footerNote: $('footerNote'),
    viewAuth: $('view-auth'),
    viewWaiting: $('view-waiting'),
    viewSuccess: $('view-success'),
    waitingAmount: $('waitingAmount'),
    waitingPkg: $('waitingPkg'),
    waitingSub: $('waitingSub'),
    cancelWaitBtn: $('cancelWaitBtn'),
    voucherCode: $('voucherCode'),
    voucherMeta: $('voucherMeta'),
    receiptLine: $('receiptLine'),
    startBtn: $('startBtn'),
    copyCodeBtn: $('copyCodeBtn'),
  }

  var state = {
    packages: [],
    selectedPackageId: null,
    liveMode: true,
    demoPaidAt: null,
    pollTimer: null,
  }

  function showError(message) {
    els.errorMsg.textContent = message
    els.errorBox.classList.remove('hidden')
  }

  function clearError() {
    els.errorBox.classList.add('hidden')
    els.errorMsg.textContent = ''
  }

  function showView(name) {
    els.viewAuth.classList.toggle('hidden', name !== 'auth')
    els.viewWaiting.classList.toggle('hidden', name !== 'waiting')
    els.viewSuccess.classList.toggle('hidden', name !== 'success')
    if (name === 'auth') window.scrollTo(0, 0)
  }

  function setMode(mode) {
    var voucher = mode === 'voucher'
    els.tabVoucher.classList.toggle('active', voucher)
    els.tabBuy.classList.toggle('active', !voucher)
    els.voucherForm.classList.toggle('hidden', !voucher)
    els.buyForm.classList.toggle('hidden', voucher)
    clearError()
  }

  function ksh(amount) {
    var n = Number(amount)
    return 'KSh ' + (isFinite(n) ? n.toLocaleString() : String(amount))
  }

  // --------------------------------------------------------------------------
  // Operator branding (window.ORION_BRANDING injected by the bridge from
  // Settings -> Captive Portal Branding). Everything has a safe fallback.
  // --------------------------------------------------------------------------

  function applyBranding() {
    var b = window.ORION_BRANDING || {}

    // Business name: keep the trailing coral dot on the last word.
    if (typeof b.businessName === 'string' && b.businessName.trim()) {
      var words = b.businessName.trim().split(/\\s+/)
      var last = words.pop()
      els.brandName.innerHTML = ''
      if (words.length > 0) {
        els.brandName.appendChild(document.createTextNode(words.join(' ') + ' '))
      }
      var accentWord = document.createElement('span')
      accentWord.textContent = last
      var dot = document.createElement('span')
      dot.className = 'brand-dot'
      dot.textContent = '.'
      accentWord.appendChild(dot)
      els.brandName.appendChild(accentWord)
    }

    // Headline + subtitle come from the portal tab; fall back to the
    // static HTML defaults when branding is absent.
    if (b.portalTitle) els.authTitle.textContent = b.portalTitle
    if (b.portalMessage) els.authSub.textContent = b.portalMessage

    // Footer: custom note when set, otherwise name / payment / support line.
    if (typeof b.footerNote === 'string' && b.footerNote.trim()) {
      els.footerNote.textContent = b.footerNote.trim()
    } else {
      var footerParts = []
      if (b.businessName) footerParts.push(b.businessName + ' Guest Wi-Fi')
      footerParts.push('Pay via M-Pesa')
      footerParts.push('Support: ' + (b.supportPhone || '0700 000 000'))
      els.footerNote.textContent = footerParts.join(' · ')
    }

    // Browser tab title follows the business name.
    var titleTag = document.getElementById('portalTitleTag')
    if (titleTag && b.businessName) {
      titleTag.textContent = b.businessName + ' Wi-Fi — Sign in'
      document.title = titleTag.textContent
    }
  }

  applyBranding()

  function pkgPrice(pkg) { return Number(pkg.price_amount) || 0 }

  function pkgSpecLine(pkg) {
    return [
      pkg.duration,
      pkg.speed_limit,
      (pkg.device_limit || 1) + (pkg.device_limit === 1 ? ' device' : ' devices'),
    ].filter(Boolean).join(' · ')
  }

  function selectedPkg() {
    for (var i = 0; i < state.packages.length; i++) {
      if (state.packages[i].id === state.selectedPackageId) return state.packages[i]
    }
    return null
  }

  function demoVoucherCode() {
    var alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
    function group() {
      var out = ''
      for (var i = 0; i < 4; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)]
      return out
    }
    return 'ORN-' + group() + '-' + group()
  }

  function setReceiptLine(text) {
    var p = els.receiptLine.querySelector('p')
    if (p) p.textContent = text
  }

  // --------------------------------------------------------------------------
  // Packages (live with demo fallback)
  // --------------------------------------------------------------------------

  function renderPackages() {
    els.packagesList.innerHTML = ''
    if (!state.packages.length) {
      var p = document.createElement('p')
      p.className = 'tiny'
      p.textContent = 'No packages are available right now. Please try again later.'
      els.packagesList.appendChild(p)
      return
    }
    state.packages.forEach(function (pkg) {
      var card = document.createElement('button')
      card.type = 'button'
      card.className = 'package-card' + (state.selectedPackageId === pkg.id ? ' selected' : '')

      var copy = document.createElement('div')
      copy.className = 'package-copy'
      var title = document.createElement('strong')
      title.textContent = pkg.name
      var spec = document.createElement('span')
      spec.textContent = pkgSpecLine(pkg)
      copy.appendChild(title)
      copy.appendChild(spec)

      var price = document.createElement('div')
      price.className = 'package-price'
      var priceStrong = document.createElement('strong')
      priceStrong.textContent = ksh(pkgPrice(pkg))
      var per = document.createElement('span')
      per.textContent = pkg.duration || ''
      price.appendChild(priceStrong)
      price.appendChild(per)

      card.appendChild(copy)
      card.appendChild(price)
      card.addEventListener('click', function () {
        state.selectedPackageId = pkg.id
        clearError()
        renderPackages()
      })
      els.packagesList.appendChild(card)
    })
  }

  function selectDefaultPackage() {
    if (!state.selectedPackageId && state.packages.length) {
      state.selectedPackageId = state.packages[0].id
    }
  }

  fetch('/packages', { headers: { Accept: 'application/json' } })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status)
      return res.json()
    })
    .then(function (data) {
      var packages = (data && data.packages) || []
      if (!packages.length) throw new Error('no packages')
      state.packages = packages
      state.liveMode = true
      selectDefaultPackage()
      renderPackages()
    })
    .catch(function () {
      state.packages = DEMO_PACKAGES
      state.liveMode = false
      state.selectedPackageId = null
      selectDefaultPackage()
      renderPackages()
    })

  // --------------------------------------------------------------------------
  // Voucher login (RouterOS redirect-style flow, simulated in demo mode)
  // --------------------------------------------------------------------------

  els.voucherForm.addEventListener('submit', function (event) {
    event.preventDefault()
    var code = (els.code.value || '').trim()
    if (!code) {
      showError('Enter your voucher code to connect.')
      return
    }
    if (!state.liveMode) {
      els.voucherCode.textContent = code.toUpperCase()
      els.voucherMeta.textContent = 'Demo voucher login'
      setReceiptLine('Demo mode — connect a live hotspot to authenticate this code.')
      showView('success')
      return
    }
    var params = new URLSearchParams(window.location.search)
    var form = document.createElement('form')
    form.method = 'POST'
    form.action = params.get('linkloginonly') || 'login'
    function addField(name, value) {
      var input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = value
      form.appendChild(input)
    }
    addField('username', code)
    addField('password', code)
    var dst = params.get('dst') || params.get('redirect')
    if (dst) addField('dst', dst)
    addField('popup', 'true')
    els.voucherBtn.disabled = true
    document.body.appendChild(form)
    form.submit()
  })

  // --------------------------------------------------------------------------
  // Buy with M-Pesa (live) / simulated (demo)
  // --------------------------------------------------------------------------

  function startPolling(checkoutRequestId, price, pkg, phone) {
    showView('waiting')
    els.waitingAmount.textContent = ksh(price)
    els.waitingPkg.textContent = pkg.name
    els.waitingSub.textContent = phone
      ? "We've sent a payment prompt to " + phone + ". Enter your M-Pesa PIN to confirm."
      : "We've sent a payment prompt to your phone. Enter your M-Pesa PIN to confirm."
    state.pollTimer = setInterval(function () {
      pollOnce(checkoutRequestId)
    }, 2000)
  }

  function stopPolling() {
    clearInterval(state.pollTimer)
    state.pollTimer = null
  }

  function pollOnce(checkoutRequestId) {
    if (!state.liveMode) {
      if (state.demoPaidAt && Date.now() >= state.demoPaidAt) {
        stopPolling()
        var pkg = selectedPkg()
        finishPayment({
          status: 'paid',
          packageName: pkg ? pkg.name : '',
          amount: pkg ? pkgPrice(pkg) : 0,
          voucherCode: demoVoucherCode(),
          mpesaReceipt: 'DEMO' + Math.random().toString(36).slice(2, 10).toUpperCase(),
        })
      }
      return
    }
    fetch('/pay/' + encodeURIComponent(checkoutRequestId), { headers: { Accept: 'application/json' } })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status)
        return res.json()
      })
      .then(function (data) {
        if (data.status === 'paid' || data.status === 'failed' || data.status === 'cancelled') {
          stopPolling()
          if (data.status === 'paid') {
            finishPayment(data)
          } else {
            showView('auth')
            showError(
              data.status === 'cancelled'
                ? 'Payment request expired. Please try again.'
                : 'Payment did not go through' + (data.resultDesc ? ' — ' + data.resultDesc : '') + '.'
            )
          }
        }
      })
      .catch(function (err) {
        console.warn('[portal] poll failed:', err && err.message)
      })
  }

  function finishPayment(data) {
    showView('success')
    els.voucherCode.textContent = data.voucherCode || '—'
    var pkg = selectedPkg()
    els.voucherMeta.textContent = pkg ? pkg.name + ' · ' + pkgSpecLine(pkg) : (data.packageName || '')
    setReceiptLine(
      data.mpesaReceipt
        ? 'M-Pesa receipt: ' + data.mpesaReceipt
        : 'Payment confirmed. Connect with the code above.'
    )
  }

  els.buyForm.addEventListener('submit', function (event) {
    event.preventDefault()
    clearError()
    var pkg = selectedPkg()
    if (!pkg) {
      showError('Choose a package first.')
      return
    }
    var phone = (els.phone.value || '').replace(/[\\s-]/g, '')
    if (!/^(?:\\+?254|0)?(?:7\\d{8}|1\\d{8})$/.test(phone)) {
      showError('Enter a valid Safaricom number, e.g. 0712 345 678.')
      return
    }
    if (!state.liveMode) {
      state.demoPaidAt = Date.now() + 6000
      startPolling('demo-checkout-id', pkgPrice(pkg), pkg, phone)
      return
    }
    els.buyBtn.disabled = true
    fetch('/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ phone: phone, packageId: pkg.id }),
    })
      .then(function (res) {
        return res.json().then(function (data) { return { ok: res.ok, status: res.status, data: data } })
      })
      .then(function (r) {
        if (r.status === 503) {
          showError(r.data.error || 'M-Pesa payments are not configured on this hotspot. Please use a voucher.')
          return
        }
        if (r.status === 429) {
          showError('Too many attempts — please wait a minute and try again.')
          return
        }
        if (!r.ok || !r.data.checkoutRequestId) {
          showError(r.data.error || 'Could not start the payment. Please try again.')
          return
        }
        startPolling(r.data.checkoutRequestId, pkgPrice(pkg), pkg, phone)
      })
      .catch(function () {
        showError('Network error — could not reach the payment service.')
      })
      .then(function () {
        els.buyBtn.disabled = false
      })
  })

  els.cancelWaitBtn.addEventListener('click', function () {
    stopPolling()
    state.demoPaidAt = null
    showView('auth')
  })

  els.copyCodeBtn.addEventListener('click', function () {
    var code = els.voucherCode.textContent
    function done() {
      els.copyCodeBtn.textContent = 'Copied!'
      setTimeout(function () { els.copyCodeBtn.textContent = 'Copy code' }, 1600)
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(done, function () { /* ignore */ })
    }
  })

  els.startBtn.addEventListener('click', function () {
    var params = new URLSearchParams(window.location.search)
    var dst = params.get('dst') || params.get('redirect')
    window.location.href = dst || 'http://1.1.1.1'
  })

  // --------------------------------------------------------------------------
  // Tabs + ?code= prefill (desk-printed receipts can link straight to the code)
  // --------------------------------------------------------------------------

  els.tabVoucher.addEventListener('click', function () { setMode('voucher') })
  els.tabBuy.addEventListener('click', function () { setMode('buy') })

  var prefill = new URLSearchParams(window.location.search).get('code')
  if (prefill) {
    els.code.value = prefill
    setMode('voucher')
  }
})()
`,ys=`// Brand-color derivation shared by the bridge (portal HTML injection) and the
// dashboard's live portal preview (Settings -> Captive Portal Branding).
// Keeping one implementation means the preview always matches what guests see.

const DEFAULT_PRIMARY = '#d36b4d'
const HEX_RE = /^#[0-9a-fA-F]{6}$/

function clamp8(n) {
  return Math.max(0, Math.min(255, Math.round(n)))
}

/** '#rrggbb' -> [r, g, b] (assumes HEX_RE already matched). */
function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
}

/** [r, g, b] -> '#rrggbb' in lowercase hex. */
function rgbToHex(rgb) {
  return '#' + rgb.map((v) => clamp8(v).toString(16).padStart(2, '0')).join('')
}

/** Mix toward white (t > 0) or black (t < 0); t in [-1, 1]. */
function mix(hex, t) {
  const [r, g, b] = hexToRgb(hex)
  const k = Math.max(-1, Math.min(1, t))
  const target = k >= 0 ? 255 : 0
  const amount = Math.abs(k)
  return rgbToHex([r + (target - r) * amount, g + (target - g) * amount, b + (target - b) * amount])
}

/** Relative luminance (WCAG) — used to pick the readable ink on brand fills. */
function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Derive the portal's brand tokens from one primary color, per theme.
 * Only brand-derived variables are overridden — neutral backgrounds/ink
 * keep the dashboard's palette in both themes.
 */
function buildBrandPalettes(primaryColor) {
  const base = HEX_RE.test(primaryColor) ? primaryColor.toLowerCase() : DEFAULT_PRIMARY
  // Ink flips to dark when the brand fill gets light enough that white
  // text would fail contrast (default coral ~0.25 stays white, amber gold
  // ~0.30 flips to dark).
  const onBrand = luminance(base) > 0.28 ? '#192320' : '#ffffff'
  return {
    light: {
      '--coral': base,
      '--coral-subtle': mix(base, 0.85),
      '--coral-glow': mix(base, 0) + '30',
      '--on-brand': onBrand,
    },
    dark: {
      '--coral': mix(base, 0.08),
      '--coral-subtle': mix(base, -0.78),
      '--coral-glow': mix(base, 0) + '35',
      '--on-brand': onBrand,
    },
  }
}

/** Serialize one theme's palette to a \`--var: value;\` string. */
function paletteToCss(palette) {
  return Object.entries(palette)
    .map(([name, value]) => \`\${name}: \${value};\`)
    .join(' ')
}

/**
 * Build the inline <style> that recolors the portal to the brand color,
 * per theme. The bridge inserts it before </head> so it wins over
 * portal.css without needing !important.
 */
function buildBrandStyle(primaryColor) {
  const palettes = buildBrandPalettes(primaryColor)
  return (
    \`<style>:root{\${paletteToCss(palettes.light)}}\` +
    \`[data-theme="dark"]{\${paletteToCss(palettes.dark)}}</style>\`
  )
}

module.exports = {
  DEFAULT_PRIMARY,
  HEX_RE,
  hexToRgb,
  rgbToHex,
  mix,
  luminance,
  buildBrandPalettes,
  buildBrandStyle,
  paletteToCss,
}
`;function bs(e){let t={exports:{}};return Function(`module`,`exports`,`require`,e)(t,t.exports,()=>({})),t.exports}var xs=bs(ys);function Ss(e){return`<script>window.ORION_BRANDING=${JSON.stringify(e).replace(/</g,`\\u003c`)};<\/script>`}function Cs(e){let t=xs.buildBrandPalettes(e),n=e=>Object.entries(e).map(([e,t])=>`${e}: ${t};`).join(` `);return`<style>:root{${n(t.light)}}[data-theme="dark"]{${n(t.dark)}}</style>`}function ws(e){let t=gs,n=_s,r=vs,i=Ss(e)+Cs(e.primaryColor)+`
`,a=t.indexOf(`</head>`);return(a===-1?i+t:t.slice(0,a)+i+t.slice(a)).replace(/<link rel="stylesheet" href="portal\.css" \/>/,`<style>\n${n}\n</style>`).replace(/<script src="portal\.js"><\/script>/,`<script>\n${r}\n<\/script>`).replace(/<link rel="preconnect"[^>]*\/>\s*/g,``).replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*\/>\s*/g,``)}var Ts=bs(`//---------------------------------------------------------------------
//
// QR Code Generator for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//
// The word 'QR Code' is registered trademark of
// DENSO WAVE INCORPORATED
//  http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------

var qrcode = function() {

  //---------------------------------------------------------------------
  // qrcode
  //---------------------------------------------------------------------

  /**
   * qrcode
   * @param typeNumber 1 to 40
   * @param errorCorrectionLevel 'L','M','Q','H'
   */
  var qrcode = function(typeNumber, errorCorrectionLevel) {

    var PAD0 = 0xEC;
    var PAD1 = 0x11;

    var _typeNumber = typeNumber;
    var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
    var _modules = null;
    var _moduleCount = 0;
    var _dataCache = null;
    var _dataList = [];

    var _this = {};

    var makeImpl = function(test, maskPattern) {

      _moduleCount = _typeNumber * 4 + 17;
      _modules = function(moduleCount) {
        var modules = new Array(moduleCount);
        for (var row = 0; row < moduleCount; row += 1) {
          modules[row] = new Array(moduleCount);
          for (var col = 0; col < moduleCount; col += 1) {
            modules[row][col] = null;
          }
        }
        return modules;
      }(_moduleCount);

      setupPositionProbePattern(0, 0);
      setupPositionProbePattern(_moduleCount - 7, 0);
      setupPositionProbePattern(0, _moduleCount - 7);
      setupPositionAdjustPattern();
      setupTimingPattern();
      setupTypeInfo(test, maskPattern);

      if (_typeNumber >= 7) {
        setupTypeNumber(test);
      }

      if (_dataCache == null) {
        _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
      }

      mapData(_dataCache, maskPattern);
    };

    var setupPositionProbePattern = function(row, col) {

      for (var r = -1; r <= 7; r += 1) {

        if (row + r <= -1 || _moduleCount <= row + r) continue;

        for (var c = -1; c <= 7; c += 1) {

          if (col + c <= -1 || _moduleCount <= col + c) continue;

          if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
              || (0 <= c && c <= 6 && (r == 0 || r == 6) )
              || (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
            _modules[row + r][col + c] = true;
          } else {
            _modules[row + r][col + c] = false;
          }
        }
      }
    };

    var getBestMaskPattern = function() {

      var minLostPoint = 0;
      var pattern = 0;

      for (var i = 0; i < 8; i += 1) {

        makeImpl(true, i);

        var lostPoint = QRUtil.getLostPoint(_this);

        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }

      return pattern;
    };

    var setupTimingPattern = function() {

      for (var r = 8; r < _moduleCount - 8; r += 1) {
        if (_modules[r][6] != null) {
          continue;
        }
        _modules[r][6] = (r % 2 == 0);
      }

      for (var c = 8; c < _moduleCount - 8; c += 1) {
        if (_modules[6][c] != null) {
          continue;
        }
        _modules[6][c] = (c % 2 == 0);
      }
    };

    var setupPositionAdjustPattern = function() {

      var pos = QRUtil.getPatternPosition(_typeNumber);

      for (var i = 0; i < pos.length; i += 1) {

        for (var j = 0; j < pos.length; j += 1) {

          var row = pos[i];
          var col = pos[j];

          if (_modules[row][col] != null) {
            continue;
          }

          for (var r = -2; r <= 2; r += 1) {

            for (var c = -2; c <= 2; c += 1) {

              if (r == -2 || r == 2 || c == -2 || c == 2
                  || (r == 0 && c == 0) ) {
                _modules[row + r][col + c] = true;
              } else {
                _modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    };

    var setupTypeNumber = function(test) {

      var bits = QRUtil.getBCHTypeNumber(_typeNumber);

      for (var i = 0; i < 18; i += 1) {
        var mod = (!test && ( (bits >> i) & 1) == 1);
        _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
      }

      for (var i = 0; i < 18; i += 1) {
        var mod = (!test && ( (bits >> i) & 1) == 1);
        _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    };

    var setupTypeInfo = function(test, maskPattern) {

      var data = (_errorCorrectionLevel << 3) | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);

      // vertical
      for (var i = 0; i < 15; i += 1) {

        var mod = (!test && ( (bits >> i) & 1) == 1);

        if (i < 6) {
          _modules[i][8] = mod;
        } else if (i < 8) {
          _modules[i + 1][8] = mod;
        } else {
          _modules[_moduleCount - 15 + i][8] = mod;
        }
      }

      // horizontal
      for (var i = 0; i < 15; i += 1) {

        var mod = (!test && ( (bits >> i) & 1) == 1);

        if (i < 8) {
          _modules[8][_moduleCount - i - 1] = mod;
        } else if (i < 9) {
          _modules[8][15 - i - 1 + 1] = mod;
        } else {
          _modules[8][15 - i - 1] = mod;
        }
      }

      // fixed module
      _modules[_moduleCount - 8][8] = (!test);
    };

    var mapData = function(data, maskPattern) {

      var inc = -1;
      var row = _moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;
      var maskFunc = QRUtil.getMaskFunction(maskPattern);

      for (var col = _moduleCount - 1; col > 0; col -= 2) {

        if (col == 6) col -= 1;

        while (true) {

          for (var c = 0; c < 2; c += 1) {

            if (_modules[row][col - c] == null) {

              var dark = false;

              if (byteIndex < data.length) {
                dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
              }

              var mask = maskFunc(row, col - c);

              if (mask) {
                dark = !dark;
              }

              _modules[row][col - c] = dark;
              bitIndex -= 1;

              if (bitIndex == -1) {
                byteIndex += 1;
                bitIndex = 7;
              }
            }
          }

          row += inc;

          if (row < 0 || _moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    };

    var createBytes = function(buffer, rsBlocks) {

      var offset = 0;

      var maxDcCount = 0;
      var maxEcCount = 0;

      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);

      for (var r = 0; r < rsBlocks.length; r += 1) {

        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;

        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);

        dcdata[r] = new Array(dcCount);

        for (var i = 0; i < dcdata[r].length; i += 1) {
          dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
        }
        offset += dcCount;

        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);

        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i += 1) {
          var modIndex = i + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i] = (modIndex >= 0)? modPoly.getAt(modIndex) : 0;
        }
      }

      var totalCodeCount = 0;
      for (var i = 0; i < rsBlocks.length; i += 1) {
        totalCodeCount += rsBlocks[i].totalCount;
      }

      var data = new Array(totalCodeCount);
      var index = 0;

      for (var i = 0; i < maxDcCount; i += 1) {
        for (var r = 0; r < rsBlocks.length; r += 1) {
          if (i < dcdata[r].length) {
            data[index] = dcdata[r][i];
            index += 1;
          }
        }
      }

      for (var i = 0; i < maxEcCount; i += 1) {
        for (var r = 0; r < rsBlocks.length; r += 1) {
          if (i < ecdata[r].length) {
            data[index] = ecdata[r][i];
            index += 1;
          }
        }
      }

      return data;
    };

    var createData = function(typeNumber, errorCorrectionLevel, dataList) {

      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectionLevel);

      var buffer = qrBitBuffer();

      for (var i = 0; i < dataList.length; i += 1) {
        var data = dataList[i];
        buffer.put(data.getMode(), 4);
        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
        data.write(buffer);
      }

      // calc num max data.
      var totalDataCount = 0;
      for (var i = 0; i < rsBlocks.length; i += 1) {
        totalDataCount += rsBlocks[i].dataCount;
      }

      if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw 'code length overflow. ('
          + buffer.getLengthInBits()
          + '>'
          + totalDataCount * 8
          + ')';
      }

      // end code
      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
      }

      // padding
      while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false);
      }

      // padding
      while (true) {

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(PAD0, 8);

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(PAD1, 8);
      }

      return createBytes(buffer, rsBlocks);
    };

    _this.addData = function(data, mode) {

      mode = mode || 'Byte';

      var newData = null;

      switch(mode) {
      case 'Numeric' :
        newData = qrNumber(data);
        break;
      case 'Alphanumeric' :
        newData = qrAlphaNum(data);
        break;
      case 'Byte' :
        newData = qr8BitByte(data);
        break;
      case 'Kanji' :
        newData = qrKanji(data);
        break;
      default :
        throw 'mode:' + mode;
      }

      _dataList.push(newData);
      _dataCache = null;
    };

    _this.isDark = function(row, col) {
      if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
        throw row + ',' + col;
      }
      return _modules[row][col];
    };

    _this.getModuleCount = function() {
      return _moduleCount;
    };

    _this.make = function() {
      if (_typeNumber < 1) {
        var typeNumber = 1;

        for (; typeNumber < 40; typeNumber++) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, _errorCorrectionLevel);
          var buffer = qrBitBuffer();

          for (var i = 0; i < _dataList.length; i++) {
            var data = _dataList[i];
            buffer.put(data.getMode(), 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
            data.write(buffer);
          }

          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
          }

          if (buffer.getLengthInBits() <= totalDataCount * 8) {
            break;
          }
        }

        _typeNumber = typeNumber;
      }

      makeImpl(false, getBestMaskPattern() );
    };

    _this.createTableTag = function(cellSize, margin) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var qrHtml = '';

      qrHtml += '<table style="';
      qrHtml += ' border-width: 0px; border-style: none;';
      qrHtml += ' border-collapse: collapse;';
      qrHtml += ' padding: 0px; margin: ' + margin + 'px;';
      qrHtml += '">';
      qrHtml += '<tbody>';

      for (var r = 0; r < _this.getModuleCount(); r += 1) {

        qrHtml += '<tr>';

        for (var c = 0; c < _this.getModuleCount(); c += 1) {
          qrHtml += '<td style="';
          qrHtml += ' border-width: 0px; border-style: none;';
          qrHtml += ' border-collapse: collapse;';
          qrHtml += ' padding: 0px; margin: 0px;';
          qrHtml += ' width: ' + cellSize + 'px;';
          qrHtml += ' height: ' + cellSize + 'px;';
          qrHtml += ' background-color: ';
          qrHtml += _this.isDark(r, c)? '#000000' : '#ffffff';
          qrHtml += ';';
          qrHtml += '"/>';
        }

        qrHtml += '</tr>';
      }

      qrHtml += '</tbody>';
      qrHtml += '</table>';

      return qrHtml;
    };

    _this.createSvgTag = function(cellSize, margin, alt, title) {

      var opts = {};
      if (typeof arguments[0] == 'object') {
        // Called by options.
        opts = arguments[0];
        // overwrite cellSize and margin.
        cellSize = opts.cellSize;
        margin = opts.margin;
        alt = opts.alt;
        title = opts.title;
      }

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      // Compose alt property surrogate
      alt = (typeof alt === 'string') ? {text: alt} : alt || {};
      alt.text = alt.text || null;
      alt.id = (alt.text) ? alt.id || 'qrcode-description' : null;

      // Compose title property surrogate
      title = (typeof title === 'string') ? {text: title} : title || {};
      title.text = title.text || null;
      title.id = (title.text) ? title.id || 'qrcode-title' : null;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var c, mc, r, mr, qrSvg='', rect;

      rect = 'l' + cellSize + ',0 0,' + cellSize +
        ' -' + cellSize + ',0 0,-' + cellSize + 'z ';

      qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
      qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : '';
      qrSvg += ' viewBox="0 0 ' + size + ' ' + size + '" ';
      qrSvg += ' preserveAspectRatio="xMinYMin meet"';
      qrSvg += (title.text || alt.text) ? ' role="img" aria-labelledby="' +
          escapeXml([title.id, alt.id].join(' ').trim() ) + '"' : '';
      qrSvg += '>';
      qrSvg += (title.text) ? '<title id="' + escapeXml(title.id) + '">' +
          escapeXml(title.text) + '</title>' : '';
      qrSvg += (alt.text) ? '<description id="' + escapeXml(alt.id) + '">' +
          escapeXml(alt.text) + '</description>' : '';
      qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
      qrSvg += '<path d="';

      for (r = 0; r < _this.getModuleCount(); r += 1) {
        mr = r * cellSize + margin;
        for (c = 0; c < _this.getModuleCount(); c += 1) {
          if (_this.isDark(r, c) ) {
            mc = c*cellSize+margin;
            qrSvg += 'M' + mc + ',' + mr + rect;
          }
        }
      }

      qrSvg += '" stroke="transparent" fill="black"/>';
      qrSvg += '</svg>';

      return qrSvg;
    };

    _this.createDataURL = function(cellSize, margin) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      return createDataURL(size, size, function(x, y) {
        if (min <= x && x < max && min <= y && y < max) {
          var c = Math.floor( (x - min) / cellSize);
          var r = Math.floor( (y - min) / cellSize);
          return _this.isDark(r, c)? 0 : 1;
        } else {
          return 1;
        }
      } );
    };

    _this.createImgTag = function(cellSize, margin, alt) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;

      var img = '';
      img += '<img';
      img += '\\u0020src="';
      img += _this.createDataURL(cellSize, margin);
      img += '"';
      img += '\\u0020width="';
      img += size;
      img += '"';
      img += '\\u0020height="';
      img += size;
      img += '"';
      if (alt) {
        img += '\\u0020alt="';
        img += escapeXml(alt);
        img += '"';
      }
      img += '/>';

      return img;
    };

    var escapeXml = function(s) {
      var escaped = '';
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charAt(i);
        switch(c) {
        case '<': escaped += '&lt;'; break;
        case '>': escaped += '&gt;'; break;
        case '&': escaped += '&amp;'; break;
        case '"': escaped += '&quot;'; break;
        default : escaped += c; break;
        }
      }
      return escaped;
    };

    var _createHalfASCII = function(margin) {
      var cellSize = 1;
      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      var y, x, r1, r2, p;

      var blocks = {
        '██': '█',
        '█ ': '▀',
        ' █': '▄',
        '  ': ' '
      };

      var blocksLastLineNoMargin = {
        '██': '▀',
        '█ ': '▀',
        ' █': ' ',
        '  ': ' '
      };

      var ascii = '';
      for (y = 0; y < size; y += 2) {
        r1 = Math.floor((y - min) / cellSize);
        r2 = Math.floor((y + 1 - min) / cellSize);
        for (x = 0; x < size; x += 1) {
          p = '█';

          if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {
            p = ' ';
          }

          if (min <= x && x < max && min <= y+1 && y+1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {
            p += ' ';
          }
          else {
            p += '█';
          }

          // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.
          ascii += (margin < 1 && y+1 >= max) ? blocksLastLineNoMargin[p] : blocks[p];
        }

        ascii += '\\n';
      }

      if (size % 2 && margin > 0) {
        return ascii.substring(0, ascii.length - size - 1) + Array(size+1).join('▀');
      }

      return ascii.substring(0, ascii.length-1);
    };

    _this.createASCII = function(cellSize, margin) {
      cellSize = cellSize || 1;

      if (cellSize < 2) {
        return _createHalfASCII(margin);
      }

      cellSize -= 1;
      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      var y, x, r, p;

      var white = Array(cellSize+1).join('██');
      var black = Array(cellSize+1).join('  ');

      var ascii = '';
      var line = '';
      for (y = 0; y < size; y += 1) {
        r = Math.floor( (y - min) / cellSize);
        line = '';
        for (x = 0; x < size; x += 1) {
          p = 1;

          if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {
            p = 0;
          }

          // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.
          line += p ? white : black;
        }

        for (r = 0; r < cellSize; r += 1) {
          ascii += line + '\\n';
        }
      }

      return ascii.substring(0, ascii.length-1);
    };

    _this.renderTo2dContext = function(context, cellSize) {
      cellSize = cellSize || 2;
      var length = _this.getModuleCount();
      for (var row = 0; row < length; row++) {
        for (var col = 0; col < length; col++) {
          context.fillStyle = _this.isDark(row, col) ? 'black' : 'white';
          context.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);
        }
      }
    }

    return _this;
  };

  //---------------------------------------------------------------------
  // qrcode.stringToBytes
  //---------------------------------------------------------------------

  qrcode.stringToBytesFuncs = {
    'default' : function(s) {
      var bytes = [];
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charCodeAt(i);
        bytes.push(c & 0xff);
      }
      return bytes;
    }
  };

  qrcode.stringToBytes = qrcode.stringToBytesFuncs['default'];

  //---------------------------------------------------------------------
  // qrcode.createStringToBytes
  //---------------------------------------------------------------------

  /**
   * @param unicodeData base64 string of byte array.
   * [16bit Unicode],[16bit Bytes], ...
   * @param numChars
   */
  qrcode.createStringToBytes = function(unicodeData, numChars) {

    // create conversion map.

    var unicodeMap = function() {

      var bin = base64DecodeInputStream(unicodeData);
      var read = function() {
        var b = bin.read();
        if (b == -1) throw 'eof';
        return b;
      };

      var count = 0;
      var unicodeMap = {};
      while (true) {
        var b0 = bin.read();
        if (b0 == -1) break;
        var b1 = read();
        var b2 = read();
        var b3 = read();
        var k = String.fromCharCode( (b0 << 8) | b1);
        var v = (b2 << 8) | b3;
        unicodeMap[k] = v;
        count += 1;
      }
      if (count != numChars) {
        throw count + ' != ' + numChars;
      }

      return unicodeMap;
    }();

    var unknownChar = '?'.charCodeAt(0);

    return function(s) {
      var bytes = [];
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charCodeAt(i);
        if (c < 128) {
          bytes.push(c);
        } else {
          var b = unicodeMap[s.charAt(i)];
          if (typeof b == 'number') {
            if ( (b & 0xff) == b) {
              // 1byte
              bytes.push(b);
            } else {
              // 2bytes
              bytes.push(b >>> 8);
              bytes.push(b & 0xff);
            }
          } else {
            bytes.push(unknownChar);
          }
        }
      }
      return bytes;
    };
  };

  //---------------------------------------------------------------------
  // QRMode
  //---------------------------------------------------------------------

  var QRMode = {
    MODE_NUMBER :    1 << 0,
    MODE_ALPHA_NUM : 1 << 1,
    MODE_8BIT_BYTE : 1 << 2,
    MODE_KANJI :     1 << 3
  };

  //---------------------------------------------------------------------
  // QRErrorCorrectionLevel
  //---------------------------------------------------------------------

  var QRErrorCorrectionLevel = {
    L : 1,
    M : 0,
    Q : 3,
    H : 2
  };

  //---------------------------------------------------------------------
  // QRMaskPattern
  //---------------------------------------------------------------------

  var QRMaskPattern = {
    PATTERN000 : 0,
    PATTERN001 : 1,
    PATTERN010 : 2,
    PATTERN011 : 3,
    PATTERN100 : 4,
    PATTERN101 : 5,
    PATTERN110 : 6,
    PATTERN111 : 7
  };

  //---------------------------------------------------------------------
  // QRUtil
  //---------------------------------------------------------------------

  var QRUtil = function() {

    var PATTERN_POSITION_TABLE = [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170]
    ];
    var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
    var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
    var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);

    var _this = {};

    var getBCHDigit = function(data) {
      var digit = 0;
      while (data != 0) {
        digit += 1;
        data >>>= 1;
      }
      return digit;
    };

    _this.getBCHTypeInfo = function(data) {
      var d = data << 10;
      while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
        d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15) ) );
      }
      return ( (data << 10) | d) ^ G15_MASK;
    };

    _this.getBCHTypeNumber = function(data) {
      var d = data << 12;
      while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
        d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18) ) );
      }
      return (data << 12) | d;
    };

    _this.getPatternPosition = function(typeNumber) {
      return PATTERN_POSITION_TABLE[typeNumber - 1];
    };

    _this.getMaskFunction = function(maskPattern) {

      switch (maskPattern) {

      case QRMaskPattern.PATTERN000 :
        return function(i, j) { return (i + j) % 2 == 0; };
      case QRMaskPattern.PATTERN001 :
        return function(i, j) { return i % 2 == 0; };
      case QRMaskPattern.PATTERN010 :
        return function(i, j) { return j % 3 == 0; };
      case QRMaskPattern.PATTERN011 :
        return function(i, j) { return (i + j) % 3 == 0; };
      case QRMaskPattern.PATTERN100 :
        return function(i, j) { return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0; };
      case QRMaskPattern.PATTERN101 :
        return function(i, j) { return (i * j) % 2 + (i * j) % 3 == 0; };
      case QRMaskPattern.PATTERN110 :
        return function(i, j) { return ( (i * j) % 2 + (i * j) % 3) % 2 == 0; };
      case QRMaskPattern.PATTERN111 :
        return function(i, j) { return ( (i * j) % 3 + (i + j) % 2) % 2 == 0; };

      default :
        throw 'bad maskPattern:' + maskPattern;
      }
    };

    _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
      var a = qrPolynomial([1], 0);
      for (var i = 0; i < errorCorrectLength; i += 1) {
        a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0) );
      }
      return a;
    };

    _this.getLengthInBits = function(mode, type) {

      if (1 <= type && type < 10) {

        // 1 - 9

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 10;
        case QRMode.MODE_ALPHA_NUM : return 9;
        case QRMode.MODE_8BIT_BYTE : return 8;
        case QRMode.MODE_KANJI     : return 8;
        default :
          throw 'mode:' + mode;
        }

      } else if (type < 27) {

        // 10 - 26

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 12;
        case QRMode.MODE_ALPHA_NUM : return 11;
        case QRMode.MODE_8BIT_BYTE : return 16;
        case QRMode.MODE_KANJI     : return 10;
        default :
          throw 'mode:' + mode;
        }

      } else if (type < 41) {

        // 27 - 40

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 14;
        case QRMode.MODE_ALPHA_NUM : return 13;
        case QRMode.MODE_8BIT_BYTE : return 16;
        case QRMode.MODE_KANJI     : return 12;
        default :
          throw 'mode:' + mode;
        }

      } else {
        throw 'type:' + type;
      }
    };

    _this.getLostPoint = function(qrcode) {

      var moduleCount = qrcode.getModuleCount();

      var lostPoint = 0;

      // LEVEL1

      for (var row = 0; row < moduleCount; row += 1) {
        for (var col = 0; col < moduleCount; col += 1) {

          var sameCount = 0;
          var dark = qrcode.isDark(row, col);

          for (var r = -1; r <= 1; r += 1) {

            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }

            for (var c = -1; c <= 1; c += 1) {

              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }

              if (r == 0 && c == 0) {
                continue;
              }

              if (dark == qrcode.isDark(row + r, col + c) ) {
                sameCount += 1;
              }
            }
          }

          if (sameCount > 5) {
            lostPoint += (3 + sameCount - 5);
          }
        }
      };

      // LEVEL2

      for (var row = 0; row < moduleCount - 1; row += 1) {
        for (var col = 0; col < moduleCount - 1; col += 1) {
          var count = 0;
          if (qrcode.isDark(row, col) ) count += 1;
          if (qrcode.isDark(row + 1, col) ) count += 1;
          if (qrcode.isDark(row, col + 1) ) count += 1;
          if (qrcode.isDark(row + 1, col + 1) ) count += 1;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }

      // LEVEL3

      for (var row = 0; row < moduleCount; row += 1) {
        for (var col = 0; col < moduleCount - 6; col += 1) {
          if (qrcode.isDark(row, col)
              && !qrcode.isDark(row, col + 1)
              &&  qrcode.isDark(row, col + 2)
              &&  qrcode.isDark(row, col + 3)
              &&  qrcode.isDark(row, col + 4)
              && !qrcode.isDark(row, col + 5)
              &&  qrcode.isDark(row, col + 6) ) {
            lostPoint += 40;
          }
        }
      }

      for (var col = 0; col < moduleCount; col += 1) {
        for (var row = 0; row < moduleCount - 6; row += 1) {
          if (qrcode.isDark(row, col)
              && !qrcode.isDark(row + 1, col)
              &&  qrcode.isDark(row + 2, col)
              &&  qrcode.isDark(row + 3, col)
              &&  qrcode.isDark(row + 4, col)
              && !qrcode.isDark(row + 5, col)
              &&  qrcode.isDark(row + 6, col) ) {
            lostPoint += 40;
          }
        }
      }

      // LEVEL4

      var darkCount = 0;

      for (var col = 0; col < moduleCount; col += 1) {
        for (var row = 0; row < moduleCount; row += 1) {
          if (qrcode.isDark(row, col) ) {
            darkCount += 1;
          }
        }
      }

      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;

      return lostPoint;
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // QRMath
  //---------------------------------------------------------------------

  var QRMath = function() {

    var EXP_TABLE = new Array(256);
    var LOG_TABLE = new Array(256);

    // initialize tables
    for (var i = 0; i < 8; i += 1) {
      EXP_TABLE[i] = 1 << i;
    }
    for (var i = 8; i < 256; i += 1) {
      EXP_TABLE[i] = EXP_TABLE[i - 4]
        ^ EXP_TABLE[i - 5]
        ^ EXP_TABLE[i - 6]
        ^ EXP_TABLE[i - 8];
    }
    for (var i = 0; i < 255; i += 1) {
      LOG_TABLE[EXP_TABLE[i] ] = i;
    }

    var _this = {};

    _this.glog = function(n) {

      if (n < 1) {
        throw 'glog(' + n + ')';
      }

      return LOG_TABLE[n];
    };

    _this.gexp = function(n) {

      while (n < 0) {
        n += 255;
      }

      while (n >= 256) {
        n -= 255;
      }

      return EXP_TABLE[n];
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // qrPolynomial
  //---------------------------------------------------------------------

  function qrPolynomial(num, shift) {

    if (typeof num.length == 'undefined') {
      throw num.length + '/' + shift;
    }

    var _num = function() {
      var offset = 0;
      while (offset < num.length && num[offset] == 0) {
        offset += 1;
      }
      var _num = new Array(num.length - offset + shift);
      for (var i = 0; i < num.length - offset; i += 1) {
        _num[i] = num[i + offset];
      }
      return _num;
    }();

    var _this = {};

    _this.getAt = function(index) {
      return _num[index];
    };

    _this.getLength = function() {
      return _num.length;
    };

    _this.multiply = function(e) {

      var num = new Array(_this.getLength() + e.getLength() - 1);

      for (var i = 0; i < _this.getLength(); i += 1) {
        for (var j = 0; j < e.getLength(); j += 1) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i) ) + QRMath.glog(e.getAt(j) ) );
        }
      }

      return qrPolynomial(num, 0);
    };

    _this.mod = function(e) {

      if (_this.getLength() - e.getLength() < 0) {
        return _this;
      }

      var ratio = QRMath.glog(_this.getAt(0) ) - QRMath.glog(e.getAt(0) );

      var num = new Array(_this.getLength() );
      for (var i = 0; i < _this.getLength(); i += 1) {
        num[i] = _this.getAt(i);
      }

      for (var i = 0; i < e.getLength(); i += 1) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i) ) + ratio);
      }

      // recursive call
      return qrPolynomial(num, 0).mod(e);
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // QRRSBlock
  //---------------------------------------------------------------------

  var QRRSBlock = function() {

    var RS_BLOCK_TABLE = [

      // L
      // M
      // Q
      // H

      // 1
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],

      // 2
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],

      // 3
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],

      // 4
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],

      // 5
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],

      // 6
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],

      // 7
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],

      // 8
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],

      // 9
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],

      // 10
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],

      // 11
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],

      // 12
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],

      // 13
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],

      // 14
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],

      // 15
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12, 7, 37, 13],

      // 16
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],

      // 17
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],

      // 18
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],

      // 19
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],

      // 20
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],

      // 21
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],

      // 22
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],

      // 23
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],

      // 24
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],

      // 25
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],

      // 26
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],

      // 27
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],

      // 28
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],

      // 29
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],

      // 30
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],

      // 31
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],

      // 32
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],

      // 33
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],

      // 34
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],

      // 35
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],

      // 36
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],

      // 37
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],

      // 38
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],

      // 39
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],

      // 40
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ];

    var qrRSBlock = function(totalCount, dataCount) {
      var _this = {};
      _this.totalCount = totalCount;
      _this.dataCount = dataCount;
      return _this;
    };

    var _this = {};

    var getRsBlockTable = function(typeNumber, errorCorrectionLevel) {

      switch(errorCorrectionLevel) {
      case QRErrorCorrectionLevel.L :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectionLevel.M :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectionLevel.Q :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectionLevel.H :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default :
        return undefined;
      }
    };

    _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {

      var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);

      if (typeof rsBlock == 'undefined') {
        throw 'bad rs block @ typeNumber:' + typeNumber +
            '/errorCorrectionLevel:' + errorCorrectionLevel;
      }

      var length = rsBlock.length / 3;

      var list = [];

      for (var i = 0; i < length; i += 1) {

        var count = rsBlock[i * 3 + 0];
        var totalCount = rsBlock[i * 3 + 1];
        var dataCount = rsBlock[i * 3 + 2];

        for (var j = 0; j < count; j += 1) {
          list.push(qrRSBlock(totalCount, dataCount) );
        }
      }

      return list;
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // qrBitBuffer
  //---------------------------------------------------------------------

  var qrBitBuffer = function() {

    var _buffer = [];
    var _length = 0;

    var _this = {};

    _this.getBuffer = function() {
      return _buffer;
    };

    _this.getAt = function(index) {
      var bufIndex = Math.floor(index / 8);
      return ( (_buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
    };

    _this.put = function(num, length) {
      for (var i = 0; i < length; i += 1) {
        _this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
      }
    };

    _this.getLengthInBits = function() {
      return _length;
    };

    _this.putBit = function(bit) {

      var bufIndex = Math.floor(_length / 8);
      if (_buffer.length <= bufIndex) {
        _buffer.push(0);
      }

      if (bit) {
        _buffer[bufIndex] |= (0x80 >>> (_length % 8) );
      }

      _length += 1;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrNumber
  //---------------------------------------------------------------------

  var qrNumber = function(data) {

    var _mode = QRMode.MODE_NUMBER;
    var _data = data;

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _data.length;
    };

    _this.write = function(buffer) {

      var data = _data;

      var i = 0;

      while (i + 2 < data.length) {
        buffer.put(strToNum(data.substring(i, i + 3) ), 10);
        i += 3;
      }

      if (i < data.length) {
        if (data.length - i == 1) {
          buffer.put(strToNum(data.substring(i, i + 1) ), 4);
        } else if (data.length - i == 2) {
          buffer.put(strToNum(data.substring(i, i + 2) ), 7);
        }
      }
    };

    var strToNum = function(s) {
      var num = 0;
      for (var i = 0; i < s.length; i += 1) {
        num = num * 10 + chatToNum(s.charAt(i) );
      }
      return num;
    };

    var chatToNum = function(c) {
      if ('0' <= c && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0);
      }
      throw 'illegal char :' + c;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrAlphaNum
  //---------------------------------------------------------------------

  var qrAlphaNum = function(data) {

    var _mode = QRMode.MODE_ALPHA_NUM;
    var _data = data;

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _data.length;
    };

    _this.write = function(buffer) {

      var s = _data;

      var i = 0;

      while (i + 1 < s.length) {
        buffer.put(
          getCode(s.charAt(i) ) * 45 +
          getCode(s.charAt(i + 1) ), 11);
        i += 2;
      }

      if (i < s.length) {
        buffer.put(getCode(s.charAt(i) ), 6);
      }
    };

    var getCode = function(c) {

      if ('0' <= c && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0);
      } else if ('A' <= c && c <= 'Z') {
        return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
      } else {
        switch (c) {
        case ' ' : return 36;
        case '$' : return 37;
        case '%' : return 38;
        case '*' : return 39;
        case '+' : return 40;
        case '-' : return 41;
        case '.' : return 42;
        case '/' : return 43;
        case ':' : return 44;
        default :
          throw 'illegal char :' + c;
        }
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qr8BitByte
  //---------------------------------------------------------------------

  var qr8BitByte = function(data) {

    var _mode = QRMode.MODE_8BIT_BYTE;
    var _data = data;
    var _bytes = qrcode.stringToBytes(data);

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _bytes.length;
    };

    _this.write = function(buffer) {
      for (var i = 0; i < _bytes.length; i += 1) {
        buffer.put(_bytes[i], 8);
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrKanji
  //---------------------------------------------------------------------

  var qrKanji = function(data) {

    var _mode = QRMode.MODE_KANJI;
    var _data = data;

    var stringToBytes = qrcode.stringToBytesFuncs['SJIS'];
    if (!stringToBytes) {
      throw 'sjis not supported.';
    }
    !function(c, code) {
      // self test for sjis support.
      var test = stringToBytes(c);
      if (test.length != 2 || ( (test[0] << 8) | test[1]) != code) {
        throw 'sjis not supported.';
      }
    }('\\u53cb', 0x9746);

    var _bytes = stringToBytes(data);

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return ~~(_bytes.length / 2);
    };

    _this.write = function(buffer) {

      var data = _bytes;

      var i = 0;

      while (i + 1 < data.length) {

        var c = ( (0xff & data[i]) << 8) | (0xff & data[i + 1]);

        if (0x8140 <= c && c <= 0x9FFC) {
          c -= 0x8140;
        } else if (0xE040 <= c && c <= 0xEBBF) {
          c -= 0xC140;
        } else {
          throw 'illegal char at ' + (i + 1) + '/' + c;
        }

        c = ( (c >>> 8) & 0xff) * 0xC0 + (c & 0xff);

        buffer.put(c, 13);

        i += 2;
      }

      if (i < data.length) {
        throw 'illegal char at ' + (i + 1);
      }
    };

    return _this;
  };

  //=====================================================================
  // GIF Support etc.
  //

  //---------------------------------------------------------------------
  // byteArrayOutputStream
  //---------------------------------------------------------------------

  var byteArrayOutputStream = function() {

    var _bytes = [];

    var _this = {};

    _this.writeByte = function(b) {
      _bytes.push(b & 0xff);
    };

    _this.writeShort = function(i) {
      _this.writeByte(i);
      _this.writeByte(i >>> 8);
    };

    _this.writeBytes = function(b, off, len) {
      off = off || 0;
      len = len || b.length;
      for (var i = 0; i < len; i += 1) {
        _this.writeByte(b[i + off]);
      }
    };

    _this.writeString = function(s) {
      for (var i = 0; i < s.length; i += 1) {
        _this.writeByte(s.charCodeAt(i) );
      }
    };

    _this.toByteArray = function() {
      return _bytes;
    };

    _this.toString = function() {
      var s = '';
      s += '[';
      for (var i = 0; i < _bytes.length; i += 1) {
        if (i > 0) {
          s += ',';
        }
        s += _bytes[i];
      }
      s += ']';
      return s;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // base64EncodeOutputStream
  //---------------------------------------------------------------------

  var base64EncodeOutputStream = function() {

    var _buffer = 0;
    var _buflen = 0;
    var _length = 0;
    var _base64 = '';

    var _this = {};

    var writeEncoded = function(b) {
      _base64 += String.fromCharCode(encode(b & 0x3f) );
    };

    var encode = function(n) {
      if (n < 0) {
        // error.
      } else if (n < 26) {
        return 0x41 + n;
      } else if (n < 52) {
        return 0x61 + (n - 26);
      } else if (n < 62) {
        return 0x30 + (n - 52);
      } else if (n == 62) {
        return 0x2b;
      } else if (n == 63) {
        return 0x2f;
      }
      throw 'n:' + n;
    };

    _this.writeByte = function(n) {

      _buffer = (_buffer << 8) | (n & 0xff);
      _buflen += 8;
      _length += 1;

      while (_buflen >= 6) {
        writeEncoded(_buffer >>> (_buflen - 6) );
        _buflen -= 6;
      }
    };

    _this.flush = function() {

      if (_buflen > 0) {
        writeEncoded(_buffer << (6 - _buflen) );
        _buffer = 0;
        _buflen = 0;
      }

      if (_length % 3 != 0) {
        // padding
        var padlen = 3 - _length % 3;
        for (var i = 0; i < padlen; i += 1) {
          _base64 += '=';
        }
      }
    };

    _this.toString = function() {
      return _base64;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // base64DecodeInputStream
  //---------------------------------------------------------------------

  var base64DecodeInputStream = function(str) {

    var _str = str;
    var _pos = 0;
    var _buffer = 0;
    var _buflen = 0;

    var _this = {};

    _this.read = function() {

      while (_buflen < 8) {

        if (_pos >= _str.length) {
          if (_buflen == 0) {
            return -1;
          }
          throw 'unexpected end of file./' + _buflen;
        }

        var c = _str.charAt(_pos);
        _pos += 1;

        if (c == '=') {
          _buflen = 0;
          return -1;
        } else if (c.match(/^\\s$/) ) {
          // ignore if whitespace.
          continue;
        }

        _buffer = (_buffer << 6) | decode(c.charCodeAt(0) );
        _buflen += 6;
      }

      var n = (_buffer >>> (_buflen - 8) ) & 0xff;
      _buflen -= 8;
      return n;
    };

    var decode = function(c) {
      if (0x41 <= c && c <= 0x5a) {
        return c - 0x41;
      } else if (0x61 <= c && c <= 0x7a) {
        return c - 0x61 + 26;
      } else if (0x30 <= c && c <= 0x39) {
        return c - 0x30 + 52;
      } else if (c == 0x2b) {
        return 62;
      } else if (c == 0x2f) {
        return 63;
      } else {
        throw 'c:' + c;
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // gifImage (B/W)
  //---------------------------------------------------------------------

  var gifImage = function(width, height) {

    var _width = width;
    var _height = height;
    var _data = new Array(width * height);

    var _this = {};

    _this.setPixel = function(x, y, pixel) {
      _data[y * _width + x] = pixel;
    };

    _this.write = function(out) {

      //---------------------------------
      // GIF Signature

      out.writeString('GIF87a');

      //---------------------------------
      // Screen Descriptor

      out.writeShort(_width);
      out.writeShort(_height);

      out.writeByte(0x80); // 2bit
      out.writeByte(0);
      out.writeByte(0);

      //---------------------------------
      // Global Color Map

      // black
      out.writeByte(0x00);
      out.writeByte(0x00);
      out.writeByte(0x00);

      // white
      out.writeByte(0xff);
      out.writeByte(0xff);
      out.writeByte(0xff);

      //---------------------------------
      // Image Descriptor

      out.writeString(',');
      out.writeShort(0);
      out.writeShort(0);
      out.writeShort(_width);
      out.writeShort(_height);
      out.writeByte(0);

      //---------------------------------
      // Local Color Map

      //---------------------------------
      // Raster Data

      var lzwMinCodeSize = 2;
      var raster = getLZWRaster(lzwMinCodeSize);

      out.writeByte(lzwMinCodeSize);

      var offset = 0;

      while (raster.length - offset > 255) {
        out.writeByte(255);
        out.writeBytes(raster, offset, 255);
        offset += 255;
      }

      out.writeByte(raster.length - offset);
      out.writeBytes(raster, offset, raster.length - offset);
      out.writeByte(0x00);

      //---------------------------------
      // GIF Terminator
      out.writeString(';');
    };

    var bitOutputStream = function(out) {

      var _out = out;
      var _bitLength = 0;
      var _bitBuffer = 0;

      var _this = {};

      _this.write = function(data, length) {

        if ( (data >>> length) != 0) {
          throw 'length over';
        }

        while (_bitLength + length >= 8) {
          _out.writeByte(0xff & ( (data << _bitLength) | _bitBuffer) );
          length -= (8 - _bitLength);
          data >>>= (8 - _bitLength);
          _bitBuffer = 0;
          _bitLength = 0;
        }

        _bitBuffer = (data << _bitLength) | _bitBuffer;
        _bitLength = _bitLength + length;
      };

      _this.flush = function() {
        if (_bitLength > 0) {
          _out.writeByte(_bitBuffer);
        }
      };

      return _this;
    };

    var getLZWRaster = function(lzwMinCodeSize) {

      var clearCode = 1 << lzwMinCodeSize;
      var endCode = (1 << lzwMinCodeSize) + 1;
      var bitLength = lzwMinCodeSize + 1;

      // Setup LZWTable
      var table = lzwTable();

      for (var i = 0; i < clearCode; i += 1) {
        table.add(String.fromCharCode(i) );
      }
      table.add(String.fromCharCode(clearCode) );
      table.add(String.fromCharCode(endCode) );

      var byteOut = byteArrayOutputStream();
      var bitOut = bitOutputStream(byteOut);

      // clear code
      bitOut.write(clearCode, bitLength);

      var dataIndex = 0;

      var s = String.fromCharCode(_data[dataIndex]);
      dataIndex += 1;

      while (dataIndex < _data.length) {

        var c = String.fromCharCode(_data[dataIndex]);
        dataIndex += 1;

        if (table.contains(s + c) ) {

          s = s + c;

        } else {

          bitOut.write(table.indexOf(s), bitLength);

          if (table.size() < 0xfff) {

            if (table.size() == (1 << bitLength) ) {
              bitLength += 1;
            }

            table.add(s + c);
          }

          s = c;
        }
      }

      bitOut.write(table.indexOf(s), bitLength);

      // end code
      bitOut.write(endCode, bitLength);

      bitOut.flush();

      return byteOut.toByteArray();
    };

    var lzwTable = function() {

      var _map = {};
      var _size = 0;

      var _this = {};

      _this.add = function(key) {
        if (_this.contains(key) ) {
          throw 'dup key:' + key;
        }
        _map[key] = _size;
        _size += 1;
      };

      _this.size = function() {
        return _size;
      };

      _this.indexOf = function(key) {
        return _map[key];
      };

      _this.contains = function(key) {
        return typeof _map[key] != 'undefined';
      };

      return _this;
    };

    return _this;
  };

  var createDataURL = function(width, height, getPixel) {
    var gif = gifImage(width, height);
    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        gif.setPixel(x, y, getPixel(x, y) );
      }
    }

    var b = byteArrayOutputStream();
    gif.write(b);

    var base64 = base64EncodeOutputStream();
    var bytes = b.toByteArray();
    for (var i = 0; i < bytes.length; i += 1) {
      base64.writeByte(bytes[i]);
    }
    base64.flush();

    return 'data:image/gif;base64,' + base64;
  };

  //---------------------------------------------------------------------
  // returns qrcode function.

  return qrcode;
}();

// multibyte support
!function() {

  qrcode.stringToBytesFuncs['UTF-8'] = function(s) {
    // http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
    function toUTF8Array(str) {
      var utf8 = [];
      for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
          utf8.push(0xc0 | (charcode >> 6),
              0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(0xe0 | (charcode >> 12),
              0x80 | ((charcode>>6) & 0x3f),
              0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
          i++;
          // UTF-16 encodes 0x10000-0x10FFFF by
          // subtracting 0x10000 and splitting the
          // 20 bits of 0x0-0xFFFFF into two halves
          charcode = 0x10000 + (((charcode & 0x3ff)<<10)
            | (str.charCodeAt(i) & 0x3ff));
          utf8.push(0xf0 | (charcode >>18),
              0x80 | ((charcode>>12) & 0x3f),
              0x80 | ((charcode>>6) & 0x3f),
              0x80 | (charcode & 0x3f));
        }
      }
      return utf8;
    }
    return toUTF8Array(s);
  };

}();

(function (factory) {
  if (typeof define === 'function' && define.amd) {
      define([], factory);
  } else if (typeof exports === 'object') {
      module.exports = factory();
  }
}(function () {
    return qrcode;
}));
`);function Es(e){let t=Ts(0,`M`);return t.addData(e),t.make(),t.createSvgTag({cellSize:4,margin:0,scalable:!0})}var Ds=`orion_portal_url`,Os=8787;function ks(e){if(!e)return null;try{let t=new URL(e.trim());return t.protocol!==`http:`&&t.protocol!==`https:`?null:t.toString()}catch{return null}}function As(){try{return localStorage.getItem(`orion_portal_url`)||``}catch{return``}}function js(e){try{e.trim()?localStorage.setItem(Ds,e.trim()):localStorage.removeItem(Ds)}catch{}}function Ms(){return ks(As())||ks(``)||(typeof window<`u`&&window.location.hostname?`http://${window.location.hostname}:${Os}/portal`:`http://localhost:${Os}/portal`)}var Ns=e((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),H=e(((e,t)=>{t.exports=Ns()}))(),Ps={desktop:{width:900,label:`Desktop`},mobile:{width:390,label:`Phone`}};function Fs({branding:e}){let[t,n]=(0,h.useState)(`desktop`),[r,i]=(0,h.useState)(!1),[a,o]=(0,h.useState)(As()),[s,c]=(0,h.useState)(()=>JSON.stringify(e)),l=(0,h.useRef)(null);(0,h.useEffect)(()=>{let t=JSON.stringify(e);if(t===s)return;let n=window.setTimeout(()=>c(t),350);return()=>window.clearTimeout(n)},[e,s]);let u=(0,h.useMemo)(()=>ws(JSON.parse(s)),[s]),d=(0,h.useMemo)(()=>ks(a)||Ms(),[a]),f=(0,h.useMemo)(()=>Es(d),[d]);return(0,h.useEffect)(()=>{let e=l.current;if(!e)return;let t=ps();try{e.contentWindow?.localStorage.setItem(`orion_theme`,t)}catch{}},[u,t]),(0,H.jsxs)(`div`,{style:{background:`var(--card-subtle-bg)`,border:`1px solid var(--line)`,borderRadius:`12px`,padding:`16px`,marginTop:`16px`},children:[(0,H.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,marginBottom:`12px`,flexWrap:`wrap`,gap:`8px`},children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`strong`,{style:{fontSize:`13px`},children:`Live portal preview`}),(0,H.jsx)(`p`,{style:{margin:`2px 0 0`,fontSize:`11px`,color:`var(--muted)`},children:`Exactly what guests see — updates as you type, before you save.`})]}),(0,H.jsxs)(`div`,{style:{display:`flex`,gap:`6px`,alignItems:`center`},children:[(0,H.jsxs)(`button`,{type:`button`,onClick:()=>i(e=>!e),title:`Show a QR code pointing at the live portal`,style:{display:`inline-flex`,alignItems:`center`,gap:`6px`,padding:`6px 10px`,borderRadius:`8px`,border:`1.5px solid ${r?`var(--coral)`:`var(--line)`}`,background:r?`var(--coral-subtle)`:`transparent`,color:r?`var(--coral)`:`var(--muted)`,fontWeight:700,fontSize:`11px`,cursor:`pointer`},children:[(0,H.jsx)(we,{size:13}),` QR`]}),(0,H.jsxs)(`a`,{href:d,target:`_blank`,rel:`noreferrer`,style:{display:`inline-flex`,alignItems:`center`,gap:`6px`,padding:`6px 10px`,borderRadius:`8px`,border:`1.5px solid var(--line)`,color:`var(--muted)`,fontWeight:700,fontSize:`11px`,textDecoration:`none`},children:[(0,H.jsx)(le,{size:13}),` Open live portal`]}),Object.keys(Ps).map(e=>(0,H.jsxs)(`button`,{type:`button`,onClick:()=>n(e),style:{display:`inline-flex`,alignItems:`center`,gap:`6px`,padding:`6px 10px`,borderRadius:`8px`,border:`1.5px solid ${t===e?`var(--coral)`:`var(--line)`}`,background:t===e?`var(--coral-subtle)`:`transparent`,color:t===e?`var(--coral)`:`var(--muted)`,fontWeight:700,fontSize:`11px`,cursor:`pointer`},children:[e===`desktop`?(0,H.jsx)(ve,{size:13}):(0,H.jsx)(Le,{size:13}),Ps[e].label]},e))]})]}),r&&(0,H.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,alignItems:`flex-start`,flexWrap:`wrap`,background:`var(--card-bg)`,border:`1px solid var(--line)`,borderRadius:`10px`,padding:`14px`,marginBottom:`12px`},children:[(0,H.jsx)(`div`,{"aria-hidden":`true`,style:{width:132,height:132,flexShrink:0,background:`#ffffff`,borderRadius:`8px`,padding:`8px`,border:`1px solid var(--line)`},dangerouslySetInnerHTML:{__html:f}}),(0,H.jsxs)(`div`,{style:{flex:1,minWidth:220},children:[(0,H.jsx)(`strong`,{style:{fontSize:`12px`},children:`Test on your phone`}),(0,H.jsx)(`p`,{style:{margin:`4px 0 10px`,fontSize:`11px`,color:`var(--muted)`},children:`Scan from a device on the hotspot network to open the real guest portal served by the bridge. The preview here is exactly what it will show.`}),(0,H.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,alignItems:`center`,flexWrap:`wrap`},children:[(0,H.jsx)(`input`,{type:`url`,value:a,placeholder:`http://192.168.88.10:8787/portal`,onChange:e=>{o(e.target.value),js(e.target.value)},style:{flex:1,minWidth:200,padding:`8px 10px`,borderRadius:`8px`,border:`1px solid var(--line)`,fontSize:`12px`,fontFamily:`inherit`,background:`var(--card-subtle-bg)`,color:`var(--ink)`}}),!ks(a)&&a.trim()!==``&&(0,H.jsx)(`span`,{style:{fontSize:`11px`,color:`var(--danger, #c94a32)`,fontWeight:700},children:`Using default — enter a valid http(s) URL`}),a.trim()===``&&(0,H.jsx)(`span`,{style:{fontSize:`11px`,color:`var(--muted)`},children:`Default: this host + bridge port 8787`})]}),(0,H.jsx)(`p`,{style:{margin:`8px 0 0`,fontSize:`11px`,fontWeight:700,wordBreak:`break-all`},children:d})]}),(0,H.jsx)(`button`,{type:`button`,onClick:()=>i(!1),title:`Close QR panel`,style:{border:`0`,background:`transparent`,color:`var(--muted)`,cursor:`pointer`,padding:`2px`,lineHeight:0},children:(0,H.jsx)(Ze,{size:14})})]}),(0,H.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`},children:(0,H.jsx)(`div`,{style:{width:`100%`,maxWidth:Ps[t].width,transition:`max-width 0.25s ease`,borderRadius:`14px`,border:`1px solid var(--line)`,overflow:`hidden`,boxShadow:`0 8px 30px rgba(20, 32, 27, 0.12)`,background:`var(--bg)`},children:(0,H.jsx)(`iframe`,{ref:l,title:`Captive portal preview`,srcDoc:u,sandbox:`allow-scripts allow-same-origin allow-forms allow-modals`,style:{display:`block`,width:`100%`,height:t===`mobile`?620:540,border:`0`,background:`var(--bg)`}})})})]})}var Is={provider:`africastalking`,apiKey:``,username:`sandbox`,senderId:`ORION_WIFI`,customEndpoint:``,customHeaders:``,smsEnabled:!0,defaultCountryCode:`+254`},Ls=`orion_sms_gateway_config`;function Rs(){if(typeof window>`u`)return Is;try{let e=localStorage.getItem(Ls);if(e)return{...Is,...JSON.parse(e)}}catch(e){console.warn(`Failed to parse saved SMS config:`,e)}return Is}function zs(e){let t={...Rs(),...e};return typeof window<`u`&&localStorage.setItem(Ls,JSON.stringify(t)),t}function Bs(e,t=`+254`){if(!e)return``;let n=e.replace(/[\s\-\(\)\.]/g,``).trim();return n.startsWith(`+`)?`+`+n.slice(1).replace(/\D/g,``):n.startsWith(`0`)&&n.length===10?`+${t.replace(`+`,``)}${n.slice(1)}`:n.startsWith(`254`)&&n.length>=12?`+${n}`:(n.startsWith(`7`)||n.startsWith(`1`))&&n.length===9?`+${t.replace(`+`,``)}${n}`:`${t.startsWith(`+`)?t:`+${t}`}${n}`}async function Vs(e,t,n){let r={...Rs(),...n},i=Bs(e,r.defaultCountryCode),a=new Date().toISOString();if(!i)return{success:!1,recipient:e,providerUsed:r.provider,error:`Invalid recipient phone number format.`,sentAt:a};if(r.customEndpoint&&r.customEndpoint.trim().length>5)try{let e={"Content-Type":`application/json`};if(r.customHeaders)try{e={...e,...JSON.parse(r.customHeaders)}}catch{e.Authorization=`Bearer ${r.customHeaders.trim()}`}let n=await fetch(r.customEndpoint.trim(),{method:`POST`,headers:e,body:JSON.stringify({to:i,message:t,senderId:r.senderId||`ORION`,provider:r.provider,apiKey:r.apiKey,username:r.username})}),o=await n.json().catch(()=>({}));return n.ok&&o.success!==!1?{success:!0,messageId:o.messageId||o.id||`msg-${Date.now()}`,recipient:i,providerUsed:`Webhook (${r.provider})`,rawResponse:o,sentAt:a}:{success:!1,recipient:i,providerUsed:`Webhook (${r.provider})`,error:o.message||o.error||`HTTP ${n.status}: ${n.statusText}`,rawResponse:o,sentAt:a}}catch(e){console.warn(`Webhook SMS dispatch error:`,e)}switch(r.provider){case`africastalking`:if(!r.apiKey||r.apiKey.trim().length<5)return{success:!0,isSimulated:!0,messageId:`at-sim-${Date.now()}`,recipient:i,providerUsed:`Africa's Talking (Simulation Mode)`,sentAt:a};try{let e=r.username.toLowerCase()===`sandbox`,n=e?`https://api.sandbox.africastalking.com/version1/messaging`:`https://api.africastalking.com/version1/messaging`,o=new URLSearchParams;o.append(`username`,r.username||`sandbox`),o.append(`to`,i),o.append(`message`,t),r.senderId&&!e&&o.append(`from`,r.senderId);let s=await fetch(n,{method:`POST`,headers:{apiKey:r.apiKey.trim(),"Content-Type":`application/x-www-form-urlencoded`,Accept:`application/json`},body:o.toString()}),c=await s.json().catch(()=>({})),l=c?.SMSMessageData?.Recipients||[],u=l.length>0&&[`Success`,`101`,`102`].includes(String(l[0]?.status||``));return s.ok&&(u||l.length>0)?{success:!0,messageId:l[0]?.messageId||`at-${Date.now()}`,recipient:i,providerUsed:`Africa's Talking SMS`,rawResponse:c,sentAt:a}:{success:!1,recipient:i,providerUsed:`Africa's Talking`,error:l[0]?.status||c?.SMSMessageData?.Message||`HTTP ${s.status}`,rawResponse:c,sentAt:a}}catch(e){return{success:!0,isSimulated:!0,messageId:`at-cors-sim-${Date.now()}`,recipient:i,providerUsed:`Africa's Talking (Direct / Supabase Proxy)`,error:`Browser direct dispatch blocked by CORS. Using Supabase Edge Function recommended. (${e.message||`CORS`})`,sentAt:a}}case`twilio`:if(!r.username||!r.apiKey)return{success:!0,isSimulated:!0,messageId:`tw-sim-${Date.now()}`,recipient:i,providerUsed:`Twilio (Simulation Mode)`,sentAt:a};try{let e=r.username.trim(),n=r.apiKey.trim(),o=`https://api.twilio.com/2010-04-01/Accounts/${e}/Messages.json`,s=new URLSearchParams;s.append(`To`,i),s.append(`From`,r.senderId.trim()||`+15005550006`),s.append(`Body`,t);let c=`Basic `+btoa(`${e}:${n}`),l=await fetch(o,{method:`POST`,headers:{Authorization:c,"Content-Type":`application/x-www-form-urlencoded`},body:s.toString()}),u=await l.json().catch(()=>({}));return l.ok&&u.sid?{success:!0,messageId:u.sid,recipient:i,providerUsed:`Twilio SMS`,rawResponse:u,sentAt:a}:{success:!1,recipient:i,providerUsed:`Twilio SMS`,error:u.message||`HTTP ${l.status}: ${u.code||`Twilio Error`}`,rawResponse:u,sentAt:a}}catch(e){return{success:!0,isSimulated:!0,messageId:`tw-cors-sim-${Date.now()}`,recipient:i,providerUsed:`Twilio (Direct / Supabase Proxy)`,error:`Twilio direct call note: ${e.message}`,sentAt:a}}case`advanta`:if(!r.apiKey)return{success:!0,isSimulated:!0,messageId:`adv-sim-${Date.now()}`,recipient:i,providerUsed:`Advanta SMS (Simulation Mode)`,sentAt:a};try{let e={apikey:r.apiKey.trim(),partnerID:r.username.trim()||`1234`,message:t,shortcode:r.senderId.trim()||`ADVANTA`,mobile:i.replace(`+`,``)},n=await fetch(`https://quicksms.advantasms.com/api/services/sendsms/`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)}),o=await n.json().catch(()=>({}));return n.ok&&(o.response?.[`response-code`]===200||o.responses?.[0]?.[`response-code`]===200)?{success:!0,messageId:o.responses?.[0]?.messageid||`adv-${Date.now()}`,recipient:i,providerUsed:`Advanta SMS`,rawResponse:o,sentAt:a}:{success:!1,recipient:i,providerUsed:`Advanta SMS`,error:o.response?.[`response-description`]||`Advanta API dispatch error`,rawResponse:o,sentAt:a}}catch{return{success:!0,isSimulated:!0,messageId:`adv-sim-${Date.now()}`,recipient:i,providerUsed:`Advanta SMS (Simulated)`,sentAt:a}}case`mobilesasa`:if(!r.apiKey)return{success:!0,isSimulated:!0,messageId:`ms-sim-${Date.now()}`,recipient:i,providerUsed:`Mobilesasa (Simulation Mode)`,sentAt:a};try{let e={senderID:r.senderId||`MOBILESASA`,message:t,recipient:i.replace(`+`,``)},n=await fetch(`https://api.mobilesasa.com/v1/send/message`,{method:`POST`,headers:{Authorization:`Bearer ${r.apiKey.trim()}`,"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify(e)}),o=await n.json().catch(()=>({}));return n.ok&&o.status===`success`?{success:!0,messageId:o.message_id||`ms-${Date.now()}`,recipient:i,providerUsed:`Mobilesasa SMS`,rawResponse:o,sentAt:a}:{success:!1,recipient:i,providerUsed:`Mobilesasa SMS`,error:o.message||`Mobilesasa API error`,rawResponse:o,sentAt:a}}catch{return{success:!0,isSimulated:!0,messageId:`ms-sim-${Date.now()}`,recipient:i,providerUsed:`Mobilesasa SMS (Simulated)`,sentAt:a}}default:return await new Promise(e=>setTimeout(e,400)),{success:!0,isSimulated:!0,messageId:`sim-otp-${Date.now()}`,recipient:i,providerUsed:`Local Test Gateway`,sentAt:a}}}async function Hs(e,t,n=`Harbor House`){return Vs(e,`${n} Security: Your 2FA verification code is ${t}. Valid for 5 minutes. Do not share this code with anyone.`)}async function Us(e,t,n,r,i=`Harbor House Guest Wi-Fi`){return Vs(e,`Welcome! Your ${n} (${r}) Wi-Fi voucher code is: ${t}. Connect to "${i}" and enter your voucher code to start browsing.`)}async function Ws(e,t){return Vs(e,t)}var Gs=[`#317d75`,`#d36b4d`,`#4d7dd3`,`#8a63c9`,`#c99a3f`,`#5ba345`],Ks={id:`op-1`,name:`Janet Muthoni`,email:`operator@harborhouse.co.ke`,phone:`+254 712 345 678`,role:`Owner`,avatar:`JM`,twoFactorEnabled:!0},qs={businessName:`Harbor House`,location:`Westlands, Nairobi`,headline:`Welcome to Harbor House High-Speed Wi-Fi`,supportPhone:`+254 700 123 456`,currency:`KSh`,timezone:`Africa/Nairobi (EAT)`,primaryColor:`#d36b4d`,portalTitle:`Connect to High Speed Internet`,portalMessage:`Select an unlimited or day pass below or enter your voucher code.`,termsEnabled:!0,mikrotikIp:`10.20.0.1`,mikrotikPort:`8728`,sessionTimeout:`1440`,idleTimeout:`15`,burstMode:!0,mpesaTill:`892100`,mpesaPasskey:`bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919`,airtelMerchantId:`HH-AIRTEL-901`,smsProvider:`africastalking`,smsApiKey:``,smsUsername:`sandbox`,smsSenderId:`ORION_WIFI`,smsCustomEndpoint:``,smsCustomHeaders:``,smsEnabled:!0,smsDefaultCountryCode:`+254`},Js=[{name:`Maya Ochieng`,device:`iPhone 14 Pro`,location:`Lobby AP · 10.20.0.34`,plan:`24h Day Pass Unlimited`,usage:`1.2 GB / Unlimited`,progress:24,color:`#d36b4d`},{name:`Brian Kamau`,device:`MacBook Air`,location:`Poolside AP · 10.20.0.52`,plan:`7 Days Unlimited Flex`,usage:`8.4 GB / Unlimited`,progress:42,color:`#317d75`},{name:`Aisha Wanjiku`,device:`Galaxy S24`,location:`Cafe AP · 10.20.1.18`,plan:`1 Hour Unlimited Rush`,usage:`680 MB / Unlimited`,progress:68,color:`#c58a32`}],Ys=[{id:`#TRX-2091`,customer:`Maya Ochieng`,phone:`+254 712 345 678`,method:`M-Pesa`,package:`24h Day Pass Unlimited`,amount:`KSh 350`,status:`Paid`,time:`Today, 09:42`,receipt:`QHD82910KP`},{id:`#TRX-2090`,customer:`Peter Mwangi`,phone:`+254 701 234 567`,method:`Voucher`,package:`1 Hour Unlimited Rush`,amount:`KSh 70`,status:`Paid`,time:`Today, 09:26`,receipt:`VCH-9821`},{id:`#TRX-2089`,customer:`Grace Njeri`,phone:`+254 790 654 321`,method:`M-Pesa`,package:`7 Days Unlimited Flex`,amount:`KSh 1,500`,status:`Paid`,time:`Today, 08:58`,receipt:`QHD82904LP`},{id:`#TRX-2088`,customer:`Samuel Kibet`,phone:`+254 711 987 654`,method:`Airtel Money`,package:`30 Days Monthly Unlimited`,amount:`KSh 3,500`,status:`Paid`,time:`Today, 08:44`,receipt:`AIR-99210`},{id:`#TRX-2087`,customer:`John Doe`,phone:`+254 720 112 233`,method:`M-Pesa`,package:`Family 4-Devices 30d Unlimited`,amount:`KSh 6,500`,status:`Paid`,time:`Yesterday, 21:15`,receipt:`QHD82877TR`},{id:`#TRX-2086`,customer:`Faith Chebet`,phone:`+254 734 556 778`,method:`M-Pesa`,package:`24h Day Pass Unlimited`,amount:`KSh 350`,status:`Paid`,time:`Yesterday, 19:40`,receipt:`QHD82862MN`}],Xs=[{id:`pkg-1`,name:`1 Hour Unlimited Rush`,category:`hourly`,price:70,duration_display:`1 Hour`,data_limit:`Unlimited`,speed_limit:`10 Mbps`,device_limit:1,sales_count:312,is_active:!0,color:`yellow`},{id:`pkg-2`,name:`24h Day Pass Unlimited`,category:`daily`,price:350,duration_display:`24 Hours (1 Day)`,data_limit:`Unlimited`,speed_limit:`20 Mbps`,device_limit:1,sales_count:584,is_active:!0,color:`orange`},{id:`pkg-3`,name:`7 Days Unlimited Flex`,category:`weekly`,price:1500,duration_display:`7 Days (1 Week)`,data_limit:`Unlimited`,speed_limit:`25 Mbps`,device_limit:1,sales_count:148,is_active:!0,color:`teal`},{id:`pkg-4`,name:`30 Days Monthly Unlimited Pro`,category:`monthly`,price:3500,duration_display:`30 Days (1 Month)`,data_limit:`Unlimited`,speed_limit:`30 Mbps`,device_limit:1,sales_count:86,is_active:!0,color:`green`},{id:`pkg-5`,name:`Duo 2-Devices 24h Unlimited`,category:`multi-device`,price:500,duration_display:`24 Hours`,data_limit:`Unlimited Shared`,speed_limit:`20 Mbps`,device_limit:2,sales_count:112,is_active:!0,color:`orange`},{id:`pkg-6`,name:`Family & Team 4-Devices 30d Unlimited`,category:`multi-device`,price:6500,duration_display:`30 Days (1 Month)`,data_limit:`Unlimited Shared`,speed_limit:`50 Mbps Turbo`,device_limit:4,sales_count:42,is_active:!0,color:`teal`}],Zs=[{id:`vch-1`,code:`ORN-9823-A4`,package_name:`24h Day Pass Unlimited`,price:`KSh 350`,status:`active`,created_at:`Today, 09:15`,expires_at:`Sep 30, 2026`},{id:`vch-2`,code:`ORN-1102-K9`,package_name:`1 Hour Unlimited Rush`,price:`KSh 70`,status:`active`,created_at:`Today, 09:15`,expires_at:`Sep 30, 2026`},{id:`vch-3`,code:`ORN-7741-X2`,package_name:`7 Days Unlimited Flex`,price:`KSh 1,500`,status:`active`,created_at:`Today, 08:30`,expires_at:`Sep 30, 2026`},{id:`vch-4`,code:`ORN-3389-M7`,package_name:`24h Day Pass Unlimited`,price:`KSh 350`,status:`redeemed`,created_at:`Today, 08:00`,redeemed_by:`Peter Mwangi (10.20.0.34)`,expires_at:`Sep 30, 2026`},{id:`vch-5`,code:`ORN-5520-P1`,package_name:`30 Days Monthly Unlimited Pro`,price:`KSh 3,500`,status:`active`,created_at:`Yesterday, 16:45`,expires_at:`Oct 15, 2026`},{id:`vch-6`,code:`ORN-2294-Z8`,package_name:`Duo 2-Devices 24h Unlimited`,price:`KSh 500`,status:`active`,created_at:`Yesterday, 14:20`,expires_at:`Sep 30, 2026`}],Qs=[{name:`MikroTik routers`,value:`3 / 3 online`,status:`good`},{name:`Active access points`,value:`18 online`,status:`good`},{name:`Bandwidth usage`,value:`68% capacity`,status:`warn`}],$s=[{id:`rtr-1`,name:`MikroTik Core CCR2004`,ip_address:`10.20.0.1`,model:`MikroTik CCR2004-16G-2S+`,location:`Main Server Rack (MDF)`,status:`good`,clients_count:146,traffic_down:`68.4 Mbps`,traffic_up:`14.2 Mbps`,cpu_load:14,ram_load:28,ping_ms:1,uptime:`24d 18h`},{id:`rtr-2`,name:`MikroTik AP Lobby & Cafe`,ip_address:`10.20.0.34`,model:`MikroTik cAP ac (Dual-Band)`,location:`Ground Floor Lobby & Lounge`,status:`good`,clients_count:58,traffic_down:`24.5 Mbps`,traffic_up:`6.8 Mbps`,cpu_load:28,ram_load:45,ping_ms:3,uptime:`18d 06h`},{id:`rtr-3`,name:`MikroTik AP Poolside Deck`,ip_address:`10.20.0.52`,model:`MikroTik wAP ac (Outdoor)`,location:`Poolside & Outdoor Pergola`,status:`good`,clients_count:34,traffic_down:`12.8 Mbps`,traffic_up:`3.4 Mbps`,cpu_load:18,ram_load:32,ping_ms:4,uptime:`12d 04h`},{id:`rtr-4`,name:`Ubiquiti UniFi AP 2nd Floor`,ip_address:`10.20.0.78`,model:`Ubiquiti UniFi 6 Long-Range`,location:`2nd Floor Conference Wing`,status:`warn`,clients_count:54,traffic_down:`31.2 Mbps`,traffic_up:`5.1 Mbps`,cpu_load:64,ram_load:68,ping_ms:7,uptime:`9d 12h`}],ec=[{id:`cst-1`,name:`Maya Ochieng`,phone:`+254 712 345 678`,device:`iPhone 14 Pro`,plan:`24h Day Pass Unlimited`,total_spent:`KSh 3,250`,data_usage:`18.4 GB`,status:`active`,last_active:`Just now (Lobby AP)`,avatar_color:`#d36b4d`},{id:`cst-2`,name:`Brian Kamau`,phone:`+254 722 890 123`,device:`MacBook Air M2`,plan:`7 Days Unlimited Flex`,total_spent:`KSh 8,400`,data_usage:`64.2 GB`,status:`active`,last_active:`5m ago (Poolside AP)`,avatar_color:`#317d75`},{id:`cst-3`,name:`Aisha Wanjiku`,phone:`+254 733 456 789`,device:`Galaxy S24 Ultra`,plan:`1 Hour Unlimited Rush`,total_spent:`KSh 1,450`,data_usage:`8.2 GB`,status:`active`,last_active:`12m ago (Cafe AP)`,avatar_color:`#c58a32`},{id:`cst-4`,name:`Peter Mwangi`,phone:`+254 701 234 567`,device:`iPad Pro 11"`,plan:`24h Day Pass Unlimited`,total_spent:`KSh 2,100`,data_usage:`14.5 GB`,status:`idle`,last_active:`Yesterday, 18:20`,avatar_color:`#4f779a`},{id:`cst-5`,name:`Grace Njeri`,phone:`+254 790 654 321`,device:`Dell XPS 15`,plan:`7 Days Unlimited Flex`,total_spent:`KSh 6,000`,data_usage:`48.9 GB`,status:`idle`,last_active:`Aug 25, 14:10`,avatar_color:`#725796`},{id:`cst-6`,name:`Samuel Kibet`,phone:`+254 711 987 654`,device:`Google Pixel 8`,plan:`30 Days Monthly Unlimited`,total_spent:`KSh 3,500`,data_usage:`4.8 GB`,status:`blocked`,last_active:`Aug 24, 09:30`,avatar_color:`#9e4732`}];function tc(){let{theme:e,toggleTheme:t}=hs(),[n,r]=(0,h.useState)(()=>{let e=localStorage.getItem(`orion_operator`);if(e)try{return JSON.parse(e)}catch{}return Ks}),[i,a]=(0,h.useState)(()=>localStorage.getItem(`orion_authenticated`)!==`false`);return!i||!n?(0,H.jsx)(nc,{theme:e,onToggleTheme:t,onAuthSuccess:e=>{r(e),a(!0),localStorage.setItem(`orion_operator`,JSON.stringify(e)),localStorage.setItem(`orion_authenticated`,`true`)}}):(0,H.jsx)(rc,{operator:n,theme:e,onToggleTheme:t,onLogout:()=>{a(!1),localStorage.setItem(`orion_authenticated`,`false`)}})}function nc({theme:e,onToggleTheme:t,onAuthSuccess:n}){let[r,i]=(0,h.useState)(`signin`),[a,o]=(0,h.useState)(`operator@harborhouse.co.ke`),[s,c]=(0,h.useState)(`••••••••••••`),[l,u]=(0,h.useState)(`Janet Muthoni`),[d,f]=(0,h.useState)(`+254 712 345 678`),[p,m]=(0,h.useState)(`Owner`),[g,_]=(0,h.useState)(!1),[v,y]=(0,h.useState)([``,``,``,``,``,``]),[b,x]=(0,h.useState)(`849201`),[ee,S]=(0,h.useState)(45),[C,w]=(0,h.useState)(``),[te,T]=(0,h.useState)(!1),[re,ie]=(0,h.useState)(null);(0,h.useEffect)(()=>{let e;return r===`2fa`&&ee>0&&(e=setInterval(()=>S(e=>e-1),1e3)),()=>clearInterval(e)},[r,ee]);let ae=()=>r===`signin`&&/\d{7,}/.test(a)?Bs(a):Bs(d),oe=async e=>{e.preventDefault(),w(``),T(!0);let t=Math.floor(1e5+Math.random()*9e5).toString();x(t);let n=ae();try{let e=await Hs(n,t,`Harbor House`);ie(e),e.isSimulated?y(t.split(``)):y([``,``,``,``,``,``])}catch(e){console.warn(`SMS dispatch issue:`,e),y(t.split(``)),ie({success:!0,isSimulated:!0,recipient:n,providerUsed:`Safe Fallback Gateway`,sentAt:new Date().toISOString()})}finally{T(!1),S(45),i(`2fa`)}},se=(e,t)=>{let n=t.slice(-1).replace(/\D/g,``);if(t.length>1&&/^\d+$/.test(t)){let e=t.slice(0,6).split(``),n=[...v];e.forEach((e,t)=>{t<6&&(n[t]=e)}),y(n);return}let r=[...v];if(r[e]=n,y(r),n&&e<5){let t=document.getElementById(`otp-input-${e+1}`);t&&t.focus()}},ce=(e,t)=>{if(t.key===`Backspace`&&!v[e]&&e>0){let t=document.getElementById(`otp-input-${e-1}`);t&&t.focus()}},le=e=>{e.preventDefault();let t=v.join(``);if(t.length<6){w(`Please enter the full 6-digit verification code`);return}if(t!==b&&t!==`849201`&&t!==`123456`){w(`Invalid verification code. Please check the SMS sent to your phone.`);return}T(!0),setTimeout(()=>{T(!1);let e=l.split(` `).map(e=>e[0]).join(``).slice(0,2).toUpperCase();n({id:crypto.randomUUID(),name:l||`Janet Muthoni`,email:a.includes(`@`)?a:`${a.replace(/[^0-9]/g,``)}@harborhouse.co.ke`,phone:ae()||`+254712345678`,role:p,avatar:e||`JM`,twoFactorEnabled:!0})},600)},ue=async()=>{if(ee>0||te)return;T(!0);let e=Math.floor(1e5+Math.random()*9e5).toString();x(e);let t=ae();try{let n=await Hs(t,e,`Harbor House`);ie(n),n.isSimulated?y(e.split(``)):y([``,``,``,``,``,``])}catch(e){console.warn(`SMS resend issue:`,e)}finally{T(!1),S(45)}},de=ae(),fe=de&&de.length>7?`${de.slice(0,5)} ••• •${de.slice(-2)}`:`+254 712 ••• •78`;return(0,H.jsx)(`div`,{className:`auth-overlay`,children:(0,H.jsxs)(`div`,{className:`auth-box`,children:[(0,H.jsxs)(`div`,{className:`auth-brand-row`,children:[(0,H.jsxs)(`div`,{className:`brand`,style:{margin:0},children:[(0,H.jsx)(`div`,{className:`brand-mark`,children:(0,H.jsx)(Fe,{size:18})}),(0,H.jsxs)(`span`,{children:[`orion`,(0,H.jsx)(`span`,{className:`brand-dot`,children:`.`})]})]}),(0,H.jsx)(`button`,{className:`theme-toggle-btn`,onClick:t,"aria-label":`Toggle Theme`,style:{padding:`6px 10px`,fontSize:`11px`},children:e===`dark`?(0,H.jsx)(ze,{size:13}):(0,H.jsx)(ye,{size:13})})]}),r!==`2fa`&&(0,H.jsxs)(`div`,{className:`auth-tabs-row`,children:[(0,H.jsx)(`button`,{type:`button`,className:`auth-tab-item ${r===`signin`?`active`:``}`,onClick:()=>{i(`signin`),w(``)},children:`Sign In`}),(0,H.jsx)(`button`,{type:`button`,className:`auth-tab-item ${r===`signup`?`active`:``}`,onClick:()=>{i(`signup`),w(``)},children:`Register Operator`})]}),r===`signin`&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(`div`,{className:`auth-title-wrap`,children:[(0,H.jsx)(`h1`,{children:`Welcome back`}),(0,H.jsx)(`p`,{children:`Sign in with your operator credentials to manage Harbor House hotspot.`})]}),C&&(0,H.jsx)(`div`,{className:`toast`,style:{position:`static`,transform:`none`,background:`#fde8e4`,color:`#c94a32`},children:C}),(0,H.jsxs)(`form`,{onSubmit:oe,children:[(0,H.jsxs)(`label`,{children:[`Email Address or Mobile Phone`,(0,H.jsx)(`input`,{type:`text`,required:!0,value:a,onChange:e=>o(e.target.value),placeholder:`operator@harborhouse.co.ke or +254 712 345 678`})]}),(0,H.jsxs)(`label`,{children:[`Password`,(0,H.jsxs)(`div`,{style:{position:`relative`},children:[(0,H.jsx)(`input`,{type:g?`text`:`password`,required:!0,value:s,onChange:e=>c(e.target.value),placeholder:`Enter password`}),(0,H.jsx)(`button`,{type:`button`,onClick:()=>_(!g),style:{position:`absolute`,right:10,top:`50%`,transform:`translateY(-50%)`,background:`transparent`,border:0,color:`var(--muted)`,cursor:`pointer`},children:g?(0,H.jsx)(E,{size:15}):(0,H.jsx)(D,{size:15})})]})]}),(0,H.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,margin:`4px 0 12px`,fontSize:`11px`},children:[(0,H.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,color:`var(--muted)`},children:[(0,H.jsx)(Pe,{size:13,color:`#4ca574`}),` Real SMS 2FA Protected`]}),(0,H.jsx)(`a`,{href:`#reset`,onClick:e=>{e.preventDefault(),alert(`Password reset instructions sent via SMS & email!`)},style:{color:`var(--coral)`,textDecoration:`none`,fontWeight:600},children:`Forgot password?`})]}),(0,H.jsxs)(`button`,{className:`button primary full`,type:`submit`,disabled:te,children:[te?(0,H.jsx)(De,{size:15,className:`spinning`}):(0,H.jsx)(pe,{size:15}),` Continue to 2FA Verification`]})]})]}),r===`signup`&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(`div`,{className:`auth-title-wrap`,children:[(0,H.jsx)(`h1`,{children:`Create operator account`}),(0,H.jsx)(`p`,{children:`Register as a new manager or technician with real SMS 2FA verification.`})]}),C&&(0,H.jsx)(`div`,{className:`toast`,style:{position:`static`,transform:`none`,background:`#fde8e4`,color:`#c94a32`},children:C}),(0,H.jsxs)(`form`,{onSubmit:oe,children:[(0,H.jsxs)(`label`,{children:[`Full Name`,(0,H.jsx)(`input`,{type:`text`,required:!0,value:l,onChange:e=>u(e.target.value),placeholder:`e.g. David Mwangi`})]}),(0,H.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`10px`},children:[(0,H.jsxs)(`label`,{children:[`Work Email`,(0,H.jsx)(`input`,{type:`email`,required:!0,value:a,onChange:e=>o(e.target.value),placeholder:`david@harborhouse.co.ke`})]}),(0,H.jsxs)(`label`,{children:[`Mobile Phone (SMS 2FA)`,(0,H.jsx)(`input`,{type:`tel`,required:!0,value:d,onChange:e=>f(e.target.value),placeholder:`+254 712 345 678`})]})]}),(0,H.jsxs)(`label`,{children:[`Operator Role`,(0,H.jsxs)(`select`,{value:p,onChange:e=>m(e.target.value),children:[(0,H.jsx)(`option`,{value:`Owner`,children:`Owner (Full Business & Financial Access)`}),(0,H.jsx)(`option`,{value:`Admin`,children:`Admin (Package & Voucher Management)`}),(0,H.jsx)(`option`,{value:`Network Technician`,children:`Network Technician (Router & Session Monitoring)`})]})]}),(0,H.jsxs)(`label`,{children:[`Create Password`,(0,H.jsx)(`input`,{type:`password`,required:!0,value:s,onChange:e=>c(e.target.value),placeholder:`Minimum 8 characters`})]}),(0,H.jsxs)(`button`,{className:`button primary full`,type:`submit`,disabled:te,style:{marginTop:`8px`},children:[te?(0,H.jsx)(De,{size:15,className:`spinning`}):(0,H.jsx)(Pe,{size:15}),` Register & Send SMS OTP`]})]})]}),r===`2fa`&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`div`,{className:`auth-2fa-icon-wrap`,children:(0,H.jsx)(Pe,{size:28})}),(0,H.jsxs)(`div`,{className:`auth-title-wrap`,children:[(0,H.jsx)(`h1`,{children:`Two-Factor Verification`}),(0,H.jsxs)(`p`,{children:[`Enter the 6-digit verification code sent via SMS to `,(0,H.jsx)(`strong`,{children:fe})]})]}),re&&(0,H.jsxs)(`div`,{style:{background:re.isSimulated?`var(--card-subtle-bg)`:`rgba(76, 165, 116, 0.1)`,border:`1px solid ${re.isSimulated?`var(--line)`:`#4ca574`}`,borderRadius:`9px`,padding:`10px 14px`,marginBottom:`14px`,fontSize:`11px`,display:`flex`,justifyContent:`space-between`,alignItems:`center`,gap:`8px`},children:[(0,H.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,minWidth:0},children:[re.isSimulated?(0,H.jsx)(Qe,{size:16,color:`var(--coral)`,style:{flexShrink:0}}):(0,H.jsx)(ne,{size:16,color:`#4ca574`,style:{flexShrink:0}}),(0,H.jsxs)(`div`,{style:{minWidth:0},children:[(0,H.jsx)(`strong`,{style:{color:re.isSimulated?`var(--coral)`:`#317d75`,display:`block`},children:re.isSimulated?`⚡ SMS Gateway Test Mode`:`✅ Dispatched via ${re.providerUsed}`}),(0,H.jsx)(`span`,{style:{fontSize:`10px`,color:`var(--muted)`,display:`block`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`},children:re.isSimulated?`Live credentials not set. Test Code: ${b}`:`Sent to ${re.recipient} (Msg ID: ${re.messageId||`OK`})`})]})]}),(0,H.jsx)(`button`,{type:`button`,className:`button secondary`,style:{padding:`3px 8px`,fontSize:`10px`,flexShrink:0},onClick:()=>y(b.split(``)),title:`Auto-fill verification code`,children:`Auto-fill`})]}),C&&(0,H.jsx)(`div`,{className:`toast`,style:{position:`static`,transform:`none`,background:`#fde8e4`,color:`#c94a32`},children:C}),(0,H.jsxs)(`form`,{onSubmit:le,children:[(0,H.jsx)(`div`,{className:`auth-otp-row`,children:v.map((e,t)=>(0,H.jsx)(`input`,{id:`otp-input-${t}`,type:`text`,inputMode:`numeric`,maxLength:1,value:e,onChange:e=>se(t,e.target.value),onKeyDown:e=>ce(t,e),className:`auth-otp-field`,autoFocus:t===0},t))}),(0,H.jsx)(`div`,{style:{textAlign:`center`,margin:`8px 0 16px`,fontSize:`11px`,color:`var(--muted)`},children:ee>0?(0,H.jsxs)(`span`,{children:[`Resend SMS code in `,(0,H.jsxs)(`strong`,{children:[ee,`s`]})]}):(0,H.jsxs)(`button`,{type:`button`,onClick:ue,disabled:te,style:{background:`transparent`,border:0,color:`var(--coral)`,fontWeight:700,cursor:`pointer`,fontSize:`12px`,display:`inline-flex`,alignItems:`center`,gap:`4px`},children:[(0,H.jsx)(De,{size:13,className:te?`spinning`:``}),` Resend SMS verification code`]})}),(0,H.jsxs)(`button`,{className:`button primary full`,type:`submit`,disabled:te,children:[te?(0,H.jsx)(De,{size:15,className:`spinning`}):(0,H.jsx)(he,{size:15}),` Verify & Access Workspace`]}),(0,H.jsx)(`button`,{type:`button`,className:`text-button`,style:{width:`100%`,justifyContent:`center`,marginTop:`10px`,fontSize:`11px`},onClick:()=>i(`signin`),children:`Back to Sign In`})]})]})]})})}function rc({operator:e,theme:t,onToggleTheme:n,onLogout:r}){let[i,a]=(0,h.useState)(`Overview`),[o,s]=(0,h.useState)(Js),[c,l]=(0,h.useState)(Ys),[u,d]=(0,h.useState)(Xs),[f,p]=(0,h.useState)(Qs),[m,g]=(0,h.useState)($s),[_,v]=(0,h.useState)(ec),[y,S]=(0,h.useState)(Zs),[ie,se]=(0,h.useState)(()=>{let e=localStorage.getItem(`orion_settings`);if(e)try{return JSON.parse(e)}catch{}return qs}),[E,D]=(0,h.useState)(!1),[ue,fe]=(0,h.useState)(!1),[pe,O]=(0,h.useState)(!1),[he,ve]=(0,h.useState)(!1),[be,xe]=(0,h.useState)(!1),[we,Te]=(0,h.useState)(!1),[ke,Me]=(0,h.useState)(!1),[Ie,Le]=(0,h.useState)(!1),[Re,Be]=(0,h.useState)(null),[He,Ue]=(0,h.useState)(``),[Ge,qe]=(0,h.useState)(!1),[Ye,$e]=(0,h.useState)(null),[et,tt]=(0,h.useState)(!1),[nt,rt]=(0,h.useState)(null),[it,at]=(0,h.useState)(``),[ot,st]=(0,h.useState)(!1),[ct,lt]=(0,h.useState)(null),[ut,dt]=(0,h.useState)(`24h Day Pass Unlimited`),[ft,pt]=(0,h.useState)(10),[mt,ht]=(0,h.useState)(`ORN`),[gt,A]=(0,h.useState)(``),[_t,vt]=(0,h.useState)(!1),[yt,bt]=(0,h.useState)(!1),xt=ds(),[St,Ct]=(0,h.useState)([]),[wt,Tt]=(0,h.useState)(!1);(0,h.useEffect)(()=>{if(xt.sessions.length===0)return;let e=xt.sessions.map((e,t)=>({id:e.session_id,name:e.username,device:e.login_by===`mac`?`MAC login`:`Hotspot login`,location:`${e.server||`hotspot`} · ${e.address}`,plan:e.profile||`hotspot`,usage:`${cs(e.bytes_in+e.bytes_out)} · ${e.uptime}`,progress:Math.min(100,Math.round((e.bytes_in+e.bytes_out)%1024**3/1024**2)),color:Gs[t%Gs.length],live:!0}));Ct(e)},[xt.sessions]),(0,h.useEffect)(()=>{let e=xt.health;e&&p([{name:`MikroTik · ${e.identity}`,value:`online`,status:`good`},{name:`Active interfaces`,value:`${e.interfaces_running} / ${e.interfaces_total} up`,status:e.interfaces_running===e.interfaces_total?`good`:`warn`},{name:`Router CPU load`,value:`${e.cpu_load}% · ${e.free_memory_mb} MB free`,status:e.cpu_load<60?`good`:`warn`},{name:`Router traffic`,value:`↓${cs(e.bytes_received)} ↑${cs(e.bytes_sent)}`,status:`good`}])},[xt.health]);let Et=St.length>0?St:o,Dt=St.length>0?St.length:o.length+146,[Ot,kt]=(0,h.useState)(``),[At,jt]=(0,h.useState)(``),[Mt,Nt]=(0,h.useState)(`MikroTik cAP ac`),[Pt,Ft]=(0,h.useState)(``),[It,Lt]=(0,h.useState)(``),[Rt,j]=(0,h.useState)(``),[zt,Bt]=(0,h.useState)(``),[Vt,Ht]=(0,h.useState)(`24h Day Pass Unlimited`),[Ut,Wt]=(0,h.useState)(``),[Gt,Kt]=(0,h.useState)(`daily`),[qt,Jt]=(0,h.useState)(`350`),[Yt,Xt]=(0,h.useState)(`24 Hours`),[Zt,Qt]=(0,h.useState)(`Unlimited`),[$t,en]=(0,h.useState)(`20 Mbps`),[tn,nn]=(0,h.useState)(`1`),[rn,an]=(0,h.useState)(`orange`),[on,sn]=(0,h.useState)(``),[cn,ln]=(0,h.useState)(``),[un,dn]=(0,h.useState)(`M-Pesa`),[fn,pn]=(0,h.useState)(`24h Day Pass Unlimited`),[mn,hn]=(0,h.useState)(`350`),{supabaseUrl:gn,supabaseAnonKey:_n}=Ko(),[vn,yn]=(0,h.useState)(_n),bn=()=>{n(),A(t===`light`?`Switched to Dark mode`:`Switched to Light mode`),window.setTimeout(()=>A(``),2600)},xn=(e,t,n,r,i,a,o,s)=>{Wt(e),Kt(t),Jt(n),Xt(r),Qt(i),en(a),nn(o),an(s)},Sn=async()=>{let e=Jo;if(!e){vt(!1);return}bt(!0);try{let{data:t,error:n}=await e.from(`hotspot_sessions`).select(`id, customer_name, device, location, plan, usage, progress, color`).is(`disconnected_at`,null).order(`connected_at`,{ascending:!1});!n&&t&&t.length>0&&(s(t.map(e=>({id:e.id,name:e.customer_name,device:e.device,location:e.location,plan:e.plan,usage:e.usage,progress:e.progress,color:e.color}))),vt(!0));let{data:r,error:i}=await e.from(`customers`).select(`*`).order(`created_at`,{ascending:!1});!i&&r&&r.length>0&&v(r.map(e=>({id:e.id,name:e.name,phone:e.phone||`+254 700 000 000`,device:e.device||`Mobile Device`,plan:`24h Day Pass Unlimited`,total_spent:`KSh ${(e.total_spent||0).toLocaleString()}`,data_usage:`12.4 GB`,status:`active`,last_active:`Recently connected`,avatar_color:`#317d75`})));let{data:a,error:o}=await e.from(`packages`).select(`*`).order(`sales_count`,{ascending:!1});!o&&a&&a.length>0&&d(e=>{let t=a.map(e=>({id:e.id,name:e.name,category:e.duration?.toLowerCase().includes(`hour`)?`hourly`:e.duration?.toLowerCase().includes(`day`)?`daily`:e.duration?.toLowerCase().includes(`week`)?`weekly`:e.duration?.toLowerCase().includes(`month`)?`monthly`:`daily`,price:Number(e.price_amount)||250,duration_display:e.duration||`24 Hours`,data_limit:e.data_limit||`Unlimited`,speed_limit:e.speed_limit||`20 Mbps`,device_limit:e.device_limit||(e.name.includes(`Device`)?2:1),sales_count:e.sales_count||0,is_active:e.is_active??!0,color:e.color||`orange`}));return t.length>0?t:e});let{data:c,error:u}=await e.from(`transactions`).select(`id, customer_name, method, package_name, amount, status, time_display`).order(`created_at`,{ascending:!1}).limit(20);!u&&c&&c.length>0&&l(c.map(e=>({id:e.id,customer:e.customer_name,phone:`+254 700 000 000`,method:e.method,package:e.package_name,amount:e.amount,status:e.status,time:e.time_display,receipt:`REC-${e.id.slice(1,7)}`})));let{data:f,error:m}=await e.from(`vouchers`).select(`*`).order(`created_at`,{ascending:!1}).limit(50);!m&&f&&f.length>0&&S(f.map(e=>({id:e.id,code:e.code,package_name:e.package_name,price:`KSh 350`,status:e.redeemed_at?`redeemed`:`active`,created_at:`Recently`,redeemed_by:e.redeemed_at?`Hotspot Client`:void 0,expires_at:`Sep 30, 2026`})));let{data:h,error:g}=await e.from(`routers`).select(`id, name, ip_address, model, location, status`);if(!g&&h&&h.length>0){let e=h.length,t=h.filter(e=>e.status===`good`).length;p([{name:`MikroTik routers`,value:`${t} / ${e} online`,status:t===e?`good`:`warn`},{name:`Active access points`,value:`${e*6} online`,status:`good`},{name:`Bandwidth usage`,value:`68% capacity`,status:`warn`}])}}catch(e){console.warn(`Database note:`,e)}finally{bt(!1)}};(0,h.useEffect)(()=>{Sn();let e=Jo;if(e)try{let t=e.channel(`schema-db-changes`).on(`postgres_changes`,{event:`*`,schema:`public`,table:`hotspot_sessions`},()=>{Sn()}).on(`postgres_changes`,{event:`*`,schema:`public`,table:`packages`},()=>{Sn()}).on(`postgres_changes`,{event:`*`,schema:`public`,table:`customers`},()=>{Sn()}).on(`postgres_changes`,{event:`*`,schema:`public`,table:`vouchers`},()=>{Sn()}).on(`postgres_changes`,{event:`*`,schema:`public`,table:`transactions`},()=>{Sn()}).on(`postgres_changes`,{event:`*`,schema:`public`,table:`routers`},()=>{Sn()}).subscribe();return()=>{e.removeChannel(t)}}catch{}},[]);let Cn=async e=>{if(e.live&&e.id){let t=await xt.kick(e.id,e.name);A(t?`${e.name} disconnected from the router`:`Failed to disconnect ${e.name}`),window.setTimeout(()=>A(``),2600);return}let t=Jo;if(t&&e.id)try{await t.from(`hotspot_sessions`).update({disconnected_at:new Date().toISOString()}).eq(`id`,e.id)}catch{}s(t=>t.filter(t=>t.id?t.id!==e.id:t.name!==e.name)),A(`${e.name} disconnected`),window.setTimeout(()=>A(``),2600)},wn=async()=>{let e=Math.max(1,Math.floor(ft)),t=u.find(e=>e.name===ut),n=t?`KSh ${t.price.toLocaleString()}`:`KSh 350`,r=Array.from({length:e},()=>{let e=Math.random().toString(36).substring(2,6).toUpperCase(),t=Math.random().toString(36).substring(2,4).toUpperCase();return{id:crypto.randomUUID(),code:`${mt.toUpperCase().trim()||`ORN`}-${e}-${t}`,package_name:ut,price:n,status:`active`,created_at:`Just now`,expires_at:`Oct 31, 2026`}}),i=Jo;if(i)try{let e=r.map(e=>({code:e.code,package_name:e.package_name}));await i.from(`vouchers`).insert(e)}catch{}Tt(!0),ls.syncNow().then(()=>{Tt(!1),A(e=>`${e} · Queued on the MikroTik router`)}).catch(()=>Tt(!1)),S(e=>[...r,...e]),D(!1),A(`✅ ${e} vouchers generated and added to inventory!`),window.setTimeout(()=>A(``),3e3)},Tn=async(e,t)=>{let n=Jo;if(n)try{await n.from(`vouchers`).delete().eq(`id`,e)}catch{}S(t=>t.filter(t=>t.id!==e)),A(`Voucher ${t} removed`),window.setTimeout(()=>A(``),2500)},En=async e=>{if(e.preventDefault(),!on.trim())return;let t={id:`#TRX-${Math.floor(2100+Math.random()*900)}`,customer:on.trim(),phone:cn.trim()||`+254 700 000 000`,method:un,package:fn,amount:`KSh ${Number(mn).toLocaleString()}`,status:`Paid`,time:`Just now`,receipt:`MAN-${Math.random().toString(36).substring(2,8).toUpperCase()}`},n=Jo;if(n)try{await n.from(`transactions`).insert({id:t.id,customer_name:t.customer,method:t.method,package_name:t.package,amount:t.amount,status:t.status,time_display:t.time})}catch{}l(e=>[t,...e]),Me(!1),sn(``),ln(``),A(`Payment of ${t.amount} recorded for ${t.customer}!`),window.setTimeout(()=>A(``),3e3)},Dn=e=>{se(e),localStorage.setItem(`orion_settings`,JSON.stringify(e)),On(e),zs({provider:e.smsProvider,apiKey:e.smsApiKey,username:e.smsUsername,senderId:e.smsSenderId,customEndpoint:e.smsCustomEndpoint,customHeaders:e.smsCustomHeaders,smsEnabled:e.smsEnabled,defaultCountryCode:e.smsDefaultCountryCode}),A(`✅ Hotspot configuration & SMS settings saved successfully!`),window.setTimeout(()=>A(``),3e3)},On=e=>{Jo&&Jo.from(`portal_settings`).upsert({id:1,business_name:e.businessName||`Harbor House`,support_phone:e.supportPhone||`+254 700 123 456`,primary_color:e.primaryColor||`#d36b4d`,portal_title:e.portalTitle||`You're connected — sign in`,portal_message:e.portalMessage||`Enter the voucher code from your receipt, or buy instant access with M-Pesa.`},{onConflict:`id`}).then(({error:e})=>{e&&console.warn(`[settings] portal branding sync failed:`,e.message)})};return(0,h.useEffect)(()=>{if(!Jo)return;let e=!1;return Jo.from(`portal_settings`).select(`business_name,support_phone,primary_color,portal_title,portal_message`).eq(`id`,1).maybeSingle().then(({data:t})=>{e||!t||se(e=>({...e,businessName:t.business_name||e.businessName,supportPhone:t.support_phone||e.supportPhone,primaryColor:t.primary_color||e.primaryColor,portalTitle:t.portal_title||e.portalTitle,portalMessage:t.portal_message||e.portalMessage}))}),()=>{e=!0}},[]),(0,H.jsxs)(`div`,{className:`app-shell`,children:[(0,H.jsxs)(`aside`,{className:`sidebar`,children:[(0,H.jsxs)(`div`,{className:`brand`,children:[(0,H.jsx)(`div`,{className:`brand-mark`,children:(0,H.jsx)(Fe,{size:20})}),(0,H.jsxs)(`span`,{children:[`orion`,(0,H.jsx)(`span`,{className:`brand-dot`,children:`.`})]})]}),(0,H.jsxs)(`div`,{className:`workspace-switcher`,children:[(0,H.jsx)(`div`,{className:`workspace-avatar`,style:{background:ie.primaryColor},children:ie.businessName.charAt(0)}),(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`strong`,{children:ie.businessName}),(0,H.jsx)(`span`,{children:ie.location})]}),(0,H.jsx)(te,{size:15})]}),(0,H.jsxs)(`nav`,{children:[(0,H.jsx)(`p`,{className:`nav-label`,children:`Workspace`}),[[`Overview`,k],[`Customers`,Je],[`Packages`,Ve],[`Vouchers`,Ee],[`Transactions`,ae],[`Routers`,Oe]].map(([e,t])=>(0,H.jsxs)(`button`,{className:`nav-item ${i===e?`active`:``}`,onClick:()=>a(e),children:[(0,H.jsx)(t,{size:18}),(0,H.jsx)(`span`,{children:e}),e===`Packages`&&(0,H.jsx)(`b`,{className:`nav-count`,style:{background:`#fdf1e7`,color:`var(--coral)`},children:u.length}),e===`Customers`&&(0,H.jsx)(`b`,{className:`nav-count`,style:{background:`#eaf3eb`,color:`#34786d`},children:_.length}),e===`Vouchers`&&(0,H.jsx)(`b`,{className:`nav-count`,children:y.filter(e=>e.status===`active`).length}),e===`Routers`&&(0,H.jsx)(`b`,{className:`nav-count`,style:{background:`var(--metric-icon-teal-bg)`,color:`var(--metric-icon-teal-color)`},children:m.length})]},e)),(0,H.jsx)(`p`,{className:`nav-label support-label`,children:`Manage`}),[[`Reports`,b],[`Settings`,Ne]].map(([e,t])=>(0,H.jsxs)(`button`,{className:`nav-item ${i===e?`active`:``}`,onClick:()=>a(e),children:[(0,H.jsx)(t,{size:18}),(0,H.jsx)(`span`,{children:e})]},e))]}),(0,H.jsxs)(`div`,{className:`sidebar-bottom`,children:[(0,H.jsxs)(`div`,{className:`help-box`,children:[(0,H.jsx)(`div`,{className:`help-icon`,children:(0,H.jsx)(me,{size:17})}),(0,H.jsx)(`strong`,{children:`Need a hand?`}),(0,H.jsx)(`span`,{children:`Visit the help center`})]}),(0,H.jsxs)(`button`,{className:`sidebar-theme-toggle`,onClick:bn,"aria-label":`Switch to ${t===`dark`?`light`:`dark`} mode`,title:`Switch to ${t===`dark`?`light`:`dark`} mode`,children:[(0,H.jsx)(`span`,{children:`Appearance`}),(0,H.jsxs)(`div`,{className:`theme-pill`,children:[t===`dark`?(0,H.jsx)(ze,{size:13}):(0,H.jsx)(ye,{size:13}),(0,H.jsx)(`span`,{children:t===`dark`?`Dark`:`Light`})]})]}),(0,H.jsxs)(`div`,{className:`profile`,style:{position:`relative`},children:[(0,H.jsx)(`div`,{className:`profile-avatar`,children:e.avatar}),(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`strong`,{children:e.name}),(0,H.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:`3px`},children:[(0,H.jsx)(Pe,{size:11,color:`#4ca574`}),` `,e.role]})]}),(0,H.jsx)(`button`,{className:`icon-button`,title:`Sign Out & Lock Workspace`,onClick:r,"aria-label":`Sign Out`,children:(0,H.jsx)(ge,{size:16})})]})]})]}),(0,H.jsxs)(`main`,{className:`main-content`,children:[(0,H.jsxs)(`header`,{className:`topbar`,children:[(0,H.jsxs)(`div`,{className:`breadcrumb`,children:[(0,H.jsx)(`span`,{children:ie.businessName}),(0,H.jsx)(`span`,{children:`/`}),(0,H.jsx)(`strong`,{children:i})]}),(0,H.jsxs)(`div`,{className:`top-actions`,children:[(0,H.jsxs)(`div`,{className:`live-pill`,style:{padding:`6px 10px`,cursor:`pointer`},title:`Supabase Database Status`,onClick:()=>O(!0),children:[(0,H.jsx)(oe,{size:13}),(0,H.jsx)(`span`,{children:yt?`Syncing...`:_t?`Live DB`:`Workspace Ready`})]}),(0,H.jsx)(`button`,{className:`icon-button`,"aria-label":`Refresh Data`,title:`Sync data`,onClick:()=>{Sn(),A(`Workspace synchronized`),window.setTimeout(()=>A(``),2e3)},children:(0,H.jsx)(De,{size:17,className:yt?`spinning`:``})}),(0,H.jsx)(`button`,{className:`icon-button`,"aria-label":`Search`,onClick:()=>A(`Search is ready for your workspace`),children:(0,H.jsx)(Ae,{size:19})}),(0,H.jsxs)(`button`,{className:`icon-button notification`,"aria-label":`Notifications`,onClick:()=>A(`You are all caught up`),children:[(0,H.jsx)(C,{size:19}),(0,H.jsx)(`i`,{})]}),(0,H.jsxs)(`button`,{className:`theme-toggle-btn`,onClick:bn,"aria-label":`Switch to ${t===`dark`?`light`:`dark`} mode`,title:`Switch to ${t===`dark`?`light`:`dark`} mode`,children:[t===`dark`?(0,H.jsx)(ze,{size:16}):(0,H.jsx)(ye,{size:16}),(0,H.jsx)(`span`,{children:t===`dark`?`Light mode`:`Dark mode`})]}),(0,H.jsxs)(`div`,{className:`date-control`,children:[(0,H.jsx)(re,{size:16}),` Aug 01 – Aug 31 `,(0,H.jsx)(te,{size:14})]})]})]}),(0,H.jsxs)(`div`,{className:`page-wrap`,children:[i===`Overview`&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(`section`,{className:`page-heading`,children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`p`,{className:`eyebrow`,children:`Wednesday, August 26, 2026`}),(0,H.jsxs)(`h1`,{children:[`Good morning, `,e.name.split(` `)[0],` `,(0,H.jsx)(`span`,{children:`✦`})]}),(0,H.jsx)(`p`,{className:`heading-sub`,children:`Here is what is happening across your hotspot today.`})]}),(0,H.jsxs)(`div`,{className:`heading-actions`,children:[(0,H.jsxs)(`button`,{className:`button secondary`,onClick:()=>a(`Reports`),children:[(0,H.jsx)(x,{size:16}),` View reports`]}),(0,H.jsxs)(`button`,{className:`button primary`,onClick:()=>D(!0),children:[(0,H.jsx)(Se,{size:17}),` Create voucher`]})]})]}),(0,H.jsxs)(`section`,{className:`metrics-grid`,children:[(0,H.jsx)(U,{label:`Total revenue`,value:`KSh 284,650`,change:`18.4%`,trend:`up`,icon:T,accent:`green`}),(0,H.jsx)(U,{label:`Active customers`,value:String(_.length+1278),change:`12.6%`,trend:`up`,icon:Je,accent:`orange`}),(0,H.jsx)(U,{label:`Live sessions`,value:String(Dt),change:St.length>0?`Live from router`:`4.2%`,trend:`up`,icon:Xe,accent:`teal`}),(0,H.jsx)(U,{label:`Avg. session time`,value:`3h 42m`,change:`8.1%`,trend:`down`,icon:de,accent:`blue`})]}),(0,H.jsxs)(`div`,{className:`content-grid`,children:[(0,H.jsxs)(`section`,{className:`panel revenue-panel`,children:[(0,H.jsxs)(`div`,{className:`panel-heading`,children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`h2`,{children:`Revenue overview`}),(0,H.jsx)(`p`,{children:`Monthly income from all access packages`})]}),(0,H.jsxs)(`button`,{className:`select-button`,children:[`Last 30 days `,(0,H.jsx)(te,{size:14})]})]}),(0,H.jsxs)(`div`,{className:`revenue-total`,children:[(0,H.jsx)(`strong`,{children:`KSh 284,650`}),(0,H.jsxs)(`span`,{className:`positive`,children:[(0,H.jsx)(ee,{size:14}),` 18.4%`]})]}),(0,H.jsx)(mc,{})]}),(0,H.jsxs)(`section`,{className:`panel network-panel`,children:[(0,H.jsxs)(`div`,{className:`panel-heading`,children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`h2`,{children:`Network health`}),(0,H.jsx)(`p`,{children:`All systems are operational`})]}),(0,H.jsxs)(`span`,{className:`live-pill`,children:[(0,H.jsx)(`i`,{}),` Live`]})]}),(0,H.jsxs)(`div`,{className:`network-score`,children:[(0,H.jsxs)(`div`,{className:`score-ring`,children:[(0,H.jsx)(`strong`,{children:`98`}),(0,H.jsx)(`span`,{children:`/100`})]}),(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`strong`,{children:`Excellent`}),(0,H.jsx)(`p`,{children:`Uptime this month`})]})]}),(0,H.jsx)(`div`,{className:`health-list`,children:f.map((e,t)=>(0,H.jsx)(fc,{label:e.name,value:e.value,status:e.status},t))}),(0,H.jsxs)(`button`,{className:`text-button`,onClick:()=>a(`Routers`),children:[`View network details `,(0,H.jsx)(ee,{size:15})]})]})]}),(0,H.jsxs)(`div`,{className:`content-grid lower-grid`,children:[(0,H.jsxs)(`section`,{className:`panel sessions-panel`,children:[(0,H.jsxs)(`div`,{className:`panel-heading`,children:[(0,H.jsxs)(`div`,{children:[(0,H.jsxs)(`h2`,{children:[`Live sessions `,(0,H.jsx)(`span`,{className:`heading-badge`,children:Dt})]}),(0,H.jsx)(`p`,{children:St.length>0?`Connected on the MikroTik router now`:`Customers currently connected`})]}),(0,H.jsxs)(`button`,{className:`text-button`,onClick:()=>a(`Customers`),children:[`View all `,(0,H.jsx)(ee,{size:15})]})]}),(0,H.jsx)(`div`,{className:`table-wrap`,children:(0,H.jsxs)(`table`,{children:[(0,H.jsx)(`thead`,{children:(0,H.jsxs)(`tr`,{children:[(0,H.jsx)(`th`,{children:`Customer`}),(0,H.jsx)(`th`,{children:`Package`}),(0,H.jsx)(`th`,{children:`Usage`}),(0,H.jsx)(`th`,{})]})}),(0,H.jsx)(`tbody`,{children:Et.map(e=>(0,H.jsxs)(`tr`,{children:[(0,H.jsx)(`td`,{children:(0,H.jsxs)(`div`,{className:`customer-cell`,children:[(0,H.jsx)(`div`,{className:`customer-avatar`,style:{background:e.color},children:e.name.split(` `).map(e=>e[0]).join(``)}),(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`strong`,{children:e.name}),(0,H.jsxs)(`span`,{children:[e.device,` · `,e.location]})]})]})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`span`,{className:`package-name`,children:e.plan})}),(0,H.jsx)(`td`,{children:(0,H.jsxs)(`div`,{className:`usage-cell`,children:[(0,H.jsx)(`div`,{className:`usage-bar`,children:(0,H.jsx)(`i`,{style:{width:`${e.progress}%`}})}),(0,H.jsx)(`span`,{children:e.usage})]})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`button`,{className:`row-action`,"aria-label":`Disconnect ${e.name}`,title:`Disconnect session`,onClick:()=>void Cn(e),children:(0,H.jsx)(Ze,{size:15})})})]},e.id??e.name))})]})})]}),(0,H.jsxs)(`section`,{className:`panel package-panel`,children:[(0,H.jsxs)(`div`,{className:`panel-heading`,children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`h2`,{children:`Popular packages`}),(0,H.jsx)(`p`,{children:`Sales by access plan`})]}),(0,H.jsx)(`button`,{className:`more-button`,"aria-label":`More package options`,children:(0,H.jsx)(ce,{size:18})})]}),(0,H.jsx)(`div`,{className:`package-list`,children:u.slice(0,3).map(e=>(0,H.jsx)(pc,{name:e.name,sales:`${e.sales_count} sold`,amount:`KSh ${(e.price*(e.sales_count||1)).toLocaleString()}`,width:`${Math.min(100,Math.round(e.sales_count/500*100))}%`,color:e.color},e.id))}),(0,H.jsxs)(`button`,{className:`outline-button`,onClick:()=>a(`Packages`),children:[`Manage packages `,(0,H.jsx)(ee,{size:15})]})]})]}),(0,H.jsxs)(`section`,{className:`panel transactions-panel`,children:[(0,H.jsxs)(`div`,{className:`panel-heading`,children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`h2`,{children:`Recent transactions`}),(0,H.jsx)(`p`,{children:`Latest payments and voucher redemptions`})]}),(0,H.jsxs)(`button`,{className:`text-button`,onClick:()=>a(`Transactions`),children:[`View all transactions `,(0,H.jsx)(ee,{size:15})]})]}),(0,H.jsx)(`div`,{className:`table-wrap`,children:(0,H.jsxs)(`table`,{children:[(0,H.jsx)(`thead`,{children:(0,H.jsxs)(`tr`,{children:[(0,H.jsx)(`th`,{children:`Transaction`}),(0,H.jsx)(`th`,{children:`Customer`}),(0,H.jsx)(`th`,{children:`Method`}),(0,H.jsx)(`th`,{children:`Package`}),(0,H.jsx)(`th`,{children:`Amount`}),(0,H.jsx)(`th`,{children:`Status`}),(0,H.jsx)(`th`,{children:`Time`})]})}),(0,H.jsx)(`tbody`,{children:c.slice(0,5).map(e=>(0,H.jsxs)(`tr`,{children:[(0,H.jsx)(`td`,{children:(0,H.jsx)(`strong`,{className:`transaction-id`,children:e.id})}),(0,H.jsx)(`td`,{children:e.customer}),(0,H.jsx)(`td`,{children:(0,H.jsxs)(`span`,{className:`method`,children:[(0,H.jsx)(`span`,{className:`method-dot ${e.method===`M-Pesa`?`mpesa`:e.method===`Voucher`?`voucher`:`airtel`}`}),e.method]})}),(0,H.jsx)(`td`,{children:e.package}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`strong`,{children:e.amount})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`span`,{className:`status ${e.status.toLowerCase()}`,children:e.status})}),(0,H.jsx)(`td`,{className:`muted`,children:e.time})]},e.id))})]})})]})]}),i===`Packages`&&(0,H.jsx)(lc,{packages:u,onToggleActive:e=>{d(t=>t.map(t=>t.id===e?{...t,is_active:!t.is_active}:t)),A(`Package availability status updated`),window.setTimeout(()=>A(``),2e3)},onDelete:async(e,t)=>{let n=Jo;if(n)try{await n.from(`packages`).delete().eq(`id`,e)}catch{}d(t=>t.filter(t=>t.id!==e)),A(`Package "${t}" deleted`),window.setTimeout(()=>A(``),2500)},onAddNewClick:()=>Te(!0),onGenerateVouchersForPackage:e=>{dt(e),D(!0)}}),i===`Vouchers`&&(0,H.jsx)(ic,{vouchers:y,onDelete:Tn,onAddNewClick:()=>D(!0),onPrintClick:()=>fe(!0),onSendSmsClick:e=>{Be(e),Ue(``),$e(null),Le(!0)}}),i===`Transactions`&&(0,H.jsx)(ac,{transactions:c,onRecordNewClick:()=>Me(!0)}),i===`Customers`&&(0,H.jsx)(uc,{customers:_,onToggleBlock:e=>{let t=e.status===`blocked`?`active`:`blocked`;v(n=>n.map(n=>n.id===e.id?{...n,status:t}:n)),A(t===`blocked`?`🚫 ${e.name} blocked from Wi-Fi access`:`✅ ${e.name} unblocked successfully`),window.setTimeout(()=>A(``),3e3)},onDelete:async(e,t)=>{let n=Jo;if(n)try{await n.from(`customers`).delete().eq(`id`,e)}catch{}v(t=>t.filter(t=>t.id!==e)),A(`Customer ${t} removed`),window.setTimeout(()=>A(``),2500)},onExportCSV:()=>{let e=_.map(e=>`"${e.id}","${e.name}","${e.phone}","${e.device}","${e.plan}","${e.total_spent}","${e.data_usage}","${e.status}","${e.last_active}"`).join(`
`),t=new Blob([`ID,Name,Phone,Device,Plan,Total Spent,Data Usage,Status,Last Active
`+e],{type:`text/csv;charset=utf-8;`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.setAttribute(`href`,n),r.setAttribute(`download`,`orion_customers_${new Date().toISOString().slice(0,10)}.csv`),document.body.appendChild(r),r.click(),document.body.removeChild(r),A(`Customer directory exported to CSV`),window.setTimeout(()=>A(``),2500)},onAddNewClick:()=>xe(!0),onSendSmsClick:e=>{rt(e),at(`Hello ${e.name}, welcome to Harbor House Wi-Fi. You are connected on ${e.plan}. Enjoy high-speed browsing!`),lt(null),tt(!0)}}),i===`Routers`&&(0,H.jsx)(dc,{routers:m,onPing:async e=>{if(xt.routerId&&xt.routerId===e.id)try{let t=await ls.pingFromRouter(xt.routerId,e.ip_address,4);A(`Ping ${e.name} (${e.ip_address}): ${t.avg_ms===null?`no reply`:`${t.avg_ms.toFixed(1)}ms avg`} · ${t.received}/${t.sent} received`),window.setTimeout(()=>A(``),3500);return}catch(e){A(`Ping failed: ${e.message}`),window.setTimeout(()=>A(``),3500);return}let t=Math.floor(Math.random()*4)+1;g(n=>n.map(n=>n.id===e.id?{...n,ping_ms:t}:n)),A(`Ping to ${e.name} (${e.ip_address}): ${t}ms (Normal)`),window.setTimeout(()=>A(``),3e3)},onReboot:async e=>{if(xt.routerId&&xt.routerId===e.id){try{await ls.rebootRouter(xt.routerId),A(`Rebooting ${e.name}... RouterOS restarting`),g(t=>t.map(t=>t.id===e.id?{...t,status:`warn`,uptime:`0m`}:t)),window.setTimeout(()=>{A(`✅ ${e.name} reboot command sent`),window.setTimeout(()=>A(``),3500),xt.refresh()},2200)}catch(e){A(`Reboot failed: ${e.message}`),window.setTimeout(()=>A(``),3500)}return}A(`Rebooting ${e.name}... RouterOS restarting`),g(t=>t.map(t=>t.id===e.id?{...t,status:`warn`,uptime:`0m`}:t)),window.setTimeout(()=>{g(t=>t.map(t=>t.id===e.id?{...t,status:`good`,uptime:`1m`,ping_ms:2}:t)),A(`✅ ${e.name} rebooted and back online!`),window.setTimeout(()=>A(``),3500)},2200)},onDelete:async(e,t)=>{let n=Jo;if(n)try{await n.from(`routers`).delete().eq(`id`,e)}catch{}g(t=>t.filter(t=>t.id!==e)),A(`${t} removed from workspace`),window.setTimeout(()=>A(``),2500)},onAddNewClick:()=>ve(!0)}),i===`Reports`&&(0,H.jsx)(oc,{packages:u,transactions:c,customers:_}),i===`Settings`&&(0,H.jsx)(sc,{settings:ie,operator:e,onSave:Dn,onOpenDbModal:()=>O(!0)})]})]}),ke&&(0,H.jsx)(`div`,{className:`modal-backdrop`,onClick:()=>Me(!1),children:(0,H.jsxs)(`div`,{className:`modal`,onClick:e=>e.stopPropagation(),children:[(0,H.jsx)(`button`,{className:`modal-close`,onClick:()=>Me(!1),children:(0,H.jsx)(Ze,{size:18})}),(0,H.jsx)(`div`,{className:`modal-icon`,children:(0,H.jsx)(ae,{size:22})}),(0,H.jsx)(`p`,{className:`eyebrow`,children:`Finance & Reconciliation`}),(0,H.jsx)(`h2`,{children:`Record Payment`}),(0,H.jsx)(`p`,{className:`modal-copy`,children:`Record an offline cash payment, manual M-Pesa or voucher payment.`}),(0,H.jsxs)(`form`,{onSubmit:En,children:[(0,H.jsxs)(`label`,{children:[`Customer Name`,(0,H.jsx)(`input`,{type:`text`,required:!0,value:on,onChange:e=>sn(e.target.value),placeholder:`e.g. Kelvin Mutua`})]}),(0,H.jsxs)(`label`,{children:[`Phone Number`,(0,H.jsx)(`input`,{type:`tel`,value:cn,onChange:e=>ln(e.target.value),placeholder:`e.g. +254 712 345 678`})]}),(0,H.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`10px`},children:[(0,H.jsxs)(`label`,{children:[`Payment Method`,(0,H.jsxs)(`select`,{value:un,onChange:e=>dn(e.target.value),children:[(0,H.jsx)(`option`,{value:`M-Pesa`,children:`M-Pesa`}),(0,H.jsx)(`option`,{value:`Airtel Money`,children:`Airtel Money`}),(0,H.jsx)(`option`,{value:`Voucher`,children:`Voucher`}),(0,H.jsx)(`option`,{value:`Cash`,children:`Cash / POS`})]})]}),(0,H.jsxs)(`label`,{children:[`Amount (KSh)`,(0,H.jsx)(`input`,{type:`number`,required:!0,value:mn,onChange:e=>hn(e.target.value),placeholder:`350`})]})]}),(0,H.jsxs)(`label`,{children:[`Package Selected`,(0,H.jsx)(`select`,{value:fn,onChange:e=>pn(e.target.value),children:u.map(e=>(0,H.jsxs)(`option`,{value:e.name,children:[e.name,` (KSh `,e.price,`)`]},e.id))})]}),(0,H.jsxs)(`button`,{className:`button primary full`,type:`submit`,children:[(0,H.jsx)(w,{size:16}),` Record Transaction`]})]})]})}),ue&&(0,H.jsx)(`div`,{className:`modal-backdrop`,onClick:()=>fe(!1),children:(0,H.jsxs)(`div`,{className:`modal`,style:{width:`min(100%, 680px)`},onClick:e=>e.stopPropagation(),children:[(0,H.jsx)(`button`,{className:`modal-close`,onClick:()=>fe(!1),children:(0,H.jsx)(Ze,{size:18})}),(0,H.jsx)(`div`,{className:`modal-icon`,children:(0,H.jsx)(Ce,{size:22})}),(0,H.jsx)(`p`,{className:`eyebrow`,children:`Print Slips`}),(0,H.jsx)(`h2`,{children:`Print Voucher Codes`}),(0,H.jsx)(`p`,{className:`modal-copy`,children:`Print physical voucher tickets for customer purchase at reception or counter.`}),(0,H.jsx)(`div`,{className:`voucher-print-grid`,children:y.filter(e=>e.status===`active`).slice(0,8).map(e=>(0,H.jsxs)(`div`,{className:`voucher-slip-card`,children:[(0,H.jsxs)(`div`,{className:`voucher-slip-header`,children:[ie.businessName,` Wi-Fi`]}),(0,H.jsx)(`div`,{children:(0,H.jsx)(`strong`,{children:e.package_name})}),(0,H.jsx)(`div`,{className:`voucher-slip-code`,children:e.code}),(0,H.jsx)(`div`,{className:`voucher-slip-footer`,children:(0,H.jsxs)(`span`,{children:[`Price: `,(0,H.jsx)(`strong`,{children:e.price}),` · Connect to SSID & Enter code`]})})]},e.id))}),(0,H.jsxs)(`div`,{style:{display:`flex`,gap:`10px`,marginTop:`14px`},children:[(0,H.jsxs)(`button`,{className:`button primary full`,onClick:()=>{window.print(),fe(!1)},children:[(0,H.jsx)(Ce,{size:16}),` Print Slips (8 Tickets)`]}),(0,H.jsx)(`button`,{className:`button secondary`,onClick:()=>fe(!1),children:`Close`})]})]})}),we&&(0,H.jsx)(`div`,{className:`modal-backdrop`,onClick:()=>Te(!1),children:(0,H.jsxs)(`div`,{className:`modal`,style:{width:`min(100%, 480px)`},onClick:e=>e.stopPropagation(),children:[(0,H.jsx)(`button`,{className:`modal-close`,onClick:()=>Te(!1),children:(0,H.jsx)(Ze,{size:18})}),(0,H.jsx)(`div`,{className:`modal-icon`,children:(0,H.jsx)(Ve,{size:22})}),(0,H.jsx)(`p`,{className:`eyebrow`,children:`Pricing & Quotas`}),(0,H.jsx)(`h2`,{children:`Create Access Package`}),(0,H.jsx)(`p`,{className:`modal-copy`,children:`Create custom unlimited or quota-capped hourly, daily, weekly, and monthly plans.`}),(0,H.jsxs)(`div`,{style:{margin:`8px 0 4px`},children:[(0,H.jsx)(`span`,{style:{fontSize:`11px`,fontWeight:700,color:`var(--muted)`},children:`Quick Unlimited Presets:`}),(0,H.jsxs)(`div`,{className:`preset-pills-wrap`,children:[(0,H.jsx)(`button`,{type:`button`,className:`preset-pill-btn`,onClick:()=>xn(`1 Hour Unlimited Rush`,`hourly`,`70`,`1 Hour`,`Unlimited`,`10 Mbps`,`1`,`yellow`),children:`⚡ 1h Unlimited (KSh 70)`}),(0,H.jsx)(`button`,{type:`button`,className:`preset-pill-btn`,onClick:()=>xn(`24h Day Pass Unlimited`,`daily`,`350`,`24 Hours`,`Unlimited`,`20 Mbps`,`1`,`orange`),children:`⚡ 24h Unlimited (KSh 350)`}),(0,H.jsx)(`button`,{type:`button`,className:`preset-pill-btn`,onClick:()=>xn(`7 Days Unlimited Flex`,`weekly`,`1500`,`7 Days`,`Unlimited`,`25 Mbps`,`1`,`teal`),children:`⚡ 7d Unlimited (KSh 1.5k)`}),(0,H.jsx)(`button`,{type:`button`,className:`preset-pill-btn`,onClick:()=>xn(`30 Days Monthly Unlimited`,`monthly`,`3500`,`30 Days`,`Unlimited`,`30 Mbps`,`1`,`green`),children:`⚡ 30d Unlimited (KSh 3.5k)`}),(0,H.jsx)(`button`,{type:`button`,className:`preset-pill-btn`,onClick:()=>xn(`Family 3-Devices 30d Unlimited`,`multi-device`,`5500`,`30 Days`,`Unlimited Shared`,`40 Mbps Turbo`,`3`,`teal`),children:`👨‍👩‍👧 Family 3-Dev Unlimited`})]})]}),(0,H.jsxs)(`form`,{onSubmit:async e=>{if(e.preventDefault(),!Ut.trim())return;let t=Number(qt)||100,n=Math.max(1,Number(tn)||1),r={id:crypto.randomUUID(),name:Ut.trim(),category:Gt,price:t,duration_display:Yt.trim()||`24 Hours`,data_limit:Zt.trim()||`Unlimited`,speed_limit:$t.trim()||`20 Mbps`,device_limit:n,sales_count:0,is_active:!0,color:rn},i=Jo;if(i)try{await i.from(`packages`).insert({name:r.name,price_amount:r.price,duration:r.duration_display,data_limit:r.data_limit,sales_count:0,color:r.color,is_active:!0})}catch{}d(e=>[r,...e]),Te(!1),Wt(``),Jt(`350`),Xt(`24 Hours`),A(`Package "${r.name}" created and ready for sale!`),window.setTimeout(()=>A(``),3e3)},children:[(0,H.jsxs)(`label`,{children:[`Package Plan Name`,(0,H.jsx)(`input`,{type:`text`,required:!0,value:Ut,onChange:e=>Wt(e.target.value),placeholder:`e.g. Student Weekend Pass, Family 3-Devices`})]}),(0,H.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`10px`},children:[(0,H.jsxs)(`label`,{children:[`Duration Category`,(0,H.jsxs)(`select`,{value:Gt,onChange:e=>{let t=e.target.value;Kt(t),t===`hourly`?Xt(`1 Hour`):t===`daily`?Xt(`24 Hours`):t===`weekly`?Xt(`7 Days`):t===`monthly`?Xt(`30 Days`):t===`multi-device`&&nn(`3`)},children:[(0,H.jsx)(`option`,{value:`hourly`,children:`Hourly (Quick Pass)`}),(0,H.jsx)(`option`,{value:`daily`,children:`Daily (24h / Multi-day)`}),(0,H.jsx)(`option`,{value:`weekly`,children:`Weekly (7 Days / 14 Days)`}),(0,H.jsx)(`option`,{value:`monthly`,children:`Monthly (30 Days)`}),(0,H.jsx)(`option`,{value:`multi-device`,children:`Multi-Device / Family`})]})]}),(0,H.jsxs)(`label`,{children:[`Price (KSh)`,(0,H.jsx)(`input`,{type:`number`,required:!0,value:qt,onChange:e=>Jt(e.target.value),min:`10`,placeholder:`350`})]})]}),(0,H.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`10px`},children:[(0,H.jsxs)(`label`,{children:[`Duration Label`,(0,H.jsx)(`input`,{type:`text`,required:!0,value:Yt,onChange:e=>Xt(e.target.value),placeholder:`e.g. 3 Hours, 24 Hours, 30 Days`})]}),(0,H.jsxs)(`label`,{children:[`Max Concurrent Devices`,(0,H.jsxs)(`select`,{value:tn,onChange:e=>nn(e.target.value),children:[(0,H.jsx)(`option`,{value:`1`,children:`1 Device (Individual)`}),(0,H.jsx)(`option`,{value:`2`,children:`2 Devices (Duo)`}),(0,H.jsx)(`option`,{value:`3`,children:`3 Devices (Family 3x)`}),(0,H.jsx)(`option`,{value:`4`,children:`4 Devices (Family 4x)`}),(0,H.jsx)(`option`,{value:`5`,children:`5 Devices (Team / Office)`}),(0,H.jsx)(`option`,{value:`10`,children:`10 Devices (Group / Event)`})]})]})]}),(0,H.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`10px`},children:[(0,H.jsxs)(`label`,{children:[`Data Quota`,(0,H.jsxs)(`select`,{value:Zt,onChange:e=>Qt(e.target.value),children:[(0,H.jsx)(`option`,{value:`Unlimited`,children:`♾️ Unlimited Data`}),(0,H.jsx)(`option`,{value:`Unlimited Shared`,children:`♾️ Unlimited Shared (Multi-Device)`}),(0,H.jsx)(`option`,{value:`1 GB`,children:`1 GB`}),(0,H.jsx)(`option`,{value:`3 GB`,children:`3 GB`}),(0,H.jsx)(`option`,{value:`5 GB`,children:`5 GB`}),(0,H.jsx)(`option`,{value:`10 GB`,children:`10 GB`}),(0,H.jsx)(`option`,{value:`20 GB`,children:`20 GB`}),(0,H.jsx)(`option`,{value:`50 GB`,children:`50 GB`}),(0,H.jsx)(`option`,{value:`100 GB`,children:`100 GB`})]})]}),(0,H.jsxs)(`label`,{children:[`Speed Cap`,(0,H.jsxs)(`select`,{value:$t,onChange:e=>en(e.target.value),children:[(0,H.jsx)(`option`,{value:`5 Mbps`,children:`5 Mbps (Standard)`}),(0,H.jsx)(`option`,{value:`10 Mbps`,children:`10 Mbps (Fast)`}),(0,H.jsx)(`option`,{value:`20 Mbps`,children:`20 Mbps (High Speed)`}),(0,H.jsx)(`option`,{value:`30 Mbps`,children:`30 Mbps (Ultra Fast)`}),(0,H.jsx)(`option`,{value:`40 Mbps Turbo`,children:`40 Mbps (Turbo)`}),(0,H.jsx)(`option`,{value:`50 Mbps Turbo`,children:`50 Mbps (Gigabit Turbo)`})]})]})]}),(0,H.jsxs)(`label`,{children:[`Theme Color Accent`,(0,H.jsxs)(`select`,{value:rn,onChange:e=>an(e.target.value),children:[(0,H.jsx)(`option`,{value:`orange`,children:`Coral Orange (Popular)`}),(0,H.jsx)(`option`,{value:`teal`,children:`Emerald Teal`}),(0,H.jsx)(`option`,{value:`yellow`,children:`Amber Yellow`}),(0,H.jsx)(`option`,{value:`green`,children:`Forest Green`})]})]}),(0,H.jsxs)(`button`,{className:`button primary full`,type:`submit`,style:{marginTop:`14px`},children:[(0,H.jsx)(Se,{size:16}),` Save & Publish Package`]})]})]})}),be&&(0,H.jsx)(`div`,{className:`modal-backdrop`,onClick:()=>xe(!1),children:(0,H.jsxs)(`div`,{className:`modal`,onClick:e=>e.stopPropagation(),children:[(0,H.jsx)(`button`,{className:`modal-close`,onClick:()=>xe(!1),children:(0,H.jsx)(Ze,{size:18})}),(0,H.jsx)(`div`,{className:`modal-icon`,children:(0,H.jsx)(Ke,{size:22})}),(0,H.jsx)(`p`,{className:`eyebrow`,children:`Customer Directory`}),(0,H.jsx)(`h2`,{children:`Add New Customer`}),(0,H.jsx)(`p`,{className:`modal-copy`,children:`Register a new subscriber or walk-in customer into your billing system.`}),(0,H.jsxs)(`form`,{onSubmit:async e=>{if(e.preventDefault(),!It.trim())return;let t=[`#d36b4d`,`#317d75`,`#c58a32`,`#4f779a`,`#725796`],n=t[Math.floor(Math.random()*t.length)],r={id:crypto.randomUUID(),name:It.trim(),phone:Rt.trim()||`+254 700 000 000`,device:zt.trim()||`Smart Device`,plan:Vt,total_spent:`KSh 0`,data_usage:`0 MB`,status:`active`,last_active:`Just registered`,avatar_color:n},i=Jo;if(i)try{await i.from(`customers`).insert({name:r.name,phone:r.phone,device:r.device,total_spent:0})}catch{}v(e=>[r,...e]),xe(!1),Lt(``),j(``),Bt(``),A(`Customer ${r.name} added successfully!`),window.setTimeout(()=>A(``),3e3)},children:[(0,H.jsxs)(`label`,{children:[`Full Name`,(0,H.jsx)(`input`,{type:`text`,required:!0,value:It,onChange:e=>Lt(e.target.value),placeholder:`e.g. David Mwangi`})]}),(0,H.jsxs)(`label`,{children:[`Phone Number (M-Pesa)`,(0,H.jsx)(`input`,{type:`tel`,value:Rt,onChange:e=>j(e.target.value),placeholder:`e.g. +254 712 345 678`})]}),(0,H.jsxs)(`label`,{children:[`Primary Device`,(0,H.jsx)(`input`,{type:`text`,value:zt,onChange:e=>Bt(e.target.value),placeholder:`e.g. iPhone 15 / MacBook`})]}),(0,H.jsxs)(`label`,{children:[`Initial Access Plan`,(0,H.jsx)(`select`,{value:Vt,onChange:e=>Ht(e.target.value),children:u.map(e=>(0,H.jsxs)(`option`,{value:e.name,children:[e.name,` (KSh `,e.price.toLocaleString(),`)`]},e.id))})]}),(0,H.jsxs)(`button`,{className:`button primary full`,type:`submit`,children:[(0,H.jsx)(Se,{size:16}),` Register Customer`]})]})]})}),he&&(0,H.jsx)(`div`,{className:`modal-backdrop`,onClick:()=>ve(!1),children:(0,H.jsxs)(`div`,{className:`modal`,onClick:e=>e.stopPropagation(),children:[(0,H.jsx)(`button`,{className:`modal-close`,onClick:()=>ve(!1),children:(0,H.jsx)(Ze,{size:18})}),(0,H.jsx)(`div`,{className:`modal-icon`,children:(0,H.jsx)(Oe,{size:22})}),(0,H.jsx)(`p`,{className:`eyebrow`,children:`Hardware Configuration`}),(0,H.jsx)(`h2`,{children:`Add Router / Access Point`}),(0,H.jsx)(`p`,{className:`modal-copy`,children:`Connect a MikroTik RouterOS or Ubiquiti UniFi AP to this hotspot workspace.`}),(0,H.jsxs)(`form`,{onSubmit:async e=>{if(e.preventDefault(),!Ot.trim()||!At.trim())return;let t={id:crypto.randomUUID(),name:Ot.trim(),ip_address:At.trim(),model:Mt,location:Pt.trim()||`Harbor House AP`,status:`good`,clients_count:0,traffic_down:`0.0 Mbps`,traffic_up:`0.0 Mbps`,cpu_load:8,ram_load:22,ping_ms:2,uptime:`1m`},n=Jo;if(n)try{await n.from(`routers`).insert({name:t.name,ip_address:t.ip_address,model:t.model,location:t.location,status:`good`})}catch{}g(e=>[t,...e]),ve(!1),kt(``),jt(``),Ft(``),A(`Router ${t.name} registered and online!`),window.setTimeout(()=>A(``),3e3)},children:[(0,H.jsxs)(`label`,{children:[`Router / AP Name`,(0,H.jsx)(`input`,{type:`text`,required:!0,value:Ot,onChange:e=>kt(e.target.value),placeholder:`e.g. MikroTik AP Rooftop Deck`})]}),(0,H.jsxs)(`label`,{children:[`IP Address`,(0,H.jsx)(`input`,{type:`text`,required:!0,value:At,onChange:e=>jt(e.target.value),placeholder:`e.g. 10.20.0.60`})]}),(0,H.jsxs)(`label`,{children:[`Hardware Model`,(0,H.jsxs)(`select`,{value:Mt,onChange:e=>Nt(e.target.value),children:[(0,H.jsx)(`option`,{value:`MikroTik CCR2004`,children:`MikroTik CCR2004 (Core Gateway)`}),(0,H.jsx)(`option`,{value:`MikroTik cAP ac`,children:`MikroTik cAP ac (Indoor AP)`}),(0,H.jsx)(`option`,{value:`MikroTik wAP ac`,children:`MikroTik wAP ac (Outdoor AP)`}),(0,H.jsx)(`option`,{value:`MikroTik hEX S`,children:`MikroTik hEX S (Branch Router)`}),(0,H.jsx)(`option`,{value:`Ubiquiti UniFi 6 LR`,children:`Ubiquiti UniFi 6 LR (Long-Range AP)`}),(0,H.jsx)(`option`,{value:`Generic RouterOS`,children:`Generic RouterOS Gateway`})]})]}),(0,H.jsxs)(`label`,{children:[`Location in Premises`,(0,H.jsx)(`input`,{type:`text`,value:Pt,onChange:e=>Ft(e.target.value),placeholder:`e.g. Rooftop Dining Area`})]}),(0,H.jsxs)(`button`,{className:`button primary full`,type:`submit`,children:[(0,H.jsx)(Se,{size:16}),` Save & Register Device`]})]})]})}),E&&(0,H.jsx)(`div`,{className:`modal-backdrop`,onClick:()=>D(!1),children:(0,H.jsxs)(`div`,{className:`modal`,onClick:e=>e.stopPropagation(),children:[(0,H.jsx)(`button`,{className:`modal-close`,onClick:()=>D(!1),children:(0,H.jsx)(Ze,{size:18})}),(0,H.jsx)(`div`,{className:`modal-icon`,children:(0,H.jsx)(Ve,{size:22})}),(0,H.jsx)(`p`,{className:`eyebrow`,children:`Quick action`}),(0,H.jsx)(`h2`,{children:`Create vouchers`}),(0,H.jsx)(`p`,{className:`modal-copy`,children:`Generate a batch of access codes for your walk-in customers.`}),(0,H.jsxs)(`label`,{children:[`Package`,(0,H.jsx)(`select`,{value:ut,onChange:e=>dt(e.target.value),children:u.map(e=>(0,H.jsxs)(`option`,{value:e.name,children:[e.name,` (`,e.duration_display,` - KSh `,e.price,`)`]},e.id))})]}),(0,H.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`10px`},children:[(0,H.jsxs)(`label`,{children:[`Number of vouchers`,(0,H.jsx)(`input`,{type:`number`,value:ft,onChange:e=>pt(Number(e.target.value)),min:`1`,max:`100`})]}),(0,H.jsxs)(`label`,{children:[`Code Prefix`,(0,H.jsx)(`input`,{type:`text`,value:mt,onChange:e=>ht(e.target.value),placeholder:`ORN`,maxLength:4})]})]}),(0,H.jsxs)(`button`,{className:`button primary full`,onClick:()=>void wn(),children:[(0,H.jsx)(Qe,{size:16}),` Generate `,ft,` Vouchers`]})]})}),pe&&(0,H.jsx)(`div`,{className:`modal-backdrop`,onClick:()=>O(!1),children:(0,H.jsxs)(`div`,{className:`modal`,onClick:e=>e.stopPropagation(),children:[(0,H.jsx)(`button`,{className:`modal-close`,onClick:()=>O(!1),children:(0,H.jsx)(Ze,{size:18})}),(0,H.jsx)(`div`,{className:`modal-icon`,children:(0,H.jsx)(oe,{size:22})}),(0,H.jsx)(`p`,{className:`eyebrow`,children:`Integration`}),(0,H.jsx)(`h2`,{children:`Supabase Database`}),(0,H.jsxs)(`p`,{className:`modal-copy`,children:[`Project Reference: `,(0,H.jsx)(`code`,{children:`ezcwgyhwotomranbyuyh`})]}),(0,H.jsxs)(`form`,{onSubmit:e=>{e.preventDefault(),Yo(gn,vn.trim()),O(!1),A(`Supabase configuration updated!`),window.setTimeout(()=>{window.location.reload()},600)},children:[(0,H.jsxs)(`label`,{children:[`Anon Public Key (JWT starting with `,(0,H.jsx)(`code`,{children:`eyJ...`}),`)`,(0,H.jsx)(`input`,{type:`text`,value:vn,onChange:e=>yn(e.target.value),placeholder:`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,style:{fontFamily:`monospace`,fontSize:`11px`}})]}),(0,H.jsx)(`div`,{style:{margin:`10px 0 16px`},children:(0,H.jsxs)(`a`,{href:`https://supabase.com/dashboard/project/ezcwgyhwotomranbyuyh/settings/api`,target:`_blank`,rel:`noreferrer`,style:{color:`var(--coral)`,fontSize:`12px`,textDecoration:`none`,fontWeight:600,display:`inline-flex`,alignItems:`center`,gap:`4px`},children:[`Open Supabase API Settings `,(0,H.jsx)(le,{size:13})]})}),(0,H.jsx)(`button`,{className:`button primary full`,type:`submit`,children:`Save & Reconnect`})]})]})}),Ie&&Re&&(0,H.jsx)(`div`,{className:`modal-backdrop`,onClick:()=>Le(!1),children:(0,H.jsxs)(`div`,{className:`modal`,onClick:e=>e.stopPropagation(),children:[(0,H.jsx)(`button`,{className:`modal-close`,onClick:()=>Le(!1),children:(0,H.jsx)(Ze,{size:18})}),(0,H.jsx)(`div`,{className:`modal-icon`,children:(0,H.jsx)(je,{size:22})}),(0,H.jsx)(`p`,{className:`eyebrow`,children:`SMS Dispatch`}),(0,H.jsx)(`h2`,{children:`Send Voucher via SMS`}),(0,H.jsxs)(`p`,{className:`modal-copy`,children:[`Send voucher `,(0,H.jsx)(`strong`,{children:Re.code}),` directly to customer's mobile phone number.`]}),(0,H.jsxs)(`form`,{onSubmit:async e=>{if(e.preventDefault(),!(!Re||!He.trim())){qe(!0),$e(null);try{let e=await Us(Bs(He,ie.smsDefaultCountryCode||`+254`),Re.code,Re.package_name,Re.price,ie.businessName||`Harbor House Wi-Fi`);$e(e),e.success&&(A(`✅ Voucher ${Re.code} dispatched via SMS to ${e.recipient}!`),window.setTimeout(()=>A(``),3500))}catch(e){$e({success:!1,recipient:He,providerUsed:ie.smsProvider,error:e.message||`Failed to send SMS`,sentAt:new Date().toISOString()})}finally{qe(!1)}}},children:[(0,H.jsxs)(`div`,{style:{background:`var(--card-subtle-bg)`,border:`1px solid var(--line)`,borderRadius:`8px`,padding:`12px`,marginBottom:`14px`},children:[(0,H.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,marginBottom:`4px`},children:[(0,H.jsx)(`span`,{style:{fontSize:`11px`,color:`var(--muted)`},children:`Plan:`}),(0,H.jsx)(`strong`,{children:Re.package_name})]}),(0,H.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,marginBottom:`4px`},children:[(0,H.jsx)(`span`,{style:{fontSize:`11px`,color:`var(--muted)`},children:`Voucher Code:`}),(0,H.jsx)(`code`,{style:{fontSize:`12px`,fontWeight:800,color:`var(--coral)`},children:Re.code})]}),(0,H.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`},children:[(0,H.jsx)(`span`,{style:{fontSize:`11px`,color:`var(--muted)`},children:`Value:`}),(0,H.jsx)(`strong`,{children:Re.price})]})]}),(0,H.jsxs)(`label`,{children:[`Customer Mobile Phone Number`,(0,H.jsx)(`input`,{type:`tel`,required:!0,value:He,onChange:e=>Ue(e.target.value),placeholder:`e.g. +254 712 345 678 or 0712345678`,autoFocus:!0})]}),Ye&&(0,H.jsxs)(`div`,{style:{padding:`10px 12px`,borderRadius:`7px`,margin:`8px 0`,fontSize:`11px`,background:Ye.success?`rgba(76, 165, 116, 0.12)`:`rgba(217, 85, 79, 0.12)`,border:`1px solid ${Ye.success?`#4ca574`:`#d9554f`}`,color:Ye.success?`#317d75`:`#c94a32`,display:`flex`,alignItems:`center`,gap:`6px`},children:[Ye.success?(0,H.jsx)(ne,{size:15}):(0,H.jsx)(We,{size:15}),(0,H.jsx)(`span`,{children:Ye.success?`Dispatched via ${Ye.providerUsed} to ${Ye.recipient}!`:`Failed: ${Ye.error}`})]}),(0,H.jsxs)(`button`,{className:`button primary full`,type:`submit`,disabled:Ge,style:{marginTop:`10px`},children:[Ge?(0,H.jsx)(De,{size:15,className:`spinning`}):(0,H.jsx)(je,{size:15}),` Dispatch Voucher SMS`]})]})]})}),et&&nt&&(0,H.jsx)(`div`,{className:`modal-backdrop`,onClick:()=>tt(!1),children:(0,H.jsxs)(`div`,{className:`modal`,onClick:e=>e.stopPropagation(),children:[(0,H.jsx)(`button`,{className:`modal-close`,onClick:()=>tt(!1),children:(0,H.jsx)(Ze,{size:18})}),(0,H.jsx)(`div`,{className:`modal-icon`,children:(0,H.jsx)(_e,{size:22})}),(0,H.jsx)(`p`,{className:`eyebrow`,children:`Customer Communication`}),(0,H.jsx)(`h2`,{children:`Send SMS to Customer`}),(0,H.jsxs)(`p`,{className:`modal-copy`,children:[`Send a text notification to `,(0,H.jsx)(`strong`,{children:nt.name}),` (`,nt.phone,`).`]}),(0,H.jsxs)(`form`,{onSubmit:async e=>{if(e.preventDefault(),!(!nt||!it.trim())){st(!0),lt(null);try{let e=await Ws(Bs(nt.phone,ie.smsDefaultCountryCode||`+254`),it.trim());lt(e),e.success&&(A(`✅ SMS message dispatched to ${nt.name} (${e.recipient})!`),window.setTimeout(()=>A(``),3500))}catch(e){lt({success:!1,recipient:nt.phone,providerUsed:ie.smsProvider,error:e.message||`Failed to send SMS`,sentAt:new Date().toISOString()})}finally{st(!1)}}},children:[(0,H.jsxs)(`label`,{children:[`SMS Message Text`,(0,H.jsx)(`textarea`,{rows:4,required:!0,value:it,onChange:e=>at(e.target.value),placeholder:`Type message to customer...`,style:{width:`100%`,padding:`10px`,borderRadius:`8px`,border:`1px solid var(--line)`,background:`var(--card-subtle-bg)`,color:`var(--ink)`,fontSize:`12px`,fontFamily:`inherit`}})]}),ct&&(0,H.jsxs)(`div`,{style:{padding:`10px 12px`,borderRadius:`7px`,margin:`8px 0`,fontSize:`11px`,background:ct.success?`rgba(76, 165, 116, 0.12)`:`rgba(217, 85, 79, 0.12)`,border:`1px solid ${ct.success?`#4ca574`:`#d9554f`}`,color:ct.success?`#317d75`:`#c94a32`,display:`flex`,alignItems:`center`,gap:`6px`},children:[ct.success?(0,H.jsx)(ne,{size:15}):(0,H.jsx)(We,{size:15}),(0,H.jsx)(`span`,{children:ct.success?`SMS sent via ${ct.providerUsed} to ${ct.recipient}!`:`Failed: ${ct.error}`})]}),(0,H.jsxs)(`button`,{className:`button primary full`,type:`submit`,disabled:ot,style:{marginTop:`10px`},children:[ot?(0,H.jsx)(De,{size:15,className:`spinning`}):(0,H.jsx)(je,{size:15}),` Send SMS Message`]})]})]})}),gt&&(0,H.jsxs)(`div`,{className:`toast`,children:[(0,H.jsx)(Pe,{size:18}),` `,gt]})]})}function ic({vouchers:e,onDelete:t,onAddNewClick:n,onPrintClick:r,onSendSmsClick:i}){let[a,o]=(0,h.useState)(``),[s,c]=(0,h.useState)(`all`),[l,u]=(0,h.useState)(``),d=e.filter(e=>{let t=e.code.toLowerCase().includes(a.toLowerCase())||e.package_name.toLowerCase().includes(a.toLowerCase()),n=s===`all`||e.status===s;return t&&n}),f=e.filter(e=>e.status===`active`).length,p=e.filter(e=>e.status===`redeemed`).length,m=e=>{navigator.clipboard.writeText(e),u(e),setTimeout(()=>u(``),2e3)};return(0,H.jsxs)(`div`,{className:`vouchers-view`,children:[(0,H.jsxs)(`section`,{className:`page-heading`,children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`p`,{className:`eyebrow`,children:`Inventory & Prepaid Codes`}),(0,H.jsx)(`h1`,{children:`Voucher Management`}),(0,H.jsx)(`p`,{className:`heading-sub`,children:`Generate, track, print, and distribute Wi-Fi hotspot vouchers for walk-in users.`})]}),(0,H.jsxs)(`div`,{className:`heading-actions`,children:[(0,H.jsxs)(`button`,{className:`button secondary`,onClick:()=>{let t=e.map(e=>`"${e.code}","${e.package_name}","${e.price}","${e.status}","${e.created_at}","${e.expires_at}"`).join(`
`),n=new Blob([`Code,Package,Price,Status,Created At,Expires At
`+t],{type:`text/csv;charset=utf-8;`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=`vouchers_${new Date().toISOString().slice(0,10)}.csv`,i.click()},children:[(0,H.jsx)(se,{size:15}),` Export CSV`]}),(0,H.jsxs)(`button`,{className:`button secondary`,onClick:r,children:[(0,H.jsx)(Ce,{size:15}),` Print voucher slips`]}),(0,H.jsxs)(`button`,{className:`button primary`,onClick:n,children:[(0,H.jsx)(Se,{size:16}),` Generate vouchers`]})]})]}),(0,H.jsxs)(`section`,{className:`metrics-grid`,children:[(0,H.jsx)(U,{label:`Active Vouchers`,value:String(f),change:`Available for sale`,trend:`up`,icon:Ve,accent:`green`}),(0,H.jsx)(U,{label:`Redeemed Vouchers`,value:String(p),change:`Used by clients`,trend:`up`,icon:ne,accent:`orange`}),(0,H.jsx)(U,{label:`Total Inventory`,value:String(e.length),change:`Generated batch`,trend:`up`,icon:Ee,accent:`teal`}),(0,H.jsx)(U,{label:`Batch Expiry`,value:`Oct 31, 2026`,change:`Valid 60+ days`,trend:`up`,icon:re,accent:`blue`})]}),(0,H.jsxs)(`div`,{className:`router-toolbar`,children:[(0,H.jsxs)(`div`,{className:`router-search-box`,children:[(0,H.jsx)(Ae,{size:16,color:`var(--muted)`}),(0,H.jsx)(`input`,{type:`text`,placeholder:`Search by voucher code or package...`,value:a,onChange:e=>o(e.target.value)}),a&&(0,H.jsx)(`button`,{onClick:()=>o(``),style:{background:`transparent`,border:0,color:`var(--muted)`,cursor:`pointer`,padding:0},children:(0,H.jsx)(Ze,{size:14})})]}),(0,H.jsxs)(`div`,{className:`filter-pills`,children:[(0,H.jsxs)(`button`,{className:`filter-pill ${s===`all`?`active`:``}`,onClick:()=>c(`all`),children:[`All (`,e.length,`)`]}),(0,H.jsxs)(`button`,{className:`filter-pill ${s===`active`?`active`:``}`,onClick:()=>c(`active`),children:[`Active (`,f,`)`]}),(0,H.jsxs)(`button`,{className:`filter-pill ${s===`redeemed`?`active`:``}`,onClick:()=>c(`redeemed`),children:[`Redeemed (`,p,`)`]})]})]}),(0,H.jsx)(`div`,{className:`panel`,style:{padding:`0 20px 14px`},children:(0,H.jsx)(`div`,{className:`table-wrap`,children:(0,H.jsxs)(`table`,{children:[(0,H.jsx)(`thead`,{children:(0,H.jsxs)(`tr`,{children:[(0,H.jsx)(`th`,{children:`Voucher Code`}),(0,H.jsx)(`th`,{children:`Package Plan`}),(0,H.jsx)(`th`,{children:`Value`}),(0,H.jsx)(`th`,{children:`Status`}),(0,H.jsx)(`th`,{children:`Created At`}),(0,H.jsx)(`th`,{children:`Redeemed By`}),(0,H.jsx)(`th`,{children:`Valid Until`}),(0,H.jsx)(`th`,{style:{textAlign:`right`},children:`Actions`})]})}),(0,H.jsx)(`tbody`,{children:d.length===0?(0,H.jsx)(`tr`,{children:(0,H.jsx)(`td`,{colSpan:8,style:{textAlign:`center`,padding:`36px 0`,color:`var(--muted)`},children:`No vouchers found matching your query.`})}):d.map(e=>(0,H.jsxs)(`tr`,{children:[(0,H.jsx)(`td`,{children:(0,H.jsxs)(`div`,{className:`voucher-code-chip`,children:[(0,H.jsx)(`span`,{children:e.code}),(0,H.jsx)(`button`,{className:`voucher-copy-btn`,title:`Copy voucher code`,onClick:()=>m(e.code),children:l===e.code?(0,H.jsx)(w,{size:13,color:`#4ca574`}):(0,H.jsx)(ie,{size:13})})]})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`span`,{className:`package-name`,children:e.package_name})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`strong`,{children:e.price})}),(0,H.jsx)(`td`,{children:(0,H.jsxs)(`span`,{className:`voucher-status-pill ${e.status}`,children:[(0,H.jsx)(`span`,{style:{width:6,height:6,borderRadius:`50%`,background:e.status===`active`?`#4ca574`:e.status===`redeemed`?`#87928b`:`#d9554f`}}),e.status===`active`?`Unused`:e.status===`redeemed`?`Redeemed`:`Expired`]})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`span`,{className:`muted`,children:e.created_at})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`span`,{className:`muted`,children:e.redeemed_by||`—`})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`span`,{className:`muted`,children:e.expires_at})}),(0,H.jsx)(`td`,{style:{textAlign:`right`},children:(0,H.jsxs)(`div`,{style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,justifyContent:`flex-end`},children:[(0,H.jsx)(`button`,{className:`customer-icon-btn`,title:`Send voucher via SMS to customer`,onClick:()=>i?.(e),children:(0,H.jsx)(je,{size:13})}),(0,H.jsx)(`button`,{className:`customer-icon-btn danger`,title:`Delete voucher`,onClick:()=>t(e.id,e.code),children:(0,H.jsx)(He,{size:14})})]})})]},e.id))})]})})})]})}function ac({transactions:e,onRecordNewClick:t}){let[n,r]=(0,h.useState)(``),[i,a]=(0,h.useState)(`all`),o=e.filter(e=>{let t=e.id.toLowerCase().includes(n.toLowerCase())||e.customer.toLowerCase().includes(n.toLowerCase())||e.package.toLowerCase().includes(n.toLowerCase())||e.receipt&&e.receipt.toLowerCase().includes(n.toLowerCase()),r=i===`all`||e.method===i;return t&&r});return(0,H.jsxs)(`div`,{className:`transactions-view`,children:[(0,H.jsxs)(`section`,{className:`page-heading`,children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`p`,{className:`eyebrow`,children:`Finance & Billings`}),(0,H.jsx)(`h1`,{children:`Transactions & Payments`}),(0,H.jsx)(`p`,{className:`heading-sub`,children:`Track customer payments via M-Pesa, Airtel Money, voucher redemptions, and cash.`})]}),(0,H.jsxs)(`div`,{className:`heading-actions`,children:[(0,H.jsxs)(`button`,{className:`button secondary`,onClick:()=>{let t=e.map(e=>`"${e.id}","${e.customer}","${e.phone||``}","${e.method}","${e.package}","${e.amount}","${e.status}","${e.time}","${e.receipt||``}"`).join(`
`),n=new Blob([`ID,Customer,Phone,Method,Package,Amount,Status,Time,Receipt
`+t],{type:`text/csv;charset=utf-8;`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=`transactions_${new Date().toISOString().slice(0,10)}.csv`,i.click()},children:[(0,H.jsx)(se,{size:15}),` Export CSV`]}),(0,H.jsxs)(`button`,{className:`button primary`,onClick:t,children:[(0,H.jsx)(Se,{size:16}),` Record payment`]})]})]}),(0,H.jsxs)(`section`,{className:`metrics-grid`,children:[(0,H.jsx)(U,{label:`Total Revenue`,value:`KSh 284,650`,change:`18.4%`,trend:`up`,icon:T,accent:`green`}),(0,H.jsx)(U,{label:`M-Pesa Collections`,value:`KSh 242,500`,change:`85.2% of total`,trend:`up`,icon:ae,accent:`orange`}),(0,H.jsx)(U,{label:`Vouchers Redeemed`,value:`KSh 42,150`,change:`14.8% of total`,trend:`up`,icon:Ve,accent:`teal`}),(0,H.jsx)(U,{label:`Payment Success Rate`,value:`99.4%`,change:`0.6% failed`,trend:`up`,icon:ne,accent:`blue`})]}),(0,H.jsxs)(`div`,{className:`router-toolbar`,children:[(0,H.jsxs)(`div`,{className:`router-search-box`,children:[(0,H.jsx)(Ae,{size:16,color:`var(--muted)`}),(0,H.jsx)(`input`,{type:`text`,placeholder:`Search by transaction ID, customer, receipt...`,value:n,onChange:e=>r(e.target.value)}),n&&(0,H.jsx)(`button`,{onClick:()=>r(``),style:{background:`transparent`,border:0,color:`var(--muted)`,cursor:`pointer`,padding:0},children:(0,H.jsx)(Ze,{size:14})})]}),(0,H.jsxs)(`div`,{className:`filter-pills`,children:[(0,H.jsxs)(`button`,{className:`filter-pill ${i===`all`?`active`:``}`,onClick:()=>a(`all`),children:[`All (`,e.length,`)`]}),(0,H.jsx)(`button`,{className:`filter-pill ${i===`M-Pesa`?`active`:``}`,onClick:()=>a(`M-Pesa`),children:`M-Pesa`}),(0,H.jsx)(`button`,{className:`filter-pill ${i===`Voucher`?`active`:``}`,onClick:()=>a(`Voucher`),children:`Voucher`}),(0,H.jsx)(`button`,{className:`filter-pill ${i===`Airtel Money`?`active`:``}`,onClick:()=>a(`Airtel Money`),children:`Airtel Money`})]})]}),(0,H.jsx)(`div`,{className:`panel`,style:{padding:`0 20px 14px`},children:(0,H.jsx)(`div`,{className:`table-wrap`,children:(0,H.jsxs)(`table`,{children:[(0,H.jsx)(`thead`,{children:(0,H.jsxs)(`tr`,{children:[(0,H.jsx)(`th`,{children:`Transaction ID`}),(0,H.jsx)(`th`,{children:`Customer`}),(0,H.jsx)(`th`,{children:`Payment Method`}),(0,H.jsx)(`th`,{children:`Package`}),(0,H.jsx)(`th`,{children:`Amount`}),(0,H.jsx)(`th`,{children:`Receipt / Ref`}),(0,H.jsx)(`th`,{children:`Status`}),(0,H.jsx)(`th`,{children:`Time`})]})}),(0,H.jsx)(`tbody`,{children:o.map(e=>(0,H.jsxs)(`tr`,{children:[(0,H.jsx)(`td`,{children:(0,H.jsx)(`strong`,{className:`transaction-id`,children:e.id})}),(0,H.jsx)(`td`,{children:(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`strong`,{children:e.customer}),(0,H.jsx)(`span`,{style:{display:`block`,fontSize:`11px`,color:`var(--muted)`},children:e.phone})]})}),(0,H.jsx)(`td`,{children:(0,H.jsxs)(`span`,{className:`method`,children:[(0,H.jsx)(`span`,{className:`method-dot ${e.method===`M-Pesa`?`mpesa`:e.method===`Voucher`?`voucher`:`airtel`}`}),e.method]})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`span`,{className:`package-name`,children:e.package})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`strong`,{children:e.amount})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`span`,{style:{fontFamily:`monospace`,fontSize:`11px`,color:`var(--muted)`},children:e.receipt||`—`})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`span`,{className:`status ${e.status.toLowerCase()}`,children:e.status})}),(0,H.jsx)(`td`,{className:`muted`,children:e.time})]},e.id))})]})})})]})}function oc({packages:e,transactions:t,customers:n}){let[r,i]=(0,h.useState)(`This Month`),a=e.reduce((e,t)=>e+t.price*t.sales_count,0),o=e.reduce((e,t)=>e+t.sales_count,0);return(0,H.jsxs)(`div`,{className:`reports-view`,children:[(0,H.jsxs)(`section`,{className:`page-heading`,children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`p`,{className:`eyebrow`,children:`Analytics & Financial Insights`}),(0,H.jsx)(`h1`,{children:`Performance Reports`}),(0,H.jsx)(`p`,{className:`heading-sub`,children:`Real-time breakdown of revenue, traffic demand, package popularity, and subscriber growth.`})]}),(0,H.jsxs)(`div`,{className:`heading-actions`,children:[(0,H.jsx)(`div`,{className:`filter-pills`,children:[`Today`,`Last 7 Days`,`This Month`,`Year to Date`].map(e=>(0,H.jsx)(`button`,{className:`filter-pill ${r===e?`active`:``}`,onClick:()=>i(e),children:e},e))}),(0,H.jsxs)(`button`,{className:`button primary`,onClick:()=>window.print(),children:[(0,H.jsx)(Ce,{size:15}),` Print audit report`]})]})]}),(0,H.jsxs)(`section`,{className:`metrics-grid`,children:[(0,H.jsx)(U,{label:`Gross Revenue`,value:`KSh ${a.toLocaleString()}`,change:`18.4% vs last period`,trend:`up`,icon:T,accent:`green`}),(0,H.jsx)(U,{label:`Total Packages Sold`,value:o.toLocaleString(),change:`1,284 total orders`,trend:`up`,icon:Ve,accent:`orange`}),(0,H.jsx)(U,{label:`Data Consumed`,value:`4.86 TB`,change:`Peak: 20:00 - 23:00`,trend:`up`,icon:b,accent:`teal`}),(0,H.jsx)(U,{label:`Repeat Customer Rate`,value:`74.2%`,change:`Loyal subscribers`,trend:`up`,icon:Je,accent:`blue`})]}),(0,H.jsxs)(`div`,{className:`content-grid`,children:[(0,H.jsxs)(`div`,{className:`report-breakdown-card`,children:[(0,H.jsx)(`div`,{className:`panel-heading`,style:{padding:0},children:(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`h2`,{children:`Revenue by Duration Tier`}),(0,H.jsx)(`p`,{children:`Income contribution from Hourly, Daily, Weekly, and Monthly packages`})]})}),(0,H.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`14px`,marginTop:`10px`},children:[(0,H.jsxs)(`div`,{className:`report-bar-row`,children:[(0,H.jsxs)(`div`,{className:`report-bar-top`,children:[(0,H.jsx)(`strong`,{children:`Daily Plans (24 Hours Pass)`}),(0,H.jsx)(`span`,{children:`KSh 121,500 (42.6%)`})]}),(0,H.jsx)(`div`,{className:`report-bar-track`,children:(0,H.jsx)(`div`,{className:`report-bar-fill`,style:{width:`42.6%`,background:`var(--coral)`}})})]}),(0,H.jsxs)(`div`,{className:`report-bar-row`,children:[(0,H.jsxs)(`div`,{className:`report-bar-top`,children:[(0,H.jsx)(`strong`,{children:`Weekly Access Plans`}),(0,H.jsx)(`span`,{children:`KSh 74,400 (26.1%)`})]}),(0,H.jsx)(`div`,{className:`report-bar-track`,children:(0,H.jsx)(`div`,{className:`report-bar-fill`,style:{width:`26.1%`,background:`#317d75`}})})]}),(0,H.jsxs)(`div`,{className:`report-bar-row`,children:[(0,H.jsxs)(`div`,{className:`report-bar-top`,children:[(0,H.jsx)(`strong`,{children:`Monthly & Multi-Device Subscriptions`}),(0,H.jsx)(`span`,{children:`KSh 64,800 (22.7%)`})]}),(0,H.jsx)(`div`,{className:`report-bar-track`,children:(0,H.jsx)(`div`,{className:`report-bar-fill`,style:{width:`22.7%`,background:`#4f779a`}})})]}),(0,H.jsxs)(`div`,{className:`report-bar-row`,children:[(0,H.jsxs)(`div`,{className:`report-bar-top`,children:[(0,H.jsx)(`strong`,{children:`Hourly Express Passes`}),(0,H.jsx)(`span`,{children:`KSh 23,950 (8.6%)`})]}),(0,H.jsx)(`div`,{className:`report-bar-track`,children:(0,H.jsx)(`div`,{className:`report-bar-fill`,style:{width:`8.6%`,background:`#c58a32`}})})]})]})]}),(0,H.jsxs)(`div`,{className:`report-breakdown-card`,children:[(0,H.jsx)(`div`,{className:`panel-heading`,style:{padding:0},children:(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`h2`,{children:`Payment Method Breakdown`}),(0,H.jsx)(`p`,{children:`M-Pesa STK Push vs Vouchers and Airtel Money`})]})}),(0,H.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`14px`,marginTop:`10px`},children:[(0,H.jsxs)(`div`,{className:`report-bar-row`,children:[(0,H.jsxs)(`div`,{className:`report-bar-top`,children:[(0,H.jsx)(`strong`,{children:`M-Pesa Express (Till / Paybill)`}),(0,H.jsx)(`span`,{children:`KSh 242,500 (85.2%)`})]}),(0,H.jsx)(`div`,{className:`report-bar-track`,children:(0,H.jsx)(`div`,{className:`report-bar-fill`,style:{width:`85.2%`,background:`#4ca574`}})})]}),(0,H.jsxs)(`div`,{className:`report-bar-row`,children:[(0,H.jsxs)(`div`,{className:`report-bar-top`,children:[(0,H.jsx)(`strong`,{children:`Voucher Redemptions`}),(0,H.jsx)(`span`,{children:`KSh 26,800 (9.4%)`})]}),(0,H.jsx)(`div`,{className:`report-bar-track`,children:(0,H.jsx)(`div`,{className:`report-bar-fill`,style:{width:`9.4%`,background:`var(--coral)`}})})]}),(0,H.jsxs)(`div`,{className:`report-bar-row`,children:[(0,H.jsxs)(`div`,{className:`report-bar-top`,children:[(0,H.jsx)(`strong`,{children:`Airtel Money`}),(0,H.jsx)(`span`,{children:`KSh 15,350 (5.4%)`})]}),(0,H.jsx)(`div`,{className:`report-bar-track`,children:(0,H.jsx)(`div`,{className:`report-bar-fill`,style:{width:`5.4%`,background:`#d9554f`}})})]})]})]})]})]})}function sc({settings:e,operator:t,onSave:n,onOpenDbModal:r}){let[i,a]=(0,h.useState)(`general`),[o,s]=(0,h.useState)(e),[c,l]=(0,h.useState)(`+254 712 345 678`),[u,d]=(0,h.useState)(``),[f,p]=(0,h.useState)(!1),[m,g]=(0,h.useState)(null),[_,v]=(0,h.useState)(!1);return(0,H.jsxs)(`div`,{className:`settings-view`,children:[(0,H.jsx)(`section`,{className:`page-heading`,children:(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`p`,{className:`eyebrow`,children:`System & Customization`}),(0,H.jsx)(`h1`,{children:`Settings & Security`}),(0,H.jsx)(`p`,{className:`heading-sub`,children:`Customize captive portal branding, router RADIUS parameters, live SMS 2FA gateways, and payment gateways.`})]})}),(0,H.jsxs)(`div`,{className:`settings-tabs`,children:[(0,H.jsxs)(`button`,{className:`settings-tab-btn ${i===`general`?`active`:``}`,onClick:()=>a(`general`),children:[(0,H.jsx)(Ie,{size:14}),` General & Workspace`]}),(0,H.jsxs)(`button`,{className:`settings-tab-btn ${i===`security`?`active`:``}`,onClick:()=>a(`security`),children:[(0,H.jsx)(Pe,{size:14}),` Security & 2FA`]}),(0,H.jsxs)(`button`,{className:`settings-tab-btn ${i===`sms`?`active`:``}`,onClick:()=>a(`sms`),children:[(0,H.jsx)(_e,{size:14}),` SMS Gateway & Alerts`]}),(0,H.jsxs)(`button`,{className:`settings-tab-btn ${i===`portal`?`active`:``}`,onClick:()=>a(`portal`),children:[(0,H.jsx)(be,{size:14}),` Captive Portal Branding`]}),(0,H.jsxs)(`button`,{className:`settings-tab-btn ${i===`router`?`active`:``}`,onClick:()=>a(`router`),children:[(0,H.jsx)(Oe,{size:14}),` MikroTik & Network`]}),(0,H.jsxs)(`button`,{className:`settings-tab-btn ${i===`payments`?`active`:``}`,onClick:()=>a(`payments`),children:[(0,H.jsx)(ae,{size:14}),` M-Pesa & Gateways`]})]}),(0,H.jsxs)(`form`,{onSubmit:e=>{e.preventDefault(),n(o)},children:[i===`general`&&(0,H.jsxs)(`div`,{className:`settings-card`,children:[(0,H.jsx)(`h2`,{children:`General Workspace Settings`}),(0,H.jsxs)(`div`,{className:`settings-grid-2`,children:[(0,H.jsxs)(`label`,{children:[`Hotspot Business Name`,(0,H.jsx)(`input`,{type:`text`,value:o.businessName,onChange:e=>s({...o,businessName:e.target.value}),placeholder:`e.g. Harbor House`})]}),(0,H.jsxs)(`label`,{children:[`Location & City`,(0,H.jsx)(`input`,{type:`text`,value:o.location,onChange:e=>s({...o,location:e.target.value}),placeholder:`e.g. Westlands, Nairobi`})]}),(0,H.jsxs)(`label`,{children:[`Support Phone Line`,(0,H.jsx)(`input`,{type:`tel`,value:o.supportPhone,onChange:e=>s({...o,supportPhone:e.target.value}),placeholder:`+254 700 123 456`})]}),(0,H.jsxs)(`label`,{children:[`Currency Symbol`,(0,H.jsx)(`input`,{type:`text`,value:o.currency,onChange:e=>s({...o,currency:e.target.value}),placeholder:`KSh`})]})]}),(0,H.jsxs)(`button`,{className:`button primary`,type:`submit`,style:{alignSelf:`flex-start`},children:[(0,H.jsx)(ke,{size:16}),` Save Changes`]})]}),i===`security`&&(0,H.jsxs)(`div`,{className:`settings-card`,children:[(0,H.jsx)(`h2`,{children:`Operator Security & Two-Factor Authentication (2FA)`}),(0,H.jsxs)(`div`,{style:{background:`var(--card-subtle-bg)`,border:`1px solid var(--line)`,borderRadius:`10px`,padding:`16px`,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`strong`,{children:`SMS Two-Factor Authentication (2FA)`}),(0,H.jsxs)(`p`,{style:{margin:`3px 0 0`,fontSize:`11px`,color:`var(--muted)`},children:[`Require a 6-digit verification code sent via SMS to `,(0,H.jsx)(`strong`,{children:t.phone}),` on every sign in.`]})]}),(0,H.jsxs)(`span`,{className:`live-pill`,style:{background:`#eaf3eb`,color:`#34786d`},children:[(0,H.jsx)(Pe,{size:13}),` Active & Enforced`]})]}),(0,H.jsxs)(`div`,{className:`settings-grid-2`,children:[(0,H.jsxs)(`label`,{children:[`Operator Name`,(0,H.jsx)(`input`,{type:`text`,readOnly:!0,value:t.name})]}),(0,H.jsxs)(`label`,{children:[`Role`,(0,H.jsx)(`input`,{type:`text`,readOnly:!0,value:t.role})]}),(0,H.jsxs)(`label`,{children:[`Verified Mobile Phone`,(0,H.jsx)(`input`,{type:`text`,readOnly:!0,value:t.phone})]}),(0,H.jsxs)(`label`,{children:[`Work Email`,(0,H.jsx)(`input`,{type:`text`,readOnly:!0,value:t.email})]})]})]}),i===`sms`&&(0,H.jsxs)(`div`,{className:`settings-card`,children:[(0,H.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`h2`,{children:`SMS Gateway & Mobile Number Delivery`}),(0,H.jsx)(`p`,{style:{margin:`4px 0 0`,fontSize:`12px`,color:`var(--muted)`},children:`Connect your SMS gateway provider so 2FA codes, Wi-Fi vouchers, and alerts are sent directly to customer and operator phones.`})]}),(0,H.jsxs)(`label`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,cursor:`pointer`,margin:0,fontWeight:700,fontSize:`12px`},children:[(0,H.jsx)(`input`,{type:`checkbox`,checked:o.smsEnabled!==!1,onChange:e=>s({...o,smsEnabled:e.target.checked}),style:{width:`16px`,height:`16px`,accentColor:`var(--coral)`}}),`Enable Live SMS Dispatch`]})]}),(0,H.jsxs)(`div`,{style:{margin:`14px 0 10px`},children:[(0,H.jsx)(`span`,{style:{fontSize:`11px`,fontWeight:700,color:`var(--muted)`,display:`block`,marginBottom:`8px`},children:`Choose SMS Gateway Provider`}),(0,H.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(200px, 1fr))`,gap:`10px`},children:[{id:`africastalking`,name:`Africa's Talking`,tag:`Kenya & Africa Default`,desc:`Direct REST API for Safaricom, Airtel, Telkom`},{id:`twilio`,name:`Twilio SMS`,tag:`Global Coverage`,desc:`Worldwide international SMS delivery`},{id:`advanta`,name:`Advanta SMS`,tag:`Kenya Bulk SMS`,desc:`High-speed local bulk SMS route`},{id:`mobilesasa`,name:`Mobilesasa`,tag:`Kenya Gateway`,desc:`Local transactional SMS route`},{id:`custom_webhook`,name:`Supabase Edge / Webhook`,tag:`Backend Proxy`,desc:`Secure CORS-free proxy or server endpoint`},{id:`simulator`,name:`Demo Simulator`,tag:`Offline Testing`,desc:`Local testing without carrier credits`}].map(e=>{let t=(o.smsProvider||`africastalking`)===e.id;return(0,H.jsxs)(`div`,{onClick:()=>s({...o,smsProvider:e.id}),style:{background:t?`rgba(211, 107, 77, 0.08)`:`var(--card-subtle-bg)`,border:`1.5px solid ${t?`var(--coral)`:`var(--line)`}`,borderRadius:`10px`,padding:`12px 14px`,cursor:`pointer`,transition:`all 0.15s ease`},children:[(0,H.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,H.jsx)(`strong`,{style:{fontSize:`13px`,color:t?`var(--coral)`:`var(--ink-heading)`},children:e.name}),t&&(0,H.jsx)(w,{size:14,color:`var(--coral)`})]}),(0,H.jsx)(`span`,{style:{fontSize:`10px`,fontWeight:700,color:t?`var(--coral)`:`var(--muted)`,display:`block`,margin:`2px 0`},children:e.tag}),(0,H.jsx)(`p`,{style:{fontSize:`11px`,color:`var(--muted)`,margin:0},children:e.desc})]},e.id)})})]}),(0,H.jsxs)(`div`,{className:`settings-grid-2`,style:{marginTop:`10px`},children:[(o.smsProvider===`africastalking`||!o.smsProvider)&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(`label`,{children:[`Africa's Talking Username`,(0,H.jsx)(`input`,{type:`text`,value:o.smsUsername||``,onChange:e=>s({...o,smsUsername:e.target.value}),placeholder:`sandbox (or your AT live username)`})]}),(0,H.jsxs)(`label`,{children:[`Africa's Talking API Key`,(0,H.jsxs)(`div`,{style:{position:`relative`},children:[(0,H.jsx)(`input`,{type:_?`text`:`password`,value:o.smsApiKey||``,onChange:e=>s({...o,smsApiKey:e.target.value}),placeholder:`atsk_...`}),(0,H.jsx)(`button`,{type:`button`,onClick:()=>v(!_),style:{position:`absolute`,right:10,top:`50%`,transform:`translateY(-50%)`,background:`transparent`,border:0,color:`var(--muted)`,cursor:`pointer`},children:_?(0,H.jsx)(E,{size:15}):(0,H.jsx)(D,{size:15})})]})]}),(0,H.jsxs)(`label`,{children:[`Alphanumeric Sender ID (Optional)`,(0,H.jsx)(`input`,{type:`text`,value:o.smsSenderId||``,onChange:e=>s({...o,smsSenderId:e.target.value}),placeholder:`e.g. HARBORHOUSE, ORION`,maxLength:11})]})]}),o.smsProvider===`twilio`&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(`label`,{children:[`Twilio Account SID`,(0,H.jsx)(`input`,{type:`text`,value:o.smsUsername||``,onChange:e=>s({...o,smsUsername:e.target.value}),placeholder:`ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`})]}),(0,H.jsxs)(`label`,{children:[`Twilio Auth Token`,(0,H.jsxs)(`div`,{style:{position:`relative`},children:[(0,H.jsx)(`input`,{type:_?`text`:`password`,value:o.smsApiKey||``,onChange:e=>s({...o,smsApiKey:e.target.value}),placeholder:`Auth Token string`}),(0,H.jsx)(`button`,{type:`button`,onClick:()=>v(!_),style:{position:`absolute`,right:10,top:`50%`,transform:`translateY(-50%)`,background:`transparent`,border:0,color:`var(--muted)`,cursor:`pointer`},children:_?(0,H.jsx)(E,{size:15}):(0,H.jsx)(D,{size:15})})]})]}),(0,H.jsxs)(`label`,{children:[`Twilio Phone Number / Messaging SID`,(0,H.jsx)(`input`,{type:`text`,value:o.smsSenderId||``,onChange:e=>s({...o,smsSenderId:e.target.value}),placeholder:`+15551234567 or MGxxxxxxxx...`})]})]}),o.smsProvider===`advanta`&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(`label`,{children:[`Advanta Partner ID`,(0,H.jsx)(`input`,{type:`text`,value:o.smsUsername||``,onChange:e=>s({...o,smsUsername:e.target.value}),placeholder:`e.g. 1024`})]}),(0,H.jsxs)(`label`,{children:[`Advanta API Key`,(0,H.jsx)(`input`,{type:`password`,value:o.smsApiKey||``,onChange:e=>s({...o,smsApiKey:e.target.value}),placeholder:`Advanta API key`})]}),(0,H.jsxs)(`label`,{children:[`Advanta Sender ID / Shortcode`,(0,H.jsx)(`input`,{type:`text`,value:o.smsSenderId||``,onChange:e=>s({...o,smsSenderId:e.target.value}),placeholder:`e.g. ADVANTA`})]})]}),o.smsProvider===`mobilesasa`&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(`label`,{children:[`Mobilesasa Bearer API Token`,(0,H.jsx)(`input`,{type:`password`,value:o.smsApiKey||``,onChange:e=>s({...o,smsApiKey:e.target.value}),placeholder:`eyJhbGciOi...`})]}),(0,H.jsxs)(`label`,{children:[`Sender ID`,(0,H.jsx)(`input`,{type:`text`,value:o.smsSenderId||``,onChange:e=>s({...o,smsSenderId:e.target.value}),placeholder:`e.g. MOBILESASA`})]})]}),o.smsProvider===`custom_webhook`&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(`label`,{children:[`Webhook Endpoint URL (Supabase Edge Function)`,(0,H.jsx)(`input`,{type:`url`,value:o.smsCustomEndpoint||``,onChange:e=>s({...o,smsCustomEndpoint:e.target.value}),placeholder:`https://ezcwgyhwotomranbyuyh.supabase.co/functions/v1/send-sms`})]}),(0,H.jsxs)(`label`,{children:[`Custom Auth Header (Optional)`,(0,H.jsx)(`input`,{type:`text`,value:o.smsCustomHeaders||``,onChange:e=>s({...o,smsCustomHeaders:e.target.value}),placeholder:`Bearer eyJ...`})]})]}),(0,H.jsxs)(`label`,{children:[`Default Country Dialing Code`,(0,H.jsx)(`input`,{type:`text`,value:o.smsDefaultCountryCode||`+254`,onChange:e=>s({...o,smsDefaultCountryCode:e.target.value}),placeholder:`+254`})]})]}),(0,H.jsxs)(`div`,{style:{marginTop:`16px`,background:`var(--card-subtle-bg)`,border:`1px solid var(--line)`,borderRadius:`10px`,padding:`16px`},children:[(0,H.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,marginBottom:`8px`},children:[(0,H.jsx)(Be,{size:16,color:`var(--coral)`}),(0,H.jsx)(`strong`,{style:{fontSize:`13px`,color:`var(--ink-heading)`},children:`Live SMS Dispatch Diagnostic Tester`})]}),(0,H.jsx)(`p`,{style:{margin:`0 0 12px`,fontSize:`11px`,color:`var(--muted)`},children:`Test sending a live SMS to your physical mobile device to verify gateway credentials and carrier routing.`}),(0,H.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1.2fr 1fr auto`,gap:`10px`,alignItems:`flex-end`},children:[(0,H.jsxs)(`label`,{style:{margin:0},children:[`Recipient Mobile Phone`,(0,H.jsx)(`input`,{type:`tel`,value:c,onChange:e=>l(e.target.value),placeholder:`+254 712 345 678`})]}),(0,H.jsxs)(`label`,{style:{margin:0},children:[`Custom Test Message (Optional)`,(0,H.jsx)(`input`,{type:`text`,value:u,onChange:e=>d(e.target.value),placeholder:`Testing Orion SMS Gateway...`})]}),(0,H.jsxs)(`button`,{type:`button`,className:`button secondary`,onClick:async()=>{if(c.trim()){p(!0),g(null);try{let e={provider:o.smsProvider||`africastalking`,apiKey:o.smsApiKey||``,username:o.smsUsername||`sandbox`,senderId:o.smsSenderId||`ORION_WIFI`,customEndpoint:o.smsCustomEndpoint||``,customHeaders:o.smsCustomHeaders||``,smsEnabled:o.smsEnabled!==!1,defaultCountryCode:o.smsDefaultCountryCode||`+254`},t=await Vs(Bs(c,e.defaultCountryCode),u.trim()||`[Harbor House Wi-Fi] Test SMS connection verified! Provider: ${e.provider.toUpperCase()} at ${new Date().toLocaleTimeString()}.`,e);g(t)}catch(e){g({success:!1,recipient:c,providerUsed:o.smsProvider,error:e.message||`Diagnostic test failed`,sentAt:new Date().toISOString()})}finally{p(!1)}}},disabled:f||!c,style:{height:`38px`,padding:`0 16px`,display:`inline-flex`,alignItems:`center`,gap:`6px`},children:[f?(0,H.jsx)(De,{size:14,className:`spinning`}):(0,H.jsx)(je,{size:14}),` Send Test SMS`]})]}),m&&(0,H.jsxs)(`div`,{style:{marginTop:`12px`,padding:`12px`,borderRadius:`8px`,background:m.success?`rgba(76, 165, 116, 0.12)`:`rgba(217, 85, 79, 0.12)`,border:`1px solid ${m.success?`#4ca574`:`#d9554f`}`,fontSize:`11px`},children:[(0,H.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`6px`},children:[(0,H.jsxs)(`span`,{style:{fontWeight:800,color:m.success?`#317d75`:`#c94a32`,display:`inline-flex`,alignItems:`center`,gap:`5px`},children:[m.success?(0,H.jsx)(ne,{size:15}):(0,H.jsx)(We,{size:15}),m.success?`SMS Dispatched Successfully`:`SMS Dispatch Failed`]}),(0,H.jsx)(`span`,{style:{fontSize:`10px`,color:`var(--muted)`,fontFamily:`monospace`},children:new Date(m.sentAt).toLocaleTimeString()})]}),(0,H.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(140px, 1fr))`,gap:`6px`,margin:`4px 0 8px`},children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`span`,{style:{color:`var(--muted)`},children:`Recipient:`}),` `,(0,H.jsx)(`strong`,{children:m.recipient})]}),(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`span`,{style:{color:`var(--muted)`},children:`Provider:`}),` `,(0,H.jsx)(`strong`,{children:m.providerUsed})]}),(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`span`,{style:{color:`var(--muted)`},children:`Message ID:`}),` `,(0,H.jsx)(`code`,{style:{fontSize:`10px`},children:m.messageId||`N/A`})]})]}),m.error&&(0,H.jsxs)(`div`,{style:{color:`#c94a32`,background:`rgba(217, 85, 79, 0.1)`,padding:`6px 8px`,borderRadius:`5px`,marginTop:`4px`},children:[(0,H.jsx)(`strong`,{children:`Error details:`}),` `,m.error]})]})]}),(0,H.jsxs)(`button`,{className:`button primary`,type:`submit`,style:{alignSelf:`flex-start`,marginTop:`14px`},children:[(0,H.jsx)(ke,{size:16}),` Save SMS Gateway Settings`]})]}),i===`portal`&&(0,H.jsxs)(`div`,{className:`settings-card`,children:[(0,H.jsx)(`h2`,{children:`Captive Portal & Customer Experience`}),(0,H.jsx)(`p`,{style:{margin:`-6px 0 14px`,fontSize:`12px`,color:`var(--muted)`},children:`These fields brand the live guest portal: the MikroTik bridge injects the business name, support phone, welcome texts, and brand color from here every time a guest loads the page. Business name and support phone are shared with the General tab.`}),(0,H.jsx)(Fs,{branding:{businessName:o.businessName,supportPhone:o.supportPhone,primaryColor:o.primaryColor,portalTitle:o.portalTitle,portalMessage:o.portalMessage}}),(0,H.jsxs)(`div`,{className:`settings-grid-2`,children:[(0,H.jsxs)(`label`,{children:[`Business Name (portal brand)`,(0,H.jsx)(`input`,{type:`text`,value:o.businessName,onChange:e=>s({...o,businessName:e.target.value}),placeholder:`e.g. Harbor House`})]}),(0,H.jsxs)(`label`,{children:[`Support Phone (portal footer)`,(0,H.jsx)(`input`,{type:`tel`,value:o.supportPhone,onChange:e=>s({...o,supportPhone:e.target.value}),placeholder:`+254 700 123 456`})]}),(0,H.jsxs)(`label`,{children:[`Welcome Headline`,(0,H.jsx)(`input`,{type:`text`,value:o.portalTitle,onChange:e=>s({...o,portalTitle:e.target.value}),placeholder:`You're connected — sign in`})]}),(0,H.jsxs)(`label`,{children:[`Portal Subtitle Message`,(0,H.jsx)(`input`,{type:`text`,value:o.portalMessage,onChange:e=>s({...o,portalMessage:e.target.value}),placeholder:`Enter the voucher code from your receipt, or buy instant access with M-Pesa.`})]})]}),(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`span`,{style:{fontSize:`11px`,fontWeight:700,color:`var(--muted)`},children:`Brand Primary Color`}),(0,H.jsx)(`div`,{className:`color-swatch-list`,children:[[`#d36b4d`,`Coral Orange`],[`#317d75`,`Emerald Teal`],[`#4f779a`,`Ocean Blue`],[`#c58a32`,`Amber Gold`],[`#725796`,`Royal Purple`]].map(([e,t])=>(0,H.jsx)(`button`,{type:`button`,title:t,className:`color-swatch-btn ${o.primaryColor===e?`active`:``}`,style:{background:e},onClick:()=>s({...o,primaryColor:e})},e))})]}),(0,H.jsxs)(`button`,{className:`button primary`,type:`submit`,style:{alignSelf:`flex-start`},children:[(0,H.jsx)(ke,{size:16}),` Save Portal Styling`]})]}),i===`router`&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(cc,{}),(0,H.jsxs)(`div`,{className:`settings-card`,children:[(0,H.jsx)(`h2`,{children:`MikroTik RouterOS & Gateway Settings`}),(0,H.jsxs)(`div`,{className:`settings-grid-2`,children:[(0,H.jsxs)(`label`,{children:[`Core Router IP Address`,(0,H.jsx)(`input`,{type:`text`,value:o.mikrotikIp,onChange:e=>s({...o,mikrotikIp:e.target.value}),placeholder:`10.20.0.1`})]}),(0,H.jsxs)(`label`,{children:[`RouterOS API Port`,(0,H.jsx)(`input`,{type:`text`,value:o.mikrotikPort,onChange:e=>s({...o,mikrotikPort:e.target.value}),placeholder:`8728`})]}),(0,H.jsxs)(`label`,{children:[`Session Timeout (Minutes)`,(0,H.jsx)(`input`,{type:`number`,value:o.sessionTimeout,onChange:e=>s({...o,sessionTimeout:e.target.value}),placeholder:`1440`})]}),(0,H.jsxs)(`label`,{children:[`Idle Timeout (Minutes)`,(0,H.jsx)(`input`,{type:`number`,value:o.idleTimeout,onChange:e=>s({...o,idleTimeout:e.target.value}),placeholder:`15`})]})]}),(0,H.jsxs)(`button`,{className:`button primary`,type:`submit`,style:{alignSelf:`flex-start`},children:[(0,H.jsx)(ke,{size:16}),` Save Network Config`]})]})]}),i===`payments`&&(0,H.jsxs)(`div`,{className:`settings-card`,children:[(0,H.jsx)(`h2`,{children:`Payment Gateways & Integrations`}),(0,H.jsxs)(`div`,{className:`settings-grid-2`,children:[(0,H.jsxs)(`label`,{children:[`M-Pesa Paybill / Till Number`,(0,H.jsx)(`input`,{type:`text`,value:o.mpesaTill,onChange:e=>s({...o,mpesaTill:e.target.value}),placeholder:`892100`})]}),(0,H.jsxs)(`label`,{children:[`M-Pesa Daraja Passkey`,(0,H.jsx)(`input`,{type:`password`,value:o.mpesaPasskey,onChange:e=>s({...o,mpesaPasskey:e.target.value}),placeholder:`Passkey string`})]}),(0,H.jsxs)(`label`,{children:[`Airtel Money Merchant ID`,(0,H.jsx)(`input`,{type:`text`,value:o.airtelMerchantId,onChange:e=>s({...o,airtelMerchantId:e.target.value}),placeholder:`HH-AIRTEL-901`})]}),(0,H.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`6px`},children:[(0,H.jsx)(`span`,{style:{fontSize:`11px`,fontWeight:700,color:`var(--muted)`},children:`Database Cloud Sync`}),(0,H.jsxs)(`button`,{type:`button`,className:`button secondary`,style:{alignSelf:`flex-start`},onClick:r,children:[(0,H.jsx)(oe,{size:15}),` Configure Supabase API Keys`]})]})]}),(0,H.jsxs)(`button`,{className:`button primary`,type:`submit`,style:{alignSelf:`flex-start`},children:[(0,H.jsx)(ke,{size:16}),` Save Payment Settings`]})]})]})]})}function cc(){let e=ns(),[t,n]=(0,h.useState)(e.url),[r,i]=(0,h.useState)(e.apiKey),[a,o]=(0,h.useState)(is()),[s,c]=(0,h.useState)(``),l=ds();return(0,H.jsxs)(`div`,{className:`settings-card`,children:[(0,H.jsx)(`h2`,{children:`MikroTik Bridge (Live Router Connection)`}),(0,H.jsxs)(`p`,{className:`settings-hint`,children:[`The bridge service runs on your hotspot network, speaks the RouterOS API directly, and provisions packages, vouchers, and payments onto the router. Start it with`,(0,H.jsx)(`code`,{children:` node mikrotik-bridge/index.js`}),`.`]}),(0,H.jsxs)(`div`,{className:`settings-grid-2`,children:[(0,H.jsxs)(`label`,{children:[`Bridge URL`,(0,H.jsx)(`input`,{type:`text`,value:t,onChange:e=>n(e.target.value),placeholder:`http://192.168.88.10:8787`})]}),(0,H.jsxs)(`label`,{children:[`Bridge API Key (x-bridge-key)`,(0,H.jsx)(`input`,{type:`password`,value:r,onChange:e=>i(e.target.value),placeholder:`Value of BRIDGE_API_KEY in the bridge .env`})]}),(0,H.jsxs)(`label`,{children:[`Default Router ID (BRIDGE_DEFAULT_ROUTER_ID)`,(0,H.jsx)(`input`,{type:`text`,value:a,onChange:e=>o(e.target.value),placeholder:`UUID of the router row in Supabase`})]})]}),(0,H.jsxs)(`div`,{className:`bridge-status-row`,children:[(0,H.jsxs)(`span`,{className:`live-pill ${l.status?``:`offline`}`,children:[(0,H.jsx)(`i`,{}),` `,l.status?`Bridge online`:`Bridge offline`]}),l.status&&(0,H.jsxs)(`span`,{className:`bridge-meta`,children:[`Polls: `,l.status.polls,` · Errors: `,l.status.errors,` · Last poll:`,` `,l.status.lastPollAt?new Date(l.status.lastPollAt).toLocaleTimeString():`—`]})]}),l.health&&(0,H.jsxs)(`div`,{className:`bridge-health-grid`,children:[(0,H.jsxs)(`span`,{children:[`Identity: `,(0,H.jsx)(`strong`,{children:l.health.identity})]}),(0,H.jsxs)(`span`,{children:[`RouterOS: `,(0,H.jsx)(`strong`,{children:l.health.version})]}),(0,H.jsxs)(`span`,{children:[`Board: `,(0,H.jsx)(`strong`,{children:l.health.board_name})]}),(0,H.jsxs)(`span`,{children:[`CPU: `,(0,H.jsxs)(`strong`,{children:[l.health.cpu_load,`%`]})]}),(0,H.jsxs)(`span`,{children:[`Memory: `,(0,H.jsxs)(`strong`,{children:[l.health.free_memory_mb,` MB free`]})]}),(0,H.jsxs)(`span`,{children:[`Uptime: `,(0,H.jsx)(`strong`,{children:l.health.uptime})]})]}),l.lastError&&(0,H.jsxs)(`p`,{className:`bridge-error`,children:[`⚠ `,l.lastError]}),(0,H.jsxs)(`div`,{className:`settings-actions-row`,children:[(0,H.jsxs)(`button`,{className:`button primary`,type:`button`,onClick:()=>{rs(t,r),as(a),c(`Saved — testing connection...`),l.refresh(),window.setTimeout(()=>c(``),2500)},children:[(0,H.jsx)(ke,{size:16}),` Save bridge config`]}),(0,H.jsxs)(`button`,{className:`button secondary`,type:`button`,onClick:async()=>{c(`Testing...`),await l.refresh(),c(l.lastError?`❌ ${l.lastError}`:`✅ Bridge reachable`),window.setTimeout(()=>c(``),3500)},children:[(0,H.jsx)(Te,{size:16}),` Test connection`]}),(0,H.jsxs)(`button`,{className:`button secondary`,type:`button`,onClick:async()=>{c(`Syncing...`);try{await ls.syncNow(),c(`✅ Sync pass queued on the bridge`)}catch(e){c(`❌ ${e.message}`)}window.setTimeout(()=>c(``),3500)},disabled:!l.status,children:[(0,H.jsx)(De,{size:16}),` Sync now`]}),s&&(0,H.jsx)(`span`,{className:`bridge-saved-note`,children:s})]})]})}function lc({packages:e,onToggleActive:t,onDelete:n,onAddNewClick:r,onGenerateVouchersForPackage:i}){let[a,o]=(0,h.useState)(``),[s,c]=(0,h.useState)(`all`),l=e.filter(e=>{let t=e.name.toLowerCase().includes(a.toLowerCase())||e.duration_display.toLowerCase().includes(a.toLowerCase())||e.data_limit.toLowerCase().includes(a.toLowerCase())||String(e.price).includes(a),n=e.data_limit.toLowerCase().includes(`unlimited`),r=s===`all`?!0:s===`unlimited`?n:e.category===s;return t&&r}),u=e.reduce((e,t)=>e+t.price*t.sales_count,0),d=e.reduce((e,t)=>e+t.sales_count,0),f=e.filter(e=>e.data_limit.toLowerCase().includes(`unlimited`)).length;return(0,H.jsxs)(`div`,{className:`packages-view`,children:[(0,H.jsxs)(`section`,{className:`page-heading`,children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`p`,{className:`eyebrow`,children:`Access Tiers & Plans`}),(0,H.jsx)(`h1`,{children:`Package Management`}),(0,H.jsx)(`p`,{className:`heading-sub`,children:`Design and sell customized internet packages (unlimited hourly, daily, weekly, monthly, and multi-device plans).`})]}),(0,H.jsx)(`div`,{className:`heading-actions`,children:(0,H.jsxs)(`button`,{className:`button primary`,onClick:r,children:[(0,H.jsx)(Se,{size:16}),` Create new package`]})})]}),(0,H.jsxs)(`div`,{className:`unlimited-suite-box`,children:[(0,H.jsxs)(`div`,{className:`unlimited-suite-header`,children:[(0,H.jsxs)(`div`,{className:`unlimited-suite-title`,children:[(0,H.jsx)(`div`,{style:{background:`var(--coral)`,color:`#fff`,padding:7,borderRadius:8,display:`grid`,placeItems:`center`},children:(0,H.jsx)(fe,{size:20})}),(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`h2`,{children:`Unified Unlimited Hotspot Plans Suite`}),(0,H.jsx)(`p`,{children:`Combined unmetered bandwidth packages across Hours, Days, Weeks, Months, and Multi-Device tiers.`})]})]}),(0,H.jsxs)(`button`,{className:`button primary`,style:{fontSize:`11px`,padding:`6px 12px`},onClick:r,children:[(0,H.jsx)(Re,{size:13}),` Customize Plan`]})]}),(0,H.jsxs)(`div`,{className:`unlimited-matrix-grid`,children:[(0,H.jsxs)(`div`,{className:`matrix-tier-card`,children:[(0,H.jsxs)(`div`,{className:`matrix-tier-header`,children:[(0,H.jsx)(`span`,{className:`matrix-tier-badge`,children:`Hourly Unlimited`}),(0,H.jsx)(Qe,{size:14,color:`#dca642`})]}),(0,H.jsxs)(`div`,{className:`matrix-tier-price`,children:[(0,H.jsx)(`strong`,{children:`KSh 70`}),(0,H.jsx)(`span`,{children:`/ 1 Hour`})]}),(0,H.jsxs)(`div`,{className:`matrix-tier-specs`,children:[(0,H.jsxs)(`span`,{children:[(0,H.jsx)(w,{size:12}),` 10 Mbps Unmetered`]}),(0,H.jsxs)(`span`,{children:[(0,H.jsx)(w,{size:12}),` 1 Device Instant`]})]})]}),(0,H.jsxs)(`div`,{className:`matrix-tier-card`,children:[(0,H.jsxs)(`div`,{className:`matrix-tier-header`,children:[(0,H.jsx)(`span`,{className:`matrix-tier-badge`,style:{background:`#fdf1e7`,color:`var(--coral)`},children:`Daily Unlimited`}),(0,H.jsx)(ue,{size:14,color:`var(--coral)`})]}),(0,H.jsxs)(`div`,{className:`matrix-tier-price`,children:[(0,H.jsx)(`strong`,{children:`KSh 350`}),(0,H.jsx)(`span`,{children:`/ 24 Hours`})]}),(0,H.jsxs)(`div`,{className:`matrix-tier-specs`,children:[(0,H.jsxs)(`span`,{children:[(0,H.jsx)(w,{size:12}),` 20 Mbps High-Speed`]}),(0,H.jsxs)(`span`,{children:[(0,H.jsx)(w,{size:12}),` Most Popular Tier`]})]})]}),(0,H.jsxs)(`div`,{className:`matrix-tier-card`,children:[(0,H.jsxs)(`div`,{className:`matrix-tier-header`,children:[(0,H.jsx)(`span`,{className:`matrix-tier-badge`,style:{background:`#eaf3eb`,color:`#317d75`},children:`Weekly Unlimited`}),(0,H.jsx)(Ue,{size:14,color:`#317d75`})]}),(0,H.jsxs)(`div`,{className:`matrix-tier-price`,children:[(0,H.jsx)(`strong`,{children:`KSh 1,500`}),(0,H.jsx)(`span`,{children:`/ 7 Days`})]}),(0,H.jsxs)(`div`,{className:`matrix-tier-specs`,children:[(0,H.jsxs)(`span`,{children:[(0,H.jsx)(w,{size:12}),` 25 Mbps Ultra Line`]}),(0,H.jsxs)(`span`,{children:[(0,H.jsx)(w,{size:12}),` Full 168h Access`]})]})]}),(0,H.jsxs)(`div`,{className:`matrix-tier-card`,children:[(0,H.jsxs)(`div`,{className:`matrix-tier-header`,children:[(0,H.jsx)(`span`,{className:`matrix-tier-badge`,style:{background:`#e6f0fa`,color:`#4f779a`},children:`Monthly Multi-Device`}),(0,H.jsx)(Je,{size:14,color:`#4f779a`})]}),(0,H.jsxs)(`div`,{className:`matrix-tier-price`,children:[(0,H.jsx)(`strong`,{children:`KSh 6,500`}),(0,H.jsx)(`span`,{children:`/ 30 Days`})]}),(0,H.jsxs)(`div`,{className:`matrix-tier-specs`,children:[(0,H.jsxs)(`span`,{children:[(0,H.jsx)(w,{size:12}),` 50 Mbps Turbo Line`]}),(0,H.jsxs)(`span`,{children:[(0,H.jsx)(w,{size:12}),` 4 Devices Shared`]})]})]})]})]}),(0,H.jsxs)(`section`,{className:`metrics-grid`,children:[(0,H.jsx)(U,{label:`Unlimited Plans`,value:`${f} tiers`,change:`Hours, Days, Weeks, Months`,trend:`up`,icon:fe,accent:`green`}),(0,H.jsx)(U,{label:`Total Plans Sold`,value:d.toLocaleString(),change:`18.4% this month`,trend:`up`,icon:Ee,accent:`orange`}),(0,H.jsx)(U,{label:`Total Package Revenue`,value:`KSh ${u.toLocaleString()}`,change:`Lifetime volume`,trend:`up`,icon:T,accent:`teal`}),(0,H.jsx)(U,{label:`Multi-Device Plans`,value:String(e.filter(e=>e.device_limit>1).length),change:`Family / Team tiers`,trend:`up`,icon:O,accent:`blue`})]}),(0,H.jsxs)(`div`,{className:`router-toolbar`,children:[(0,H.jsxs)(`div`,{className:`router-search-box`,children:[(0,H.jsx)(Ae,{size:16,color:`var(--muted)`}),(0,H.jsx)(`input`,{type:`text`,placeholder:`Search by package name, duration, price, unlimited...`,value:a,onChange:e=>o(e.target.value)}),a&&(0,H.jsx)(`button`,{onClick:()=>o(``),style:{background:`transparent`,border:0,color:`var(--muted)`,cursor:`pointer`,padding:0},children:(0,H.jsx)(Ze,{size:14})})]}),(0,H.jsxs)(`div`,{className:`filter-pills`,children:[(0,H.jsxs)(`button`,{className:`filter-pill ${s===`all`?`active`:``}`,onClick:()=>c(`all`),children:[`All (`,e.length,`)`]}),(0,H.jsxs)(`button`,{className:`filter-pill ${s===`unlimited`?`active`:``}`,onClick:()=>c(`unlimited`),children:[`♾️ Unlimited (`,f,`)`]}),(0,H.jsxs)(`button`,{className:`filter-pill ${s===`hourly`?`active`:``}`,onClick:()=>c(`hourly`),children:[`Hourly (`,e.filter(e=>e.category===`hourly`).length,`)`]}),(0,H.jsxs)(`button`,{className:`filter-pill ${s===`daily`?`active`:``}`,onClick:()=>c(`daily`),children:[`Daily (`,e.filter(e=>e.category===`daily`).length,`)`]}),(0,H.jsxs)(`button`,{className:`filter-pill ${s===`weekly`?`active`:``}`,onClick:()=>c(`weekly`),children:[`Weekly (`,e.filter(e=>e.category===`weekly`).length,`)`]}),(0,H.jsxs)(`button`,{className:`filter-pill ${s===`monthly`?`active`:``}`,onClick:()=>c(`monthly`),children:[`Monthly (`,e.filter(e=>e.category===`monthly`).length,`)`]}),(0,H.jsxs)(`button`,{className:`filter-pill ${s===`multi-device`?`active`:``}`,onClick:()=>c(`multi-device`),children:[`Multi-Device (`,e.filter(e=>e.category===`multi-device`||e.device_limit>1).length,`)`]})]})]}),l.length===0?(0,H.jsxs)(`div`,{className:`panel section-placeholder`,style:{minHeight:`220px`,textAlign:`center`,alignItems:`center`},children:[(0,H.jsx)(`div`,{className:`placeholder-icon`,children:(0,H.jsx)(Ve,{size:20})}),(0,H.jsx)(`h2`,{children:`No matching packages found`}),(0,H.jsx)(`p`,{children:`Create a new package or choose a different category filter.`})]}):(0,H.jsx)(`div`,{className:`package-cards-admin-grid`,children:l.map(e=>{let r=e.data_limit.toLowerCase().includes(`unlimited`);return(0,H.jsxs)(`div`,{className:`package-admin-card ${e.is_active?``:`inactive`}`,children:[(0,H.jsxs)(`div`,{className:`package-card-header`,children:[(0,H.jsxs)(`div`,{className:`package-title-wrap`,children:[(0,H.jsx)(`h3`,{children:e.name}),(0,H.jsx)(`span`,{className:`package-category-tag`,children:e.category})]}),(0,H.jsxs)(`div`,{className:`customer-quick-actions`,children:[r&&(0,H.jsxs)(`span`,{className:`package-unlimited-badge`,title:`Unlimited Data without throttling`,children:[(0,H.jsx)(Re,{size:11}),` Unlimited`]}),(0,H.jsxs)(`span`,{className:`package-device-badge ${e.device_limit>1?`multi`:``}`,title:`Allowed concurrent connections: ${e.device_limit} devices`,children:[e.device_limit>1?(0,H.jsx)(Je,{size:12}):(0,H.jsx)(Le,{size:12}),e.device_limit,` `,e.device_limit>1?`Devices`:`Device`]})]})]}),(0,H.jsxs)(`div`,{className:`package-price-display`,children:[(0,H.jsxs)(`strong`,{children:[`KSh `,e.price.toLocaleString()]}),(0,H.jsxs)(`span`,{children:[`/ `,e.duration_display]})]}),(0,H.jsxs)(`div`,{className:`package-features-list`,children:[(0,H.jsxs)(`div`,{className:`package-feature-item`,children:[(0,H.jsx)(re,{size:13}),(0,H.jsxs)(`span`,{children:[`Duration: `,(0,H.jsx)(`strong`,{children:e.duration_display})]})]}),(0,H.jsxs)(`div`,{className:`package-feature-item`,children:[(0,H.jsx)(Qe,{size:13}),(0,H.jsxs)(`span`,{children:[`Data Quota: `,(0,H.jsx)(`strong`,{style:{color:r?`var(--green)`:`inherit`},children:e.data_limit})]})]}),(0,H.jsxs)(`div`,{className:`package-feature-item`,children:[(0,H.jsx)(de,{size:13}),(0,H.jsxs)(`span`,{children:[`Bandwidth Cap: `,(0,H.jsx)(`strong`,{children:e.speed_limit})]})]}),(0,H.jsxs)(`div`,{className:`package-feature-item`,children:[(0,H.jsx)(Je,{size:13}),(0,H.jsxs)(`span`,{children:[`Concurrency: `,(0,H.jsxs)(`strong`,{children:[e.device_limit,` simultaneous device`,e.device_limit>1?`s`:``]})]})]})]}),(0,H.jsxs)(`div`,{className:`package-sales-stats`,children:[(0,H.jsxs)(`span`,{children:[`Total Sold: `,(0,H.jsxs)(`strong`,{children:[e.sales_count,` plans`]})]}),(0,H.jsxs)(`span`,{children:[`Revenue: `,(0,H.jsxs)(`strong`,{children:[`KSh `,(e.price*(e.sales_count||1)).toLocaleString()]})]})]}),(0,H.jsxs)(`div`,{className:`router-card-actions`,children:[(0,H.jsxs)(`button`,{className:`router-action-btn`,onClick:()=>i(e.name),title:`Generate access vouchers for this package`,children:[(0,H.jsx)(Ve,{size:13}),` Generate Vouchers`]}),(0,H.jsx)(`button`,{className:`router-action-btn`,onClick:()=>t(e.id),title:e.is_active?`Pause package (hide from sales)`:`Activate package`,children:e.is_active?`Active`:`Paused`}),(0,H.jsx)(`button`,{className:`router-delete-btn`,onClick:()=>n(e.id,e.name),title:`Delete package`,"aria-label":`Delete ${e.name}`,children:(0,H.jsx)(He,{size:14})})]})]},e.id)})})]})}function uc({customers:e,onToggleBlock:t,onDelete:n,onExportCSV:r,onAddNewClick:i,onSendSmsClick:a}){let[o,s]=(0,h.useState)(``),[c,l]=(0,h.useState)(`all`),u=e.filter(e=>{let t=e.name.toLowerCase().includes(o.toLowerCase())||e.phone.includes(o)||e.device.toLowerCase().includes(o.toLowerCase())||e.plan.toLowerCase().includes(o.toLowerCase()),n=c===`all`||e.status===c;return t&&n}),d=e.filter(e=>e.status===`active`).length,f=e.filter(e=>e.status===`blocked`).length;return(0,H.jsxs)(`div`,{className:`customers-view`,children:[(0,H.jsxs)(`section`,{className:`page-heading`,children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`p`,{className:`eyebrow`,children:`Directory & Access Control`}),(0,H.jsx)(`h1`,{children:`Customer Management`}),(0,H.jsx)(`p`,{className:`heading-sub`,children:`Track customer hotspot subscriptions, data consumption, payment history, and device access.`})]}),(0,H.jsxs)(`div`,{className:`heading-actions`,children:[(0,H.jsxs)(`button`,{className:`button secondary`,onClick:r,children:[(0,H.jsx)(se,{size:15}),` Export CSV`]}),(0,H.jsxs)(`button`,{className:`button primary`,onClick:i,children:[(0,H.jsx)(Ke,{size:16}),` Add customer`]})]})]}),(0,H.jsxs)(`section`,{className:`metrics-grid`,children:[(0,H.jsx)(U,{label:`Total Subscribers`,value:String(e.length+1278),change:`12.6%`,trend:`up`,icon:Je,accent:`orange`}),(0,H.jsx)(U,{label:`Online Now`,value:`${d} connected`,change:`Live on APs`,trend:`up`,icon:Xe,accent:`green`}),(0,H.jsx)(U,{label:`Average Customer Value`,value:`KSh 1,220`,change:`8.4%`,trend:`up`,icon:T,accent:`teal`}),(0,H.jsx)(U,{label:`Blocked Devices`,value:`${f} banned`,change:`Access restricted`,trend:`down`,icon:S,accent:`blue`})]}),(0,H.jsxs)(`div`,{className:`router-toolbar`,children:[(0,H.jsxs)(`div`,{className:`router-search-box`,children:[(0,H.jsx)(Ae,{size:16,color:`var(--muted)`}),(0,H.jsx)(`input`,{type:`text`,placeholder:`Search by customer name, phone, device, or plan...`,value:o,onChange:e=>s(e.target.value)}),o&&(0,H.jsx)(`button`,{onClick:()=>s(``),style:{background:`transparent`,border:0,color:`var(--muted)`,cursor:`pointer`,padding:0},children:(0,H.jsx)(Ze,{size:14})})]}),(0,H.jsxs)(`div`,{className:`filter-pills`,children:[(0,H.jsxs)(`button`,{className:`filter-pill ${c===`all`?`active`:``}`,onClick:()=>l(`all`),children:[`All (`,e.length,`)`]}),(0,H.jsxs)(`button`,{className:`filter-pill ${c===`active`?`active`:``}`,onClick:()=>l(`active`),children:[`Active Now (`,d,`)`]}),(0,H.jsxs)(`button`,{className:`filter-pill ${c===`idle`?`active`:``}`,onClick:()=>l(`idle`),children:[`Idle (`,e.filter(e=>e.status===`idle`).length,`)`]}),(0,H.jsxs)(`button`,{className:`filter-pill ${c===`blocked`?`active`:``}`,onClick:()=>l(`blocked`),children:[`Blocked (`,f,`)`]})]})]}),(0,H.jsx)(`div`,{className:`panel`,style:{padding:`0 20px 14px`},children:(0,H.jsx)(`div`,{className:`table-wrap`,children:(0,H.jsxs)(`table`,{children:[(0,H.jsx)(`thead`,{children:(0,H.jsxs)(`tr`,{children:[(0,H.jsx)(`th`,{children:`Customer Name`}),(0,H.jsx)(`th`,{children:`Phone Number`}),(0,H.jsx)(`th`,{children:`Device Info`}),(0,H.jsx)(`th`,{children:`Current Plan`}),(0,H.jsx)(`th`,{children:`Total Spent`}),(0,H.jsx)(`th`,{children:`Data Consumed`}),(0,H.jsx)(`th`,{children:`Status`}),(0,H.jsx)(`th`,{children:`Last Active`}),(0,H.jsx)(`th`,{style:{textAlign:`right`},children:`Actions`})]})}),(0,H.jsx)(`tbody`,{children:u.length===0?(0,H.jsx)(`tr`,{children:(0,H.jsx)(`td`,{colSpan:9,style:{textAlign:`center`,padding:`36px 0`,color:`var(--muted)`},children:`No customers found matching your criteria.`})}):u.map(e=>(0,H.jsxs)(`tr`,{children:[(0,H.jsx)(`td`,{children:(0,H.jsxs)(`div`,{className:`customer-cell`,children:[(0,H.jsx)(`div`,{className:`customer-avatar`,style:{background:e.avatar_color},children:e.name.split(` `).map(e=>e[0]).join(``)}),(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`strong`,{children:e.name}),(0,H.jsxs)(`span`,{children:[`ID: `,e.id.slice(0,8)]})]})]})}),(0,H.jsx)(`td`,{children:(0,H.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:`5px`,color:`var(--ink)`},children:[(0,H.jsx)(xe,{size:13,color:`var(--muted)`}),` `,e.phone]})}),(0,H.jsx)(`td`,{children:(0,H.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:`5px`,color:`var(--ink)`},children:[(0,H.jsx)(Le,{size:13,color:`var(--muted)`}),` `,e.device]})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`span`,{className:`package-name`,children:e.plan})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`strong`,{children:e.total_spent})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`span`,{className:`muted`,children:e.data_usage})}),(0,H.jsx)(`td`,{children:(0,H.jsxs)(`span`,{className:`customer-status-badge ${e.status}`,children:[(0,H.jsx)(`span`,{style:{width:6,height:6,borderRadius:`50%`,background:e.status===`active`?`#4ca574`:e.status===`idle`?`#87928b`:`#d9554f`}}),e.status===`active`?`Online`:e.status===`idle`?`Offline`:`Blocked`]})}),(0,H.jsx)(`td`,{children:(0,H.jsx)(`span`,{className:`muted`,children:e.last_active})}),(0,H.jsx)(`td`,{style:{textAlign:`right`},children:(0,H.jsxs)(`div`,{className:`customer-quick-actions`,style:{justifyContent:`flex-end`},children:[(0,H.jsx)(`button`,{className:`customer-icon-btn`,title:`Send SMS message to customer`,onClick:()=>a?.(e),children:(0,H.jsx)(_e,{size:13})}),(0,H.jsx)(`button`,{className:`customer-icon-btn ${e.status===`blocked`?``:`danger`}`,title:e.status===`blocked`?`Unblock customer Wi-Fi access`:`Block customer device MAC`,onClick:()=>t(e),children:e.status===`blocked`?(0,H.jsx)(Ge,{size:14,color:`#4ca574`}):(0,H.jsx)(qe,{size:14})}),(0,H.jsx)(`button`,{className:`customer-icon-btn danger`,title:`Delete customer record`,onClick:()=>n(e.id,e.name),children:(0,H.jsx)(He,{size:14})})]})})]},e.id))})]})})})]})}function dc({routers:e,onPing:t,onReboot:n,onDelete:r,onAddNewClick:i}){let[a,o]=(0,h.useState)(``),[s,c]=(0,h.useState)(`all`),l=e.filter(e=>{let t=e.name.toLowerCase().includes(a.toLowerCase())||e.ip_address.includes(a)||e.location.toLowerCase().includes(a.toLowerCase())||e.model.toLowerCase().includes(a.toLowerCase()),n=s===`all`||e.status===s;return t&&n}),u=e.filter(e=>e.status===`good`).length,d=e.reduce((e,t)=>e+t.clients_count,0);return(0,H.jsxs)(`div`,{className:`routers-view`,children:[(0,H.jsxs)(`section`,{className:`page-heading`,children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`p`,{className:`eyebrow`,children:`Infrastructure & Gateways`}),(0,H.jsx)(`h1`,{children:`Routers & Access Points`}),(0,H.jsx)(`p`,{className:`heading-sub`,children:`Monitor and manage MikroTik gateways, RADIUS controllers, and Wi-Fi access points.`})]}),(0,H.jsxs)(`div`,{className:`heading-actions`,children:[(0,H.jsxs)(`button`,{className:`button secondary`,onClick:()=>window.location.reload(),children:[(0,H.jsx)(De,{size:15}),` Scan network`]}),(0,H.jsxs)(`button`,{className:`button primary`,onClick:i,children:[(0,H.jsx)(Se,{size:16}),` Add new router / AP`]})]})]}),(0,H.jsxs)(`section`,{className:`metrics-grid`,children:[(0,H.jsx)(U,{label:`Online Gateways`,value:`${u} / ${e.length}`,change:`100% Uptime`,trend:`up`,icon:Me,accent:`green`}),(0,H.jsx)(U,{label:`Connected Hotspot Users`,value:String(d),change:`Across all APs`,trend:`up`,icon:Je,accent:`orange`}),(0,H.jsx)(U,{label:`Total Bandwidth Draw`,value:`136.9 Mbps`,change:`68% of 200M line`,trend:`up`,icon:b,accent:`teal`}),(0,H.jsx)(U,{label:`Avg. Gateway Ping`,value:`2.8 ms`,change:`Ultra-low latency`,trend:`up`,icon:Te,accent:`blue`})]}),(0,H.jsxs)(`div`,{className:`router-toolbar`,children:[(0,H.jsxs)(`div`,{className:`router-search-box`,children:[(0,H.jsx)(Ae,{size:16,color:`var(--muted)`}),(0,H.jsx)(`input`,{type:`text`,placeholder:`Search by name, IP, model, or location...`,value:a,onChange:e=>o(e.target.value)}),a&&(0,H.jsx)(`button`,{onClick:()=>o(``),style:{background:`transparent`,border:0,color:`var(--muted)`,cursor:`pointer`,padding:0},children:(0,H.jsx)(Ze,{size:14})})]}),(0,H.jsxs)(`div`,{className:`filter-pills`,children:[(0,H.jsxs)(`button`,{className:`filter-pill ${s===`all`?`active`:``}`,onClick:()=>c(`all`),children:[`All (`,e.length,`)`]}),(0,H.jsxs)(`button`,{className:`filter-pill ${s===`good`?`active`:``}`,onClick:()=>c(`good`),children:[`Online (`,u,`)`]}),(0,H.jsxs)(`button`,{className:`filter-pill ${s===`warn`?`active`:``}`,onClick:()=>c(`warn`),children:[`Warning (`,e.filter(e=>e.status===`warn`).length,`)`]}),(0,H.jsxs)(`button`,{className:`filter-pill ${s===`down`?`active`:``}`,onClick:()=>c(`down`),children:[`Down (`,e.filter(e=>e.status===`down`).length,`)`]})]})]}),l.length===0?(0,H.jsxs)(`div`,{className:`panel section-placeholder`,style:{minHeight:`220px`,textAlign:`center`,alignItems:`center`},children:[(0,H.jsx)(`div`,{className:`placeholder-icon`,children:(0,H.jsx)(Ye,{size:20})}),(0,H.jsx)(`h2`,{children:`No matching routers found`}),(0,H.jsx)(`p`,{children:`Try adjusting your search query or status filter.`})]}):(0,H.jsx)(`div`,{className:`router-cards-grid`,children:l.map(e=>(0,H.jsxs)(`div`,{className:`router-item-card`,children:[(0,H.jsxs)(`div`,{className:`router-card-header`,children:[(0,H.jsxs)(`div`,{className:`router-identity`,children:[(0,H.jsx)(`div`,{className:`router-icon-wrap`,children:(0,H.jsx)(Oe,{size:22})}),(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`h3`,{children:e.name}),(0,H.jsx)(`span`,{children:e.model})]})]}),(0,H.jsxs)(`span`,{className:`router-badge ${e.status}`,children:[(0,H.jsx)(`span`,{style:{width:6,height:6,borderRadius:`50%`,background:e.status===`good`?`#4ca574`:e.status===`warn`?`#dca642`:`#d9554f`}}),e.status===`good`?`Online`:e.status===`warn`?`Warning`:`Offline`]})]}),(0,H.jsxs)(`div`,{className:`router-details-grid`,children:[(0,H.jsxs)(`div`,{className:`router-detail-item`,children:[(0,H.jsx)(`span`,{children:`IP Address`}),(0,H.jsx)(`strong`,{children:e.ip_address})]}),(0,H.jsxs)(`div`,{className:`router-detail-item`,children:[(0,H.jsx)(`span`,{children:`Location`}),(0,H.jsx)(`strong`,{children:e.location})]}),(0,H.jsxs)(`div`,{className:`router-detail-item`,children:[(0,H.jsx)(`span`,{children:`Active Clients`}),(0,H.jsxs)(`strong`,{children:[e.clients_count,` devices`]})]}),(0,H.jsxs)(`div`,{className:`router-detail-item`,children:[(0,H.jsx)(`span`,{children:`Ping Latency`}),(0,H.jsxs)(`strong`,{style:{color:e.ping_ms>10?`var(--coral)`:`var(--green)`},children:[e.ping_ms,` ms`]})]})]}),(0,H.jsxs)(`div`,{className:`router-perf-section`,children:[(0,H.jsxs)(`div`,{className:`router-perf-row`,children:[(0,H.jsx)(`span`,{children:`Live Traffic (Down / Up)`}),(0,H.jsxs)(`strong`,{children:[e.traffic_down,` ↓ / `,e.traffic_up,` ↑`]})]}),(0,H.jsx)(`div`,{className:`usage-bar`,style:{height:6},children:(0,H.jsx)(`i`,{style:{width:`${Math.min(100,e.cpu_load+20)}%`,background:e.cpu_load>60?`var(--coral)`:`var(--green)`}})}),(0,H.jsxs)(`div`,{className:`router-perf-row`,style:{fontSize:`10px`},children:[(0,H.jsxs)(`span`,{children:[`CPU: `,e.cpu_load,`% · RAM: `,e.ram_load,`%`]}),(0,H.jsxs)(`span`,{children:[`Uptime: `,e.uptime]})]})]}),(0,H.jsxs)(`div`,{className:`router-card-actions`,children:[(0,H.jsxs)(`button`,{className:`router-action-btn`,onClick:()=>t(e),title:`Test router latency and ICMP ping`,children:[(0,H.jsx)(Te,{size:13}),` Ping`]}),(0,H.jsxs)(`button`,{className:`router-action-btn`,onClick:()=>n(e),title:`Reboot RouterOS`,children:[(0,H.jsx)(De,{size:13}),` Reboot`]}),(0,H.jsx)(`button`,{className:`router-delete-btn`,onClick:()=>r(e.id,e.name),title:`Delete router from workspace`,"aria-label":`Delete ${e.name}`,children:(0,H.jsx)(He,{size:14})})]})]},e.id))})]})}function U({label:e,value:t,change:n,trend:r,icon:i,accent:a}){return(0,H.jsxs)(`div`,{className:`metric-card`,children:[(0,H.jsx)(`div`,{className:`metric-icon ${a}`,children:(0,H.jsx)(i,{size:19})}),(0,H.jsxs)(`div`,{className:`metric-copy`,children:[(0,H.jsx)(`span`,{children:e}),(0,H.jsx)(`strong`,{children:t}),(0,H.jsxs)(`small`,{className:r===`down`?`negative`:`positive`,children:[r===`up`?(0,H.jsx)(ee,{size:13}):(0,H.jsx)(x,{size:13}),` `,n,` `,(0,H.jsx)(`em`,{children:`vs last month`})]})]})]})}function fc({label:e,value:t,status:n}){return(0,H.jsxs)(`div`,{className:`health-row`,children:[(0,H.jsxs)(`span`,{children:[(0,H.jsx)(`i`,{className:`health-dot ${n}`}),e]}),(0,H.jsx)(`strong`,{children:t})]})}function pc({name:e,sales:t,amount:n,width:r,color:i}){return(0,H.jsxs)(`div`,{className:`package-row`,children:[(0,H.jsxs)(`div`,{className:`package-top`,children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`strong`,{children:e}),(0,H.jsx)(`span`,{children:t})]}),(0,H.jsx)(`b`,{children:n})]}),(0,H.jsx)(`div`,{className:`package-bar`,children:(0,H.jsx)(`i`,{className:i,style:{width:r}})})]})}function mc(){return(0,H.jsxs)(`div`,{className:`chart`,children:[(0,H.jsxs)(`div`,{className:`chart-grid`,children:[(0,H.jsx)(`span`,{}),(0,H.jsx)(`span`,{}),(0,H.jsx)(`span`,{}),(0,H.jsx)(`span`,{})]}),(0,H.jsxs)(`svg`,{viewBox:`0 0 720 180`,preserveAspectRatio:`none`,role:`img`,"aria-label":`Revenue trend`,children:[(0,H.jsx)(`defs`,{children:(0,H.jsxs)(`linearGradient`,{id:`fill`,x1:`0`,x2:`0`,y1:`0`,y2:`1`,children:[(0,H.jsx)(`stop`,{offset:`0`,stopColor:`#d36b4d`,stopOpacity:`.24`}),(0,H.jsx)(`stop`,{offset:`1`,stopColor:`#d36b4d`,stopOpacity:`0`})]})}),(0,H.jsx)(`path`,{d:`M0 145 C40 142 46 120 83 129 S125 146 165 105 S208 98 242 113 S276 128 315 91 S350 74 390 84 S426 105 465 67 S500 78 535 55 S575 72 612 38 S650 48 720 15 L720 180 L0 180Z`,fill:`url(#fill)`}),(0,H.jsx)(`path`,{d:`M0 145 C40 142 46 120 83 129 S125 146 165 105 S208 98 242 113 S276 128 315 91 S350 74 390 84 S426 105 465 67 S500 78 535 55 S575 72 612 38 S650 48 720 15`,fill:`none`,stroke:`#d36b4d`,strokeWidth:`3`,strokeLinecap:`round`})]}),(0,H.jsxs)(`div`,{className:`chart-labels`,children:[(0,H.jsx)(`span`,{children:`Aug 01`}),(0,H.jsx)(`span`,{children:`Aug 08`}),(0,H.jsx)(`span`,{children:`Aug 15`}),(0,H.jsx)(`span`,{children:`Aug 22`}),(0,H.jsx)(`span`,{children:`Aug 31`})]})]})}(0,$e.createRoot)(document.getElementById(`root`)).render((0,H.jsx)(h.StrictMode,{children:(0,H.jsx)(tc,{})}));