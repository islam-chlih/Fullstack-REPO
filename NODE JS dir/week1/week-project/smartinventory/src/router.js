const { handleProducts, handleSingleProduct, handleProductBySku } = require("./controllers/productsController");
const { handleOrders, handleSingleOrder, handleOrderByNumber } = require("./controllers/orderController");
const { sendJson } = require("./utils/sendJson");
const logger = require("./utils/logger");

exports.handle = (req, res, parsedUrl) => {
  const { pathname } = parsedUrl;

  // Produits
  if (req.method === "GET" && pathname === "/api/products") return handleProducts(req, res, parsedUrl);
  if (req.method === "GET" && /^\/api\/products\/sku\/[^/]+$/.test(pathname))
    return handleProductBySku(req, res, pathname.split("/").pop());
  if (req.method === "GET" && /^\/api\/products\/\d+$/.test(pathname))
    return handleSingleProduct(req, res, Number(pathname.split("/").pop()));

  // Commandes
  if (req.method === "GET" && pathname === "/api/orders") return handleOrders(req, res, parsedUrl);
  if (req.method === "GET" && /^\/api\/orders\/number\/[^/]+$/.test(pathname))
    return handleOrderByNumber(req, res, pathname.split("/").pop());
  if (req.method === "GET" && /^\/api\/orders\/\d+$/.test(pathname))
    return handleSingleOrder(req, res, Number(pathname.split("/").pop()));

  // Santé
  if (req.method === "GET" && pathname === "/health") {
    return sendJson(res, 200, {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  }

  // 404
  sendJson(res, 404, { error: "Not Found" });
  logger.emit("response:sent", { statusCode: 404, route: pathname });
};