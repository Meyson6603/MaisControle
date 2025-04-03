const { db } = require("../config");

const createSale = async (sale) => {
  const {
    userId,
    total,
    status,
    saleType,
    installments,
    customerName,
    customerContact,
  } = sale;
  const response = await db.query(
    "INSERT INTO sales (user_id, total, status, sale_type, installments, customer_name, customer_contact, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *",
    [
      userId,
      total,
      status,
      saleType,
      installments,
      customerName,
      customerContact,
    ]
  );
  return response.rows[0];
};

const getSaleById = async (id) => {
  const response = await db.query("SELECT * FROM sales WHERE id = $1", [id]);
  return response.rows[0];
};

const listSales = async () => {
  const response = await db.query("SELECT * FROM sales");
  return response.rows;
};

const updateSale = async (id, sale) => {
  const {
    userId,
    total,
    status,
    saleType,
    installments,
    customerName,
    customerContact,
  } = sale;
  const response = await db.query(
    "UPDATE sales SET user_id = $1, total = $2, status = $3, sale_type = $4, installments = $5, customer_name = $6, customer_contact = $7, updated_at = NOW() WHERE id = $8 RETURNING *",
    [
      userId,
      total,
      status,
      saleType,
      installments,
      customerName,
      customerContact,
      id,
    ]
  );
  return response.rows[0];
};

const deleteSale = async (id) => {
  const response = await db.query(
    "DELETE FROM sales WHERE id = $1 RETURNING *",
    [id]
  );
  return response.rows[0];
};

module.exports = {
  createSale,
  getSaleById,
  listSales,
  updateSale,
  deleteSale,
};
