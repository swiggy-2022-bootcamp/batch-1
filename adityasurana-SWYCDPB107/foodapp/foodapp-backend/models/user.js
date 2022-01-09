const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: [true, "This Field is Required"],
        unique: true        
    },
    username: {
        type: String,
        required: [true, "This Field is Required"]
    },
    email: {
        type: String,
        required: [true, "This Field is Required"],
        unique : true
    },
    password: {
        type: String,
        required: [true, "This Field is Required"],
    },
    address: [{ 
        houseno: Number, 
        street: String,
        city: String,
        state: String,
        zip: Number
    }],
});


const userTable = mongoose.model('userTable',userSchema);
module.exports = userTable;
