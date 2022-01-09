import express from "express"
import { addQuestion, addAnswer, getAnswersByQuestionId, updateAnswer } from "../controller/questionController.js"
import { authenticateToken } from "../controller/auth.js"
const router = express.Router()

//POST request to add a question
router.post("/question", authenticateToken, addQuestion)


//POST request to answer a question
router.post("/question/:questionId/answer", authenticateToken, addAnswer )


//GET request to get all the answers of a question 
router.get("/question/:questionId", authenticateToken, getAnswersByQuestionId)

router.put("/question/:questionId/answer", authenticateToken, updateAnswer )

export default router
