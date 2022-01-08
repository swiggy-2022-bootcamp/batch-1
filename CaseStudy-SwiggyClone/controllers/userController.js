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
