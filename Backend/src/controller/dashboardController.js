const dashboardService = require ('../service/dashboardService')
const jwt = require('jsonwebtoken')


class dashboardController{
    static async dashboardSiswa(req, res){
        const accesstoken=req.cookies.accesstoken
        try{
            const response = {
                status:200, 
                message: 'Anda Siswa',
                acctoken : accesstoken,
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
                const allUser = await dashboardService.allUser()
                const response = {
                    status:200, 
                    message: 'Anda Admin',
                    data : allUser,
                    count : countUser[0].count
                }
                return res.status(200).send(response)
            }else{
                const countUser = await dashboardService.countUserSuper()
                const allUser = await dashboardService.allUserForSuper()
                const response = {
                    status:200, 
                    message: 'Anda Super!!!!!!!!',
                    data : allUser,
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