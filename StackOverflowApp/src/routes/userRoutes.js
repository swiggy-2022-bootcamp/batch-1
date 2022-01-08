import express from "express";
import { registerController, loginController } from "../controller/userController.js"
const router = express.Router()


//POST request for registration
router.post( "/register", registerController )

//POST request for login
router.post( "/login", loginController )
export default router