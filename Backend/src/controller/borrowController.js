const borrowService = require('../service/borrowService')
const userService = require('../service/userService')
const jwt = require ('jsonwebtoken')
const time= require('../helper/timestamp')
const moment = require('moment')
const inventoryService = require('../service/inventoryService')
class borrowController{
    static async addborrow(req, res){
        try{
            const isbn = req.params.isbn
            const token = req.headers.authorization
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            const user = decodedToken.nisn
            const data = await borrowService.countUserBorrow(user)
            if(data==3) throw new Error ("Maaf sudah melebihi batas peminjaman")
            const book = await borrowService.addBorrow(user, isbn)
            const response = {
                status : 201, 
                message : 'add borrow success',
                data : book
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
    static async seeAllBorrow(req, res){
        try{
            const borrows = await borrowService.seeAllBorrow()
            borrows.forEach( borrow=> {
                borrow.updated_at = moment(borrow.updated_at).format()
                borrow.due_date = moment(borrow.due_date).format() 
            })
            const timer= await time.getTimestamp()
            const response = {
                status : 200, 
                message : 'success',
                data : borrows,
                time : timer
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
    static async seeBorrow(req, res){
        try{
            const token = req.headers.authorization
            if(!token) throw new Error ("Error while get token")
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            const borrows = await borrowService.seeBorrow(decodedToken.nisn)
            borrows.forEach( borrow=> {
                borrow.updated_at = moment(borrow.updated_at).format()
                borrow.due_date = moment(borrow.due_date).format() 
                console.log(moment(borrow.due_date))
                const denda = moment(new Date().getTime()).diff(borrow.due_date, 'hours')
                const many =  denda/24
                const sum = Math.round(many)
                console.log(sum)
                console.log(many)
            })
            
            const timer= await time.getTimestamp()
            const response = {
                status : 200, 
                message : 'success',
                data : borrows,
                time : timer
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
    static async acceptBorrow(req, res){
        try{
            const data = await borrowService.seeOneBorrow(req.params.id)
            if(!data) throw new Error ('Data Not Found')
            if(data.status == 'SUKSES' || data.status == 'DITOLAK') throw new Error('Data is cant be change')
            const borrow = await borrowService.acceptBorrow(data.id)
            borrow.updated_at = moment(borrow.updated_at).format()
            borrow.due_date = moment(borrow.due_date).format()
            const timer= await time.getTimestamp()
            const response = {
                status : 200, 
                message : 'success',
                data : borrow,
                time:timer
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
    static async deniedBorrow(req, res){
        try{
            const data = await borrowService.seeOneBorrow(req.params.id)
            if(!data) throw new Error ('Data Not Found')
            if(data.status == 'SUKSES' || data.status == 'DITOLAK') throw new Error('Data is cant be change')
            const borrow = await borrowService.deniedBorrow(data.id)
            borrow.updated_at = moment(borrow.updated_at).format()
            borrow.due_date = moment(borrow.due_date).format()
            const timer= await time.getTimestamp()
            const response = {
                status : 200, 
                message : 'success',
                data : borrow,
                time:timer
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
    static async deleteBorrow(req, res){
        try{
            const token = req.headers.authorization
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            const nisn = decodedToken.nisn
            const id = req.params.id
            const borrow = await borrowService.seeOneBorrow(id)
            if(!borrow) throw new Error ('Data not Found')
            const book = await inventoryService.findIsbn(borrow.book_isbn)
            const user = await userService.findNisn(borrow.user_nisn)
            if(nisn != borrow.nisn && decodedToken.role != "admin" && decodedToken.role != 'Super Admin') throw new Error ('Maaf anda tidak punya wewenang dalam menghapus data ini')
            const del = await borrowService.deleteBorrow(id, user.name, book.judul)

            const response = {
                status : 200,
                message : del,
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
}
module.exports = borrowController