const router = require('express').Router();
const { demoFun, getAllUsers, getUserById } = require('../controller/user.controller');
const { verifyToken } = require('../middleware/verifyToken');



// router.get('/demo',demoFun);
router.get('/',verifyToken,getAllUsers);
router.get('/:userID',verifyToken,getUserById);


module.exports = router;