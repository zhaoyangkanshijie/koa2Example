var mysql = require('mysql');
var config = require('../../config/mysqlConfig.js');

let pools = {};

//判断是否存在连接池不用每次都创建
if (!pools.hasOwnProperty('data')) {
    pools['data'] = mysql.createPool({
        host: config.database.HOST,
        user: config.database.USERNAME,
        password: config.database.PASSWORD,
        database: config.database.DATABASE
    });
}

// 查询  
// sql 是sql语句
// values 是sql语句中的具体值
// sql values 可查看官方文档 https://github.com/mysqljs/mysql#performing-queries
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        //初始化连接池
        pools['data'].getConnection((err, connection) => {
            if (err) {
                console.log(err,'数据库连接失败');
                reject(err);
            }
            else{
            	console.log('数据库连接成功');
                //操作数据库
	            connection.query(sql, values, (err, results) => {
	                if (err) {
	                	reject(err);
	                } else {
	                	connection.release();
	                	resolve(results);
	                }
	            });
            }
        })
    });
}

const connector = class{
    constructor(){
        this.sql = ''
    }
    
    execute() {
        global.logHandle('execute')
        return query(this.sql);
    }
    selectAllFromTable(tableName) {
        global.logHandle('selectAllFromTable')
        this.sql += "select * from " + tableName;
        return this;
    }
    selectSomeFromTable(tableName,columnNames) {
        global.logHandle('selectSomeFromTable')
        this.sql += "select " + columnNames.join(" ") + " from " + tableName;
        return this;
    }
    insertDataToTable(tableName,model) {
        global.logHandle('insertDataToTable')
        this.sql += "insert into " + tableName + " set ";
        let index = 0;
        for(let key in model){
            if(index === 0){
                this.sql += key + "=" + model[key];
                index++;
            }
            else{
                this.sql += "," + key + "=" + model[key];
            }
        }
        return this;
    }
}

module.exports = { query, connector };