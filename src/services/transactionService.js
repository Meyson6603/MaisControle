const transactionRepository = require('../repositories/transition');
const AppError = require('../utils/AppError');

const createTransaction = async (transaction) => {
    const { description, amount, id_user, price, date, type, category, observation } = transaction;
    if (!description || !amount || !id_user || !price || !date || !type || !category || !observation) {
        throw new AppError('description, amount, id_user, price, date, type, category and observation are required', 400);
    }
    return transactionRepository.CreateTrasition(transaction);
}

const listTransactions = async () => {
    return transactionRepository.listTransactions();
}

const getTransaction = async (id) => {
    if (!id) {
        throw new AppError('Invalid transaction id', 400);
    }
    const transaction = await transactionRepository.getTransaction(id);
    if (!transaction) {
        throw new AppError('Transaction not found', 404);
    }
    return transaction;
}

const updateTransaction = async (id, transaction) => {
    if (!id) {
        throw new AppError('Invalid transaction id', 400);
    }
    const { description, amount, id_user, price, date, type, category, observation } = transaction;
    if (!description || !amount || !id_user || !price || !date || !type || !category || !observation) {
        throw new AppError('description, amount, id_user, price, date, type, category and observation are required', 400);
    }
    return transactionRepository.updateTransaction(id, transaction);
}

const deleteTransaction = async (id) => {
    const transaction = await transactionRepository.getTransaction(id);
    if (!transaction) {
        throw new AppError('Transaction not found', 404);
    }
    if (!id) {
        throw new AppError('Invalid transaction id', 400);
    }
    return transactionRepository.deleteTransaction(id);
}

module.exports = {
    createTransaction,
    listTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction,
};
