const { db } = require("../config");

const createCategory = async (category) => {
  const { name } = category;
  const response = await db.query(
    "INSERT INTO categories (name) VALUES ($1) RETURNING *",
    [name]
  );
  return response.rows[0];
};

const getCategoryById = async (id) => {
  const response = await db.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);
  return response.rows[0];
};

const listCategories = async () => {
  const response = await db.query("SELECT * FROM categories");
  return response.rows;
};

const updateCategory = async (id, category) => {
  const { name } = category;
  const response = await db.query(
    "UPDATE categories SET name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
    [name, id]
  );
  return response.rows[0];
};

const deleteCategory = async (id) => {
  const response = await db.query(
    "DELETE FROM categories WHERE id = $1 RETURNING *",
    [id]
  );
  return response.rows[0];
};

module.exports = {
  createCategory,
  getCategoryById,
  listCategories,
  updateCategory,
  deleteCategory,
};
