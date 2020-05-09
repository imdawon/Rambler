require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const passport = require('passport');
const passportSetup = require('./middleware/passport')

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rambler", {
  // use mongodb v4 connection settings
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    // secure: true
    sameSite: true}
});

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/google-auth',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get('/google-auth/callback', 
  passport.authenticate('google'), (req, res) => {
  res.send('you reached callback URI');
});

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
