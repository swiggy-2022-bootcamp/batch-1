import express from "express"
import { addQuestionController, answerQuestionController, updateAnswerController, getQuestionsController } from "../controllers/questionController.js";

const router = express.Router()

//POST request to add a question
router.post("/question", addQuestionController);

//POST request to answer a question
router.post("/question/:question_id/answer", answerQuestionController);

// PUT request to update user answer.
router.put("/question/:question_id/answer", updateAnswerController);

//GET request to get all the answers of a question 
router.get("/question/:question_id", getQuestionsController);

export default router