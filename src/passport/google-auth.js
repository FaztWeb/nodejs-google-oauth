const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const url = require('url');

const { google } = require('../keys');

const User = require('../models/user.model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use(
    new GoogleStrategy({
        clientID: google.clientID,
        clientSecret: google.clientSecret,
        callbackURL: google.callbackURL
    }, async (accessToken, refreshToken, profile, done) => {
        const { displayName, id } = profile;
        const imageURL = url.parse(profile._json.image.url);
        const image = imageURL.protocol + imageURL.host + imageURL.pathname;

        const user = await User.findOne({ googleId: id });

        if (user) {
            done(null, user);            
        }
        else {
            // Save User Information
            const newUser = new User({
                username: displayName,
                googleId: id,
                photo: image,
                googlePlusUrl: profile._json.url
            });
            await newUser.save();
            done(null, newUser);
        }
    })
);