const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js');

// GET request to get details of all users
router.get('/', userController.usersList);

// GET request for details of a user
router.get('/:userID', userController.userDetail);

// PUT request to modify details of a user
router.put('/', userController.modifyUserDetails);

// DELETE request to remove details of a user
router.delete('/:userID', userController.deleteUser);


module.exports = router;