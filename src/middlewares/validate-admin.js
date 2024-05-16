function validateUserAdmin(req, res, next) {
  let user = req.session.loggedUser
  let isAdmin = user.roles_id
  if (isAdmin === 2) {
    next()
  } else {
    res.redirect('/')
  }
}

module.exports = { validateUserAdmin }
