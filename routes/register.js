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
    let arr = [];
    arr.push(ctx.request.body['name']);
    arr.push(bcrypt.hashSync(ctx.request.body['password'], 10));
    arr.push(ctx.request.body['email']);

    //console.log(bcrypt.compareSync(ctx.request.body['password'], bcrypt.hashSync(ctx.request.body['password'], 10)))
    ctx.body = {
        data: '正在修改sql'
    }
    // await usersRepository.addUserData(arr)
    //     .then((data) => {
    //         let result = '';
    //         if (data.affectedRows != 0) {
    //             result = 'success';
    //         }
    //         ctx.body = {
    //             data: result
    //         }
    //     }).catch((e) => {
    //         ctx.body = {
    //             data: e.toString()
    //         }
    //     })
})

module.exports = router
