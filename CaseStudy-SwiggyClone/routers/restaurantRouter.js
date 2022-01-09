const express = require('express');
const { isAuthorised, protectRoute } = require('../controllers/authController');
const { registerRestaurant, getRestaurant, updateRestaurant } = require('../controllers/restaurantController');
const restaurantRouter = express.Router();

restaurantRouter.use(protectRoute);
restaurantRouter.use(isAuthorised(['restaurantOwner']));
restaurantRouter.route('/')
.post(registerRestaurant)
.patch(updateRestaurant);
// .delete(deleteRestaurant);

restaurantRouter.route('/restaurantProfile')
.get(getRestaurant);

// restaurantRouter.route('/crud')
// .post(addFoodItem)
// .patch(updateFoodItem)
// .delete(deleteFoodItem);


module.exports = restaurantRouter;
