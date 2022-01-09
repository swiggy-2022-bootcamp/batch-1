const express = require('express');
const dbUtils = require('./dbUtils')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express();

console.log('May Node be with you')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    // It holds the secret key for session
    secret: 'randomgeneratedkey',
    resave: true,
    saveUninitialized: true
}));



app.listen(8080, function (req, res) {
    console.log('listening on 8080')
})

// handers:
app.get('/', function (req, res) {
    res.send("hi")
})

app.post('/register', (req, res) => {
    dbUtils.registerUser(req.body);
    res.send("Succesfully registered the user.")
});

app.post('/login', (req, res) => {
    dbUtils.login(req.body,
        function (searchResponse, status ) {

            if ( status == "OK") {
                req.session.loggedInUser = req.body["username"]
                res.send(searchResponse)
                //setting logged in user in session
                
            } else if ( status == "NON") {
                res.send(searchResponse);
                
            }
            
        });
});

//check session
app.post('/session', (req, res) => {
    res.send(req.session.loggedInUser +  " is logged in ");
    console.log(req.session);
});



