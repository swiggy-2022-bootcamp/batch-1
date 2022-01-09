const mongoose = require('../../connection');
const userSchema = mongoose.Schema;
const user = new userSchema({
    id:{type:Number},
    username:{type:String,required : true},
    email:{type:String,required : true},
    password:{type:String,required : true},
    address:{houseno:Number,street:String,city:String,state:String,zip:Number}
});
const User = mongoose.model('users',user);
module.exports=User;