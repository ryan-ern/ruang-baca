const inventoryService = require("../service/inventoryService")
const returnService = require("../service/returnService")
const moment = require('moment')
const jwt = require('jsonwebtoken')
const borrowService = require("../service/borrowService")

class returnController{
    static async getDenda(req, res){
        try{
            const denda = await returnService.getDenda()
            if(!denda) throw new Error('Denda not found')
            const response = {
                status:200, 
                message: 'success',
                denda : denda,
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
    static async updateDenda(req, res){
        try{
            const payload = req.body
            const denda = await returnService.updateDenda(payload.nominal, payload.text)
            const response = {
                status:200, 
                message: 'success',
                denda : denda,
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
    static async getReturn(req, res){
        try{
            const datas = await returnService.getAllReturn()
            const denda = await returnService.getDenda()
            datas.forEach( data=> {
                data.updated_at = moment(data.updated_at).format()
                if (data.due_date != null){
                    data.due_date = moment(data.due_date).format()
                    const tanggal = moment(new Date().getTime()).diff(data.due_date, 'hours')
                    const many =  tanggal/24
                    if(data.pengembalian == '-'){
                        data.terlambat = Math.round(many)
                        if(data.terlambat<0) data.terlambat = 0
                    }else{
                        data.terlambat = 0
                    }
                }else{
                    data.due_date = '-'     
                }
                if(data.due_date != '-'){
                    if(data.pengembalian == '-'){
                        const tanggal = moment(new Date().getTime()).diff(data.due_date, 'hours')
                        const many =  tanggal/24
                        const round = Math.round(many)
                        if(round<=0){
                            data.denda = 0
                        }else{
                            data.denda = data.round*denda.nominal
                        }
                    }
                }
            })
            const response = {
                status:200, 
                message: 'success',
                data : datas,
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
    static async getReturnUser(req, res){
        try{
            const token = req.headers.authorization
            if(!token) throw new Error ("Error while get token")
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            const datas = await returnService.getReturn(decodedToken.nisn)
            const denda = await returnService.getDenda()
            datas.forEach( data=> {
                data.status = '-'
                data.updated_at = moment(data.updated_at).format()
                if (data.due_date != null){
                    data.due_date = moment(data.due_date).format()
                    const tanggal = moment(new Date().getTime()).diff(data.due_date, 'hours')
                    const many =  tanggal/24
                    data.terlambat = Math.round(many)
                    if(data.terlambat<0) data.terlambat = 0
                }else{
                    data.due_date = '-'     
                }
                if(data.due_date != '-'){
                    if(data.pengembalian == '-'){
                        const tanggal = moment(new Date().getTime()).diff(data.due_date, 'hours')
                        const many =  tanggal/24
                        const round = Math.round(many)
                        if(round<=0){
                            data.denda = 0
                        }else{
                            data.denda = data.round*denda.nominal
                        }
                    }
                }
            })
            const response = {
                status:200, 
                message: 'success',
                data : datas,
                denda : denda.nominal,
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
    static async acceptReturn(req, res){
        try{
            const data = await returnService.getReturnOne(req.params.id)
            if(!data) throw new Error('Maaf data tidak ditemukan')
            const denda = await returnService.getDenda()
            const buku = await inventoryService.findIsbn(data.book_isbn)
            if(data.due_date != '-'){
                const tanggal = moment(new Date().getTime()).diff(data.due_date, 'hours')
                const many =  tanggal/24
                data.round = Math.round(many)
                if(data.round<=0){
                    data.denda = data.denda+0
                }else{
                    data.denda = data.denda+(data.round*denda.nominal)
                }
            }
            const pengembalian = await returnService.acceptReturn(data.denda, req.params.id, buku.ready+1, buku.isbn)
            const response = {
                status:200, 
                message: 'success',
                data : pengembalian,
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
    static async resetPengembalian(req, res){
        try{
            const data = await borrowService.seeOneBorrow(req.params.id)
            if(!data) throw new Error ('Data Not Found')
            const buku = await inventoryService.findIsbn(data.book_isbn)
            if(!buku) throw new Error ('Data Not Found')
            /*if(buku.ready<=0) throw new Error ('Maaf Stock Buku sudah habis')
            const count = await borrowService.countUserBorrow(user)
            if(count.count>=3) throw new Error ("Maaf sudah melebihi batas peminjaman")*/
            const borrow = await returnService.resetPengembalian(req.params.id, buku.ready-1, buku.isbn)
            const response = {
                status : 200, 
                message : 'success',
                data : borrow,
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
    static async searchPengembalianAdmin(req, res){
        try{
            const date = req.params.date
            const datas = await returnService.searchPengembalianAdmin(date)
            if(Object.keys(datas).length === 0 ) throw new Error ('Data Tidak ditemukan')
            datas.forEach( data=> {
                data.updated_at = moment(data.updated_at).format()
                if (data.due_date != null){
                    data.due_date = moment(data.due_date).format()
                    const tanggal = moment(new Date().getTime()).diff(data.due_date, 'hours')
                    const many =  tanggal/24
                    data.terlambat = Math.round(many)
                    if(data.terlambat<0) data.terlambat = 0
                }else{
                    data.due_date = '-'     
                }
                if(data.due_date != '-'){
                    if(data.pengembalian == '-'){
                        const tanggal = moment(new Date().getTime()).diff(data.due_date, 'hours')
                        const many =  tanggal/24
                        const round = Math.round(many)
                        if(round<=0){
                            data.denda = 0
                        }else{
                            data.denda = data.round*denda.nominal
                        }
                    }
                }
            })
            const response = {
                status : 200, 
                message : 'success',
                data : datas,
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
    static async searchPengembalian(req, res){
        try{
            const date = req.params.date
            const token = req.headers.authorization
            if(!token) throw new Error ("Error while get token")
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            const datas = await returnService.searchPengembalian(date, decodedToken.nisn)
            if(Object.keys(datas).length === 0 ) throw new Error ('Data Tidak ditemukan')
            datas.forEach( data=> {
                data.updated_at = moment(data.updated_at).format()
                if (data.due_date != null){
                    data.due_date = moment(data.due_date).format()
                    const tanggal = moment(new Date().getTime()).diff(data.due_date, 'hours')
                    const many =  tanggal/24
                    data.terlambat = Math.round(many)
                    if(data.terlambat<0) data.terlambat = 0
                }else{
                    data.due_date = '-'     
                }
                if(data.due_date != '-'){
                    if(data.pengembalian == '-'){
                        const tanggal = moment(new Date().getTime()).diff(data.due_date, 'hours')
                        const many =  tanggal/24
                        const round = Math.round(many)
                        if(round<=0){
                            data.denda = 0
                        }else{
                            data.denda = data.round*denda.nominal
                        }
                    }
                }
            })
            const response = {
                status : 200, 
                message : 'success',
                data : datas,
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

module.exports = returnController