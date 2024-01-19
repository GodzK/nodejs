const fs = require('fs');

if (!fs.existsSync('./practice')) {
    fs.mkdir('./practice', (err) => {
        if (err) throw err;
        console.log('Directory created');
    });

}
if (!fs.existsSync('./practice')) {
    fs.rmdir('./practice', (err) => {
        if (err) throw err;
        console.log('Directory removed');
    });

}
