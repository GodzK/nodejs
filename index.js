const jk = require('fs');
const path = require('path');
jk.readFile(path.join(__dirname, "test", "lorem.txt"),"utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
})


console.log("Hello....");
process.on("uncaughtException", err => {
    console.error(`เกิดerror ${err}`);
    process.exit(1);
});



