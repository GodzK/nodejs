const jk = require('fs');

jk.readFile('./test/lorem.txt' , (err,data) =>{
    if (err) throw err;
    console.log(data);
})