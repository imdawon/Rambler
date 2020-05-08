var passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var db = require('../models/rambler-users');

// Telling passport we want to use a Google Strategy. In other words, we want login with a google sign-in
passport.use(
    new GoogleStrategy({
        // options for google strat
        callbackURL: '/google-auth/callback',
        clientID: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET
    }, (accessToken, refreshToken, profile, done) => {
        console.log('passport callback function fired')
        console.log(profile)
    })
)

module.exports = passport;