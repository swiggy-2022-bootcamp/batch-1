const mongoose = require('mongoose');
const { db_link } = require('../secrets/secrets');


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
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'userModel',
        required:true
    },
    restaurantName:{
        type:String,
        required:true,
        unique:true,
        maxlength:[100,'Restaurant name cannot have more than 500 chars']
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
        type:
        {
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
        default:{
            fromHour:0,
            toHour:23
        }
    },
    foodItems:[{
        type: {
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
        },
        isVegetarian:{
            type:Boolean,
            default:false
        }
        },
        default : []
    }],
    profilePicture:{
        type:String,
        default:'img/users/default.jpeg'
    },
    locations:
    [{
        addressLabel:{
            type:String,
            default:'Main Branch'
        },
        address:{
            houseNo:{
                type:Number
            },
            street:{
                type:String
            },
            city:{
                type:String
            },
            state:{
                type:String
            },
            zip:{
                type:Number
            }
        }
    }]
});

const restaurantModel = mongoose.model('restaurantModel',restaurantSchema);

// restaurantModel.collection.dropIndex('foodItems.name_1',function(err,result)
// {
//     if (err) {
//         console.log('Error in dropping index!', err);
//     }
// });

module.exports = restaurantModel;