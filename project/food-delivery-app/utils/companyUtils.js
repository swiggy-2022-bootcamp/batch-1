var express = require("express");
var router = express.Router();

const Company = require("../models/Company");

const updateBalance = async (updateAmount) => {
    const company = await Company.findOne();
    if (company) {
        const currentBalance = company.balance;
        const newBalance = currentBalance + updateAmount;
        const result = await Company.updateOne({
            $set: {
                balance: newBalance,
            },
        });
        return result;
    }
};

module.exports = {
    updateBalance,
};
