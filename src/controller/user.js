const data = require('../data/users')
const fs = require('node:fs')
const path = require('node:path')
const crypto = require('crypto')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

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

  static loginUser(req, res) {
    const { email, password } = req.body
    const errors = validationResult(req)
    let userToLogin
    if (!errors.isEmpty()) {
      return res.render('login', { errors: errors.mapped(), oldData: req.body })
    } else {
      try {
        let userJSON = fs.readFileSync(
          path.join(__dirname, '../data/users.json'),
          {
            encoding: 'utf-8',
          }
        )
        let users
        if (userJSON == '') {
          users = []
        } else {
          users = JSON.parse(userJSON)
        }

        for (let i = 0; i < users.length; i++) {
          if (users[i].email == email) {
            //console.log(bcrypt.compareSync(users[i].password, password))
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
            msg: 'El correo o la contraseña son incorrectos. O no esta registrado',
          },
        })
      }

      req.session.loggedUser = userToLogin
      req.session.isLoggedIn = true

      return res.redirect('/')
    }
  }

  static logoutUser(req, res) {
    req.session.destroy()
    res.redirect('/user/login')
  }

  static renderProfile(req, res) {
    res.render('profile', { user: req.session.loggedUser })
  }

  static renderEditProfile(req, res) {}

  static renderUser(req, res) {}
}

module.exports = userController
