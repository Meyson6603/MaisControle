import { getTransactions } from "./stateManager.js";

export const updateUI = () => {
  const { expenses, incomes } = getTransactions();

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.value),
    0
  );
  const totalIncomes = incomes.reduce(
    (sum, income) => sum + parseFloat(income.value),
    0
  );

  document.querySelector(
    ".box__income"
  ).textContent = `R$ ${totalIncomes.toFixed(2)}`;
  document.querySelector(
    ".box__expense"
  ).textContent = `R$ ${totalExpenses.toFixed(2)}`;
};
