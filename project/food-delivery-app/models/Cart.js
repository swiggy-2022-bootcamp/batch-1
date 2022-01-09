const mongoose = require("mongoose");

const Food = require("./Food");

const CartSchema = new mongoose.Schema(
    {
        restaurantId: {
            type: Number,
        },
        foodList: [
            {
                foodId: {
                    type: Number,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
