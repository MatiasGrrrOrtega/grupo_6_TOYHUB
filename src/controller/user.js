class userController {
  static renderLogin(req, res) {
    res.render('login')
  }

  static renderRegister(req, res) {
    res.render('register')
  }
}

module.exports = userController
