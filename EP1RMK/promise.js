const fsPromise = require('fs').promises;
const path = require('path');

const fileOps = async () => {
    try {
        const data = await fsPromise.readFile(path.join(__dirname, 'test', 'starter.txt'), 'utf8');
        console.log(data);
// unlink=del
        await fsPromise.unlink(path.join(__dirname, 'test', 'starter.txt'), data);
        await fsPromise.appendFile(path.join(__dirname, 'test', 'newpromisewrite.txt'), "Goal is real");

        await fsPromise.rename(
            path.join(__dirname, 'test', 'newpromisewrite.txt'),
            path.join(__dirname, 'test', 'complete.txt')
        );

        const newdata = await fsPromise.readFile(path.join(__dirname, 'test', 'complete.txt'), 'utf8');
        console.log(newdata);
    } catch (err) {
        console.log(err);
    }
};

// Call the function
fileOps();
