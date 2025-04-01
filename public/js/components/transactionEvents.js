import { TransactionModal } from "./TransactionModal.js";
import { updateUI } from "../uiUpdate.js";

export const setupTransactionEvents = () => {
  const addExpenseButton = document.getElementById("add-expense-button");
  const addIncomeButton = document.getElementById("add-income-button");

  if (addExpenseButton) {
    addExpenseButton.addEventListener("click", () => {
      const modal = TransactionModal(true);
      document.body.appendChild(modal);
    });
  }

  if (addIncomeButton) {
    addIncomeButton.addEventListener("click", () => {
      const modal = TransactionModal(false);
      document.body.appendChild(modal);
    });
  }
};
