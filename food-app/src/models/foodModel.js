const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoodSchema = new Schema({
  foodId: { type: Number, required: true },
  foodName: { type: String, required: true },
  foodCost: { type: String, required: true },
  foodType: { type: String, enum: ["Indian", "Chinese", "Mexican"] },
});

module.exports = FoodSchema;
