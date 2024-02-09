const data = require('../model/products')

class productsController {
  static renderProductCart(req, res) {
    res.render('productCart')
  }

  static renderProductDetail(req, res) {
    const { id } = req.params
    const { products } = data

    const productsRecommended = products.filter(
      (product) => product.id !== parseInt(id)
    )

    res.render('productDetail', {
      product: products[id - 1],
      productsRecommended,
    })
  }
}

module.exports = productsController
