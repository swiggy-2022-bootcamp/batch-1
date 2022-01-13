const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    foodId:{
        type:Number,
        unique: true, 
        required: true,
    },
    foodName:{
        type:String,
        unique: true,
        required: true
    },
    foodType:{
        type:String,
        required: true
    },
    foodCost:{
        type:Number,
        required: true
    }
})

const Food = mongoose.model('Food',foodSchema);

module.exports={
    Food,
} 

