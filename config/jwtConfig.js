const config = {
    secret:'jwt demo',
    unlessPath: [
        '/',
        '/register',
        '/login',
        '/users',
        '/api/jwtToken/*',
        '/api/testSQL/*',
        '/api/mockServer/*',
        '/api/pvuv/*',
        '/api/monitor/*',
        '/api/video/*',
        '/favicon.ico'
    ]
}

module.exports = config