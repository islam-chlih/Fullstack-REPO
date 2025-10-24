const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../../data/products.json");

let cache = null;

function readData() {
  if (!cache) {
    const content = fs.readFileSync(dataPath, "utf-8");
    cache = JSON.parse(content);
  }
  return cache;
}

exports.getProducts = ({ q, category, minPrice, maxPrice, inStock, page, limit }) => {
  let items = readData();

  if (q) items = items.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
  if (category) items = items.filter(p => p.category === category);
  if (minPrice != null) items = items.filter(p => p.price >= minPrice);
  if (maxPrice != null) items = items.filter(p => p.price <= maxPrice);
  if (inStock != null) items = items.filter(p => p.inStock === inStock);

  const total = items.length;
  const pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginated = items.slice(start, start + limit);

  return { total, page, pages, items: paginated };
};

exports.getProductById = (id) => readData().find(p => p.id === id);
exports.getProductBySku = (sku) => readData().find(p => p.sku === sku);