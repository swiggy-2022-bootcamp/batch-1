var http = require('http');
var dt  = require('./myDateTime')
var fs = require('fs');
const { deepStrictEqual } = require('assert');

console.log("listening..");

//SECOND SERVER 
http.createServer (
    function ( req, res) {
        fs.readFile('mypage.html', function (err,data) {
            res.write(data + "-- Modified!");
            res.end();
        })
    }
).listen(8080);

//FIRST SERVER 
/**
 * 
http.createServer (
    function ( req, res) {
        console.log("got a req");        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end("Hello World. At time:  " + dt.myDateTime());
    }
).listen(8080);
 */
