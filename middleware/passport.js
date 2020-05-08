var passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var db = require('../models/rambler-users');

// Telling passport we want to use a Google Strategy. In other words, we want login with a google sign-in
passport.use(
    new GoogleStrategy({
        // options for google atart
        callbackURL: '/google-auth',
        clientID: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET
    }, function (accessToken, refreshToken, profile, cb) {
        // passport callback function
        db.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        })
    })
)

module.exports = passport;