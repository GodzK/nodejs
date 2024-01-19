const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, "test", "lorem.txt"), "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
});

console.log("Hello....");

fs.writeFile(path.join(__dirname, "test", "newpaper.txt"), "\n\nNice to Meet you", (err) => {
    if (err) throw err;
    console.log("Write complete");

    fs.appendFile(path.join(__dirname, "test", "newpaper.txt"), "\n\nthis is append", (err) => {
        if (err) throw err;
        console.log("Append complete");

        fs.rename(
            path.join(__dirname, "test", "newpaper.txt"),
            path.join(__dirname, "test", "dgdgd.txt"),
            (err) => {
                if (err) throw err;
                console.log("Rename complete");
            }
        );
    });
});
