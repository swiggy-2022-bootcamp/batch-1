const express = require('express');
const res = require('express/lib/response');
const userRouter = express.Router();
const userModel = require('../models/userModel');
const protectRoute = require('./authHelper')

userRouter
.route('/')
.get(protectRoute,getUsers)
.put(protectRoute,putUser)


userRouter
.route('/:id')
.get(protectRoute,getUserById)
.delete(protectRoute,deleteUser)

async function getUsers(req,res){
    let allUsers = await userModel.find();
    res.json(allUsers);
}

async function putUser(req,res){
    let dataObj = req.body;
    //console.log(dataObj);
    if (dataObj.id){
        let user = await userModel.findOneAndReplace({'id':dataObj.id},dataObj);
        if (user)
        {
            res.json({dataObj});
        }
        else
        {
            res.json({Message:`Sorry user With ${dataObj.id} not found`});
        }    
    }
    else{
        res.json({Message:`Sorry user id  not given`});
    }    
}

async function deleteUser(req,res){
    let dataid = req.params.id;
    if (dataid)
    {
        let user = await userModel.findOneAndDelete({'id':dataid});   
        if (user)
        {
            res.json({Message: "User Deleted Successfully"});
        }
        else
        {
            res.json({Message:`Sorry user With id ${dataid} not found`});
        }
    }    
    else{
        res.json({Message:`Sorry user id  not given`});
    }    
}

async function getUserById(req,res){
    let dataid = req.params.id;
    if (dataid)
    {
        let user = await userModel.findOne({'id':dataid});   
        if (user)
        {
            res.json(user);
        }
        else
        {
            res.json({Message:`Sorry user With Id ${dataid} not found`});
        }
    }    
    else{
        res.json({Message:`Sorry user id  not given`});
    }    
}


module.exports=userRouter;