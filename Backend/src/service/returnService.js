const Database = require('../database/databaseConnect')
const moment = require('moment')

class returnService {
    static async getDenda() {
        await Database.createConnection()
        const query = {
            text: 'SELECT nominal, text FROM denda',
        }
        const denda = await Database.query(query)
        await Database.close()
        return denda[0]
    }
    static async updateDenda(nominal, text) {
        await Database.createConnection()
        const query = {
            text: 'UPDATE denda SET nominal=$1, text=$2 RETURNING *',
            values: [nominal, text]
        }
        const denda = await Database.query(query)
        await Database.close()
        return denda[0]
    }
    static async getAllReturn() {
        await Database.createConnection()
        const query = {
            text: `SELECT borrow.id, borrow.user_nisn, borrow.book_isbn, borrow.status, borrow.created_at, borrow.updated_at, borrow.due_date, borrow.denda, borrow.pengembalian, buku.judul, account.name 
            from borrow 
            JOIN buku ON borrow.book_isbn = buku.isbn 
            JOIN account ON borrow.user_nisn = account.nisn 
            where borrow.status = $1
            ORDER BY CASE when borrow.pengembalian = $2 then 1 when borrow.pengembalian = $3 then 2 else 3 END, borrow.id`,
            values: ["SUKSES", '-', 'sukses']
        }
        const pengembalian = await Database.query(query)
        await Database.close()
        return pengembalian
    }
    static async getReturn(nisn) {
        await Database.createConnection()
        const query = {
            text: `SELECT borrow.id, borrow.user_nisn, borrow.book_isbn, borrow.status, borrow.created_at, borrow.updated_at, borrow.due_date, borrow.denda, borrow.pengembalian, buku.judul, account.name 
            from borrow 
            JOIN buku ON borrow.book_isbn = buku.isbn 
            JOIN account ON borrow.user_nisn = account.nisn 
            where borrow.status = $1 AND borrow.user_nisn = $2
            ORDER BY CASE when borrow.pengembalian = $3 then 1 when borrow.pengembalian = $4 then 2 else 3 END, borrow.id`,
            values: ["SUKSES", nisn, '-', 'sukses']
        }
        const pengembalian = await Database.query(query)
        await Database.close()
        return pengembalian
    }
    static async getReturnOne(id) {
        await Database.createConnection()
        const query = {
            text: `SELECT borrow.id, borrow.user_nisn, borrow.book_isbn, borrow.status, borrow.created_at, borrow.updated_at, borrow.due_date, borrow.denda, buku.judul, account.name 
            from borrow 
            JOIN buku ON borrow.book_isbn = buku.isbn 
            JOIN account ON borrow.user_nisn = account.nisn 
            where borrow.id = $1`,
            values: [id]
        }
        const borrow = await Database.query(query)
        await Database.close
        return borrow[0]
    }
    static async acceptReturn(denda, id, jumlah, isbn) {
        const now = new Date().getTime()
        const currentDate = moment(now).format()
        await Database.createConnection()
        const query = {
            text: 'UPDATE borrow SET updated_at=$1, pengembalian=$2, denda = $3 WHERE id = $4 RETURNING *',
            values: [currentDate, 'sukses', denda, id]
        }
        const pengembalian = await Database.query(query)
        const newQuery = {
            text: 'UPDATE buku SET ready=$1, updated_at=$2 WHERE isbn = $3 RETURNING *',
            values: [jumlah, new Date, isbn]
        }
        const buku = await Database.query(newQuery)
        await Database.close()
        return pengembalian[0]
    }
    static async resetPengembalian(id, jumlah, isbn) {
        const now = new Date().getTime()
        const currentDate = moment(now).format()
        await Database.createConnection()
        const query = {
            text: 'UPDATE borrow SET status = $1, updated_at = $2, pengembalian = $3 WHERE id = $4 RETURNING *',
            values: ['SUKSES', currentDate, '-', id]
        }
        const borrow = await Database.query(query)
        const newQuery = {
            text: 'UPDATE buku SET ready=$1, updated_at=$2 WHERE isbn = $3 RETURNING *',
            values: [jumlah, new Date, isbn]
        }
        const buku = await Database.query(newQuery)
        await Database.close()
        return borrow[0]
    }
    static async searchPengembalianAdmin(date) {
        await Database.createConnection()
        const query = {
            text: `SELECT borrow.id, borrow.user_nisn, borrow.book_isbn, borrow.status, borrow.created_at, borrow.updated_at, borrow.due_date, borrow.denda, buku.judul, account.name 
            from borrow 
            JOIN buku on borrow.book_isbn = buku.isbn
            JOIN account ON borrow.user_nisn = account.nisn 
            WHERE borrow.status = $1 AND CAST(borrow.created_at AS VARCHAR) LIKE $2
            order by CASE when borrow.pengembalian = $3 then 1 when borrow.pengembalian = $4 then 2 else 3 END, borrow.updated_at DESC`,
            values: ['SUKSES', `${date}%`, '-', 'sukses']
        }
        const pengembalian = await Database.query(query)
        await Database.close()
        return pengembalian
    }
    static async searchPengembalian(date, nisn) {
        await Database.createConnection()
        const query = {
            text: `SELECT borrow.id, borrow.user_nisn, borrow.book_isbn, borrow.status, borrow.created_at, borrow.updated_at, borrow.due_date, borrow.denda, buku.judul, account.name 
            from borrow 
            JOIN buku on borrow.book_isbn = buku.isbn
            JOIN account ON borrow.user_nisn = account.nisn 
            WHERE borrow.status = $1 AND CAST(borrow.created_at AS VARCHAR) LIKE $2 AND borrow.user_nisn = $3
            order by CASE when borrow.pengembalian = $4 then 1 when borrow.pengembalian = $5 then 2 else 3 END, borrow.updated_at DESC`,
            values: ['SUKSES', `${date}%`, nisn, '-', 'sukses']
        }
        const pengembalian = await Database.query(query)
        await Database.close()
        return pengembalian
    }
    static async downloadReturnByDateRange(startDate, endDate) {
        await Database.createConnection();

        const query = {
            text: `SELECT 
            borrow.id, 
            borrow.user_nisn, 
            borrow.book_isbn, 
            borrow.status, 
            borrow.pengembalian, 
            borrow.denda, 
            borrow.created_at, 
            borrow.updated_at, 
            borrow.due_date, 
            buku.judul, 
            account.name 
        FROM 
            borrow
        JOIN 
            buku ON borrow.book_isbn = buku.isbn
        JOIN 
            account ON borrow.user_nisn = account.nisn 
        WHERE 
            borrow.updated_at BETWEEN $1 AND $2
        ORDER BY borrow.updated_at DESC`,
            values: [startDate, endDate],
        };

        const pengembalian = await Database.query(query);
        await Database.close();

        return pengembalian;
    }

}

module.exports = returnService