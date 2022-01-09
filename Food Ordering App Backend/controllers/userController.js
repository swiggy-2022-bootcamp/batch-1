const User = require('../schemas/user.js');

exports.usersList = async (req, res) => {

    const users = await User.find();
    return res.status(200).json(users);

};

exports.userDetail = async (req, res) => {

    try {
        const user = await User.find({_id : req.params.userID});
        return res.status(200).json(user);
    } catch(e) {
        return res.status(404).json({"message" : `User with id ${req.params.userID} not found`});
    }
    
}

exports.modifyUserDetails = async (req, res) => {

    try {
        const user = await User.findOne({_id : req.body._id});

        for(let property of Object.keys(req.body)) {
            
            if(property === '_id')
            continue;

            if(user[property])
                user[property] = req.body[property];
        }

        await user.save();
        return res.status(200).json(user);

    } catch(e) {
        console.log(e.message);
        return res.status(404).json({"message" : `User with id ${req.body._id} not found`});
    }
    
}

exports.deleteUser = async (req, res) => {

    try {
        await User.deleteOne({_id : req.params.userID});
        return res.status(200).json({"message" : `User deleted successfully`});

    } catch(e) {
        console.log(e.message);
        return res.status(500).json({"message" : `Error deleting user with id ${req.params.userID}`});
    }    

}



