const express = require('express')
const user =  require('../controller/userController')
const userUtil = require('../util/userUtil')
const dashboard = require('../controller/dashboardController')
const accountControl = require('../controller/accountControlController')
const inventory = require('../controller/inventoryController')
const borrow =  require('../controller/borrowController')
const upload = require('../helper/multer')

const routes = express.Router()

//User do
routes.post('/register', user.register)
routes.post('/login', user.login)
routes.delete('/logout',userUtil.isLogin, user.logout)
routes.get('/profile', userUtil.isLogin, user.profile)
//Dashboard for siswa and admin
routes.get('/dashboard', userUtil.isLogin, dashboard.dashboardSiswa)
//routes.get('/dashboardAdmin', userUtil.isLogin, userUtil.isAdmin, dashboard.dashboardAdmin)
//menu userControl for admin and super admin
routes.get('/userControl', userUtil.isLogin, userUtil.isAdmin, accountControl.seeAllUser)
routes.post('/addAdmin', userUtil.isLogin, userUtil.isSuper, accountControl.addAdmin)
routes.get('/user/:username', userUtil.isLogin, userUtil.isAdmin, accountControl.seeUser)
routes.post('/user/:username', userUtil.isLogin, userUtil.isAdmin, accountControl.editUser)
routes.delete('/user/:username', userUtil.isLogin, userUtil.isAdmin, accountControl.deleteUser)
//menu inventory for admin and super admin
routes.post('/addBook', userUtil.isLogin, userUtil.isAdmin, upload.single('file'), inventory.addBook)
routes.get('/inventory', userUtil.isLogin, userUtil.isAdmin, inventory.getAllBook)
routes.post('/editBook', userUtil.isLogin, userUtil.isAdmin, )

//borrow book
routes.post('/addBorrow/:isbn', userUtil.isLogin, borrow.addborrow)

module.exports = routes