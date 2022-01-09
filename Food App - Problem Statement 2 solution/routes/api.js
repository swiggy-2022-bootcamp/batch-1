// Including/Requiring the necessary modules
var express = require('express');
let mongoose = require('mongoose');

// Setting up MongoDB server
mongoose.connect("mongodb+srv://dbUser:openDB@freecluster.5h3ie.mongodb.net/myFirstDatabase").catch(console.error);

let addressSubSchema = new mongoose.Schema({
	houseno: Number,
	street: String,
	city: String,
	state: String,
	zip: Number
});

let registrationSchema = new mongoose.Schema({
	id: Number,
	username: {type: String, required: true},
	email: String,
	password: {type: String, required: true},
	address: addressSubSchema
});

let foodSchema = new mongoose.Schema({
	id: Number,
	foodId: {type:Number, index: true},
	foodName: String,
	foodCost: Number,
	foodType: {type: String, enum: ["Indian", "Chinese", "Mexican"]}
});

let userBase = mongoose.model("registration", registrationSchema);
let foodBase = mongoose.model("food", foodSchema);

function resolvedRegistrationObject( userObject ) {
	return { 
		"id": userObject.id ? userObject.id:0,
		"username": userObject.username,
		"email": userObject.email ? userObject.email: "",
		"password": userObject.password,
		"address": userObject.address ? resolvedAddressObject(userObject.address) : {}
	};
}

function resolvedAddressObject( addressObject ) {
	return {
		"houseno": addressObject.houseno ? addressObject.houseno:0,
		"street": addressObject.street ? addressObject.street:"",
		"city": addressObject.city ? addressObject.city:"",
		"state": addressObject.state ? addressObject.state:"",
		"zip": addressObject.zip ? addressObject.zip:000000
	}
}

function resolvedFoodObject( foodObject ) {
	return {
		"id": foodObject.id ? foodObject.id:0,
		"foodId": foodObject.foodId ? foodObject.foodId:"",
		"FoodName": foodObject.FoodName ? foodObject.FoodName:"",
		"FoodCost": foodObject.FoodCost ? foodObject.FoodCost:0,
		"foodType": foodObject.foodType ? foodObject.foodType:""
	}
}

// Setting up the Express Router for handling API (/api) calls
var router = express.Router();

router.post('/register', async function(req, res, next) {
	if (req.body.username) {
		userBase.findOne({ username: req.body.username }, (error, user)=>{
			if (!user) {
				userBase.create(req.body);
				res.status(201).send(req.body);
			}
			else {
				res.sendStatus(302);	// Found, but isn't desired (Error, as username already exists in DataBase)
			}
		});
	}
	else {
		res.sendStatus(403);
	}
});

router.post('/authenticate', function(req, res, next) {
	userBase.findOne({ username: req.body.username, password: req.body.password }, (error, matchingUser)=>{
		if (error) throw error;
		if (matchingUser) 
			res.status(200).send({ "message": "User logged in successfully!" });
		else
			res.sendStatus(403);
	});
});

router.route('/users')
	.get(function(req, res) {
		userBase.find((error, result)=>{
			if (error) throw error;
			result.forEach( (userObject, index) => { result[index] = resolvedRegistrationObject(userObject) } );
			res.status(200).send(result);
		});
	})
	.put(function(req, res) {
		userBase.findOneAndUpdate({id: req.body.id }, { $set: req.body }, { upsert: false }, (error, updatedDocument)=>{
			if (error) throw error;
			if (updatedDocument) res.status(200).send( resolvedRegistrationObject(updatedDocument) );
			else res.send({ "message":"Sorry, user with given ID="+req.params.userID+" was not found" });
		});
	});

router.route('/users/:userID')
	.get(function(req, res) {
		userBase.findOne({id: req.params.userID }, (error, result)=>{
			if (error) throw error;
			if (result) {
				res.status(200).send(resolvedRegistrationObject(result));
			}
			else {
				res.send({ "message":"Sorry, user with given ID="+req.params.userID+" was not found" });
			}
		});
	})
	.delete(function(req, res){
		userBase.findOneAndRemove({id: req.params.userID}, (error, result)=>{
			if (error) throw error;
			if (result) {
				res.status(200).send({ "message": `User ${result.username} with ID ${result.id} has been deleted successfully` });
			}
			else {
				res.send({ "message":"Sorry, user with given ID="+req.params.userID+" was not found" });
			}
		});
	});

router.post('/food', function(req, res){
	foodBase.find((error, result)=>{
		if (error) {
			console.error(error);
			return;
		}
		req.body.id = result.length;
		foodBase.create(req.body);
		res.status(201).send(resolvedFoodObject(req.body));
	});
});

router.get('/food/:foodID', function(req, res){
	foodBase.findOne({ foodId: req.params.foodID }, (error, foodData)=>{
		if (error) { console.error(error); return; }
		res.send(foodData ? resolvedFoodObject(foodData) : { "message":"Sorry, Food "+req.params.foodID+" was not found" });
	});
});

module.exports = router;
