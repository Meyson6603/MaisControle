const recurrenceRepository = require("../repositories/recurrenceRepository.js");

const createRecurrence = async (recurrence) => {
  return await recurrenceRepository.createRecurrence(recurrence);
};

const getRecurrenceById = async (id) => {
  return await recurrenceRepository.getRecurrenceById(id);
};

const listRecurrences = async () => {
  return await recurrenceRepository.listRecurrences();
};

const updateRecurrence = async (id, recurrence) => {
  return await recurrenceRepository.updateRecurrence(id, recurrence);
};

const deleteRecurrence = async (id) => {
  return await recurrenceRepository.deleteRecurrence(id);
};

const getPendingRecurringPayments = async () => {
  return await recurrenceRepository.getPendingRecurringPayments();
};

const getTotalPendingRecurringPayments = async () => {
  return await recurrenceRepository.getTotalPendingRecurringPayments();
};

const getPendingRecurrences = async () => {
  return await recurrenceRepository.getPendingRecurrences();
};

const getPendingRecurrencesByDate = async (date) => {
  return await recurrenceRepository.getPendingRecurrencesByDate(date);
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
