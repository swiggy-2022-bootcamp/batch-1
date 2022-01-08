var http = require('http');
var file = require('./func.js');
var fs = require('fs');


http.createServer(function (req, res) {

    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.write("Current Date and Time: " +Date.now());
      return res.end();
    });
    
    file.append('Appended');
    file.open('w');
    file.write('Overwritten !');
    file.delete();
    file.rename();

  }).listen(5000);