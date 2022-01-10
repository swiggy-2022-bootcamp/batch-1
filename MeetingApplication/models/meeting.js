const mongoose = require("mongoose");
const shortid = require("shortid");
// create meeting schema to store meeting info in database
const MeetingSchema = new mongoose.Schema({
  meeting_id: {
    type: String,
    default: shortid.generate(),
  },
  description: {
    type: String,
  },
  created_by: {
    type: String,
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  // store user_id of attendees
  attendees: {
    type: Array,
    default: [],
  },
});
//creating model
const Meeting = mongoose.model("Meeting", MeetingSchema);
//exporting model
module.exports = Meeting;
