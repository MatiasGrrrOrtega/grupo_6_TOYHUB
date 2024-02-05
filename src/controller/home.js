const data = require('../model/products')
const dataMarcas = require('../model/marcas')
const USERS = require('../model/users')

class homeController {
  static renderHome(req, res) {
    console.log(USERS.users)
    res.render('home', {
      products: data.products,
      marcas: dataMarcas.marcas,
      usuario: USERS.users,
    })
  }
}

module.exports = homeController
