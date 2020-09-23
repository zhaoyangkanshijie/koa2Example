const logsUtil = require('../app/util/koaLog4');

let applicationLog = () => async (ctx,next) => {
    const start = new Date();					          // 响应开始时间
    let intervals;								              // 响应间隔时间
    try {
        await next();
        intervals = new Date() - start;
        logsUtil.logResponse(ctx, intervals);	  //记录响应日志
    } catch (error) {
        intervals = new Date() - start;
        logsUtil.logError(ctx, error, intervals);//记录异常日志
    }
}

module.exports = applicationLog;