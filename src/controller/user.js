const data = require('../db/users')
const db = require('../database/models')
const admins = require('../db/admins')
const fs = require('node:fs')
const path = require('node:path')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

class userController {
  // renderizado de vistas
  static loginPage(req, res) {
    res.render('login')
  }

  static registerPage(req, res) {
    res.render('register')
  }

  static allUsers(req, res) {
    res.render('users', { users: data })
  }

  // proceso de registro de usuario
  static createUser(req, res) {
    const { name, lastname, email, telephone, password } =
      req.body
    const photoUserProfile = req.file
    const user = {
      id: crypto.randomUUID(),
      name: name,
      lastname: lastname,
      email: email,
      telephone: telephone || '',
      password: bcrypt.hashSync(password, 10),
      photo: {
        id: crypto.randomInt(1, 1000000),
        name: photoUserProfile.filename ?? 'default-user.jpg',
      },
      roles_id: userController.assignRoleUser(name, lastname, email),
    }

    try {
      db.Users.create(user,{
        include: [{association: 'photo'}]
      }).then(() => {
        res.redirect('/user/login')
      })
    } catch (error) {
      console.error('Error al crear usuario:', error)
      return res.render('register', {
        errors: { msg: 'Hubo un problema al registrar el usuario' },
      })
    }
  }

  // proceso de inicio de sesión
  static loginUser(req, res) {
    const { email, password } = req.body
    let userToLogin
    try {
      db.Users.findOne({
        where: {
          email: email
        }
      }).then((user) => {
        if (bcrypt.compareSync(password, user.password)) {
          userToLogin = user
        }
        if (!userToLogin) {
          return res.render('login', {
            errors: { msg: 'El email o la contraseña son incorrectos' },
          })
        }
        req.session.loggedUser = userToLogin
        return res.redirect('/')
      })
    } catch (error) {
      console.error('Error al comparar contraseñas:', error)
      return res.render('login', {
        errors: { msg: 'Hubo un problema al iniciar sesión' },
      })
    }
  }

  // proceso de cierre de sesión
  static logoutUser(req, res) {
    req.session.destroy()
    res.redirect('/user/login')
  }
  
  // proceso de edición de perfil
  static editProfile(req, res) {}

  // proceso de visualización de perfil
  static userProfile(req, res) {}

  // proceso de edición de usuario
  static updateUser(req, res) {}

  // proceso de eliminación de usuario
  static deleteUser(req, res) {}

  // asignación de roles a los usuarios
  static assignRoleUser(name, lastname, email) {
    let role = 0
    for (let i = 0; i < admins.length; i++) {
      if (
        admins[i].name.includes(name) &&
        admins[i].lastname.includes(lastname) &&
        admins[i].email === email
      ) {
        // si el usuario es un administrador
        role = 2
        break
      } else {
        // si el usuario es un cliente
        role = 1
        break
      }
    }
    return role
  }
}

module.exports = userController
