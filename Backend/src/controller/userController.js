const userService = require ('../service/userService')
const service = require('../service/accountControlService')
const jwt = require ('jsonwebtoken')
const tokenization = require('../helper/tokenization')
const userUtil = require('../util/userUtil')

class userController{
    static async register(req, res){
        const payload = req.body
        try{
            const nisn = await userService.findNisn(payload.nisn)
            const username = await service.findUsername(payload.username)
            if (nisn) throw new Error('NISN already exist')
            if (username) throw new Error ('Username already exist')

            if (!payload.nisn || !payload.name || !payload.username || 
                !payload.jurusan || !payload.password || !payload.wa)
                throw new Error ('Data is not full please fill all needed')
            
            const payloadData = {
                nisn: payload.nisn,
                name: payload.name,
                username: payload.username,
                jurusan: payload.jurusan,
                wa: payload.wa,
                role : 'siswa'
            }
            const accesstoken = jwt.sign(payloadData, 
                process.env.JWT_TOKEN, {expiresIn: process.env.exp_time_short})
            const refreshtoken = jwt.sign(payloadData, 
                process.env.JWT_TOKEN, {expiresIn: process.env.exp_time_long})
            
            const user = await userService.insertUserToDatabase(
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
                message: 'Register Success',
                acctoken : accesstoken,
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
    static async login(req, res){
        const payload = req.body
        try{
            const nisn = await service.findUsername(payload.username)
            if (!nisn) throw new Error('Username not Exist')
            const comparePassword= nisn.password===payload.password
            if (!comparePassword) throw new Error('Password not match')            
            const payloadData = {
                nisn: nisn.nisn,
                name: nisn.nama,
                username: nisn.username,
                jurusan: nisn.jurusan,
                wa: nisn.wa,
                role : nisn.role
            }
            const accesstoken = jwt.sign(payloadData, 
                process.env.JWT_TOKEN, {expiresIn: process.env.exp_time_short})
            const refreshtoken = jwt.sign(payloadData, 
                process.env.JWT_TOKEN, {expiresIn: process.env.exp_time_long})
            const user = await userService.updateToken(nisn.nisn, accesstoken, refreshtoken)

            const response = {
                status:200, 
                message: 'Login Success',
                acctoken : accesstoken,
            }
            
            return res.status(200).send(response)
        }catch(err){
            if(err.name === 'TokenExpiredError'){//token access expired
                try{
                    const nisn = await service.findUsername(payload.username)
                    const refreshtoken = nisn.refresh_token
                    await tokenization.isExpired(refreshtoken)
                    const accesstoken = refreshtoken
                    const payloadData = {
                        nisn: nisn.nisn,
                        name: nisn.nama,
                        username: nisn.username,
                        jurusan: nisn.jurusan,
                        wa: nisn.wa,
                        role : nisn.role
                    }
                    refreshtoken = jwt.sign(payloadData, 
                        process.env.JWT_TOKEN, {expiresIn: process.env.exp_time_long})
                    const user = await userService.updateToken(nisn.nisn, accesstoken, refreshtoken)
        
                    const response = {
                        status:200, 
                        message: 'Login Success',
                        acctoken : accesstoken,
                    }
                    
                    return res.status(200).send(response)
                    
                }catch(err){
                    if(err.name === 'TokenExpiredError'){//token access dan refresh sudah expired
                        const nisn = await service.findUsername(payload.username)
                        const payloadData = {
                            nisn: nisn.nisn,
                            name: nisn.nama,
                            username: nisn.username,
                            jurusan: nisn.jurusan,
                            wa: nisn.wa,
                            role : nisn.role
                        }
                        const accesstoken = jwt.sign(payloadData, 
                            process.env.JWT_TOKEN, {expiresIn: process.env.exp_time_short})
                        const refreshtoken = jwt.sign(payloadData, 
                            process.env.JWT_TOKEN, {expiresIn: process.env.exp_time_long})
                        const user = await userService.updateToken(nisn.nisn, accesstoken, refreshtoken)
            
                        const response = {
                            status:200, 
                            message: 'Login Success',
                            acctoken : accesstoken,
                        }
                        
                        return res.status(200).send(response)
                    }else{
                        const message = err.message.replace(/['"]+/g, '')
                        const response ={
                            status : 400, 
                            message : message,
                        }
                        return res.status(400).send(response)                        
                    }
                }
            }
            else{
                const message = err.message.replace(/['"]+/g, '')
                const response ={
                    status : 400, 
                    message : message,
                }
                return res.status(400).send(response)
            }
        }
    }
    static async logout(req,res){
        try{
            const token = req.headers.authorization

            if (!token) throw new Error('Error while getting token')
        
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            
            await userService.logout(decodedToken.username)
            const response = {
                status:200, 
                message: 'Logout Success',
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
    static async profile(req, res){
        try{
            const token = req.headers.authorization
            if(!token) throw new Error ("Error while get token")
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            const admin = await userUtil.isAdminCheck(token)
            const sadmin = await userUtil.isSuperCheck(token)
            if(!decodedToken) throw new Error ("Error while decoding the code")
            if (admin == "Super Admin" || sadmin == "Admin"){
                const feature = [
                    "Dashboard Admin",
                    "Inventory",
                    "Validasi Peminjaman",
                    "Validasi pengembalian",
                    "Kontrol Akun",
                    "Denda"
                ]
                const response = {
                    status:200, 
                    message: 'Success',
                    feature : feature,
                    data : decodedToken,
                }
                return res.status(200).send(response)
            }else{
                const feature = [
                    "Dashboard Siswa",
                    "Peminjaman",
                    "Pengembalian"
                ]
                const response = {
                    status:200, 
                    message: 'Success',
                    feature : feature,
                    data : decodedToken,
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
}

module.exports = userController