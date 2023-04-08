const fs = require("fs");
const path = require("path");

//instead of hardcoding this we can use path module
// fs.readFile("./starter.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

fs.readFile(path.join(__dirname, "starter.txt"), "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log("hello world");

// we don't need to specify 'utf-8' in case of write because its by default.

// this is kind of callback hell:

fs.writeFile(
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
);

// if the file doesn't exist in appendFile method it will create the file.

// readFile or methods from node in general are async in nature

//exit on uncaught error

process.on("uncaughtException", (err) => {
  console.error(`there was an uncaught error: ${err}`);
  process.exit(1);
});
