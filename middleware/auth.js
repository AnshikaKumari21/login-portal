module.exports = function ensureAuth(req, res, next) {
  if (req.session && req.session.userId) return next();
  req.session.message = 'Please log in first.';
  return res.redirect('/');
};
