const monitorEventModel = {
    id: 0,
    url: '',//发生地址，如"www.baidu.com"，变长字符串200
    eventType: '',//事件类型，如"click"，变长字符串50
    happenTime: '',//发生时间，如"1604999914886"，变长字符串50
    content: '',//内容，如"monitor"，变长字符串200
    ip: '',//ip地址(请求主体或请求头(代理:'x-forwarded-for'/'x-real-ip')获取)，变长字符串50
    time: new Date().getTime().toString()//当前时间，如"2020-11-20 17:45:48"，变长字符串50/datetime2(7)
    //可记录其它信息:账号、备用字段、删除标识
}

module.exports = monitorEventModel;