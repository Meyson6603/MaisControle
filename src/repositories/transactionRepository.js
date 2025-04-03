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
    "INSERT INTO transactions (description, value, action, user_id, sale_id, payment_id, recurrence_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *",
    [description, value, action, userId, saleId, paymentId, recurrenceId]
  );
  return response.rows[0];
};

const getTransactionById = async (id) => {
  const response = await db.query("SELECT * FROM transaction WHERE id = $1", [
    id,
  ]);
  return response.rows[0];
};

const listTransactions = async () => {
  const response = await db.query("SELECT * FROM transaction");
  return response.rows;
};

const updateTransaction = async (id, transaction) => {
  const { description, value, action } = transaction;
  const response = await db.query(
    "UPDATE transactions SET description = $1, value = $2, action = $3, updated_at = NOW() WHERE id = $4 RETURNING *",
    [description, value, action, id]
  );
  return response.rows[0];
};

const deleteTransaction = async (id) => {
  const response = await db.query(
    "DELETE FROM transactions WHERE id = $1 RETURNING *",
    [id]
  );
  return response.rows[0];
};

const getReceitaMensal = async () => {
  const response = await db.query(
    `SELECT SUM(value) AS receita_mensal
     FROM transactions  -- Alterado para o nome correto da tabela
     WHERE action = 'income'
     AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
     AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)`
  );
  return response.rows[0]?.receita_mensal || 0;
};

const getDespesaMensal = async () => {
  const response = await db.query(
    `SELECT SUM(value) AS despesa_mensal
     FROM transactions
     WHERE action = 'expense'
     AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
     AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)`
  );
  return response.rows[0]?.despesa_mensal || 0;
};

const getSaldoGeral = async () => {
  const receita = await getReceitaMensal();
  const despesa = await getDespesaMensal();
  const saldoGeral = receita - despesa;

  return saldoGeral;
};

module.exports = {
  createTransaction,
  getTransactionById,
  listTransactions,
  updateTransaction,
  deleteTransaction,
  getReceitaMensal,
  getDespesaMensal,
  getSaldoGeral,
};
