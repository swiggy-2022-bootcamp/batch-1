const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const config = require("../config"); // get our config file

const verifyUserToken = (req, res, next) => {
    // check header or url parameters or post parameters for token
    var token = req.headers["x-access-token"];
    if (!token)
        return res
            .status(403)
            .send({ auth: false, message: "No token provided." });

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res
                .status(500)
                .send({
                    auth: false,
                    message: "Failed to authenticate token.",
                });

        // if everything is good, save to request for use in other routes
        if (req.params.userId == decoded.id) {
            req.userId = decoded.id;
            next();
        } else {
            return res
                .status(403)
                .send({
                    auth: false,
                    message:
                        "User Id does not match with authentication token.",
                });
        }
    });
};

const verifyRestaurantToken = (req, res, next) => {
    // check header or url parameters or post parameters for token
    var token = req.headers["x-access-token"];
    if (!token)
        return res
            .status(403)
            .send({ auth: false, message: "No token provided." });

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res
                .status(500)
                .send({
                    auth: false,
                    message: "Failed to authenticate token.",
                });

        // if everything is good, save to request for use in other routes
        if (req.params.restaurantId == decoded.id) {
            req.restaurantId = decoded.id;
            next();
        } else {
            return res
                .status(403)
                .send({
                    auth: false,
                    message:
                        "Restaurant Id does not match with authentication token.",
                });
        }
    });
};

module.exports = {
    verifyUserToken,
    verifyRestaurantToken,
};
