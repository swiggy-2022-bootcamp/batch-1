// const httpStatus = require('http-status');
const userService = require('./user.service');
// const ApiError = require('../utils/ApiError');

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (user) {
    if (await user.isPasswordMatch(password)) return user;
    else
      return undefined;
  } else {
    return undefined;
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
};
