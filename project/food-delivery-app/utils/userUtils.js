const express = require("express");
const router = express.Router();

const User = require("../models/User");

const updateBalance = async (userId, updateAmount) => {
    const user = await User.findOne({ userId: userId });
    if (user) {
        const currentBalance = user.balance;
        const newBalance = currentBalance + updateAmount;
        const result = await User.updateOne(
            {
                userId: userId,
            },
            {
                $set: {
                    balance: newBalance,
                },
            }
        );
        return result;
    }
};

module.exports = {
    updateBalance,
};
