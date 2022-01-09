const express = require('express');
const User = require('../models/user');
const router = express.Router();
const jwt= require('jsonwebtoken');
const e = require('express');

//GET USERS
//API GET /api/users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(404).json({message: `No users currently available`});
    }
});



//GET ONE USER
//API GET /api/users/:id
router.get("/:id", getUser , (req, res) => {
    if(res.user != null){
        res.status(200).json(res.user);
    }
    else{
        res.status(404).json({message: `Sorry user with ${req.params.id} not found`});
    }
});
  


//UPDATE THE USER
//API POST /api/update/:id
router.put('/:id', getUser, async (req, res) => {

    res.user.userName= req.body.userName;
    res.user.email = req.body.email;
    res.user.password= req.body.password;
    res.user.address= req.body.address;


    try{
        const updatedUser = await res.user.save();
        res.status(200).json(updatedUser);
    }
    catch(error) {
        res.status(404).json({message: `Sorry user with ${req.params.id} not found`});
    }
})



//UPDATING USER
//API PATCH /api/users/:id
router.patch('/:id', getUser, async (req, res) => {
    if(req.body.userName != null){
        res.user.userName= req.body.userName;
    }
    else if(req.body.email != null){
        res.user.email = req.body.email;
    }
    else if(req.body.password != null){
        res.user.password= req.body.password;
    }
    else if(req.body.address != null){
        res.user.address= req.body.address;
    }
    try{
        const updatedUser = await res.user.save();
        res.status(200).json(updatedUser);
    }
    catch(error) {
        res.status(404).json({message: `Sorry user with ${req.params.id} not found`});
    }
})


//DELETING USER
//API DELETE /api/users/:id
router.delete('/:id',  getUser,  async (req, res) => {
    try{
        await res.user.remove();
        res.json({message:"User deleted successfully"})
    }
    catch(error) {
        res.status(404).json({message: `Sorry user with ${req.params.id} not found`});
    }
});




//Middle ware function to verify token
async function verifyToken(req, res, next){
   const authHeader = req.headers['authorization'];
   const auth = authHeader && authHeader.split(' ')[1];
   if(auth == null){
       //user has a token by thats not valid
      return res.sendStatus(403);
   }

   jwt.verify(token, 'secretKey', (err, user) =>{
       if(err){
           return res.sendStatus(403);
       }

       req.user = user;
       next();
   })
}

//Utility function to get User 
//Middle ware 
async function getUser(req, res, next){
    let user;
    try{
        user = await User.findById(req.params.id);
        
        if(user == null){
            return res.status(404).json({message: "User not found"});
        }
    }
    catch(error){
        return res.status(500).json({message:"User not found"});
    }
    res.user = user;
    next();
}


module.exports = router;