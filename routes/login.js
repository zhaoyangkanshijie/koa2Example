const router = require('koa-router')()
const userService = require('../app/service/userRepository.js');
const bcrypt = require('bcryptjs');
const token = require('../app/service/token')

router.prefix('/login')

router.get('/', async (ctx, next) => {
    await ctx.render('login', {
        title: 'login'
    })
})
.post('/', async (ctx, next) => {
    //global.logHandle(ctx)
    //console.log(bcrypt.compareSync(ctx.request.body['password'], bcrypt.hashSync(ctx.request.body['password'], 10)))

    await userService.findUserData(ctx.request.body['name'])
        .then(async (data) => {
            if(bcrypt.compareSync(ctx.request.body['password'], data[0].password)){
                //console.log(token,token.getJwtToken,typeof token.getJwtToken)
                let result = await token.getJwtToken(ctx.request.body['name']);
                if(result.code === global.code.success.error_code){
                    ctx.body = result;
                }
                else{
                    ctx.body = {
                        data: '账号或密码错误'
                    }
                }
            }
            else{
                ctx.body = {
                    data: '账号或密码错误'
                }
            }
        }).catch((e) => {
            ctx.body = {
                data: e.toString()
            }
        })
})

module.exports = router
