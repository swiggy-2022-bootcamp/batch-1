const mongoose = require('mongoose');
const userAddressSchema = new mongoose.Schema({

    houseno : {
        type : String,
        required : true
    },

    street : {
        type : String,
        required : true
    },

    city : {
        type : String,
        required : true
    },

    state : {
        type : String,
        required : true
    },

    zip : {
        type : String,
        required : true
    }
});

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    address : userAddressSchema,

    createdAt : {
        type : Date,
        default: Date.now()
    },

    token : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("User", userSchema);