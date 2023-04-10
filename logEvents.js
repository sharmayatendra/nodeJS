const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (msg) => {
  const dateTime = `${format(
    new Date(),
    "yyyyMMdd\tHH:mm:ss"
  )}\t${uuid()}\t${msg}\n`;
  console.log(dateTime);

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLog.txt"),
      dateTime
    );
  } catch (err) {
    console.error(err);
  }
};

console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));

console.log("id:", uuid());

module.exports = logEvents;
