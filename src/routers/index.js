const express = require("express");
const router = express.Router();
const transactionRoutes = require("./transactionRoutes.js");
const userRoutes = require("./userRoutes.js");
const errorHandler = require("../middleware/errorHandler.js");

// router.use("/transactions", transactionRoutes);
router.use("/users", userRoutes);

router.use(errorHandler);

module.exports = router;
