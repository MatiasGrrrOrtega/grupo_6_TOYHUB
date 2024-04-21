function validateUserAdmin(req, res, next) {
  console.log(req.session.isLoggedIn)
  const user = req.session.loggedUser
  const isAdmin = user.role
  if (isAdmin === 'admin') {
    next()
  } else {
    res.redirect('/')
  }
}

module.exports = { validateUserAdmin }
