const Database = require ('../database/databaseConnect')

class userServices{
    static async insertUserToDatabase(
        nisn, 
        name, 
        username, 
        jurusan, 
        password, 
        wa,
        accesstoken,
        refreshtoken
        ){
        await Database.createConnection()
        const query = {
            text:'insert into account (nisn, name, username, jurusan, password, wa, role, created_at, updated_at, access_token, refresh_token, profile) values ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
            values: [nisn, name, username, jurusan, password, wa, 'siswa', new Date(), new Date(), accesstoken, refreshtoken, 'default.jpg']
        }
        const user = await Database.query(query)
        await Database.close()
        return user[0]
        
    }
    static async findNisn(nisn){
        await Database.createConnection()
        const query = {
            text: 'SELECT * FROM account WHERE nisn= $1 ',
            values: [nisn]
        }
        const user = await Database.query(query)
        await Database.close()
        return user[0]
    }
    static async updateToken(nisn, accesstoken, refreshtoken){
        await Database.createConnection()
        const query = {
            text: 'UPDATE account set access_token=$1, refresh_token=$2 WHERE nisn= $3 ',
            values: [accesstoken, refreshtoken, nisn]
        }
        const user = await Database.query(query)
        await Database.close()
        return user[0]
    }
    static async logout(username){
        await Database.createConnection()
        const query = {
            text: 'UPDATE account set access_token=NULL WHERE username= $1 ',
            values: [username]
        }
        const user = await Database.query(query)
        await Database.close()
        return user[0]
    }
    static async editUserPhoto(
        username,
        name,
        wa,
        filename,
        userUsername
        ){
        await Database.createConnection()
        const query = {
            text: 'UPDATE account set username = $1, name=$2, wa=$3, profile=$4, updated_at = $5 WHERE username = $6 RETURNING username, name, wa, profile',
            values: [username, name, wa, filename, new Date , userUsername]
        }
        const user = await Database.query(query)
        await Database.close()
        return user[0]
    }
    static async editUser(
        username,
        name,
        wa,
        userUsername
        ){
        await Database.createConnection()
        const query = {
            text: 'UPDATE account set username = $1, name=$2, wa=$3, updated_at = $4 WHERE username = $5 RETURNING username, name, wa, profile',
            values: [username, name, wa, new Date , userUsername]
        }
        const user = await Database.query(query)
        await Database.close()
        return user[0]
    }
    static async blok(nisn){
        await Database.createConnection()
        const query = {
            text: 'UPDATE account set status = $1 where nisn = $2 RETURNING *',
            values: ['blokir', nisn]
        }
        const user = await Database.query(query)
        await Database.close()
        return user[0]
    }
    static async unblok(nisn){
        await Database.createConnection()
        const query = {
            text: 'UPDATE account set status = $1 where nisn = $2 RETURNING *',
            values: ['-', nisn]
        }
        const user = await Database.query(query)
        await Database.close()
        return user[0]
    }
}

module.exports = userServices