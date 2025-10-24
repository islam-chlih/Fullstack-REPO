const { getProducts, getProductById, getProductBySku } = require("../services/productsService");
const { sendJson } = require("../utils/sendJson");
const { parseProductQuery } = require("../utils/parseQuery");
const logger = require("../utils/logger");

exports.handleProducts = (req, res, parsedUrl) => {
  try {
    const filters = parseProductQuery(parsedUrl.searchParams);
    const result = getProducts(filters);
    sendJson(res, 200, result);
    logger.emit("response:sent", { statusCode: 200, route: "/api/products" });
  } catch (err) {
    sendJson(res, err.code || 500, { error: err.message });
  }
};

exports.handleSingleProduct = (req, res, id) => {
  const product = getProductById(id);
  if (!product) return sendJson(res, 404, { error: "Product not found" });
  sendJson(res, 200, product);
};

exports.handleProductBySku = (req, res, sku) => {
  const product = getProductBySku(sku);
  if (!product) return sendJson(res, 404, { error: "Product not found" });
  sendJson(res, 200, product);
};