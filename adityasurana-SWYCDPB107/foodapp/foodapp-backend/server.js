const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userTable = require("./models/user")
const foodItemTable = require("./models/foodItem");
const jwt = require('jsonwebtoken');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT, PATCH, DELETE");
    next();
    });

mongoose.connect('mongodb://localhost:27017/foodRecord', 
    {   useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("FoodTable CONNECTION OPEN !!!")
    })
    .catch(err => {
        console.log("FoodTable ERROR While Connecting!!!!");
        console.log(err);
    })


var foodid = 10;
const tokenSecret = 'aahjewjncbnw12@@#$ljhsfsl';
let verifyData = {
    email: null, token: null
}

function createToken(req, res, user) {

    if (user) {
        const accessToken = jwt.sign({ email: user.email }, tokenSecret);
        verifyData = {
            email: user.email, token: 'Bearer ' + accessToken
        }
    } else {
        res.send('Username or password incorrect');
    }
}

//AUTHORIZING USER
const authJwt = (req, res, next) => {
    const authHeader = verifyData.token;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, tokenSecret, (err, user) => {
            if (err) {
                return res.status(403).json({message: "Authentication Error"});
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.post('/api/verifyUser', (req, res)=>{
    const { secretToken } = req.body;
    if(secretToken){
        jwt.verify(secretToken, tokenSecret, async (err, user) => {
            if (err) {
                console.log("Authentication error")
                return res.json(null);
            }
            const userFound = await userTable.findOne({email: user.email});
            if(userFound){
                res.json(userFound);
            }
        })
    }
})

app.get('',(req,res)=>{
    res.send("server working");
})

app.post('/api/register', async (req, res)=>{
    const {id, username, email, password, address } = req.body;
    let record = {
        id: id,
        username: username,
        email: email,
        password: password,
        address: address
    }
    let item = new userTable(record);
    item.save(function(err,result){
        if (err){
            console.log(err);
        }
        else {
            console.log(result)
        }
    })
    res.status(201).json(record);
})

app.post('/api/authenticate', async (req,res)=>{
    const {email, password} = req.body;
    const user = await userTable.findOne({email: email, password:password});
    if (user) {
        createToken(req, res, user);
        var Token = verifyData.token.split(' ')[1]
        var userwithToken = {
            token: Token,
            id: user.id,
            username: user.username,
            message: "User logged in successful"
        }
        res.status(200).json(userwithToken)
    } else {
        res.status(403).json({message: "Forbidden"});
    }
})

app.get('/api/users', authJwt, async (req,res)=>{
    const data = await userTable.find({});
    res.status(200).json(data);
})


app.put("/api/users", authJwt, async (req,res)=>{
    const { id, username, email, password, address } = req.body;
    const searchuser = await userTable.findOne({id: id});
    const user = await userTable.findByIdAndUpdate(searchuser._id,{username: username, email:email, password:password, address:address});
    if (user) {
        res.status(200).json(user);
    } else {
        res.send(`Sorry User with id: ${userID} not found`);
    }
})

app.get('/api/users/:userID', authJwt, async (req,res)=>{
    const{ userID } = req.params;
    const user = await userTable.findOne({id: userID});
    if (user) {
        res.status(200).json(user);
    } else {
        res.send(`Sorry User with id: ${userID} not found`);
    }
})

app.delete("/api/users/:userID", authJwt, async (req,res)=>{
    const{ userID } = req.params;
    const user = await userTable.findOne({id: userID});
    const deleteData = await userTable.findByIdAndDelete(user._id);
    if(deleteData)
    {
        res.status(200).json({message: "User Deleted successfully"});
        res.redirect(200,'/api/users');
    } else{
        res.send(`Sorry User with id: ${userID} not found`);
    }
})

// food Apis :-

app.get('/api/food', authJwt, async (req,res)=>{
    const data = await foodItemTable.find({});
    res.status(200).json(data);
})

app.get('/api/food/:foodID', authJwt, async (req,res)=>{
    const{ foodID } = req.params;
    const food = await foodItemTable.findOne({foodId: foodID});
    if (food) {
        res.status(200).json(food);
    } else {
        res.send("Sorry Food not found");
    }
})

app.post('/api/food', authJwt, async (req,res)=>{
    const {
        foodId,
        foodName,
        foodCost,
        foodType
    } = req.body;
    foodid = foodid + 1;
    var foodID = foodid;
    let record = {
        id: foodID,
        foodId: foodId,
        foodName: foodName,
        foodCost: foodCost,
        foodType: foodType
    }
    let item = new foodItemTable(record);
    item.save(function(err,result){
        if (err){
            console.log(err);
        }
        else{
            console.log(result)
        }
    })
    res.status(201).json(record);
    res.redirect(200,'/api/food');
})

app.listen(5000,()=>{
    console.log('listening to port http://localhost:5000')
})
