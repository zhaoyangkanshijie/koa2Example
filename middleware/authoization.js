const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const jwtKoa = require('koa-jwt')
const jwtConfig = require('../config/jwtConfig')

jwtKoa(jwtConfig.secret).unless({
    path: jwtConfig.unlessPath //数组中的路径不需要通过jwt验证，在这里好像没什么用，下面有白名单判断
})

let authoization = async (ctx, next) => {
    let url = ctx.originalUrl;
    if (jwtConfig.unlessPath.indexOf(url) > -1) {
        console.log('through unlessPath next');
        await next()
    } else {
        const token = ctx.header.authorization  // 获取jwt
        let payload
        if (token) {
            try {
                payload = await verify(token, jwtConfig.secret)  // 解密，获取payload
                console.log('through authoization next');
                await next()
            }
            catch (e) {
                console.log(e.toString())
                console.log('authoization exception');
                ctx.body = {
                    message: 'exception',
                    code: -1
                }
            }
        } else {
            console.log('authoization error');
            ctx.body = {
                message: 'token error',
                code: -1
            }
        }
    }
}

router.get('*', async (ctx, next) => {
    authoization(ctx, next)
}).post('*', async (ctx, next) => {
    authoization(ctx, next)
})

module.exports = router;