const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true ,
        minlength:3
    },
    fullname: { 
        type: String, 
        required: true , 
        minlength:3
    },
    email: { 
        type: String, 
        required: true, 
        unique: true , 
        match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    },
    password: { 
        type: String, 
        required: true , 
        minlength:5,
        maxlength:20
    },
    address: { 
        type: {
            houseno : {type: String, required:true},
            street : {type: String, required:true},
            city : {type: String, required:true},
            state : {type: String, required:true},
            zip : {type: Number, required:true}
        }, 
        required:true
    },
    role: { 
        type: String, 
        default: 'customer' 
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)

/*
address: { type: mongoose.Schema.Types.Address, required:true},


    // id: Number,
    // username: String,
    // fullname : String,
    // email: String,
    // password: String
    // address: {
    // houseno:Number,
    // street:String,
    // city:String,
    // state:String,
    // zip:number

*/