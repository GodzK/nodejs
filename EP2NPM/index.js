const http = require("http");
const path = require("path");
const fs = require("fs");
const fspromise = require("fs").promises;
const logevent = require("./logEvent");
const EventEmitter = require("events");

class Emitter extends EventEmitter {}
const myEmitter = new Emitter();
myEmitter.on("log", (msg, fileName) => logevent(msg, fileName));
const PORT = process.env.PORT || 3500;

const servefile = async (filePath, contentType, response) => {
  try {
    const data = await fspromise.readFile(filePath, 'utf8');
    response.writeHead(filePath.includes('404.html') ? 400 : 200, { 'Content-Type': contentType });
    response.end(
      contentType === 'application/json' ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    myEmitter.emit("log", `${err.name}\t${err.message}`, 'errLog.txt');
    response.statusCode = 500;
    response.end();
  }
}

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEmitter.emit("log", `${req.url}\t${req.method}`, 'reqLog.txt');
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
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case "txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath = contentType === "text/html" && req.url === "/"
    ? path.join(__dirname, "view", "index.html")
    : contentType === "text/html" && req.url.slice(-1) === "/"
    ? path.join(__dirname, "views", req.url, "index.html")
    : contentType === "text/html"
    ? path.join(__dirname, "views", req.url)
    : path.join(__dirname, req.url);

  if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

  const fileExists = fs.existsSync(filePath);

  if (!fileExists) {
    switch (path.parse(filePath).base) {
      case 'new-page.html':
        res.writeHead(301, { "Location": '/new-page.html' });
        res.end();
        break;

      case 'www-page.html':
        res.writeHead(301, { "Location": '/old-page.html' });
        res.end();
        break;

      default:
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
  }
});

server.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
