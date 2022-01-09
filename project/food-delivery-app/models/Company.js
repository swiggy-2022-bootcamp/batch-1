const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "can't be blank"],
        },
        balance: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
