const express = require('express')
const router = express.Router()

const userController = require('../controller/user')

router.get('/login', userController.renderLogin)
router.get('/register', userController.renderRegister)
router.get('/productCreat', userController.renderProductCreat)
router.get('/productEdit/:id', userController.renderProductEdit)

router.post('/productCreat', userController.adminAddProduct)
router.post('/productEdit/:id', userController.adminEditProduct)

module.exports = router
