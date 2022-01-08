const httpStatus = require('http-status');
// const ApiError = require('../utils/ApiError');
// const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const getUser = async (req, res) => {
  const id = req.params.userId;
  let user = await userService.getUserById(id);
  if (req.user.email !== user.email) {
    // throw new ApiError(httpStatus.FORBIDDEN);
    res.status(httpStatus.FORBIDDEN);
    res.send('User not found');
  }
  if (user) {
    res.status(200).send(user);
  } else {
    // throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    res.status(httpStatus.NOT_FOUND);
    res.send('User not found');
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.userId;
  let user = await userService.getUserById(id);
  if (req.user.email !== user.email) {
    // throw new ApiError(httpStatus.FORBIDDEN);
    res.status(httpStatus.FORBIDDEN);
    res.send('User not found');
  }
  if (user) {
    res.status(200).send(user);
  } else {
    // throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    res.status(httpStatus.NOT_FOUND);
    res.send('User not found');
  }
};

const updateUser = async (req, res) => {
  const id = req.params.userId;
  let user = await userService.getUserById(id);
  if (req.user.email !== user.email) {
    // throw new ApiError(httpStatus.FORBIDDEN);
    res.status(httpStatus.FORBIDDEN);
    res.send('User not found');
  }
  if (user) {
    res.status(200).send(user);
  } else {
    // throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    res.status(httpStatus.NOT_FOUND);
    res.send('User not found');
  }
};

module.exports = {
  getUser,
  deleteUser,
  updateUser
};
