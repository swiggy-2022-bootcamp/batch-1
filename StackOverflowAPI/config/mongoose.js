const mongoose = require('mongoose');

// mongodb connection url
const url = `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@week0cluster.qzxqt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// setting up a connection
mongoose.connect(url);

// starting a connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to database!"));
db.once('open', () => {
    console.log("Database connection successful!");
})

module.exports = db;