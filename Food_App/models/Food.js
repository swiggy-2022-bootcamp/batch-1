const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema({
    foodId: {
        type: Number,
        required: true
    },
    foodName: {
        type: String,
        required: true
    },
    foodCost: {
        type: Number,
        required: true
    },
    foodType: {
        type: String,
        default: 'Indian'
    }
},{ versionKey: false });


module.exports = mongoose.model('Foods', FoodSchema);