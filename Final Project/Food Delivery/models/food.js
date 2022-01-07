const mongoose = require('mongoose');


const foodSchema = new mongoose.Schema({
  foodId:{
      type: Number,
      required: true,
  },
  foodName:{
      type: String,
      required: true
  },
  foodCost:{
      type: Number,
      required: true
  },
  foodType:{
      enum: ['Indian', 'Chinese', 'Mexican']
  }
});


module.exports = mongoose.model('Food',foodSchema);