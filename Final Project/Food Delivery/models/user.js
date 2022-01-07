const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  userName:{
      type: String,
      required:true
  },
  email: {type: String, required: true},
  password: {type: String, required:true},
  address:{
    houseno: Number, street: String,
    city: String,
    state: String,
    zip: Number
  }
});


module.exports = mongoose.model('User',userSchema);
