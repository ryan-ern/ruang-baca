const Database = require ('../database/databaseConnect')

class borrowService{
    static async addBorrow(nisn, isbn){
        await Database.createConnection()
        const query = {
            text:'insert into borrow (user_nisn, book_isbn, status, created_at, updated_at) values ($1, $2, $3, $4, $5) RETURNING *',
            values: [nisn, isbn, 'PROSES', new Date(), new Date()]
        }
        const borrow = await Database.query(query)
        await Database.close
        return borrow[0]
    }
    static async acceptBorrow(id){
        await Database.createConnection
        const future = new Date(currentDate)
        future.setDate(currentDate.getDate() + 3)
        const query ={
            text:'UPDATE borrow SET status = $1, updated_at = $2, due_data = $3',
            values: ['SUKSES', new Date(), future]
        }
    }
}

module.exports = borrowService