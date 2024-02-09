const data = require('../data/products')

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

  static addProduct(req, res) {
    const { name, price, share, img, category, stock, brand, description } =
      req.body
    const precieDues = price / share
    const id = data.products.length + 1
    console.log(req.body)
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

  static editProduct(req, res) {
    const { id } = req.params
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
}

module.exports = productsController
