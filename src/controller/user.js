const data = require('../data/users')
const fs = require('node:fs')
const path = require('node:path')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

class userController {
  // renderizado de vistas
  static renderLogin(req, res) {
    res.render('login', { isLogged: req.session.isLoggedIn })
  }

  static renderRegister(req, res) {
    res.render('register', { isLogged: req.session.isLoggedIn })
  }

  static renderAllUsers(req, res) {
    res.render('users', { users: data })
  }

  static renderEditProfile(req, res) {}

  static renderUserProfile(req, res) {}

  // proceso de registro de usuario
  static registerUser(req, res) {
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
      password: bcrypt.hashSync(password, 10),
      confirm_password: bcrypt.hashSync(confirm_password, 10),
      role: 'user',
    }

    data.push(user)
    fs.writeFileSync(
      path.join(__dirname, '..', 'data', 'users.json'),
      JSON.stringify(data, null, 2),
      { encoding: 'utf8' }
    )
    res.redirect('/user/login')
  }

  // proceso de edición de usuario
  static updateUser(req, res) {}

  // proceso de eliminación de usuario
  static deleteUser(req, res) {}

  static getUsers() {
    let userJSON = fs.readFileSync(path.join(__dirname, '../data/users.json'), {
      encoding: 'utf-8',
    })

    let users

    if (userJSON == '') {
      users = []
    } else {
      users = JSON.parse(userJSON)
    }

    return users
  }

  // proceso de inicio de sesión
  static loginUser(req, res) {
    const { email, password } = req.body
    const users = userController.getUsers()
    let userToLogin
    try {
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
          // bcrypt.compareSync(users[i].password, password)
          if (password == users[i].password) {
            userToLogin = users[i]
            break
          }
        }
      }
    } catch (error) {
      console.error('Error al comparar contraseñas:', error)
      return res.render('login', {
        errors: { msg: 'Hubo un problema al iniciar sesión' },
      })
    }

    if (userToLogin === undefined) {
      return res.render('login', {
        errors: {
          msg: 'El correo o la contraseña son incorrectos',
        },
      })
    }
    console.log('validateUserAdmin', req.url)
    req.session.loggedUser = userToLogin
    req.session.isLoggedIn = true

    return res.redirect('/')
  }

  // proceso de cierre de sesión
  static logoutUser(req, res) {
    req.session.destroy()
    res.redirect('/user/login')
  }
}

module.exports = userController
