import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema({
        user: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
        title: {type: String, required: true},
        body: {type: String, required: true},
        answers: [{user: {type: mongoose.Schema.Types.ObjectId, ref: "users"}, answer: {type: String}}]
    },
    {collection: 'questions'}
)

const model = mongoose.model('QuestionSchema', QuestionSchema);

export default model;