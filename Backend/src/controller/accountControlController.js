const accountControlService = require("../service/accountControlService")
const jwt = require('jsonwebtoken')
const dashboardService = require("../service/dashboardService")
const generateImageLink =  require('../helper/generateImageLink')
const fs = require('fs')
const ROOT = process.cwd()
const path =  require('path')

class accountControlController{
    static async seeAllUser(req, res){
        const accesstoken=req.headers.authorization
        try{
            const decodedToken = jwt.verify(accesstoken, process.env.JWT_TOKEN)
            if(decodedToken.role == 'admin'){
                const allUsers = await dashboardService.allUser()
                allUsers.forEach( allUser=> {
                    if(allUser.profile == null){
                        allUser.profile = 'default.jpg'
                    }
                    allUser.profile= generateImageLink(allUser.profile)
                })
                const response = {
                    status:200, 
                    message: 'Anda Admin',
                    data : allUsers,
                }
                return res.status(200).send(response)
            }else{
                const allUsers = await dashboardService.allUserForSuper()
                allUsers.forEach( allUser=> {
                    if(allUser.profile == null){
                        allUser.profile = 'default.jpg'
                    }
                    allUser.profile= generateImageLink(allUser.profile)
                })
                const response = {
                    status:200, 
                    message: 'Anda Super!!!!!!!!',
                    data : allUsers,
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
    static async addAdmin(req, res){
        const payload = req.body
        try{
            const username = await accountControlService.findUsername(payload.username)
            if (username) throw new Error('Username already exist')

            if (!payload.nisn || !payload.name || !payload.username || 
                !payload.jurusan || !payload.password || !payload.wa)
                throw new Error ('Data is not full please fill all needed')
            const payloadData = {
                nisn: payload.nisn,
                name: payload.name,
                username: payload.username,
                jurusan: payload.jurusan,
                wa: payload.wa,
                role : 'admin'
            }
            const accesstoken = jwt.sign(payloadData, 
                process.env.JWT_TOKEN, {expiresIn: process.env.exp_time_short})
            const refreshtoken = jwt.sign(payloadData, 
                process.env.JWT_TOKEN, {expiresIn: process.env.exp_time_long})
            
            const user = await accountControlService.insertAdminToDatabase(
                payload.nisn, 
                payload.name, 
                payload.username, 
                payload.jurusan, 
                payload.password, 
                payload.wa,
                accesstoken,
                refreshtoken)

            const response = {
                status:201, 
                message: 'Add Admin Success',
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
    static async addSuperAdmin(req, res){
        const payload = req.body
        try{
            const username = await accountControlService.findUsername(payload.username)
            if (username) throw new Error('Username already exist')

            if (!payload.nisn || !payload.name || !payload.username || 
                !payload.jurusan || !payload.password || !payload.wa)
                throw new Error ('Data is not full please fill all needed')
            const payloadData = {
                nisn: payload.nisn,
                name: payload.name,
                username: payload.username,
                jurusan: payload.jurusan,
                wa: payload.wa,
                role : 'Super Admin'
            }
            const accesstoken = jwt.sign(payloadData, 
                process.env.JWT_TOKEN, {expiresIn: process.env.exp_time_short})
            const refreshtoken = jwt.sign(payloadData, 
                process.env.JWT_TOKEN, {expiresIn: process.env.exp_time_long})
            
            const user = await accountControlService.insertSuperAdminToDatabase(
                payload.nisn, 
                payload.name, 
                payload.username, 
                payload.jurusan, 
                payload.password, 
                payload.wa,
                accesstoken,
                refreshtoken)

            const response = {
                status:201, 
                message: 'Add Admin Success',
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
    static async seeUser(req, res){
        try{
            const username = await accountControlService.findUsernameForEdit(req.params.username)
            if(!username) throw new Error ('User not found')
            if(username.profile == null){
                username.profile = 'default.jpg'
            }
            username.profile= generateImageLink(username.profile)
            const response = {
                status : 200,
                message : 'Get user success',
                data : username 
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
    static async editUser(req, res){
        try{
            const username = await accountControlService.findUsername(req.params.username)
            const payload = req.body
            if(!payload)  throw new Error ('Data not found')
            if(!username) throw new Error ('User not found')
            const payloadData = {
                nisn : payload.nisn,
                name : payload.name,
                username : payload.username,
                jurusan : payload.jurusan,
                wa : payload.wa,
                role : username.role
            }
            const accesstoken = username.refresh_token
            const refreshtoken = jwt.sign(payloadData, 
                process.env.JWT_TOKEN, {expiresIn: process.env.exp_time_long})
            const user = await accountControlService.editUser(
                req.params.username,
                payload.nisn, 
                payload.name, 
                payload.username, 
                payload.jurusan, 
                payload.password, 
                payload.wa,
                accesstoken,
                refreshtoken)
            const response = {
                status : 200,
                message : 'Update user success',
                data : user
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
    static async deleteUser(req,res){
        try{
            const username = await accountControlService.findUsername(req.params.username)
            if(!username) throw new Error ('User not Found')
            const number = await accountControlService.findData(username.nisn)
            if(number[0].count>=1) throw new Error('Tidak Bisa Menghapus data, Masih terdapat data pada peminjaman buku')
            const pathname = path.join(ROOT, 'uploads', username.profile)
            if(username.profile != 'default.jpg' && fs.existsSync(pathname)) {
                fs.unlinkSync(pathname)
            }

            const data = await accountControlService.deleteUser(req.params.username)

            const response = {
                status : 200,
                message : data,
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

module.exports = accountControlController