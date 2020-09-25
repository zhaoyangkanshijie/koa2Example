const router = require('koa-router')()
const usersModel = require('../app/model/usersModel')
const usersRepository = require('../app/service/usersRepository');

router.prefix('/users')

//获取所有用户(GET请求)
router.get('/', async (ctx, next) => {
  // console.log(ctx.session.username)
  ctx.body = await usersRepository.findAllUser();
})

// 增加用户(POST请求)
// router.post('/add', async (ctx, next) => {
//   let arr = [];
//   //console.log(ctx.request,ctx.request.header,ctx.request.body)
//   arr.push(ctx.request.body['name']);
//   arr.push(ctx.request.body['password']);
//   arr.push(ctx.request.body['email']);

//   await usersRepository.addUserData(arr)
//       .then((data) => {
//           let result = '';
//           if (data.affectedRows != 0) {
//             result = 'success';
//           }
//           ctx.body = {
//               data: result
//           }
//       }).catch((e) => {
//           ctx.body = {
//               data: e.toString()
//           }
//       })
// })

module.exports = router
