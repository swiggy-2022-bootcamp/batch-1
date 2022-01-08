const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    restaurantName : {
        type : String,
        required : true
    },
    
    restaurantAddress : {
        type : String,
        required : true
    },

    restaurantRating : {
        type : mongoose.Types.Decimal128,
        default : 0,
        required : true
    },   

    addedAt : {
        type : Date,
        default: () => Date.now()        
    }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);