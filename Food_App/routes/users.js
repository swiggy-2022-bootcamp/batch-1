const express = require('express')
const router = express.Router();
const User = require('../models/User');


// POSTS USER ENTRY (REGISTER)
router.post('/register', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address
    });

    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.json({message: err});
    }
});

// POSTS USER ENTRY (LOGIN)
router.post('/authenticate', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    try {
        const user = await User.find(
            { 
                "username": req.body.username, 
                "password": req.body.password 
            }
        );
        if (user.length == 0) {
            res.status(403).send("Authentication Failed.");
        }
        else {
            res.status(200).send("User logged in successfully!");
        }
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
        res.send("Sorry, user with ID: " + req.params.userId + " not found");
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
                    email: req.body.email,
                    address: {
                        houseno: req.body.address.houseno,
                        street: req.body.address.street,
                        city: req.body.address.city,
                        state: req.body.address.state,
                        zip: req.body.address.zip,
                    }
                } 
            });
        res.json(updatedUser);
    } catch (err) {
        res.send('Sorry, user with ID: ' + req.params.userId + ' not found')
    }
});

// DELETES SPECIFIC USER
router.delete('/users/:userId', async (req, res) => {
    try {
        const removedUser = await User.deleteOne({ _id: req.params.userId });
        res.send('User Deleted Successfully')
    } catch (err) {
        res.send('Sorry, user with ID: ' + req.params.userId + ' not found')
    }
});

// UPDATES USER USING PATCH
router.patch('/users/:userId', async (req, res) => {
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