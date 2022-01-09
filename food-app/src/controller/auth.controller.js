require("dotenv").config();
const { User } = require("../models");
const { sendJSONResponse, sendBadRequest } = require("../utils/handle");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { checkEmail } = require("../utils/emailValidator");
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    if (!checkEmail(email)) {
      return sendBadRequest(res, 400, "Invalid email");
    }
    const user = await new User({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 8),
      address: address,
    });
    const data = await user.save();
    return sendJSONResponse(res, 201, "User Successfully registered", data);
  } catch (error) {
    console.log(error);
    return sendBadRequest(res, 200, `Insertion Faile due ${error}`);
  }
};

exports.authenticateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return sendBadRequest(res, 403, "username doesn't exist");
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return sendBadRequest(res, 403, "Invalid Password");
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 86400,
    });
    return sendJSONResponse(res, 200, "User logged in successful", {
      accessToken: token,
    });
  } catch (error) {
    return sendBadRequest(res, 500, `${error.message}`);
  }
};
