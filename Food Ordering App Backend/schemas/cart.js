const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

    userName : {
        type : String,
        required : true
    },

    userID : {
        type : String,
        required : true
    },

    restaurantName : {
        type : String,
        required : true
    },

    restaurantID : {
        type : String,
        required : true
    },

    foodName : {
        type : String,
        required : true
    },
    
    foodQuantity : {
        type : Number,
        required : true
    },

    addedAt : {
        type : Date,
        default: () => Date.now()        
    }

});

module.exports = mongoose.model("Cart", cartSchema);