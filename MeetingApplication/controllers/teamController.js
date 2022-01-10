const Team = require("../models/meeting");

/**
 * Team controller to find registered team using team_id.
 * @param {string} team_id - team_id of the team to be searched
 * @return {mongoose.object} - team id with the input team_id
 */
const findTeamById = async (team_id) => {
  let found_team = await Team.findOne({ team_id }).select({
    _id: 0,
    __v: 0,
  });
  if (found_team) return found_team;
  return null;
};

/**
 * Meeting controller to register a new team.
 * @param {object} - Object containing team details.
 * @return {mongoose.object} - Newly registered team.
 */
const registerTeam = async (team_details) => {
  const newTeam = await new Team(team_details);
  return await newTeam.save();
};

/**
 * Add new memeber to team.
 * @param {string} team_id - Team id from which user is to be added
 * @param {string} user_id - User id of the newly added member
 */
const addMemberToTeam = async (team_id, user_id) =>
  await Team.updateOne({ team_id }, { $push: { members: `${user_id}` } });

/**
 * Remove member from team.
 * @param {string} team_id - Team id from which user is to be removed
 * @param {string} user_id - User id of the to be removed member
 */
const removeMemberFromTeam = async (team_id, user_id) =>
  await Team.updateOne({ team_id }, { $pull: { members: `${user_id}` } });

module.exports = {
  findTeamById,
  registerTeam,
  addMemberToTeam,
  removeMemberFromTeam,
};
