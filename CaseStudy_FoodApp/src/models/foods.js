const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodId: {
        type: Number,
        required: true
    },
    foodName: {
        type: String,
        required: true,
        trim: true
    },
    foodCost: {
        type: Number,
        required: true,
    },
    foodType: {
        type: String,
        enum: ['Indian', 'Chinese', 'Mexican'],
        required: true,
        trim: true
    }
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;