const monitorBrowserModel = {
    id: 0,
    userAgent: '',//用户信息，如"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36"，变长字符串200
    browserVersion: '',//浏览器版本(通过用户信息识别)，如"76.0.3809.132"，变长字符串50
    browserVersionNumber: '',//浏览器版本号(通过用户信息识别)，如"76"，变长字符串50
    browserName: '',//浏览器名称(通过用户信息识别)，如"chrome"，变长字符串50
    os: '',//操作系统(通过用户信息识别)，如"windows nt 10.0"表示win10，变长字符串50
    netType: '',//网络(通过用户信息识别)，如"4g"，变长字符串50
    language: '',//语言环境(通过用户信息识别)，如"ch-zn"表示中文，变长字符串50
    platform: '',//平台(通过用户信息识别)，如"win64"表示windows 64位，变长字符串50
    model: '',//模型(通过用户信息识别)，如"chrome"、"android"，变长字符串50
    domain: '',//域名(通过网页属性获取)，如"www.baidu.com"，变长字符串50
    url: '',//网址(通过网页属性获取)，如"www.baidu.com"，变长字符串200
    title: '',//网页名称(通过网页属性获取)，如"百度"，变长字符串50
    referrer: '',//网页来源(通过网页属性获取)，如"www.baidu.com"，变长字符串200
    lastModified: '',//最后更改时间(通过网页属性获取)，如"2020-11-20 17:45:48"，变长字符串50
    cookie: '',//用户数据(通过网页属性获取)，如"test=Hello%20World"，变长字符串2000
    characterSet: '',//字符编码(通过网页属性获取)，如"UTF-8"，变长字符串50
    screenHeight: '',//屏幕高度(通过屏幕属性获取)，如"1080"，变长字符串50
    screenWidth: '',//屏幕宽度(通过屏幕属性获取)，如"1920"，变长字符串50
    colorDepth: '',//色位深度(通过屏幕属性获取)，如"24"，变长字符串50
    devicePixelRatio: '',//屏幕像素比(通过屏幕属性获取)，如"1"，变长字符串50
    performance: '',//网页性能信息对象(通过屏幕属性获取)，如"Performance {timeOrigin: 1606707947031.5896, onresourcetimingbufferfull: null, memory: MemoryInfo, navigation: PerformanceNavigation, timing: PerformanceTiming}"，变长字符串2000
    redirectTime: '',//重定向时间(通过性能信息获取，重定向结束-重定向开始)，如"951.755000045523"，变长字符串50
    redirectCount: 0,//重定向次数(通过性能信息获取)，如"1"，变长字符串50
    dnsTime: '',//域名解析时间(通过性能信息获取，域名查询结束-域名查询开始)，如"951.755000045523"，变长字符串50
    tcpTime: '',//传输控制(三次握手)时间(通过性能信息获取，连接结束-连接开始)，如"951.755000045523"，变长字符串50
    sslTime: '',//安全连接时间(通过性能信息获取，连接结束-安全连接开始)，如"951.755000045523"，变长字符串50
    requestTime: '',//请求时间(通过性能信息获取，响应开始-连接开始)，如"951.755000045523"，变长字符串50
    responseTime: '',//响应时间(通过性能信息获取，响应结束-响应开始)，如"951.755000045523"，变长字符串50
    domExplainTime: '',//网页解析时间(通过性能信息获取，文档可交互-响应结束)，如"951.755000045523"，变长字符串50
    domRenderTime: '',//网页渲染时间(通过性能信息获取，文档内容加载完毕时间结束-导航开始)，如"951.755000045523"，变长字符串50
    resourceLoadTime: '',//网页资源加载时间(通过性能信息获取，加载事件开始-文档内容加载完毕时间结束)，如"951.755000045523"，变长字符串50
    domAnalysisTime: '',//网页解析时间2(通过性能信息获取，文档完成-文档可交互)，如"951.755000045523"，变长字符串50
    blankTime: '',//网页白屏时间(通过性能信息获取，文档可交互/文档加载中/响应结束-请求开始)，如"951.755000045523"，变长字符串50
    firstInteractiveTime: '',//网页首次可交互时间(通过性能信息获取，文档可交互-请求开始)，如"951.755000045523"，变长字符串50
    domReadyTime: '',//网页预备时间(通过性能信息获取，文档内容加载完毕时间结束-请求开始)，如"951.755000045523"，变长字符串50
    loadCompleteTime: '',//网页加载完成时间(通过性能信息获取，文档完成-请求开始)，如"951.755000045523"，变长字符串50
    firstPaintTime: '',//网页首次绘制时间(通过性能绘制信息获取)，如"951.755000045523"，变长字符串50
    FirstContentfulPaintTime: '',//网页首次绘制完成时间(通过性能绘制信息获取)，如"951.755000045523"，变长字符串50
    entriesInfo: '',//网页文件信息(通过性能文件信息获取)，如"(8) [PerformanceNavigationTiming, PerformanceResourceTiming, PerformanceResourceTiming, PerformanceResourceTiming, PerformanceResourceTiming, PerformancePaintTiming, PerformancePaintTiming, PerformanceEventTiming]"，变长字符串2000
    jsCount: 0,//脚本文件数量(通过性能文件信息获取)，如"1"，变长字符串50
    cssCount: 0,//样式文件数量(通过性能文件信息获取)，如"1"，变长字符串50
    xhrCount: 0,//请求数量(通过性能文件信息获取)，如"1"，变长字符串50
    imgCount: 0,//图片文件数量(通过性能文件信息获取)，如"1"，变长字符串50
    resourceCount: 0,//所有资源文件数量(通过性能文件信息获取)，如"1"，变长字符串50
    jsLoadTime: '',//脚本加载时间(通过性能文件信息获取最大响应时间差)，如"951.755000045523"，变长字符串50
    cssLoadTime: '',//样式加载时间(通过性能文件信息获取最大响应时间差)，如"951.755000045523"，变长字符串50
    xhrLoadTime: '',//请求时间(通过性能文件信息获取最大响应时间差)，如"951.755000045523"，变长字符串50
    imgLoadTime: '',//图片加载时间(通过性能文件信息获取最大响应时间差)，如"951.755000045523"，变长字符串50
    ip: '',//ip地址(请求主体或请求头(代理:'x-forwarded-for'/'x-real-ip')获取)，变长字符串50
    time: new Date().getTime().toString()//当前时间，如"2020-11-20 17:45:48"，变长字符串50/datetime2(7)
    //可记录其它信息:账号、备用字段、删除标识
}

module.exports = monitorBrowserModel;