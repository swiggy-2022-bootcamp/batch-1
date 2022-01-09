var fs = require('fs');
var http = require ('http');

const { Http2ServerRequest } = require('http2');


// fs.append() file to add to fille
// fs.write() re-writes everything
fs.appendFile("newRandom.txt" , "<random input>", function (err) {
    if ( err ) {
        console.log("unable to write");
    } else {
        console.log("all good");
    }
});

http.createServer( 
    function ( req, res) {
        fs.readFile("newRandom.txt", function(err, data) {
            res.write("<html><body><h1>"+ data + "</h1></body></html>");
            res.end();
        })
    }
).listen(8001); 

