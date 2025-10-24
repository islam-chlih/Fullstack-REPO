const { getOrders, getOrderById, getOrderByNumber } = require("../services/ordersServices");
const { sendJson } = require("../utils/sendJson");
const { parseOrderQuery } = require("../utils/parseQuery");
const logger = require("../utils/logger");

exports.handleOrders = (req, res, parsedUrl) => {
  try {
    const filters = parseOrderQuery(parsedUrl.searchParams);
    const result = getOrders(filters);
    sendJson(res, 200, result);
    logger.emit("response:sent", { statusCode: 200, route: "/api/orders" });
  } catch (err) {
    sendJson(res, err.code || 500, { error: err.message });
  }
};

exports.handleSingleOrder = (req, res, id) => {
  const order = getOrderById(id);
  if (!order) return sendJson(res, 404, { error: "Order not found" });
  sendJson(res, 200, order);
};

exports.handleOrderByNumber = (req, res, orderNumber) => {
  const order = getOrderByNumber(orderNumber);
  if (!order) return sendJson(res, 404, { error: "Order not found" });
  sendJson(res, 200, order);
};