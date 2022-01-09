const mongoose = require('mongoose');
const CounterSchema = require('./counterModel');
const FoodSchema = require('./foodModel');
const UserSchema = require('./userModel');




module.exports = {
    User:  mongoose.model('user',UserSchema),
    Food: mongoose.model('food',FoodSchema),
    Count: mongoose.model('count',CounterSchema)
}