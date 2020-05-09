var passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var RamblerUser = require('../models/rambler-users');

// Telling passport we want to use a Google Strategy. In other words, we want login with a google sign-in
passport.use(
    new GoogleStrategy({
        // options for google strat
        callbackURL: '/google-auth/callback',
        clientID: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET
    },
        (accessToken, refreshToken, profile, done) => {
            // Check if user exists in db
            RamblerUser.findOne({ googleId: profile.id })
                .then((currentUser) => {
                    if (currentUser) {
                        // already have the user
                        console.log('user is: ', currentUser);
                    } else {
                        // if not, create user in db
                        new RamblerUser({
                            user: profile.displayName,
                            googleId: profile.id
                        }).save().then((newUser) => {
                            console.log('new user created', newUser);
                        })
                    }
                })
        })
)

module.exports = passport;