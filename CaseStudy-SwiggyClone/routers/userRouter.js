const express = require('express');
const userRouter = express.Router();

const {signup,login, protectRoute} = require('../controllers/authController');
const { getUser, updateUser, deleteUser } = require('../controllers/userController');


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


// userRouter.route('/:id')
// .patch(updateUser)
// .delete(deleteUser)

// userRouter.route('/logout')
// .get(logout);

// userRouter.route('')
// .get(protectRoute,isAuthorised(['admin']),getAllUsers)


module.exports = userRouter;
