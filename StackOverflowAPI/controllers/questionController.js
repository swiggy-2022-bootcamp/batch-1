const User = require("../models/user");
const Question = require("../models/question");
const Answer = require("../models/answer");
const {
    notFound,
    unauthorizedError,
    createSuccess,
    fetchSuccess,
    internalServerError,
} = require("../utils/responseTypes");
const mongoose = require("mongoose");

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

        // add the id of this question to question list of poster
        const user = await User.findOne({ _id: userId });
        if (!user) return unauthorizedError(res, "Unauthorized user!");

        user.questions.push(newQuestion._id);
        await user.save();

        // save the question
        await newQuestion.save();
        return createSuccess(res, "Question posted successfully", { "question-id": newQuestion._id });
    } catch (err) {
        console.log("In postQuestion (questionController): ", err);
        return internalServerError(res, "Error occured!");
    }
};

const getQuestionAnswers = async (req, res) => {
    const quesId = req.params.id;

    try {
        // check if question id is invalid
        if(!mongoose.Types.ObjectId.isValid(quesId))
            return notFound(res, "Invalid question (id)!");
            
        // get the question with id quesId
        const questionDetails = await Question.findOne({ _id: quesId })
            .populate("comments")
            .populate("answers")
            .exec();

        if (!questionDetails) return notFound(res, "Question with this id not found!");

        return fetchSuccess(res, "Question details and answers fetched successfully", questionDetails.toObject());
    } catch (err) {
        console.log("In getQuestionAnswers (questionController): ", err);
        return internalServerError(res, "Error occured!");
    }
};

const postAnswer = async (req, res) => {
    const quesId = req.params.id;
    const answerBody = req.body["question"]["answer"];
    const userId = req.userId;

    try {
        // check if question id is invalid
        if(!mongoose.Types.ObjectId.isValid(quesId))
            return notFound(res, "Invalid question (id)!");

        // create an answer with the give content
        const newAnswer = new Answer({
            body: answerBody,
            ownerId: userId,
            questionId: quesId,
        });

        // find the user with Id userId and add this answer to their answerlist
        const user = await User.findOne({ _id: userId });
        if (!user) return unauthorizedError(res, "User unauthorized!");

        user.answers.push(newAnswer._id);
        await user.save();

        // find the question with Id quesId and add this answer to that question
        const question = await Question.findOne({ _id: quesId });
        if (!question) {
            // if questions not found remove the answer from the user's answers list too
            user.answers.pull(newAnswer._id);
            await user.save();
            return notFound(res, "Questions with this id not found!");
        }

        question.answers.push(newAnswer._id);
        await question.save();

        // save the answer
        await newAnswer.save();

        return createSuccess(res, "Answer posted successfully", { "question-id": quesId });
    } catch (err) {
        console.log("In postAnswer (questionController): ", err);
        return internalServerError(res, "Error occured!");
    }
};

const updateQuestion = async (req, res) => {
    const quesId = req.params.id;
    const newQuestionBody = req.body["question"]["body"];
    const newQuestionTitle = req.body["question"]["title"];

    try {
        // check if question id is invalid
        if(!mongoose.Types.ObjectId.isValid(quesId))
            return notFound(res, "Invalid question (id)!");

        // find the question
        const question = await Question.findOne({_id: quesId});

        if(!question) return notFound(res, "Question with id not found!");

        if(newQuestionBody) question.body = newQuestionBody;

        if(newQuestionTitle) question.title = newQuestionTitle;

        await question.save();

        return createSuccess(res, "Question updated successfully!", { "question-id": quesId })

    } catch(err) {
        console.log("In updateQuestion (questionController): ", err);
        return internalServerError(res, "Error occured!");
    }
}

const updateAnswer = async (req, res) => {
    const quesId = req.params.id;
    const newAnswerBody = req.body["question"]["answer"];
    const userId = req.userId;

    try {
        // check if question id is invalid
        if(!mongoose.Types.ObjectId.isValid(quesId))
            return notFound(res, "Invalid question (id)!");

        // find users answer for this question
        const answer = await Answer.findOne({ ownerId: userId, questionId: quesId });

        if (!answer) return notFound(res, "Answer not found to update!");

        answer.body = newAnswerBody;
        await answer.save();

        return createSuccess(res, "Answer updated successfully", { "question-id": quesId });
    } catch (err) {
        console.log("In updateAnswer (questionController): ", err);
        return internalServerError(res, "Error occured!");
    }
};

module.exports = {
    postQuestion,
    getQuestionAnswers,
    postAnswer,
    updateAnswer,
    updateQuestion
};
