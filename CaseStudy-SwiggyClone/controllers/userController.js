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
            return res.json({
                message:'User not Found'
            });
        }
    }catch(err)
    {
        res.json({
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

        if(dataToUpdate.email || dataToUpdate.password)
        {
            return res.json({
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
            res.json({
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
            res.json({
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
        res.json({
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
