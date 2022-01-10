
const User = require('../models/user');


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(404).json({message: `No users currently available`});
    }
};

const getUserById = async (req, res) => {
    if(res.user != null){
        res.status(200).json(res.user);
    }
    else{
        res.status(404).json({message: `Sorry user with ${req.params.id} not found`});
    }
};


const updateUserById =async (req, res) => {

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
};


const patchUserById = async (req, res) => {
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
};

const deleteUserById = async (req, res) => {
    try{
        await res.user.remove();
        res.json({message:"User deleted successfully"})
    }
    catch(error) {
        res.status(404).json({message: `Sorry user with ${req.params.id} not found`});
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    patchUserById,
    deleteUserById
};

