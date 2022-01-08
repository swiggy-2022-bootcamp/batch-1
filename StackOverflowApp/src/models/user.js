import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.model("USER", UserSchema, "USER");

export default UserModel;