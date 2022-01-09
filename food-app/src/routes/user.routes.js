const router = require('express').Router();
const { demoFun, getAllUsers } = require('../controller/user.controller');
const { verifyToken } = require('../middleware/verifyToken');



// router.get('/demo',demoFun);
router.get('/',verifyToken,getAllUsers);


module.exports = router;