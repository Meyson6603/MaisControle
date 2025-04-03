const { db } = require("../config");

const createRecurrence = async (recurrence) => {
  const { due_day, value, description, type, next_due_date } = recurrence;
  const response = await db.query(
    "INSERT INTO recurrences (due_day, value, description, type, next_due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [due_day, value, description, type, next_due_date]
  );
  return response.rows[0];
};

module.exports = {
  createRecurrence,
};
