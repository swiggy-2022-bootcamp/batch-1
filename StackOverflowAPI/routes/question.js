const router = require('express').Router();

router.get('/', (_, res) => {
    res.status(200).json({
        status: "(question.js) Working!"
    })
});

router.get('/:id/')

router.post('/:id/answer')

router.put('/:id/answer')

module.exports = router;