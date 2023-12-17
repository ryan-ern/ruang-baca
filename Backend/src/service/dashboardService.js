const Database = require('../database/databaseConnect')

class dashboardService{
    static async allBook(){
        await Database.createConnection()
        const query = {
            text: 'SELECT isbn, judul, penerbit, penulis, tahun_terbit, jumlah_halaman, stok_buku, cover, sinopsis, jurusan, ready from buku ORDER BY jurusan ASC'
        }
        const buku = await Database.query(query)
        await Database.close()
        return buku
    }
    static async allUserForSuper(){
        await Database.createConnection()
        const query = {
            text: 'SELECT * FROM account WHERE role = $1  or role = $2 order by role asc',
            values: ['siswa', 'admin']
        }
        const user = await Database.query(query)
        await Database.close()
        return user
    }
    static async allUser(){
        await Database.createConnection()
        const query = {
            text: 'SELECT * FROM account WHERE role = $1',
            values: ['siswa']
        }
        const user = await Database.query(query)
        await Database.close()
        return user
    }
    static async countUser(){
        await Database.createConnection()
        const query = {
            text: 'SELECT COUNT(*) FROM account WHERE role = $1',
            values: ['siswa']
        }
        const count = await Database.query(query)
        await Database.close()
        return count
    }
    static async countUserSuper(){
        await Database.createConnection()
        const query = {
            text: 'SELECT COUNT(*) FROM account WHERE role = $1  or role = $2',
            values: ['siswa', 'admin']
        }
        const count = await Database.query(query)
        await Database.close()
        return count
    }
    static async countBook(){
        await Database.createConnection()
        const query = {
            text: 'SELECT COUNT(*) FROM buku',
        }
        const count = await Database.query(query)
        await Database.close()
        return count
    }
    static async countPinjam(){
        await Database.createConnection()
        const query = {
            text: 'SELECT COUNT(*) FROM borrow WHERE status = $1 AND pengembalian = $2',
            values : ['PROSES', '-']
        }
        const count = await Database.query(query)
        await Database.close()
        return count
    }
    static async countDenda(){
        await Database.createConnection()
        const query = {
            text: 'SELECT SUM(denda) FROM borrow WHERE pengembalian = $1',
            values : ['sukses']
        }
        const count = await Database.query(query)
        await Database.close()
        return count[0]
    }
    static async searchJudul(judul){
        await Database.createConnection()
        const query = {
            text: 'SELECT * FROM buku WHERE judul like $1',
            values: [`%${judul}%`]
        }
        const buku = await Database.query(query)
        await Database.close()
        return buku
    }
    static async searchJurusan(jurusan){
        await Database.createConnection()
        const query = {
            text: 'SELECT * FROM buku WHERE jurusan like $1',
            values: [jurusan]
        }
        const buku = await Database.query(query)
        await Database.close()
        return buku
    }
    static async jurusan(){
        await Database.createConnection()
        const query = {
            text: 'SELECT * FROM jurusan',
        }
        const jurusan = await Database.query(query)
        await Database.close()
        return jurusan
    }
    static async getJurusan(id){
        await Database.createConnection()
        const query = {
            text: 'SELECT * FROM jurusan where id = $1',
            values: [id]
        }
        const jurusan = await Database.query(query)
        await Database.close()
        return jurusan[0]
    }
    static async createJurusan(name, photo){
        await Database.createConnection()
        const query = {
            text:'insert into jurusan (name, photo) values ($1, $2) RETURNING *',
            values: [name, photo]
        }
        const jurusan = await Database.query(query)
        await Database.close()
        return jurusan[0]
    }
    static async updatePhotoJurusan(name, photo, id){
        await Database.createConnection()
        const query = {
            text:'UPDATE jurusan SET name =$1, photo = $2 where id =$3 RETURNING *',
            values: [name, photo, id]
        }
        const jurusan = await Database.query(query)
        await Database.close()
        return jurusan[0]
    }
    static async updateJurusan(name, id){
        await Database.createConnection()
        const query = {
            text:'UPDATE jurusan SET name =$1 where id =$2 RETURNING *',
            values: [name, id]
        }
        const jurusan = await Database.query(query)
        await Database.close()
        return jurusan[0]
    }
    static async deleteJurusan(name, id){
        await Database.createConnection()
        const query = {
            text:'DELETE FROM jurusan where id =$1',
            values: [id]
        }
        await Database.query(query)
        const message = `Delete ${name} is success`
        await Database.close()
        return message
    }
}

module.exports = dashboardService