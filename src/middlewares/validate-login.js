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

const validationErrorsLogin = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  res.render('login', {
    old: req.body,
    isLogged: req.session.isLoggedIn,
    errors: errors.mapped(),
  })
}

module.exports = {
  validateLogin,
  validationErrorsLogin,
}
