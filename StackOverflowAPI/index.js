//for accessing environment variables from .env file
require('dotenv').config();


const express = require('express');
const app = express();
const logger = require('morgan');
const accessLogStream = require('./config/accessLogStream');
const port = process.env.PORT || 2022;

// for recognizing and parsing json objects
app.use(express.json());

// setting up logger
app.use(logger('combined', {
    stream: accessLogStream
}));

// handling routes in 'routes' folder
app.use('/', require('./routes'));

app.listen(port, (err) => {
    if(err) {
        console.log("Error starting the application!");
        return;
    }

    console.log(`Server is up and running at localhost:${port}`);
});