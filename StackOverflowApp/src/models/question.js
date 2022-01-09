import mongoose from "mongoose";
const {Schema} = mongoose

//Creates a collection "QUESTION" in the database
const QuestionSchema = new mongoose.Schema({
    user:{
        type : Schema.Types.ObjectId,
        ref : "USER"
    },
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    answers : [{
        user :{
            type : Schema.Types.ObjectId,
            ref : "USER"
        },
        answer : {
            type : String
        }
    }]
})

const QuestionModel = mongoose.model("QUESTION",QuestionSchema, "QUESTION")

export default QuestionModel