require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
    // // Database connection 
    // mongoose.connect(process.env.MONGO_CONNECTION_URL,)
    // .then(console.log('Database connected 🥳🥳🥳🥳'))
    // .catch(err => console.log('Database Connection failed ☹️☹️☹️☹️',err));

    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_URL);
        console.log('Database connected... 🥳');
    } catch (error) {
        console.log('Database Connection failed... ☹️\n',error);
    }
}

module.exports = connectDB;