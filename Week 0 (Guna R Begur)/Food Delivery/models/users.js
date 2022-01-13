const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const addressSchema = new mongoose.Schema({
    houseno:{
        type:Number,
        required: true
    },
    street:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    state:{
        type:String,
        required: true
    },
    zip:{
        type:Number,
        min: 100000,
        max: 999999,
        required: true
    }
})

const userSchema = mongoose.Schema({
    username:{
        type:String,
        minlength:4,
        maxlength:50,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required: true
    },
    password:{
        type:String,
        minlength:8,
        maxlength:200,
        required: true,
    },
    address:{
        type: addressSchema,
        required: true
    }
})


userSchema.methods.generateJWT = function(){
    const token = jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email 
        },
        process.env.JWT_SECRET
    )

    return token
}

const User = mongoose.model('User',userSchema)

module.exports={
    User,
} 