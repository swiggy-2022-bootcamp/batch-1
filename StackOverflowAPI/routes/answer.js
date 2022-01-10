const router = require('express').Router();

router.get('/', (req, res) => {res.send(req.url)});

module.export = router;