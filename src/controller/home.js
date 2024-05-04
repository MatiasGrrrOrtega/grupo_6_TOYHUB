const dataProducts = require('../db/products')
const dataMarcas = require('../db/marcas')
const dataUsers = require('../db/users')

class homeController {
  static renderHome(req, res) {
    res.render('home', {
      products: dataProducts,
      marcas: dataMarcas.marcas,
      usuario: dataUsers,
      isLogged: {
        userLogged: req.session.isLoggedIn,
        userBody: req.session.loggedUser,
      },
    })
  }
}

module.exports = homeController
