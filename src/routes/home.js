const express = require('express')
const router = express.Router()

const homeController = require('../controller/home')

router.get('/', homeController.renderHome)

module.exports = router
