const router = require("express").Router();
const transactionRoutes = require("./transactionRoutes.js");

router.use("/transactions", transactionRoutes);

module.exports = router;
