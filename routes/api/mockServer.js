const router = require('koa-router')()
const mockModel = require('../../app/model/mockModel')
const myUtil = require('../../app/util/util')
const code = require('../../config/responseCodeConfig')

router.prefix('/api/mockServer')

router.all('*', async (ctx, next) => {
    //console.log('all: /api/mockServer')
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
        ctx.response.status = e.statusCode || err.status || 500;
        ctx.response.body = {
            message: e.message
        }
    }
})

router.get('/', async (ctx, next) => {
    let model = myUtil.deepClone(mockModel);
    for(let key in model){
        if(typeof model[key] === 'string'){
            model[key] = key;
        }else if(typeof model[key] === 'number'){
            model[key] = parseInt(Math.random()*100);
        }
        else if(typeof model[key] === 'boolean'){
            model[key] = new Date().getTime() % 2 === 0 ? true : false;
        }
    }
    ctx.body = model;
})

router.get('/:id', async (ctx, next) => {
    let model = myUtil.deepClone(mockModel);
    for(let key in model){
        if(typeof model[key] === 'string'){
            model[key] = key;
        }else if(typeof model[key] === 'number'){
            model[key] = ctx.params.id;
        }
        else if(typeof model[key] === 'boolean'){
            model[key] = new Date().getTime() % 2 === 0 ? true : false;
        }
    }
    ctx.body = model;
})

router.post('/', async (ctx, next) => {
    let model = myUtil.deepClone(mockModel);
    for(let key in model){
        if(typeof model[key] === 'string'){
            model[key] = key;
        }else if(typeof model[key] === 'number'){
            model[key] = parseInt(Math.random()*100);
        }
        else if(typeof model[key] === 'boolean'){
            model[key] = new Date().getTime() % 2 === 0 ? true : false;
        }
    }
    ctx.body = model;
})

router.put('/', function (ctx, next) {
    ctx.body = new Date().getTime() % 2 === 0 ? {
        error_code: code.modify.error_code,
        message: code.modify.message
    } : {
        error_code: code.data_error.error_code,
        message: code.data_error.message
    };
});

router.delete('/', function (ctx, next) {
    ctx.body = new Date().getTime() % 2 === 0 ? {
        error_code: code.delete.error_code,
        message: code.delete.message
    } : {
        error_code: code.data_error.error_code,
        message: code.data_error.message
    };
});

module.exports = router
