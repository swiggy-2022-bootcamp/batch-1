const express = require('express');
const router = express.Router();

const foodController = require('../controllers/foodController.js');

// POST request to add a new food item
router.post('/', foodController.addFoodDetails);

// GET request for list of all food items
router.get('/', foodController.allFoodList);

// GET details for a food item
router.get('/:foodID', foodController.foodDetails);

module.exports = router;