const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
//Auths
// const auth = require("./middlewares/Auth/auth");
// require("dotenv").config({
//     path: "./config.env"
// });


// Init app
// Init app
const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Home api
app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

// user api
app.use('/api/register', require('./scripts/auth/register'));
app.use('/api/authenticate', require('./scripts/auth/signin'));
app.use('/api/users', require('./scripts/user/all'));
app.use('/api/users', require('./scripts/user/profile'));
app.use('/api/users', require('./scripts/user/updateUser'));
app.use('/api/users', require('./scripts/user/deleteUser'));

// food api
app.use('/api/food', require('./scripts/food/add'));
app.use('/api/food', require('./scripts/food/get'));

module.exports = app;