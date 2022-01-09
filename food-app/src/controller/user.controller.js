const { User } = require("../models");
const { sendJSONResponse, sendBadRequest } = require("../utils/handle");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return sendJSONResponse(res, 200, "All Users", users);
  } catch (error) {
    console.log(error);
    return sendBadRequest(res, 400, `Error : ${error.message}`);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await User.findOne({ id: userID });
    if (!user) {
      return sendBadRequest(res, 404, `Sorry user With  userId ${userID} not found`);
    }
    return sendJSONResponse(res, 200, "User Detail", user);
  } catch (error) {
    console.log(error);
    return sendBadRequest(res);
  }
};
