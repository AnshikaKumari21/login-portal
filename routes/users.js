const router = require('express').Router();
const ensureAuth = require('../middleware/auth');
const User = require('../models/User');

// GET profile form
router.get('/profile', ensureAuth, async (req, res) => {
  res.render('profile', { message: req.session.message });
});

// POST profile form
router.post('/profile', ensureAuth, async (req, res) => {
  try {
    const { branch, year, phone, address } = req.body;
    await User.findByIdAndUpdate(req.session.userId, {
      profile: { branch, year, phone, address }
    });
    req.session.message = 'Profile details saved!';
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    req.session.message = 'Failed to save profile';
    res.redirect('/profile');
  }
});

module.exports = router;
