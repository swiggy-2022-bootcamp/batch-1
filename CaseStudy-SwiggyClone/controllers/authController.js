const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../secrets/secrets').JWT_KEY;

module.exports.signup = async function signup(req,res)
{
    try{
        let dataObj = req.body;
        // console.log(dataObj);
        // console.log(req.body);
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

module.exports.protectRoute = async function protectRoute(req,res,next)
{
    try
    {
        let token = req.cookies.login;
        if(token)
        {
            let payload = jwt.verify(token,JWT_KEY);
            // console.log(payload,' is payload');
            if(payload)
            {
                let user = await userModel.findById(payload.payload);
                req.id = user._id;
                req.role = user.role;
                next();
            }
            else
            {
                return res.json({
                    message:'Please Login again'
                });
            }
        }
        else{
            // browser
            // const client = req.get('User-Agent');

            // if(client.includes('Mozilla') || client.includes('Chrome') || client.includes('AppleWebKit') || client.includes('Safari'))
            // {
            //     return res.redirect('/login');
            // }

            // postman
            return res.json({
                message:'Login required!'
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

module.exports.logout = function logout(req,res)
{
    res.cookie('login',' ',{maxAge:1});
    res.json({
        message:'User logged off successfully'
    })
}

module.exports.isAuthorised = function isAuthorised(roles)
{
    return function(req,res,next)
    {
        if(roles.includes(req.role))
        {
            next();
        }
        else
        {
            return res.status(401).json({
                message:'User not Authorized'
            });
        }
    }
}