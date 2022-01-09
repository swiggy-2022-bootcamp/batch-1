const express = require('express');
const { isAuthorised, protectRoute } = require('../controllers/authController');
const { registerRestaurant } = require('../controllers/restaurantController');
const restaurantRouter = express.Router();

restaurantRouter.use(protectRoute);
restaurantRouter.use(isAuthorised(['restaurantOwner']));
restaurantRouter.route('/')
.post(registerRestaurant);

// restaurantRouter.route('/crud')
// .post(addFoodItem)
// .patch(updateFoodItem)
// .delete(deleteFoodItem);


module.exports = restaurantRouter;
