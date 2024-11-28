const express = require('express')
const user = require('../controller/userController')
const userUtil = require('../util/userUtil')
const dashboard = require('../controller/dashboardController')
const accountControl = require('../controller/accountControlController')
const inventory = require('../controller/inventoryController')
const borrow = require('../controller/borrowController')
const returner = require('../controller/returnController')
const upload = require('../helper/multer')
const timer = require('../helper/timestamp')
const presentController = require('../controller/presentController')
const routes = express.Router()


//User do
routes.post('/register', user.register)
routes.post('/login', userUtil.isBlok, user.login)
routes.delete('/logout', userUtil.isLogin, user.logout)
routes.get('/profile', userUtil.isLogin, user.profile)
routes.patch('/profile', userUtil.isLogin, upload.single('file'), user.editProfile)

//Dashboard for siswa and admin
routes.get('/dashboard', userUtil.isLogin, dashboard.dashboard)
routes.get('/searchJudul/:judul', userUtil.isLogin, dashboard.searchByJudul)
routes.get('/searchJurusan/:jurusan', userUtil.isLogin, dashboard.searchByJurusan)

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
routes.get('/searchPeminjamanAdmin/:date', userUtil.isLogin, userUtil.isAdmin, borrow.searchPeminjamanAdmin)
routes.get('/searhPeminjaman/:date', userUtil.isLogin, borrow.searchPeminjaman)
routes.post('/acceptPeminjaman/:id', userUtil.isLogin, userUtil.isAdmin, borrow.acceptBorrow)
routes.post('/deniedPeminjaman/:id', userUtil.isLogin, userUtil.isAdmin, borrow.deniedBorrow)
routes.post('/resetPeminjaman/:id', userUtil.isLogin, userUtil.isAdmin, borrow.resetBorrow)
routes.delete('/deletePeminjaman/:id', userUtil.isLogin, borrow.deleteBorrow)
routes.post('/downloadBorrow', userUtil.isLogin, borrow.downloadBorrow)

//denda
routes.get('/denda', userUtil.isLogin, returner.getDenda)
routes.put('/denda', userUtil.isLogin, userUtil.isAdmin, returner.updateDenda)

//pengembalian
routes.get('/pengembalian', userUtil.isLogin, userUtil.isAdmin, returner.getReturn)
routes.get('/pengembalianUser', userUtil.isLogin, returner.getReturnUser)
routes.post('/pengembalian/:id', userUtil.isLogin, userUtil.isAdmin, returner.acceptReturn)
routes.post('/resetPengembalian/:id', userUtil.isLogin, userUtil.isAdmin, returner.resetPengembalian)
routes.get('/searchPengembalianAdmin/:date', userUtil.isLogin, userUtil.isAdmin, returner.searchPengembalianAdmin)
routes.get('/searhPengembalian/:date', userUtil.isLogin, returner.searchPengembalian)
routes.post('/downloadReturn', userUtil.isLogin, returner.downloadReturn)

//blokir
routes.post('/blok/:nisn', userUtil.isLogin, userUtil.isAdmin, user.blok)
routes.post('/unblok/:nisn', userUtil.isLogin, userUtil.isAdmin, user.unblok)

//jurusan
routes.get('/jurusan', dashboard.jurusan)
routes.get('/jurusan/:id', userUtil.isLogin, userUtil.isAdmin, dashboard.getJurusan)
routes.post('/createJurusan', userUtil.isLogin, userUtil.isAdmin, upload.single('photo'), dashboard.createJurusan)
routes.patch('/updateJurusan/:id', userUtil.isLogin, userUtil.isAdmin, upload.single('photo'), dashboard.updateJurusan)
routes.delete('/deleteJurusan/:id', userUtil.isLogin, userUtil.isAdmin, dashboard.deleteJurusan)

// daftar kehadiran
routes.get("/generate-barcode", userUtil.isLogin, userUtil.isAdmin, presentController.generateBarcode);
routes.get("/userPresent", userUtil.isLogin, userUtil.isAdmin, presentController.getPresent);
routes.post("/scan", userUtil.isLogin, presentController.scanBarcode);
routes.post('/downloadPresent', userUtil.isLogin, presentController.downloadPresent)

//serverTime
routes.get('/time', timer.showTimestamp)
//show image

//wa





module.exports = routes