const data = require('../data/users')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
class userController {
  static renderLogin(req, res) {
    res.render('login')
  }

  static renderRegister(req, res) {
    res.render('register')
  }

  static renderAllUsers(req, res) {
    res.render('users', { users: data })
  }

  static createUser(req, res) {
    const { name, lastname, email, telephone, password, confirm_password } =
      req.body
    const photoUserProfile = req.file
    const user = {
      id: crypto.randomUUID(),
      name,
      lastname,
      email,
      photo: photoUserProfile || '',
      telephone: telephone || '',
      password,
      confirm_password,
    }
    console.log(user)
    data.push(user)

    fs.writeFileSync(
      path.join(__dirname, '..', 'data', 'users.json'),
      JSON.stringify(data, null, 2),
      { encoding: 'utf8' }
    )

    res.redirect('/user/login')
  }

  static updateUser(req, res) {}

  static deleteUser(req, res) {}

  static loginUser(req, res) {}

  static logoutUser(req, res) {}

  static renderProfile(req, res) {}

  static renderEditProfile(req, res) {}

  static renderUser(req, res) {}
}

module.exports = userController
