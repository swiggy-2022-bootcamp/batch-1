const express = require('express');
const router = express.Router();
const {getAllUsers, getUserById, updateUserById, patchUserById, deleteUserById} = require('../controllers/userController');
const {getUser} = require('../utility/getUser');

//GET USERS
//API GET /api/users
router.get('/', getAllUsers);

//GET ONE USER
//API GET /api/users/:id
router.get("/:id", getUser, getUserById);
  
//UPDATE THE USER
//API POST /api/update/:id
router.put('/:id', getUser, updateUserById)

//UPDATING USER
//API PATCH /api/users/:id
router.patch('/:id', getUser, patchUserById)

//DELETING USER
//API DELETE /api/users/:id
router.delete('/:id',  getUser,  deleteUserById);

module.exports = router;