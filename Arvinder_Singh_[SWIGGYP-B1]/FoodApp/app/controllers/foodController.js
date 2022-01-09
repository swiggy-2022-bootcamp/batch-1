const Food = require('../../models/food');

function foodController(){
    return{
        "getAllFood" : async function (req, res){
            try {
                const foods = await Food.find();
                return res.status(200).json(foods);
            } catch (error) {
                return res.status(400).json({ "message":"Something went wrong","error": error}); 
            }
        },

        "getFoodById" :  async function (req, res) {
            const foodId = req.params.foodId;
            try {
                const food   = await Food.findOne({"_id":foodId});
                if(food){
                    return res.status(200).json(food);
                }else{
                    return res.status(400).json({"message":`Sorry. The foodId: ${foodID} does not exists`})
                }
            } catch (error) {
                return res.status(400).json({ "message":"Something went wrong","error": error}); 
            }  
        },

        "updatefood" : async function (req, res) {

            const {_id,foodName,foodCost,foodType} = req.body;
            // const foodId = req.params.foodId;
            const foodId = _id;

            try {
                let food = await Food.findOne({"_id":foodId});
                if(food){
                    if(foodName) food.foodName = foodName;
                    if(foodCost) food.foodCost = foodCost;
                    if(foodType) food.foodType = foodType;
                    food = await food.save();
                    res.status(200).json({
                        "message": "Food updated successfully",
                        "food": food
                    });
                }else{
                    // null => doesnot exist
                    return res.status(400).json({"message":`Sorry. The foodId: ${foodId} does not exists and hence can not be updated`})
                }
            } catch (error) {
                return res.status(400).json({ "message":"Something went wrong","error": error});
            }
        },

        "deletefood" : async (req, res) => {
            const foodId = req.params.foodId;
            try {
                const food = await Food.findOneAndDelete({"_id":foodId});
                if(food){
                    return res.status(201).json({ "message":`The food with foodId: ${foodId} deleted`});
                }else{
                    // null => doesnot exist
                    return res.status(400).json({"message":`Sorry. The foodId: ${foodId} does not exists and hence can not be deleted`})
                }
            } catch (error) {
                return res.status(400).json({ "message":"Something went wrong","error": error});
            } 
        },

        "addFood" : async (req, res) => {

            const {foodName,foodCost,foodType} = req.body;

            try {
                let food  = new Food({foodName,foodCost,foodType});
                food = await food.save();
                return res.status(201).json(food);
            } catch (error) {
                return res.status(400).json({ error: `Something went wrong... 
                ${error}`});
            }
        },
    }
}


module.exports = foodController;