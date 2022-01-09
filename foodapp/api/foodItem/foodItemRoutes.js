const foodItemRoutes=require('express').Router();
const FoodItem=require('../../models/foodItems/foodItemModel');
const foodItemOperations=require('../../db/helpers/foodItems/foodItemOperations');
const tokenMiddleware=require("../../utils/tokenmiddleware");



foodItemRoutes.get("/food/all",(req,res)=>{

   foodItemOperations.getFoodItems(req.query,res);

    });


foodItemRoutes.post("/food",(req,res)=>{
    console.log("FoodItem is ",req.body);
    let foodItem=req.body;
  
    let newFoodItem=new FoodItem(foodItem.foodName,foodItem.foodCost,foodItem.foodType);
    foodItemOperations.addFoodItem(newFoodItem,res);

})
foodItemRoutes.get("/food/:foodId",(req,res)=>{
    let foodid=req.params.foodId;
    console.log(foodid);
    foodItemOperations.findByFoodItemId(foodid,res);
})

// userRoutes.post('/register',(req,res)=> {
//     console.log("user is ",req.body);
//     let user=req.body;
  
//     let newUser=new User(user.username,user.email,user.password,user.address);
//   //  console.log(newUser);
//            userOperations.registerUser(newUser,res);
//     // res.send("Welcome User "+req.user.name);
//     //res.render('dashboard');
//     //let findUser=customerOperations.findUser(profile.id);
//     // findUser.then((data)=> {
//     //     if(!data) {
//     //         let newCustomer=new Customer(profile.id,profile._json.name,profile._json.email,profile._json.picture);
//     //         customerOperations.registerUser(newCustomer,res);
//     //     }
//     //     else{
//     //         console.log("user already exists");
//     //         res.header('Authorization',profile);
//     //         res.redirect('http://127.0.0.1:5501/ShopRole1-master/client/customerindex.html');
//     //         // res.redirect('/login/user');
//     //         // res.status(200).json({data:data.customerId});
//     //     }   
//     // })
   
//     // customerOperations.findUser(req.user);
// });
// userRoutes.post("/authenticate",(req,res)=>{
//     userOperations.loginUser(req.body.username,req.body.password,res);
// })
module.exports=foodItemRoutes;