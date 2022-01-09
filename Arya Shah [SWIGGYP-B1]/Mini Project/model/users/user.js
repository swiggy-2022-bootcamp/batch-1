const mongoose= require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const schema = mongoose.Schema

const userSchema = new schema({
    dateCreated:{
        type: Date,
        default: new Date
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next){
    //Hash password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
userSchema.methods.generateAuthToken = async function(password) {
    // Generate an auth token for the user
    const token = jwt.sign({password}, "8hhg5f56g7t67")
    return token
}
const User = mongoose.model('users', userSchema);
module.exports = User;
