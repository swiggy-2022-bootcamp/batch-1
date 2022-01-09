const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require('joi');

const registrationValidation = require('../apiSchemas/registration.js');
const authenticationValidation = require('../apiSchemas/authentication.js');

async function saveUserDetails(req) {

    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const jwtToken = jwt.sign(
                { 
                    username : req.body.username, 
                    password : hashedPassword
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
        );
    
        const user = await User.create({
            username : req.body.username,
            password : hashedPassword,
            email : req.body.email,
            address : {
                houseno : req.body.address.houseno,
                street : req.body.address.street,
                city : req.body.address.city,
                state : req.body.address.state,
                zip : req.body.address.zip
            },
            token : jwtToken
        });

        await user.save();
        return user;
    
    } catch(e) {
        console.log(e.message);
        return false;
    }
}

exports.registerUser = async (req, res) => {
    
    try {
        await registrationValidation.schema.validateAsync(req.body);
    } catch(e) {
        return res.status(422).json({"message" : e.details[0].message});
    }

    try {
    const oldUser = await User.findOne({ email : req.body.email });
    if (oldUser) {
        return res.status(409).send("User already registered. Please Login");
    }   
    } catch(e) {
        console.log(e.message);
        return;
    }

    const userSaved = await saveUserDetails(req);

    if(userSaved) {
    return res.send(userSaved);   
    }

    res.status(400).send("User registration not successful");
}

const User = require('../schemas/user.js');

exports.authenticateUser = async (req, res) => {

    try {
        await authenticationValidation.schema.validateAsync(req.body);
    } catch(e) {
        return res.status(422).json({"message" : e.details[0].message});
    }

    const {email , password} = req.body;

    const user = await User.findOne({ email });

    if(!user) {
        return res.status(400).json({"message" : "User not found"});
    }

    if(await bcrypt.compare(password, user.password)) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const token = jwt.sign(
                { 
                    username : req.body.username, 
                    password : hashedPassword
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
        );
        
        user.token = token;
        await user.save();
        return res.status(200).json({"message" : "Login Successful"});
    }
    else {
        return res.status(403).send({"message" : "Wrong Credentials"})
    }

}