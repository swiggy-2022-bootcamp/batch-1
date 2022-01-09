const express = require('express');
const fs = require('fs');
const app = express();
const {createUserDB, createFoodDB} = require('./utils/persistance');

app.use(express.json());


// endpoints
// register new user
app.post('/api/register', (request, response) => {
    fs.readFile('users.json', 'utf8', (err, data) =>{
        if (err && err.code === 'ENOENT') {
            createUserDB();
        } else {
            var userObj = JSON.parse(data);
            userObj.users.push(request.body);
            fs.writeFile('users.json', JSON.stringify(userObj), 'utf8', function(err) {
                if (err) throw err;
                console.log('Record added');
            });
        }
    });
    response.status(201).send(request.body);
});


//validate the user is registered
app.post('/api/authenticate', (request, response) => {
    fs.readFile('users.json', 'utf8', (err, data) =>{
        if (err && err.code === 'ENOENT') {
            createUserDB();
        } else {
            var userObj = JSON.parse(data);
            var user = userObj.users.find(user => user.username === request.body.username && user.password === request.body.password);
            if (user) {
                response.status(200).send({"Message": "User logged in successful"});
            } else {
                response.status(403).send({"Message": "User not registered"});
            }
        }
    }
    );
});


//get a list of all users
app.get('/api/users', (request, response) => {
    fs.readFile('users.json', 'utf8', (err, data) =>{
        if (err && err.code === 'ENOENT') {
            createUserDB();
        } else {
            var userObj = JSON.parse(data);
            response.status(200).send(userObj.users);
        }
    });
});


//get a user by id
app.get('/api/users/:id', (request, response) => {
    fs.readFile('users.json', 'utf8', (err, data) =>{
        var userID = request.params.id;
        if (err && err.code === 'ENOENT') {
            createUserDB();
            response.status(404).send({"Message": `Sorry user with ${userID} not found”`});
        } else {
            var userObj = JSON.parse(data);
            var user = userObj.users.find(user => user.id == userID);
            if (user) {
                response.status(200).send(user);
            } else {
                response.status(404).send({"Message": `Sorry user with ${userID} not found”`});
            }
        }
    });
});


//update the users
app.put('/api/users', (request, response) => {
    fs.readFile('users.json', 'utf8', (err, data) =>{
        var userID = request.body.id;
        if (err && err.code === 'ENOENT') {
            createUserDB();
        } else {
            var userObj = JSON.parse(data);
            var user = userObj.users.find(user => user.id == userID);
            if (user) {
                user.username = request.body.username;
                user.email = request.body.email;
                user.password = request.body.password;
                user.address = request.body.address;
                fs.writeFile('users.json', JSON.stringify(userObj), 'utf8', function(err) {
                    if (err) throw err;
                    console.log('Record updated');
                });
                response.status(200).send(user);
            } else {
                response.status(404).send({"Message": `Sorry user with ${userID} not found”`});
            }
        }
    });
});


//delete the user by id
app.delete('/api/users/:id', (request, response) => {
    fs.readFile('users.json', 'utf8', (err, data) =>{
        var userID = request.params.id;
        if (err && err.code === 'ENOENT') {
            createUserDB();
        } else {
            var userObj = JSON.parse(data);
            var user = userObj.users.find(user => user.id == userID);
            if (user) {
                userObj.users.splice(userObj.users.indexOf(user), 1);
                fs.writeFile('users.json', JSON.stringify(userObj), 'utf8', function(err) {
                    if (err) throw err;
                    console.log('Record deleted');
                });
                response.status(200).send({"Message": "User deleted successfully"});
            } else {
                response.status(404).send({"Message": {"Message": `Sorry user with ${userID} not found”`}});
            }
        }
    });
});


// create new food record
app.post('/api/food', (request, response) => {
    fs.readFile('foods.json', 'utf8', (err, data) =>{
        if (err && err.code === 'ENOENT') {
            createFoodDB();
        } else {
            var foodObj = JSON.parse(data);
            var newObj = request.body;
            newObj.Id = foodObj.foods.length + 1;
            foodObj.foods.push(newObj);
            fs.writeFile('foods.json', JSON.stringify(foodObj), 'utf8', function(err) {
                if (err) throw err;
                console.log('Record added');
            });
            response.status(201).send(newObj);
        }
    }
    );
    
});


// get food by foodId
app.get('/api/food/:foodId', (request, response) => {
    fs.readFile('foods.json', 'utf8', (err, data) =>{
        if (err && err.code === 'ENOENT') {
            createFoodDB();
        } else {
            var foodObj = JSON.parse(data);
            var food = foodObj.foods.find(food => food.foodId == request.params.foodId);
            if (food) {
                response.status(200).send(food);
            } else {
                response.status(404).send({"Message": "Sorry Food Not Found"});
            }
        }
    }
    );
});


// ping the server
app.get('/ping', (request, response) => {
    response.send('pong');
});

module.exports = app;