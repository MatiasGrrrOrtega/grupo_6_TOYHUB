const data = require('../model/products')
const dataMarcas = require('../model/marcas')
class homeController {
  static renderHome(req, res) {
    res.render('home', { products: data.products, marcas: dataMarcas.marcas })
  }
}

module.exports = homeController
