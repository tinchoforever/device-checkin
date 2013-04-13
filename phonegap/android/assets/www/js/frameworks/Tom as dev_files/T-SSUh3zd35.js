/*1364908849,173213485*/

if (self.CavalryLogger) { CavalryLogger.start_js(["90F06"]); }

__d("AppUseTracker",["AsyncRequest","PageTransitions","Run","copyProperties"],function(a,b,c,d,e,f){var g=b('AsyncRequest'),h=b('PageTransitions'),i=b('Run'),j=b('copyProperties');function k(){if(!k.instance)k.instance=this;return k.instance;}j(k.prototype,{instance:null,endpoint:'/ajax/apps/usage_update.php',INITIAL_PING:0,ONGOING_PING:1,DISCOVERY_PING:2,ENDING_PING:3,_application_id:0,_is_game:0,_do_log_on_session_end:0,_createRequest:function(l){return new g().setURI(this.endpoint).setMethod('POST').setData({app:this._application_id,is_game:this._is_game,type:l,condition:this._signal_on_page_transition});},init:function(l,m,n,o,p,q){if(window!=window.top)return;this.cleanup();h.registerHandler(this.catchPageTransition.bind(this));this._application_id=l;this._is_game=m;this._do_log_on_session_end=q;this._timers.push(setTimeout(function(){this._createRequest(this.INITIAL_PING).send();var r=this._createRequest(this.ONGOING_PING);this._timers.push(setInterval(r.send.bind(r),o));}.bind(this),n));if(p)this._timers.push(setTimeout(function(){this._createRequest(this.DISCOVERY_PING).send();}.bind(this),p));if(this._do_log_on_session_end)i.onBeforeUnload(this.onBeforeUnload.bind(this));},catchPageTransition:function(l){if(this._do_log_on_session_end)this._createRequest(this.ENDING_PING).send();this.cleanup();},onBeforeUnload:function(){if(this._do_log_on_session_end)this._createRequest(this.ENDING_PING).setOption('asynchronous',false).send();this.cleanup();},cleanup:function(){if(this._timers)for(var l=0;l<this._timers.length;l++)clearInterval(this._timers[l]);this._timers=[];this._do_log_on_session_end=0;}});e.exports=k;});
__d("legacy:app-tracker",["AppUseTracker"],function(a,b,c,d){a.AppUseTracker=b('AppUseTracker');},3);
__d("XdArbiterBuffer",[],function(a,b,c,d,e,f){if(!a.XdArbiter)a.XdArbiter={_m:[],register:function(g){this._p=g;return (/^apps\./).test(location.hostname)?'canvas':'tab';},handleMessage:function(g){this._m.push(g);}};});
__d("CanvasIFrameLoader",["XdArbiterBuffer","$"],function(a,b,c,d,e,f){b('XdArbiterBuffer');var g=b('$'),h={loadFromForm:function(i){i.submit();}};e.exports=h;});
__d("PlatformDialog",["Arbiter","DOMEventListener"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('DOMEventListener'),i='platform/dialog/response',j={RESPONSE:i,cancel:function(k,l){h.add(k,'click',function(){window.location.assign(l);});},cancelAsync:function(k,l,m){k.subscribe('cancel',function(){g.inform(i,{identifier:l,response:m});});}};e.exports=j;});
__d("PlatformDialogClient",["Arbiter","AsyncDialog","AsyncRequest","DOMEventListener","PlatformDialog","PopupWindow","URI","guid"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('AsyncDialog'),i=b('AsyncRequest'),j=b('DOMEventListener'),k=b('PlatformDialog'),l=b('PopupWindow'),m=b('URI'),n=b('guid'),o=575;h.getLoadingDialog().enableModal().setWidth(o);j.add(window,'message',function(event){if((/\.facebook\.com$/).test(event.origin)&&(/^FB_DIALOG_RESPONSE:/).test(event.data))g.inform(k.response,JSON.parse(event.data.substr(18)));});var p={async:function(q,r,s){s=s||function(){};var t=r.state,u=n();r.state=u;r.redirect_uri=new m('/dialog/return/arbiter').setSubdomain('www').getQualifiedURI().toString();r.display='async';var v=g.subscribe(k.RESPONSE,function(event,w){if(w.state==u){g.unsubscribe(v);w.state=t;s(w);}},g.SUBSCRIBE_NEW);h.send(new i('/dialog/'+q).setData(r).setMethod('GET').setReadOnly(true));},popup:function(q,r,s){s.app_id=r;s.redirect_uri=new m('/dialog/return/arbiter').setSecure(m.getRequestURI().isSecure()).setSubdomain('www').addQueryData({relation:'opener',close:true}).toString();s.display='popup';l.open(new m('/dialog/'+q).addQueryData(s).toString(),210,o);}};e.exports=p;});
__d("CanvasNavigationFullScreen",["Arbiter","CSS","cx","Event","FullScreen"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('CSS'),i=b('cx'),j=b('Event'),k=b('FullScreen'),l=false,m={initLink:function(n,o){if(l){return;}else l=true;h.conditionClass(n,"_4-os",k.isSupported());if(k.isSupported()&&o)setTimeout(o.show.bind(o),500);j.listen(n,'click',this.setFullScreen.bind(null,true));k.subscribe('changed',function(){if(k.isFullScreen()){g.inform('canvas.enter_fullscreen');}else g.inform('canvas.exit_fullscreen');});},isSupported:function(){var n=l&&k.isSupported();return !!n;},getFullScreen:function(){return !!k.isFullScreen();},setFullScreen:function(n){var o=true;if(n){o=k.enableFullScreen(document.documentElement);}else o=k.disableFullScreen();return o;}};e.exports=m;});
__d("JSONRPC",["copyProperties","Log"],function(a,b,c,d,e,f){var g=b('copyProperties'),h=b('Log');function i(j){this._counter=0;this._callbacks={};this.remote={};this.local={};this._write=j;}g(i.prototype,{stub:function(j){this.remote[j]=function(){var k=Array.prototype.slice.call(arguments),l={jsonrpc:'2.0',method:j};if(typeof k[k.length-1]=='function'){l.id=++this._counter;this._callbacks[l.id]=k.pop();}l.params=k;this._write(JSON.stringify(l),{method:j});}.bind(this);},read:function(j,k){var l=JSON.parse(j),m=l.id;if(!l.method){if(!this._callbacks[m]){h.warn('Could not find callback %s',m);return;}var n=this._callbacks[m];delete this._callbacks[m];delete l.id;delete l.jsonrpc;n(l);return;}var o=this,p=this.local[l.method],q;if(m){q=function(t,u){var v={jsonrpc:'2.0',id:m};v[t]=u;setTimeout(function(){o._write(JSON.stringify(v),k);},0);};}else q=function(){};if(!p){h.error('Method "%s" has not been defined',l.method);q('error',{code:-32601,message:'Method not found',data:l.method});return;}l.params.push(q.bind(null,'result'));l.params.push(q.bind(null,'error'));try{var s=p.apply(k||null,l.params);if(typeof s!=='undefined')q('result',s);}catch(r){h.error('Invokation of RPC method %s resulted in the error: %s',l.method,r.message);q('error',{code:-32603,message:'Internal error',data:r.message});}}});e.exports=i;});
__d("ManagedError",[],function(a,b,c,d,e,f){function g(h,i){Error.prototype.constructor.call(this,h);this.message=h;this.innerError=i;}g.prototype=new Error();g.prototype.constructor=g;e.exports=g;});
__d("AssertionError",["ManagedError"],function(a,b,c,d,e,f){var g=b('ManagedError');function h(i){g.prototype.constructor.apply(this,arguments);}h.prototype=new g();h.prototype.constructor=h;e.exports=h;});
__d("Assert",["AssertionError","sprintf"],function(a,b,c,d,e,f){var g=b('AssertionError'),h=b('sprintf');function i(n,o){if(!n)throw new g(o);return n;}function j(n,o,p){var q;if(o===undefined){q='undefined';}else if(o===null){q='null';}else{var r=Object.prototype.toString.call(o);q=/\s(\w*)/.exec(r)[1].toLowerCase();}i(n.indexOf(q)!==-1,p||h('Expression is of type %s, not %s',q,n));return o;}function k(n,o,p){i(o instanceof n,p||'Expression not instance of type');return o;}function l(n,o){m['is'+n]=o;m['maybe'+n]=function(p,q){if(p!=null)o(p,q);};}var m={isInstanceOf:k,isTrue:i,isTruthy:function(n,o){return i(!!n,o);},type:j,define:function(n,o){n=n.substring(0,1).toUpperCase()+n.substring(1).toLowerCase();l(n,function(p,q){i(o(p),q);});}};['Array','Boolean','Date','Function','Null','Number','Object','Regexp','String','Undefined'].forEach(function(n){l(n,j.bind(null,n.toLowerCase()));});e.exports=m;});
__d("URL",["Assert","copyProperties","QueryString","Log"],function(a,b,c,d,e,f){var g=b('Assert'),h=b('copyProperties'),i=b('QueryString'),j=b('Log'),k=new RegExp('('+'(((\\w+):)?//)'+'(.*?@)?'+'([^~/?#:]+)'+'(:(\\d+))?'+')?'+'([^\\?$#]+)?'+'(\\?([^$#]+))?'+'(#([^$]+))?'),l=/[\0\\]/,m=/[^\w\-\.,;\/?:@=&%#$~+!*'\[\]()]+/g,n=/^[a-z0-9.][a-z0-9\-\.]+[a-z0-9.]$/,o=/\.facebook\.com$/;function p(q){g.isString(q,'The passed argument was of invalid type.');if(l.test(q))throw new URIError('The passed argument could not be parsed as a url.');if(this instanceof p===false)return new p(q);var r=q.replace(m,function(t){j.warn('Escaping unescaped character \\x%s from "%s"',t.charCodeAt(0).toString(16),q);return encodeURIComponent(t);}).match(k);if(!q||!r)throw new URIError('The passed argument could not be parsed as a url.');var s=!!location.hostname;this.setProtocol(r[4]||(s?location.protocol.replace(/:/,''):''));this.setDomain(r[6]||location.hostname);this.setPort(r[8]||(s&&!r[6]?location.port:''));this.setPath(r[9]||'');this.setSearch(r[11]||'');this.setFragment(r[13]||'');if(this._path.substring(0,1)!='/')this._path='/'+this._path;if(this._domain&&!n.test(decodeURIComponent(this._domain.toLowerCase()))){j.error('Invalid characters found in domain name: %s',this._domain);throw new URIError('Domain contained invalid characters.');}}h(p.prototype,{constructor:p,getProtocol:function(){return this._protocol;},setProtocol:function(q){this._protocol=q;return this;},getDomain:function(){return this._domain;},setDomain:function(q){this._domain=q;return this;},getPort:function(){return this._port;},setPort:function(q){this._port=q;return this;},getPath:function(){return this._path;},setPath:function(q){this._path=q;return this;},getSearch:function(){return this._search;},setSearch:function(q){this._search=q;return this;},getFragment:function(){return this._fragment;},setFragment:function(q){this._fragment=q;return this;},getParsedSearch:function(){return i.decode(this._search);},getParsedFragment:function(){return i.decode(this._fragment);},isFacebookURL:function(){return o.test(this._domain);},toString:function(){return (this._protocol?this._protocol+':':'')+(this._domain?'//'+this._domain:'')+(this._port?':'+this._port:'')+this._path+(this._search?'?'+this._search:'')+(this._fragment?'#'+this._fragment:'');},valueOf:function(){return this.toString();}});h(p,{getCurrent:function(){return new p(location.href);},getReferrer:function(){return document.referrer?new p(document.referrer):null;}});e.exports=p;});
__d("Queue",["copyProperties"],function(a,b,c,d,e,f){var g=b('copyProperties'),h={};function i(j){this._opts=g({interval:0,processor:null},j);this._queue=[];this._stopped=true;}g(i.prototype,{_dispatch:function(j){if(this._stopped||this._queue.length===0)return;if(!this._opts.processor){this._stopped=true;throw new Error('No processor available');}if(this._opts.interval){this._opts.processor.call(this,this._queue.shift());this._timeout=setTimeout(this._dispatch.bind(this),this._opts.interval);}else while(this._queue.length)this._opts.processor.call(this,this._queue.shift());},enqueue:function(j){if(this._opts.processor&&!this._stopped){this._opts.processor.call(this,j);}else this._queue.push(j);return this;},start:function(j){if(j)this._opts.processor=j;this._stopped=false;this._dispatch();return this;},dispatch:function(){this._dispatch(true);},stop:function(j){this._stopped=true;if(j)clearTimeout(this._timeout);return this;},merge:function(j,k){this._queue[k?'unshift':'push'].apply(this._queue,j._queue);j._queue=[];this._dispatch();return this;},getLength:function(){return this._queue.length;}});g(i,{get:function(j,k){var l;if(j in h){l=h[j];}else l=h[j]=new i(k);return l;},exists:function(j){return j in h;},remove:function(j){return delete h[j];}});e.exports=i;});
__d("XdArbiter",["Arbiter","QueryString","Queue"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('QueryString'),i=b('Queue'),j=/^apps\./.test(location.hostname)?'canvas':'tab',k={},l=[],m=new i(),n={setRpcHandler:function(p){m.start(p);},handleMessage:function(p,q){try{if(typeof p=='string'){if(/^FB_RPC:/.test(p)){m.enqueue([p.substring(7),{origin:q}]);return;}p=JSON.parse(p);}if(!p.method)return;if(typeof p.params=='string')p.params=JSON.parse(p.params);g.inform('Connect.Unsafe.'+p.method,p.params,g.BEHAVIOR_PERSISTENT);}catch(r){}},register:function(p,q){var r=q||j;k[r]=p;g.inform('XdArbiter.register',r,g.BEHAVIOR_PERSISTENT);this.scheduleDispatch();return r;},scheduleDispatch:function(){var p=this,q=42;function r(){var s=l.shift();if(s)p.send.apply(p,s);if(l.length)setTimeout(r,q);}setTimeout(r,q);},hasProxy:function(p){var q=p||j;return !!k[q];},send:function(p,q,r){var s=q||j;if(!k[s]){l.push([s,p,r]);return false;}if(typeof p!=='string')p=h.encode(p);k[s].proxyMessage(p,r);return true;}},o=a.XdArbiter;a.XdArbiter=n;if(o&&o._m.length){n.register(o._p);while(o._m.length)n.handleMessage(o._m.shift());}e.exports=n;});
__d("PlatformAppController",["Arbiter","AsyncRequest","Bootloader","CanvasNavigationFullScreen","CSS","Dialog","JSONRPC","PlatformDialogClient","URI","URL","Style","Vector","XdArbiter","ge"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('AsyncRequest'),i=b('Bootloader'),j=b('CanvasNavigationFullScreen'),k=b('CSS'),l=b('Dialog'),m=b('JSONRPC'),n=b('PlatformDialogClient'),o=b('URI'),p=b('URL'),q=b('Style'),r=b('Vector'),s=b('XdArbiter'),t=b('ge'),u={test_flow:true},v,w=true,x=0,y=false,z,aa=false,ba=window._cstart,ca=0,da,ea={},fa=new m(function(qa){s.send('FB_RPC:'+qa);});function ga(qa){var ra=parseInt(qa.x,10),sa=parseInt(qa.y,10);if(ra>=0&&sa>=0)window.scrollTo(ra,sa);}function ha(qa){var ra=t(qa.frame.replace(/_fb_https$/,''));if(ra){k.addClass(ra,'noresize');ra.style.height=qa.height+'px';}}function ia(){var qa=v,ra=0,sa=0;while(qa){ra+=parseInt(qa.offsetLeft,10);sa+=parseInt(qa.offsetTop,10);qa=qa.offsetParent;}var ta=r.getViewportDimensions(),ua=r.getScrollPosition();return {clientWidth:ta.x,clientHeight:ta.y,scrollLeft:ua.x,scrollTop:ua.y,offsetLeft:ra,offsetTop:sa};}function ja(qa,ra,sa){if(u[qa.method]){n.async(qa.method,qa,ra);return;}var ta;if(qa.method=='permissions.oauth'||qa.method=='permissions.request'||qa.method=='oauth'){if(da&&da.useSwissGDP){n.async('oauth',qa,ra);return;}qa.method='permissions.request';ta='/connect/uiserver.php';if(qa.scope){qa.perms=qa.scope;delete qa.scope;}}else{if(!qa.method.match(/^[\w\-.]+$/))throw new Error('Malformed method name');ta='/fbml/ajax/dialog/'+qa.method.replace(/\./g,'_');delete qa.method;}delete qa.access_token;delete qa.next;if(!qa.redirect_uri||p(qa.redirect_uri).getDomain().toLowerCase()!==p(this.origin).getDomain().toLowerCase())qa.redirect_uri=this.origin;var ua=new h().setMethod('GET').setReadOnly(true).setURI(o(ta).setQueryData(qa));new l().setAsync(ua).setModal(true).setWideDialog(true).show().setCloseHandler(function(va){ra(va);});}function ka(qa){y=qa;}function la(qa,ra){aa=qa;z=ra;}fa.stub('navigate');function ma(qa){if(y){fa.remote.navigate(qa);return true;}return false;}fa.stub('enterFullScreen');g.subscribe('canvas.enter_fullscreen',fa.remote.enterFullScreen);fa.stub('exitFullScreen');g.subscribe('canvas.exit_fullscreen',fa.remote.exitFullScreen);function na(qa){var ra=qa.time-ba+ca;switch(qa.name){case 'StopIframeAppTtiTimer':ca=ra;return {time_delta_ms:ra,type:"tti"};case 'StartIframeAppTtiTimer':ba=qa.time;break;case 'RecordIframeAppTti':if(aa)i.loadModules(['CanvasIFrameLogger'],function(sa){sa.log(ra,qa.appId,z);});return {time_delta_ms:ra,type:"tti"};}}fa.local.setSize=ha;fa.local.getPageInfo=ia;fa.local.scrollTo=ga;fa.local.showDialog=ja;fa.local.setNavigationEnabled=ka;fa.local.isFullScreenSupported=j.isSupported;fa.local.getFullScreen=j.getFullScreen;fa.local.logTtiMessage=na;s.setRpcHandler(function(qa){fa.read.apply(fa,qa);});fa.stub('hideFlashObjects');g.subscribe('layer_shown',function(){if(++x===1)if(w){fa.remote.hideFlashObjects();}else q.set(t('pagelet_canvas_content'),'visibility','hidden');});fa.stub('showFlashObjects');g.subscribe('layer_hidden',function(){if(--x===0){if(w){fa.remote.showFlashObjects();}else q.set(t('pagelet_canvas_content'),'visibility','');}else if(x<0)x=0;});function oa(qa){ea[qa.name]=qa;var ra=t(qa.name);if(ra)v=ra;}var pa={setActiveIframe:function(qa){v=qa;},setInformAppOnLayerChange:function(qa){w=qa;},setNavigationEnabled:ka,setTtiEnabled:la,handleNavigation:ma,init:oa,getFrameParams:function(qa){return ea[qa];},setConfig:function(qa){da=qa;}};a.PlatformAppController=pa;e.exports=pa;});
__d("DisablePlatformButton",["ge","CSS","Event"],function(a,b,c,d,e,f){var g=b('ge'),h=b('CSS'),i=b('Event'),j=false,k={init:function(l){for(var m=0;m<l.length;m++){var n=g(l[m]);i.listen(n,'click',function(o){if(j){return false;}else{j=true;for(var p=0;p<l.length;p++)h.addClass(l[p],'uiButtonDisabled');}});}}};e.exports=k;});
__d("legacy:xd-arbiter",["XdArbiter"],function(a,b,c,d){b('XdArbiter');},3);