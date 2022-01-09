const fs = require('fs');
function createUserDB(){
    var userObj = {users: []};
    fs.writeFile('users.json', JSON.stringify(userObj), 'utf8', function(err) {
    if (err) throw err;
        console.log('User DB file created');
    });
}

function createFoodDB(){
    var foodObj = {foods: []};
    fs.writeFile('foods.json', JSON.stringify(foodObj), 'utf8', function(err) {
        if (err) throw err;
        console.log('Food DB file created');
    });
}

module.exports = {createUserDB, createFoodDB};