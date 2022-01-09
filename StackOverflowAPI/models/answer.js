const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require('./comment');

const answerSchema = new Schema(
    {
        body: {
            type: String,
            required: true,
        },
        likeCount: {
            type: Number,
            default: 0,
        },
        questionId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        ownerId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
