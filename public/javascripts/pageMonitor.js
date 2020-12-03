class browserMonitor{
    constructor(){
        this.startTime = new Date().getTime();
        this.stayTime = 0;
        this.stayInPage = true;
        this.addHistoryEvent();
        this.clickEvent();
        this.copyEvent();
        this.unloadEvent();
        this.hashchangeEvent();
        this.popstateEvent();
        this.pushStateEvent();
        this.replaceStateEvent();
        this.visibilitychangeEvent();
        this.elementErrorEvent();
        this.windowErrorEvent();
        this.promiseErrorEvent();
        this.getBrowserInfo().then((value)=>{
            navigator.sendBeacon('/api/monitor/browser', JSON.stringify(value));
        });
    }
    sendXHR(url,data,async){
        var params = new URLSearchParams();
        for(let key in data){
            params.set(key,JSON.stringify(data[key]));
        }
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, async);// 第三个参数false表示同步发送
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
        xhr.onload = (response) => {
          console.log(response);
        }
        xhr.onerror = (error) => {
          console.log(error);
        }
    }
    //sendSeacon 415 替代方案
    sendBlob(url,data){
        var params = new URLSearchParams();
        for(let key in data){
            params.set(key,JSON.stringify(data[key]));
        }
        var headers = {
            type: 'application/x-www-form-urlencoded'
        };
        var blob = new Blob([params], headers);
        console.log(blob)
        navigator.sendBeacon(url, blob);
    }
    addHistoryEvent(){
        let historyEvent = function(type) {
            let origin = history[type];
            return function() {
                let result = origin.apply(this, arguments);
                let event = new Event(type);
                event.arguments = arguments;
                window.dispatchEvent(event);
                return result;
            };
        };
        history.pushState = historyEvent('pushState');
        history.replaceState = historyEvent('replaceState');
    }
    getBrowserInfo(ua){
        // If an UA is not provided, default to the current browser UA.
        if (ua === undefined) {
            ua = window.navigator.userAgent;
        }
        ua = ua.toLowerCase();
    
        let browser_match = /(edge)[\/]([\w.]+)/.exec(ua) ||
            /(opr)[\/]([\w.]+)/.exec(ua) ||
            /(qqbrowser)[\/]([\w.]+)/.exec(ua) ||
            /(lbbrowser)[\/]([\w.]+)/.exec(ua) ||
            /(metasr)[ ]([\w.]+)/.exec(ua) ||
            /(2345explorer)[\/]([\w.]+)/.exec(ua) ||
            /(theworld)[ ]([\w.]+)/.exec(ua) ||
            /(maxthon)[\/]([\w.]+)/.exec(ua) ||
            /(bidubrowser)[\/]([\w.]+)/.exec(ua) ||
            /(ubrowser)[\/]([\w.]+)/.exec(ua) ||
            /(ucbrowser)[\/]([\w.]+)/.exec(ua) ||
            /(micromessenger)[\/]([\w.]+)/.exec(ua) ||
            /(firefox)[\/]([\w.]+)/.exec(ua) ||
            /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(iemobile)[\/]([\w.]+)/.exec(ua) ||
            /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];
    
        let platform_match = /(ipad)/.exec(ua) ||
            /(ipod)/.exec(ua) ||
            /(windows phone)/.exec(ua) ||
            /(iphone)/.exec(ua) ||
            /(kindle)/.exec(ua) ||
            /(silk)/.exec(ua) ||
            /(android)/.exec(ua) ||
            /(win)/.exec(ua) ||
            /(mac)/.exec(ua) ||
            /(linux)/.exec(ua) ||
            /(cros)/.exec(ua) ||
            /(playbook)/.exec(ua) ||
            /(bb)/.exec(ua) ||
            /(blackberry)/.exec(ua) ||
            [];
    
        let os_match = /(windows nt)[ ]([\w.]+)/.exec(ua) ||
            /(windows me)/.exec(ua) ||
            /(windows 98)/.exec(ua) ||
            /(android )([\w.]+)/.exec(ua) ||
            /(linux ppc64)/.exec(ua) ||
            /(linux ppc)/.exec(ua) ||
            /(linux i686)/.exec(ua) ||
            /(linux x86_64)/.exec(ua) ||
            /(ipad).*os ([\w.]+ )/.exec(ua) ||
            /(ipod).*os ([\w.]+ )/.exec(ua) ||
            /(iphone).*os ([\w.]+ )/.exec(ua) ||
            /(ppc mac os x )([\w.]+)/.exec(ua) ||
            /(intel mac os x )([\w.]+)/.exec(ua) ||
            /(freebsd)/.exec(ua) ||
            /(sunos i86pc)/.exec(ua) ||
            /(sunos sun4u)/.exec(ua) ||
            /(windows phone)(\sos)?([\s\w.]+)/.exec(ua) ||
            /(kindle)/.exec(ua) ||
            /(silk)/.exec(ua) ||
            /(cros)/.exec(ua) ||
            /(playbook)/.exec(ua) ||
            /(bb)/.exec(ua) ||
            /(blackberry)/.exec(ua) ||
            [];
    
        let net_match = /(nettype)[\/]([\w.]+)/.exec(ua) || [];
    
        let language_match = /(language)[\/]([\w.]+)/.exec(ua) ||
            /(zh-cn)/.exec(ua) ||
            /(zh-tw)/.exec(ua) ||
            /(zh-hk)/.exec(ua) ||
            /(en-us)/.exec(ua) ||
            /(\w\w-\w\w)/.exec(ua) ||
            [];
    
        let model_match = /(build)[\/]([\w.]+)/.exec(ua) ||
            /(ipad)/.exec(ua) ||
            /(ipod)/.exec(ua) ||
            /(iphone)/.exec(ua) ||
            /(huawei)/.exec(ua) ||
            /(vivo)/.exec(ua) ||
            /(oppo)/.exec(ua) ||
            /(samsung)/.exec(ua) ||
            /(sony)/.exec(ua) ||
            /(nokia)/.exec(ua) ||
            /(htc)/.exec(ua) ||
            /(zte)/.exec(ua) ||
            /(lenovo)/.exec(ua) ||
            [];
    
        let matched = {
            browser: browser_match[5] || browser_match[3] || browser_match[1] || "unknown",
            version: browser_match[2] || browser_match[4] || "0",
            versionNumber: browser_match[4] || browser_match[2] || "0",
            platform: platform_match[0] || "unknown",
            os: os_match[0] || "unknown",
            netType: net_match[0] || window.navigator.connection.effectiveType || "unknown",
            language: language_match[0] || "unknown",
            model: model_match[2] || model_match[0] || "unknown"
        };
    
        let browser = {};
        browser[matched.browser] = true;
        browser.browserVersion = matched.version;
        browser.browserVersionNumber = matched.versionNumber;
        browser.browserName = matched.browser;
        browser.os = matched.os;
        browser.netType = matched.netType;
        browser.language = matched.language;
        browser.platform = matched.platform;
        browser.model = matched.model;
        browser.domain = document.domain || ''; // 域名
        browser.url = document.URL || ''; // 当前 URL 地址
        browser.title = document.title || ''; // 当前页面标题
        browser.referrer = document.referrer || ''; // 上一个访问页面 URL 地址
        browser.lastModified = document.lastModified || ''; 
        browser.cookie = document.cookie;
        browser.characterSet = document.characterSet;
        browser.screenHeight = window.screen.height || 0; // 屏幕高度
        browser.screenWidth = window.screen.width || 0; // 屏幕宽度
        browser.colorDepth = window.screen.colorDepth || 0; // 屏幕颜色深度
        browser.devicePixelRatio = window.devicePixelRatio;
    
        if (matched.platform) {
            browser[matched.platform] = true;
        }
    
        // These are all considered mobile platforms, meaning they run a mobile browser
        if (browser.android || browser.bb || browser.blackberry || browser.ipad || browser.iphone ||
            browser.ipod || browser.kindle || browser.playbook || browser.silk || browser["windows phone"]) {
            browser.type = "mobile";
        }
    
        // These are all considered desktop platforms, meaning they run a desktop browser
        if (browser.cros || browser.mac || browser.linux || browser.win) {
            browser.type = "pc";
            browser.model = matched.browser;
        }
    
        // Chrome, Opera 15+ and Safari are webkit based browsers
        if (browser.chrome || browser.opr || browser.safari) {
            browser.webkit = true;
            let desc = navigator.mimeTypes['application/x-shockwave-flash'];
            if (desc) {
                browser.browserName = "360";
            }
        }
    
        // IE11 has a new token so we will assign it msie to avoid breaking changes
        if (browser.rv || browser.iemobile) {
            let ie = "msie";
    
            matched.browser = ie;
            browser[ie] = true;
        }
    
        // Edge is officially known as Microsoft Edge, so rewrite the key to match
        if (browser.edge) {
            delete browser.edge;
            let msedge = "msedge";
    
            matched.browser = msedge;
            browser[msedge] = true;
        }
    
        // Blackberry browsers are marked as Safari on BlackBerry
        if (browser.safari && browser.blackberry) {
            let blackberry = "blackberry";
    
            matched.browser = blackberry;
            browser[blackberry] = true;
        }
    
        // Playbook browsers are marked as Safari on Playbook
        if (browser.safari && browser.playbook) {
            let playbook = "playbook";
    
            matched.browser = playbook;
            browser[playbook] = true;
        }
    
        // BB10 is a newer OS version of BlackBerry
        if (browser.bb) {
            let bb = "blackberry";
    
            matched.browser = bb;
            browser[bb] = true;
        }
    
        // Opera 15+ are identified as opr
        if (browser.opr) {
            let opera = "opera";
    
            matched.browser = opera;
            browser[opera] = true;
        }
    
        // Stock Android browsers are marked as Safari on Android.
        if (browser.safari && browser.android) {
            let android = "android";
    
            matched.browser = android;
            browser[android] = true;
        }
    
        // Kindle browsers are marked as Safari on Kindle
        if (browser.safari && browser.kindle) {
            let kindle = "kindle";
    
            matched.browser = kindle;
            browser[kindle] = true;
        }
    
        // Kindle Silk browsers are marked as Safari on Kindle
        if (browser.safari && browser.silk) {
            let silk = "silk";
    
            matched.browser = silk;
            browser[silk] = true;
        }
    
    
        return new Promise((resolve,reject)=>{
            let tryTimes = 0;
            let timer = setInterval(()=> {
                if(window.performance.getEntriesByType('paint').length == 0 && tryTimes < 10){
                    tryTimes++;
                }
                else{
                    browser.performance = window.performance; // 性能表现
                    browser.redirectTime = window.performance.timing.redirectEnd - window.performance.timing.redirectStart;
                    browser.redirectCount = window.performance.navigation.redirectCount;
                    browser.dnsTime = window.performance.timing.domainLookupEnd - window.performance.timing.domainLookupStart;
                    browser.tcpTime = window.performance.timing.connectEnd - window.performance.timing.connectStart;
                    browser.sslTime = window.performance.timing.connectEnd - window.performance.timing.secureConnectionStart;
                    browser.requestTime = window.performance.timing.responseStart - window.performance.timing.requestStart;
                    browser.responseTime = window.performance.timing.responseEnd - window.performance.timing.responseStart;
                    browser.domExplainTime = window.performance.timing.domInteractive - window.performance.timing.responseEnd;
                    browser.domRenderTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
                    browser.resourceLoadTime = window.performance.timing.loadEventStart - window.performance.timing.domContentLoadedEventEnd;
                    browser.domAnalysisTime = window.performance.timing.domComplete - window.performance.timing.domInteractive;
                    browser.blankTime = (window.performance.timing.domInteractive || window.performance.timing.domLoading || window.performance.timing.responseEnd) - window.performance.timing.fetchStart;
                    browser.firstInteractiveTime = window.performance.timing.domInteractive - window.performance.timing.fetchStart;
                    browser.domReadyTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.fetchStart;
                    browser.loadCompleteTime = window.performance.timing.loadEventEnd - window.performance.timing.fetchStart;
                    browser.firstPaintTime = window.performance.getEntriesByType('paint').length > 0 ? (window.performance.getEntriesByType('paint')[0].startTime || window.performance.timing.responseStart - window.performance.timing.navigationStart) : window.performance.timing.responseStart - window.performance.timing.navigationStart;
                    browser.firstContentfulPaintTime = window.performance.getEntriesByType('paint').length > 1 ? (window.performance.getEntriesByType('paint')[1].startTime || '') : '';
                    let page = window.performance.getEntries();
                    let js = page.filter(ele => ele.initiatorType === "script");
                    let css = page.filter(ele => ele.initiatorType === "css");
                    let xhr = page.filter(ele => ele.initiatorType === "xmlhttprequest");
                    let img = page.filter(ele => ele.initiatorType === "img");
                    let resource = page.filter(ele => ele.initiatorType === "resource");
                    browser.entriesInfo = page;
                    browser.jsCount = js.length;
                    browser.cssCount = css.length;
                    browser.xhrCount = xhr.length;
                    browser.imgCount = img.length;
                    browser.resourceCount = resource.length;
                    browser.jsLoadTime = Math.max(...js.map((ele) => ele.responseEnd)) - Math.min(...js.map((ele) => ele.startTime));
                    browser.cssLoadTime = Math.max(...css.map((ele) => ele.responseEnd)) - Math.min(...css.map((ele) => ele.startTime));
                    browser.xhrLoadTime = Math.max(...xhr.map((ele) => ele.responseEnd)) - Math.min(...xhr.map((ele) => ele.startTime));
                    browser.imgLoadTime = Math.max(...img.map((ele) => ele.responseEnd)) - Math.min(...img.map((ele) => ele.startTime));
                    browser.resourceLoadTime = Math.max(...resource.map((ele) => ele.responseEnd)) - Math.min(...resource.map((ele) => ele.startTime));
    
                    clearInterval(timer);
                    resolve(browser);
                }
            },1000);
        });
    }
    clickEvent(){
        document.addEventListener("click",(event)=>{
            navigator.sendBeacon('/api/monitor/event', JSON.stringify({
                url: document.URL,
                eventType: event.type,
                happenTime: event.timeStamp,
                target: event.target.nodeName,
                content: event.target.innerHTML.slice(0,100).trim()
            }));
        },false);
    }
    copyEvent(){
        document.addEventListener("copy",(event)=>{
            navigator.sendBeacon('/api/monitor/event', JSON.stringify({
                url: document.URL,
                eventType: event.type,
                happenTime: event.timeStamp,
                target: event.target.nodeName,
                content: window.getSelection().toString()
            }));
        },false);
    }
    unloadEvent(){
        window.addEventListener('unload', () => {
            navigator.sendBeacon('/api/monitor/event', JSON.stringify({
                url: document.URL,
                eventType: event.type,
                happenTime: event.timeStamp,
                target: '',
                content: ''
            }));
            navigator.sendBeacon('/api/monitor/stay', JSON.stringify({
                url: document.URL,
                stayTime: this.stayTime + (new Date().getTime() - this.startTime)
            }));
        }, false);
    }
    hashchangeEvent(){
        window.addEventListener("hashchange",(event)=>{
            console.log("hashchange");
            navigator.sendBeacon('/api/monitor/event', JSON.stringify({
                url: document.URL,
                eventType: event.type,
                happenTime: event.timeStamp,
                target: '',
                content: ''
            }));
            navigator.sendBeacon('/api/monitor/stay', JSON.stringify({
                url: document.URL,
                stayTime: this.stayTime + (new Date().getTime() - this.startTime)
            }));
            this.startTime = new Date().getTime();
            this.stayTime = 0;
            this.stayInPage = true;
        });
    }
    popstateEvent(){
        window.addEventListener("popstate",(event)=>{
            console.log("popstate");
            navigator.sendBeacon('/api/monitor/event', JSON.stringify({
                url: document.URL,
                eventType: event.type,
                happenTime: event.timeStamp,
                target: '',
                content: ''
            }));
            navigator.sendBeacon('/api/monitor/stay', JSON.stringify({
                url: document.URL,
                stayTime: this.stayTime + (new Date().getTime() - this.startTime)
            }));
            this.startTime = new Date().getTime();
            this.stayTime = 0;
            this.stayInPage = true;
        });
    }
    pushStateEvent(){
        window.addEventListener("pushState",(event)=>{
            console.log("pushState");
            navigator.sendBeacon('/api/monitor/event', JSON.stringify({
                url: document.URL,
                eventType: event.type,
                happenTime: event.timeStamp,
                target: '',
                content: ''
            }));
            navigator.sendBeacon('/api/monitor/stay', JSON.stringify({
                url: document.URL,
                stayTime: this.stayTime + (new Date().getTime() - this.startTime)
            }));
            this.startTime = new Date().getTime();
            this.stayTime = 0;
            this.stayInPage = true;
        });
    }
    replaceStateEvent(){
        window.addEventListener("replaceState",(event)=>{
            console.log("replaceState");
            navigator.sendBeacon('/api/monitor/event', JSON.stringify({
                url: document.URL,
                eventType: event.type,
                happenTime: event.timeStamp,
                target: '',
                content: ''
            }));
            navigator.sendBeacon('/api/monitor/stay', JSON.stringify({
                url: document.URL,
                stayTime: this.stayTime + (new Date().getTime() - this.startTime)
            }));
            this.startTime = new Date().getTime();
            this.stayTime = 0;
            this.stayInPage = true;
        });
    }
    visibilitychangeEvent(){
        document.addEventListener('visibilitychange', (e)=>{
            console.log(e)
            navigator.sendBeacon('/api/monitor/event', JSON.stringify({
                url: document.URL,
                eventType: event.type,
                happenTime: event.timeStamp,
                target: '',
                content: ''
            }));
            let now = new Date().getTime();
            if(this.stayInPage){
                this.stayTime += now - this.startTime;
                this.stayInPage = !this.stayInPage;
                //console.log(now,this.startTime,this.stayTime,this.stayInPage,now - this.startTime)
            }
            else{
                this.startTime = now;
                this.stayInPage = !this.stayInPage;
                //console.log(now,this.startTime,this.stayTime,this.stayInPage)
            }
        })
    }
    elementErrorEvent(){
        document.addEventListener('error', (e) => {
            const target = e.target
            if (target != window) {
                navigator.sendBeacon('/api/monitor/error', JSON.stringify({
                    url: document.URL,
                    type: target.localName,
                    row: -1,
                    col: -1,
                    source: target.src || target.href,
                    msg: (target.src || target.href) + ' is load error',
                    time: new Date().getTime()
                }));
            }
        }, true)
    }
    windowErrorEvent(){
        window.onerror = (msg, url, row, col, error)=>{
            navigator.sendBeacon('/api/monitor/error', JSON.stringify({
                url: document.URL,
                type: 'javascript',
                row: row,
                col: col,
                source: url,
                msg: error && error.stack? error.stack : msg,
                time: new Date().getTime()
            }));
        }
    }
    promiseErrorEvent(){
        document.addEventListener('unhandledrejection', (e) => {
            navigator.sendBeacon('/api/monitor/error', JSON.stringify({
                url: document.URL,
                type: 'promise',
                row: -1,
                col: -1,
                source: '',
                msg: (e.reason && e.reason.msg) || e.reason || '',
                time: new Date().getTime()
            }));
        })
    }
}
window.onload = () => {
    console.log('onload')
    new browserMonitor();
}
