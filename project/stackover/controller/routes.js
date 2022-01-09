const dbUtilsQnA = require('../dao/dbUtilsQnA')
const constants = require('../utils/constants');
const validator = require('../utils/validations');

const e = require('express');


module.exports = function (app) {

    app.post('/ask', function (req, res) {
        /* Needs only one parameter:
            1. statement
         */
        var responseObj = { "status": false, "message": "" };

        //perform validations 
        if (validator.restBodyValidationsFailed(req.body, ["statement"])) {
            responseObj["message"] = "parameter 'statment' is missing or empty";
            res.status(400).send(responseObj);
            return;
        }

        console.log(req.body);
        console.log("Logged in as user: " + req.session.loggedInUser);

        if (req.session.loggedInUser == null) {
            responseObj["message"] = "User is not logged in!";
            res.status(400).send(responseObj);
            return;
        }

        //adding extra fields for MongoDb Doc
        req.body["username"] = req.session.loggedInUser;
        req.body["questionId"] = constants.randomIdGenerator();
        req.body["answers"] = [];
        req.body["upvotes"] = 0;

        dbUtilsQnA.askQuestion(req.body, function (result, err) {
            if (err == null) {
                console.log("result: " + result);
                var responseObj = {
                    "status": true,
                    "questionId": req.body["questionId"],
                    "message": "Succesfully submitted question!"
                };
                res.status(202).send(responseObj);
            } else {
                var errorResponse = { "status": false, "message": "Failed to ask question!" };
                res.status(500).send(errorResponse);
            }
        });

    });

    app.post('/answer', function (req, res) {
        /**
         * in order to answer a question the Request body should contain two parameters:
         * 1. questionId 
         * 2. answer
         */
        var responseObj = { "status": false, "message": "" };

        if (validator.restBodyValidationsFailed(req.body, ["questionId", "answer"])) {
            responseObj["message"] = "'questionId' or 'answer' field missing or empty!";
            res.status(400).send(responseObj);
            return;

        }
        var answer = req.body["answer"];
        var questionId = req.body["questionId"];

        //dbUtilsQnA.retrieveQuestion(req.body["questionId"]); // if this is true then updaate:

        dbUtilsQnA.answerQuestion(questionId, answer, function (_, err) {
            if (err == null) { 
                responseObj["status"] = true;
                responseObj["message"] = "Successfully added answer!";
                res.status(202).send(responseObj); 
            }
            else {
                responseObj["message"] = "Failed to add answer!";
                res.status(500).send(responseObj);
            }
        });

    });
};