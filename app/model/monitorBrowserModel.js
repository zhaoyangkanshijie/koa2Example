const monitorBrowserModel = {
    id: 0,
    browserVersion: '',
    browserVersionNumber: '',
    browserName: '',
    os: '',
    netType: '',
    language: '',
    platform: '',
    model: '',
    domain: '',
    url: '',
    title: '',
    referrer: '',
    lastModified: '',
    cookie: '',
    characterSet: '',
    screenHeight: '',
    screenWidth: '',
    colorDepth: '',
    devicePixelRatio: '',
    performance: '',
    redirectTime: '',
    redirectCount: 0,
    dnsTime: '',
    tcpTime: '',
    sslTime: '',
    requestTime: '',
    responseTime: '',
    domExplainTime: '',
    domRenderTime: '',
    resourceLoadTime: '',
    domAnalysisTime: '',
    blankTime: '',
    firstInteractiveTime: '',
    domReadyTime: '',
    loadCompleteTime: '',
    firstPaintTime: '',
    FirstContentfulPaintTime: '',
    entriesInfo: '',
    jsCount: 0,
    cssCount: 0,
    xhrCount: 0,
    imgCount: 0,
    resourceCount: 0,
    jsLoadTime: '',
    cssLoadTime: '',
    xhrLoadTime: '',
    imgLoadTime: '',
    resourceLoadTime: '',
    ip: '',
    time: new Date().getTime().toString()
}

module.exports = monitorBrowserModel;