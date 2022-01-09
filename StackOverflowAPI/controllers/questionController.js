const User = require("../models/user");
const Question = require("../models/question");
const Answer = require("../models/answer");

const postQuestion = async (req, res) => {
    const quesDetails = req.body["question"];
    const userId = req.userId;

    try {
        // create a new question
        const newQuestion = new Question({
            title: quesDetails["title"],
            body: quesDetails["body"],
            ownerId: userId,
        });

        // save the question
        await newQuestion.save();

        // add the id of this question to question list of poster
        const user = await User.findOne({ _id: userId });
        user.questions.push(newQuestion._id);
        await user.save();

        res.status(201).json({
            message: "Question posted successfully",
            "question-id": newQuestion._id,
        });
    } catch (err) {
        console.log("In postQuestion (questionController): ", err);
        req.status(500).json({
            message: "Error occured!",
        });
    }
};

const getQuestionAnswers = async (req, res) => {
    const quesId = req.params.id;

    try {
        // get the question with id quesId
        const newQuestion = await Question.findOne({ _id: quesId })
            .populate("comments")
            .populate("answers")
            .exec();

        res.status(200).json({
            ...newQuestion.toObject(),
            message: "Question details and answers fetched successfully",
        });
    } catch (err) {
        console.log("In getQuestionAnswers (questionController): ", err);
        res.status(500).json({
            message: "Error occured!",
        });
    }
};

const postAnswer = async (req, res) => {
    const quesId = req.params.id;
    const answerBody = req.body["question"]["answer"];
    const userId = req.userId;

    try {
        // create an answer with the give content
        const newAnswer = new Answer({
            body: answerBody,
            ownerId: userId,
            questionId: quesId,
        });

        // save the answer
        await newAnswer.save();

        // find the question with Id quesId and add this answer to that question
        const question = await Question.findOne({ _id: quesId });
        question.answers.push(newAnswer._id);
        await question.save();

        // find the user with Id userId and add this answer to their answerlist
        const user = await User.findOne({ _id: userId });
        user.answers.push(newAnswer._id);
        await user.save();

        res.status(201).json({
            message: "Answer posted successfully",
            "question-id": quesId,
        });
    } catch (err) {
        console.log("In postAnswer (questionController): ", err);
        res.status(500).json({
            message: "Error occured!",
        });
    }
};

const updateAnswer = async (req, res) => {
    try {
    } catch (err) {}
};

module.exports = {
    postQuestion,
    getQuestionAnswers,
    postAnswer,
    updateAnswer,
};
