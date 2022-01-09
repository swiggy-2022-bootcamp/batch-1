const express = require('express');
const dbUtils = require('./dbUtils')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express();


console.log('Server is up and running...')

// to do --> put these in a config file
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
                // user is logged in
                res.send(searchResponse);
                
            } else {
                res.send("Error in logging in. Please contact team")
            }
            
        });
});

app.get('/logout', (req,res) => { 
    if (req.session.loggedInUser != null ) {
        req.session.loggedInUser  = null; 
        res.send("Logged the user out!")        
    } else {
        res.send("No one is logged in!")       
    }                                    
});

//check session, i.e. who is logged in
app.get('/session', (req, res) => {
    if (  req.session.loggedInUser != null ) {
        res.send(req.session.loggedInUser +  " is logged in ");
        console.log(req.session);
    } else {
        res.send("No user is logged in!")
    }
});


require('./controller/routes.js')(app); 