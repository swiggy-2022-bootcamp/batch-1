const router = require('express').Router();
const {notFoundError, methodNotAllowedError} = require('../controllers/handleBadRequest');

router.get('/', (_, res) => {
    res.status(200).json({
        status: "API is working!"
    });
});

router.use('/question', require('./question'));
router.use('/user', require('./user'));

// Reject all other urls and methods
router.get('*', notFoundError);
router.all('*', methodNotAllowedError);

module.exports = router;