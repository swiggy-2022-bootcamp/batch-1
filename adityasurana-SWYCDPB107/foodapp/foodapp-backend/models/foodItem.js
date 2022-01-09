const mongoose = require('mongoose');
const foodItemSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: [true, "This Field is Required"],
        unique: true
    },
    foodId:{
        type: Number,
        required: [true, "This Field is Required"],
        unique: true
    },
    foodName: {
        type: String,
        required: [true, "This Field is Required"]
    },
    foodCost: {
        type: Number,
        required: [true, "This Field is Required"]
    },
    foodType: {
        type: String,
        required: [true, "This Field is Required"],
        enum: ['Indian', 'Chinese', 'Mexican']
    },
});


const foodItemTable = mongoose.model('FoodItemTable',foodItemSchema);
module.exports = foodItemTable;