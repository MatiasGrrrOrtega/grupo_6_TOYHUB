const express = require('express')
const router = express.Router()
const { validateSession } = require('../middlewares/validate-session')
const { validateUserAdmin } = require('../middlewares/validate-admin')
const productController = require('../controller/products')

router.get('/cart', validateSession, productController.renderProductCart)
router.get(
  '/admin/allproducts',
  validateUserAdmin,
  productController.renderAllProducts
)
router.get(
  '/admin/create',
  validateUserAdmin,
  productController.renderProductCreate
)
router.get('/:id', productController.renderProductDetail)
router.get(
  '/admin/:id/edit',
  validateUserAdmin,
  productController.renderProductEdit
)

router.post('/admin/', validateUserAdmin, productController.addProduct)
router.put('/admin/:id', validateUserAdmin, productController.editProduct)
router.delete('/admin/:id', validateUserAdmin, productController.deleteProduct)

module.exports = router
