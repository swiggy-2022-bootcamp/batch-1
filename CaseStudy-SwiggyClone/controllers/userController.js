const userModel = require('../models/userModel');

module.exports.getUser = async function getUser(req,res)
{
    try
    {
        let uid = req.id;
        // console.log(uid);
        let user = await userModel.findById(uid);

        if(user)
        {
            return res.json(user);
        }
        else
        {
            return res.status(404).json({
                message:'User not Found'
            });
        }
    }catch(err)
    {
        res.status(500).json({
            message:err.message
        });
    }
    
}

module.exports.updateUser = async function updateUser(req,res)
{
    try
    {
        let uid = req.id;
        let dataToUpdate = req.body;

        if(dataToUpdate.email || dataToUpdate.password || dataToUpdate.role)
        {
            return res.status(403).json({
                message:'Cannot change these things here'
            });
        }

        // console.log(uid);
        let user = await userModel.findById(uid);
        if(user)
        {
            let oldData = await userModel.findByIdAndUpdate(uid,dataToUpdate);
            res.json({
                message:'Data updated successfully',
                oldData: oldData,
                updatedFields: dataToUpdate
            });
        }
        else
        {
            res.status(404).json({
                message:'User not Found'
            });
        }
    }catch(err)
    {
        res.status(500).json({
            message:err.message
        });
    }
    
}

module.exports.deleteUser = async function deleteUser(req,res)
{
    try
    {
        let uid = req.id;
        let deletedUser = await userModel.findByIdAndDelete(uid);
        if(!deletedUser)
        {
            res.status(400).json({
                message:'User not found'
            });
        }
        else
        {
            // redirect to home page in browser
            res.json({
                message:'User deleted',
                data:deletedUser
            });

        }
    }
    catch(err)
    {
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports.getAllUsers = async function getAllUsers(req,res)
{
    try
    {
        // get all
        let allUsers = await userModel.find();
        res.json({
            message:'List of All users',
            data:allUsers
        });
    }catch(err)
    {
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports.getUsers = async function getUsers(req,res)
{
    try
    {
        let uid = req.params.id;
        // console.log(uid);
        let user = await userModel.findById(uid);

        if(user)
        {
            return res.json(user);
        }
        else
        {
            return res.status(404).json({
                message:'User not Found'
            });
        }
    }catch(err)
    {
        res.status(500).json({
            message:err.message
        });
    }
    
}

module.exports.updateUsers = async function updateUsers(req,res)
{
    try
    {
        let uid = req.params.id;
        let dataToUpdate = req.body;
        // console.log(uid);
        let user = await userModel.findById(uid);
    
        if(user)
        {
            const oldData = await userModel.findByIdAndUpdate(uid,dataToUpdate);
            res.json({
                message:'Data updated successfully',
                oldData: oldData,
                updatedFields: dataToUpdate
            });
        }
        else
        {
            res.status(400).json({
                message:'user not found'
            });
        }
    }
    catch(err)
    {
        // console.log('errored  here!');
        res.status(500).json({
            message:err.message
        });
    }    
}

module.exports.deleteUsers = async function deleteUsers(req,res)
{
    try
    {
        let uid = req.params.id;
        let deletedUser = await userModel.findByIdAndDelete(uid);
        if(!deletedUser)
        {
            res.status(404).json({
                message:'User not found'
            });
        }
        else
        {
            res.json({
                message:'User deleted',
                data:deletedUser
            });

        }
    }
    catch(err)
    {
        res.status(500).json({
            message:err.message
        });
    }
}

// inserted user for testing purpose
// module.exports.getSample = async function getSample(req,res)
// {
//     let user = {
//         name:'Mario',
//         email:'mario@mario12345.com',
//         password:'12345678',
//         confirmPassword:'12345678',
//         locations:[{
//             addressLabel: "Home",
//             address: {
//             houseNo: 72,
//             street: "Wario street",
//             city: "Bangalore",
//             state: "Karnataka",
//             zip: 560056
//             }
//         }]
//     };
     
//     let data = await userModel.create(user);
//     console.log(data);
//     res.json({
//         data:data
//     });
// }