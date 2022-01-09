const dbUtilsQnA =  require('../dao/dbUtilsQnA')
const constants = require ('../configs/constants');
const e = require('express');


module.exports = function (app) {

    app.get('/', function (req, res) {
        res.send('Hello world !');
    });

    app.post('/ask', function (req, res) {

        //perform validations here on the req
        if ( validationsFailed (req,["statement"])) {
            //return  404
            // basically the request should contain 'statement' (username it will pick up on its own)
        }

        console.log(req.body);
        console.log( "Logged in user: " + req.session.loggedInUser);

        if ( req.session.loggedInUser == null  ) {
            res.status(400).send("User not logged in!");
            return;
        }

        req.body["username"] = req.session.loggedInUser;
        req.body["questionId"] = constants.randomIdGenerator();
        req.body["answers"] = [];
        req.body["upvotes"] = 0;

        dbUtilsQnA.askQuestion(req.body, function (result,err) {
            if ( err == null ) {
                res.send("Question Submitted!");
            } else {
                res.status(500).send("Failed to ask question!");
            }

        });

    });

    app.post('/answer', function (req, res) {
        /**
         * in order to answer a question the Request body should contain two parameters:
         * 1. questionId 
         * 2. answer
         * 
         */
        if ( validationsFailed (req,["questionId","answer"])) {
            res.status(400).send("questionId or answer field missing!");
        }
        var answer  = req.body["answer"];
        var questionId = req.body["questionId"];

        //dbUtilsQnA.retrieveQuestion(req.body["questionId"]); // if this is true then updaate:
        
        dbUtilsQnA.answerQuestion(questionId, answer, function ( _ , err) {
            if ( err == null) res.status(202).send("Successfully added answer!");
            else res.status(500).send("Failed to add answer");
        });

    });

    app.get('/2', function (req, res) {
        res.send('Hello world !');
    });

    function validationsFailed (request, mandatoryParams ) {
        return false;
    }

};