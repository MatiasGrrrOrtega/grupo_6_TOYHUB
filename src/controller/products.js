const data = require('../db/products')
const db = require('../database/models')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

class productsController {
  static allProducts(req, res) {
    try {
      db.Products.findAll({
        include: [{ association: 'category'}, { association: 'brand'}]
      })
        .then((products) => {
          res.render('allProducts', { products, user: req.session.loggedUser })
      })
    } catch (error) {
      console.log(error)
    }
  }

  static productCart(req, res) {
    res.render('productCart', { user: req.session.loggedUser })
  }

  static productDetail(req, res) {
    const { id } = req.params

    const product = data.find((product) => product.id == id)

    const productsRecommended = data.filter((product) => product.id !== id)

    res.render('productDetail', {
      product,
      productsRecommended,
      user: req.session.loggedUser,
    })
  }

  static productCreate(req, res) {
    res.render('productCreate', {
      products: data,
      user: req.session.loggedUser,
    })
  }

  static productEdit(req, res) {
    const { id } = req.params
    try{
      db.Products.findByPk(id,{
        include: [{ association: 'category'}, { association: 'brand'}, { association: 'images'}]
      })
        .then((product) => {
          res.render('productEdit', { product, user: req.session.loggedUser })
        })
    }catch(error){
      console.log(error)
    }
  }

  static create(req, res) {
    const { name, price, share, category, stock, brand, description } = req.body
    const precieDues = price / share
    const images = req.files
    const newProduct = {
      name,
      price: productsController.formatearPrecio(price),
      dues: parseFloat(precieDues.toFixed(2)),
      share,
      category_id: category,
      stock,
      brand_id: brand,
      description,
      images: images.map((image) => image.filename),
    }
    try {
      db.Products.create(newProduct, {
        include: [{ association: 'images' }]
      })
        .then(() => {
          res.redirect('/')
        })
    } catch (error) {
      console.log(error)
    }
  }

  static edit(req, res) {
    const { id } = req.params
    const { name, price, share, img, category, stock, brand, description } =
      req.body

    // data[id - 1].name = name
    // data[id - 1].price = price
    // data[id - 1].share = share
    // data[id - 1].img = img
    // data[id - 1].category = category
    // data[id - 1].stock = stock
    // data[id - 1].brand = brand
    // data[id - 1].description = description

    // fs.writeFileSync(
    //   path.join(__dirname, '../db/products.json'),
    //   JSON.stringify(data, null, 2)
    // )

    res.redirect('/')
  }

  static delete(req, res) {
    const { id } = req.params
    const index = data.findIndex((product) => product.id == id)
    data.splice(index, 1)

    fs.writeFileSync(
      path.join(__dirname, '../db/products.json'),
      JSON.stringify(data, null, 2)
    )

    res.redirect('/products/create')
  }

  static formatearPrecio(precio) {
    // Convierte el precio a string para contar la cantidad de dígitos
    let precioString = precio.toString()

    // Determina la cantidad de dígitos
    let longitud = precioString.length

    // Si tiene 3 o menos dígitos, simplemente devolver el precio original
    if (longitud <= 3) {
      return parseInt(precioString)
    }

    // Calcula la posición donde se insertará el punto decimal
    let posicionPuntoDecimal = longitud % 3
    if (posicionPuntoDecimal === 0) {
      posicionPuntoDecimal = 3
    }

    // Construye el precio formateado
    let precioFormateado = precioString.substring(0, posicionPuntoDecimal) // Parte entera
    for (let i = posicionPuntoDecimal; i < longitud; i += 3) {
      precioFormateado += '.' + precioString.substring(i, i + 3) // Parte decimal
    }

    return parseFloat(precioFormateado)
  }
}

module.exports = productsController
