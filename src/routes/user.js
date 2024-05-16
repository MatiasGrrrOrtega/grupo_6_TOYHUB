const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const upload = require('../middlewares/photoUserMiddleware')

const {
  validateLogin,
  validationErrorsLogin,
  validateUserLogged,
} = require('../middlewares/validate-login')
const {
  validateRegister,
  validationErrors,
} = require('../middlewares/validate-register')

router.get('/login', userController.loginPage)
router.get('/register', userController.registerPage)
router.get('/logout', validateUserLogged, userController.logoutUser)

router.post(
  '/register',
  upload.single('photo'),
  validateRegister,
  validationErrors,
  userController.createUser
)
router.post(
  '/login',
  validateLogin,
  validationErrorsLogin,
  userController.loginUser
)

module.exports = router
