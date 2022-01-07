
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users")
const foodRoutes = require("./routes/foods");
 require("dotenv").config();


 const app = express();
 const PORT= 8000; 
 const mongoose = require("mongoose");

 mongoose.connect(process.env.DATABASE_URL, {useNewurlParser: true });

 const db = mongoose.connection;

 db.once('open', ()=> {console.log('connection established to db')});

 app.use(bodyParser.json());

 app.use('/api/users', userRoutes);
 app.use('/api/food', foodRoutes);

 app.listen(PORT, () => {console.log(`listening on ${PORT}`);});

