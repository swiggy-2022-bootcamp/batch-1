var http = require('http'); // for http servers
var dt = require('./firstModule'); // custom modules
var fs = require('fs'); // for file operations
var formidable = require('formidable'); // for file upload operations from system to server
var nodemailer = require('nodemailer'); // for email operations (transporter -> put details, payload -> send)

var url = require('url');

// http://localhost:8080

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.write('The current date and time is ' + dt.myDateTime());
    res.end('!!!');
    console.log('This server was called once!');
}).listen(8080);


// http://localhost:8081/?name=Ayan&surname=Dutta

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var q = url.parse(req.url, true).query;
    var txt = q.name + " " + q.surname;
    res.end(txt);
}).listen(8081);