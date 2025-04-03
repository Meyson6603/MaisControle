const { db } = require("../config");

const createStockMovement = async (movement) => {
  const { note, action, type, quantity, userId, productId, saleId } = movement;
  const response = await db.query(
    "INSERT INTO stock_movements (note, action, type, quantity, user_id, product_id, sale_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *",
    [note, action, type, quantity, userId, productId, saleId]
  );
  return response.rows[0];
};

module.exports = {
  createStockMovement,
};
