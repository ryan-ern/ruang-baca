const Database =  require ('../database/databaseConnect')

class inventoryService{
    static async findIsbn(isbn){
        await Database.createConnection()
        const query = {
            text: 'SELECT * from buku WHERE isbn= $1',
            values: [isbn]
        }
        const buku = await Database.query(query)
        await Database.close()
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
        jurusan,
        penulis
    ){
        await Database.createConnection()
        const query= {
            text: 'insert into buku (isbn, judul, penerbit, tahun_terbit, jumlah_halaman, stok_buku, cover, sinopsis, created_at, updated_at, jurusan, ready, penulis) values ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
            values : [isbn, judul, penerbit, tahunTerbit, halaman, stok, cover, sinopsis, new Date(), new Date(), jurusan, stok, penulis]
        }
        const buku = await Database.query(query)
        await Database.close()
        return buku[0]
    }
    static async getAllBookAdmin(){
        await Database.createConnection()
        const query = {
            text: 'SELECT isbn, judul, penerbit, tahun_terbit, jumlah_halaman, stok_buku, cover, sinopsis, jurusan, penulis from buku ORDER BY jurusan ASC'
        }
        const buku = await Database.query(query)
        await Database.close()
        return buku
    }
    static async editBookPhoto(
        judul,
        isbn,
        penerbit,
        tahunTerbit,
        halaman,
        stok,
        cover,
        sinopsis,
        jurusan,
        penulis,
        ready,
        bookIsbn,
        ){
        await Database.createConnection()
        const query = {
            text: 'UPDATE buku set isbn = $1, judul=$2, penerbit=$3, tahun_terbit=$4, jumlah_halaman=$5, stok_buku=$6, cover=$7, sinopsis=$8, updated_at = $9, jurusan=$10, ready=$11, penulis=$12 WHERE isbn = $13 RETURNING *',
            values: [isbn, judul, penerbit, tahunTerbit, halaman, stok, cover, sinopsis, new Date, jurusan, ready, penulis, bookIsbn]
        }
        const book = await Database.query(query)
        await Database.close()
        return book[0]
    }
    static async editBook(
        judul,
        isbn,
        penerbit,
        tahunTerbit,
        halaman,
        stok,
        sinopsis,
        jurusan,
        penulis,
        ready,
        bookIsbn,
        ){
        await Database.createConnection()
        const query = {
            text: 'UPDATE buku set isbn = $1, judul=$2, penerbit=$3, tahun_terbit=$4, jumlah_halaman=$5, stok_buku=$6, sinopsis=$7, updated_at = $8, jurusan=$9, ready=$10, penulis=$11 WHERE isbn = $12 RETURNING *',
            values: [isbn, judul, penerbit, tahunTerbit, halaman, stok, sinopsis, new Date, jurusan, ready, penulis, bookIsbn]
        }
        const book = await Database.query(query)
        await Database.close()
        return book[0]
    }
    static async deleteBook(isbn, title){
        await Database.createConnection()
        const query = {
            text: 'Delete from buku WHERE isbn = $1',
            values: [isbn]
        }
        await Database.query(query)
        const message = `Delete ${title} is success`
        await Database.close()
        return message
    }
    static async findData(isbn){
        await Database.createConnection()
        const query = {
            text: 'select count(*) from borrow where book_isbn = $1 AND pengembalian = $2 and (status = $3 or status = $4)',
            values: [isbn, '-', 'SUKSES', 'PROSES']
        }
        const data = await Database.query(query)
        await Database.close()
        return data
    }
}

module.exports = inventoryService