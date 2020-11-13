const redis = require('ioredis')
const redisConfig = require('../../config/redisConfig')

//redis启动相关:https://www.cnblogs.com/xiushi/p/13670861.html
const connector = class{
    constructor(){
        this.newRedis = new redis(redisConfig)
    }
    /**
     * 设置redis data
     * @param {*} key
     * @param {*} data
     * @param {*} maxAge
     * @param {*} ex
     */
    async setData(key, data, maxAge = 60 * 60 * 24, ex = 'EX') {
        let status = null;
        try {
            if (data && typeof data === 'object') {
                status = await this.redis.set(key, JSON.stringify(data), ex, maxAge);
            } else {
                status = await this.redis.set(key, data, ex, maxAge);
            }
        } catch (error) {
            console.error(`设置data出错:`, error);
        }
        return status === 'OK';
    }

    /**
     * 获取redis的data
     * @param {*} key
     */
    async getData(key) {
        try {
            const KEY = getUCMd5(key); //转成大写的MD5作为key
            const data = await this.redis.get(key);
            if (data && typeof data === 'string') {
                return JSON.parse(data);
            } else {
                return data;
            }
        } catch (error) {
            console.error(`设置data出错:`, error);
        }
    }
    /**
     * 删除redis的data
     * @param {*} key
     */
    async delData(key) {
        let status = null;
        try {
            status = await this.redis.del(key);
        } catch (error) {
            console.error(`删除data出错:`, error);
        }
        return status > 0;
    }
}



module.exports = new connector();