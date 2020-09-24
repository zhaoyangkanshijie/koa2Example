# koa2Example

## 参考链接

* [koa生成器一键生成koa项目](https://www.jianshu.com/p/8611da03101e)

## 目录

* [项目生成](#项目生成)
* [中间件](#中间件)
* [日志](#日志)
* [密文密码](#密文密码)

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
    controller      --接收请求处理逻辑
    model           --数据库表结构
    service         --数据库CRUD操作
config              --配置文件，如数据库连接密码
middleware          --中间件
public
    images
    javascripts
    stylesheets
routes              --路由
    ***.js
views               --视图
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

    router.get('*', async (ctx, next) => {
        authoization(ctx, next)
    }).post('*', async (ctx, next) => {
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