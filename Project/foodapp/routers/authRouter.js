const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../../secrets')
const bcrypt = require('bcrypt');

authRouter
.route('/')
.post(authenticateUser)

async function authenticateUser(req,res){
    try{
        let data = req.body;
        if (data.email)
        {
            let user = await userModel.findOne({email:data.email});
            if (user)
            {
                const match = await bcrypt.compare(data.password,user.password);
                if(match)
                {
                    let uid=user['_id'];
                    let token=jwt.sign({payload:uid},JWT_KEY.JWT_KEY);
                    res.cookie('login',token,{httpOnly:true});
                    return res.json({message:'User logged in successfully'}); 
                }
                else
                {
                    res.status(403);
                    res.json({message:'Wrong Credentials'});
                }
            }
            else
            {
                res.status(403);
                res.json({message:'Wrong Credentials'});
            }
        }
        else
        {
            res.status(403);
            res.json({message:'Email not given.'});
        }
    }
    catch(err)
    {
        res.status(500);
        res.json({message:err.message})
    }    
}

module.exports=authRouter;