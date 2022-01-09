const router                = require('express').Router();
const userAuthMiddleware        = require('../app/middlewares/userAuthMiddleware');
const userController       = require('../app/controllers/userController');

router.get('/', userController().getAllUsers);
router.get('/:userId', userController().getUserById);
router.put('/', userAuthMiddleware, userController().updateUser);
router.delete('/:userId',userAuthMiddleware,userController().deleteUser);

module.exports = router;