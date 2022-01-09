const { jwt } = require("../middleware");
const controller = require("../controllers/Food/food");

module.exports = function (app) {
  app.use(function (_req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //All operations are allowed only by Admin
  app.get(
    "/api/foods",
    [jwt.verifyToken, jwt.isAdmin],
    controller.getAllFoods
  );

  app.get(
    "/api/foods/:id",
    [jwt.verifyToken, jwt.isAdmin],
    controller.getFood
  );

  app.post(
    "/api/foods",
    [jwt.verifyToken, jwt.isAdmin],
    controller.addFood
  );

  app.put(
    "/api/foods/:id",
    [jwt.verifyToken, jwt.isAdmin],
    controller.updateFood
  );

  app.delete(
    "/api/foods/:id",
    [jwt.verifyToken, jwt.isAdmin],
    controller.deleteFood
  );
};