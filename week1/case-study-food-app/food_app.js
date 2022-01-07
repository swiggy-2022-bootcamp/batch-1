const express = require('express');
const Joi = require('joi'); //used for validation
const app = express();
app.use(express.json());
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "#9826#"
});
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

con.query("use food_ordering_db", function (err, result) {
    if (err) throw err;
    console.log("Database changed");
});


//register user
app.post('/api/register', (req, res)=> {
 
    const { error } = validateUser(req.body);
    if (error){
    res.status(400).send(error.details[0].message)
    return;
    }

    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var houseno = req.body.address.houseno;
    var street = req.body.address.street;
    var city = req.body.address.city;
    var zip = req.body.address.zip;
    var state = req.body.address.state;

    // console.log(req.body);
    con.query("INSERT INTO user(username,email,password) values(?,?,?)",[username,email,password],function(err, result){
        if (err) {
            res.status(400).send(err.details[0].message);
            return;
        }
        var userid = result.insertId;
        console.log(result);
        con.query("INSERT INTO address(userid,houseno,street,city,state,zip) values(?,?,?,?,?,?)",[userid,houseno,street,city,state,zip],function(err, result){
            if (err) {
                res.status(400).send(err.details[0].message);
                return;
            }
        });

        const response = {
            "id": userid,
            "username": username,
            "email": email,
            "password": password,
            "address": {
            "houseno": houseno,
            "street": street, 
            "city": city,
            "state": state,
            "zip": zip
            } 
        }
           
        res.status(201).send(response);
        console.log("User registered!");
    });

});

app.post('/api/authenticate',(req,res)=>{
    const { error } = validateLogin(req.body);
    if (error){
    res.status(400).send(error.details[0].message)
    return;
    }

    var username = req.body.username;
    var password = req.body.password;

    con.query("SELECT * FROM user where username=? and password=?",[username,password],function(err,result,fields){
        if (err) {
            res.status(400).send(err.details[0].message);
            return;
        }
        if (result.length!=1){
            res.status(403).send("user details are wrong");
            return;
        }

        res.status(200).send("User logged in successful")

    })
});

app.get('/api/users',(req,res)=>{
    con.query('SELECT * FROM user,address where user.userid=address.userid',function(err,result,fields){
        if (err) {
            res.status(400).send(err.details[0].message);
            return;
        }

        var users = [];

        result.forEach(element => {
            var user_details = format_response(element);
            users.push(user_details);
        });
        
        res.status(200).send(users);
    });
});

app.get('/api/users/:userID', (req, res) => {
    con.query('SELECT * FROM user,address where user.userid = ? and address.userid = ?',[req.params.userID,req.params.userID],function(err,result,fields){
        if (err) {
            res.status(400).send(err.details[0].message);
            return;
        }
        if (result.length==0){
            res.status(404).send("Sorry user With "+req.params.userID+" not found");
        }

        var user_details = format_response(result[0]);

        res.status(200).send(user_details);
    });
});

app.put('/api/users',(req,res) => {
    con.query('SELECT * FROM user where userid=?',[req.body.id],function(err,result,fields){
        if (err) {
            res.status(400).send(err.details[0].message);
            return;
        }
        if (result.length==0){
            res.status(404).send("Sorry user With "+req.body.id+" not found");
        }

        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var houseno = req.body.address.houseno;
        var street = req.body.address.street;
        var city = req.body.address.city;
        var zip = req.body.address.zip;
        var state = req.body.address.state;

        con.query('UPDATE user set username = ?,email = ?,password = ? where userid = ?',[username,email,password,req.body.id],function (err, result){
            if (err) {
                res.status(400).send(err.details[0].message);
                return;
            }
        });

        con.query('UPDATE address set houseno = ?,street = ?,city = ?,zip = ?,state = ? where userid = ?',[houseno,street,city,zip,state,req.body.id],function (err, result){
            if (err) {
                res.status(400).send(err.details[0].message);
                return;
            }
        });

        res.status(200).send("details updated successfully for user: "+req.body.id);
    });
});


function format_response(user){
    const address = {
        houseno: user.houseno,
        street: user.street,
        city: user.city,
        state: user.state,
        zip:user.zip
    };

    const schema = {
        id: user.userid,
        username: user.username,
        email: user.email,
        password: user.password,
        address: address
    };

    return schema;
}

function validateLogin(request){
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });

    return schema.validate(request);
}

function validateUser(request){

    const address = Joi.object({
        houseno: Joi.number().required(),
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zip: Joi.number().required()
    });

    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        address: address
    });

    console.log('validation');
    return schema.validate(request);
}

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));