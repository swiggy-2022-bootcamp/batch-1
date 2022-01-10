const { Router } = require("express");
const router = Router();
const { sendResponse } = require("../utils/response");
const {
  findUserById,
  removeMeetingFromUser,
  removeTeamFromUser,
} = require("../controllers/userController");
const {
  findMeetingById,
  removeAttendeeFromMeeting,
  findAllMeetingsBetween,
} = require("../controllers/meetingController");
const {
  findTeamById,
  removeMemberFromTeam,
} = require("../controllers/teamController");
const { validateDate } = require("../utils/validator");

// get all user meetings
router.get("/meetings", async (req, res) => {
  let { user_details } = req.body;
  // validate user details
  let user = await findUserById(user_details.user_id);
  if (!user) sendResponse(res, 401, "Invalid user id.");
  else {
    // find all meeting ids  and then covert them to whole meetings
    let meeting_ids = user.meetings;
    const addMeetings = async (meeting_ids) => {
      let all_meetings = [];
      for (let i = 0; i < meeting_ids.length; i++) {
        let meeting = await findMeetingById(meeting_ids[i]);
        all_meetings.push(meeting);
      }
      return all_meetings;
    };
    addMeetings(meeting_ids).then((meetings) =>
      sendResponse(res, 201, "User meetings found successfully.", { meetings })
    );
  }
});

// get all user meetings from starting date(00:00:00) till end date (23:59:59)
// if today is present in query paramaters, return today's user meetings
router.get("/meetings/period", async (req, res) => {
  const { today } = req.query;
  let starting_date, ending_date;
  if (today) {
    const d = new Date();
    starting_date = new Date();
    ending_date = new Date();
  } else {
    if (
      validateDate(req.body.starting_date) &&
      validateDate(req.body.ending_date)
    ) {
      starting_date = new Date(req.body.starting_date);
      ending_date = new Date(req.body.ending_date);
      starting_date.setHours(0, 0, 0, 0);
      ending_date.setHours(23, 59, 59, 59);
    } else {
      sendResponse(res, 401, "Incorrect input date format.");
    }
  }
  const user_id = req.session.passport.username;
  const meetings = await findAllMeetingsBetween(
    user_id,
    starting_date,
    ending_date
  );
  sendResponse(
    res,
    201,
    "User's meetings between start_time and end_time found.",
    { meetings }
  );
});

// excuse yourself from meeting
router.delete("/meetings/:meetingId", async (req, res) => {
  let { meetingId } = req.params;
  let userId = req.session.passport.username;
  let reg_user = await findUserById(userId);
  let reg_meeting = await findMeetingById(meetingId);
  // cannot user doesn't exists or meeting_id doesn't exists
  if (!reg_user) return sendResponse(res, 401, "User ID is incorrect.");
  else if (!reg_meeting)
    return sendResponse(res, 401, "Meeting ID is incorrect.");
  // already not this meeting attendee
  if (!reg_user.meetings.includes(meetingId))
    return sendResponse(
      res,
      401,
      "You are already not an attendee of this meeting."
    );

  //from meeting's attendees remove user_id
  await removeAttendeeFromMeeting(meetingId, userId);
  //from user's meeting remove meeting id
  await removeMeetingFromUser(userId, meetingId);
  sendResponse(res, 200, "You are dropped off from the meeting.");
});

// excuse yourself from team
router.delete("/teams/:teamId", async (req, res) => {
  let { teamId } = req.params;
  let userId = req.session.passport.username;
  let reg_user = await findUserById(userId);
  let reg_team = await findTeamById(teamId);

  // cannot user doesn't exists or team_id doesn't exists
  if (!reg_user) return sendResponse(res, 401, "User ID is incorrect.");
  else if (!reg_team) return sendResponse(res, 401, "Team ID is incorrect.");

  // already not this team member
  if (!reg_user.teams.includes(teamId))
    return sendResponse(res, 401, "You are already not a member of this team.");

  //from team's members remove user_id
  await removeMemberFromTeam(teamId, userId);
  //from user's team remove team id
  await removeTeamFromUser(userId, teamId);
  sendResponse(res, 201, "You have left the team successfully.");
});

module.exports = router;
