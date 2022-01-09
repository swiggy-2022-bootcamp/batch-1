var con = require('../connection/dbconnection');

con.query("CREATE DATABASE IF NOT EXISTS food_ordering_db", function (err, result) {
    if (err) throw err;
    console.log("Database created");
});

con.query("use food_ordering_db", function (err, result) {
    if (err) throw err;
    console.log("Database changed");
});

var user_sql_query = "CREATE TABLE IF NOT EXISTS user \
(userid INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)";
con.query(user_sql_query, function (err, result) {
if (err) throw err;
console.log("Table created");
});

var address_sql_query = "CREATE TABLE IF NOT EXISTS address \
(addid INT AUTO_INCREMENT PRIMARY KEY, userid INT, houseno INT NOT NULL, \
    street VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, state VARCHAR(255) NOT NULL, zip INT NOT NULL, \
    FOREIGN KEY (userid) REFERENCES user(userid))";
con.query(address_sql_query, function (err, result) {
if (err) throw err;
console.log("Table created");
});

var food_sql_query = "CREATE TABLE IF NOT EXISTS food \
(foodid INT AUTO_INCREMENT PRIMARY KEY, id VARCHAR(255) NOT NULL, foodname VARCHAR(255) NOT NULL, \
foodcost INT NOT NULL, foodtype enum('Indian','Chinese','Mexican','Italian','Thai'))";
con.query(food_sql_query, function (err, result) {
    if (err) throw err;
    console.log("Table created");
});
    
   