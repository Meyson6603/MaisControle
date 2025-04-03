const { db } = require("../config");

const createSaleProduct = async (saleProduct) => {
  const { sale_id, product_id, quantity } = saleProduct;
  const response = await db.query(
    "INSERT INTO sale_products (sale_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
    [sale_id, product_id, quantity]
  );
  return response.rows[0];
};

const getProductsBySale = async (saleId) => {
  const response = await db.query(
    "SELECT * FROM sale_products WHERE sale_id = $1",
    [saleId]
  );
  return response.rows;
};

const deleteSaleProduct = async (saleProductId) => {
  const response = await db.query(
    "DELETE FROM sale_products WHERE id = $1 RETURNING *",
    [saleProductId]
  );
  return response.rows[0];
};

module.exports = {
  createSaleProduct,
  getProductsBySale,
  deleteSaleProduct,
};
