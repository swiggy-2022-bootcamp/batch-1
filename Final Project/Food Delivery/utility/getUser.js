
const User = require('../models/user');

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

module.exports ={
    getUser
}