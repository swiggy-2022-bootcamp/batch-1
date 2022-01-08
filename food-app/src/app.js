const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { API_PREFIX } = require('./config/default.json');


require('dotenv').config();
const app = express();

const { mongoURI } = process.env;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(mongoURI)
  .then(() => {
    console.log("Mongo DB Connected");
  })
  .catch((err) => console.log(err));



app.use(API_PREFIX, require('./routes/index'));

module.exports = app;