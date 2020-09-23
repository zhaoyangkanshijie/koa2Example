const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const moment = require("moment");
const authoization = require('./middleware/authoization')
const interceptor = require('./middleware/interceptor')
const applicationLog = require('./middleware/log.js');
const index = require('./routes/index')
const users = require('./routes/users')
const login = require('./routes/api/login')

// error handler
onerror(app)

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

app.use(authoization.routes(), authoization.allowedMethods())
app.use(interceptor())

// routes
app.use(login.routes(), login.allowedMethods())
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app
