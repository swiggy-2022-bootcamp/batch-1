const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    answerId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    questionId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;