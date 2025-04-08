const transactionRepository = require("../repositories/transactionRepository.js");

const createTransaction = async (transaction) => {
  const { description, value, action, userId } = transaction;

  if (!description || !value || !action || !userId) {
    throw new Error("Descrição, valor, ação e ID do usuário são obrigatórios.");
  }

  return await transactionRepository.createTransaction(transaction);
};

const getTransactionById = async (id) => {
  if (!id) throw new Error("ID da transação é obrigatório.");
  return await transactionRepository.getTransactionById(id);
};

const listTransactions = async () => {
  return await transactionRepository.listTransactions();
};

const updateTransaction = async (id, transaction) => {
  if (!id) throw new Error("ID da transação é obrigatório.");
  return await transactionRepository.updateTransaction(id, transaction);
};

const deleteTransaction = async (id) => {
  if (!id) throw new Error("ID da transação é obrigatório.");
  return await transactionRepository.deleteTransaction(id);
};

const getMonthlyRevenue = async () => {
  return await transactionRepository.getMonthlyRevenue();
};

const getMonthlyExpenses = async () => {
  return await transactionRepository.getMonthlyExpenses();
};

const getOverallBalance = async () => {
  return await transactionRepository.getOverallBalance();
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
