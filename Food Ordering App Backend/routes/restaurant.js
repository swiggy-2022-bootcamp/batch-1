const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurantController.js');

// POST request to add details of a restaurant
router.post('/', restaurantController.addRestaurantDetails);

// GET request for details of all restaurants
router.get('/', restaurantController.restaurantDetails);

module.exports = router;