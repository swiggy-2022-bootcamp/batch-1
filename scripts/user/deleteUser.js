const express = require('express');
const router = express.Router();

// Database
const users = require('../../db/users');

router.delete('/:userID', (req, res) => {
    const id = req.params.userID;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            users.splice(i, 1);
            res.status(200).send('User Deleted Successfully!');
            return;
        }
    }
    res.status(404).send(`Sorry user With ${id} not found`);
});

module.exports = router;