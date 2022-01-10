var fs = require('fs');


// overwrites content  of a file

fs.writeFile('demoFile2.txt', 'demoFile2_renamed.txt', function (err) {

    if (err) {
        throw err;
    }
    console.log('demoFile2.txt renamed to demoFile2_renamed.txt!');
});