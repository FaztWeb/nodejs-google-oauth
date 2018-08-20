const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const cookieSession = require('cookie-session');
const passport = require('passport');

const { session } = require('./keys');

// Google Oauth
require('./passport/google-auth');

// initializations
const app = express(); // express
require('./database'); // mongodb

// settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [session.key]
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.user = req.user;
    next();
});

// routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/user/', require('./routes/user'));

// server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});