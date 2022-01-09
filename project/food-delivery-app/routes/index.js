var express = require("express");
var router = express.Router();

router.use("/api", require("./api/index"));

module.exports = router;
