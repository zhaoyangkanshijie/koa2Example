# koa2Example

## 参考链接

* [koa生成器一键生成koa项目](https://www.jianshu.com/p/8611da03101e)

## 目录

* [项目生成](#项目生成)

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