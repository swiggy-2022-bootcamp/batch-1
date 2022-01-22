var http = require('http');
let fs = require('fs');     // fs is file system module
// To upload a file, npm install formidable module
// To send a mail, npm install nodemailer module

// Creating a local server that listens at hard-coded port 8080
http.createServer(function (req, res) {
    fs.readFile("new.html", (error, data)=>{
        if (error) console.log("Error:", error);
        res.writeHead(200, { 'Content-Type':'text/html' });
        res.write(data);
    });
}).listen(8080, ()=>{ console.log("Server started listening at port 8080") });

// Opening a file in write mode
fs.open("new.html", 'w', (error)=>{
    // To write/overwrite data, use: fs.writeFile('new.html', <data>);
    if (error) throw error;
    console.log('new.html file is saved!');
});

// Appending data at end of file (sometimes succeeded unlink operation just below it, leading to error)
fs.appendFile('new.html', '<div>New Data</div>', error =>{
    if (error) throw error;
    console.log('new.html file has been Updated!');
});

// Deleting a file
fs.unlink('new.html', error=>{
    if (error) throw error;
    console.log("new.html file has been deleted successfully!");
});