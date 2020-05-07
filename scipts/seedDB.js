const mongoose = require("mongoose");
const db = require('../models/rambler-users');

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rambler", {
    // use mongodb v4 connection settings
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const ramblerUserSeed = [
    {
        user: "outdoor_steve",
        bucketlist: [{
            "ascent": "690",
            "conditionDate": "1970-01-01 00:00:00",
            "conditionDetails": "null",
            "conditionStatus": "Unknown",
            "descent": "- 676",
            "difficulty": "blue",
            "high": "1278",
            "id": "7027304",
            "imgMedium": "https://cdn-files.apstatic.com/hike/7031970_medium_1554932139.jpg",
            "imgSmall": "https://cdn-files.apstatic.com/hike/7031970_small_1554932139.jpg",
            "imgSmallMed": "https://cdn-files.apstatic.com/hike/7031970_smallMed_1554932139.jpg",
            "imgSqSmall": "https://cdn-files.apstatic.com/hike/7031970_sqsmall_1554932139.jpg",
            "latitude": "47.5346",
            "length": "5.1",
            "location": "Newcastle, Washington",
            "longitude": "-122.1286",
            "low": "676",
            "name": "Cougar Mountain Red Town Loop",
            "starVotes": "31",
            "stars": "4.5",
            "summary": "This well-maintained rolling loop is a treat just minutes from Seattle.",
            "type": "Hike",
            "url": "https://www.hikingproject.com/trail/7027304/cougar-mountain-red-town-loop"
        }],
    log: [
        {
            "ascent": "690",
            "conditionDate": "1970-01-01 00:00:00",
            "conditionDetails": "null",
            "conditionStatus": "Unknown",
            "descent": "- 676",
            "difficulty": "blue",
            "high": "1278",
            "id": "7027304",
            "imgMedium": "https://cdn-files.apstatic.com/hike/7031970_medium_1554932139.jpg",
            "imgSmall": "https://cdn-files.apstatic.com/hike/7031970_small_1554932139.jpg",
            "imgSmallMed": "https://cdn-files.apstatic.com/hike/7031970_smallMed_1554932139.jpg",
            "imgSqSmall": "https://cdn-files.apstatic.com/hike/7031970_sqsmall_1554932139.jpg",
            "latitude": "47.5346",
            "length": "5.1",
            "location": "Newcastle, Washington",
            "longitude": "-122.1286",
            "low": "676",
            "name": "Cougar Mountain Red Town Loop",
            "starVotes": "31",
            "stars": "4.5",
            "summary": "This well-maintained rolling loop is a treat just minutes from Seattle.",
            "type": "Hike",
            "url": "https://www.hikingproject.com/trail/7027304/cougar-mountain-red-town-loop"
        }]
    }
];

db.collection.insertMany(ramblerUserSeed)
.then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
