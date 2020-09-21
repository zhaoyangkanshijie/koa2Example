var mysql = require('mysql');
var config = require('./mysqlConfig.js');

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let allServices = {
    query: function (sql, values) {

        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {

                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })

    },
    findAllUser: function () {
        let _sql = "select * from user"
        return allServices.query(_sql)
    },
    findUserData: function (name) {
        let _sql = `select * from user where name="${name}";`
        return allServices.query(_sql)
    },
    addUserData: (obj) => {
        let _sql = "insert into user set name=?,password=?,email=?;"
        return allServices.query(_sql, obj)
    },
}

module.exports = allServices;