var fs = require('fs');

fs.appendFile('newfile.txt', 'Hello World!', function (err) {
    if (err) throw err;
    console.log('Saved!');
});

fs.writeFile('newfile1.txt', 'Hello World!', function (err) {
    if (err) throw err;
    console.log('Saved!');
});

fs.open('newfile2.txt', 'w', function (err, file) {
    if (err) return err;
    console.log('File opened successfully.');
    fs.writeFile(file, 'New data added', function (err) {
        if (err) throw err;
        console.log('Data written successfully.');
    });
})
