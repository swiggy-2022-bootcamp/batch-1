const express = require('express');
const { isAuthorised, protectRoute } = require('../controllers/authController');
const { registerRestaurant, getRestaurant, updateRestaurant, deleteRestaurant, addFoodItem } = require('../controllers/restaurantController');
const restaurantRouter = express.Router();

restaurantRouter.use(protectRoute);
restaurantRouter.use(isAuthorised(['restaurantOwner','admin']));
restaurantRouter.route('/')
.post(registerRestaurant)
.patch(updateRestaurant)
.delete(deleteRestaurant);

restaurantRouter.route('/restaurantProfile')
.get(getRestaurant);

restaurantRouter.route('/food')
.post(addFoodItem)
// .patch(updateFoodItem)
// .delete(deleteFoodItem);

module.exports = restaurantRouter;
