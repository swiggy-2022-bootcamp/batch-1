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

  //Admin
  app.get(
    "/api/users",
    [jwt.verifyToken, jwt.isAdmin],
    controller.getAllUsers
  );

  //Admin (or) LoggedIn User
  app.get(
    "/api/users/:id",
    [jwt.verifyToken, jwt.isAdminOrLoggedInUser],
    controller.getUser
  );

  //LoggedIn User
  app.put(
    "/api/users/:id",
    [jwt.verifyToken, jwt.isLoggedInUser],
    controller.updateUser
  );

  //LoggedIn User
  app.delete(
    "/api/users/:id",
    [jwt.verifyToken, jwt.isLoggedInUser],
    controller.deleteUser
  );
};