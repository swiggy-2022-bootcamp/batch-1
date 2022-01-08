const httpStatus = require('http-status');
// const ApiError = require('../utils/ApiError');
// const catchAsync = require('../utils/catchAsync');
const { foodService } = require('../services');

const getFood = async (req, res, next) => {
  const id = req.params.foodId;
  const food = await foodService.getFoodById(id);
  if (food) {
    await res.status(httpStatus.OK);
    await res.send(food);
  } else {
    // throw new ApiError(httpStatus.NOT_FOUND, 'Food not found');
    await res.status(httpStatus.NOT_FOUND);
    await res.send(`Sorry food with ${id} not found`);
  }
};

const updateFood = async (req, res, next) => {
  const id = req.params.foodId;
  const food = await foodService.updateFoodInfo(id, req.body);

  if (food) {
    await res.status(httpStatus.OK).send(food);
  } else {
    // throw new ApiError(httpStatus.NOT_FOUND, 'food not found');
    await res.status(httpStatus.NOT_FOUND);
    await res.send(`Sorry food with ${id} not found`);
  }
};

const createFood = async (req, res, next) => {
  const body = req.body;
  const food = await foodService.createFood(body);

  if (food) {
    await res.status(httpStatus.CREATED);
    await res.send(food);
  } else {
    // throw new ApiError(httpStatus.NOT_FOUND, 'Food not found');
    await res.status(httpStatus.INTERNAL_SERVER_ERROR);
    await res.send({ message: 'Something went wrong' });
  }
};

module.exports = {
  getFood,
  createFood,
  updateFood,
};
