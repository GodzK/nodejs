const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fspromises = require("fs").promises;
const path = require("path");

const logevent = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyMMdd\t HH:mm:ss")}`;
  const logitem = `${dateTime}\t${uuid()}\t${message}`;
  console.log(logitem);
  try {
    if (!fs.existsSync(path.join(__dirname, 'EP2NPM'))) {
        await fspromises.mkdir(path.join(__dirname, 'FolderJookroo'));
    }
    await fspromises.appendFile(
      path.join(path.join(__dirname, 'FolderJookroo', logName), "eventLog.txt"),
      logitem
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = logevent;
