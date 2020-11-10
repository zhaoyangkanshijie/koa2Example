function deepClone(obj, hash = new WeakMap()) {
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (obj === null || typeof obj !== "object") return obj;
    if (hash.has(obj)) {
        return hash.get(obj);
    }
    //obj为Array，相当于new Array()
    //obj为Object，相当于new Object()
    let constr = new obj.constructor();
    hash.set(obj, constr);
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            constr[key] = deepClone(obj[key], hash);
        }
    }
    return constr;
}

function passThrough(path,url) {
    let flag = false;
    for(let i = 0;i < path.length;i++){
        if(path[i] === '*'){
            flag = true;
            break;
        }else{
            let pathParts = path[i].split('/');
            let urlParts = url.split('/');
            let pathMatch = true;
            for(let j = 0;j < pathParts.length;j++){
                if(pathParts[j] !== urlParts[j] && pathParts[j] !== '*'){
                    pathMatch = false;
                }
            }
            if(pathMatch){
                flag = true;
                break;
            }
        }
    }
    return flag;
}

/**
 * @getClientIP
 * @desc 获取用户 ip 地址
 * @param {Object} req - 请求
 */
function getClientIP(req) {
    return (req.headers ? (req.headers['x-forwarded-for'] || req.headers['x-real-ip']) : null) || // 判断是否有反向代理 IP
        (req.connection ? (req.connection.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null)) : null) || // 判断 connection 的远程 IP
        (req.socket ? req.socket.remoteAddress : null) || // 判断后端的 socket 的 IP
        'unknown';
};

module.exports = {
    deepClone,
    passThrough,
    getClientIP
}