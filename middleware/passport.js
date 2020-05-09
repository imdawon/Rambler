var passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var RamblerUser = require('../models/rambler-users');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    RamblerUser.findById(id).then((user) => {
        done(null, user.id);
    });
});

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
                        done(null, currentUser);
                    } else {
                        // if not, create user in db
                        new RamblerUser({
                            user: profile.displayName,
                            googleId: profile.id
                        }).save().then((newUser) => {
                            console.log('new user created', newUser);
                            done(null, newUser);
                        })
                    }
                })
        })
)

module.exports = passport;