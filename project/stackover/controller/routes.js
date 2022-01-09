const dbUtilsQnA =  require('../dao/dbUtilsQnA')

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.send('Hello world !');
    });

    app.post('/ask', function (req, res) {

        //perform validations here on the req
        console.log(req.body);
        console.log( "Logged in user: " + req.session.loggedInUser);

        if ( req.session.loggedInUser == null  ) {
            res.status(400).send("User not logged in!");
            return;
        }

        req.body["username"] = req.session.loggedInUser;


        dbUtilsQnA.askQuestion(req.body, function (result,err) {
            if ( err == null ) {
                res.send("Question Submitted!");
            } else {
                res.status(500).send("Failed to ask question!");
            }

        });

    });


    app.get('/2', function (req, res) {
        res.send('Hello world !');
    });



};