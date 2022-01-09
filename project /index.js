const express = require('express');
const dbUtils = require('./dbUtils');
const session = require('express-session');
const bodyParser = require('body-parser');
const validations = require('./utils/validations');

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

    var responseObj = { "status" : false , "message" : "" };

    //validations
    if ( validations.restBodyValidationsFailed(req.body, ["username","password"])) {
        responseObj = { "status" : false , "message" : "Invalid or missing credentials" }
        res.status(400).send(responseObj);
        return;
    }

    dbUtils.registerUser(req.body);
    responseObj["status"] = true;
    responseObj["message"] = "Succesfully registered the user.";
    res.status(202).send(responseObj);
});



app.post('/login', (req, res) => {

    var responseObj = { "status" : false , "message" : "" };

    //validations
    if ( validations.restBodyValidationsFailed(req.body, ["username","password"])) {
        responseObj = { "status" : false , "message" : "Invalid or missing credentials" }
        res.status(400).send(responseObj);
        return;
    }


    dbUtils.login(req.body,
        function (searchResponse, status ) {

            if ( status == "OK") {
                //setting logged in user in session
                req.session.loggedInUser = req.body["username"];
                // set response obj
                responseObj["status"] = true;
                responseObj["message"] = searchResponse
                return res.send(responseObj)
    
            } else if ( status == "NON") {
                // user is already logged in
                responseObj["message"] = searchResponse;
                return res.status(400).send(responseObj);

            } else {
                responseObj["message"] = "Error in logging in. Please contact team";
                res.status(500).send(responseObj);
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