const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const User = require("./User");
const Restaurant = require("./Restaurant");

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: Number,
        },
        restaurantId: {
            type: Number,
        },
        foodList: [
            {
                foodId: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        amount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

OrderSchema.plugin(AutoIncrement, { inc_field: "orderId" });

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
