const Database = require ('../database/databaseConnect')
const moment = require('moment')

class borrowService{
    static async addBorrow(nisn, isbn){
        await Database.createConnection()
        const query = {
            text:'insert into borrow (user_nisn, book_isbn, status, created_at, updated_at) values ($1, $2, $3, $4, $5) RETURNING *',
            values: [nisn, isbn, 'PROSES', new Date(), new Date()]
        }
        const borrow = await Database.query(query)
        await Database.close()
        return borrow[0]
    }
    static async seeAllBorrow(){
        await Database.createConnection()
        const query = {
            text: 'SELECT * from borrow order by CASE when status = $1 then 1 when status = $2 then 2 else 3 END, id',
            values:['PROSES', 'SUKSES']
        }
        const borrow = await Database.query(query)
        await Database.close()
        return borrow
    }
    static async seeBorrow(userId){
        await Database.createConnection()
        const query = {
            text: 'SELECT * from borrow where user_nisn = $1 order by updated_at',
            values:[userId]
        }
        const borrow = await Database.query(query)
        await Database.close()
        return borrow
    }
    static async seeOneBorrow(id){
        await Database.createConnection()
        const query = {
            text: 'SELECT * from borrow where id = $1',
            values:[id]
        }
        const borrow = await Database.query(query)
        await Database.close()
        return borrow[0]
    }
    static async acceptBorrow(id){
        const now = new Date().getTime()
        const currentDate =  moment(now).format()
        const dueDate = moment(now).add(3, 'days').format()
        await Database.createConnection()
        const query ={
            text:'UPDATE borrow SET status = $1, updated_at = $2, due_date = $3 WHERE id = $4 RETURNING *',
            values: ['SUKSES', currentDate, dueDate, id]
        }
        const borrow = await Database.query(query)
        await Database.close()
        return borrow[0]
    }
    static async deniedBorrow(id){
        const now = new Date().getTime()
        const currentDate =  moment(now).format()
        const dueDate = moment(now).add(1, 'days').format()
        await Database.createConnection()
        const query ={
            text:'UPDATE borrow SET status = $1, updated_at = $2, due_date = $3 WHERE id = $4 RETURNING *',
            values: ['DITOLAK', currentDate, dueDate, id]
        }
        const borrow = await Database.query(query)
        await Database.close()
        return borrow[0]
    }
    static async countUserBorrow(userId){
        await Database.createConnection()
        const query = {
            text: 'SELECT COUNT(*) FROM borrow where user_nisn = $1',
            values : [userId]
        }
        const count = await Database.query(query)
        await Database.close()
        return count
    }
    static async deleteBorrow(id, name, judul){
        await Database.createConnection()
        const query = {
            text: 'Delete from borrow WHERE id = $1',
            values: [id]
        }
        await Database.query(query)
        const message = `Delete Peminjaman buku ${judul} berhasil dengan nama pengguna ${name}`
        await Database.close()
        return message
    }
}

module.exports = borrowService