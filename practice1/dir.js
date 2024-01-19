const fs = require('fs');

if(!fs.existsSync('./practice1')
fs.mkdir('./practice1', (err)=>{
    if (err) throw err;
    console.log('Directory created');
})