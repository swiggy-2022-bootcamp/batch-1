const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const Question = require('./question');
const Answer = require('./answer');
const Comment = require('./comment');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "User's name is required!"],
        },
        email: {
            type: String,
            required: [true, "Email Id is required!"],
            unique: true,
            validate: {
                validator: (value) => {
                    return isEmail(value);
                },
                message: "Invalid Email Address!"
            }
        },
        password: {
            type: String,
            required: [true, "Password is required!"],
        },
        about: String,
        questions: [
            {
                type: Schema.Types.ObjectId,
                ref: "Question",
            },
        ],
        answers: [
            {
                type: Schema.Types.ObjectId,
                ref: "Answer",
            },
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        likedQuestions: [
            {
                type: Schema.Types.ObjectId,
                ref: "Question",
            },
        ],
        likedAnswers: [
            {
                type: Schema.Types.ObjectId,
                ref: "Answer",
            },
        ],
        likedComments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        reputation: {
            type: Number,
            default: 0,
        },
        avatar: {
            type: String,
            default: null,
        },
        badges: {
            gold: {
                type: Number,
                default: 0,
            },
            silver: {
                type: Number,
                default: 0,
            },
            bronze: {
                type: Number,
                default: 0,
            },
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
