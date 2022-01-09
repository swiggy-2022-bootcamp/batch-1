const express = require("express");
const router = express.Router();

const authUtils = require("../../utils/authUtils");

const verifyUserToken = authUtils.verifyUserToken;

const UserController = require("../../controller/UserController");

router.get("/", UserController.getUsers);
router.post("/register", UserController.registerNewUser);
router.post("/login", UserController.loginUser);

router.get("/:userId", verifyUserToken, UserController.getuserById);
router.put("/:userId", verifyUserToken, UserController.modifyUserByIdIfPresent);
router.get("/:userId/balance", verifyUserToken, UserController.getUserBalance);
router.put(
    "/:userId/balance",
    verifyUserToken,
    UserController.modifyUserBalance
);
router.get("/:userId/cart", verifyUserToken, UserController.fetchUserCart);
router.post("/:userId/cart", verifyUserToken, UserController.modifyUserCart);
router.post(
    "/:userId/cart/checkout",
    verifyUserToken,
    UserController.userCheckout
);
router.delete("/:userId", verifyUserToken, UserController.deleteUserById);

module.exports = router;
