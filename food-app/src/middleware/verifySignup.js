const { User } = require("../models");
const { sendBadRequest } = require("../utils/handle");

exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      return sendBadRequest(res, 400, "Failed! Username is already in use!");
    }

    const email = await User.findOne({ email: req.body.email });

    if (email) {
      return sendBadRequest(res, 400, " Failed! Email is already in use");
    }
    next();
  } catch (error) {
    console.log(error);
    return sendBadRequest(res, 400, `Could not verify user: ${error}`);
  }
};
