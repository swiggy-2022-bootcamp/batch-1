const express = require('express')
const router = express.Router();
const Food = require('../models/Food');


// POSTS FOOD ENTRY
router.post('/', async (req, res) => {
    const food = new Food({
        foodId: req.body.foodId,
        foodName: req.body.foodName,
        foodCost: req.body.foodCost,
        foodType: req.body.foodType
    });

    try {
        const savedFood = await food.save();
        res.status(201).json(savedFood);
    } catch (err) {
        res.json({message: err});
    }
});

// GETS ALL THE FOOD ITEMS
router.get('/', async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (err) {
        res.json({ message: err });
    }
});

// GETS SPECIFIC FOOD ITEM
router.get('/:foodId', async (req, res) => {
    try {
        const food = await Food.find({ "foodId": req.params.foodId });
        if (food.length == 0) {
            res.send("Sorry, food with ID: " + req.params.foodId + " not found");
        }
        else {
            res.json(food);
        }
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;