const { Food } = require('../models');
// const httpStatus = require('http-status');
// const ApiError = require('../utils/ApiError');

const extractFoodInfo = (food) => {
  const { foodId, foodName, foodType, foodCost } = food;
  return {
    foodId,
    foodName,
    foodType,
    foodCost,
  };
};

async function getFoodById(id) {
  try {
    const food = await Food.findById(id).exec();
    if (food) {
      const foodData = extractFoodInfo(food);
      return foodData;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function createFood(foodBody) {
  try {
    const newFood = await Food.create(foodBody);
    if (newFood) {
      const foodData = extractFoodInfo(newFood);
      return foodData;
    }
  } catch (error) {
    return null;
  }
}

// if (await Food.isEmailTaken(foodBody.email)) {
//   return { isEmailTaken: true };
// }
// else if (await Food.isIdTaken(foodBody.id)) {
//   return { isIdTaken: true };
// }
// else {

async function updateFoodInfo(id, foodBody) {
  try {
    const food = await Food.findOneAndUpdate({ _id: id }, foodBody).exec();
    if (food) {
      const foodData = extractFoodInfo(food);
      return foodData;
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

module.exports = {
  getFoodById,
  createFood,
  updateFoodInfo,
};
