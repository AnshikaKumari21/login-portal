const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Login page
router.get('/', (req, res) => res.render('login'));

// Signup page
router.get('/signup', (req, res) => res.render('signup'));

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    req.session.message = 'Passwords do not match.';
    return res.redirect('/signup');
  }
  const existing = await User.findOne({ email });
  if (existing) {
    req.session.message = 'Email already registered.';
    return res.redirect('/');
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  req.session.userId = user._id;
  req.session.userName = user.name;
  res.redirect('/dashboard');
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    req.session.message = 'Invalid credentials.';
    return res.redirect('/');
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    req.session.message = 'Invalid credentials.';
    return res.redirect('/');
  }
  req.session.userId = user._id;
  req.session.userName = user.name;
  res.redirect('/dashboard');
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
