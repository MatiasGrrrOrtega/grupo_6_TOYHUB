const express = require('express')
const router = express.Router()
const multer = require('multer')
const userController = require('../controller/user')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/photosUsers')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

router.get('/login', userController.renderLogin)
router.get('/register', userController.renderRegister)

router.post('/', upload.single('photo-profile-user'), userController.createUser)

module.exports = router
