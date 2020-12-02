const monitorStayModel = {
    id: 0,
    url: '',//停留地址，如"www.baidu.com"，变长字符串200
    stayTime: 0,//停留时间，如"48406"，变长字符串50
    ip: '',//ip地址(请求主体或请求头(代理:'x-forwarded-for'/'x-real-ip')获取)，变长字符串50
    time: new Date().getTime().toString()//当前时间，如"2020-11-20 17:45:48"，变长字符串50/datetime2(7)
    //可记录其它信息:账号、备用字段、删除标识
}

module.exports = monitorStayModel;