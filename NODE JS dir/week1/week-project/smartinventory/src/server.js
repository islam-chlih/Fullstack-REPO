const http = require("http");
const { URL } = require("url");
const dotenv = require("dotenv");
const router = require("./router");
const logger = require("./utils/logger");

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`); // Corrected line
  logger.emit("request:received", { method: req.method, url: parsedUrl.pathname });

  router.handle(req, res, parsedUrl);
});

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`); // Also corrected this console.log for consistency and best practice
});