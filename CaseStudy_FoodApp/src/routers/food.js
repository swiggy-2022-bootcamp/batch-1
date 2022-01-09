const express = require('express');
const Food = require('../models/foods');
const router = new express.Router();

router.post('/api/food', async (req, res) => {
    const food = new Food(req.body);
    try {
        await food.save();
        res.status(201).send(food);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/api/food/:foodID', async (req, res) => {
    const foodId = req.params.foodID;
    try {
        const food = await Food.findOne({foodId});
        if (!food) {
            throw new Error();
        }
        res.status(200).send(food);
    } catch (e) {
        res.status(400).send({
            Message: "Sorry Food Not Found"
        })
    }
})

module.exports = router;