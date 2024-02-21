const express = require('express')
const router = express.Router()

const productController = require('../controller/products')

router.get('/cart', productController.renderProductCart)
router.get('/create', productController.renderProductCreate)
router.get('/:id', productController.renderProductDetail)
router.get('/:id/edit', productController.renderProductEdit)

router.post('/', productController.addProduct)
router.put('/:id', productController.editProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router
