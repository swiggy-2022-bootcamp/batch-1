const express = require('express');
const restaurantRouter = express.Router();

// importing functions from related controllers
const { isAuthorised, protectRoute } = require('../controllers/authController');
const { registerRestaurant, getRestaurant, updateRestaurant, deleteRestaurant, addFoodItem, removeFoodItem, updateFoodItem } = require('../controllers/restaurantController');

// set role and id of user
restaurantRouter.use(protectRoute);
// check if user is actually one if these roles before any of below execute
restaurantRouter.use(isAuthorised(['restaurantOwner']));

restaurantRouter.route('/')
.post(registerRestaurant)
.patch(updateRestaurant)
.delete(deleteRestaurant);

restaurantRouter.route('/restaurantProfile')
.get(getRestaurant);

restaurantRouter.route('/food')
.post(addFoodItem)
.delete(removeFoodItem)
.patch(updateFoodItem);

module.exports = restaurantRouter;
