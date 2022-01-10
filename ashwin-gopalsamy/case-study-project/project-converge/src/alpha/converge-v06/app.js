const express = require('express');
const http = require('http');
const path = require("path");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const landingPageRoute = require("./routes/landingPageRoute");
// const registerRoute = require("./routes/registerRoute");
// const registerValidation = require("./routes/registerValidation");

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, './public')));
app.use('/public', express.static('public'));


app.use('/', landingPageRoute);
// app.use('/user', registerRoute);
// app.use('/user',registerValidation);


server.listen(3004, function () {
    console.log("server is listening on port: 3004");
});