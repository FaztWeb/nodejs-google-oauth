const router = require('express').Router();

const { checkAuth } = require('../passport/middlewares');

router.get('/profile', checkAuth, (req, res) => {
    res.render('profile');
});

module.exports = router;