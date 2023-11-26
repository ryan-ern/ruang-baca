const Database = require('../database/databaseConnect')

class returnService{
    static async getDenda(){
        await Database.createConnection()
        const query = {
            text: 'SELECT * from denda',
        }
        const denda = await Database.query(query)
        await Database.close()
        return denda[0]
    }
    static async updateDenda(nominal, text){
        await Database.createConnection()
        const query = {
            text: 'UPDATE denda SET nominal=$1, text=$2 RETURNING *',
            values: [nominal, text]
        }
        const denda = await Database.query(query)
        await Database.close()
        return denda[0]
    }
}

module.exports = returnService