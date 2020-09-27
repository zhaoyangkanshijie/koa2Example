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

module.exports = {
    deepClone
}