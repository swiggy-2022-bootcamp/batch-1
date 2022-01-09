const FoodItemSchema=require('../../db/models/fooditems/foodItemSchema');
const config=require("../../utils/config");


const foodItemOperations = {
   
   async getFoodItems(queryobj,res){
       try{
        let min=queryobj.minCost? queryobj.minCost : config.MIN_COST;
        let max=queryobj.maxCost? queryobj.maxCost : config.MAX_COST;
        let type=queryobj.foodType? queryobj.foodType :config.FOOD_TYPE;
        

      const foodItems=await FoodItemSchema.find({ foodCost: { $gte: parseInt(min),$lte:parseInt(max)},foodType:{$in:type}  });
        if(foodItems)res.status(200).json({status:config.SUCCESS,foodItems});
        else res.status(200).json({status:config.NOT_FOUND,message:"No Items found matching your filters."});
       }
       catch(err){
        res.status(500).json({status:config.ERROR,message:"Internal Server Error,Please try again later!"});

       }
        
            
      
    },
    async findByFoodItemId(fooditemid,res){
        try{
            const foodItem=await FoodItemSchema.findOne({foodId:fooditemid});
            if(foodItem){
                res.status(200).json({status:config.SUCCESS,foodItem});
            }
            else{
                res.status(500).json({status:config.ERROR,message:"Unable to find your food item."});


            }
        }
        catch(err){
            res.status(500).json({status:config.ERROR,message:"Failed to find your food item."});
        }
     },
     async findByRestaurantId(restaurantid,res){
        try{
         
            const foodItems=await FoodItemSchema.find({restaurantId:restaurantid});
            if(foodItems){
                res.status(200).json({status:config.SUCCESS,foodItems});
            }
            else{
                res.status(500).json({status:config.ERROR,message:"Unable to find your food item."});


            }
        }
        catch(err){
            res.status(500).json({status:config.ERROR,message:"Failed to find your food item."});
        }
     },
    async updateByFoodItemId(foodItemObject,res){
        try {
            const foodItem = await FoodItemSchema.findOne({foodId:foodItemObject.foodId});
            for(let property of Object.keys(foodItemObject)) {
                
                if(property === 'foodId' || property=='_id')
                continue;
    
                if(foodItem[property])
                    foodItem[property] = foodItemObject[property];
            }
    
            await foodItem.save();
            return res.status(200).json(foodItem);
    
        } catch(err) {
            console.log(err.message);
            return res.status(404).json({"message" : `Food Item with id ${foodItemObject.foodId} not found`});
        }
    },
    async deleteByFoodItemId(foodItemId,res){
        try{
           const foodItem=await FoodItemSchema.findOneAndDelete({foodId:foodItemId});
            if(foodItem){
                        res.status(200).json({status:config.SUCCESS,message:"Food Item Deleted Successfully.",foodItem});
                    }
                    else{
                        res.status(200).json({status:config.ERROR,message:`Sorry food item with ${foodItemId} not found.`});
        
        
                    }
             
              
        }
        catch(err){
            res.status(500).json({status:config.ERROR,message:"Internal Server Error.Please try again later!"});

        }
        
    },
    async findByFoodName(foodItemName){
        try{
            const foodItem=await FoodItemSchema.findOne({foodName:foodItemName});
            if(foodItem){
                return foodItem;
            }
        }
        catch(err){

            res.status(500).json({status:config.ERROR,message:"Internal server error!"});

        }
    },
   
    async addFoodItem(foodItemObject,res){
        try{
           const foodItem=await this.findByFoodName(foodItemObject.foodName);
            if(foodItem) {
                res.status(200).json({status:config.FAILURE,message:"Food Item already exists,try and add another item."});
            }
            else{
               FoodItemSchema.create(foodItemObject,(err,doc)=> {
                    if(err) {
                        res.status(500).json({status:config.ERROR,message:"Unable to add the food item,Please check check all fields and try again later!"});
                    }
                    else{
                        res.status(201).json({status:config.SUCCESS,message:"Food Item added successfully!",doc});
                    }    
                })
            }
        }
        catch(err){
            res.status(500).json({status:config.ERROR,message:"Failed to find and login the email ID"});

        }
       
           
               
                
      
    },
 
   
   
 
}
module.exports=foodItemOperations;