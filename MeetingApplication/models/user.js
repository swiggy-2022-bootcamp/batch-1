const mongoose = require("mongoose");
//creating user schema to store user info in database
const UserSchema = new mongoose.Schema({
  registration_name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  //teams created
  teams: {
    type: Array,
    default: [],
  },
  meetings: {
    type: Array,
    default: [],
  },
  team_meetings: {
    type: Array,
    default: [],
  },
});
//creating model
const User = mongoose.model("User", UserSchema);
module.exports = User;
