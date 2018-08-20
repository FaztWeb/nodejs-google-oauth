const router = require('express').Router();
const passport = require('passport');

// Google OAUTH
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// Google Redirect Callback
router.get('/google/cb', passport.authenticate('google'), (req, res) => {
    res.redirect('/user/profile');
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;