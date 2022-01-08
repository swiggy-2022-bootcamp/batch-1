const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db_link = 'mongodb+srv://abhibenne:abhibenne@cluster0.1txb7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(db)
{
    console.log('connected');
})
.catch(function(err)
{
    console.log(err);
});

const restaurantSchema = new mongoose.Schema({
    restaurantId:{
        type: Schema.Types.ObjectId, 
        ref: 'userModel',
        required:true
    },
    restaurantDescription:{
        type:String,
        default:'Description of restaurant goes here',
        maxlength:[500,'Restaurant description cannot have more than 500 chars']
    },
    restaurantType:{
        type:String,
        default:'Mixed Type'
    },
    discountPercentage:{
        type:Number,
        min:[0,'cannot have negetive discount'],
        max:[99,'cannot give away food for free'],
        default:0
    },
    availableHours:{
        fromHour:
        {
            type:Number,
            min:0,
            max:23
        },
        toHour:
        {
            type:Number,
            min:0,
            max:23
        }
    },
    foodItems:[{
        name:{
            type:String,
            required:true,
            unique:true,
            maxlength:[200,'Any sensible dish is having lesser than 200 characters in its name']
        },
        price:{
            type:Number,
            required:true
        },
        foodType:{
            type:String,
            default:'Indian'
        },
        foodDescription:{
            type:String,
            default:'Food description goes here'
        }
    }]
});


const restaurantModel = mongoose.model('restaurantModel',restaurantSchema);

module.exports = restaurantModel;