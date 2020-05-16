const mongoose = require("mongoose");
const db = require('../models/rambler-users');

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rambler", {
    // use mongodb v4 connection settings
    useNewUrlParser: true,
  });

const ramblerUserSeed = [
    {
        user: "scuba_steve",
        bucketlist: [
          {
            "id": "7027304",
            "name": "Cougar Mountain Red Town Loop",
            "location": "Newcastle, Washington",
            "length": "5.1",
            "ascent": "690",
            "img": "https://cdn-files.apstatic.com/hike/7031970_small_1554932139.jpg"
        }
      ],
    log: [
      {
        "id": "7027304",
        "name": "Cougar Mountain Red Town Loop",
        "location": "Newcastle, Washington",
        "length": "5.1",
        "ascent": "690",
        "img": "https://cdn-files.apstatic.com/hike/7031970_small_1554932139.jpg"
      }
    ]
  }
];

db
.remove({})
.then(() => db.collection.insertMany(ramblerUserSeed))
.then(data => {
    console.log("Seed user: ", data)
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
