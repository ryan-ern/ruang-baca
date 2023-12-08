const Database = require ('../database/databaseConnect')

class whatsappService{
    static async getData(){
        await Database.createConnection()
        const query = {
            text: 'SELECT * FROM friend ',
        }
        const user = await Database.query(query)
        await Database.close()
        return user
    }
}


module.exports = whatsappService