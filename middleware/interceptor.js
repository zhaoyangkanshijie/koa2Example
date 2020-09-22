function doSomething(ctx) {
    console.log('doSomething')
}

var interceptor = () => async (ctx,next) => {
    doSomething(ctx)
    await next()
}

module.exports = interceptor;