const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Address = require("./Address");
const Cart = require("./Cart");

const UserSchema = new mongoose.Schema(
    {
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
        password: {
            type: String,
        },
        balance: {
            type: Number,
            default: 0,
        },
        address: {
            type: Object,
            ref: Address,
        },
        cart: {
            type: Object,
            ref: Cart,
        },
    },
    { timestamps: true }
);

UserSchema.plugin(AutoIncrement, { inc_field: "userId" });
UserSchema.plugin(uniqueValidator, { message: "is already taken." });

const User = mongoose.model("User", UserSchema);

module.exports = User;
