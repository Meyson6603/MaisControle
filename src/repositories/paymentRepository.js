const { db } = require("../config");

const createPayment = async (payment) => {
  const { value, due_date, payment_method, sale_id } = payment;
  const response = await db.query(
    "INSERT INTO payments (value, due_date, payment_method, sale_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [value, due_date, payment_method, sale_id]
  );
  return response.rows[0];
};

const getPaymentById = async (id) => {
  const response = await db.query("SELECT * FROM payments WHERE id = $1", [id]);
  return response.rows[0];
};

const listPayments = async () => {
  const response = await db.query("SELECT * FROM payments");
  return response.rows;
};

const updatePayment = async (id, payment) => {
  const { value, due_date, payment_method, status, sale_id } = payment;
  const response = await db.query(
    "UPDATE payments SET value = $1, due_date = $2, payment_method = $3, status = $4, sale_id = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *",
    [value, due_date, payment_method, status, sale_id, id]
  );
  return response.rows[0];
};

const deletePayment = async (id) => {
  const response = await db.query(
    "DELETE FROM payments WHERE id = $1 RETURNING *",
    [id]
  );
  return response.rows[0];
};

const updatePaymentStatus = async (paymentId, status) => {
  const response = await db.query(
    "UPDATE payments SET status = $1 WHERE id = $2 RETURNING *",
    [status, paymentId]
  );
  return response.rows[0];
};

// Função para obter as contas a pagar (faturas pendentes)
const getContasAPagar = async () => {
  const response = await db.query(
    "SELECT * FROM payments WHERE status = 'pending'"
  );

  return response.rows; // Retorna as contas a pagar (faturas pendentes)
};

// Função para calcular o total das contas a pagar
const getTotalContasAPagar = async () => {
  const response = await db.query(
    "SELECT SUM(value) as total FROM payments WHERE status = 'pending'"
  );

  return response.rows[0].total; // Retorna o total das contas a pagar
};

module.exports = {
  createPayment,
  getPaymentById,
  listPayments,
  updatePayment,
  deletePayment,
  updatePaymentStatus,
  getContasAPagar,
  getTotalContasAPagar,
};
