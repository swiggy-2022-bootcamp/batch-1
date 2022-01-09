var datetime = require('node-datetime');
class FoodItem{
    constructor(foodName,foodCost,foodType){
        this.foodName=foodName;
        this.foodCost=foodCost;
        this.foodType=foodType;
        this.foodId= new Date();
    }
}
module.exports=FoodItem;