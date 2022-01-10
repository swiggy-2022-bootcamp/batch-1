const express = require('express');
const router = express.Router();
const {registerUser, authenticateUser} = require('../controllers/authController')


//ADD USER
//API POST /api/register
router.post('/register', registerUser);


 //VALIDATE IF USER IS PRESENT 
//API POST /api/users/authenticate
router.post('/authenticate', authenticateUser);

module.exports = router;;