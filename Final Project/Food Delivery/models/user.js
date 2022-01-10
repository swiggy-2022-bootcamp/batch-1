const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  userName:{
      type: String,
      required:true,
      minLength:5,
      maxLength:10
  },
  email: {type: String, required: true, minLength:10, maxLength:17},
  password: {type: String, required:true, minLength:7, maxLength:15},
  address:{
    houseno: Number, street: String,
    city: String,
    state: String,
    zip: Number
  }
});


module.exports = mongoose.model('User',userSchema);
