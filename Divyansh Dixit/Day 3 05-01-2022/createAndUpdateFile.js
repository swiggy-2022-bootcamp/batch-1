var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {

    fs.appendFile('sample.txt', 'Hello World !', function(err) {
        if(err)
        throw err;

        console.log('Saved');
    })

}).listen(8580);