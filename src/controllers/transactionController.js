const transactionService = require("../services/transactionService.js");

const createTransaction = async (req, res, next) => {
  try {
    const transaction = req.body;
    const newTransaction = await transactionService.createTransaction(
      transaction
    );
    res.status(201).json(newTransaction);
  } catch (error) {
    next(error);
  }
};

const getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await transactionService.getTransactionById(id);
    res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

const listTransactions = async (req, res, next) => {
  try {
    const transactions = await transactionService.listTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = req.body;
    const updated = await transactionService.updateTransaction(id, transaction);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    await transactionService.deleteTransaction(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const getMonthlyRevenue = async (req, res, next) => {
  try {
    const revenue = await transactionService.getMonthlyRevenue();
    res.status(200).json({ revenue });
  } catch (error) {
    next(error);
  }
};

const getMonthlyExpenses = async (req, res, next) => {
  try {
    const expenses = await transactionService.getMonthlyExpenses();
    res.status(200).json({ expenses });
  } catch (error) {
    next(error);
  }
};

const getOverallBalance = async (req, res, next) => {
  try {
    const balance = await transactionService.getOverallBalance();
    res.status(200).json({ balance });
  } catch (error) {
    next(error);
  }
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
