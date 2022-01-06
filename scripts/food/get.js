const express = require('express');
const UUID = require('uuid-int');
const generator = UUID(0);
const router = express.Router();

// Database
const foods = require('../../db/dishes');

router.get('/:foodID', (req, res) => {
    const id = req.query.foodID;
    for (let i = 0; i < foods.length; i++) {
        if (id == foods[i].Id) {
            res.status(200).send(foods[i]);
            return;
        }
    }
    res.status(404).send(`Sorry Food Not Found!`);
})

module.exports = router;