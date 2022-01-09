const { jwt } = require("../middleware");
const controller = require("../controllers/user");

module.exports = function (app) {
  app.use(function (_req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/test/user",
    [jwt.verifyToken],
    controller.user
  );

  app.get(
    "/api/test/admin",
    [jwt.verifyToken, jwt.isAdmin],
    controller.admin
  );
};