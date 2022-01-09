const Food = require('../models/food');

exports.addFood = async function (req) {
    const new_id = await Food.find().count() + 1;
    const new_food = new Food({
        foodId: new_id,
        foodName: req.body.foodName,
        foodCost: req.body.foodCost,
        foodType: req.body.foodType
    });

    const a1 = await new_food.save();
    return (a1)
}

exports.getFoodById = async function (req) {
    const food = await Food.find({ foodId: req.params.foodID });
    if (food.length === 0)
        return food;
    else
        return;
}

exports.queryFood = async function (req) {
    var query = {};
    if (req.body.foodId) query["foodId"] = req.body.foodId;
    if (req.body.foodName) query["foodName"] = req.body.foodName;
    if (req.body.foodCost) query["foodCost"] = req.body.foodCost;
    if (req.body.foodType) query["foodType"] = req.body.foodType;
    const food_list = await Food.find(query);
    if (food_list.length > 0)
        return ({
            "itemCount": food_list.length,
            "items": food_list
        })
    else
        return
}