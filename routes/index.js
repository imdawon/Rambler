const path = require("path");
const router = require("express").Router();
const passport = require('passport');
const passportSetup = require('../middleware/passport');
const apiRoutes = require("./api");
const axios = require('axios');

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
  res.redirect(`/`);
  console.log(`req.user values: ${req.user}`);
});

router.get('/getUserInfo',
  (req,res)=>{
    res.send(req.user);
  });

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

module.exports = router;
