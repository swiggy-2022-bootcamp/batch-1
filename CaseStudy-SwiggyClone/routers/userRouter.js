const express = require('express');
const userRouter = express.Router();

const {signup,getSample,login} = require('../controllers/authController');

// for testing schema properly
// userRouter.route('')
// .get(getSample)

userRouter.route('/signup')
.post(signup)

userRouter.route('/login')
.post(login)

// userRouter.route('/:id')
// .patch(updateUser)
// .delete(deleteUser)

// userRouter.route('/logout')
// .get(logout);

// userRouter.route('/userProfile')
// .get(protectRoute,getUser);

// userRouter.route('')
// .get(protectRoute,isAuthorised(['admin']),getAllUsers)


module.exports = userRouter;
