const foodItemRoutes=require('express').Router();
const FoodItem=require('../../models/foodItems/foodItemModel');
const foodItemOperations=require('../../controllers/foodItems/foodItemOperations');
const tokenMiddleware=require("../../utils/tokenmiddleware");



foodItemRoutes.get("/food/all",(req,res)=>{

   foodItemOperations.getFoodItems(req.query,res);

    });
foodItemRoutes.get("/food/:restaurantId",(req,res)=>{

foodItemOperations.findByRestaurantId(req.params.restaurantId,res);
     
});
    

foodItemRoutes.post("/food",(req,res)=>{
   
    let foodItem=req.body;
  
    let newFoodItem=new FoodItem(foodItem.foodName,foodItem.foodCost,foodItem.foodType,foodItem.restaurantId);
    foodItemOperations.addFoodItem(newFoodItem,res);

})
foodItemRoutes.put("/food",(req,res)=>{
  
    let foodItem=req.body;
    foodItemOperations.updateByFoodItemId(foodItem,res);

})
foodItemRoutes.delete("/food/:foodId",(req,res)=>{
  
    let foodItemId=req.params.foodId;
    foodItemOperations.deleteByFoodItemId(foodItemId,res);

})
foodItemRoutes.get("/food/:foodId",(req,res)=>{
   
    let foodid=req.params.foodId;
    foodItemOperations.findByFoodItemId(foodid,res);
})



module.exports=foodItemRoutes;