import express from "express"
import { addQuestion, addAnswer } from "../controller/questionController.js"

const router = express.Router()

router.post("/question", addQuestion)

router.post("/question/:questionId/answer", addAnswer )

export default router
