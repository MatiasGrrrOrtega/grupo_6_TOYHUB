const express = require('express')
const router = express.Router()

const productController = require('../controller/products')

router.get('/productCart', productController.renderProductCart)
router.get('/productDetail/:id', productController.renderProductDetail)

module.exports = router
