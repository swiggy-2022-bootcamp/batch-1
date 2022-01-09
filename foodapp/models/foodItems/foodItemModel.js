var datetime = require('node-datetime');
class FoodItem{
    constructor(foodName,foodCost,foodType,restaurantId){
        this.foodName=foodName;
        this.foodCost=foodCost;
        this.foodType=foodType;
        this.foodId= new Date();
        this.restaurantId=restaurantId;
    }
}
module.exports=FoodItem;