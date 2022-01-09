const restaurantModel = require('../models/restaurauntModel');

module.exports.registerRestaurant = async function registerRestaurant(req,res)
{
    try{
        let dataObj = req.body;
        console.log(req.id);
        dataObj.restaurantId = req.id;
        console.log(dataObj);
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
            res.json({
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
            return res.json({
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

module.exports.updateRestaurant = async function updateRestaurant(req,res)
{
    try
    {
        let rid = req.id;
        let dataToUpdate = req.body;

        if(!dataToUpdate.restaurantName)
        {
            return res.json({
                message:'Restaurant Name required to change details'
            });
        }

        if(dataToUpdate.restaurantId)
        {
            return res.json({
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
            res.json({
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

module.exports.deleteRestaurant = async function deleteRestaurant(req,res)
{
    try
    {
        let rid = req.id;
        let rname = req.body.restaurantName;

        if(!rname)
        {
            return res.json({
                message:'Restaurant Name required to change details'
            });
        }

        let deletedRestaurant = await restaurantModel.findOneAndDelete({restaurantId:rid,restaurantName:rname});
        if(!deletedRestaurant)
        {
            res.json({
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

module.exports.addFoodItem = async function addFoodItem(req,res)
{
    try {
        let rid = req.id;
        let rname = req.body.restaurantName;
        let foodItem = req.body.foodItems;

        if(!foodItem)
        {
            return res.json({
                message:'Field food item is necessary to add food items'
            }); 
        }

        if(!rname)
        {
            return res.json({
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
                        console.log('went here');
                        respObj = err.message;
                        // res.status(500).json({
                        //     message:err.message
                        // });
                    }
                    else{
                        respObj = succ;
                        // res.json({
                        //     message:'Successfully added',
                        //     data:succ
                        // });
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