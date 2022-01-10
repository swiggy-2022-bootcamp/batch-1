const router = require("express").Router();
const verifyToken = require("../utils/verifyToken");
const {
    postQuestion,
    getQuestionAnswers,
    postAnswer,
    updateAnswer,
    updateQuestion
} = require("../controllers/questionController");

router.post("/", verifyToken, postQuestion);

router.get("/:id", verifyToken, getQuestionAnswers);

router.put("/:id", verifyToken, updateQuestion)

router.post("/:id/answer", verifyToken, postAnswer);

router.put("/:id/answer", verifyToken, updateAnswer);

module.exports = router;
