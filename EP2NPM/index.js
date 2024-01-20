const http = require("http");
const path = require("path");
const fs = require("fs");
const fspromise = require("fs").promises;
const logevent = require("./logEvent");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3500;
// hosting on port 3500;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  // ต้องเขียน
  const extension = path.extname(req.url);
  // path extnameเพื่อเอาextension

  let contentType;
  // we expect to get
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
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    default:
    case "txt":
      contentType = "text/plain";
      break;
      dafault: contentType = "text/html";
  }

  let filePath =
  // contentType = "condition"
  // path.join = "result"
    contentType === "text/html" && req.url === "/"
    // then this is the value vv
      ? path.join(__dirname, "view", "index.html")
      // if it html then if the last charactor is"/" that is not a main directory มันจะเอา req.urlมาด้วย
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      // ถ้าไม่ใช่อีกมันอาจจะเป็นcss imageก็ได้
      : path.join(__dirname, req.url);

    if (!extension && req.url.slice(-1)!== '/') filePath += '.html'
});

server.listen(PORT, () => console.log(`Server Running on port ${PORT}`));

// myEmitter.on("log", (msg) => logevent(msg));
// setTimeout(() => {
//   myEmitter.emit("log", "log emitted!");
// }, 2000);
