var express = require("express");
var router = express.Router();

const authUtils = require("../../utils/authUtils");

const verifyRestaurantToken = authUtils.verifyRestaurantToken;

const RestaurantController = require("../../controller/RestaurantController");

router.get("/", RestaurantController.getRestaurants);
router.get("/:restaurantId", RestaurantController.getRestaurantById);
router.post("/register", RestaurantController.registerRestaurant);
router.post("/login", RestaurantController.loginRestaurant);
router.put(
    "/:restaurantId",
    verifyRestaurantToken,
    RestaurantController.modifyRestaurantByIdIfPresent
);
router.get(
    "/:restaurantId/balance",
    verifyRestaurantToken,
    RestaurantController.getRestaurantBalance
);
router.get("/:restaurantId/menu", RestaurantController.getRestaurantMenu);
router.post(
    "/:restaurantId/menu",
    verifyRestaurantToken,
    RestaurantController.createRestaurantMenu
);
router.get(
    "/:restaurantId/menu/:foodId",
    RestaurantController.getRestaurantMenuItem
);
router.delete(
    "/:restaurantId/menu/:foodId",
    RestaurantController.deleteFoodFromRestaurantMenu
);
router.get(
    "/:restaurantId/orders",
    verifyRestaurantToken,
    RestaurantController.getRestaurantOrders
);
router.get(
    "/:restaurantId/orders/:orderId",
    verifyRestaurantToken,
    RestaurantController.getRestaurantOrderbyId
);
router.delete(
    "/:restaurantId",
    verifyRestaurantToken,
    RestaurantController.deleteRestaurantById
);

module.exports = router;
