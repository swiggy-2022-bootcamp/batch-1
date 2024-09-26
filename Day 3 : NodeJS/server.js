// Modules
var http = require('http');
var date_obj = require('./datemodule');
var file_obj = require('./filemodule');
var fs = require('fs');

http.createServer(function (req, res) {

    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.write("The date and time are currently: " + date_obj.myDateTime());
      return res.end();
    });
    
    file_obj.append('Append Content');
    file_obj.open('w');
    file_obj.write('Overwrite Content !');
    file_obj.delete();
    file_obj.rename();

  }).listen(8080);