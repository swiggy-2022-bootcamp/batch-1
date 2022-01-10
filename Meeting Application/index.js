const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
const User=require('./models/user');
const {auth} =require('./service/auth');
const Meeting = require('./models/meeting');
const { json } = require('body-parser');
const db=require('./config/dbconfig').get(process.env.NODE_ENV);
const userRoutes = require('./routes/userRoute');
const meetingRoutes = require('./routes/meetingRoutes');

const app=express();
// app use
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());

// routes to controllers
app.use('/api', userRoutes);
app.use('/api', meetingRoutes)
// database connection
mongoose.Promise=global.Promise;
mongoose.connect(db.DATABASE,{ useNewUrlParser: true,useUnifiedTopology:true },function(err){
    if(err) console.log(err);
    console.log("database is connected");
});


// listening port
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});