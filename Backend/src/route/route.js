const express = require('express')
const user =  require('../controller/userController')
const userUtil = require('../util/userUtil')
const dashboard = require('../controller/dashboardController')
const accountControl = require('../controller/accountControlController')
const inventoryController = require('../controller/inventoryController')
const upload = require('../helper/multer')

const routes = express.Router()

routes.post('/register', user.register)
routes.post('/login', user.login)
routes.get('/dashboard', userUtil.isLogin, dashboard.dashboardSiswa)
routes.get('/dashboardAdmin', userUtil.isLogin, userUtil.isAdmin, dashboard.dashboardAdmin)
routes.post('/addAdmin', userUtil.isLogin, userUtil.isSuper, accountControl.addAdmin)
routes.get('/user/:username', userUtil.isLogin, userUtil.isAdmin, accountControl.seeUser)
routes.post('/user/:username', userUtil.isLogin, userUtil.isAdmin, accountControl.editUser)
routes.post('/addBook', upload.single('file'), inventoryController.addBook)

module.exports = routes