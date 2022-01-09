const userRoutes=require('express').Router();
//const passport=require('passport');
const User=require('../../models/users/userModel');
const userOperations=require('../../db/helpers/users/userOperations');
const tokenMiddleware=require("../../utils/tokenmiddleware");


//customerRoutes.get('/google',passport.authenticate('google',{scope:['profile','email']}));
userRoutes.get("/users",tokenMiddleware,(req,res)=>{
userOperations.getAllUsers(res);
})
userRoutes.get("/users/:userid",tokenMiddleware,(req,res)=>{
    let userid=req.params.userid;
    console.log(userid);
    userOperations.findByUserId(userid,res);
})
userRoutes.delete("/users/:userid",tokenMiddleware,(req,res)=>{
 
    let userid=req.params.userid;
    userOperations.deleteByUserId(userid,res);
})
userRoutes.put("/users",tokenMiddleware,(req,res)=>{
   
    userOperations.updateByUserId(req.body,res);
})
userRoutes.post('/register',(req,res)=> {
    console.log("user is ",req.body);
    let user=req.body;
  
    let newUser=new User(user.username,user.email,user.password,user.address);
  //  console.log(newUser);
           userOperations.registerUser(newUser,res);
    // res.send("Welcome User "+req.user.name);
    //res.render('dashboard');
    //let findUser=customerOperations.findUser(profile.id);
    // findUser.then((data)=> {
    //     if(!data) {
    //         let newCustomer=new Customer(profile.id,profile._json.name,profile._json.email,profile._json.picture);
    //         customerOperations.registerUser(newCustomer,res);
    //     }
    //     else{
    //         console.log("user already exists");
    //         res.header('Authorization',profile);
    //         res.redirect('http://127.0.0.1:5501/ShopRole1-master/client/customerindex.html');
    //         // res.redirect('/login/user');
    //         // res.status(200).json({data:data.customerId});
    //     }   
    // })
   
    // customerOperations.findUser(req.user);
});
userRoutes.post("/authenticate",(req,res)=>{
    userOperations.loginUser(req.body.username,req.body.password,res);
})
module.exports=userRoutes;