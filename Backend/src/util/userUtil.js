const jwt = require('jsonwebtoken')

class userUtil{
    static async isLogin(req, res, next){
        try{
            const token = req.headers.authorization
            if(!token) throw new Error ('Belom Login nich')
            next()
        }catch(err){
            const message = err.message.replace(/['"]+/g, '')
            const response ={
                status : 400, 
                message : message,
            }
            return res.status(400).send(response)
        }
    }
    static async isAdmin(req, res, next){
        try{
            const token = req.headers.authorization
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            if(decodedToken.role!='admin' && decodedToken.role!='Super Admin') throw new Error('Anda Bukan Admin')
            next()
        }catch(err){
            const message = err.message.replace(/['"]+/g, '')
            const response ={
                status : 400, 
                message : message,
            }
            return res.status(400).send(response)
        }
    }
    static async isSuper(req, res, next){
        try{
            const token = req.headers.authorization
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            if(decodedToken.role!='Super Admin') throw new Error('Anda Bukan Super!!!!!')
            next()
        }catch(err){
            const message = err.message.replace(/['"]+/g, '')
            const response ={
                status : 400, 
                message : message,
            }
            return res.status(400).send(response)
        }
    }
    static async isAdminCheck(token){
        try{
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            if(decodedToken.role!='admin' && decodedToken.role!='Super Admin') throw new Error('Anda Bukan Admin')
            return decodedToken.role
        }catch(err){
            const message = err.message.replace(/['"]+/g, '')
            return message
        }
    }
    static async isSuperCheck(token){
        try{
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            if(decodedToken.role!='Super Admin') throw new Error('Anda Bukan Super!!!!!')
            return decodedToken.role
        }catch(err){
            const message = err.message.replace(/['"]+/g, '')
            return message
        }
    }
}

module.exports = userUtil