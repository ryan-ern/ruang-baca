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
    static async showTimestamp(req, res){
        const now = new Date().getTime()
        const timeServer = {
            timestamp : now,
            moment: moment(now).format(),
            Date: new Date().getTime,
            string: moment(now).format('yyyy-M-D HH:mm:ss'),
        }
        const response = {
            status:200, 
            message: 'Edit Success',
            data : timeServer
        }
        return res.status(201).send(response)
    }
}

module.exports = timestamp