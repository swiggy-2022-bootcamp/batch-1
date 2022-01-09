const router = require('express').Router();
const { getAllUsers, getUserById, updateUserById, deleteByUserID } = require('../controller/user.controller');
const { verifyToken } = require('../middleware/verifyToken');



// router.get('/demo',demoFun);
router.get('/',verifyToken,getAllUsers);
router.get('/:userID',verifyToken,getUserById);
router.put('/',verifyToken,updateUserById);
router.delete('/:userID',verifyToken,deleteByUserID);

module.exports = router;