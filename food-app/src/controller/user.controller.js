const { User } = require("../models");
const { sendJSONResponse, sendBadRequest } = require("../utils/handle");
const bcrypt = require("bcryptjs");

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
      return sendBadRequest(
        res,
        404,
        `Sorry user With  userId ${userID} not found`
      );
    }
    return sendJSONResponse(res, 200, "User Detail", user);
  } catch (error) {
    console.log(error);
    return sendBadRequest(res);
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const { id, username, password, address, email } = req.body;
    let user = await User.findOne({ id: id });
    if (!user) {
      return sendBadRequest(res, 404, `Sorry user with ${id} not found`);
    }
    if (id != req.userID) {
      return sendBadRequest(
        res,
        401,
        `You are not authorized to update this id : ${id}`
      );
    }
    user.id = id;
    user.username = username;
    user.password = bcrypt.hashSync(password, 8);
    user.address = address;
    user.email = email;
    await user.save();
    return sendJSONResponse(res, 200, "Updated User Details", user);
  } catch (error) {
    return sendBadRequest(res, 500, `Error: ${error.message}`);
  }
};

exports.deleteByUserID = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await User.findOne({ id: userID });
    if (!user) {
      return sendBadRequest(res, 404, `Sorry user with ${userID} not found`);
    } else if (userID != req.userID && user) {
      return sendBadRequest(
        res,
        401,
        "Not authorized to delete the other user"
      );
    }
    await User.deleteOne({ id: userID });
    return sendJSONResponse(res, 200, "User Deleted Successfully");
  } catch (error) {
    return sendBadRequest(res, 500, `Error: ${error.message}`);
  }
};
