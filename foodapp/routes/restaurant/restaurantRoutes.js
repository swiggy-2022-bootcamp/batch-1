const restaurantRoutes=require('express').Router();
const Restaurant=require('../../models/restaurants/restaurantModel');
const restaurantOperations=require('../../controllers/restaurants/restaurantOperations');
const tokenMiddleware=require("../../utils/tokenmiddleware");



restaurantRoutes.get("/restaurant/all",(req,res)=>{

   restaurantOperations.getAllRestaurants(res);

    });


restaurantRoutes.post("/restaurant",(req,res)=>{
   
    let restaurant=req.body;
  
    let newRestaurant=new Restaurant(restaurant.restaurantName,restaurant.restaurantLocation);
    restaurantOperations.addRestaurant(newRestaurant,res);

})
// foodItemRoutes.put("/food",(req,res)=>{
  
//     let foodItem=req.body;
//     foodItemOperations.updateByFoodItemId(foodItem,res);

// })
restaurantRoutes.delete("/restaurant/:restaurantId",(req,res)=>{
  
    let restaurantId=req.params.restaurantId;
   restaurantOperations.deleteByRestaurantId(restaurantId,res);

})
// foodItemRoutes.get("/food/:foodId",(req,res)=>{
   
//     let foodid=req.params.foodId;
//     foodItemOperations.findByFoodItemId(foodid,res);
// })



module.exports=restaurantRoutes;