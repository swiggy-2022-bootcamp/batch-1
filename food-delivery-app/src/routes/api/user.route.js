const express = require('express');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const auth = require('../../middlewares/auth');
const { route } = require('../app');

const router = express.Router();

router
  .route(':/userId')
  .get(auth(), userController.getUser)
  .put(auth(), userController.updateUser)
  .delete(auth(), userController.deleteUser);

route.route('*').get(userController.getAllUsers);

module.exports = router;
