const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const foodRouter = require('./routers/food');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(userRouter);

app.use(foodRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})