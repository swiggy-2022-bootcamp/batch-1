const express = require('express');
const UUID = require('uuid-int');
const generator = UUID(0);
const router = express.Router();

// Database
const users = require('../../db/users');

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let auth = false;
    const size = users.size();
    for (let i = 0; i < size; i++) {
        if (users[i].username == username && users[i].password == password) {
            auth = true;
            break;
        }
    }
    if (auth) {
        res.status(200).send('User logged in successful');
    }
    else res.status(403).send('Invalid credentials!');
});

module.exports = router;