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

   