function validateSession(req, res, next) {
  if (req.session.isLoggedIn === true) {
    next()
  } else {
    res.redirect('/user/login')
  }
}

module.exports = { validateSession }
