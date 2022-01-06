const fs = require('fs');

const delFile = (filePath) => {
    fs.unlinkSync(filePath, (err) => {
        if (err) throw err;
        console.log('File deleted successfully!');
    });

};

module.exports = delFile;