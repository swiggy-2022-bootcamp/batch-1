const jwtLib = require("jsonwebtoken");
const config = require("../config/auth.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwtLib.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isLoggedInUser = (req, res, next) => {
  if (req.userId.toString() !== req.params?.id) {
    res.status(403).send({
      message: "Permission Denied"
    });
    return;
  }
  next();
  return;
}

isAdminOrLoggedInUser = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
    });
  });

  if (req.userId.toString() === req.params?.id) {
    next();
    return;
  }
  console.log(req);
  res.status(403).send({
    message: "Permission Denied!"
  });
  return;
}

const jwt = {
  verifyToken,
  isAdmin,
  isLoggedInUser,
  isAdminOrLoggedInUser
};
module.exports = jwt;
