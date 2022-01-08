var fs = require('fs');


// opens a file in the specified mode, creates new empty file if not present

fs.open('demoFile2.txt', 'w', function (err, file) {

    if (err) {
        throw err;
    }
    console.log('Opened demoFile2.txt!');
});

// appends content to end of a file

fs.appendFile('demoFile2.txt', 'This text has been appended to the file!', function (err) {

    if (err) {
        throw err;
    }
    console.log('Appended text to file demoFile2.txt!');
});


// overwrites content  of a file

fs.writeFile('demoFile2.txt', 'This text has overwritten the contents of this file!', function (err) {

    if (err) {
        throw err;
    }
    console.log('Content of file demoFile2.txt overwritten!');
});