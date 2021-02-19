const express = require('express');
const passport = require('passport');

const router = express.Router();
const googleAuthController = require('../../controllers/auth/googleAuthController');
// const validator = require('../../middlewares/validators/auth/localAuthValidator');

// Google OAuth APIs for login and redirect to callback
router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/login/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleAuthController.loginCallback);

module.exports = router;
