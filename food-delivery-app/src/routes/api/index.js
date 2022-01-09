const express = require('express');
const userRoute = require('./user.route');
const foodRoute = require('./food.route');
const orderRoute = require('./order.route');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

router.use('/users', userRoute);
router.use('/register', authController.register);
router.use('/authenticate', authController.login);
router.use('/food', foodRoute);
router.use('/order', orderRoute);

module.exports = router;
