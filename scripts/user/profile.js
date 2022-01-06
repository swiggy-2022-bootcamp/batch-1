const express = require('express');
const UUID = require('uuid-int');
const generator = UUID(3);
const router = express.Router();

// Database
const users = require('../../db/users');

router.get('/:userID', (req, res) => {
    const id = req.params.userID;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            res.status(200).send(users[i]);
            return;
        }
    }
    res.status(404).send(`Sorry user With ${id} not found`);
});

module.exports = router;