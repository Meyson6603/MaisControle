const Router = require("express").Router;
const router = Router();

const {
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  listTransactions,
} = require("../controllers/transactionController.js");

router.get("/", listTransactions);
router.get("/:id", getTransaction);
router.post("/", createTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
