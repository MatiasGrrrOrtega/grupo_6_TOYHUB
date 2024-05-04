const { check, validationResult } = require('express-validator')
const dataUsers = require('../db/users.json')
const validateRegister = [
  check('name')
    .notEmpty()
    .withMessage('Debe ingresar nombre de usuario')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Nombre demasiado corto'),

  check('lastname')
    .notEmpty()
    .withMessage('Debe ingresar apellido de usuario')
    .bail(),

  check('email')
    .notEmpty()
    .withMessage('Debe ingresar email')
    .bail()
    .isEmail()
    .withMessage('Debe ingresar un email valido')
    .custom((value, { req }) => {
      const user = dataUsers.find((user) => user.email === value)
      if (user) {
        throw new Error('El email ya se encuentra registrado')
      }
      return true
    }),
  check('password')
    .notEmpty()
    .withMessage('Debe ingresar password')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Contraseña demasiado corta'),

  check('confirm_password')
    .notEmpty()
    .withMessage('Debe confirmar password')
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('No coinciden los password')
      }
      return true
    }),

  check('photo').custom((value, { req }) => {
    let file = req.file
    if (!file) {
      throw new Error('Debes subir una foto de perfil')
    }
    return true
  }),
]

const validationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  res.render('register', {
    old: req.body,
    errors: errors.mapped(),
    isLogged: { userLogged: req.session.isLoggedIn },
  })
}

module.exports = { validateRegister, validationErrors }
