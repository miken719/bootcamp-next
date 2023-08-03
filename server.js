const next = require("next");

const app = next({ dev: process.env.NODE_ENV !== "production" });
const { join } = require("path");
const compression = require("compression");
const express = require("express");
const expressJSServer = express();
expressJSServer.disable("x-powered-by");

const http = require("http");
const https = require("https");

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;

app.prepare().then(() => {
  expressJSServer.use(
    "/robots.txt",
    express.static(join(__dirname, "/robots.txt"))
  );
  expressJSServer.use(
    "/sitemap.xml",
    express.static(join(__dirname, "/sitemap.xml"))
  );

  expressJSServer.use(compression({ level: 9 }));
  console.log("Server running on port->", 3000);
  expressJSServer.listen(3000);
});
