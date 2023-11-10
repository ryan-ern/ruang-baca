const Database =  require ('../database/databaseConnect')

class inventoryService{
    static async findIsbn(isbn){
        await Database.createConnection()
        const query = {
            text: 'SELECT * from buku WHERE isbn= $1 ',
            values: [isbn]
        }
        const buku = await Database.query(query)
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
        sinopsis
    ){
        await Database.createConnection()
        const query= {
            text: 'insert into buku (isbn, judul, penerbit, tahun_terbit, jumlah_halaman, stok_buku, cover, sinopsis, created_at, updated_at) values ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            values : [isbn, judul, penerbit, tahunTerbit, halaman, stok, cover, sinopsis, new Date(), new Date()]
        }
        const buku = await Database.query(query)
        return buku[0]
    }
}

module.exports = inventoryService