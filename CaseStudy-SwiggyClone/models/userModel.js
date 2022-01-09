
const mongoose = require('mongoose');
const validator = require("email-validator");
const bcrypt = require('bcrypt');
const db_link = 'mongodb+srv://abhibenne:abhibenne@cluster0.1txb7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const crypto = require('crypto');

mongoose.connect(db_link)
.then(function(db)
{
    console.log('connected');
})
.catch(function(err)
{
    console.log(err);
});

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:
        function(){
            return validator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        minLength:8,
        validate: function()
        {
            return this.password == this.confirmPassword;
        }
    },
    role:{
        type:String,
        enum:['admin','user','restaurantOwner','deliveryBoy'],
        default:'user'
    },
    profilePicture:{
        type:String,
        default:'img/users/default.jpeg'
    },
    locations:
    [{
        addressLabel:{
            type:String,
            default:'Default/Home Location'
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
    }],
    resetToken:String
});

// pre post hooks
userSchema.pre('save',function(){
    // wont save in db if undefined
    this.confirmPassword = undefined;
    // console.log('before saving to db',this);
});

userSchema.pre('save',async function(){

    // generate a hash from user's password and store that in DB, for security reasons
    let salt = await bcrypt.genSalt();
    let hashString = await bcrypt.hash(this.password,salt);
    this.password = hashString;
    // console.log(hashString);
});


// userSchema.post('save',function(doc){
//     console.log('after saving to db: ',doc);
// });


// userSchema.methods.createResetToken = function()
// {
//     // crypto
//     const resetToken = crypto.randomBytes(32).toString("hex");
//     this.resetToken = resetToken;
//     return resetToken;
// }

// userSchema.methods.resetPasswordHandler = function(password,confirmPassword)
// {
//     if(password == confirmPassword)
//     {
//         this.password = password;
//         this.resetToken = undefined;
//     }
// }

const userModel = mongoose.model('userModel',userSchema);

module.exports = userModel;