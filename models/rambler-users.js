
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const rambleUserSchema = new Schema({
  user: { 
      type: String, 
      required: true,
      unique: true
    },
  favorites: [{id: Number}],
  completed: [{id: Number}]
  
});

const RambleUser = mongoose.model("RambleUser", rambleUserSchema);

module.exports = RambleUser;
