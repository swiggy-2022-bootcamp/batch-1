const { Food } = require("../models");
const { sendJSONResponse, sendBadRequest } = require("../utils/handle");

exports.addNewFood = async (req, res) => {
  try {
    const { foodId, foodName, foodCost, foodType } = req.body;
    const food = await new Food({   
      foodId,
      foodName,
      foodCost,
      foodType,
    });
    const data = await food.save();
    return sendJSONResponse(res, 201, "Food Added", data);
  } catch (error) {
    console.log(error);
    return sendBadRequest(res, 500, `Error:${error.message}`);
  }
};

exports.getFoodByID = async (req, res) => {
  try {
      const { foodID} = req.params;
      const food = await Food.findOne({foodId: foodID});
      if (!food){
          return sendBadRequest(res,404,"Sorry Food Not Found");
      }
      return sendJSONResponse(res,200,'Food By Id',food);
  } catch (error) {}
};
