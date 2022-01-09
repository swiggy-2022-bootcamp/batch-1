const User = require('../../models/user');

function userController(){
    return{
        "getAllUsers" : async function (req, res){
            try {
                const users = await User.find();
                return res.status(200).json(users);
            } catch (error) {
                return res.status(400).json({ "message":"Something went wrong","error": error}); 
            }
        },

        "getUserById" :  async (req, res) => {

            const userId = req.params.userId;
            try {
                const user   = await User.findById(userId);
                if(user){
                    return res.status(200).json(user);
                }else{
                    return res.status(400).json({"message":`Sorry. The userId: ${userId} does not exists`})
                }
            } catch (error) {
                return res.status(400).json({ "message":"Something went wrong","error": error}); 
            }  
        },

        "updateUser" : async (req, res) => {
            if(req.body.username != null){
                res.user.username= req.body.username;
            }
            if(req.body.fullname != null){
                res.user.fullname= req.body.fullname;
            }
            if(req.body.email != null){
                res.user.email = req.body.email;
            }
            if(req.body.password != null){
                res.user.password= req.body.password;
            }
            if(req.body.address != null){
                if(req.body.address.houseno != null)
                    res.user.address.houseno = req.body.address.houseno;
                if(req.body.address.street != null)
                    res.user.address.street = req.body.address.street;
                if(req.body.address.city != null)
                    res.user.address.city = req.body.address.city;
                if(req.body.address.state != null)
                    res.user.address.state = req.body.address.state;
                if(req.body.address.zip != null)
                    res.user.address.zip = req.body.address.zip;
            }
            try{
                const updatedUser = await res.user.save();
                res.status(200).json({
                    "message": "User updated successfully",
                    "user": updatedUser
                });
            }
            catch(error) {
                res.status(400).json({message: "Something went wrong"});
            }
        },

        "deleteUser" : async function (req, res){            
            const userId = req.params.userId;
            if(res.user.role === "admin" || res.user.username === req.body.username){
                try {
                    const user = await User.findOneAndDelete({"_id":userId});
                    if(user){
                        return res.status(202).json({ "message":`The user with userId: ${userId} deleted`});
                    }else{
                        // null => doesnot exist
                        return res.status(400).json({"message":`Sorry. The userId: ${userId} does not exists and hence can not be deleted`})
                    }
                } catch (error) {
                    return res.status(400).json({ "message":"Something went wrong","error": error});
                }
            }else{
                return res.status(401).json({ "message":`You dont have previlege to delete user with userId ${userId}`});
            }
        }
    }
}


module.exports = userController;