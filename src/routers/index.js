const router = require("express").Router();
const routerExpense = require("./expenseRouter");

router.use("/expenses", routerExpense);

module.exports = router;
