const usersRepository = require('../app/service/usersRepository')

const code = require('../config/responseCodeConfig')
const logHandle = require('../app/util/koaLog4').logHandle
const logInfo = require('../app/util/koaLog4').logInfo

global.code = code
global.logHandle = logHandle
global.logInfo = logInfo

test('test user repository', async () => {
    let name = new Date().getTime();
    const user = {
        name: name,
        password: '123456',
        email: 'test@example.com'
    }
    let add = await usersRepository.addUserData(user);
    usersRepository.findUser(name).then((result)=>{
        expect(result[0].name).toBe(name)
        expect(result[0].password).toBe('123456')
        expect(result[0].email).toBe('test@example.com')
    });
})