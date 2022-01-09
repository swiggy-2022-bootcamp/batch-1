const MongoClient = require('mongodb').MongoClient
fs = require('fs');


const connectionString = "mongodb+srv://admin:verma@cluster0.gd1or.mongodb.net/Stackover?retryWrites=true&w=majority";

module.exports.askQuestion = function (questionObj, callback) {
    MongoClient.connect(connectionString, (err, client) => {
        if (err) return console.error(err)
        console.log('Connected to Database')

        const db = client.db('Stackover')
        const question = db.collection('Questions')

        question.insertOne(questionObj)
            .then(result => {
                console.log(result)
                callback(result,null);
            })
            .catch(error => callback(null,error))
    })
};
