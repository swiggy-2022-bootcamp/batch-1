const express = require('express')
const router = express.Router();
const User = require('../models/User');


// POSTS USER ENTRY
router.post('/register', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address
    });

    try {
        const savedUser = await user.save();
        res.status(201);
        res.json(savedUser);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;