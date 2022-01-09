const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

// directory containing logs
const logDirectory = path.join(__dirname + "/../logs");

// check if 'logs' directory exists or create it
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating file stream which rotates every day and stores log in logDirectory with the log file name 'access.log'
const accessLogStream = rfs.createStream("access.log", {
    path: logDirectory,
    interval: "1d",
    size: "10M",
    compress: "gzip",
});

module.exports = accessLogStream;
