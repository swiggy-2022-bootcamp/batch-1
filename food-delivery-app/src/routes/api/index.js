const express = require('express');
const userRoute = require('./user.route');
// const authenticateRoute = require('./authenticate.route');
const foodRoute = require('./food.route');
const authController = require('../../controllers/auth.controller');

// const orderRoute = require('./order.route');

const router = express.Router();

router.use('/users', userRoute);
router.use('/register', authController.register);
router.use('/authenticate', authController.login);
router.use('/food', foodRoute);

module.exports = router;
