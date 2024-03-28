const express = require('express')
const router = express.Router()
const multer = require('multer')
const userController = require('../controller/user')
const { validateRegister, validationErrors } = require('../middlewares/validate-register')

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
router.get('/register',userController.renderRegister)

router.post('/register',upload.single('photo'), validateRegister, validationErrors,userController.createUser)

module.exports = router
