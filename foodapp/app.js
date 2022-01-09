const Joi=require('joi');
const express=require("express");
const bodyParser=require('body-parser');
const app=express();
require("dotenv").config();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.json());


app.use('/api',require('./api/user/userRoutes'));
app.use('/api',require('./api/foodItem/foodItemRoutes'));
const port=process.env.PORT || 1234;
app.listen(port , (err)=> {
    if(err) {
        console.log(`Error while loading the backend server at ${port}`);
    }
    else {
        console.log(`Server started successfully at port ${port}`);
    }
});
