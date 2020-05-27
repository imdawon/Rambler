const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ramblerUserSchema = new Schema({
  user: { 
      type: String, 
      required: true,
      unique: true
    },
  bucketlist: [
    {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      latitude: {
        type: Number
      },
      longitude: {
        type: Number
      },
      length: {
        type: Number
      },
      ascent: {
        type: Number
      },
      imgMedium: {
        type: String
      },
      summary: {
        type: String
      },
      url: {
        type: String
      },
      trailType: {
        type: String
      },
      description: {
        type: String
      }
    }
  ],
  log: [
    {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      latitude: {
        type: Number
      },
      longitude: {
        type: Number
      },
      length: {
        type: Number
      },
      ascent: {
        type: Number
      },
      imgMedium: {
        type: String
      },
      summary: {
        type: String
      },
      url: {
        type: String
      }, 
      trailType: {
        type: String
      },
      description: {
        type: String
      }
    }
  ],
  googleId: {
    type: String,
    required: true,
    unique: true
  }
});

const RamblerUser = mongoose.model("RamblerUser", ramblerUserSchema);

module.exports = RamblerUser;
