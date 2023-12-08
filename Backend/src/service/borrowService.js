const { Query } = require('pg')
const Database = require ('../database/databaseConnect')
const moment = require('moment')

class borrowService{
    static async addBorrow(nisn, isbn, jumlah){
        await Database.createConnection()
        const query = {
            text:'insert into borrow (user_nisn, book_isbn, status, created_at, updated_at, pengembalian, denda) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            values: [nisn, isbn, 'PROSES', new Date(), new Date(), '-', 0]
        }
        const borrow = await Database.query(query)
        const newQuery = {
            text:'UPDATE buku SET ready=$1, updated_at=$2 WHERE isbn = $3 RETURNING *',
            values: [jumlah, new Date, isbn]
        }
        const buku = await Database.query(newQuery)
        await Database.close()
        return borrow[0]
    }
    static async seeAllBorrow(){
        await Database.createConnection()
        const query = {
            text: `SELECT borrow.id, borrow.user_nisn, borrow.book_isbn, borrow.status, borrow.created_at, borrow.updated_at, borrow.due_date, buku.judul, account.name 
            from borrow 
            JOIN buku on borrow.book_isbn = buku.isbn
            JOIN account ON borrow.user_nisn = account.nisn 
            order by CASE when borrow.status = $1 then 1 when borrow.status = $2 then 2 else 3 END, borrow.updated_at DESC`,
            values:['PROSES', 'SUKSES']
        }
        const borrow = await Database.query(query)
        await Database.close()
        return borrow
    }
    static async seeBorrow(userId){
        await Database.createConnection()
        const query = {
            text: `SELECT borrow.id, borrow.user_nisn, borrow.book_isbn, borrow.status, borrow.created_at, borrow.updated_at, borrow.due_date, buku.judul, account.name 
            from borrow 
            JOIN buku ON borrow.book_isbn = buku.isbn 
            JOIN account ON borrow.user_nisn = account.nisn 
            where borrow.user_nisn = $1 
            ORDER BY CASE when borrow.status = $2 then 1 when borrow.status = $3 then 2 else 3 END, borrow.updated_at DESC`,
            values:[userId, 'PROSES', 'SUKSES']
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
    static async deniedBorrow(id, jumlah, isbn){
        const now = new Date().getTime()
        const currentDate =  moment(now).format()
        const dueDate = moment(now).add(3, 'days').format()
        await Database.createConnection()
        const query ={
            text:'UPDATE borrow SET status = $1, updated_at = $2, due_date = $3 WHERE id = $4 RETURNING *',
            values: ['DITOLAK', currentDate, dueDate, id]
        }
        const borrow = await Database.query(query)
        const newQuery = {
            text:'UPDATE buku SET ready=$1, updated_at=$2 WHERE isbn = $3 RETURNING *',
            values: [jumlah, new Date, isbn]
        }
        const buku = await Database.query(newQuery)
        await Database.close()
        return borrow[0]
    }
    static async countUserBorrow(userId){
        await Database.createConnection()
        const query = {
            text: 'SELECT COUNT(*) FROM borrow where user_nisn = $1 AND status = $2 OR status = $3 AND pengembalian = $4',
            values : [userId, 'PROSES', 'SUKSES','-']
        }
        const count = await Database.query(query)
        await Database.close()
        return count[0]
    }
    static async resetBorrow(id){
        await Database.createConnection()
        const query ={
            text:'UPDATE borrow SET status = $1, updated_at = $2, due_date = $3, pengembalian = $4 WHERE id = $5 RETURNING *',
            values: ['PROSES', new Date(), null, '-', id]
        }
        const borrow = await Database.query(query)
        await Database.close()
        return borrow[0]
    }
    static async resetBorrowAnother(id, jumlah, isbn){
        await Database.createConnection()
        const query ={
            text:'UPDATE borrow SET status = $1, updated_at = $2, due_date = $3, pengembalian = $4 WHERE id = $5 RETURNING *',
            values: ['PROSES', new Date(), null, '-', id]
        }
        const borrow = await Database.query(query)
        const newQuery = {
            text:'UPDATE buku SET ready=$1, updated_at=$2 WHERE isbn = $3 RETURNING *',
            values: [jumlah, new Date, isbn]
        }
        const buku = await Database.query(newQuery)
        await Database.close()
        return borrow[0]
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
    static async searchPeminjamanAdmin(date){
        await Database.createConnection()
        const query = {
            text : `SELECT borrow.id, borrow.user_nisn, borrow.book_isbn, borrow.status, borrow.created_at, borrow.updated_at, borrow.due_date, buku.judul, account.name 
            from borrow 
            JOIN buku on borrow.book_isbn = buku.isbn
            JOIN account ON borrow.user_nisn = account.nisn 
            WHERE borrow.pengembalian = $1 AND CAST(borrow.created_at AS VARCHAR) LIKE $2
            order by CASE when borrow.status = $3 then 1 when borrow.status = $4 then 2 else 3 END, borrow.updated_at DESC`,
            values :['-', `${date}%`, 'PROSES', 'SUKSES']
        }
        const peminjaman = await Database.query(query)
        await Database.close()
        return peminjaman
    }
    static async searchPeminjaman(date, nisn){
        await Database.createConnection()
        const query = {
            text : `SELECT borrow.id, borrow.user_nisn, borrow.book_isbn, borrow.status, borrow.created_at, borrow.updated_at, borrow.due_date, buku.judul, account.name 
            from borrow 
            JOIN buku on borrow.book_isbn = buku.isbn
            JOIN account ON borrow.user_nisn = account.nisn 
            WHERE borrow.pengembalian = $1 AND CAST(borrow.created_at AS VARCHAR) LIKE $2 AND borrow.user_nisn = $3
            order by CASE when borrow.status = $4 then 1 when borrow.status = $5 then 2 else 3 END, borrow.updated_at DESC`,
            values :['-', `${date}%`, nisn,'PROSES', 'SUKSES']
        }
        const peminjaman = await Database.query(query)
        await Database.close()
        return peminjaman
    }
}

module.exports = borrowService