// //Creating the server
// var http= require('http');

// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.write('This is the server home page.');
//     res.end();
// }).listen(9000);


//Reading the html file
var http = require('http');
var fs= require('fs');

http.createServer(function(req, res){
   fs.readFile('index.html', function(err,data){
       res.writeHead(200, {'Content-Type': 'text/html'});
       res.write(data);
       return res.end();
   })

}).listen(9000);


function appendFile(){
    fs.appendFile('demo.txt', 'This is a demo file', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

//Append to file
appendFile();

//Opening the file
function openFile(){
    fs.open('demo.txt', 'w', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
      });
};

openFile();


//Overwriting the present context
function overwrite(){
    fs.writeFile('demo.txt', 'Overwrittern', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
};

// overwrite();


//Updating the file present

function updateFile(){  
fs.appendFile('demo.txt', 'Updating the content.', function (err) {
  if (err) throw err;
  console.log('Updated!');
});
}

updateFile();


//Deleting the specified file
function deleteFile(){
    fs.unlink('demo.txt', function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
};

// deleteFile();

//Renaming the presnt File
function rename(){
    fs.rename('demo.txt', 'renamedDemo.txt', function (err) {
        if (err) throw err;
        console.log('File Renamed!');
      });
}
rename();


