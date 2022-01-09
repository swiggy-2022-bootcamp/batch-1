require("dotenv").config();
const jwt = require("jsonwebtoken");
const { sendBadRequest } = require("../utils/handle");
exports.verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return sendBadRequest(res, 403, "No token Provided");
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return sendBadRequest(res, 401, "Unauthorized!");
    }
    req.userID = decoded.id;
    next();
  });
};
    