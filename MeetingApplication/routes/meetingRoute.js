const { Router } = require("express");
const router = Router();
const { sendResponse } = require("../utils/response");
const { getDateTime } = require("../utils/datetime");
const { validateDate } = require("../utils/validator");
const {
  findUserById,
  addMeetingToUser,
  removeMeetingFromUser,
} = require("../controllers/userController");
const {
  registerMeeting,
  findMeetingById,
  addAttendeeToMeeting,
  removeAttendeeFromMeeting,
  rescheduleMeeting,
} = require("../controllers/meetingController");

// create new meeting
router.post("/", async (req, res) => {
  let { meeting } = req.body;
  let userid = req.session.passport.username;
  let {
    date_of_meeting,
    start_time,
    end_time,
    description,
    email_ids_of_attendees,
  } = meeting;

  if (!validateDate(date_of_meeting))
    return sendResponse(res, 401, "Date of meeting is not valid");
  // converting date, start_time, end_time to Date Object for start time and end time
  let { s, e } = getDateTime(date_of_meeting, start_time, end_time);

  // convert email ids string to array
  if (email_ids_of_attendees.length !== 0) {
    attendees = email_ids_of_attendees.split(",");
    // only add valid user ids to attendees list
    attendees = attendees.filter(async (val) => {
      return await findUserById(val);
    });
  } else attendees = [];
  attendees.push(userid);

  let reg_meeting = await registerMeeting({
    created_by: userid,
    start_time: s,
    end_time: e,
    description,
    attendees,
  });
  if (!reg_meeting)
    return sendResponse(res, 401, "Meeting could not be created.");
  let meeting_id = reg_meeting.meeting_id;
  for (let i = 0; i < attendees.length; i++)
    await addMeetingToUser(attendees[i], meeting_id);
  sendResponse(res, 201, "Meeting created successfully.", { meeting_id });
});

// search meeting by id
router.get("/search", async (req, res) => {
  let userid = req.session.passport.username;
  let { meeting_id } = req.body;
  let meeting = await findMeetingById(meeting_id);
  if (!meeting) return sendResponse(res, 401, "Incorrect meeting id.");
  else if (!meeting.attendees.includes(userid))
    return sendResponse(
      res,
      401,
      "Not authorized. You are not an attendee of this meeting."
    );
  sendResponse(res, 201, "Meeting found successfully.", { meeting });
});

// add new attendee to meeting
router.post("/:meetingId/add", async (req, res) => {
  const { meetingId } = req.params;
  const meeting = await findMeetingById(meetingId);
  const current_user = req.session.passport.username;
  if (!meeting) return sendResponse(res, 401, "Invalid Meeting ID.");
  else if (meeting.created_by !== current_user)
    return sendResponse(
      res,
      401,
      "Not authorized. Only meeting creator can add new attendees."
    );

  // userId that needs to be added to meeting
  let { userId } = req.body.user_detail;
  if (!findUserById(userId)) return sendResponse(res, 401, "Invalid User ID.");
  // user id already added to meeting
  else if (meeting.attendees.includes[userId])
    return sendResponse(res, 401, "User is already an attendee.");
  await addAttendeeToMeeting(meetingId, userId);
  await addMeetingToUser(userId, meetingId);
  sendResponse(res, 201, "Successfully added user to meeting");
});

// remove any current attendee from meeting
router.post("/:meetingId/remove", async (req, res) => {
  const { meetingId } = req.params;
  let meeting = await findMeetingById(meetingId);
  let current_user = req.session.passport.username;
  if (!meeting) return sendResponse(res, 401, "Invalid Meeting ID.");
  else if (meeting.created_by !== current_user)
    return sendResponse(
      res,
      401,
      "Not authorized. Only meeting creator can remove the attendees."
    );

  // userId that needs to be added to meeting
  let { userId } = req.body.user_detail;
  if (!findUserById(userId)) return sendResponse(res, 401, "Invalid User ID.");
  // user id is already not present in the meeting
  else if (!meeting.attendees.includes[userId])
    return sendResponse(res, 401, "User is already not an attendee.");
  // remove the meeting from user
  await removeAttendeeFromMeeting(meetingId, userId);
  await removeMeetingFromUser(userId, meetingId);
  sendResponse(res, 201, "Successfully removed user from meeting");
});

// reschedule already registered meeting
router.post("/:meetingId/reschedule", async (req, res) => {
  const { meetingId } = req.params;
  let meeting = await findMeetingById(meetingId);
  let current_user = req.session.passport.username;
  if (!meeting) return sendResponse(res, 401, "Invalid Meeting ID.");
  else if (meeting.created_by !== current_user)
    return sendResponse(
      res,
      401,
      "Not authorized. Only meeting creator can reschedule the meeting."
    );

  const { new_date, new_start_time, new_end_time } = req.body;
  if (!validateDate(new_date))
    return sendResponse(res, 401, "Date of meeting is not valid");
  // converting date, start_time, end_time to Date Object for start time and end time
  let { s, e } = getDateTime(new_date, new_start_time, new_end_time);

  await rescheduleMeeting({
    meeting_id: meetingId,
    new_start_time: s,
    new_end_time: e,
  });
  sendResponse(res, 201, "Meeting rescheduled successfully.");
});

module.exports = router;
