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

// GETS ALL THE USERS
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

// GETS SPECIFIC USER
router.get('/users/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.send("Sorry, user with " + req.params.userId + " not found");
    }
});

// UPDATES USER USING PUT
router.put('/users/:userId', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userId }, 
            { $set: {
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email
                } 
            });
        res.json(updatedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

// DELETES SPECIFIC USER
router.delete('/users/:userId', async (req, res) => {
    try {
        const removedUser = await User.deleteOne({ _id: req.params.userId });
        res.json(removedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

// UPDATES USER USING PATCH
router.patch('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userId }, 
            { $set: 
                { email: req.body.email } 
            }
        );
        res.json(updatedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;