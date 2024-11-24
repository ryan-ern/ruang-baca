const Database = require('../database/databaseConnect')

class whatsappService {
    static async getData() {
        await Database.createConnection()
        const query = {
            text: `SELECT borrow.id, borrow.user_nisn, borrow.book_isbn, borrow.status, borrow.created_at, borrow.updated_at, borrow.due_date, buku.judul, account.wa, account.name
            FROM borrow 
            JOIN buku on borrow.book_isbn = buku.isbn
            JOIN account ON borrow.user_nisn = account.nisn
            WHERE borrow.pengembalian = $1 AND borrow.status = $2`,
            values: ['-', 'SUKSES']
        }
        const user = await Database.query(query)
        await Database.close()
        return user
    }
}


module.exports = whatsappService