const userRoutes  = require('./user.routes');
// const foodRoutes = require('./food.routes');


const router = require('express').Router();



router.use('/user',userRoutes);
// router.use('/food',foodRoutes);


module.exports = router;