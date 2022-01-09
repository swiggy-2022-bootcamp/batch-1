const userRoutes=require('express').Router();
const User=require('../../models/users/userModel');
const userOperations=require('../../controllers/users/userOperations');
const tokenMiddleware=require("../../utils/tokenmiddleware");

// GET
userRoutes.get("/users",tokenMiddleware,(req,res)=>{
userOperations.getAllUsers(res);
})

// GET
userRoutes.get("/users/:userid",tokenMiddleware,(req,res)=>{
    let userid=req.params.userid;
    console.log(userid);
    userOperations.findByUserId(userid,res);
})

// DELETE
userRoutes.delete("/users/:userid",tokenMiddleware,(req,res)=>{
 
    let userid=req.params.userid;
    userOperations.deleteByUserId(userid,res);
})

// PUT
userRoutes.put("/users",tokenMiddleware,(req,res)=>{
   
    userOperations.updateByUserId(req.body,res);
})

//POST
userRoutes.post('/register',(req,res)=> {
  
    let user=req.body;
  
    let newUser=new User(user.username,user.email,user.password,user.address);

           userOperations.registerUser(newUser,res);
   
    
});

// POST
userRoutes.post("/authenticate",(req,res)=>{
    userOperations.loginUser(req.body.username,req.body.password,res);
})

module.exports=userRoutes;