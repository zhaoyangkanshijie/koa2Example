const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const moment = require("moment")
const session = require('koa-generic-session')
const redis = require('koa-redis')

const authoization = require('./middleware/authoization')
const interceptor = require('./middleware/interceptor')
const applicationLog = require('./middleware/log')
const activateRoutes = require('./middleware/activateRoutes')
const { koaSwagger } = require('koa2-swagger-ui')

const code = require('./config/responseCodeConfig')
const logHandle = require('./app/util/koaLog4').logHandle
const logInfo = require('./app/util/koaLog4').logInfo
global.code = code
global.logHandle = logHandle
global.logInfo = logInfo

// error handler
onerror(app)

//session
app.keys = ["key1","key2"];//用于session加密处理，2个key随便填
app.use(session({
  //如果不设置，默认在内存里
  key:'session',
  prefix: 'session',
  store: new redis()//存进本机redis服务
}))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger((str) => { // 使用日志中间件
  console.log(moment().format('YYYY-MM-DD HH:mm:ss') + str);
}))

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(applicationLog())

app.use(koaSwagger({
  routePrefix: '/api/swagger', // host at /swagger instead of default /docs
  swaggerOptions: {
    url: '/api/swagger/swagger.json', // example path to json 其实就是之后swagger-jsdoc生成的文档地址
  },
}))

// middleware intercept
app.use(authoization.routes(), authoization.allowedMethods())
app.use(interceptor())

// routes
activateRoutes(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app
