const dataProducts = require('../data/products')
const dataMarcas = require('../data/marcas')
const USERS = require('../data/users')

class homeController {
  static renderHome(req, res) {
    res.render('home', {
      products: dataProducts,
      marcas: dataMarcas.marcas,
      usuario: USERS.users,
    })
  }
}

module.exports = homeController
