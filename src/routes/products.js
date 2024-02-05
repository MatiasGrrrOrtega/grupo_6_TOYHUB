const express = require('express')
const router = express.Router()

const productsController = require('../controller/products')

router.get('/productCart', productsController.renderProductCart)
router.get('/productDetail', productsController.renderProductDetail)

module.exports = router
