const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../secrets').JWT_KEY;

module.exports.signup = async function signup(req,res)
{
    try{
        let dataObj = req.body;
        console.log(dataObj);
        console.log(req.body);
        let user = await userModel.create(dataObj);

        if(user)
        {
            res.json({
                message:'user has signed up',
                data : user
            });
        }
        else
        {
            res.json({
                message:'error while signing up'
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

module.exports.login = async function login(req,res)
{
    try
    {
        let loginData = req.body;
        // console.log(loginData);
        if(!loginData) 
        {
            return res.json({
                'message':'Nothing recieved'
            });
        }

        if(!loginData.email || !loginData.password)
        {
            return res.json({
                'message':'Email or Password not found'
            });
        }

        let user = await userModel.findOne({email:loginData.email});

        if(!user)
        {
            return res.json({
                'message':'User not registered!'
            });
        }
        
        if(!bcrypt.compareSync(loginData.password, user.password))
        {
            return res.json({
                message:'Invalid Credentials'
            });
        }

        let uid = user['_id'];
        let token = jwt.sign({payload:uid},JWT_KEY);
        
        res.cookie('login',token,{httpOnly:true});

        // session cookies
        // res.cookie('isLoggedIn',true,{httpOnly:true});
        return res.json({
            message:'Logged In!',
            userDetails: user
        });
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
