const express = require('express')
const router = express.Router()

const productController = require('../controller/products')

function authLoginMiddleware(req, res, next) {
  if (!req.session.isLoggedIn) {
    res.redirect('/user/login')
  } else {
    next()
  }
}

router.get('/cart', productController.renderProductCart)
router.get('/create', productController.renderProductCreate)
router.get('/:id', authLoginMiddleware, productController.renderProductDetail)
router.get('/:id/edit', productController.renderProductEdit)

router.post('/', productController.addProduct)
router.put('/:id', productController.editProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router
