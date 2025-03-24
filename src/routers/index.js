const router = require("express").Router();
const routerExpense = require("./expenseRoutes.js");

router.use("/expenses", routerExpense);

module.exports = router;
