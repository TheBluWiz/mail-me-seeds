const withAuth = (req, res, next) => {
  if (!req.session.login) res.render('login');
  else {
    next();
  }
}

module.exports = withAuth;