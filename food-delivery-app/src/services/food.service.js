const { Food } = require('../models');

async function getFoodById(id) {
  try {
    const food = await Food.findOne({ foodId: id }).exec();
    if (food) {
      return food;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function createFood(foodBody) {
  try {
    const newFood = await Food.create(foodBody);
    if (newFood) {
      return newFood;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}


async function updateFoodInfo(foodId, foodBody) {
  try {
    const food = await Food.findOneAndUpdate({ foodId }, foodBody, {
      new: true,
    }).exec();
    if (food) {
      return food;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  getFoodById,
  createFood,
  updateFoodInfo,
};
