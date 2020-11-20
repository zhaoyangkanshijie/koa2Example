const monitorStayModel = {
    id: 0,
    requestMethod: '',
    requestOriginalUrl: 0,
    ip: '',
    requestContent: '',
    responseTime: '',
    responseStatus: '',
    responseContent: '',
    time: new Date().getTime().toString()
}

module.exports = monitorStayModel;