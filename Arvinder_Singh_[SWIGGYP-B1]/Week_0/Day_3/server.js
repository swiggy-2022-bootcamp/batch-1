const http = require('http');
const fs   = require('fs');
const cm   = require('./customModules/customModules');

http.createServer((req,res)=>{
    console.log(req.url);
    switch (req.url) {
        case "/favicon.ico":
            //do nothing
            res.end();
            break;        
        case "/":
            cm.home(req,res);
            break;
        case "/files/readFile/":
            cm.readFile(req,res);
            break;
        case "/files/openFile/":
            cm.openFile(req,res);
            break;
        case "/files/unlinkFile/":
            cm.unlinkFile(req,res);
            break;    
        default:
            res.end();
            break;
    }
}).listen(3000);