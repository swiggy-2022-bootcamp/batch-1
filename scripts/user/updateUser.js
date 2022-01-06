const express = require('express');
const router = express.Router();

// Database
const users = require('../../db/users');

router.post('/', (req, res) => {
    const id = req.body.userID;
    const size = users.length;
    const flag = true;
    for (let i = 0; i < size; i++) {
        if (users[i].id == id) {
            flag = false;
            users[i].username = req.body.username;
            users[i].email = req.body.email;
            users[i].password = req.body.password;
            users[i].address = req.body.address;
        }
    }
    if (flag) {
        res.status(404).send(`Sorry user With ${id} not found`);
    }
    else {
        res.status(200).send('User details updated!');
    }
});

module.exports = router;