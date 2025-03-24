const Router = require("express").Router;
const router = Router();

const {
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  listExpenses,
} = require("../controllers/expenseController.js");

router.get("/", listExpenses);
router.get("/:id", getExpense);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
