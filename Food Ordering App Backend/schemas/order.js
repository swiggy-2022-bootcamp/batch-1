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




const orderSchema = new mongoose.Schema({

    userID : {
        type : String,
        required : true
    },
    
    transactionTime : {
        type : Date,
        default: () => Date.now()
    },
    
    items : {
        type : [cartSchema],
        required : true
    }

});

module.exports = mongoose.model("Order", orderSchema);