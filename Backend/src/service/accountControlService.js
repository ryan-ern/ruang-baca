const Database = require ('../database/databaseConnect')

class accountControlService{
    static async insertAdminToDatabase(
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
            values: [nisn, nama, username, jurusan, password, wa, 'admin', new Date(), new Date(), accesstoken, refreshtoken]
        }
        const user = await Database.query(query)
        await Database.close
        return user[0]
        
    }
    static async findUsername(username){
        await Database.createConnection()
        const query = {
            text: 'SELECT * FROM account WHERE username= $1 ',
            values: [username]
        }
        const user = await Database.query(query)
        await Database.close
        return user[0]
    }
    static async findUsernameForEdit(username){
        await Database.createConnection()
        const query = {
            text: 'SELECT nisn, nama, username, jurusan, password, wa, role FROM account WHERE username= $1 ',
            values: [username]
        }
        const user = await Database.query(query)
        await Database.close
        return user[0]
    }
    static async findUsername(username){
        await Database.createConnection()
        const query = {
            text: 'SELECT * FROM account WHERE username= $1 ',
            values: [username]
        }
        const user = await Database.query(query)
        await Database.close
        return user[0]
    }
    static async editUser(
        id,
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
            text: 'UPDATE account SET nisn = $1, nama = $2, username = $3, jurusan = $4, password = $5, wa = $6, updated_at = $7, access_token = $8, refresh_token = $9 WHERE username = $10 RETURNING nisn, nama, username, jurusan, wa',
            values: [nisn, name, username, jurusan, password, wa, new Date(), accesstoken, refreshtoken, id]
        }
        const user = await Database.query(query)
        await Database.close
        return user
    }
    static async deleteUser(username){
        await Database.createConnection()
        const query = {
            text: 'Delete from account WHERE username = $1',
            values: [username]
        }
        await Database.query(query)
        const message = `Delete ${username} is success`
        await Database.close
        return message
    }
}

module.exports = accountControlService