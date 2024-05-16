const { check, validationResult } = require('express-validator')

const validateLogin = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is invalid')
    .bail(),
  check('password').notEmpty().withMessage('Password is required'),
]

const validateUserLogged = (req, res, next) => {
  if (req.session.loggedUser == undefined) {
    res.redirect('/')
  } else {
    next()
  }
}

const validationErrorsLogin = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  } else {
    res.render('login', {
      oldData: req.body,
      errors: errors.mapped(),
    })
  }
}

module.exports = {
  validateLogin,
  validationErrorsLogin,
  validateUserLogged,
}
