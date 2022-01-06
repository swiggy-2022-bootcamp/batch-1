const express = require('express');
const UUID = require('uuid-int');
const generator = UUID(0);
const router = express.Router();

// Database
const foods = require('../../db/dishes');

router.post('/', (req, res) => {
    foods.push({
        'Id': generator.uuid(),
        'foodId': req.body.foodId,
        'foodName': req.body.foodName,
        'foodCost': req.body.foodCost,
        'foodType': req.body.foodType
    });
    res.status(201).send('Dish added successfully!');
})
module.exports = router;