const { verifyLogin } = require("../middleware");
const controller = require("../controllers/auth");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/register",
    [
      verifyLogin.checkDuplicateUsernameOrEmail,
      verifyLogin.checkRolesExisted
    ],
    controller.register
  );

  app.post("/api/login", controller.login);
};