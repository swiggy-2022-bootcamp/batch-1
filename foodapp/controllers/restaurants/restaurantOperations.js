const restaurantSchema=require('../../db/models/restaurants/restaurantSchema');
const config=require("../../utils/config");
const bcrypt=require('../../utils/bcrypt');
const jwt = require('../../utils/token');
const foodItemOperations = require('../foodItems/foodItemOperations');
const FoodItemSchema=require('../../db/models/fooditems/foodItemSchema');

const restaurantOperations = {
// Delete restaurants and all food Items of that restaurant : DELETE
  async deleteByRestaurantId(restaurantId,res){
        try{
           const restaurant=await restaurantSchema.findOneAndDelete({restaurantId:restaurantId});
          
            if(restaurant){
                
                       const deletedFoodItems=await FoodItemSchema.deleteMany({restaurantId: restaurantId});
              
                        res.status(200).json({status:config.SUCCESS,message:"Restaurant Deleted Successfully.",restaurant});
                       
                    }
                    else{
                        res.status(500).json({status:config.ERROR,message:`Sorry restaurant with ${restaurantId} not found.`});
        
        
                    }
             
              
        }
        catch(err){
            res.status(404).json({status:config.ERROR,message:"Internal Server Error."});

        }
        
    },

// Get all restaurants : GET
    async getAllRestaurants(res){
        try{
            const restaurants=await restaurantSchema.find({});
           
        
               if(restaurants) res.status(200).json({status:config.SUCCESS,restaurants});
                
         

        }
        catch(err){
            res.status(500).json({status:config.ERROR,message:"Failed to fetch restaurants."});

        }
        
    },
 
// Add New Restaurant : POST
    async addRestaurant(newRestaurantObject,res) {
        try{
            const restaurant=await restaurantSchema.findOne({restaurantName:newRestaurantObject.restaurantName});
         
               if(restaurant) {
                        res.status(200).json({status:config.FAILURE,message:"Restaurant already Exists."});
                    }
                    else{
                       
                        restaurantSchema.create(newRestaurantObject,(err,doc)=> {
                            if(err) {
                                res.status(500).json({status:config.ERROR,message:"Unable to add the restaurant"});
                            }
                            else{
                                res.status(201).json({status:config.SUCCESS,message:"Restaurant Added Successfully",doc});
                            }    
                        })
                    }
                
           
        }catch(err){
            res.status(500).json({status:config.ERROR,message:"Internal Server Error "});

           
        }
       
    },
   
   
}
module.exports=restaurantOperations ;