const { db } = require("../config");

const createProduct = async (product) => {
  const {
    name,
    observation = "",
    price,
    production_cost = 0,
    quantity = 0,
    minimum_level = 0,
    maximum_level = 0,
    category_id,
    user_id,
    expiry_date,
    sku,
    profitCost,
    profitCostType,
  } = product;

  const profit_cost = parseFloat(profitCost) || 0;
  const profit_cost_type = profitCostType || "Lucro";

  const response = await db.query(
    `INSERT INTO products 
      (name, description, price, production_cost, quantity, minimum_level, maximum_level, category_id, 
      user_id, expiry_date, sku, profit_cost, profit_cost_type) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
      RETURNING *`,
    [
      name,
      observation,
      price,
      production_cost,
      quantity,
      minimum_level,
      maximum_level,
      category_id,
      user_id,
      expiry_date,
      sku,
      profit_cost,
      profit_cost_type,
    ]
  );
  return response.rows[0];
};

const updateProduct = async (id, product) => {
  const {
    name,
    observation = "",
    price,
    production_cost = 0,
    quantity = 0,
    minimum_level = 0,
    maximum_level = 0,
    category_id,
    user_id,
    expiry_date,
    sku,
    profitCost,
    profitCostType,
  } = product;

  const profit_cost = parseFloat(profitCost) || 0;
  const profit_cost_type = profitCostType || "Lucro";

  const response = await db.query(
    `UPDATE products SET 
      name = $1, description = $2, price = $3, production_cost = $4, quantity = $5, 
      minimum_level = $6, maximum_level = $7, category_id = $8, user_id = $9, 
      expiry_date = $10, sku = $11, profit_cost = $12, profit_cost_type = $13, 
      updated_at = CURRENT_TIMESTAMP 
      WHERE id = $14 RETURNING *`,
    [
      name,
      observation,
      price,
      production_cost,
      quantity,
      minimum_level,
      maximum_level,
      category_id,
      user_id,
      expiry_date,
      sku,
      profit_cost,
      profit_cost_type,
      id,
    ]
  );
  return response.rows[0];
};

const getProductById = async (id) => {
  const response = await db.query("SELECT * FROM products WHERE id = $1", [id]);
  return response.rows[0];
};

const listProducts = async () => {
  const response = await db.query("SELECT * FROM products");
  return response.rows;
};

const deleteProduct = async (id) => {
  const response = await db.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id]
  );
  return response.rows[0];
};

const findByQuery = async (params, limit = 10, offset = 0) => {
  const queryConditions = [];
  const queryValues = [];
  let queryString = "SELECT * FROM products";

  Object.entries(params).forEach(([key, value], index) => {
    queryConditions.push(`${key} ILIKE $${index + 1}`);
    queryValues.push(`%${value}%`);
  });

  if (queryConditions.length) {
    queryString += ` WHERE ${queryConditions.join(" AND ")}`;
  }

  queryString += ` LIMIT $${queryValues.length + 1} OFFSET $${
    queryValues.length + 2
  }`;
  queryValues.push(limit, offset);

  const response = await db.query(queryString, queryValues);
  return response.rows;
};

module.exports = {
  createProduct,
  getProductById,
  listProducts,
  updateProduct,
  deleteProduct,
  findByQuery,
};
