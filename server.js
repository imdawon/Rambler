require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const passport = require('passport');
const passportSetup = require('./middleware/passport');
const routes = require('./routes');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  mongoose.connect(process.env.MONGODB_URI, {
    // use mongodb v4 connection settings
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

} else {
  // Connect to the Mongo DB
  mongoose.connect("mongodb://localhost/rambler", {
    // use mongodb v4 connection settings
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
}

app.use(require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { sameSite: 'strict' }
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Define routes
app.use(routes);
// want react to read the query code it sends ater google sign in is complete
// do get or post to google to verify the code is valid
// based on JWT validity, pass user either to the desired location, or back to login saying login failed

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});


