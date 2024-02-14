const http = require("node:http");
const fs = require("fs");

const getFile = (requestURL) => {
  var page_to_serve;
  try {
    const data = fs.readFileSync(requestURL, "utf8");
    page_to_serve = data;
  } catch (err) {
    console.log("There was an Error fetching the page: ", err);
  }
  return page_to_serve;
};

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  console.log("request received for page: ", req.url);
  var page_to_serve;
  switch (req.url) {
    case "/":
      page_to_serve = getFile("index.html");
      break;
    case "/about":
      page_to_serve = getFile("about.html");
      break;
    case "/contact-me":
      page_to_serve = getFile("contact-me.html");
      break;
    default:
      page_to_serve = getFile("404.html");
  }

  console.log("The page to be served is going to be: ", page_to_serve);
  res.end(page_to_serve);
});

server.listen(8080);
