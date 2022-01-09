const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Answer'
        }
    ],
    ownerId: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;