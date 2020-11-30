const monitorStayModel = {
    id: 0,
    requestMethod: '',//请求方法，如"POST"，变长字符串50
    requestOriginalUrl: 0,//请求地址，如"/api/monitor/event"，变长字符串200
    requestContent: '',//请求内容，如"{}"，变长字符串500
    responseTime: '',//请求响应时间，如"951.755000045523"，变长字符串50
    responseStatus: '',//响应状态，如"200"，变长字符串50
    responseContent: '',//响应内容，如"{"a":1}"，变长字符串500
    ip: '',//ip地址(请求主体或请求头(代理:'x-forwarded-for'/'x-real-ip')获取)，变长字符串50
    time: new Date().getTime().toString()//当前时间，如"2020-11-20 17:45:48"，变长字符串50/datetime2(7)
    //可记录其它信息:账号、备用字段
}

module.exports = monitorStayModel;