import express from "express";
import { registerController, loginController, changePasswordController } from "../controller/userController.js"
const router = express.Router()

//POST request for registration
router.post("/register", registerController)

//POST request for login
router.post("/login", loginController)

//POST request for change password
router.post("/change-password", changePasswordController);
export default router