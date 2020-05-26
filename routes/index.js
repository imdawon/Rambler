const path = require("path");
const router = require("express").Router();
const passport = require('passport');
const passportSetup = require('../middleware/passport');
const apiRoutes = require("./api");
const axios = require('axios');
const cheerio = require('cheerio');



router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin: *");
  next();
});

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
  
  router.post('/hikeDetails', (req, res) => {
   console.log(req.body)
   let hikesWithDetails = [];
   const hikeResults = req.body;
      hikeResults.map((hike, i) => {
            axios.get( hike.url)
                .then((res) => {
                    const $ = cheerio.load(res.data);
                    let type = $('.mb-quarter').html();
                    let summary = $('h3:contains("Description")').next().text();
                    let hikeData = { ...hike, trailType: type, description: summary };
                    hikesWithDetails.push(hikeData);
                })
                .then((hikesWithDetails) => {
                    console.log(hikesWithDetails);
                    res.send(hikesWithDetails)
                })
                .catch(err => console.log(err));
        });
  });

module.exports = router;
