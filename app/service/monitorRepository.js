var mysql = require('mysql');
const { query, connector } = require('../util/mysqlConnector')

const browserTableName = 'browser_monitor';
const eventTableName = 'event_monitor';
const stayTableName = 'stay_monitor';
const errorTableName = 'error_monitor';
const requestTableName = 'request_monitor';

const monitorRepository = {
    addBrowserData: async (model) => {
        global.logHandle('addBrowserData')
        return await new connector().insertDataToTable(browserTableName,model).execute();
    },
    findBrowserData: async (model) => {
        global.logHandle('findBrowserData')
        return await new connector().selectAllFromTable(browserTableName).whereAllEquals(model).execute();
    },
    addEventData: async (model) => {
        global.logHandle('addEventData')
        return await new connector().insertDataToTable(eventTableName,model).execute();
    },
    findEventData: async (model) => {
        global.logHandle('findEventData')
        return await new connector().selectAllFromTable(eventTableName).whereAllEquals(model).execute();
    },
    addStayData: async (model) => {
        global.logHandle('addStayData')
        return await new connector().insertDataToTable(stayTableName,model).execute();
    },
    findStayData: async (model) => {
        global.logHandle('findStayData')
        return await new connector().selectAllFromTable(stayTableName).whereAllEquals(model).execute();
    },
    addErrorData: async (model) => {
        global.logHandle('addErrorData')
        return await new connector().insertDataToTable(errorTableName,model).execute();
    },
    findErrorData: async (model) => {
        global.logHandle('findErrorData')
        return await new connector().selectAllFromTable(errorTableName).whereAllEquals(model).execute();
    },
    addRequestData: async (model) => {
        global.logHandle('addRequestData')
        return await new connector().insertDataToTable(requestTableName,model).execute();
    },
    findRequestData: async (model) => {
        global.logHandle('findRequestData')
        return await new connector().selectAllFromTable(requestTableName).whereAllEquals(model).execute();
    },
}

module.exports = monitorRepository;