const config = {
    secret:'jwt demo',
    unlessPath: [
        '/',
        '/register',
        '/login',
        '/users',
        '/api/getjwtToken',
        '/api/checkjwtToken',
        '/favicon.ico'
    ]
}

module.exports = config