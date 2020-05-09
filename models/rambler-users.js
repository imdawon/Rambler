const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rambleUserSchema = new Schema({
  user: { 
      type: String, 
      required: true,
      unique: true
    },
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  favorites: [ Number ],
  completed: [ Number ]
  
});

const RambleUser = mongoose.model("RambleUser", rambleUserSchema);

module.exports = RambleUser;