const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const userModel = require('./models/userModel');
const restaurantModel = require('./models/restaurauntModel');
const userRouter = require('./routers/userRouter');
const restaurantRouter = require('./routers/restaurantRouter');


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cookieParser());

app.use('/user',userRouter);
app.use('/restaurant',restaurantRouter);




app.listen(3000);
