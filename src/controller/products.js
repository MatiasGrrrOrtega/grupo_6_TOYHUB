class productsController {
  static renderProductCart(req, res) {
    res.render('productCart')
  }

  static renderProductDetail(req, res) {
    res.render('productDetail')
  }
}

module.exports = productsController
