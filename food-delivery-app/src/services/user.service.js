const { User } = require('../models');

async function getUserById(id) {
  try {
    const user = await User.findById(id).exec();
    if (user) {
      return user;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllUsers() {
  try {
    const users = await User.find().exec();
    if (users) {
      return users;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email }).exec();
    if (user) {
      return user;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function createUser(userBody) {
  if (await User.isEmailTaken(userBody.email)) {
    return { isEmailTaken: true };
  }
  else {
    const newUser = await User.create(userBody);
    return newUser;
  }
}

async function updateUserInfo(id, userBody) {
  try {
    const user = await User.findOneAndUpdate({ _id: id }, userBody, {
      new: true,
    }).exec();
    if (user) {
      return user;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteUser(id) {
  try {
    const user = await User.findOneAndDelete({ _id: id }).exec();
    if (user) {
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
