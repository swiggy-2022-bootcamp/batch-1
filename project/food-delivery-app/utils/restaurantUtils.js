var express = require("express");
var router = express.Router();

const Restaurant = require("../models/Restaurant");

const getRestaurant = async (restaurantId) => {
    const result = await Restaurant.find({ restaurantId: restaurantId });
    return result;
};

const getFoodIdList = async (restaurantId) => {
    const restaurants = await getRestaurant(restaurantId);
    let foodIdList = [];
    if (restaurants.length > 0) {
        restaurants[0].menu.forEach((element) => {
            foodIdList.push(element.foodId);
        });
    }
    console.log(foodIdList);
    return foodIdList;
};

const updateBalance = async (restaurantId, updateAmount) => {
    const restaurant = await Restaurant.findOne({ restaurantId: restaurantId });
    if (restaurant) {
        const currentBalance = restaurant.balance;
        const newBalance = currentBalance + updateAmount;
        const result = await Restaurant.updateOne(
            {
                restaurantId: restaurantId,
            },
            {
                $set: {
                    balance: newBalance,
                },
            }
        );
        return result;
    }
};

const deleteItemFromArray = (array, matcher) => {
    let itemIndex = array.findIndex(matcher);
    let deletedItem = array[itemIndex];
    array.splice(itemIndex, 1);
    return [deletedItem, array];
};

module.exports = {
    getRestaurant,
    getFoodIdList,
    updateBalance,
    deleteItemFromArray,
};
