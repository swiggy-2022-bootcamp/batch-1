const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../secrets/secrets').JWT_KEY;

// used to register a user -> be it a normal customer, restauraunt owner or delivery boy
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
            res.status(400).json({
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

// used to login a user -> checks if required fields present, user exists in db, verifies hashed password
// gets a unique token signed for each user with payload containing unique id of each user
// registers a cookies named login where this token is passed to and fro until user logs out
module.exports.login = async function login(req,res)
{
    try
    {
        let loginData = req.body;
        // console.log(loginData);
        if(!loginData || !loginData.email || !loginData.password) 
        {
            return res.status(400).json({
                'message':'Required login data not found'
            });
        }

        let user = await userModel.findOne({email:loginData.email});

        if(!user)
        {
            return res.status(404).json({
                'message':'User not registered!'
            });
        }
        
        if(!bcrypt.compareSync(loginData.password, user.password))
        {
            return res.status(403).json({
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
        res.status(500).json({
            message:err.message
        });
    }   
}

// logs out user, essentially removes the login cookie containing unique token
module.exports.logout = function logout(req,res)
{
    // setting age as 1 ms so it expires immediately 
    res.cookie('login',' ',{maxAge:1});
    res.json({
        message:'User logged off successfully'
    })
}

// verifies token from login cookie using our secret JWT key
// after verifying user is correct, sets id and role of user in request object for next functions use
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
                return res.status(401).json({
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
            return res.status(401).json({
                message:'Login required!'
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

// checks if user is authorised for the operation that is going to be performed next
// we can pass whatever roles are allowed using 'roles' array
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