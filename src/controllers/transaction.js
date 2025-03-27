//criar um banco de dados que contenha://criar um banco de dados que contenha:
const transactionService = require('../services/transactionService.js');

const createTransaction = async (req, res, next) => {
    try {
        const transaction = req.body;
        const newTransaction = await transactionService.createTransaction(transaction);
        res.status(201).json(newTransaction);
    } catch (error) {
        next(error);
    }
}

const listTransactions = async (req, res, next) => {
    try {
        const transactions = await transactionService.listTransactions();
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
}

const getTransaction = async (req, res, next) => {
    try {
        const { id } = req.params;
        const transaction = await transactionService.getTransaction(id);
        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
}

const updateTransaction = async (req, res, next) => {
    try {
        const { id } = req.params;
        const transaction = req.body;
        const updatedTransaction = await transactionService.updateTransaction(id, transaction);
        res.status(200).json(updatedTransaction);
    } catch (error) {
        next(error);
    }
}

const deleteTransaction = async (req, res, next) => {
    try {
        const { id } = req.params;
        await transactionService.deleteTransaction(id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createTransaction,
    listTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction,
};

