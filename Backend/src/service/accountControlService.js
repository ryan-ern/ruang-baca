const Database = require('../database/databaseConnect')

class accountControlService {
    static async insertAdminToDatabase(
        nisn,
        name,
        username,
        jurusan,
        password,
        wa,
        accesstoken,
        refreshtoken
    ) {
        await Database.createConnection()
        const query = {
            text: 'insert into account (nisn, name, username, jurusan, password, wa, role, created_at, updated_at, access_token, refresh_token, profile) values ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
            values: [nisn, name, username, jurusan, password, wa, 'admin', new Date(), new Date(), accesstoken, refreshtoken, 'default.jpg']
        }
        const user = await Database.query(query)
        await Database.close()
        return user[0]

    }
    static async insertSuperAdminToDatabase(
        nisn,
        name,
        username,
        jurusan,
        password,
        wa,
        accesstoken,
        refreshtoken
    ) {
        await Database.createConnection()
        const query = {
            text: 'insert into account (nisn, name, username, jurusan, password, wa, role, created_at, updated_at, access_token, refresh_token, profile) values ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
            values: [nisn, name, username, jurusan, password, wa, 'Super Admin', new Date(), new Date(), accesstoken, refreshtoken, 'default.jpg']
        }
        const user = await Database.query(query)
        await Database.close()
        return user[0]

    }
    static async findUsername(username) {
        await Database.createConnection()
        const query = {
            text: 'SELECT * FROM account WHERE username= $1 ',
            values: [username]
        }
        const user = await Database.query(query)
        await Database.close()
        return user[0]
    }
    static async findUsernameForEdit(username) {
        await Database.createConnection()
        const query = {
            text: 'SELECT nisn, name, username, jurusan, password, wa, role FROM account WHERE username= $1 ',
            values: [username]
        }
        const user = await Database.query(query)
        await Database.close()
        return user[0]
    }
    static async findUsername(username) {
        await Database.createConnection()
        const query = {
            text: 'SELECT * FROM account WHERE username= $1 ',
            values: [username]
        }
        const user = await Database.query(query)
        await Database.close()
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
    ) {
        await Database.createConnection()
        const query = {
            text: 'UPDATE account SET nisn = $1, name = $2, username = $3, jurusan = $4, password = $5, wa = $6, updated_at = $7, access_token = $8, refresh_token = $9 WHERE username = $10 RETURNING *',
            values: [nisn, name, username, jurusan, password, wa, new Date(), accesstoken, refreshtoken, id]
        }
        const user = await Database.query(query)
        await Database.close()
        return user
    }
    static async deleteUser(username) {
        await Database.createConnection()
        const query = {
            text: 'Delete from account WHERE username = $1',
            values: [username]
        }
        await Database.query(query)
        const message = `Delete ${username} is success`
        await Database.close()
        return message
    }
    static async findData(id) {
        await Database.createConnection()
        const query = {
            text: 'select count(*) from borrow where user_nisn = $1 AND pengembalian = $2 AND (status = $3 or status = $4)',
            values: [id, '-', 'SUKSES', 'PROSES']
        }
        const data = await Database.query(query)
        await Database.close()
        return data
    }
}

module.exports = accountControlService