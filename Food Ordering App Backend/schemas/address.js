const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({

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

module.exports = mongoose.model("Address", addressSchema);