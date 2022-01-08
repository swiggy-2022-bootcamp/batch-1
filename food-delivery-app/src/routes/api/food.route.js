const express = require('express');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
const foodController = require('../../controllers/food.controller');

const router = express.Router();

router
  .route('/:foodId')
  .get(foodController.getFood)
  .post(foodController.createFood)
  .put(foodController.updateFood);

module.exports = router;
