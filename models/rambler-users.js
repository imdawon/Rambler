
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ramblerUserSchema = new Schema({
  user: { 
      type: String, 
      required: true,
      unique: true
    },
  bucketlist: [[]],
  log: [[]]
});

const RamblerUser = mongoose.model("RamblerUser", ramblerUserSchema);

module.exports = RamblerUser;
