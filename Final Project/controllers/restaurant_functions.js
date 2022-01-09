const Rest = require('../models/restaurant');

exports.addRestaurant = async function (req) {
    const new_id = await Rest.find().count() + 1;
    const new_rest = new Rest({
        restId: new_id,
        restName: ((req.body.restName).trim()).toLowerCase(),
        restRating: req.body.restRating,
        restType: req.body.restType,
        houseno: req.body.houseno,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
    });
    const added_rest = await new_rest.save();
    return (added_rest)
}


exports.getAllRestaurants = async function (req) {
    const all_rests = await Rest.find();
    return ({
        'restaurantCount': all_rests.length,
        'restaurants': all_rests
    });
}


exports.queryRestaurants = async function (req) {
    var query = {};
    if (req.body.restId) query["restId"] = req.body.restId;
    if (req.body.restName) query["restName"] = ((req.body.restName).trim()).toLowerCase();
    if (req.body.restRating) query["restRating"] = req.body.restRating;
    if (req.body.restType) query["restType"] = req.body.restType;
    if (req.body.street) query["street"] = req.body.street;
    if (req.body.city) query["city"] = req.body.city;
    if (req.body.state) query["state"] = req.body.state;
    if (req.body.zip) query["zip"] = req.body.zip;
    const food_list = await Rest.find(query);
    if (food_list.length > 0)
        return food_list
    else
        return
}
