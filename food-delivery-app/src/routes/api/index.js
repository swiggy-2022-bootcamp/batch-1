const express = require('express');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const productRoute = require('./product.route');

const router = express.Router();

router.use('/users', userRoute);
router.use('/register', authRoute);
router.use('/authenticate', authRoute);
router.use('/food', productRoute);

module.exports = router;
