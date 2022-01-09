var express = require("express");
var router = express.Router();

const companyRouter = require("./companyRouter");
const userRouter = require("./userRouter");
const restaurantRouter = require("./restaurantRouter");

router.use("/company", companyRouter);
router.use("/users", userRouter);
router.use("/restaurants", restaurantRouter);

module.exports = router;
