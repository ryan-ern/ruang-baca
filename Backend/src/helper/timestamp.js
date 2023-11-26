const moment =  require('moment')
class timestamp{
    static async getTimestamp(){
        const now = new Date().getTime()
        const timeServer = {
            timestamp : now,
            moment: moment(now).format(),
            Date: new Date().getTime,
            string: moment(now).format('yyyy-M-D HH:mm:ss'),
        }
        return timeServer
    }
}

module.exports = timestamp