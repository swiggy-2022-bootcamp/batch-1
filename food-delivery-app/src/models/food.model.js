const mongoose = require('mongoose');

const foodSchema = mongoose.Schema(
  {
    foodId: {
      type: Number,
      required: true,
    },
    foodName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    foodType: {
      type: String,
      required: true,
      trim: true,
    },
    foodCost: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: false,
  }
);

const Food = mongoose.model('Food', foodSchema);

module.exports.Food = Food;
module.exports.foodSchema = foodSchema;
