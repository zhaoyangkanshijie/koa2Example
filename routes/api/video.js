const router = require('koa-router')()
const fs = require('fs')

router.prefix('/api/video')

router.get('/', async (ctx, next) => {
  console.log('/video')
  try {
    let data = fs.readFileSync(process.cwd()+'\\public\\resource\\sample.mp4');
    ctx.response.body = data;
  } catch (e) {
    ctx.response.status = e.statusCode || e.status || 500;
    ctx.response.body = {
      message: e.message
    }
  }
})

module.exports = router
