const mongoose = require('mongoose');
const config=require('../utils/config');
mongoose.connect(config.dbConfig,{ useNewUrlParser: true },(err)=> {
    if(err) {
        console.log("Error while connecting to the database ",err);
    }
    else {
        console.log("Connected to the database successfully ");
    }
});
module.exports=mongoose;