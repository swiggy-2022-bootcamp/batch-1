const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
require("dotenv").config();


// Middleware Imports
const auth = require("./middleware/auth.js");

// Router Imports
const usersRouter = require('./routes/users.js');
const indexRouter = require('./routes/index.js');
const restaurantsRouter = require('./routes/restaurant.js');
const foodRouter = require('./routes/food.js');
const cartsRouter = require('./routes/cart.js');
const ordersRouter = require('./routes/orders.js');

const connectDB = require('./db.js');
const swaggerDocument = require('./swagger.json');


app.use(express.json());
connectDB();

app.use('/api', indexRouter);

app.use('/api/users', usersRouter);

app.use('/api/restaurants', restaurantsRouter);

app.use('/api/food', foodRouter);

app.use('/api/carts', auth, cartsRouter);

app.use('/api/orders', auth, ordersRouter);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
