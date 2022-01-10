const { Router } = require("express");
const router = Router();
const { sendResponse } = require("../utils/response");
const { nanoid } = require("nanoid");
const {
  findUserById,
  addTeamToUser,
  removeTeamFromUser,
} = require("../controllers/userController");
const {
  findTeamById,
  registerTeam,
  removeMemberFromTeam,
  addMemberToTeam,
} = require("../controllers/teamController");

// create new team
router.post("/", async (req, res) => {
  let { team_name, description, email_ids_of_members } = req.body.team;
  let userid = req.session.passport.username;

  // convert email ids string to array
  if (email_ids_of_members.length !== 0) {
    members = email_ids_of_members.split(",");
    // only add valid user ids to members list
    members = members.filter(async (val) => {
      return await findUserById(val);
    });
  } else {
    members = [];
  }
  // add team creator to the list of members
  members.push(userid);

  let reg_team = await registerTeam({
    team_id: nanoid(),
    created_by: userid,
    team_name,
    description,
    members,
  });
  if (!reg_team) return sendResponse(res, 401, "Team could not be created.");
  let team_id = reg_team.team_id;
  for (let i = 0; i < members.length; i++) {
    await addTeamToUser(members[i], team_id);
  }
  sendResponse(res, 201, "Team created successfully.", { team_id });
});

// search team by id
router.get("/search", async (req, res) => {
  let userid = req.session.passport.username;
  let { teamId } = req.body;
  let team = await findTeamById(teamId);
  if (!team) return sendResponse(res, 401, "Incorrect team id.");
  else if (!team.members.includes(userid))
    return sendResponse(
      res,
      401,
      "Not authorized. Only members can view team details."
    );
  sendResponse(res, 201, "Team found successfully.", { team });
});

// add new members to team
router.post("/:teamId/add", async (req, res) => {
  const { teamId } = req.params;
  let team = await findTeamById(teamId);
  let current_user = req.session.passport.username;
  if (!team) return sendResponse(res, 401, "Invalid Team ID.");
  else if (team.created_by !== current_user)
    return sendResponse(
      res,
      401,
      "Not authorized. Only team creator can add new member."
    );

  // userId that needs to be added to team
  let { userId } = req.body.user_detail;
  if (!findUserById(userId)) return sendResponse(res, 401, "Invalid User ID.");
  // user id already added to team
  else if (team.members.includes(userId))
    return sendResponse(res, 401, "User is already a member.");
  await addMemberToTeam(teamId, userId);
  await addTeamToUser(userId, teamId);
  sendResponse(res, 201, "Successfully added user to team");
});

// remove any current attendee from team
router.post("/:teamId/remove", async (req, res) => {
  const { teamId } = req.params;
  let team = await findTeamById(teamId);
  let current_user = req.session.passport.username;
  if (!team) return sendResponse(res, 401, "Invalid team ID.");
  else if (team.created_by !== current_user)
    return sendResponse(
      res,
      401,
      "Not authorized. Only team creator can remove the members."
    );

  // userId that needs to be added to team
  let { userId } = req.body.user_detail;
  if (!findUserById(userId)) return sendResponse(res, 401, "Invalid User ID.");
  // user id is already not present in the team
  else if (!team.members.includes(userId))
    return sendResponse(res, 401, "User is already not an attendee.");
  // remove the team from user
  await removeMemberFromTeam(teamId, userId);
  await removeTeamFromUser(userId, teamId);
  sendResponse(res, 201, "Successfully removed user from team.");
});

module.exports = router;
