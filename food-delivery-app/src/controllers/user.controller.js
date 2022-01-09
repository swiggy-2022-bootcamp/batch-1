const httpStatus = require('http-status');
const { userService } = require('../services');

const getAllUsers = async (req, res, next) => {
  const users = await userService.getAllUsers();
  if (users) {
    res.status(httpStatus.OK).send(users);
  } else {
    res.status(httpStatus.FORBIDDEN);
    res.send('User(s) not found');
  }
};

const getUser = async (req, res) => {
  const id = req.params.userId;
  const user = await userService.getUserById(id);
  if (user) {
    if (req.user.email !== user.email) {
      res.status(httpStatus.FORBIDDEN);
      res.send('User not found');
    } else {
      res.status(httpStatus.OK).send(user);
    }
  } else {
    res.status(httpStatus.NOT_FOUND);
    res.send(`Sorry user with ${id} not found`);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.userId;
  const user = await userService.deleteUser(id);
  if (user) {
    if (req.user.email !== user.email) {
      res.status(httpStatus.FORBIDDEN);
      res.send('User not found');
    } else {
      res.status(httpStatus.OK).send(user);
    }
  } else {
    res.status(httpStatus.NOT_FOUND);
    res.send(`Sorry user with ${id} not found`);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.userId;
  const user = await userService.updateUserInfo(id, req.body);

  if (user) {
    res.status(httpStatus.OK).send(user);
  } else {
    res.status(httpStatus.NOT_FOUND);
    res.send(`Sorry user with ${id} not found`);
  }
};

module.exports = {
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
};
