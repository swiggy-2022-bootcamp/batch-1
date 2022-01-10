const {
    Router
} = require('express');
const welcomePageRoute = Router();
const path = require("path");



welcomePageRoute.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/01index.html'));
});

// welcomePageRoute.get('/', (req, res) => {
//     res.render("/public/login.html");
// });

// welcomePageRoute.get('/', (req, res) => {
//     res.render("/public/registration.html");
// });

module.exports = welcomePageRoute;