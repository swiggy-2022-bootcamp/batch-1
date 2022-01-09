const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
const User=require('./models/user');
const {auth} =require('./middleware/auth');
const Meeting = require('./models/meeting');
const { json } = require('body-parser');
const db=require('./config/config').get(process.env.NODE_ENV);


const app=express();
// app use
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());

// database connection
mongoose.Promise=global.Promise;
mongoose.connect(db.DATABASE,{ useNewUrlParser: true,useUnifiedTopology:true },function(err){
    if(err) console.log(err);
    console.log("database is connected");
});


// adding new user (sign-up route)
app.post('/api/register',function(req,res){
   // taking a user
   const newuser=new User(req.body);
   console.log(newuser);

   if(newuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
   
   User.findOne({email:newuser.email},function(err,user){
       if(user) return res.status(400).json({ auth : false, message :"email exits"});

       newuser.save((err,doc)=>{
           if(err) {console.log(err);
               return res.status(400).json({ success : false});}
           res.status(201).json({
               succes:true,
               user : doc
           });
       });
   });
});


// login user
app.post('/api/login', function(req,res){
    let token=req.cookies.auth;
    User.findByToken(token,(err,user)=>{
        if(err) return  res(err);
        if(user) return res.status(400).json({
            error :true,
            message:"You are already logged in"
        });
    
        else{
            User.findOne({'email':req.body.email},function(err,user){
                if(!user) return res.status(401).json({isAuth : false, message : ' Auth failed ,email not found'});
        
                user.comparepassword(req.body.password,(err,isMatch)=>{
                    if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
        
                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res.status(201).cookie('auth',user.token).json({
                        isAuth : true,
                        id : user._id
                        ,email : user.email
                    });
                });    
            });
          });
        }
    });
});


//logout user
 app.get('/api/logout',auth,function(req,res){
        req.user.deleteToken(req.token,(err,user)=>{
            if(err) return res.status(400).send(err);
            res.sendStatus(200);
        });

    }); 

// get logged in user
app.get('/api/profile',auth,function(req,res){
        res.json({
            isAuth: true,
            id: req.user._id,
            email: req.user.email,
            name: req.user.firstname + req.user.lastname
            
        })
});


app.get('/',function(req,res){
    res.status(200).send(`Welcome to login , sign-up api`);
});


app.post('/api/createMeeting', function(req, res){
       let token=req.cookies.auth;
       User.findByToken(token, (err,user)=>{
            if(err) return res(err);
            if(user) return createMeeting(req,res,user);
            else return res.status(400).send("Login First");
       });
       //const user =  new User(req.body["user"]);
});

function createMeeting(req,res,user){
    const newMeeting =  new Meeting(req.body["meeting"]); 
       newMeeting.schduledbyUser = user.email;
       console.log(newMeeting);
       
       newMeeting.save((err, doc)=>{
        if(err) {console.log(err);
            return res.status(400).json({ success : false});}
        res.status(201).json({
            succes:true
        });
       });
}

app.get('/api/getmeetings', function(req,res){
    let token=req.cookies.auth;
    User.findByToken(token, (err,user)=>{
        if(err) return res(err);
        if(user) return getAllMeettingsforUser(req,res,user);
        else return res.status(400).send("Login First");
   });
});

function getAllMeettingsforUser(req, res, user){
    Meeting.find({'email': user.email}, function(err, docs){
        if(err) return res(err);
        if(docs) return res.status(200).json(docs);
        else return res.status(400).send("No meetings");
    })
}

app.get('/api/getMeeting', function(req,res){
    let token=req.cookies.auth;
    console.log(req.query.meeting_id);
    Meeting.findById(req.query.meeting_id, (err,docs)=>{
        if(err) return res(err);
        if(docs) return res.status(200).json(docs);
        else return res.status(400).send("No meetings");
    });
});


app.delete('/api/deleteMeeting', (req,res)=>{
    let token=req.cookies.auth;
    Meeting.findByIdAndDelete(req.query.meeting_id, (err,docs)=>{
        if(err) return res(err);
        if(docs) return res.status(200).json(docs);
        else return res.status(400).send("No meetings");
    });
})

// listening port
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});