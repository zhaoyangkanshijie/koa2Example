const router = require('koa-router')()
const usersRepository = require('../app/service/usersRepository');
const bcrypt = require('bcryptjs');

router.prefix('/register')


router.get('/', async (ctx, next) => {
    await ctx.render('register', {
        title: 'register'
    })
})

/**
   * @swagger
   * /register:
   *   post:
   *     description: 用户注册
   *     tags: [用户注册模块]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: password
   *         description: 用户密码.
   *         in: body
   *         required: true
   *         type: string
   *       - name: name
   *         description: 用户名.
   *         in: body
   *         required: true
   *         type: string
   *       - name: email
   *         description: 邮箱.
   *         in: body
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: 注册成功
   *   
   */
router.post('/', async (ctx, next) => {
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
