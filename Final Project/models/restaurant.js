const mongoose = require('mongoose');

const restSchema = new mongoose.Schema({
    restId: {
        type: Number,
        required: true
    },
    restName: {
        type: String,
        required: true
    },
    restRating: {
        type: Number,
        required: true,
        default: 1
    },
    restType: {
        type: String,
        enum: ['Dinning', 'Takeaway'],
        required: true,
    },
    //address: {
    houseno: {
        type: Number,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: Number,
        required: true,
    }
    //}
});

module.exports = mongoose.model('Restaurant', restSchema);