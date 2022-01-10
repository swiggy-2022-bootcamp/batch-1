const mongoose = require("mongoose");
const shortid = require("shortid");

//creating user schema to store user info in database
const TeamSchema = new mongoose.Schema({
  team_id: {
    type: String,
    default: shortid.generate(),
  },
  team_name: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  //team members
  members: {
    type: Array,
    default: [],
  },
});
//creating model
const Team = mongoose.model("Team", TeamSchema);
//exporting model
module.exports = Team;
