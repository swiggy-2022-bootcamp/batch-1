const express = require('express');
const router = express.Router();

router.get('/', (_, res) => { 
    res.status(200).send("Working (fron routes)!") 
});

router.use('/api', require('./api'));

module.exports = router;