const Company = require("../models/Company");

const createError = require("http-errors");

const createCompanyIfNotPresent = async (req, res, next) => {
    try {
        const existingCompanies = await Company.find();
        if (existingCompanies.length == 0) {
            throw createError(400, "Only 1 Company can exist!!!");
        }
        const company = new Company({
            name: req.body.name,
            balance: 0,
        });
        const result = await company.save();
        res.send(result);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const getCompany = async (req, res, next) => {
    try {
        const result = await Company.find({}, { name: 1, balance: 1, _id: 0 });
        result.length > 0
            ? res.send(result[0])
            : res.send("Company does not exist!!!");
    } catch (error) {
        console.log(error.message);
    }
};

const getCompanyBalance = async (req, res, next) => {
    try {
        const result = await Company.find({}, { balance: 1, _id: 0 });
        result.length > 0
            ? res.send(result[0])
            : res.send("Company does not exist!!!");
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    createCompanyIfNotPresent,
    getCompany,
    getCompanyBalance,
};
