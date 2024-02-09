const express = require('express')
const router = express.Router()

const productController = require('../controller/products')

router.get('/cart', productController.renderProductCart)

router.get('/create', productController.renderProductCreat)
router.get('/:id', productController.renderProductDetail)

router.post('/', productController.addProduct)
router.get('/:id/edit', productController.renderProductEdit)

router.put('/:id', productController.editProduct)

module.exports = router
