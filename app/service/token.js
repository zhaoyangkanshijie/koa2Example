const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const jwtConfig = require('../../config/jwtConfig')


async function getJwtToken(name) {
    if (name) {
        let userToken = {
            name: name
        }
        const token = jwt.sign(userToken, jwtConfig.secret, { expiresIn: '1h' })  //token签名 有效期为1小时
        return {
            message: '获取token成功',
            code: global.code.success.error_code,
            token
        }
    } else {
        return {
            message: '参数错误',
            code: global.code.data_error.error_code
        }
    }
}

async function checkJwtToken(token) {
    let payload
    if (token) {
        try {
            payload = await verify(token, jwtConfig.secret)  // 解密，获取payload
            return {
                payload
            }
        }
        catch (e) {
            console.log(e.toString())
            return {
                message: 'token 异常' + e.toString(),
                code: global.code.exception.error_code
            }
        }
    } else {
        return {
            message: 'token 错误',
            code: global.code.data_error.error_code
        }
    }
}

module.exports = { getJwtToken, checkJwtToken }