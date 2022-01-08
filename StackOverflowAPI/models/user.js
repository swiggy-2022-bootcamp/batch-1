const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    about: String,
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ],
    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Answer'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likedQuestions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ],
    likedAnswers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Answer'
        }
    ],
    likedComments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    reputation: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);
module.exports = User;