const express = require('express');
const userRouter = express.Router();

const {signup,login, protectRoute, logout, isAuthorised} = require('../controllers/authController');
const { getUser, updateUser, deleteUser, getAllUsers, updateUsers, deleteUsers, getUsers } = require('../controllers/userController');

// for testing schema properly
// userRouter.route('')
// .get(getSample)

userRouter.route('/signup')
.post(signup)

userRouter.route('/login')
.post(login)

userRouter.route('/userProfile')
.get(protectRoute,getUser);

userRouter.route('/update')
.patch(protectRoute,updateUser);

userRouter.route('/delete')
.get(protectRoute,deleteUser);

userRouter.route('/logout')
.get(logout);

userRouter.route('/all')
.get(protectRoute,isAuthorised(['admin']),getAllUsers);

userRouter.route('/:id')
.get(protectRoute,isAuthorised(['admin']),getUsers)
.patch(protectRoute,isAuthorised(['admin']),updateUsers)
.delete(protectRoute,isAuthorised(['admin']),deleteUsers);



module.exports = userRouter;
