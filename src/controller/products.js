const data = require('../db/products')
const fs = require('fs')
const path = require('path')

class productsController {
  static renderAllProducts(req, res) {
    res.render('allProducts', {
      products: data,
      isLogged: {
        userLogged: req.session.isLoggedIn,
        userBody: req.session.loggedUser,
      },
    })
  }

  static renderProductCart(req, res) {
    res.render('productCart', {
      isLogged: {
        userLogged: req.session.isLoggedIn,
        userBody: req.session.loggedUser,
      },
    })
  }

  static renderProductDetail(req, res) {
    const { id } = req.params

    const productsRecommended = data.filter(
      (product) => product.id !== parseInt(id)
    )

    res.render('productDetail', {
      product: data[id - 1],
      productsRecommended,
      isLogged: {
        userLogged: req.session.isLoggedIn,
        userBody: req.session.loggedUser,
      },
    })
  }

  static renderProductEdit(req, res) {
    const { id } = req.params
    const product = data.find((product) => product.id == id)
    res.render('productEdit', {
      product,
      isLogged: {
        userLogged: req.session.isLoggedIn,
        userBody: req.session.loggedUser,
      },
    })
  }

  static renderProductCreate(req, res) {
    res.render('productCreate', {
      products: data,
      isLogged: {
        userLogged: req.session.isLoggedIn,
        userBody: req.session.loggedUser,
      },
    })
  }

  static addProduct(req, res) {
    const { name, price, share, img, category, stock, brand, description } =
      req.body
    const precieDues = price / share
    const id = data.length + 1

    data.push({
      id: id,
      name,
      price,
      dues: precieDues,
      share,
      img,
      category,
      stock,
      brand,
      description,
    })

    fs.writeFileSync(
      path.join(__dirname, '../data/products.json'),
      JSON.stringify(data, null, 2)
    )

    res.redirect('/')
  }

  static editProduct(req, res) {
    const { id } = req.params
    const { name, price, share, img, category, stock, brand, description } =
      req.body
    data[id - 1].name = name
    data[id - 1].price = price
    data[id - 1].share = share
    data[id - 1].img = img
    data[id - 1].category = category
    data[id - 1].stock = stock
    data[id - 1].brand = brand
    data[id - 1].description = description

    fs.writeFileSync(
      path.join(__dirname, '../data/products.json'),
      JSON.stringify(data, null, 2)
    )

    res.redirect('/')
  }

  static deleteProduct(req, res) {
    const { id } = req.params
    const index = data.findIndex((product) => product.id == id)
    data.splice(index, 1)

    fs.writeFileSync(
      path.join(__dirname, '../data/products.json'),
      JSON.stringify(data, null, 2)
    )

    res.redirect('/products/create')
  }
}

module.exports = productsController
