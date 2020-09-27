var mysql = require('mysql');
const { query, connector } = require('../util/mysqlConnector')

const tableName = 'users';

const usersRepository = {
    findAllUser: async () => {
        global.logHandle('findAllUser')
        return await new connector().selectAllFromTable(tableName).execute();
    },
    addUserData: async (model) => {
        global.logHandle('addUserData')
        return await new connector().insertDataToTable(tableName,model).execute();
    },
    findUser: async (name) => {
        global.logHandle('findUser')
        return await new connector().selectAllFromTable(tableName).combine(` where name = '${name}'`).execute();
    },
}

module.exports = usersRepository;