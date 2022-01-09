const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.listen(3000);

app.use(cookieParser());

const userRouter = require('./routers/userRouter');
const registerRouter = require('./routers/registerRouter');
const authRouter = require('./routers/authRouter');
const foodRouter = require('./routers/foodRouter');

app.use('/api/users',userRouter);
app.use('/api/register',registerRouter);
app.use('/api/authenticate',authRouter);
app.use('/api/food',foodRouter);
