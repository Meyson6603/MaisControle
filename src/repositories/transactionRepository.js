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

//Calcula a soma total das receitas (entradas de dinheiro) no mês atual.
const getMonthlyRevenue = async () => {
  const response = await db.query(
    `SELECT SUM(value) AS monthly_revenue
     FROM transactions
     WHERE action = 'income'
     AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
     AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)`
  );
  return response.rows[0]?.monthly_revenue || 0;
};

//Calcula a soma total das despesas (saídas de dinheiro) no mês atual.
const getMonthlyExpenses = async () => {
  const response = await db.query(
    `SELECT SUM(value) AS monthly_expenses
     FROM transactions
     WHERE action = 'expense'
     AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
     AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)`
  );
  return response.rows[0]?.monthly_expenses || 0;
};

//Chama as funções getMonthlyRevenue() e getMonthlyExpenses() para obter os valores de receitas e despesas do mês. Calcula o saldo geral, subtraindo despesas de receitas.
const getOverallBalance = async () => {
  const revenue = await getMonthlyRevenue();
  const expenses = await getMonthlyExpenses();
  const overallBalance = revenue - expenses;

  return overallBalance;
};

module.exports = {
  createTransaction,
  getTransactionById,
  listTransactions,
  updateTransaction,
  deleteTransaction,
  getMonthlyRevenue,
  getMonthlyExpenses,
  getOverallBalance,
};
