const userService = require('./user.service');

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
