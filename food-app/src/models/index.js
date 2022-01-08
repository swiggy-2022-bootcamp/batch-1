const mongoose = require('mongoose');
const FoodSchema = require('./foodModel');
const UserSchema = require('./userModel');




module.exports = {
    User:  mongoose.model('user',UserSchema),
    Food: mongoose.model('food',FoodSchema)
}