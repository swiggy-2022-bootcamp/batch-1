const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();

const User = require('./schemas/user.js');
const connectDB = require('./db.js');


connectDB()
app.use(express.json());

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

app.post('/api/register', async (req, res) => {
    
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

    res.status(400).send("Registration not successful");
});

app.post('/api/authenticate', async (req, res) => {

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

        return res.status(200).json({"message" : "Login Successful"});
    }
    else {
        return res.status(403).send({"message" : "Wrong Credentials"})
    }

});

app.get('/api/users', async (req, res) => {

    const users = await User.find();
    console.log(users);
    return res.status(200).json(users);

});


app.get('/api/users/:userID', async (req, res) => {

    try {
        const user = await User.find({_id : req.params.userID});
        return res.status(200).json(user);
    } catch(e) {
        return res.status(404).json({"message" : `User with id ${req.params.userID} not found`});
    }
    
});

app.put('/api/users', async (req, res) => {

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
    
});

app.delete('/api/users/:userID', async (req, res) => {

    try {
        await User.deleteOne({_id : req.params.userID});
        return res.status(200).json({"message" : `User deleted successfully`});

    } catch(e) {
        console.log(e.message);
        return res.status(500).json({"message" : `Error deleting user with id ${req.params.userID}`});
    }    

});

app.post('/api/food', (req, res) => {

});

app.get('/api/food/:foodID', (req, res) => {

});


const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
