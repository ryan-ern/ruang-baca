const dashboardService = require ('../service/dashboardService')
const jwt = require('jsonwebtoken')


class dashboardController{
    static async dashboardSiswa(req, res){
        try{
            const allBook = await dashboardService.allBook()
            const response = {
                status:200, 
                message: 'Anda Siswa',
                data : allBook
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
    static async dashboardAdmin(req, res){
        const accesstoken=req.cookies.accesstoken
        try{
            const decodedToken = jwt.verify(accesstoken, process.env.JWT_TOKEN)
            if(decodedToken.role == 'admin'){
                const countUser = await dashboardService.countUser()
                const countBook = await dashboardService.countBook()
                const response = {
                    status:200, 
                    message: 'Anda Admin',
                    countBook : countBook[0].count,
                    countUser : countUser[0].count
                }
                return res.status(200).send(response)
            }else{
                const countUser = await dashboardService.countUserSuper()
                const countBook = await dashboardService.countBook()
                const response = {
                    status:200, 
                    message: 'Anda Super!!!!!!!!',
                    countBook : countBook[0].count,
                    count : countUser[0].count
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