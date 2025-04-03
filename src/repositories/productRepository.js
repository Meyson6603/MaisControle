const { db } = require("../config");

const createProduct = async (product) => {
  const {
    name,
    description,
    price,
    production_cost,
    quantity,
    minimum_level,
    category_id,
    user_id,
  } = product;
  const response = await db.query(
    "INSERT INTO products (name, description, price, production_cost, quantity, minimum_level, category_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [
      name,
      description,
      price,
      production_cost,
      quantity,
      minimum_level,
      category_id,
      user_id,
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

const updateProduct = async (id, product) => {
  const {
    name,
    description,
    price,
    production_cost,
    quantity,
    minimum_level,
    category_id,
    user_id,
  } = product;
  const response = await db.query(
    "UPDATE products SET name = $1, description = $2, price = $3, production_cost = $4, quantity = $5, minimum_level = $6, category_id = $7, user_id = $8, updated_at = CURRENT_TIMESTAMP WHERE id = $9 RETURNING *",
    [
      name,
      description,
      price,
      production_cost,
      quantity,
      minimum_level,
      category_id,
      user_id,
      id,
    ]
  );
  return response.rows[0];
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
