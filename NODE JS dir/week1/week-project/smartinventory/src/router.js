const { handleProducts, handleSingleProduct, handleProductBySku } = require("./controllers/productsController"); //importer 3 functions from products controller
const { handleOrders, handleSingleOrder, handleOrderByNumber } = require("./controllers/orderController");// importer 3 functions from orders controller
const { sendJson } = require("./utils/sendJson");// importer from the file sendjson
const logger = require("./utils/logger");

exports.handle = (req, res, parsedUrl) => { // on exporte une fonction handle qui sera appelée pour chaque requête.
  const { pathname } = parsedUrl; //extrait la partie chemin (ex. /api/products/12) pour faciliter les tests de routes.

  // Produits
  if (req.method === "GET" && pathname === "/api/products") return handleProducts(req, res, parsedUrl);
  if (req.method === "GET" && /^\/api\/products\/sku\/[^/]+$/.test(pathname))
    return handleProductBySku(req, res, pathname.split("/").pop());
  if (req.method === "GET" && /^\/api\/products\/\d+$/.test(pathname))
    return handleSingleProduct(req, res, Number(pathname.split("/").pop()));

  // Commandes
  if (req.method === "GET" && pathname === "/api/orders") return handleOrders(req, res, parsedUrl);
  if (req.method === "GET" && /^\/api\/orders\/number\/[^/]+$/.test(pathname)) //[^/]+ au moins un caractère qui n’est pas /
    return handleOrderByNumber(req, res, pathname.split("/").pop());
  if (req.method === "GET" && /^\/api\/orders\/\d+$/.test(pathname)) //\d+ signifie un ou plusieurs chiffres.
    return handleSingleOrder(req, res, Number(pathname.split("/").pop()));

  // Santé
  if (req.method === "GET" && pathname === "/health") {
    return sendJson(res, 200, { // renvoie le JSON avec code HTTP 200 OK
      status: "ok",
      uptime: process.uptime(), //nombre de secondes depuis le démarrage du processus Node
      timestamp: new Date().toISOString(),
    });
  }

  // 404
  sendJson(res, 404, { error: "Not Found" });//Cas par défaut — 404 Not Found
  logger.emit("response:sent", { statusCode: 404, route: pathname });
};
//it decides which controller function should handle each incoming HTTP request (based on the URL and HTTP method).





  

