const router = require('koa-router')()
const usersModel = require('../app/model/usersModel')
const usersRepository = require('../app/service/usersRepository');

router.prefix('/users')

//获取所有用户(GET请求)
router.get('/', async (ctx, next) => {
  // console.log(ctx.session.username)
  ctx.body = await usersRepository.findAllUser();
})

module.exports = router
