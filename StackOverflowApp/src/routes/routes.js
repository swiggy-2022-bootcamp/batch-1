import express from "express";

const router = express.Router()

// Welcome endpoint when application starts
router.get("/", (req, res)=>{
    res.status(200).send({
        "status": "Connected successfully",
    })
})

export default router