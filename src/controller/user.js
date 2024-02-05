const data = require('../model/products')
class userController {
  static renderLogin(req, res) {
    res.render('login')
  }

  static renderRegister(req, res) {
    res.render('register')
  }

  static adminAddProduct(req, res) {
    const { name, price, share, img, category, stock, brand, description } =
      req.body
    const precieDues = price / share
    const id = data.products.length + 1
    data.products.push({
      id: id,
      name,
      price,
      dues: precieDues,
      share,
      img: img,
      category,
      stock,
      brand,
      description,
    })
    res.redirect('/')
  }

  static adminEditProduct(req, res) {
    const { id } = req.params
    const product = data.products.find((product) => product.id == id)
    const { name, price, share, img, category, stock, brand, description } =
      req.body
    data.products[id - 1].name = name
    data.products[id - 1].price = price
    data.products[id - 1].share = share
    data.products[id - 1].img = img
    data.products[id - 1].category = category
    data.products[id - 1].stock = stock
    data.products[id - 1].brand = brand
    data.products[id - 1].description = description
    res.redirect('/')
  }

  static renderProductEdit(req, res) {
    const { id } = req.params
    const product = data.products.find((product) => product.id == id)
    res.render('productEdit', {
      product,
    })
  }

  static renderProductCreat(req, res) {
    res.render('productCreat', {
      products: data.products,
    })
  }
}

module.exports = userController
