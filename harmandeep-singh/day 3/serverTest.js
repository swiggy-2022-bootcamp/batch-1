var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<H1> Swiggy task 3</h1>');
    res.end('Hello World!');
}).listen(8080);   