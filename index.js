const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const logEvents = require("./logEvents");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

// object initialize
const myEmitter = new MyEmitter();

//add listener for log evenet
myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  myEmitter.emit("log", "log event emitted!!");
}, 2000);

//instead of hardcoding this we can use path module
// fs.readFile("./starter.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.readFile(path.join(__dirname, "starter.txt"), "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "starter.txt"),
      "utf8"
    );
    await fsPromises.unlink(path.join(__dirname, "starter.txt"));
    await fsPromises.writeFile(path.join(__dirname, "promiseWrite.txt"), data);
    await fsPromises.appendFile(
      path.join(__dirname, "promiseWrite.txt"),
      "\n\n appending in promiseWrite"
    );
    await fsPromises.rename(
      path.join(__dirname, "promiseWrite.txt"),
      path.join(__dirname, "promiseCompletes.txt")
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "promiseCompletes.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (err) {
    console.error(err);
  }
};

fileOps();

console.log("hello world");

// we don't need to specify 'utf-8' in case of write because its by default.

// this is kind of callback hell:

/*fs.writeFile(
  path.join(__dirname, "write.txt"),
  "i am writing into the file",
  (err) => {
    if (err) throw err;
    console.log("writing into file");

    fs.appendFile(
      path.join(__dirname, "write.txt"),
      "\n i am appending in write.txt file",
      (err) => {
        if (err) throw err;
        console.log("data appended");

        fs.rename(
          path.join(__dirname, "write.txt"),
          path.join(__dirname, "newWrite.txt"),
          (err) => {
            if (err) throw err;
            console.log("file renamed");
          }
        );
      }
    );
  }
);*/

// if the file doesn't exist in appendFile method it will create the file.

// readFile or methods from node in general are async in nature

//exit on uncaught error

process.on("uncaughtException", (err) => {
  console.error(`there was an uncaught error: ${err}`);
  process.exit(1);
});
