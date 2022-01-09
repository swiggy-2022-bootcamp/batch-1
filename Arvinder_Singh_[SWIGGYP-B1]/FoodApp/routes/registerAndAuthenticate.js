const router             = require('express').Router();
const userAuthMiddleware = require('../app/middlewares/userAuthMiddleware');
const registerAndAuthenticateController = require('../app/controllers/registerAndAuthenticateController');

router.post('/register', registerAndAuthenticateController().resgister);
router.post('/authenticate', userAuthMiddleware,registerAndAuthenticateController().authenticate);

module.exports = router;