const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Address = require("./Address");
const Food = require("./Food");

const RestaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "can't be blank"],
            index: true,
        },
        username: {
            type: String,
            unique: true,
            required: [true, "can't be blank"],
            match: [/^[a-zA-Z0-9]+$/, "is invalid"],
            index: true,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, "is invalid"],
            index: true,
        },
        balance: {
            type: Number,
            default: 0,
        },
        address: {
            type: Object,
            ref: Address,
        },
        menu: [
            {
                type: Object,
                ref: Food,
            },
        ],
        password: {
            type: String,
        },
    },
    { timestamps: true }
);

RestaurantSchema.plugin(AutoIncrement, { inc_field: "restaurantId" });
RestaurantSchema.plugin(uniqueValidator, { message: "is already taken." });

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
