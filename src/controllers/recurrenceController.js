const recurrenceService = require("../services/recurrenceService.js");

const createRecurrence = async (req, res, next) => {
  try {
    const result = await recurrenceService.createRecurrence(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const getRecurrence = async (req, res, next) => {
  try {
    const result = await recurrenceService.getRecurrenceById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const listRecurrences = async (req, res, next) => {
  try {
    const result = await recurrenceService.listRecurrences();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const updateRecurrence = async (req, res, next) => {
  try {
    const result = await recurrenceService.updateRecurrence(
      req.params.id,
      req.body
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const deleteRecurrence = async (req, res, next) => {
  try {
    const result = await recurrenceService.deleteRecurrence(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getPendingRecurringPayments = async (req, res, next) => {
  try {
    const result = await recurrenceService.getPendingRecurringPayments();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getTotalPendingRecurringPayments = async (req, res, next) => {
  try {
    const result = await recurrenceService.getTotalPendingRecurringPayments();
    res.json({ total: result });
  } catch (err) {
    next(err);
  }
};

const getPendingRecurrences = async (req, res, next) => {
  try {
    const result = await recurrenceService.getPendingRecurrences();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getPendingRecurrencesByDate = async (req, res, next) => {
  try {
    const { date } = req.query;
    const result = await recurrenceService.getPendingRecurrencesByDate(date);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRecurrence,
  getRecurrence,
  listRecurrences,
  updateRecurrence,
  deleteRecurrence,
  getPendingRecurringPayments,
  getTotalPendingRecurringPayments,
  getPendingRecurrences,
  getPendingRecurrencesByDate,
};
