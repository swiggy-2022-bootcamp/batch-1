const mongoose = require('../../connection');
const restaurantSchema = mongoose.Schema;
const restaurant = new restaurantSchema({
    restaurantId:{type:Number},
    restaurantName:{type:String,required : true},
    restaurantLocation:{type:String,required : true},
    
});
const Restaurant = mongoose.model('restaurants',restaurant);
module.exports=Restaurant;