const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts')

//mongoose :  to store user details in database.
mongoose.connect('mongodb://localhost/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('connected,,'))
    .catch((err) => console.log(err));

//EJS : layouts
app.set('view engine', 'ejs');
app.use(expressEjsLayout);


//parsingTheBody
app.use(express.urlencoded({
    extended: false
}));

//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(8080);