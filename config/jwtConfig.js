const config = {
    secret:'jwt demo',
    unlessPath: [
        '/',
        '/register',
        '/login',
        '/users',
        '/api/jwtToken/*',
        '/api/testSQL/*',
        '/favicon.ico'
    ]
}

module.exports = config