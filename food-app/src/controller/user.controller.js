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
