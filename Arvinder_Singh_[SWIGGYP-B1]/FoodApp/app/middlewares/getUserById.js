async function getUserById(req, res, next){
    let user;
    const userID = req.params.userID;
    try{
        user = await User.findById(userId);        
        if(user == null){
            return res.status(404).json({message: `User with ${userID} not found`});
        }
    }
    catch(error){
        return res.status(400).json({message:"Something went wrong"+error});
    }
    res.user = user;
    next();
}

module.exports = getUserById;