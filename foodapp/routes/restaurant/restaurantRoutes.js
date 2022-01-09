const restaurantRoutes=require('express').Router();
const Restaurant=require('../../models/restaurants/restaurantModel');
const restaurantOperations=require('../../controllers/restaurants/restaurantOperations');
const tokenMiddleware=require("../../utils/tokenmiddleware");

// GET
restaurantRoutes.get("/restaurant/all",(req,res)=>{

   restaurantOperations.getAllRestaurants(res);

    });

// POST
restaurantRoutes.post("/restaurant",(req,res)=>{
   
    let restaurant=req.body;
  
    let newRestaurant=new Restaurant(restaurant.restaurantName,restaurant.restaurantLocation);
    restaurantOperations.addRestaurant(newRestaurant,res);

})
// DELETE
restaurantRoutes.delete("/restaurant/:restaurantId",(req,res)=>{
  
    let restaurantId=req.params.restaurantId;
   restaurantOperations.deleteByRestaurantId(restaurantId,res);

})

module.exports=restaurantRoutes;