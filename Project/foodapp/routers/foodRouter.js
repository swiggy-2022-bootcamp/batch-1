const e = require('express');
const express = require('express');
const res = require('express/lib/response');
const foodRouter = express.Router();
const foodModel = require('../models/foodModel');
const protectRoute = require('./authHelper')

foodRouter
.route('/')
.post(protectRoute,postFood)


foodRouter
.route('/:foodId')
.get(protectRoute,getFoodById)


async function postFood(req,res){
    let dataObj = req.body;
    
    if (dataObj){
        try{
            let food = await foodModel.create(dataObj);
            if (food)
            {
                res.status(201);
                res.json({food});
            }
        }
        catch(err)
        {
            res.status(500);
            res.json({message:err.message})
        }       
    }    
}

async function getFoodById(req,res){
    let dataid = req.params.foodId;
    if (dataid)
    {
        let food = await foodModel.findOne({'foodId':dataid});   
        if (food)
        {
            res.json(food);
        }
        else
        {
            res.json({Message:`Sorry Food Not Found`});
        }
    }    
    else{
        res.json({Message:`Sorry Food Not Found`});
    }    
}


module.exports=foodRouter;