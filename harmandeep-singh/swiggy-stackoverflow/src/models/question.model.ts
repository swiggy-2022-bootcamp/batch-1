import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    answers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Answer",
        default: []
    }
}, { timestamps: true });

const Question = mongoose.model("Question", QuestionSchema);
export default Question;