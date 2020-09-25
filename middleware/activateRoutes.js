const routePath = require('../config/routePathConfig')

let activateRoutes = (app) => {
    let routes = [];
    let index = 0;
    for(let key in routePath){
        routes[index] = require(routePath[key]);
        app.use(routes[index].routes(), routes[index].allowedMethods());
        index++;
    }
    return app;
}

module.exports = activateRoutes;