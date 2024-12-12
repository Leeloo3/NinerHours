const express = require('express');
const passport = require('passport');
const router = express.Router();

// Auth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Callback route for Google to redirect to
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/users/login'
}), (req, res) => {
    req.flash('success', 'You have successfully logged in with Google');
    res.redirect('/users/profile');
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You have successfully logged out');
    res.redirect('/');
});

module.exports = router;
