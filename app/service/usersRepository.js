var mysql = require('mysql');
const { query, connector } = require('../util/mysqlConnector')

const tableName = 'users';

const usersRepository = {
    findAllUser: async () => {
        global.logHandle('findAllUser')
        return await new connector().selectAllFromTable(tableName).execute();
    },
    // addUserData: () => {
    //     new connector().selectAllFromTable(tableName).execute();
    // }
}

module.exports = usersRepository;