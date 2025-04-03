const { db } = require("../config");

const createTransaction = async (transaction) => {
  const {
    description,
    value,
    action,
    userId,
    saleId,
    paymentId,
    recurrenceId,
  } = transaction;
  const response = await db.query(
    "INSERT INTO financial_transactions (description, value, action, user_id, sale_id, payment_id, recurrence_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *",
    [description, value, action, userId, saleId, paymentId, recurrenceId]
  );
  return response.rows[0];
};

const getTransactionById = async (id) => {
  const response = await db.query(
    "SELECT * FROM financial_transactions WHERE id = $1",
    [id]
  );
  return response.rows[0];
};

const listTransactions = async () => {
  const response = await db.query("SELECT * FROM financial_transactions");
  return response.rows;
};

const updateTransaction = async (id, transaction) => {
  const { description, value, action } = transaction;
  const response = await db.query(
    "UPDATE financial_transactions SET description = $1, value = $2, action = $3, updated_at = NOW() WHERE id = $4 RETURNING *",
    [description, value, action, id]
  );
  return response.rows[0];
};

const deleteTransaction = async (id) => {
  const response = await db.query(
    "DELETE FROM financial_transactions WHERE id = $1 RETURNING *",
    [id]
  );
  return response.rows[0];
};

module.exports = {
  createTransaction,
  getTransactionById,
  listTransactions,
  updateTransaction,
  deleteTransaction,
};
