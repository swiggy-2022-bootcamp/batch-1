import express from "express"
import { addQuestionController, answerQuestionController, updateAnswerController, getQuestionsController } from "../controllers/questionController.js";

const router = express.Router()

//POST request to add a question
router.post("/question", addQuestionController);

//POST request to answer a question
router.post("/question/:questionId/answer", answerQuestionController);

// PUT request to update user answer.
router.put("/question/:questionId/answer", updateAnswerController);

//GET request to get all the answers of a question 
router.get("/question/:questionId", getQuestionsController);

export default router