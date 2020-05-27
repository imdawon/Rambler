const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const RamblerUser = require('../models/rambler-users');

// Set callbackURL route for google to send user to after being authenticated
// for production env or dev
const callbackURL = process.env.HEROKU_URL + '/google-auth/callback';

// Generate cookie based off userid
passport.serializeUser((user, done) => {
    console.log("SERIALIZED USER",user);
    done(null, user._id)
});

passport.deserializeUser((id, done) => {
    console.log("DESERIALIZED USER?",id);
    RamblerUser.findById(id).then((user) => {
        done(null, user);
    });
});

// Telling passport we want to use a Google Strategy. In other words, we want login with a google sign-in
passport.use(
    new GoogleStrategy({
        // options for google strat
        callbackURL: callbackURL,
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