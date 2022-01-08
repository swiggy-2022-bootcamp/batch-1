const mongoose = require('mongoose');
const {MONGO_URI} = process.env;

async function connectDB() {
    try {

    await mongoose.connect(MONGO_URI, () => {
    console.log("MongoDB Connected");
    });
    
    } catch(e) {
        console.log(e);
    }
}

module.exports = connectDB;