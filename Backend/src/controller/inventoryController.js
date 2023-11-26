const inventoryService = require('../service/inventoryService')
const path = require('path')
const ROOT = process.cwd()
const fs = require('fs')
const generateImageLink = require('../helper/generateImageLink')

class inventoryController {
    static async addBook(req, res) {
        try {
            const payload = req.body
            const name = req.file.filename
            if (!name) throw new Error('Buku Tidak Ditemukan')
            const pathname = path.join(__dirname, 'uploads', name);

            const isbn = await inventoryService.findIsbn(payload.isbn)
            if (isbn) throw new Error('Buku Sudah Terdaftar')

            const buku = await inventoryService.addBukuToDatabase(
                payload.judul,
                payload.isbn,
                payload.penerbit,
                payload.tahunTerbit,
                payload.halaman,
                payload.stok,
                name,
                payload.sinopsis,
                payload.jurusan,
                payload.penulis
            )

            const response = {
                status: 200,
                message: 'Menambahkan Buku Sukses',
                data: buku
            }
            return res.status(200).send(response)
        } catch (err) {
            const message = err.message.replace(/['"]+/g, '')
            const response = {
                status: 400,
                message: message,
            }
            return res.status(400).send(response)
        }
    }
    static async getAllBook(req, res) {
        try {
            const allBooks = await inventoryService.getAllBookAdmin()
            allBooks.forEach(allBook => {
                allBook.cover = generateImageLink(allBook.cover)
            })
            const response = {
                status: 200,
                message: 'Anda Admin',
                data: allBooks,
            }
            return res.status(200).send(response)
        } catch (err) {
            const message = err.message.replace(/['"]+/g, '')
            const response = {
                status: 400,
                message: message,
            }
            return res.status(400).send(response)
        }
    }
    static async getBook(req, res) {
        try {
            const isbn = req.params.isbn
            const isbnReplace = isbn.replace(/%20/g, ' ')
            const book = await inventoryService.findIsbn(isbnReplace)
            if (!book) throw new Error('Buku Tidak Ditemukan')
            book.profile = generateImageLink(book.cover)
            const response = {
                status: 200,
                message: 'Menampilkan Buku Sukses',
                data: book,
            }
            return res.status(200).send(response)
        } catch (err) {
            const message = err.message.replace(/['"]+/g, '')
            const response = {
                status: 400,
                message: message,
            }
            return res.status(400).send(response)
        }
    }
    static async editBook(req, res) {
        try {
            const isbn = req.params.isbn
            const data = await inventoryService.findIsbn(isbn)
            const payload = req.body
            if (req.file) {
                const pathname = path.join(ROOT, 'uploads', data.cover)
                const name = req.file.filename
                fs.unlinkSync(pathname)
                const sisa = payload.stok - data.stok_buku
                const ready = data.ready + sisa
                const book = await inventoryService.editBookPhoto(
                    payload.judul,
                    payload.isbn,
                    payload.penerbit,
                    payload.tahunTerbit,
                    payload.halaman,
                    payload.stok,
                    name,
                    payload.sinopsis,
                    payload.jurusan,
                    payload.penulis,
                    ready,
                    data.isbn
                )
                const response = {
                    status: 201,
                    message: 'Mengubah Data Buku Sukses',
                    data: book
                }
                return res.status(201).send(response)
            } else {
                const sisa = payload.stok - data.stok_buku
                const ready = data.ready + sisa
                const book = await inventoryService.editBook(
                    payload.judul,
                    payload.isbn,
                    payload.penerbit,
                    payload.tahunTerbit,
                    payload.halaman,
                    payload.stok,
                    payload.sinopsis,
                    payload.jurusan,
                    payload.penulis,
                    ready,
                    data.isbn
                )
                const response = {
                    status: 201,
                    message: 'Mengubah Data Buku Sukses',
                    data: book
                }
                return res.status(201).send(response)
            }
        } catch (err) {
            const message = err.message.replace(/['"]+/g, '')
            const response = {
                status: 400,
                message: message,
            }
            return res.status(400).send(response)
        }
    }
    static async deleteBook(req, res) {
        try {
            const isbn = req.params.isbn
            const isbnReplace = isbn.replace(/%20|%20/g, ' ')
            const book = await inventoryService.findIsbn(isbnReplace)
            if (!book) throw new Error('Buku Tidak Ditemukan')

            const pathname = path.join(ROOT, 'uploads', book.cover)
            if (fs.existsSync(pathname)) {
                fs.unlinkSync(pathname)
            }

            const data = await inventoryService.deleteBook(isbnReplace, book.judul)

            const response = {
                status: 200,
                message: data,
            }
            return res.status(200).send(response)
        } catch (err) {
            const message = err.message.replace(/['"]+/g, '')
            const response = {
                status: 400,
                message: message,
            }
            return res.status(400).send(response)
        }
    }
}

module.exports = inventoryController