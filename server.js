const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  server.listen(PORT, () => console.log(`server running at ${PORT}`));

  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  // let filePath;

  // switch(req.url){
  //   case'/':
  //       res.statusCode = 200
  //       filePath = path.join(__dirname, 'views', 'index.html')
  //       fs.readFile(path, 'utf8', (err,data) => {
  //         res.end(data)
  //       })
  //       break;
  // }
});

server.listen(PORT, () => console.log(`server running on port: ${PORT}`));

// myEmitter.on("log", (msg) => logEvents(msg));

// myEmitter.emit("log", "log event emitted!!");
