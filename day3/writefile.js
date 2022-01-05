const fs = require('fs');
exports.write = (htmlData) => {
    fs.writeFile('./day3.html', htmlData, (err, res) => {
        if (err) throw err;
        console.log('File written successfully!');
        return res;
    });
}