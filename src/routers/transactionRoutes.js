const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController.js");

router.post("/", transactionController.createTransaction);
router.get("/", transactionController.listTransactions);
router.get("/:id", transactionController.getTransactionById);
router.put("/:id", transactionController.updateTransaction);
router.delete("/:id", transactionController.deleteTransaction);
router.get("/analytics/revenue", transactionController.getMonthlyRevenue);
router.get("/analytics/expenses", transactionController.getMonthlyExpenses);
router.get("/analytics/balance", transactionController.getOverallBalance);

module.exports = router;
