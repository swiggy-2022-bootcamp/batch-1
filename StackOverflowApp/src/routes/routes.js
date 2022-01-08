import express from "express";
import userModel from "../models/user.js";

const router = express.Router()


// get requests
router.get("/", (req, res)=>{
    res.status(200).send({
        "status": "Connected successfully",
    })
})

export default router