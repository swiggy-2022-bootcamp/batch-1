var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    fs.readFile('hobbies.html',function (err,data){
    res.writeHead(200, {'Content-Type': 'text/html'});   
    if (err) res.write(err);
    else res.write(data);
    res.end();
    });
}).listen(8080);