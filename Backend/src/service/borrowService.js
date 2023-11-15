const Database = require ('../database/databaseConnect')

class borrowService{
    static async addBorrow(nisn, isbn){
        await Database.createConnection()
        const query = {
            text:'insert into borrow (user_nisn, book_isbn, status, created_at, updated_at) values ($1, $2, $3, $4, $5) RETURNING *',
            values: [nisn, isbn, 'PROSES', new Date(), new Date()]
        }
        const borrow = await Database.query(query)
        return borrow[0]
    }
}

module.exports = borrowService