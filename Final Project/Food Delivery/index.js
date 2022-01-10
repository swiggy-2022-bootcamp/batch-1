
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users")
const foodRoutes = require("./routes/foods");
const authRoutes = require("./routes/auth")
 require("dotenv").config();


 const app = express();
 const PORT= 9000; 
 const mongoose = require("mongoose");

 mongoose.connect(process.env.DATABASE_URL, {useNewurlParser: true });

 const db = mongoose.connection;

 //When connected to database
 db.once('open', ()=> {console.log('connection established to db')});

 app.use(bodyParser.json());

 //routes
 app.use('/api', authRoutes);
 app.use('/api/users', userRoutes);
 app.use('/api/food', foodRoutes);

 app.listen(PORT, () => {console.log(`listening on ${PORT}`);});

