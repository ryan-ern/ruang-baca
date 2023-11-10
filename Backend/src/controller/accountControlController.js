const accountControlService = require("../service/accountControlService")
const jwt = require('jsonwebtoken')

class accountControlController{
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

            const expLong = "1y"
            const expShort= "5m"
            const accesstoken = jwt.sign(payloadData, 
                process.env.JWT_TOKEN, {expiresIn: expShort})
            const refreshtoken = jwt.sign(payloadData, 
                process.env.JWT_TOKEN, {expiresIn: expLong})
            
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
    static async seeUser(req, res){
        try{
            const username = await accountControlService.findUsernameForEdit(req.params.username)
            
            if(!username) throw new Error ('User not found')

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
        const payload = req.body
        try{
            const username = await accountControlService.findUsername(req.params.username)
            
            if(!username) throw new Error ('User not found')

            const payloadData = {
                nisn: payload.nisn,
                name: payload.name,
                username: payload.username,
                jurusan: payload.jurusan,
                wa: payload.wa,
                role : username.role
            }

            const expLong = "1y"
            const accesstoken = username.refresh_token
            const refreshtoken = jwt.sign(payloadData, 
                process.env.JWT_TOKEN, {expiresIn: expLong})

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
            console.log(user)
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
}

module.exports = accountControlController