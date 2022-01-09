var fs = require('fs');

fs.open('fsopen.txt','w',function(err,file){
    if (err) throw err;
    else console.log('saved!');
})

fs.appendFile('fsopen.txt',"Here is some newly written content",function(err){
    if (err) throw err;
    console.log('updated!');
})

var content_file = "var fs = require('fs'); fs.unlink('fsopen.txt',function (err){if (err) throw err;console.log('deleted fsopen.txt which was opened with fsopen.js');})";

//content_file = addslashes(content_file);

function addslashes( str ) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

fs.writeFile('fsdelete.js',content_file, function (err){
    if (err) throw err;
    console.log('file written');
    fs.
})
