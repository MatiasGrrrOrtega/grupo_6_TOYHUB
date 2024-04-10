function validateSession(req, res, next) {
  if (req.session.isLoggedIn) {
    next()
  } else {
    res.redirect('/user/login')
  }
}

module.exports = { validateSession }
