const router = require('express').Router();
const { demoFun } = require('../controller/user.controller');



router.get('/demo',demoFun);


module.exports = router;