import mongoose from "mongoose"
const { Schema } = mongoose

const AnswerSchema = new mongoose.Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: "USER"
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: "QUESTION"
    },
    answer: {
        type: String,
    },
})

const AnswerModel = mongoose.model("ANSWER", AnswerSchema, "ANSWER");

export default AnswerModel;