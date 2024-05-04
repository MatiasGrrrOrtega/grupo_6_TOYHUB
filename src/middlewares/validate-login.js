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

const userIsLogged = (req, res, next) => {
  if (req.session.isLoggedIn) {
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
    req.session.isLoggedIn = false
    res.render('login', {
      oldData: req.body,
      isLogged: {
        userLogged: req.session.isLoggedIn,
        userBody: req.session.loggedUser,
      },
      errors: errors.mapped(),
    })
  }
}

module.exports = {
  validateLogin,
  validationErrorsLogin,
  userIsLogged,
}
