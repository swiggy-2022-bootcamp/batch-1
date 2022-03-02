const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController.js');

// POST request to add order details
router.post('/:userID', orderController.addOrder);

// GET request for order details of an user
router.get('/:userID', orderController.orderDetails);

module.exports = router