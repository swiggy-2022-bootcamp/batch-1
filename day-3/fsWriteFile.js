var fs = require('fs');


// overwrites content  of a file

fs.writeFile('demoFile2.txt', 'This text has overwritten the contents of this file!', function (err) {

    if (err) {
        throw err;
    }
    console.log('Content of file demoFile2.txt overwritten!');
});