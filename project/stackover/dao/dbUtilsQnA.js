const MongoClient = require('mongodb').MongoClient
fs = require('fs');
const util = require('util');

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
                callback(result, null);
            })
            .catch(error => callback(null, error))
    })
};


module.exports.retrieveQuestion = function (questionId) {
    MongoClient.connect(connectionString, (err, client) => {
        if (err) return console.error(err)
        console.log('Connected to Database')

        const db = client.db('Stackover')
        const question = db.collection('Questions')

        question.findOne({ "questionId": questionId }, function (error, result) {
            if (!error) {
                if (result) {
                    console.log(util.inspect(result, {depth: null}));
                    console.log("found!! " );
                    console.log( result);

                } else {
                    console.log("not found");
                }
            } else {
                console.log("Mongo error");
            }
        }) ;
    })
};


module.exports.answerQuestion = function (questionId, givenAnswer, callbackForStatus) {
    MongoClient.connect(connectionString, (err, client) => {
        if (err) return console.error(err)
        console.log('Connected to Database')

        const db = client.db('Stackover')
        const question = db.collection('Questions')

        var query = { "questionId": questionId };
        var updatedValues = { $push: { answers: { $each: [ givenAnswer] } } };
        
        question.updateOne(query, updatedValues, function (error, result) {
            if (error) {
                callbackForStatus(result,error);
            }
            console.log("1 document updated");
            callbackForStatus("OK",null);
        }) ;
    })
};
