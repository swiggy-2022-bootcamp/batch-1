const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')
const Schema = mongoose.Schema

const foodSchema = new Schema({
    foodName: { type: String, required: true },
    foodCost: { type: Number, required: true},
    foodType: {type: String, enum : ['Indian', 'Chinese', 'Mexican'], required:true},
}, { timestamps: true })

module.exports = mongoose.model('Food', foodSchema)
