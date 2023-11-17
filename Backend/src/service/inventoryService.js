const Database =  require ('../database/databaseConnect')

class inventoryService{
    static async findIsbn(isbn){
        await Database.createConnection()
        const query = {
            text: 'SELECT * from buku WHERE isbn= $1 ',
            values: [isbn]
        }
        const buku = await Database.query(query)
        await Database.close
        return buku[0]
    }
    static async addBukuToDatabase(
        judul,
        isbn,
        penerbit,
        tahunTerbit,
        halaman,
        stok,
        cover,
        sinopsis,
        jurusan
    ){
        await Database.createConnection()
        const query= {
            text: 'insert into buku (isbn, judul, penerbit, tahun_terbit, jumlah_halaman, stok_buku, cover, sinopsis, created_at, updated_at, jurusan, ready) values ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
            values : [isbn, judul, penerbit, tahunTerbit, halaman, stok, cover, sinopsis, new Date(), new Date(), jurusan, stok]
        }
        const buku = await Database.query(query)
        await Database.close
        return buku[0]
    }
    static async getAllBookAdmin(){
        await Database.createConnection()
        const query = {
            text: 'SELECT isbn, judul, penerbit, tahun_terbit, jumlah_halaman, stok_buku, cover, sinopsis, jurusan from buku ORDER BY jurusan ASC'
        }
        const buku = await Database.query(query)
        await Database.close
        return buku
    }
}

module.exports = inventoryService