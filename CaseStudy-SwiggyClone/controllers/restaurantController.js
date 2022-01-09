const restaurantModel = require('../models/restaurauntModel');

// register a restaurant => only a restaurant owner can register and must follow restaurant model to register 
module.exports.registerRestaurant = async function registerRestaurant(req,res)
{
    try{
        let dataObj = req.body;
        // console.log(req.id);
        dataObj.restaurantId = req.id;
        // console.log(dataObj);
        let restaurant = await restaurantModel.create(dataObj);

        if(restaurant)
        {
            res.json({
                message:'restaurant has successfully signed up',
                data : restaurant
            });
        }
        else
        {
            res.status(400).json({
                message:'error while signing up'
            });
        }
    }
    catch(err)
    {
        res.status(500).json({
            message:err.message
        });
    }
};

// gets all the restaurants under the owner and displays
module.exports.getRestaurant = async function getRestaurant(req,res)
{
    try
    {
        let rid = req.id;
        let restaurant = await restaurantModel.find({restaurantId:rid});
        
        if(restaurant)
        {
            return res.json(restaurant);
        }
        else
        {
            return res.status(404).json({
                message:'Restaurant not Found'
            });
        }
    }catch(err)
    {
        res.status(500).json({
            message:err.message
        });
    }
};

module.exports.getRestaurantByName = async function getRestaurantByName(req,res)
{
    try {
        let restaurantName = req.body.restaurantName;         
        if(!restaurantName)
        {
            return res.status(400).json({
                message:'Restaurant name needed!'
            })
        }

        let restaurant = await restaurantModel.findOne({restaurantName:restaurantName});
        
        if(restaurant)
        {
            res.json(restaurant);
        }
        else
        {
            res.status(404).json({
                message:'Restaurant not Found'
            });
        }

    } catch (err) {
        res.status(500).json({
            message:err.message
        });       
    }
}

// can update any restaurant under the owner
module.exports.updateRestaurant = async function updateRestaurant(req,res)
{
    try
    {
        let rid = req.id;
        let dataToUpdate = req.body;

        if(!dataToUpdate.restaurantName)
        {
            return res.status(400).json({
                message:'Restaurant Name required to change details'
            });
        }

        if(dataToUpdate.restaurantId)
        {
            return res.status(403).json({
                message:'Not allowed to update this'
            });
        }
        
        let restaurant = await restaurantModel.findOne({restaurantId:rid,restaurantName:dataToUpdate.restaurantName});
        if(restaurant)
        {
            let oldData = await restaurantModel.findOneAndUpdate({restaurantId:rid,restaurantName:dataToUpdate.restaurantName},dataToUpdate);
            res.json({
                message:'Data updated successfully',
                oldData: oldData,
                updatedFields: dataToUpdate
            });
        }
        else
        {
            res.status(404).json({
                message:'Restaurant not Found'
            });
        }
    }catch(err)
    {
        res.status(500).json({
            message:err.message
        });
    }
    
}

// can delete any restaurant under the owner
module.exports.deleteRestaurant = async function deleteRestaurant(req,res)
{
    try
    {
        let rid = req.id;
        let rname = req.body.restaurantName;

        if(!rname)
        {
            return res.status(400).json({
                message:'Restaurant Name required to change details'
            });
        }

        let deletedRestaurant = await restaurantModel.findOneAndDelete({restaurantId:rid,restaurantName:rname});
        if(!deletedRestaurant)
        {
            res.status(404).json({
                message:'Restaurant not found'
            });
        }
        else
        {
            // redirect to home page in browser
            res.json({
                message:'Restaurant deleted',
                data:deletedRestaurant
            });
        }
    }
    catch(err)
    {
        res.status(500).json({
            message:err.message
        });
    }
}

