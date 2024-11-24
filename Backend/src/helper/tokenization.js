const jwt = require('jsonwebtoken')

class tokenization {
    static async isExpired(accesstoken) {
        const decodedToken = jwt.verify(accesstoken, process.env.JWT_TOKEN)
        if (!decodedToken) {
            return true
        } else {
            return false
        }
    }
}

module.exports = tokenization