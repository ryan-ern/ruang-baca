const dashboardService = require ('../service/dashboardService')
const jwt = require('jsonwebtoken')
const userUtil = require('../util/userUtil')
const fs = require('fs')
const path = require('path')
const generateImageLink =  require('../helper/generateImageLink')
const ROOT = process.cwd()

class dashboardController{
    static async dashboard(req, res){
        try{
            const token = req.headers.authorization
            const admin = await userUtil.isAdminCheck(token)
            const sadmin = await userUtil.isSuperCheck(token)
            if (sadmin == "Super Admin" || admin == "admin"){
                if(sadmin == "Super Admin"){
                    const countUser = await dashboardService.countUserSuper()
                    const countBook = await dashboardService.countBook()
                    const countPinjam = await dashboardService.countPinjam()
                    const countDenda = await dashboardService.countDenda()
                    if(countDenda.sum == null) {
                        countDenda.sum = 0
                    }
                    const response = {
                        status:200, 
                        message: 'Anda Admin',
                        count : {
                            countBook : countBook[0].count,
                            countUser : countUser[0].count,
                            countPinjam : countPinjam[0].count,
                            countDenda : countDenda.sum,
                        }
                    }
                    return res.status(200).send(response)
                }else{
                    const countUser = await dashboardService.countUser()
                    const countBook = await dashboardService.countBook()
                    const countPinjam = await dashboardService.countPinjam()
                    const countDenda = await dashboardService.countDenda()
                    if(countDenda.sum == null) {
                        countDenda.sum = 0
                    }
                    const response = {
                        status:200, 
                        message: 'Anda Admin',
                        count : {
                            countBook : countBook[0].count,
                            countUser : countUser[0].count,
                            countPinjam : countPinjam[0].count,
                            countDenda : countDenda.sum,
                        }
                    }
                    return res.status(200).send(response) 
                }
            }else{
                const allBooks = await dashboardService.allBook()
                allBooks.forEach( allBook=> {
                    allBook.cover= generateImageLink(allBook.cover)
                })
                const response = {
                    status:200, 
                    message: 'Anda Siswa',
                    data : allBooks,
                }
                return res.status(200).send(response)
            }
            
        }catch(err){
            const message = err.message.replace(/['"]+/g, '')
            const response ={
                status : 400, 
                message : message,
            }
            return res.status(400).send(response)
        }
    }
    static async searchByJudul(req, res){
        try{
            const judul = req.params.judul
            const buku = await dashboardService.searchJudul(judul)
            if(Object.keys(buku).length === 0 ) throw new Error ('Buku Tidak ditemukan')
            buku.forEach( data=> {
                data.cover= generateImageLink(data.cover)
            })
            const response = {
                status:200, 
                message: 'Anda Siswa',
                data : buku,
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
    static async searchByJurusan(req, res){
        try{
            const jurusan = req.params.jurusan
            const buku = await dashboardService.searchJurusan(jurusan)
            if(Object.keys(buku).length === 0 ) throw new Error ('Buku Tidak ditemukan')
            buku.forEach( data=> {
                data.cover= generateImageLink(data.cover)
            })
            const response = {
                status:200, 
                message: 'Anda Siswa',
                data : buku,
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
    static async jurusan(req, res){
        try{
            const jurusans = await dashboardService.jurusan()
            jurusans.forEach( jurusan=> {
                jurusan.photo = generateImageLink(jurusan.photo)
            })
            const response = {
                status:200, 
                message: 'sukses',
                jurusan : jurusans
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
    static async getJurusan(req, res){
        try{
            const jurusan = await dashboardService.getJurusan(req.params.id)
            if(!jurusan) throw new Error ('jurusan tidak ada')
            jurusan.photo = generateImageLink(jurusan.photo)
            const response = {
                status:200, 
                message: 'sukses',
                jurusan : jurusan
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
    static async createJurusan(req, res){
        try{
            const payload = req.body
            if(!payload.name) throw new Error ('Data tidak boleh kosong')
            const photo = req.file.filename
            const jurusan = await dashboardService.createJurusan(payload.name, photo)
            const response = {
                status:201, 
                message: 'sukses',
                jurusan : jurusan
            }
            return res.status(201).send(response)
        }catch(err){
            const message = err.message.replace(/['"]+/g, '')
            const response ={
                status : 400, 
                message : message,
            }
            return res.status(400).send(response)
        }
    }
    static async updateJurusan(req, res){
        try{
            const payload = req.body
            const jurusan = await dashboardService.getJurusan(req.params.id)
            if(!jurusan) throw new Error ('jurusan tidak ada')
            if(!payload.name) throw new Error ('Data tidak boleh kosong')
            if (req.file){
                const photo = req.file.filename
                const pathname = path.join(ROOT, 'uploads', jurusan.photo)
                if(jurusan.photo != null){
                    if(jurusan.photo !== 'default.jpg'){
                        fs.unlinkSync(pathname)
                    }
                }
                const data = await dashboardService.updatePhotoJurusan(payload.name, photo, req.params.id)
                const response = {
                    status:201, 
                    message: 'sukses',
                    jurusan : data
                }
                return res.status(201).send(response)
            }
            else{
                const data = await dashboardService.updateJurusan(payload.name, req.params.id)
                const response = {
                    status:201, 
                    message: 'sukses',
                    jurusan : data
                }
                return res.status(201).send(response)
            }
        }catch(err){
            const message = err.message.replace(/['"]+/g, '')
            const response ={
                status : 400, 
                message : message,
            }
            return res.status(400).send(response)
        }
    }
    static async deleteJurusan(req, res){
        try{
            const payload = req.body
            const jurusan = await dashboardService.getJurusan(req.params.id)
            if(!jurusan) throw new Error ('jurusan tidak ada')
            const pathname = path.join(ROOT, 'uploads', jurusan.photo)
            if(jurusan.photo != 'default.jpg' && fs.existsSync(pathname)) {
                fs.unlinkSync(pathname)
            }
            const data = await dashboardService.deleteJurusan(jurusan.name, req.params.id)
            const response = {
                status:201, 
                message: data,
            }
            return res.status(201).send(response)
        }catch(err){
            const message = err.message.replace(/['"]+/g, '')
            const response ={
                status : 400, 
                message : message,
            }
            return res.status(400).send(response)
        }
    }
}
module.exports=dashboardController