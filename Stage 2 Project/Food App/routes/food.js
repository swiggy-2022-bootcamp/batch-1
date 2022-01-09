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

 //Allowed by user and Admin
  app.get(
    "/api/foods",
    [jwt.verifyToken],
    controller.getAllFoods
  );

  app.get(
    "/api/foods/:id",
    [jwt.verifyToken],
    controller.getFood
  );

  //Admin by Admin Only
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