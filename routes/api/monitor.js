const router = require('koa-router')()
const monitorBrowserModel = require('../../app/model/monitorBrowserModel')
const monitorEventModel = require('../../app/model/monitorEventModel')
const monitorStayModel = require('../../app/model/monitorStayModel')
const monitorErrorModel = require('../../app/model/monitorErrorModel')
const monitorRequestModel = require('../../app/model/monitorRequestModel')
const code = require('../../config/responseCodeConfig')
const myUtil = require('../../app/util/util')
const monitorRepository = require('../../app/service/monitorRepository');

router.prefix('/api/monitor')

router.all('*', async (ctx, next) => {
    //console.log('all: /api/monitor')
    ctx.set("Access-Control-Allow-Origin", "*");  // 规定允许访问该资源的外域 URI
    ctx.set('Access-Control-Allow-Methods', '*');  // 请求方式
    ctx.set("Access-Control-Max-Age", "3600");  // 设定预检请求结果的缓存时间
    ctx.set("Access-Control-Allow-Headers", "apk");  //  规定 CORS 请求时会额外发送的头信息字段
    ctx.set("Access-Control-Allow-Credentials", "true");  // 请求可以带 Cookie 等
    //ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    ctx.set("Content-Type", "application/json;charset=utf-8");

    console.log('ctx.request.method:',ctx.request.method)
    // 针对预检请求
    if (ctx.request.method == "OPTIONS") {
        ctx.response.stutas = "200"
        ctx.body = 'OPTIONS';
    }

    try {
        await next();
        //console.log("处理通过");
    } catch (e) {
        //console.log("处理错误");
        ctx.response.status = e.statusCode || e.status || 500;
        ctx.response.body = {
            message: e.message || e.toString()
        }
    }
})

router.get('/', async (ctx, next) => {
    await ctx.render('monitor', {
        title: 'monitor'
    })
})

router.post('/browser', async (ctx, next) => {
    //console.log(ctx.request.body,myUtil.getClientIP(ctx),new Date().getTime())

    let model = myUtil.deepClone(monitorBrowserModel);
    let body = JSON.parse(ctx.request.body);
    for(let key in model){
        model[key] = JSON.stringify(body[key]);
    }
    model.ip = myUtil.getClientIP(ctx);
    model.time = new Date().getTime();
    delete model.id;
    console.log(model)
    let result = await monitorRepository.addBrowserData(model);

    ctx.body = result;
})

router.post('/event', async (ctx, next) => {
    //console.log(ctx.request.body,myUtil.getClientIP(ctx),new Date().getTime())

    let model = myUtil.deepClone(monitorEventModel);
    let body = JSON.parse(ctx.request.body);
    for(let key in model){
        model[key] = JSON.stringify(body[key]);
    }
    model.ip = myUtil.getClientIP(ctx);
    model.time = new Date().getTime();
    delete model.id;
    console.log(model)
    let result = await monitorRepository.addEventData(model);

    ctx.body = result;
})

router.post('/stay', async (ctx, next) => {
    //console.log(ctx.request.body,myUtil.getClientIP(ctx),new Date().getTime())
    
    let model = myUtil.deepClone(monitorStayModel);
    let body = JSON.parse(ctx.request.body);
    for(let key in model){
        model[key] = JSON.stringify(body[key]);
    }
    model.ip = myUtil.getClientIP(ctx);
    model.time = new Date().getTime();
    delete model.id;
    console.log(model)
    let result = await monitorRepository.addStayData(model);

    ctx.body = result;
})

router.post('/error', async (ctx, next) => {
    //console.log(ctx.request.body,myUtil.getClientIP(ctx),new Date().getTime())
    
    let model = myUtil.deepClone(monitorErrorModel);
    let body = JSON.parse(ctx.request.body);
    for(let key in model){
        model[key] = JSON.stringify(body[key]);
    }
    model.ip = myUtil.getClientIP(ctx);
    model.time = new Date().getTime();
    delete model.id;
    console.log(model)
    let result = await monitorRepository.addErrorData(model);

    ctx.body = result;
})

module.exports = router