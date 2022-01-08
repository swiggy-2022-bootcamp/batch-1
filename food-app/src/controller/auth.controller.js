const { User } = require("../models");
const { sendJSONResponse, sendBadRequest } = require("../utils/handle");

exports.createUser = async (req, res) => {
  try {
    const user = await new User(req.body);
    const data = await user.save();
    return sendJSONResponse(res, 201, "User Successfully registered", data);
  } catch (error) {
    console.log(error);
    return sendBadRequest(res,200,`Insertion Faile due ${error}`);
  }
};
