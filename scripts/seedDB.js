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
            "id": "7022574",
            "name": "Bridle Trails State Park - Outer Loop",
            "location": "Yarrow Point, Washington",
            "length": "4.4",
            "latitude": "47.6551",
            "longitude": "-122.1847",
            "ascent": "231",
            "img": "https://cdn-files.apstatic.com/hike/7044485_small_1555530429.jpg",
            "summary": "A great loop around Bridle Trails State Park, with rolling hills and green forests.",
            "url": "https://www.hikingproject.com/trail/7022574/bridle-trails-state-park-outer-loop"
        }
      ],
    log: [
      {
        
        "id": "7022574",
        "name": "Bridle Trails State Park - Outer Loop",
        "location": "Yarrow Point, Washington",
        "length": "4.4",
        "latitude": "47.6551",
        "longitude": "-122.1847",
        "ascent": "231",
        "img": "https://cdn-files.apstatic.com/hike/7044485_small_1555530429.jpg",
        "summary": "A great loop around Bridle Trails State Park, with rolling hills and green forests.",
        "url": "https://www.hikingproject.com/trail/7022574/bridle-trails-state-park-outer-loop"
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
