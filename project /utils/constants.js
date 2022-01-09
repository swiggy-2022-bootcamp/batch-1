
const crypto = require("crypto");

module.exports.randomIdGenerator = function () {
    const id = crypto.randomBytes(16).toString("hex");
    console.log(id); // => f9b327e70bbcf42494ccb28b2d98e00e
    return id;
}

