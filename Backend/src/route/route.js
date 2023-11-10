const express = require('express')
const user =  require('../controller/userController')
const userUtil = require('../util/userUtil')
const dashboard = require('../controller/dashboardController')
const accountControl = require('../controller/accountControlController')
const inventory = require('../controller/inventoryController')
const upload = require('../helper/multer')

const routes = express.Router()

//login & sign UP
routes.post('/register', user.register)
routes.post('/login', user.login)
//Dashboard for siswa and admin
routes.get('/dashboard', userUtil.isLogin, dashboard.dashboardSiswa)
routes.get('/dashboardAdmin', userUtil.isLogin, userUtil.isAdmin, dashboard.dashboardAdmin)
//menu userControl for admin and super admin
routes.get('/userControl', userUtil.isLogin, userUtil.isAdmin, accountControl.seeAllUser)
routes.post('/addAdmin', userUtil.isLogin, userUtil.isSuper, accountControl.addAdmin)
routes.get('/user/:username', userUtil.isLogin, userUtil.isAdmin, accountControl.seeUser)
routes.post('/user/:username', userUtil.isLogin, userUtil.isAdmin, accountControl.editUser)
//menu inventory for admin and super admin
routes.post('/addBook', userUtil.isLogin, userUtil.isAdmin, upload.single('file'), inventory.addBook)
routes.get('/inventory', userUtil.isLogin, userUtil.isAdmin, inventory.getAllBook)

module.exports = routes