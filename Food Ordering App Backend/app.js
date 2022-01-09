const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();


// Model Imports
const User = require('./schemas/user.js');
const Restaurant = require('./schemas/restaurant.js');
const Food = require('./schemas/food.js');
const Cart = require('./schemas/cart.js');
const Order = require('./schemas/order.js');

// Middleware Imports
const auth = require("./middleware/auth.js");

// Router Imports
const usersRouter = require('./routes/users.js');
const indexRouter = require('./routes/index.js');
const restaurantsRouter = require('./routes/restaurant.js');
const foodRouter = require('./routes/food.js');

const connectDB = require('./db.js');
const res = require('express/lib/response');
const { send } = require('express/lib/response');


app.use(express.json());
connectDB();

app.use('/api', indexRouter);

app.use('/api/users', usersRouter);

app.use('/api/restaurants', restaurantsRouter);

app.use('/api/food', foodRouter);


async function saveCartItemDetails(req) {

    try {
        const cartItem = await Cart.create({
            userName : req.body.username,
            userID : req.params.userID,
            restaurantName : req.body.restaurantName,
            restaurantID : req.body.restaurantID,
            foodName : req.body.foodName,

            foodQuantity : parseInt(req.body.foodQuantity)
        });

        await cartItem.save();
        return cartItem;
    
    } catch(e) {
        console.log(e.message);
        return false;
    }
}


app.put('/api/carts/:userID', auth, async(req, res) => {

    try {     
        await Cart.deleteOne({userID : req.params.userID, foodName : req.body.foodName, restaurantID : req.body.restaurantID});
    } catch(e) {
        console.log(e.message);
        return res.status(409).json({"message" : "Restaurant not found"});
    }

    const foodItem = await Food.findOne({restaurantId : req.body.restaurantID, foodName : req.body.foodName });

    console.log(foodItem);

    if(!foodItem) {
        return res.status(409).json({"message" : "Invalid food item"});
    }

    const cartItemSaved = await saveCartItemDetails(req);

    if(cartItemSaved) {
        return res.status(200).send(cartItemSaved);   
    }

    res.status(400).json({"message" : "Cannot add cartItem"});

});

app.get('/api/carts/:userID', auth, async(req, res) => {

    try {
    
        const cartItems = await Cart.find({userID : req.params.userID});
        
        if(cartItems.length === 0) {
            return res.status(200).json({"message" : "Cart is empty"});
        }

        return res.status(200).json(cartItems);

    } catch(e) {

        res.send(500).json({"message" : "Cannot fetch cart for given user"});
    }

})

async function saveOrderDetails(req) {

    try {

        console.log("USERID: ", req.params.userID);

        const cartItems = await Cart.find({userID : req.params.userID});

        if(!cartItems)
        return res.send(409).json({"message" : "Cart is empty"});

        await Cart.deleteMany({userID : req.params.userID});

        const order = await Order.create({
            userName : req.body.username,
            userID : req.params.userID,
            items : cartItems
        });

        await order.save();
        return order;
    
    } catch(e) {
        console.log(e.message);
        return false;
    }
}


app.post('/api/orders/:userID', auth, async(req, res) => {

    const order = await saveOrderDetails(req);

    if(order)
    return res.status(200).json(order);

    res.status(500).json({"message" : "Transaction Failed"});
});

app.get('/api/orders/:userID', auth, async(req, res) => {

    const orders = await Order.find({userID : req.params.userID});

    if(orders.length !== 0)
    return res.status(200).json(orders);

    res.status(200).json({"message" : "No orders for given user"});
});

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
