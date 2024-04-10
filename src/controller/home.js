const dataProducts = require('../data/products')
const dataMarcas = require('../data/marcas')
const dataUsers = require('../data/users')

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
