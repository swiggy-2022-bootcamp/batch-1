var datetime = require('node-datetime');
class Restaurant{
    constructor(restaurantName,restaurantLocation){
        this.restaurantName=restaurantName;
        this.restaurantLocation=restaurantLocation;
        this.restaurantId= new Date();
    }
}
module.exports=Restaurant;