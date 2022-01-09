const User = require('../../models/user');

async function userAuthMiddleware(req, res, next){
    const {username,password} = req.body;
    let user;
    try{
        user = await User.findOne({"username":username});       
        if(user == null){
            return res.status(400).json({message: `Username ${username} does not exist`});
        }
    }
    catch(error){
        return res.status(400).json({message:"Something went wrong"+error});
    }


    // if authorized
    if(user.password === password){
        res.user = user;
        next();
    }else{
        return res.status(400).json({message:"Wrong password."});
    }
    
}

module.exports = userAuthMiddleware;