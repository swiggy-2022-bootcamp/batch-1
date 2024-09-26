var fs = require('fs');

// Append File
exports.append = function (data) {
    fs.appendFile('file.txt', data, function (err) {
        if (err) throw err;
        console.log('Append File !');
        //return ('Append File, File -->','file.txt');
    })
};

// Open File
exports.open = function (mode) {
    fs.open('file2.txt', mode, function (err, file) {
        if (err) throw err;
        console.log('Opened!');
        //return ('Opened File, File -->','file.txt');
    })
};

//Write a File
exports.write = function (data) {
    fs.writeFile('file.txt', data, function (err) {
        if (err) throw err;
        console.log('Saved!');
    })
};

//Delete a File
exports.delete = function () {
    fs.unlink('file2.txt', function (err) {
        if (err) throw err;
        console.log('Deleted!');
    })
};

//Rename a File
exports.rename = function () {
    fs.rename('file.txt', 'renamedfile.txt', function (err) {
        if (err) throw err;
        console.log('File Renamed!');
    })
};