import express from "express"
import { addQuestion, addAnswer, getAnswersByQuestionId, updateAnswer } from "../controller/questionController.js"
import { authenticateToken } from "../middleware/auth.js"
import {securityLayer} from "../middleware/securityLayer.js"
const router = express.Router()

//POST request to add a question
router.post("/question", authenticateToken, securityLayer,  addQuestion)


//POST request to answer a question
router.post("/question/:questionId/answer", authenticateToken, securityLayer, addAnswer )


//GET request to get all the answers of a question 
router.get("/question/:questionId", authenticateToken, securityLayer, getAnswersByQuestionId)

// PUT request to update user answer.
router.put("/question/:questionId/answer", authenticateToken, securityLayer, updateAnswer )

export default router
