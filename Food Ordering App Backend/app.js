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
const ordersRouter = require('./routes/orders.js');

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

app.use('/api/orders', auth, ordersRouter);


const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
