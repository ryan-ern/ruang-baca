const express = require('express')
const user =  require('../controller/userController')
const userUtil = require('../util/userUtil')
const dashboard = require('../controller/dashboardController')
const accountControl = require('../controller/accountControlController')
const inventory = require('../controller/inventoryController')
const borrow =  require('../controller/borrowController')
const returner = require('../controller/returnController')
const upload = require('../helper/multer')

const routes = express.Router()

//User do
routes.post('/register', user.register)
routes.post('/login', user.login)
routes.delete('/logout',userUtil.isLogin, user.logout)
routes.get('/profile', userUtil.isLogin, user.profile)
routes.patch('/profile', userUtil.isLogin, upload.single('file'), user.editProfile)
//Dashboard for siswa and admin
routes.get('/dashboard', userUtil.isLogin, dashboard.dashboard)
//menu userControl for admin and super admin
routes.get('/userControl', userUtil.isLogin, userUtil.isAdmin, accountControl.seeAllUser)
routes.post('/addAdmin', userUtil.isLogin, userUtil.isSuper, accountControl.addAdmin)
routes.post('/addSuperAdmin', userUtil.isLogin, userUtil.isSuper, accountControl.addSuperAdmin)
routes.get('/user/:username', userUtil.isLogin, userUtil.isAdmin, accountControl.seeUser)
routes.post('/user/:username', userUtil.isLogin, userUtil.isAdmin, upload.single('file'), accountControl.editUser)
routes.delete('/user/:username', userUtil.isLogin, userUtil.isAdmin, accountControl.deleteUser)
//menu inventory for admin and super admin
routes.post('/addBook', userUtil.isLogin, userUtil.isAdmin, upload.single('file'), inventory.addBook)
routes.get('/inventory', userUtil.isLogin, userUtil.isAdmin, inventory.getAllBook)
routes.get('/editBook/:isbn', userUtil.isLogin, userUtil.isAdmin, inventory.getBook)
routes.post('/editBook/:isbn', userUtil.isLogin, userUtil.isAdmin, upload.single('file'), inventory.editBook)
routes.delete('/editBook/:isbn', userUtil.isLogin, userUtil.isAdmin, inventory.deleteBook)

//borrow book
routes.post('/addBorrow/:isbn', userUtil.isLogin, borrow.addborrow)
routes.get('/peminjamanAdmin', userUtil.isLogin, userUtil.isAdmin, borrow.seeAllBorrow)
routes.get('/peminjaman', userUtil.isLogin, borrow.seeBorrow)
routes.post('/acceptPeminjaman/:id', userUtil.isLogin, userUtil.isAdmin, borrow.acceptBorrow)
routes.post('/deniedPeminjaman/:id', userUtil.isLogin, userUtil.isAdmin, borrow.deniedBorrow)
routes.delete('/deletePeminjaman/:id', userUtil.isLogin, borrow.deleteBorrow)

//denda
routes.get('/denda', userUtil.isLogin, userUtil.isAdmin, returner.getDenda)
routes.put('/denda', userUtil.isLogin, userUtil.isAdmin, returner.updateDenda)

//show image
module.exports = routes