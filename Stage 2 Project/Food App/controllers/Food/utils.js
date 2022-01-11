const FOOD_TYPES = ['Indian', 'Chinese', 'Mexican']
const db = require("../../models");
const Food = db.food;

const validateFood = (foods) => {
  return foods.filter((food) => {
    const { foodName, foodCost, foodType } = food
    if (!foodName || !foodCost || !foodType || !FOOD_TYPES.includes(foodType)) {
      return false;
    }
    Food.findOne({
      where: {
        foodName
      }
    }).then(food => {
      if (food) {
        return false;
      }
    });
    return true;
  })
}

module.exports = {
  FOOD_TYPES,
  validateFood
}