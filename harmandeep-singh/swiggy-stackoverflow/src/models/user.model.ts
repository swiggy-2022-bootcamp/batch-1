import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registerationName: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        default: 0
    },
    questions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Question",
        default: []
    },
    answers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Answer",
        default: []
    },
    upvotes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    downvotes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },

}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;