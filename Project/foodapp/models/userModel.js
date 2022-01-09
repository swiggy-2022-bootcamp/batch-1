const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const db_link = require('../../secrets');

mongoose.connect(db_link.db_link)
.then(function(db){
    console.log('db connected');
})
.catch(function(err){
    console.log('error in db mongoose.connection')
    console.log(err);
})

const userSchema= mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:7
    },
    address:{
        houseno:{
            type:Number,
            required:true
        },
        street: {
            type:String,
            required:true
        },
        city: {
            type:String,
            required:true
        },
        state:{
            type: String,
            required:true
        },
        zip:{
            type:Number,
            required:true
        }
    }
})

userSchema.pre('save',async function(){
    let salt = await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password,salt);
    console.log(hashedString);
    this.password=hashedString;
});


// model
const userModel=mongoose.model('userModel',userSchema);

module.exports=userModel;