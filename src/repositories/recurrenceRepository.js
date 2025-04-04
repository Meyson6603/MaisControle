const { db } = require("../config");

const createRecurrence = async (recurrence) => {
  const { dueDay, value, description, type, nextDueDate } = recurrence;
  const response = await db.query(
    "INSERT INTO recurrences (due_day, value, description, type, next_due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [dueDay, value, description, type, nextDueDate]
  );
  return response.rows[0];
};

const getRecurrenceById = async (id) => {
  const response = await db.query("SELECT * FROM recurrences WHERE id = $1", [
    id,
  ]);
  return response.rows[0];
};

const listRecurrences = async () => {
  const response = await db.query("SELECT * FROM recurrences");
  return response.rows;
};

const updateRecurrence = async (id, recurrence) => {
  const { dueDay, value, description, type, nextDueDate } = recurrence;
  const response = await db.query(
    "UPDATE recurrences SET due_day = $1, value = $2, description = $3, type = $4, next_due_date = $5, updated_at = NOW() WHERE id = $6 RETURNING *",
    [dueDay, value, description, type, nextDueDate, id]
  );
  return response.rows[0];
};

const deleteRecurrence = async (id) => {
  const response = await db.query(
    "DELETE FROM recurrences WHERE id = $1 RETURNING *",
    [id]
  );
  return response.rows[0];
};

// Função para obter contas a pagar associadas a recorrências e com status 'pending'
const getPendingRecurringPayments = async () => {
  const response = await db.query(
    `SELECT p.* FROM payments p
     JOIN recurrences r ON p.recurrence_id = r.id
     WHERE p.status = 'pending'`
  );
  return response.rows;
};

// Função para calcular o total das contas a pagar associadas a recorrências
const getTotalPendingRecurringPayments = async () => {
  const response = await db.query(
    `SELECT SUM(p.value) AS total FROM payments p
     JOIN recurrences r ON p.recurrence_id = r.id
     WHERE p.status = 'pending'`
  );
  return response.rows[0].total;
};

// Função para obter todas as recorrências com pagamentos pendentes
const getPendingRecurrences = async () => {
  const response = await db.query(
    `SELECT r.*, p.value AS payment_value, p.status FROM recurrences r
     JOIN payments p ON r.id = p.recurrence_id
     WHERE p.status = 'pending'`
  );
  return response.rows;
};

// Função para obter recorrências pendentes com base no próximo vencimento
const getPendingRecurrencesByDate = async (date) => {
  const response = await db.query(
    `SELECT r.*, p.value AS payment_value, p.status FROM recurrences r
     JOIN payments p ON r.id = p.recurrence_id
     WHERE p.status = 'pending' AND r.next_due_date = $1`,
    [date]
  );
  return response.rows;
};

module.exports = {
  createRecurrence,
  getRecurrenceById,
  listRecurrences,
  updateRecurrence,
  deleteRecurrence,
  getPendingRecurringPayments,
  getTotalPendingRecurringPayments,
  getPendingRecurrences,
  getPendingRecurrencesByDate,
};
