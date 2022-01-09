const express = require('express');
const User = require('../models/users');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/api/register', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/api/authenticate', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = await user.generateAuthToken();
        // res.status(200).send({ user, token });
        res.status(200).send({ Message: 'User logged in successful ', token });
    } catch (e) {
        res.status(403).send({
            Message: 'Unable to authenticate'
        });
    }
});

router.post('/api/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(eachObj => eachObj.token !== req.token);
        await req.user.save();
        res.status(200).send({
            Message: 'Successfully logged out of current device'
        })
    } catch (e) {
        res.status(400).send({
            Message: 'Unable to logout'
        })
    }
});

router.post('/api/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send({
            Message: 'Successfully logged out from all devices'
        });
    } catch (e) {
        res.status(400).send({
            Message: 'Unable to logout'
        })
    }
})

router.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/api/users/:userID', async (req, res) => {
    const id = req.params.userID;
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error();
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send({
        Message: `Sorry user with id - ${id} not found`
        });
    }
});

router.put('/api/users', auth, async (req, res) => {
    const updates = Object.keys(req.body);

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.status(200).send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        await user.remove();
        res.status(200).send({
            Message: 'User deleted sccuessfully'
        })
    } catch (e) {
        res.status(400).send({
            Message: `Sorry user with id - ${id} not found`
        })
    }
});


module.exports = router;