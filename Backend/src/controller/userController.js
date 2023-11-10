const userService = require ('../service/userService')
const jwt = require ('jsonwebtoken')
const tokenization = require('../helper/tokenization')

class userController{
    static async register(req, res){
        const payload = req.body
        try{
            const nisn = await userService.findNisn(payload.nisn)
            if (nisn) throw new Error('NISN already exist')
            if (nisn.username == payload.username) throw new Error ('Username already exist')

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
            
            const expLong = "1y"
            const expShort= "5m"
            const accesstoken = jwt.sign(payloadData, 
                process.env.JWT_TOKEN, {expiresIn: expShort})
            const refreshtoken = jwt.sign(payloadData, 
                process.env.JWT_TOKEN, {expiresIn: expLong})
            
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
                retoken : refreshtoken,
            }
            res.cookie('accesstoken', accesstoken, {
                maxAge: 300000, 
                httpOnly: true })
            
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
        const nisn = await userService.findNisn(payload.nisn)
        const expLong = "1y"
        const expShort= "5m"
        const payloadData = {
            nisn: nisn.nisn,
            name: nisn.name,
            username: nisn.username,
            jurusan: nisn.jurusan,
            wa: nisn.wa,
            role : nisn.role
        }
        try{
            if (!nisn) throw new Error('Username not Exist')

            const comparePassword= nisn.password===payload.password
            if (!comparePassword) throw new Error('Password not match')            
            
            const accesstoken = jwt.sign(payloadData, 
                process.env.JWT_TOKEN, {expiresIn: expShort})
            const refreshtoken = jwt.sign(payloadData, 
                process.env.JWT_TOKEN, {expiresIn: expLong})
            const user = await userService.updateToken(nisn.nisn, accesstoken, refreshtoken)
            res.cookie('accesstoken', accesstoken, {
                maxAge: 3600000, 
                httpOnly: true })

            const response = {
                status:200, 
                message: 'Login Success',
                acctoken : accesstoken,
            }
            
            return res.status(200).send(response)
        }catch(err){
            if(error.name === 'TokenExpiredError'){//token access expired
                try{
                    const refreshtoken = nisn.refresh_token
                    const expirationTimestamp = await tokenization.isExpired(refreshtoken)
                    const accesstoken = refreshtoken
                    refreshtoken = jwt.sign(payloadData, 
                        process.env.JWT_TOKEN, {expiresIn: expLong})
                    const user = await userService.updateToken(nisn.nisn, accesstoken, refreshtoken)

                    res.cookie('accesstoken', accesstoken, {
                        maxAge: 3600000, 
                        httpOnly: true })
        
                    const response = {
                        status:200, 
                        message: 'Login Success',
                        acctoken : accesstoken,
                    }
                    
                    return res.status(200).send(response)
                    
                }catch(err){
                    if(error.name === 'TokenExpiredError'){//token access dan refresh sudah expired
                        const accesstoken = jwt.sign(payloadData, 
                            process.env.JWT_TOKEN, {expiresIn: expShort})
                        const refreshtoken = jwt.sign(payloadData, 
                            process.env.JWT_TOKEN, {expiresIn: expLong})
                        const user = await userService.updateToken(nisn.nisn, accesstoken, refreshtoken)
                        res.cookie('accesstoken', accesstoken, {
                            maxAge: 3600000, 
                            httpOnly: true })
            
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
}

module.exports = userController