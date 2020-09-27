const router = require('koa-router')()
const usersRepository = require('../app/service/usersRepository');
const bcrypt = require('bcryptjs');

router.prefix('/register')

router.get('/', async (ctx, next) => {
    await ctx.render('register', {
        title: 'register'
    })
})
.post('/', async (ctx, next) => {
    //global.logHandle(ctx)
    let model = {
        name: ctx.request.body['name'],
        password: bcrypt.hashSync(ctx.request.body['password'], 10),
        email: ctx.request.body['email']
    }
    //console.log(model);
    ctx.body = await usersRepository.addUserData(model);
})

module.exports = router
