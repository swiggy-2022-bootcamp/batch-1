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
const cartsRouter = require('./routes/cart.js');

const connectDB = require('./db.js');
const res = require('express/lib/response');
const { send } = require('express/lib/response');


app.use(express.json());
connectDB();

app.use('/api', indexRouter);

app.use('/api/users', usersRouter);

app.use('/api/restaurants', restaurantsRouter);

app.use('/api/food', foodRouter);

app.use('/api/carts', auth, cartsRouter);

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
