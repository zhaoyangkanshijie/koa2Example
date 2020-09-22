const router = require('koa-router')()
const userService = require('../app/service/userRepository.js');

router.prefix('/users')

//获取所有用户(GET请求)
router.get('/', async (ctx, next) => {
  // console.log(ctx.session.username)
  ctx.body = await userService.findAllUser();
})

// 增加用户(POST请求)
router.post('/add', async (ctx, next) => {
  let arr = [];
  //console.log(ctx.request,ctx.request.header,ctx.request.body)
  arr.push(ctx.request.body['name']);
  arr.push(ctx.request.body['password']);
  arr.push(ctx.request.body['email']);

  await userService.addUserData(arr)
      .then((data) => {
          let result = '';
          if (data.affectedRows != 0) {
            result = 'success';
          }
          ctx.body = {
              data: result
          }
      }).catch((e) => {
          ctx.body = {
              data: e.toString()
          }
      })
})

module.exports = router
