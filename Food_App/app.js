const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();

// Import Routes
const usersRoute = require('./routes/users');

// Middlewares
app.use(bodyParser.json());
app.use('/api', usersRoute);

// Routes
app.get('/', (req, res) => {
    res.send("We are on home!");
});

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    () => console.log('Connected to DB!')
);


app.listen(3000);