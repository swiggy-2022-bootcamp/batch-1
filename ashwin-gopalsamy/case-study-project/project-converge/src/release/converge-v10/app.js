//Import libraries and packages
const express = require('express');
const meeting = require('./routes/meetingRoute');
const accountAuth = require("./routes/accountRoute");


//Declaring Express
const app = express();

//Allowing Express to use JSON.
app.use(express.json());


//Routes
app.use("/",accountAuth);
app.use("/meeting",meeting);

//run the app and render on browser
const port = process.env.PORT || 4000;
app.listen(4000, () => {
    console.log(`Up and running on port localhost:${port} ...`);
});
