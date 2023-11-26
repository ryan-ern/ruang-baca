const multer = require('multer')
const path = require('path')
const jwt = require('jsonwebtoken')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const bookTitle = req.body.judul
    const token = req.headers.authorization
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
    const name = decodedToken.username
    if(bookTitle){
      const fileExtension = path.extname(file.originalname).toLowerCase()
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const filename = bookTitle + '-' + uniqueSuffix + fileExtension;
      cb(null, filename) 
    }else if(name){
      const fileExtension = path.extname(file.originalname).toLowerCase()
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const filename = name + '-' + uniqueSuffix + fileExtension;
      cb(null, filename) 
    }else{
      const fileExtension = path.extname(file.originalname).toLowerCase()
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const filename = "notName" + '-' + uniqueSuffix + fileExtension;
      cb(null, filename) 
    }
  },
})

const upload = multer({ storage: storage })

module.exports = upload