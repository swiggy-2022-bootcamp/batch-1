const Meeting = require("../models/meeting");

/**
 * Meeting controller to find registered meeting using meeting_id.
 * @param {string} meeting_id - Meeting_id of the meeting to be searched
 * @return {mongoose.object} - meeting with meeting_id==meeting_id
 */
const findMeetingById = async (meeting_id) => {
  let found_meeting = await Meeting.findOne({ meeting_id }).select({
    _id: 0,
    __v: 0,
  });
  if (found_meeting) {
    return found_meeting;
  }
  return null;
};

/**
 * Meeting controller to register a new meeting.
 * @param {object} - Object containing meeting details.
 * @return {mongoose.object} - Newly registered meeting.
 */
const registerMeeting = async (meeting_details) => {
  const newMeeting = await new Meeting(meeting_details);
  return await newMeeting.save();
};

/**
 * Meeting controller to reschedule registered meeting using meeting_id.
 * @param {object} - Object containing updated meeting details.
 */
const rescheduleMeeting = async ({
  meeting_id,
  new_start_time,
  new_end_time,
}) => {
  await Meeting.updateOne(
    { meeting_id },
    {
      start_time: new_start_time,
      end_time: new_end_time,
    }
  );
};

/**
 * Meeting controller to add an attendee to meeting.
 * @param {string} meeting_id - Meeting id from which user is to be added.
 * @param {string} user_id - User id of the newly added user
 */
const addAttendeeToMeeting = async (meeting_id, user_id) =>
  await Meeting.updateOne(
    { meeting_id },
    { $push: { attendees: `${user_id}` } }
  );

/**
 * Meeting controller to remove an attendee from meeting.
 * @param {string} meeting_id - Meeting id from which user is to be removed
 * @param {string} user_id - User id of the removed user
 */
const removeAttendeeFromMeeting = async (meeting_id, user_id) =>
  await Meeting.updateOne(
    { meeting_id },
    { $pull: { attendees: `${user_id}` } }
  );

/**
 * Meeting controller to find all meetings between start date and end date
 * @param {string} user_id - User id
 * @param {Date.object} starting_date - Starting date for meeting start time
 * @param {Date.object} ending_date - Ending date for meeting start time
 * @return {[Mongoose.object]} - Array of meetings between specfied range
 */
const findAllMeetingsBetween = async (user_id, starting_date, ending_date) => {
  // set starting_date time to day start
  // set ending_date time to day end
  starting_date.setHours(0, 0, 0, 0);
  ending_date.setHours(23, 59, 59, 59);
  const meetings = await Meeting.find({
    start_time: {
      $gte: starting_date,
      $lt: ending_date,
    },
    attendees: user_id,
  }).sort({ start_time: "asc" });
  return meetings;
};

module.exports = {
  registerMeeting,
  findMeetingById,
  findAllMeetingsBetween,
  addAttendeeToMeeting,
  removeAttendeeFromMeeting,
  rescheduleMeeting,
};
