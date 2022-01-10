const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
    {
        houseNo: {
            type: String,
        },
        street: {
            type: String,
            required: [true, "can't be blank"],
        },
        city: {
            type: String,
            required: [true, "can't be blank"],
        },
        state: {
            type: String,
            required: [true, "can't be blank"],
        },
        zip: {
            type: String,
            required: [true, "can't be blank"],
            match: [/^[1-9][0-9]{5}$/, "is invalid"],
        },
    },
    { timestamps: true }
);

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;
