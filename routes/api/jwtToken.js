const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const jwtConfig = require('../../config/jwtConfig')
const jwtKoa = require('koa-jwt')
const code = require('../../config/responseCodeConfig')

jwtKoa(jwtConfig.secret).unless({
    path: jwtConfig.unlessPath //数组中的路径不需要通过jwt验证
})

router.prefix('/api')

router.post('/getJwtToken', async (ctx, next) => {
    const user = ctx.request.body
    if(user && user.name) {
        let userToken = {
            name: user.name
        }
        const token = jwt.sign(userToken, jwtConfig.secret, {expiresIn: '1h'})  //token签名 有效期为1小时
        ctx.body = {
            message: '获取token成功',
            code: code.success.error_code,
            token
        }
    } else {
        ctx.body = {
            message: '参数错误',
            code: code.data_error.error_code
        }
    }
})
router.post('/checkJwtToken', async (ctx, next) => {
    const token = ctx.header.authorization  // 获取jwt
    let payload
    if (token) {
        try{
            payload = await verify(token, jwtConfig.secret)  // 解密，获取payload
            ctx.body = {
                payload
            }
        }
        catch(e){
            console.log(e.toString())
            ctx.response.redirect('/');
        }
    } else {
        ctx.body = {
            message: 'token 错误',
            code: code.data_error.error_code
        }
        ctx.response.redirect('/');
    }
})

module.exports = router
