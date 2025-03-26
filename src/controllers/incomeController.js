const incomeService = require("../services/incomeService.js");

const createIncome = async (req, res, next) => {
  try {
    const income = req.body;
    const newIncome = await incomeService.createIncome(income);
    res.status(201).json(newIncome);
  } catch (error) {
    next(error);
  }
};

const listIncomes = async (req, res, next) => {
  try {
    const incomes = await incomeService.listIncomes();
    res.status(200).json(incomes);
  } catch (error) {
    next(error);
  }
};

const getIncome = async (req, res, next) => {
  try {
    const { id } = req.params;
    const income = await incomeService.getIncome(id);
    res.status(200).json(income);
  } catch (error) {
    next(error);
  }
};

const updateIncome = async (req, res, next) => {
  try {
    const { id } = req.params;
    const income = req.body;
    const updatedIncome = await incomeService.updateIncome(id, income);
    res.status(200).json(updatedIncome);
  } catch (error) {
    next(error);
  }
};

const deleteIncome = async (req, res, next) => {
  try {
    const { id } = req.params;
    await incomeService.deleteIncome(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createIncome,
  listIncomes,
  getIncome,
  updateIncome,
  deleteIncome,
};
