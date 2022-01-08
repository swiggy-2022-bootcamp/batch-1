const express = require('express');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/:userId')
  .get(auth(), userController.getUser) // auth(),
  .put(auth(), userController.updateUser) // auth(),
  .delete(auth(), userController.deleteUser); // auth(),

// router.route('/').get(userController.getAllUsers);

module.exports = router;
