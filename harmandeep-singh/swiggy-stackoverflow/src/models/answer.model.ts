import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Answer = mongoose.model("Answer", AnswerSchema);
export default Answer;