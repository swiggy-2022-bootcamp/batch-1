import { Router } from "express";
import {
    addQuestion,
    addAnswer,
    getQuestion,
    getQuestions,
    updateAnswer,
    updateQuestion,
    deleteAnswer,
    deleteQuestion,
} from "../controllers/questions/questions.controller";
import isAuthenticated from "../middleware/authentication/token.auth";
import { validateAnswer, validateQuestion } from "../middleware/validators/questions/questions.validators";

const rewardRouter = Router();

export default (router: Router): void => {
    router.use("/question", rewardRouter);

    rewardRouter.get("/", getQuestions);
    rewardRouter.post("/", isAuthenticated, validateQuestion, addQuestion);

    rewardRouter.get("/:questionid", getQuestion);
    rewardRouter.patch("/:questionid", isAuthenticated, validateQuestion, updateQuestion);
    rewardRouter.delete("/:questionid", isAuthenticated, deleteQuestion);

    rewardRouter.post("/:questionid/answer", isAuthenticated, validateAnswer, addAnswer);
    rewardRouter.patch("/:questionid/answer", isAuthenticated, validateAnswer, updateAnswer);
    rewardRouter.delete("/:questionid/answer", isAuthenticated, deleteAnswer);
};
