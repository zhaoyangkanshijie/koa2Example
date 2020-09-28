const router = require('koa-router')()
const { query, connector } = require('../../app/util/mysqlConnector')
const tableName = 'users';

router.prefix('/api/testSQL')

router.get('/a', async (ctx, next) => {
    ctx.body = 'a';
})

router.get('/selectAll', async (ctx, next) => {
    ctx.body = await new connector().selectAllFromTable(tableName).getStatement();
})

router.get('/insert', async (ctx, next) => {
    let model = {
        name: new Date().getTime(),
        password: new Date().getTime(),
        email: new Date().getTime()
    }
    ctx.body = await new connector().insertDataToTable(tableName, model).getStatement();
})

router.get('/selectOne', async (ctx, next) => {
    ctx.body = await new connector().selectAllFromTable(tableName).whereAllEquals({ name: name }).getStatement();
})

// router.get('/:id', async (ctx, next) => {
//     ctx.body = ctx.params.id;
// })

module.exports = router
