const mongoose = require('../../connection');
const foodItemSchema = mongoose.Schema;
const foodItem = new foodItemSchema({
    foodId:{type:Number},
    foodName:{type:String,required : true},
    foodCost:{type:Number,required : true},
    foodType:{type:String,enum:['Indian','Chinese','Mexican'],required : true},
    restaurantId:{type:Number,required:true}
    
});
const FoodItem = mongoose.model('foodItems',foodItem);
module.exports=FoodItem;