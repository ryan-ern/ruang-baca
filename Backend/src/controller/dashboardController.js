const dashboardService = require ('../service/dashboardService')
const jwt = require('jsonwebtoken')
const userUtil = require('../util/userUtil')
const fs = require('fs')
const path = require('path')
const generateImageLink =  require('../helper/generateImageLink')

class dashboardController{
    static async dashboard(req, res){
        try{
            const token = req.headers.authorization
            const admin = await userUtil.isAdminCheck(token)
            const sadmin = await userUtil.isSuperCheck(token)
            if (sadmin == "Super Admin" || admin == "admin"){
                const countUser = await dashboardService.countUser()
                const countBook = await dashboardService.countBook()
                const response = {
                    status:200, 
                    message: 'Anda Admin',
                    count : {
                        countBook : countBook[0].count,
                        countUser : countUser[0].count,
                    }
                }
                return res.status(200).send(response)
            }else{
                const allBooks = await dashboardService.allBook()
                allBooks.forEach( allBook=> {
                    allBook.cover= generateImageLink(allBook.cover)
                })
                const response = {
                    status:200, 
                    message: 'Anda Siswa',
                    data : allBooks
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
module.exports=dashboardController