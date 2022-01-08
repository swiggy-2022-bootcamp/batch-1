const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();

const User = require('./schemas/user.js');
const Restaurant = require('./schemas/restaurant.js');
const Food = require("./schemas/food.js")

const connectDB = require('./db.js');
const res = require('express/lib/response');


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

    res.status(400).send("User registration not successful");
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

async function saveRestaurantDetails(req) {

    try {
        const restaurant = await Restaurant.create({
            restaurantName : req.body.restaurantName,
            restaurantAddress : req.body.restaurantAddress
        });

        await restaurant.save();
        return restaurant;
    
    } catch(e) {
        console.log(e.message);
        return false;
    }
}


app.post('/api/restaurants', async (req, res) => {
    try {
    
        const oldRestaurant = await Restaurant.findOne({ restaurantAddress : req.body.restaurantAddress });
        if (oldRestaurant) {
            return res.status(409).send("Restaurant already registered");
        }   
    } catch(e) {
        console.log(e.message);
        return;
    }

    const restaurantSaved = await saveRestaurantDetails(req);

    if(restaurantSaved) {
    return res.status(200).send(restaurantSaved);   
    }

    res.status(400).send("Restaurant registration not successful");
})

app.get('/api/restaurants', async (req, res) => {
    const restaurants = await Restaurant.find();
    return res.status(200).json(restaurants);
})

async function saveFoodDetails(req) {

    try {
        const food = await Food.create({
            restaurantName : req.body.restaurantName,
            restaurantId : req.body.restaurantId,
            foodName : req.body.foodName,
            foodCost : parseInt(req.body.foodCost),
            foodType : req.body.foodType
        });

        await food.save();
        return food;
    
    } catch(e) {
        console.log(e.message);
        return false;
    }
}

app.post('/api/food', async (req, res) => {
    try {

        const restaurant = await Restaurant.find({_id : req.body.restaurantId});
        console.log(restaurant);
     
        const oldFood = await Food.findOne({restaurantId : req.body.restaurantId, foodName : req.body.foodName});
        if (oldFood) {
            return res.status(409).send({"message" : "Food Name already exists for this restaurant"});
        }   
    } catch(e) {
        console.log(e.message);
        return res.status(409).json({"message" : "Restaurant not found"});
    }

    const foodSaved = await saveFoodDetails(req);

    if(foodSaved) {
        return res.status(200).send(foodSaved);   
    }

    res.status(400).json({"message" : "Food item registration not successful"});
});

app.get('/api/food', async (req, res) => {
    const food = await Food.find();
    return res.status(200).json(food);
});


app.get('/api/food/:foodID', async (req, res) => {
    try {
        const food = await Food.find({_id : req.params.foodID});
        return res.status(200).json(food);
    } catch(e) {
        return res.status(404).json({"message" : `Food with id ${req.params.foodID} not found`});
    }
});


const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
