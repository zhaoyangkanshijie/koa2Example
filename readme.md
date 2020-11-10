# koa2Example

## 参考链接

* [koa生成器一键生成koa项目](https://www.jianshu.com/p/8611da03101e)

## 目录

* [项目生成](#项目生成)
* [中间件](#中间件)
* [日志](#日志)
* [密文密码](#密文密码)
* [路由循环引入](#路由循环引入)
* [跨域配置](#跨域配置)
* [白名单模拟路由匹配](#白名单模拟路由匹配)
* [SQL模拟LINQ](#SQL模拟LINQ)

---

## 项目生成

npm 生成
```txt
npm install koa-generator -g
koa2 projectName
```

项目结构
```txt
bin
    www             --入口文件
node_modules
app
    model           --数据库表结构
    service         --数据库CRUD操作
    util            --工具方法
config              --配置文件，如数据库连接密码
middleware          --中间件(拦截器)
public              --mvc相关资源(mvvm则缺省)
    images
    javascripts
    stylesheets
routes(controller)  --路由(接收请求处理逻辑)
    ***.js
views               --mvc视图(mvvm则在其中建项目)
    ***.pug
app.js              --主程序配置
package.json
```

## 中间件

中间件可理解为拦截器，处理请求和响应

* 中间件引入样例

    app.js
    ```js
    const json = require('koa-json')
    app.use(json())
    ```

* 普通中间件

    ```js
    app.use(async (ctx, next) => {
        const start = new Date()
        await next()
        const ms = new Date() - start
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
    ```

    抽离到文件,在app.js引入即可
    ```js
    function doSomething(ctx) {
        console.log('doSomething')
    }

    var interceptor = () => async (ctx,next) => {
        doSomething(ctx)
        await next()
    }

    module.exports = interceptor;
    ```

* 路由中间件

    ```js
    let authoization = async (ctx, next) => {
        //不满足条件，可直接响应，没next则没后续
        //ctx.body = {
        //    message: 'exception',
        //    code: -1
        //}

        //ctx.response.redirect('/');

        //满足条件就next
        //await next()
    }

    router.all('*', async (ctx, next) => {
        authoization(ctx, next)
    })

    module.exports = router;
    ```

## 日志

参考： [koa2学习笔记02 - 给koa2添加系统日志 —— node日志管理模块log4js](https://www.cnblogs.com/HoChine/p/10717831.html)

* 控制台打印

    使用koa-logger

* 文件日志

    使用koa-log4

## 密文密码

参考： 

[Koa2用户注册生成密文密码及用户登录时生成token返回](https://blog.csdn.net/junkaicool/article/details/93710886)

[nodejs中的bcryptjs密码加密](https://segmentfault.com/a/1190000008841988)

bcrypt报错则使用bcryptjs
```js
npm install bcryptjs --save
var bcrypt = require('bcryptjs');
var hash = bcrypt.hashSync('bacon', 10);
bcrypt.compareSync("bacon", hash);
bcrypt.compareSync("not_bacon", hash);
```

## 路由循环引入

1. 配置路由路径对象

```js
const routePath = {
    'test': '../routes/test',
    ...
}
```

2. middleware提供循环方法，传入app

```js
let activateRoutes = (app) => {
    let routes = [];
    let index = 0;
    for(let key in routePath){
        routes[index] = require(routePath[key]);
        app.use(routes[index].routes(), routes[index].allowedMethods());
        index++;
    }
    return app;
}
```

## 跨域配置

```js
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
```

## 白名单模拟路由匹配

```js
const path = [
    '/',
    '/index',
    '/api/*'
]
const url = '/api/check'
function passThrough(path,url) {
    let flag = false;
    for(let i = 0;i < path.length;i++){
        if(path[i] === '*'){
            flag = true;
            break;
        }else{
            let pathParts = path[i].split('/');
            let urlParts = url.split('/');
            let pathMatch = true;
            for(let j = 0;j < pathParts.length;j++){
                if(pathParts[j] !== urlParts[j] && pathParts[j] !== '*'){
                    pathMatch = false;
                }
            }
            if(pathMatch){
                flag = true;
                break;
            }
        }
    }
    return flag;
}
```

## SQL模拟LINQ

```js
const tableName = 'users';

const usersRepository = {
    findAllUser: async () => {
        return await new connector().selectAllFromTable(tableName).execute();
    },
    addUserData: async (model) => {
        return await new connector().insertDataToTable(tableName,model).execute();
    },
    findUser: async (name) => {
        return await new connector().selectAllFromTable(tableName).whereAllEquals({name:name}).execute();
    },
}
```

```js
let pools = {};

//判断是否存在连接池不用每次都创建
if (!pools.hasOwnProperty('data')) {
    pools['data'] = mysql.createPool({
        host: config.database.HOST,
        user: config.database.USERNAME,
        password: config.database.PASSWORD,
        database: config.database.DATABASE
    });
}

// 查询  
// sql 是sql语句
// values 是sql语句中的具体值
// sql values 可查看官方文档 https://github.com/mysqljs/mysql#performing-queries
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        //初始化连接池
        pools['data'].getConnection((err, connection) => {
            if (err) {
                console.log(err,'数据库连接失败');
                reject(err);
            }
            else{
            	console.log('数据库连接成功');
                //操作数据库
	            connection.query(sql, values, (err, results) => {
	                if (err) {
                        console.log(err);
	                	reject(err);
	                } else {
                        console.log(results);
	                	connection.release();
	                	resolve(results);
	                }
	            });
            }
        })
    });
}

const connector = class{
    constructor(){
        this.sql = ''
    }
    
    getStatement() {
        return this.sql;
    }
    execute() {
        global.logHandle('execute')
        return query(this.sql);
    }
    columnName(name) {
        global.logHandle('columnName')
        this.sql += ` ${name}`;
        global.logHandle(this.sql);
        return this;
    }
    operator(operation) {
        global.logHandle('operator')
        this.sql += ` ${operation}`;
        global.logHandle(this.sql);
        return this;
    }
    condition(condition) {
        global.logHandle('condition')
        this.sql += ` ${condition}`;
        global.logHandle(this.sql);
        return this;
    }
    selectAllFromTable(tableName) {
        global.logHandle('selectAllFromTable')
        this.sql += `select * from ${tableName}`;
        global.logHandle(this.sql);
        return this;
    }
    selectSomeFromTable(tableName,columnNames,distinct = false,top = '') {
        global.logHandle('selectSomeFromTable')
        if(distinct){
            if(top){
                this.sql += `select distinct top ${top} ${columnNames.join(" ")} from ${tableName}`;
            }else{
                this.sql += `select distinct ${columnNames.join(" ")} from ${tableName}`;
            }
        }else{
            if(top){
                this.sql += `select top ${top} ${columnNames.join(" ")} from ${tableName}`;
            }else{
                this.sql += `select ${columnNames.join(" ")} from ${tableName}`;
            }
        }
        global.logHandle(this.sql);
        return this;
    }
    insertDataToTable(tableName,model) {
        global.logHandle('insertDataToTable')
        this.sql += `insert into ${tableName} set `;
        let index = 0;
        for(let key in model){
            if(index === 0){
                this.sql += `${key} = '${model[key]}'`;
                index++;
            }
            else{
                this.sql += `,${key} = '${model[key]}'`;
            }
        }
        global.logHandle(this.sql);
        return this;
    }
    whereStatement(statement) {
        global.logHandle('whereStatement')
        this.sql += ` where ${statement}`;
        global.logHandle(this.sql);
        return this;
    }
    whereAllEquals(model) {
        global.logHandle('whereAllEquals')
        let index = 0;
        for(let key in model){
            if(index === 0){
                this.sql += ` where ${key} = '${model[key]}'`;
                index++;
            }
            else{
                this.sql += ` and ${key} = '${model[key]}'`;
            }
        }
        global.logHandle(this.sql);
        return this;
    }
    orderBy(key) {
        global.logHandle('orderBy')
        this.sql += ` order by ${key}`;
        global.logHandle(this.sql);
        return this;
    }
    orderByDesc(key) {
        global.logHandle('orderByDesc')
        this.sql += ` order by ${key} desc`;
        global.logHandle(this.sql);
        return this;
    }
    groupBy(key,condition = '') {
        global.logHandle('groupBy')
        this.sql += ` group by ${key}`;
        if(condition){
            this.sql += ` ${condition}`;
        }
        global.logHandle(this.sql);
        return this;
    }
    limit(begin,count = '') {
        global.logHandle('limit')
        this.sql += ` limit ${begin}`;
        if(count){
            this.sql += `,${count}`;
        }
        global.logHandle(this.sql);
        return this;
    }
    combine(sql) {
        global.logHandle('combine')
        this.sql += ` ${sql}`;
        global.logHandle(this.sql);
        return this;
    }
}
```

## 前端埋点监控信息记录

```js
function getClientIP(req) {
    return (req.headers ? (req.headers['x-forwarded-for'] || req.headers['x-real-ip']) : null) || // 判断是否有反向代理 IP
        (req.connection ? (req.connection.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null)) : null) || // 判断 connection 的远程 IP
        (req.socket ? req.socket.remoteAddress : null) || // 判断后端的 socket 的 IP
        'unknown';
}
```

```js
let model = myUtil.deepClone(monitorBrowserModel);
let body = JSON.parse(ctx.request.body);
for(let key in model){
    model[key] = JSON.stringify(body[key]);
}
model.ip = myUtil.getClientIP(ctx.request.header);
model.time = new Date().getTime();
delete model.id;
let result = await monitorRepository.addBrowserData(model);
```
