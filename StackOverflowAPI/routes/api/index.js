const router = require('express').Router();

router.get('/', (_, res) => {
    res.send("working api!");
});

module.exports = router;