const router = require('koa-router')()
const usersRepository = require('../app/service/usersRepository');
const bcrypt = require('bcryptjs');
const token = require('../app/util/token')

router.prefix('/login')

router.get('/', async (ctx, next) => {
    await ctx.render('login', {
        title: 'login'
    })
})
.post('/', async (ctx, next) => {
    //global.logHandle(ctx)
    //console.log(bcrypt.compareSync(ctx.request.body['password'], bcrypt.hashSync(ctx.request.body['password'], 10)))
    ctx.body = {
        data: '正在修改sql'
    }
    // await usersRepository.findUserData(ctx.request.body['name'])
    //     .then(async (data) => {
    //         if(bcrypt.compareSync(ctx.request.body['password'], data[0].password)){
    //             //console.log(token,token.getJwtToken,typeof token.getJwtToken)
    //             let result = await token.getJwtToken(ctx.request.body['name']);
    //             if(result.code === global.code.success.error_code){
    //                 ctx.body = result;
    //             }
    //             else{
    //                 ctx.body = {
    //                     data: '账号或密码错误'
    //                 }
    //             }
    //         }
    //         else{
    //             ctx.body = {
    //                 data: '账号或密码错误'
    //             }
    //         }
    //     }).catch((e) => {
    //         ctx.body = {
    //             data: e.toString()
    //         }
    //     })
})

module.exports = router