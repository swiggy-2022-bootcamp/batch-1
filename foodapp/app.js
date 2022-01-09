const express=require("express");
const bodyParser=require('body-parser');
const app=express();
require("dotenv").config();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//to parse json when postman sends in raw form
app.use(express.json());

// Router Imports
app.use('/api',require('./routes/user/userRoutes'));
app.use('/api',require('./routes/foodItem/foodItemRoutes'));
app.use('/api',require('./routes/restaurant/restaurantRoutes'));

const port=process.env.PORT || 1234;

// listening to port number PORT for communication
app.listen(port , (err)=> {
    if(err) {
        console.log(`Error while loading the backend server at ${port}`);
    }
    else {
        console.log(`Server started successfully at port ${port}`);
    }
});
