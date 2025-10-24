const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../../data/orders.json");

let cache = null;

function readData() {
  if (!cache) {
    const content = fs.readFileSync(dataPath, "utf-8");
    cache = JSON.parse(content);
  }
  return cache;
}

exports.getOrders = ({ status, from, to, page, limit }) => {
  let items = readData();

  if (status) items = items.filter(o => o.status === status);
  if (from) items = items.filter(o => new Date(o.orderDate) >= new Date(from));
if (to) items = items.filter(o => new Date(o.orderDate) <= new Date(to));


  const total = items.length;
  const pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginated = items.slice(start, start + limit);

  return { total, page, pages, items: paginated };
};

exports.getOrderById = (id) => readData().find(o => o.orderId === id);
exports.getOrderByNumber = (num) => readData().find(o => o.orderId === num);