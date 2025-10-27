const http = require("http"); // import http modules for handling http requests and responses and for creating servers
const { URL } = require("url");// import url modules
const dotenv = require("dotenv");// install dotenv package pour démarrer le fichier .env / load environement variables from .env
const router = require("./router");// importer modules de le fichier local router.js
const logger = require("./utils/logger");// import le ficier local aussi logger.js

dotenv.config();//library that reads a .env file in my project

const PORT = process.env.PORT || 3000;// Set port from .env or default to 3000

const server = http.createServer((req, res) => {// http module calls the createServer() method to create an instance for a server 
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`); // it becomes a object splits into pathname&searchparam to make it easier to read
  logger.emit("request:received", { method: req.method, url: parsedUrl.pathname });// it becomes a object splits into pathname&searchparam to make it easier to read

  router.handle(req, res, parsedUrl); // it's like saying hey router here's the req,res,parseUrl and figure out what to do with it 
});

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`); //start my server when it's ready in this port... 300 par exmpl
});
