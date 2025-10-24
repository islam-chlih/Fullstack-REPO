function parseBool(val) {
  if (val === undefined) return null;
  if (["true", "1"].includes(val)) return true;
  if (["false", "0"].includes(val)) return false;
  throw { code: 400, message: `Invalid boolean value: ${val}` }; 
}

exports.parseProductQuery = (params) => {
  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");
  const page = parseInt(params.get("page") || "1", 10);
  const limit = parseInt(params.get("limit") || "10", 10);

  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice))
    throw { code: 400, message: "minPrice must be <= maxPrice" };

  return {
    q: params.get("q") || null,
    category: params.get("category") || null,
    minPrice: minPrice ? Number(minPrice) : null,
    maxPrice: maxPrice ? Number(maxPrice) : null,
    inStock: parseBool(params.get("inStock")),
    page,
    limit,
  };
};

exports.parseOrderQuery = (params) => {
  const from = params.get("from");
  const to = params.get("to");
  const page = parseInt(params.get("page") || "1", 10);
  const limit = parseInt(params.get("limit") || "10", 10);

  if (from && to && new Date(from) > new Date(to))
    throw { code: 400, message: "Invalid date range" };

  return {
    status: params.get("status") || null,
    from,
    to,
    page,
    limit,
  };
};