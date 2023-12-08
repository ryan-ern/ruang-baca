const jwt = require('jsonwebtoken')
const WhatsAppController = require('../controller/whatsappController')

class tokenization{
    static async isExpired(accesstoken){
        const decodedToken = jwt.verify(accesstoken, process.env.JWT_TOKEN)
        if(!decodedToken) {
            return true
        }else{
            await WhatsAppController.deleteAuthInfoFolder()
            return false
        }
    }
}

module.exports = tokenization