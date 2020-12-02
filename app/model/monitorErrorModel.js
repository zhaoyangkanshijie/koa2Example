const monitorErrorModel = {
    id: 0,
    url: '',//错误地址，如"www.baidu.com"，变长字符串200
    type: '',//错误类型，如"javascript"，变长字符串50
    row: -1,//错误行，如"1"，变长字符串50
    col: -1,//错误列，如"1"，变长字符串50
    source: '',//错误来源，如"http://localhost:3000/javascripts/pageMonitor.js"，变长字符串200
    msg: '',//错误信息，如"ReferenceError: brpwser is not defined"，变长字符串2000
    ip: '',//ip地址(请求主体或请求头(代理:'x-forwarded-for'/'x-real-ip')获取)，变长字符串50
    time: new Date().getTime().toString()//当前时间，如"2020-11-20 17:45:48"，变长字符串50/datetime2(7)
    //可记录其它信息:账号、备用字段、删除标识
}

module.exports = monitorErrorModel;