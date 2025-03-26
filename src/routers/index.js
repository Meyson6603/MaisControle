const express = require("express");
const router = express.Router();
const transactionRoutes = require("./transactionRoutes.js");
const userRoutes = require("./userRoutes.js");

// router.use("/transactions", transactionRoutes);
router.use("/users", userRoutes);

module.exports = router;