// adds a food item to the restaurant menu 
module.exports.addFoodItem = async function addFoodItem(req,res)
{
    try {
        let rid = req.id;
        let rname = req.body.restaurantName;
        let foodItem = req.body.foodItems;

        if(!foodItem)
        {
            return res.status(400).json({
                message:'Field food item is necessary to add food items'
            }); 
        }

        if(!rname)
        {
            return res.status(400).json({
                message:'Restaurant name is necessary to add food item'
            });
        }

        let rest = await restaurantModel.findOne({restaurantId:rid,restaurantName:rname});

        if(rest)
        {
            for(item in rest.foodItems)
            {
                if(rest.foodItems[item].name == foodItem.name)
                {
                    return res.json({
                        message:'Food item already included'
                    }); 
                }
            }

            let respObj;
            let up = await restaurantModel.findOneAndUpdate({restaurantId:rid,restaurantName:rname},
                {$push:{foodItems:foodItem}},
                function(err,succ)
                {
                    if(err)
                    {
                        respObj = err.message;
                    }
                    else{
                        respObj = succ;
                    }
                }
            ).clone().catch(function(err){ console.log(err)});
            res.json({
                data:respObj
            });
        }
        else
        {
            res.status(404).json({
                message:'Restaurant not found'
            })
        }
        
    } catch (err) {
        res.status(500).json({
            message:err.message
        });
    }
}

// remove a food item when it is no longer available in the restaurant menu 
module.exports.removeFoodItem = async function removeFoodItem(req,res)
{
    try {
        let rid = req.id;
        let rname = req.body.restaurantName;
        let foodItem = req.body.foodItems;

        if(!foodItem)
        {
            return res.status(400).json({
                message:'Field food item is necessary to add food items'
            }); 
        }

        if(!rname)
        {
            return res.status(400).json({
                message:'Restaurant name is necessary to add food item'
            });
        }

        let rest = await restaurantModel.findOne({restaurantId:rid,restaurantName:rname});

        if(rest)
        {
            let foodFound;
            for(item in rest.foodItems)
            {
                if(rest.foodItems[item].name == foodItem.name)
                {
                    foodFound = rest.foodItems[item]; 
                }
            }

            if(!foodFound)
            {
                return res.status(404).json({
                    message:'Cannot remove food item as it doesnt exist'
                });
            }

            let respObj;
            let up = await restaurantModel.findOneAndUpdate({restaurantId:rid,restaurantName:rname},
                {$pull:{foodItems:foodItem}},
                function(err,succ)
                {
                    if(err)
                    {
                        respObj = err.message;
                    }
                    else{
                        respObj = succ;
                    }
                }
            ).clone().catch(function(err){ console.log(err)});
            res.json({
                data:respObj
            });
        }
        else
        {
            res.status(404).json({
                message:'Restaurant not found'
            })
        }
        
    } catch (err) {
        res.status(500).json({
            message:err.message
        });
    }
}

// updates a food item -> be it price, description and so on to the restaurant menu 
module.exports.updateFoodItem = async function updateFoodItem(req,res)
{
    try {
        let rid = req.id;
        let rname = req.body.restaurantName;
        let foodItem = req.body.foodItems;

        if(!foodItem)
        {
            return res.status(400).json({
                message:'Field food item is necessary to add food items'
            }); 
        }

        if(!rname)
        {
            return res.status(400).json({
                message:'Restaurant name is necessary to add food item'
            });
        }

        let rest = await restaurantModel.findOne({restaurantId:rid,restaurantName:rname});

        if(rest)
        {
            let foodFound;
            let newFoodItem = rest.foodItems;
            for(item in rest.foodItems)
            {
                if(rest.foodItems[item].name == foodItem.name)
                {
                    foodFound = item; 
                    newFoodItem[item] = foodItem;
                }
            }

            if(!foodFound)
            {
                return res.status(404).json({
                    message:'Cannot remove food item as it doesnt exist'
                });
            }

            let respObj;
            let up = await restaurantModel.findOneAndUpdate({restaurantId:rid,restaurantName:rname},
                {$set:{foodItems:newFoodItem}},
                function(err,succ)
                {
                    if(err)
                    {
                        respObj = err.message;
                    }
                    else{
                        respObj = succ;
                    }
                }
            ).clone().catch(function(err){ console.log(err)});
            res.json({
                data:respObj
            });
        }
        else
        {
            res.json({
                message:'Restaurant not found'
            })
        }
        
    } catch (err) {
        res.status(500).json({
            message:err.message
        });
    }
}