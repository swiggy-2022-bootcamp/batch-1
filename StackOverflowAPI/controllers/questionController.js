const User = require("../models/user");
const Question = require("../models/question");

const postQuestion = async (req, res) => {
    const quesDetails = req.body["question"];
    const userId = req.userId;

    try {
        // create a new question
        const newQuestion = new Question({
            title: quesDetails["title"],
            body: quesDetails["body"],
            ownerId: userId
        })
        
        // save the question
        await newQuestion.save();

        // add the id of this question to question list of poster
        const user = await User.findOne({_id: userId});
        user.questions.push(newQuestion._id); 
        await user.save();

        res.status(201).json({
            message: "Question posted successfully",
            "question-id": newQuestion._id 
        })
    } catch(err) {
        console.log("In postQuestion (questionController): ", err);
        req.status(500).json({
            message: "Error occured!"
        })
    }
};

const getQuestionAnswers = (req, res) => {
    
};

const postAnswer = (req, res) => {};
const updateAnswer = (req, res) => {};

module.exports = {
    postQuestion,
    getQuestionAnswers,
    postAnswer,
    updateAnswer,
};
