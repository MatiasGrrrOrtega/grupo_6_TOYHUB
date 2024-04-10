const express = require('express')
const router = express.Router()
const { validateSession } = require('../middlewares/validate-session')
const { validateUserAdmin } = require('../middlewares/validate-admin')
const homeController = require('../controller/home')

router.get('/', homeController.renderHome)

module.exports = router
