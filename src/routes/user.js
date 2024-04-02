const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const upload = require('../middlewares/photoUserMiddleware')

const {
  validateLogin,
  validationErrorsLogin,
} = require('../middlewares/validate-login')
const {
  validateRegister,
  validationErrors,
} = require('../middlewares/validate-register')

router.get('/login', userController.renderLogin)
router.get('/register', userController.renderRegister)
router.get('/logout', userController.logoutUser)

router.post(
  '/register',
  upload.single('photo'),
  validateRegister,
  validationErrors,
  userController.registerUser
)
router.post(
  '/login',
  validateLogin,
  validationErrorsLogin,
  userController.loginUser
)

module.exports = router
