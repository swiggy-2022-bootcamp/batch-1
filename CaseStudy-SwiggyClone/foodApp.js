const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const userModel = require('./models/userModel');
const restaurantModel = require('./models/restaurauntModel');

const userRouter = require('./routers/userRouter');
app.use('/user',userRouter)




app.listen(3000);
