const { createUser } = require('../controller/auth.controller');
const { checkDuplicateUsernameOrEmail } = require('../middleware/verifySignup');
const userRoutes  = require('./user.routes');
// const foodRoutes = require('./food.routes');


const router = require('express').Router();


router.post('/register',checkDuplicateUsernameOrEmail,createUser);
router.use('/users',userRoutes);
// router.use('/food',foodRoutes);


module.exports = router;