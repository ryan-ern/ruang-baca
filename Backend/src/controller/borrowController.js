const borrowService = require('../service/borrowService')
const jwt = require ('jsonwebtoken')
class borrowController{
    static async addborrow(req, res){
        try{
            const isbn = req.params.isbn
            const token = req.headers.authorization
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            const user = decodedToken.nisn
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
    static async acceptBorrow(req, res){
        try{

        }catch(err){
            
        }
    }
}
module.exports = borrowController