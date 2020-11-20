const logsUtil = require('../app/util/koaLog4');
const monitorBrowserModel = require('../app/model/monitorBrowserModel')
const monitorEventModel = require('../app/model/monitorEventModel')
const monitorStayModel = require('../app/model/monitorStayModel')
const monitorErrorModel = require('../app/model/monitorErrorModel')
const monitorRequestModel = require('../app/model/monitorRequestModel')
const myUtil = require('../app/util/util')
const monitorRepository = require('../app/service/monitorRepository');

let applicationLog = () => async (ctx,next) => {
    const start = new Date();					          // 响应开始时间
    let intervals;								              // 响应间隔时间
    try {
        await next();
        intervals = new Date() - start;
        logsUtil.logResponse(ctx, intervals);	  //记录响应日志
        let model = myUtil.deepClone(monitorRequestModel);
        model.requestMethod = ctx.request.method;
        model.requestOriginalUrl = ctx.request.originalUrl;
        model.ip = myUtil.getClientIP(ctx);
        model.requestContent = ctx.request.query ? JSON.stringify(ctx.request.query) : JSON.stringify(ctx.request.body);
        model.responseTime = intervals;
        model.responseStatus = ctx.status;
        model.responseContent = JSON.stringify(ctx.body);
        model.time = new Date().getTime().toString();
        delete model.id;
        console.log(model)
        let result = await monitorRepository.addRequestData(model);
    } catch (error) {
        intervals = new Date() - start;
        logsUtil.logError(ctx, error, intervals);//记录异常日志
        let model = myUtil.deepClone(monitorErrorModel);
        model.url = ctx.request.originalUrl;
        model.type = 'request';
        model.row = -1;
        model.col = -1;
        model.source = `error time:${intervals}`;
        model.msg = JSON.stringify(error);
        model.ip = myUtil.getClientIP(ctx);
        model.time = new Date().getTime().toString();
        delete model.id;
        console.log(model)
        let result = await monitorRepository.addErrorData(model);
    }
}

module.exports = applicationLog;