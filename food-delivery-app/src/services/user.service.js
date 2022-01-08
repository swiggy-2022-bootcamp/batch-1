const { func } = require('joi');
const { User } = require('../models');
// const httpStatus = require('http-status');
// const ApiError = require('../utils/ApiError');

// const extractUserInfo = (user) => {
//   const { id, username, email, password, address, walletMoney } = user;
//   return {
//     id,
//     username,
//     email,
//     password,
//     address,
//     walletMoney,
//   };
// };

async function getUserById(id) {
  try {
    const user = await User.findOne({ _id: id }).exec();
    if (user !== null) {
      // const userData = extractUserInfo(user);
      return user;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllUsers() {
  try {
    const users = await User.find().exec();
    if (users !== null) {
      // const userData = users.map((user) => extractUserInfo(user));
      return users;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email }).exec();
    if (user !== null) {
      const userData = extractUserInfo(user);
      return userData;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function createUser(userBody) {
  if (await User.isEmailTaken(userBody.email)) {
    return { isEmailTaken: true };
  }
  // else if (await User.isIdTaken(userBody.id)) {
  //   return { isIdTaken: true };
  // }
  else {
    const newUser = await User.create(userBody);
    // const userData = extractUserInfo(newUser);
    return newUser;
  }
}

async function updateUserInfo(id, userBody) {
  try {
    const user = await User.findOneAndUpdate({ _id: id }, userBody).exec();
    if (user !== null) {
      // const userData = extractUserInfo(user);
      return user;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteUser(id) {
  try {
    const user = await User.findOneAndDelete({ _id: id }).exec();
    if (user !== null) {
      // const userData = extractUserInfo(user);
      return user;
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
  deleteUser,
  updateUserInfo,
};
