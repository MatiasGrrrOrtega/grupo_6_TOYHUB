const express = require('express')
const router = express.Router()
const { validateUserLogged } = require('../middlewares/validate-login')
const { validateUserAdmin } = require('../middlewares/validate-admin')
const upload = require('../middlewares/photosProductMiddleware')
const productController = require('../controller/products')


router.get(
  '/admin/create',
  validateUserAdmin,
  productController.productCreate
)
router.get('/:id', productController.productDetail)
router.get(
  '/admin/:id/edit',
  validateUserAdmin,
  productController.productEdit
)
router.get('/cart', validateUserLogged, productController.productCart)

// CRUD
router.get(
  '/admin/allproducts',
  validateUserAdmin,
  productController.allProducts
)
router.post(
  '/admin/create',
  upload.array('images', 5),
  productController.create
)
router.put('/admin/:id', productController.edit)
router.delete('/admin/:id', productController.delete)

module.exports = router
