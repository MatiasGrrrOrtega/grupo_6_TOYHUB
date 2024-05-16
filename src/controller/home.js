const db = require('../database/models')
const dataMarcas = require('../db/marcas')

class homeController {
  static home(req, res) {
    try{
      db.Products.findAll({
        include: [ {association: 'images'} ]
      }).then(products => {
        res.render('home', {
          products: products,
          marcas: dataMarcas.marcas,
          user: req.session.loggedUser,
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = homeController

