const path = require("path");
const router = require("express").Router();
const passport = require('passport');
const passportSetup = require('../middleware/passport');
const apiRoutes = require("./api");

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

router.get('/google-auth',
  passport.authenticate('google', { scope: ['profile'] }, (req, res) => {
    console.log('/google-auth route hit!')
  })
);

router.get('/google-auth/callback', 
  passport.authenticate('google'), (req, res) => {
   console.log(req);
  res.redirect(`/?code=${req.query.code}`);
});

module.exports = router;
