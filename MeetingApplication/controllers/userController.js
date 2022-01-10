const bcrypt = require("bcryptjs");
const User = require("../models/user");

/**
 * User controller to find registered user using user_id.
 * @param {string} user_id - User id of the user to be searched
 * @return {mongoose.object} - User with input user id
 */
const findUserById = async (user_id) => {
  let found_user = await User.findOne({ user_id });
  if (found_user) return found_user;
  return null;
};

/**
 * User controller to register new user
 * @param {object} - Object containing new user details
 * @return {mongoose.object} - Registered user
 */
const registerUser = async ({ registration_name, user_id, password }) => {
  let alreadyUser = await findUserById(user_id);
  // if user with same user_id already exists
  if (alreadyUser) return null;
  const newUser = await new User({
    registration_name,
    user_id,
    password,
  });
  //save hashed password
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;
  } catch {
    console.log("Error occured while hashing. ");
  }
  return await newUser.save();
};

/**
 * Remove meeting id from user's meeting
 * @param {string} user_id - user id
 * @param {string} meeting_id - meeting_id
 */
const removeMeetingFromUser = async (user_id, meeting_id) =>
  await User.updateOne({ user_id }, { $pull: { meetings: `${meeting_id}` } });

/**
 * Add meeting to user's meetings
 * @param {string} user_id - user id
 * @param {string} meeting_id - meeting_id
 */
const addMeetingToUser = async (user_id, meeting_id) =>
  await User.updateOne({ user_id }, { $push: { meetings: `${meeting_id}` } });

/**
 * Remove team from user
 * @param {string} user_id - user id
 * @param {string} team_id - team_id
 */
const removeTeamFromUser = async (user_id, team_id) =>
  await User.updateOne({ user_id }, { $pull: { teams: `${team_id}` } });

/**
 * Add team to user
 * @param {string} user_id - user id
 * @param {string} team_id - team_id
 */
const addTeamToUser = async (user_id, team_id) =>
  await User.updateOne({ user_id }, { $push: { teams: `${team_id}` } });

module.exports = {
  registerUser,
  findUserById,
  removeMeetingFromUser,
  addMeetingToUser,
  removeTeamFromUser,
  addTeamToUser,
};
