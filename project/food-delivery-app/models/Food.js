const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
    {
        foodId: {
            type: Number,
            default: 1,
            required: [true, "can't be blank"],
        },
        foodName: {
            type: String,
            required: [true, "can't be blank"],
        },
        foodCost: {
            type: Number,
            required: [true, "can't be blank"],
        },
        foodType: {
            type: String,
            required: [true, "can't be blank"],
        },
    },
    { timestamps: true }
);

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;
