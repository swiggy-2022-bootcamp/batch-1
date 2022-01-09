const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
// models
const userModel = require('./models/userModel');
const restaurantModel = require('./models/restaurauntModel');
// routers
const userRouter = require('./routers/userRouter');
const restaurantRouter = require('./routers/restaurantRouter');

// to parse json when postman sends in raw form
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// to parse cookies 
app.use(cookieParser());

// setting up routes
app.use('/user',userRouter);
app.use('/restaurant',restaurantRouter);

// listening to port number 3000 for communication
app.listen(3000);
