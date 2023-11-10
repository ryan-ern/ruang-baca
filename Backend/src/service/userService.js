const Database = require ('../database/databaseConnect')

class userServices{
    static async insertUserToDatabase(
        nisn, 
        nama, 
        username, 
        jurusan, 
        password, 
        wa,
        accesstoken,
        refreshtoken
        ){
        await Database.createConnection()
        const query = {
            text:'insert into account (nisn, nama, username, jurusan, password, wa, role, created_at, updated_at, access_token, refresh_token) values ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
            values: [nisn, nama, username, jurusan, password, wa, 'siswa', new Date(), new Date(), accesstoken, refreshtoken]
        }
        const user = await Database.query(query)
        return user[0]
        
    }
    static async findNisn(nisn){
        await Database.createConnection()
        const query = {
            text: 'SELECT * FROM account WHERE nisn= $1 ',
            values: [nisn]
        }
        const user = await Database.query(query)
        return user[0]
    }
    static async updateToken(nisn, accesstoken, refreshtoken){
        await Database.createConnection()
        const query = {
            text: 'UPDATE account set access_token=$1, refresh_token=$2 WHERE nisn= $3 ',
            values: [accesstoken, refreshtoken, nisn]
        }
        const user = await Database.query(query)
        return user[0]
    }
}

module.exports = userServices