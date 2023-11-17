const inventoryService = require ('../service/inventoryService')
const path = require('path')

class inventoryController{
    static async addBook(req, res){
        try{
            const payload = req.body
            const name = req.file.filename
            if(!name) throw new Error ('File not Found')
            
            const isbn = await inventoryService.findIsbn(payload.isbn)
            if(isbn) throw new Error ('Buku is already exist')

            const buku = await inventoryService.addBukuToDatabase(
                payload.judul,
                payload.isbn,
                payload.penerbit,
                payload.tahunTerbit,
                payload.halaman,
                payload.stok,
                name,
                payload.sinopsis,
                payload.jurusan
            )

            const response = {
                status : 200,
                message : 'Upload File success',
                data : buku
            }
            return res.status(200).send(response)
        }catch (err){
            const message = err.message.replace(/['"]+/g, '')
            const response ={
                status : 400, 
                message : message,
            }
            return res.status(400).send(response)
        }
    }
    static async getAllBook(req, res){
        try{
            const allBook = await inventoryService.getAllBookAdmin()
            const response = {
                status:200, 
                message: 'Anda Admin',
                data : allBook,
            }
            return res.status(200).send(response)
        }catch(err){
            const message = err.message.replace(/['"]+/g, '')
            const response ={
                status : 400, 
                message : message,
            }
            return res.status(400).send(response)
        }
    }
    static async editBook(req, res){
        try{
            const payload = req.body
            const book =  awai 
        }catch(err){

        }
    }
}

module.exports = inventoryController