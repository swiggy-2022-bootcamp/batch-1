const express = require('express');
const userController = require('../../controllers/user.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/:userId')
  .get(auth(), userController.getUser)
  .put(auth(), userController.updateUser)
  .delete(auth(), userController.deleteUser);

router.route('/').get(userController.getAllUsers);

module.exports = router;
