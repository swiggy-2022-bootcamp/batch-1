const { User } = require('../models');
// const httpStatus = require('http-status');
// const ApiError = require('../utils/ApiError');

async function getUserById(id) {
  try {
    const user = await User.findById(id).exec();
    if (user !== null) return user;
  } catch (error) {
    console.log(error.message);
  }
}

async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email }).exec();
    return user;
  } catch (error) {
    console.log(error.message);
  }
}

async function createUser(userBody) {
  if (await User.isEmailTaken(userBody.email)) {
    return { isTaken: true };
  } else {
    const newUser = await User.create(userBody);
    return newUser;
  }
}

async function updateUserInfo(userBody) {
  try {
    const user = await User.findById(userBody.id).exec();
    if (user !== null) return user;
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteUser(id) {
  try {
    await User.deleteOne({ id: id }).exec();
    if (user !== null) return true;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  deleteUser,
  updateUserInfo,
};
