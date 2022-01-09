const express = require('express');
const User = require('../models/user');
const router = express.Router();
const jwt= require('jsonwebtoken');


//ADD USER
//API POST /api/register
router.post('/register', async (req, res) => {

    const checkIfUserAlreadyRegistered = await User.findOne({userName: req.body.userName, email: req.body.email});
    // console.log(checkIfUserAlreadyRegistered)
    if(checkIfUserAlreadyRegistered){
        res.status(409).json({message: `The userName ${req.body.userName} already exists. Please sign in`});
    }
    else{
         const user = new User({
         userName: req.body.userName,
         email: req.body.email,
         password: req.body.password,
         address: req.body.address
         });
  
     try {
         const newUser = await user.save();
         res.status(200).json(newUser);
     }
     catch(error) {
         res.status(400).json({message: error.message})
     }
    }
 });


 //VALIDATE IF USER IS PRESENT 
//API POST /api/users/authenticate
router.post('/authenticate', async (req, res)=>{
    const {userName, password} = req.body;
    const user = await User.findOne({userName: userName, password: password});
    if(user != null){
        jwt.sign({user: user}, 'secretKey', (err, token) => {
            res.status(200).json({message: "User has been signed successfully", token: token});
        });
    }
    else{
        res.status(403).json({message:"User not found. Please check the credentials"});
    }
});

module.exports = router;;