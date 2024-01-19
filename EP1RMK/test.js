const jk = require('fs');

jk.readFile('./test/lorem.txt',"utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
})


console.log("Hello....");
process.on("uncaughtException", err => {
    console.error(`เกิดerrorเเล้วไอเหี้ย ${err}`);
    process.exit(1);
});



