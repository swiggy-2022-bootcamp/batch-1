const express = require('express');
const UUID = require('uuid-int');
const generator = UUID(3);
const router = express.Router();

// Database
const users = require('../../db/users');

router.post('/', (req, res) => {
    users.push({
        'id': generator.uuid(),
        'username': req.body.username,
        'email': req.body.email,
        'password': req.body.password,
        'address': req.body.address
    });
    res.status(201).send('User Created!');
});

module.exports = router;