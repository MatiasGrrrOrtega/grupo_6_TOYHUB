const express = require('express')
const router = express.Router()

const userController = require('../controller/user')

router.get('/login', userController.renderLogin)
router.get('/register', userController.renderRegister)

module.exports = router
