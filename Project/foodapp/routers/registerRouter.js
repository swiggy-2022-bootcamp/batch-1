const express = require('express');
const registerRouter = express.Router();
const userModel = require('../models/userModel');

registerRouter
.route('/')
.post(postUser)

async function postUser(req,res){
    let dataObj = req.body;
    
    try{
        let user = await userModel.create(dataObj);
        //console.log('backend',user);
        res.status(201);
        res.json({user})
    }
    catch(err)
    {
        res.status(500);
        res.json({message:err.message})
    }    
}

module.exports=registerRouter;

