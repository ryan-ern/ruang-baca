const Database = require('../database/databaseConnect')

class dashboardService{
    static async allBook(){
        await Database.createConnection()
        const query = {
            text: 'SELECT isbn, judul, penerbit, tahun_terbit, jumlah_halaman, stok_buku, cover, sinopsis, jurusan from buku ORDER BY jurusan ASC'
        }
        const buku = await Database.query(query)
        return buku
    }
    static async allUserForSuper(){
        await Database.createConnection()
        const query = {
            text: 'SELECT nisn, nama, username, jurusan, wa, role FROM account WHERE role = $1  or role = $2 order by role asc',
            values: ['siswa', 'admin']
        }
        const user = await Database.query(query)
        return user
    }
    static async allUser(){
        await Database.createConnection()
        const query = {
            text: 'SELECT nisn, nama, username, jurusan, wa, role FROM account WHERE role = $1',
            values: ['siswa']
        }
        const user = await Database.query(query)
        return user
    }
    static async countUser(){
        await Database.createConnection()
        const query = {
            text: 'SELECT COUNT(*) FROM account WHERE role = $1',
            values: ['siswa']
        }
        const count = await Database.query(query)
        return count
    }
    static async countUserSuper(){
        await Database.createConnection()
        const query = {
            text: 'SELECT COUNT(*) FROM account WHERE role = $1  or role = $2',
            values: ['siswa', 'admin']
        }
        const count = await Database.query(query)
        return count
    }
    static async countBook(){
        await Database.createConnection()
        const query = {
            text: 'SELECT COUNT(*) FROM buku',
        }
        const count = await Database.query(query)
        return count
    }
}

module.exports = dashboardService