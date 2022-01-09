const MongoClient = require('mongodb').MongoClient
fs = require('fs');


const connectionString = "mongodb+srv://admin:verma@cluster0.gd1or.mongodb.net/Stackover?retryWrites=true&w=majority";

module.exports.registerUser = function (userObj) {
    MongoClient.connect(connectionString, (err, client) => {
        if (err) return console.error(err)
        console.log('Connected to Database')

        const db = client.db('Stackover')
        const users = db.collection('Users')

        users.insertOne(userObj)
            .then(result => {
                console.log(result)
            })
            .catch(error => console.error(error))
    })
};

module.exports.login = function (userObj, printResponse) {

    MongoClient.connect(connectionString, (err, client) => {
        if (err) return console.error(err)
        console.log('Connected to Database')

        const db = client.db('Stackover')
        const users = db.collection('Users')


        users.findOne(userObj, function (error, result) {
            if (!error) {
                if (result) {
                    printResponse("User exists -- you are logged in ", "OK");
                    //set cookie or status that the user has logged in 
                } else {
                    printResponse("user does not exists -- or incorrect username/password","NON");
                }
            } else {
                console.log("Mongo error");
                printResponse("Mongo error","ERR");
            }
        });

    })

};

module.exports.storeUser = function (user) {
    console.log(user);
    fs.appendFile('users.txt', user["username"] + ',' + user["password"] + '\n', function (err) {
        if (err) {
            return console.log(err);
        } else {
            return "Registered"
        }
    });
};



/**
 


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:<password>@cluster0.gd1or.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



 */