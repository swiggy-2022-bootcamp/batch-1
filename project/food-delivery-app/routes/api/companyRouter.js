const express = require("express");
const router = express.Router();

const CompanyController = require("../../controller/CompanyController");

router.get("/", CompanyController.getCompany);
router.post("/", CompanyController.createCompanyIfNotPresent);
router.get("/balance", CompanyController.getCompanyBalance);

module.exports = router;
