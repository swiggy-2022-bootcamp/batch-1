const restaurantSchema=require('../../db/models/restaurants/restaurantSchema');
const config=require("../../utils/config");
const bcrypt=require('../../utils/bcrypt');
const jwt = require('../../utils/token');
const foodItemOperations = require('../foodItems/foodItemOperations');
const FoodItemSchema=require('../../db/models/fooditems/foodItemSchema');

const restaurantOperations = {
//       async findByUserId(userid,res){
//            try{
//             const user=await userSchema.findOne({id:userid});
//            if(user){
//                         res.status(201).json({user});
//                     }
//                     else{
//                         res.status(500).json({status:config.ERROR,message:"Unable to find the username of the user "});
        
        
//                     }
              
              
//            }
//            catch(err){
//             res.status(500).json({status:config.ERROR,message:"Failed to find and login the email ID"});

//            }
       
//     },
//     async updateByUserId(userobj,res){
//         try {
//             const user = await userSchema.findOne({id:userobj.id});
    
//             for(let property of Object.keys(userobj)) {
                
//                 if(property === 'id' || property=='_id')
//                 continue;
    
//                 if(user[property])
//                     user[property] = userobj[property];
//             }
    
//             await user.save();
//             return res.status(200).json(user);
    
//         } catch(err) {
//             console.log(err.message);
//             return res.status(404).json({"message" : `User with id ${userobj.id} not found`});
//         }
//     },

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
    async getAllRestaurants(res){
        try{
            const restaurants=await restaurantSchema.find({});
           
        
               if(restaurants) res.status(200).json({restaurants});
                
         

        }
        catch(err){
            res.status(500).json({status:config.ERROR,message:"Failed to fetch restaurants."});

        }
        
    },
 
//     async loginUser(username,password,res) {
//         try{
//             const user=await userSchema.findOne({username});
           
              
//                     if(user) { 
//                         let hashPassword=user.password;
//                         let comparePassword=bcrypt.comparePassword(password,hashPassword);
//                         if(comparePassword) {
//                           const token=jwt.generateToken(username);
//                             res.status(200).json({status:config.SUCCESS,token:token,message:"User logged in successful"});
    
                          
//                         }
//                         else{
//                             res.status(403).json({status:config.FAILURE,message:"Please enter correct details"});
    
//                         }
//                     }
//                     else{
//                         res.status(200).json({status:config.FAILURE,message:"User is not registered.Please Register Yourself First"});
//                     }
           
//         }
//         catch(err){
//             res.status(500).json({status:config.ERROR,message:"Failed to find and login the email ID"});

//         }
     
//     },
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