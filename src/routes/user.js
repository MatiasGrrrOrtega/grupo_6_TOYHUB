const express = require('express')
const router = express.Router()
const multer = require('multer')
const userController = require('../controller/user')
const authLogin = require('../middlewares/authLogin')
const { check } = require('express-validator')

const validateUserLogin = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is invalid')
    .bail(),
  check('password').notEmpty().withMessage('Password is required'),
]

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/photosUsers')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

function authLoginMiddleware(req, res, next) {
  if (req.session.isLoggedIn) {
    res.redirect('/user/login')
  } else {
    next()
  }
}

router.get('/login', userController.renderLogin)
router.get('/register', userController.renderRegister)
router.get('/logout', userController.logoutUser)

router.post('/', upload.single('photo-profile-user'), userController.createUser)
router.post('/login', validateUserLogin, userController.loginUser)

module.exports = router
