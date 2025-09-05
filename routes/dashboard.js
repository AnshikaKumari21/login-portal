const router = require('express').Router();
const ensureAuth = require('../middleware/auth');
const User = require('../models/User');

// Dashboard - list all users
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.userId).lean();

    // If profile details not filled, redirect to profile page
    if (!currentUser.profile || !currentUser.profile.branch) {
      req.session.message = 'Please fill your profile details first';
      return res.redirect('/profile');
    }

    const users = await User.find().lean(); // all users
    res.render('dashboard', { users, userName: req.session.userName, message: req.session.message });
    delete req.session.message;
  } catch (err) {
    console.error(err);
    req.session.message = 'Failed to load dashboard';
    res.redirect('/');
  }
});

// Edit user page (your own profile or other users)
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) {
      req.session.message = 'User not found';
      return res.redirect('/dashboard');
    }
    res.render('edit-user', { user, message: req.session.message });
    delete req.session.message;
  } catch (err) {
    console.error(err);
    req.session.message = 'Cannot load edit page';
    res.redirect('/dashboard');
  }
});

// Update user
router.post('/update/:id', ensureAuth, async (req, res) => {
  try {
    const { name, branch, year, phone, address } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
      name,
      profile: { branch, year, phone, address }
    });
    req.session.message = 'User updated successfully';
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    req.session.message = 'Failed to update user';
    res.redirect('/dashboard');
  }
});

// !!! Export router !!!
module.exports = router;
