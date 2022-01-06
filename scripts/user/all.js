const express = require('express');
const UUID = require('uuid-int');
const generator = UUID(3);
const router = express.Router();

// Database
const users = require('../../db/users');

router.get('/', (req, res) => {
    res.status(200).send(users);
});

module.exports = router;