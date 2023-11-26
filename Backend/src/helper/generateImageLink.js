const ROOT = process.cwd()
const fs = require ('fs')

const imageLink = (imageName) => {
    const imageFullPath = `${ROOT}/uploads/${imageName}`
    const APP_BASE_URL = process.env.BASE_URL
    if(!imageName || !fs.existsSync(imageFullPath)){
        return null
    }
    return `${APP_BASE_URL}/${imageName}`
}

module.exports = imageLink