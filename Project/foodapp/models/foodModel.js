const mongoose = require('mongoose');

const db_link = 'mongodb+srv://admin:sk39szkdj4nX7HWC@cluster0.4zagl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(db_link)
.then(function(db){
    console.log('db connected');
})
.catch(function(err){
    console.log('error in db mongoose.connection')
    console.log(err);
})

const foodSchema= mongoose.Schema({
    foodId:{
        type:Number,
        required:true,
        unique:true
    },
    foodName:{
        type:String,
        required:true
    },
    foodCost:{
        type:Number,
        required:true,
    },
    foodType:{
        type:String,
        required:true,
        validate:[function(){
            const arr = ['Indian','Chinese','Mexican'];
            return (arr.indexOf(this.foodType) > -1);
        }, 'foodType should be in Indian/Mexican/Chinese']
    }
})


// model
const foodModel=mongoose.model('foodModel',foodSchema);

module.exports=foodModel;