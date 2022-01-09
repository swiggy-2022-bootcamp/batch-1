const User = require('../../models/user');

async function adminAuthMiddleware(req, res, next){
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
    if(user.password != password){
        return res.status(400).json({message:"Wrong password. You are not allowed to make changes"});
    }else if(user.role != "admin" ){
        return res.status(400).json({message:"Only admins are allowed this operation"});
    }
    next();
}

module.exports = adminAuthMiddleware;